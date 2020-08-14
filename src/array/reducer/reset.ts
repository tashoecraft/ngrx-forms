import { ResetAction } from '../../actions';
import { computeArrayState } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';
import * as NgrxActions from '../../actions';
import {Action, createReducer, on} from "@ngrx/store";

const reducer = createReducer(
    {},
    on(NgrxActions.ResetAction, (state: any, action: any) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.isPristine && state.isUntouched && state.isUnsubmitted) {
            return state;
        }

        return computeArrayState(
            state.id,
            dispatchActionPerChild(state.controls, controlId => ResetAction({controlId})),
            state.value,
            state.errors,
            state.pendingValidations,
            state.userDefinedProperties,
            {
                wasOrShouldBeDirty: false,
                wasOrShouldBeEnabled: state.isEnabled,
                wasOrShouldBeTouched: false,
                wasOrShouldBeSubmitted: false,
            },
        );
    })
)

export function resetReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}

/*
export function resetReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== ResetAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (state.isPristine && state.isUntouched && state.isUnsubmitted) {
    return state;
  }

  return computeArrayState(
    state.id,
    dispatchActionPerChild(state.controls, controlId => new ResetAction(controlId)),
    state.value,
    state.errors,
    state.pendingValidations,
    state.userDefinedProperties,
    {
      wasOrShouldBeDirty: false,
      wasOrShouldBeEnabled: state.isEnabled,
      wasOrShouldBeTouched: false,
      wasOrShouldBeSubmitted: false,
    },
  );
}
*/