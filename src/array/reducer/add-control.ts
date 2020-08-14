import { computeArrayState, createChildState, FormState } from '../../state';
import { childReducer, updateIdRecursive } from './util';
import { Action, createReducer, on } from "@ngrx/store";

import * as NgrxActions from '../../actions';


const reducer = createReducer(
    {},
    on(NgrxActions.AddArrayControlAction, (state: any, action) => {
       if (action.controlId !== state.id) {
           return childReducer(state, action)
       }

       const index = action.index === undefined ? state.controls.length : action.index;

       if (index > state.controls.length || index < 0) {
           throw new Error(`Index ${index} is out of bounds for array '${state.id}' with length ${state.controls.length}!`);
       }

       let controls = [...state.controls];
       controls.splice(index, 0, createChildState(`${state.id}.${index}`, action.value) as FormState<any>);
       controls = controls.map((c, i) => updateIdRecursive(c, `${state.id}.${i}`));

       return computeArrayState(
           state.id,
           controls,
           state.value,
           state.errors,
           state.pendingValidations,
           state.userDefinedProperties,
           {
                wasOrShouldBeDirty: true,
                wasOrShouldBeEnabled: state.isEnabled,
                wasOrShouldBeTouched: state.isTouched,
                wasOrShouldBeSubmitted: state.isSubmitted,
            },
        );
    })
)
/*
export function addControlReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Action,
): FormArrayState<TValue> {
  if (action.type !== ALL_NGRX_FORMS_ACTION_TYPES.AddArrayControlActionType) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  const index = action.index === undefined ? state.controls.length : action.index;

  if (index > state.controls.length || index < 0) {
    throw new Error(`Index ${index} is out of bounds for array '${state.id}' with length ${state.controls.length}!`);
  }

  let controls = [...state.controls];
  controls.splice(index, 0, createChildState(`${state.id}.${index}`, action.value) as FormState<TValue>);
  controls = controls.map((c, i) => updateIdRecursive(c, `${state.id}.${i}`));

  return computeArrayState(
    state.id,
    controls,
    state.value,
    state.errors,
    state.pendingValidations,
    state.userDefinedProperties,
    {
      wasOrShouldBeDirty: true,
      wasOrShouldBeEnabled: state.isEnabled,
      wasOrShouldBeTouched: state.isTouched,
      wasOrShouldBeSubmitted: state.isSubmitted,
    },
  );
}
*/

export function addControlReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}