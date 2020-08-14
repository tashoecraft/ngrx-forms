import * as NgrxActions from '../../actions';
import {Action, createReducer, on} from "@ngrx/store";

const reducer = createReducer(
    on(NgrxActions.DisableAction, (state: any) => {
      if (state.isDisabled) {
        return state;
      }

      return {
        ...state,
        isEnabled: false,
        isDisabled: true,
        isValid: true,
        isInvalid: false,
        errors: {},
        pendingValidations: [],
        isValidationPending: false,
      };
    })
);

export function disableReducer(state: any, action: Action): any {
  return reducer(state, action);
}

