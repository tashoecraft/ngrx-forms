import {  MarkAsPristineAction } from '../../actions';
import { computeArrayState } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';

import * as NgrxActions from '../../actions';
import {Action, createReducer, on} from "@ngrx/store";

const reducer = createReducer(
    {},
    on(NgrxActions.MarkAsPristineAction, (state: any, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.isPristine) {
            return state;
        }

        return computeArrayState(
            state.id,
            dispatchActionPerChild(state.controls, controlId => MarkAsPristineAction({controlId})),
            state.value,
            state.errors,
            state.pendingValidations,
            state.userDefinedProperties,
            {
                wasOrShouldBeDirty: false,
                wasOrShouldBeEnabled: state.isEnabled,
                wasOrShouldBeTouched: state.isTouched,
                wasOrShouldBeSubmitted: state.isSubmitted,
            },
        );
    })
)

export function markAsPristineReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}

/*
export function markAsPristineReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== MarkAsPristineAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (state.isPristine) {
    return state;
  }

  return computeArrayState(
    state.id,
    dispatchActionPerChild(state.controls, controlId => new MarkAsPristineAction(controlId)),
    state.value,
    state.errors,
    state.pendingValidations,
    state.userDefinedProperties,
    {
      wasOrShouldBeDirty: false,
      wasOrShouldBeEnabled: state.isEnabled,
      wasOrShouldBeTouched: state.isTouched,
      wasOrShouldBeSubmitted: state.isSubmitted,
    },
  );
}
*/