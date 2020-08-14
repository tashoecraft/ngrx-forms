import { Action, createReducer, on } from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { FormGroupState } from '../../state';
import { childReducer } from './util';

const reducer = createReducer(
    on(NgrxActions.SetUserDefinedPropertyAction, (state: FormGroupState<any>, action) => {
      if (action.controlId !== state.id) {
        return childReducer(state, action);
      }

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
