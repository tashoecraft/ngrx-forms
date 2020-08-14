import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';

const reducer = createReducer(
    on(NgrxActions.UnfocusAction, (state: any) => {
      if (state.isUnfocused) {
        return state;
      }

      return {
        ...state,
        isFocused: false,
        isUnfocused: true,
      };
    })
)

export function unfocusReducer(state: any, action: Action): any {
  return reducer(state, action);
}
