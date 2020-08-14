import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';

const reducer = createReducer(
    on(NgrxActions.SetUserDefinedPropertyAction, (state: any, action) => {
      if (state.userDefinedProperties[action.name] === action.value) {
        return state;
      }

      return {
        ...state,
        userDefinedProperties: {
          ...state.userDefinedProperties,
          [action.name]: action.value,
        },
      };
    })
)

export function setUserDefinedPropertyReducer(state: any, action: Action): any {
  return reducer(state, action);
}
