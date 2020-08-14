import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';

const reducer = createReducer(
    on(NgrxActions.EnableAction, (state: any) => {
      if (state.isEnabled) {
        return state;
      }

      return {
        ...state,
        isEnabled: true,
        isDisabled: false,
      };
    })
)

export function enableReducer(state: any, action: Action): any {
  return reducer(state, action);
}
