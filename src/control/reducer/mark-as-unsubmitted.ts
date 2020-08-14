import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';

const reducer = createReducer(
    on(NgrxActions.MarkAsUnsubmittedAction, (state: any) => {
      if (state.isUnsubmitted) {
        return state;
      }

      return {
        ...state,
        isSubmitted: false,
        isUnsubmitted: true,
      };
    })
)

export function markAsUnsubmittedReducer(state: any, action: Action): any {
  return reducer(state, action);
}
