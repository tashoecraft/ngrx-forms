import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';

const reducer = createReducer(
    on(NgrxActions.MarkAsTouchedAction, (state: any) => {
      if (state.isTouched) {
        return state;
      }

      return {
        ...state,
        isTouched: true,
        isUntouched: false,
      };
    })
)

export function markAsTouchedReducer(state: any, action: Action): any {
  return reducer(state, action)
}
