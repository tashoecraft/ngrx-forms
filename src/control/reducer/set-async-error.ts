import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';

import { deepEquals } from '../../util';

const reducer = createReducer(
    on(NgrxActions.SetAsyncErrorAction, (state: any, action) => {
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

      return {
        ...state,
        isValid: false,
        isInvalid: true,
        errors,
        pendingValidations,
        isValidationPending: pendingValidations.length > 0,
      };
    })
)

export function setAsyncErrorReducer(state: any, action: Action): any {
  return reducer(state, action);
}
