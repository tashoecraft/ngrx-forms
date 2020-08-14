import { MarkAsTouchedAction } from '../../actions';
import { computeArrayState  } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';
import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';

const reducer = createReducer(
    {},
    on(NgrxActions.MarkAsTouchedAction, (state: any, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        const controls = dispatchActionPerChild(state.controls, controlId => MarkAsTouchedAction({controlId}));

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
                wasOrShouldBeTouched: true,
                wasOrShouldBeSubmitted: state.isSubmitted,
            },
        );
    })
)

export function markAsTouchedReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}

/*
export function markAsTouchedReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== MarkAsTouchedAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  const controls = dispatchActionPerChild(state.controls, controlId => new MarkAsTouchedAction(controlId));

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
      wasOrShouldBeTouched: true,
      wasOrShouldBeSubmitted: state.isSubmitted,
    },
  );
}
*/