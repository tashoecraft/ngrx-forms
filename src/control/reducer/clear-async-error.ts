import { isEmpty } from '../../util';
import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';

const reducer = createReducer(
    on(NgrxActions.ClearAsyncErrorAction, (state: any, action) => {
      const name = `$${action.name}`;

      let errors = state.errors;

      if (errors.hasOwnProperty(name)) {
        errors = { ...state.errors };
        delete (errors as any)[name];
      }

      const pendingValidations = state.pendingValidations.filter((v: string) => v !== action.name);
      const isValid = isEmpty(errors);

      if (errors === state.errors && isValid === state.isValid && pendingValidations.length === state.pendingValidations.length) {
        return state;
      }

      return {
        ...state,
        isValid,
        isInvalid: !isValid,
        errors,
        pendingValidations,
        isValidationPending: pendingValidations.length > 0,
      };
    })
)

export function clearAsyncErrorReducer(state: any, action: Action): any {
  return reducer(state, action);
}
