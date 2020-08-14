import { DisableAction } from '../../actions';
import { computeArrayState } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';
import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';

const reducer = createReducer(
    {},
    on(NgrxActions.DisableAction, (state: any, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.isDisabled) {
            return state;
        }

        return computeArrayState(
            state.id,
            dispatchActionPerChild(state.controls, controlId => DisableAction({controlId})),
            state.value,
            {},
            [],
            state.userDefinedProperties,
            {
                wasOrShouldBeDirty: state.isDirty,
                wasOrShouldBeEnabled: false,
                wasOrShouldBeTouched: state.isTouched,
                wasOrShouldBeSubmitted: state.isSubmitted,
            },
        );
    })
)
export function disableReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}
/*
export function disableReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== DisableAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (state.isDisabled) {
    return state;
  }

  return computeArrayState(
    state.id,
    dispatchActionPerChild(state.controls, controlId => new DisableAction(controlId)),
    state.value,
    {},
    [],
    state.userDefinedProperties,
    {
      wasOrShouldBeDirty: state.isDirty,
      wasOrShouldBeEnabled: false,
      wasOrShouldBeTouched: state.isTouched,
      wasOrShouldBeSubmitted: state.isSubmitted,
    },
  );
}
*/