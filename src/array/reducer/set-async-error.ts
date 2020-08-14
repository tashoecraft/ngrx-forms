import { computeArrayState } from '../../state';
import { deepEquals } from '../../util';
import { childReducer } from './util';
import * as NgrxActions from '../../actions';
import {Action, createReducer, on} from "@ngrx/store";

const reducer = createReducer(
    {},
    on(NgrxActions.SetAsyncErrorAction, ((state: any, action: any) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.isDisabled) {
            return state;
        }

        const name = `$${action.name}`;
        let value = action.value;

        if (deepEquals(state.errors[name], action.value)) {
            value = state.errors[name];
        }

        const errors = { ...state.errors, [name]: value };
        const pendingValidations = state.pendingValidations.filter((v: any) => v !== action.name);

        return computeArrayState(
            state.id,
            state.controls,
            state.value,
            errors,
            pendingValidations,
            state.userDefinedProperties,
            {
                wasOrShouldBeDirty: state.isDirty,
                wasOrShouldBeEnabled: state.isEnabled,
                wasOrShouldBeTouched: state.isTouched,
                wasOrShouldBeSubmitted: state.isSubmitted,
            },
        );
    })
))

export function setAsyncErrorReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}

/*
export function setAsyncErrorReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== SetAsyncErrorAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (state.isDisabled) {
    return state;
  }

  const name = `$${action.name}`;
  let value = action.value;

  if (deepEquals(state.errors[name], action.value)) {
    value = state.errors[name];
  }

  const errors = { ...state.errors, [name]: value };
  const pendingValidations = state.pendingValidations.filter(v => v !== action.name);

  return computeArrayState(
    state.id,
    state.controls,
    state.value,
    errors,
    pendingValidations,
    state.userDefinedProperties,
    {
      wasOrShouldBeDirty: state.isDirty,
      wasOrShouldBeEnabled: state.isEnabled,
      wasOrShouldBeTouched: state.isTouched,
      wasOrShouldBeSubmitted: state.isSubmitted,
    },
  );
}
*/