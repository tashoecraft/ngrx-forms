import {  MarkAsDirtyAction } from '../../actions';
import { computeArrayState } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';

import * as NgrxActions from '../../actions';
import {Action, createReducer, on} from "@ngrx/store";

const reducer = createReducer(
    {},
    on(NgrxActions.MarkAsDirtyAction, (state: any, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        const controls = dispatchActionPerChild(state.controls, controlId => MarkAsDirtyAction({controlId}));

        if (controls === state.controls) {
            return state;
        }

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

export function markAsDirtyReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}

/*
export function markAsDirtyReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== MarkAsDirtyAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  const controls = dispatchActionPerChild(state.controls, controlId => new MarkAsDirtyAction(controlId));

  if (controls === state.controls) {
    return state;
  }

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