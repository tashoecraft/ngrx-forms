import { MarkAsUnsubmittedAction } from '../../actions';
import { computeArrayState } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';
import {createReducer, on, Action} from "@ngrx/store";
import * as NgrxActions from '../../actions';

const reducer = createReducer(
    {},
    on(NgrxActions.MarkAsSubmittedAction, (state: any, action: any) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.isUnsubmitted) {
            return state;
        }

        return computeArrayState(
            state.id,
            dispatchActionPerChild(state.controls, controlId => MarkAsUnsubmittedAction({controlId: controlId})),
            state.value,
            state.errors,
            state.pendingValidations,
            state.userDefinedProperties,
            {
                wasOrShouldBeDirty: state.isDirty,
                wasOrShouldBeEnabled: state.isEnabled,
                wasOrShouldBeTouched: state.isTouched,
                wasOrShouldBeSubmitted: false,
            },
        );
    })
)

export function markAsUnsubmittedReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}

/*
export function markAsUnsubmittedReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== MarkAsUnsubmittedAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (state.isUnsubmitted) {
    return state;
  }

  return computeArrayState(
    state.id,
    dispatchActionPerChild(state.controls, controlId => new MarkAsUnsubmittedAction(controlId)),
    state.value,
    state.errors,
    state.pendingValidations,
    state.userDefinedProperties,
    {
      wasOrShouldBeDirty: state.isDirty,
      wasOrShouldBeEnabled: state.isEnabled,
      wasOrShouldBeTouched: state.isTouched,
      wasOrShouldBeSubmitted: false,
    },
  );
}
*/