import { MarkAsUntouchedAction } from '../../actions';
import { computeArrayState } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';
import * as NgrxActions from '../../actions';
import {Action, createReducer, on} from "@ngrx/store";

const reducer = createReducer(
    {},
    on(NgrxActions.MarkAsUntouchedAction, (state: any, action: any) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.isUntouched) {
            return state;
        }

        return computeArrayState(
            state.id,
            dispatchActionPerChild(state.controls, controlId => MarkAsUntouchedAction({controlId})),
            state.value,
            state.errors,
            state.pendingValidations,
            state.userDefinedProperties,
            {
                wasOrShouldBeDirty: state.isDirty,
                wasOrShouldBeEnabled: state.isEnabled,
                wasOrShouldBeTouched: false,
                wasOrShouldBeSubmitted: state.isSubmitted,
            },
        );
    })
)

export function markAsUntouchedReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}

/*
export function markAsUntouchedReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== MarkAsUntouchedAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (state.isUntouched) {
    return state;
  }

  return computeArrayState(
    state.id,
    dispatchActionPerChild(state.controls, controlId => new MarkAsUntouchedAction(controlId)),
    state.value,
    state.errors,
    state.pendingValidations,
    state.userDefinedProperties,
    {
      wasOrShouldBeDirty: state.isDirty,
      wasOrShouldBeEnabled: state.isEnabled,
      wasOrShouldBeTouched: false,
      wasOrShouldBeSubmitted: state.isSubmitted,
    },
  );
}
*/