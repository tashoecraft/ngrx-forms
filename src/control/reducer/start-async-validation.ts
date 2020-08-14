import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';

const reducer = createReducer(
    on(NgrxActions.StartAsyncValidationAction, (state: any, action) => {
      if (state.pendingValidations.indexOf(action.name) >= 0) {
        return state;
      }

      return {
        ...state,
        pendingValidations: [...state.pendingValidations, action.name],
        isValidationPending: true,
      };
    })
)

export function startAsyncValidationReducer(state: any, action: Action): any {
  return reducer(state, action);
}
