import { MarkAsSubmittedAction } from '../../actions';
import { computeArrayState } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';
import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';

const reducer = createReducer(
    {},
    on(NgrxActions.MarkAsPristineAction, (state: any, action: any) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        const controls = dispatchActionPerChild(state.controls, controlId => MarkAsSubmittedAction({controlId}));

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
                wasOrShouldBeDirty: state.isDirty,
                wasOrShouldBeEnabled: state.isEnabled,
                wasOrShouldBeTouched: state.isTouched,
                wasOrShouldBeSubmitted: true,
            },
        );
    })
)

export function markAsSubmittedReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}

/*
export function markAsSubmittedReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== MarkAsSubmittedAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  const controls = dispatchActionPerChild(state.controls, controlId => new MarkAsSubmittedAction(controlId));

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
      wasOrShouldBeDirty: state.isDirty,
      wasOrShouldBeEnabled: state.isEnabled,
      wasOrShouldBeTouched: state.isTouched,
      wasOrShouldBeSubmitted: true,
    },
  );
}
*/