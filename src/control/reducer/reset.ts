import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';

const reducer = createReducer(
    on(NgrxActions.ResetAction, (state: any) => {
      if (state.isPristine && state.isUntouched && state.isUnsubmitted) {
        return state;
      }

      return {
        ...state,
        isDirty: false,
        isPristine: true,
        isTouched: false,
        isUntouched: true,
        isSubmitted: false,
        isUnsubmitted: true,
      };
    })
)

export function resetReducer(state: any, action: Action): any {
  return reducer(state, action);
}
