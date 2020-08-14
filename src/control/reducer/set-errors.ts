import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { deepEquals, isEmpty } from '../../util';
import {ValidationErrors} from "../../state";

const reducer = createReducer(
    on(NgrxActions.SetErrorsAction, (state: any, action) => {
      if (state.isDisabled) {
        return state;
      }

      if (state.errors === action.errors) {
        return state;
      }

      if (deepEquals(state.errors, action.errors)) {
        return state;
      }

      if (!action.errors || typeof (action.errors as any) !== 'object' || Array.isArray(action.errors)) {
        throw new Error(`Control errors must be an object; got ${action.errors}`); // `;
      }

      if (Object.keys(action.errors).some(key => key.startsWith('$'))) {
        throw new Error(`Control errors must not use $ as a prefix; got ${JSON.stringify(action.errors)}`); // `;
      }

      const asyncErrors =
          Object.keys(state.errors)
              .filter(key => key.startsWith('$'))
              .reduce((res, key) => Object.assign(res, { [key]: state.errors[key] }), {} as ValidationErrors);

      const newErrors = isEmpty(asyncErrors) ? action.errors : Object.assign(asyncErrors, action.errors);
      const isValid = isEmpty(newErrors);

      return {
        ...state,
        isValid,
        isInvalid: !isValid,
        errors: newErrors,
      };
    })
)

export function setErrorsReducer(state: any, action: Action): any {
  return reducer(state, action);
}
