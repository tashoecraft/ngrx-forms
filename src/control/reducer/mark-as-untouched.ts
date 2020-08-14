import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';

const reducer = createReducer(
    on(NgrxActions.MarkAsUnsubmittedAction, (state: any) => {
      if (state.isUntouched) {
        return state;
      }

      return {
        ...state,
        isTouched: false,
        isUntouched: true,
      };
    })
)

export function markAsUntouchedReducer(state: any, action: Action): any {
  return reducer(state, action);
}
