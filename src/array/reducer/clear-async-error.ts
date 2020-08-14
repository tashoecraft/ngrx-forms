import { computeArrayState } from '../../state';
import { childReducer } from './util';

import * as NgrxActions from '../../actions';
import {Action, createReducer, on} from "@ngrx/store";

const reducer = createReducer(
    {},
    on(NgrxActions.ClearAsyncErrorAction, (state: any, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        const name = `$${action.name}`;

        let errors = state.errors;

        if (state.errors.hasOwnProperty(name)) {
            errors = { ...state.errors };
            delete (errors as any)[name];
        }

        const pendingValidations = state.pendingValidations.filter((v: string) => v !== action.name);

        if (errors === state.errors && pendingValidations.length === state.pendingValidations.length) {
            return state;
        }

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
)

export function clearAsyncErrorReducer(state: any, action: Action) {
  return reducer(state, action);
}
/*
export function clearAsyncErrorReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== ClearAsyncErrorAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  const name = `$${action.name}`;

  let errors = state.errors;

  if (state.errors.hasOwnProperty(name)) {
    errors = { ...state.errors };
    delete (errors as any)[name];
  }

  const pendingValidations = state.pendingValidations.filter(v => v !== action.name);

  if (errors === state.errors && pendingValidations.length === state.pendingValidations.length) {
    return state;
  }

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