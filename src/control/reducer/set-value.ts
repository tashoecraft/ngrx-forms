import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';
import {verifyFormControlValueIsValid} from "../../state";

const reducer = createReducer(
    on(NgrxActions.SetValueAction, (state: any, action) => {

      if (state.value === action.value) {
        return state;
      }

      return {
        ...state,
        value: verifyFormControlValueIsValid(action.value),
      };
    })
)

export function setValueReducer(state: any, action: Action): any {
  return reducer(state, action);
}
