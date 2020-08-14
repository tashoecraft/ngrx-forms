import * as NgrxActions from '../../actions';
import {Action, createReducer, on} from "@ngrx/store";

const reducer = createReducer(
    on(NgrxActions.MarkAsPristineAction, (state: any) => {
      if (state.isPristine) {
        return state;
      }

      return {
        ...state,
        isDirty: false,
        isPristine: true,
      };
    })
)

export function markAsPristineReducer(state: any, action: Action): any {
  return reducer(state, action);
}
