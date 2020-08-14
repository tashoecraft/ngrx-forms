import { computeArrayState } from '../../state';
import { childReducer, updateIdRecursive } from './util';
import * as NgrxActions from '../../actions';
import {Action, createReducer, on} from "@ngrx/store";

const reducer = createReducer(
    {} as any,
    on(NgrxActions.RemoveArrayControlAction, (state: any, action: any) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (action.index >= state.controls.length || action.index < 0) {
            throw new Error(`Index ${action.index} is out of bounds for array '${state.id}' with length ${state.controls.length}!`);
        }

        const index = action.index;
        const controls = state.controls.filter((_: any, i: any) => i !== index).map((c: any, i: any) => updateIdRecursive(c, `${state.id}.${i}`));

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

export function removeControlReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}

/*
export function removeControlReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== RemoveArrayControlAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (action.index >= state.controls.length || action.index < 0) {
    throw new Error(`Index ${action.index} is out of bounds for array '${state.id}' with length ${state.controls.length}!`);
  }

  const index = action.index;
  const controls = state.controls.filter((_, i) => i !== index).map((c, i) => updateIdRecursive(c, `${state.id}.${i}`));

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