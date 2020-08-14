import * as NgrxActions from '../../actions';
import {Action, createReducer, on} from "@ngrx/store";

const reducer = createReducer(
    on(NgrxActions.FocusAction, (state: any) => {
      if (state.isFocused) {
        return state;
      }

      return {
        ...state,
        isFocused: true,
        isUnfocused: false,
      };
    })
)

export function focusReducer(state: any, action: Action): any {
  return reducer(state, action);
}
