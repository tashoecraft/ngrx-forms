import {Action, createReducer, on} from "@ngrx/store";

import * as NgrxActions from '../../actions';

const reducer = createReducer(
    on(NgrxActions.MarkAsDirtyAction, (state: any) => {
      if (state.isDirty) {
        return state;
      }

      return {
        ...state,
        isDirty: true,
        isPristine: false,
      };
    })
)

export function markAsDirtyReducer(state: any, action: Action): any {
  return reducer(state, action);
}
