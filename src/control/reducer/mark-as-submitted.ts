import * as NgrxActions from '../../actions';
import {Action, createReducer, on} from "@ngrx/store";

const reducer = createReducer(
    on(NgrxActions.MarkAsSubmittedAction, (state: any) => {
      if (state.isSubmitted) {
        return state;
      }

      return {
        ...state,
        isSubmitted: true,
        isUnsubmitted: false,
      };
    })
)

export function markAsSubmittedReducer(state: any, action: Action): any {
  return reducer(state, action);
}
