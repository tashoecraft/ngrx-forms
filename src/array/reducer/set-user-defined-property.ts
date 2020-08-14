import { childReducer } from './util';
import * as NgrxActions from '../../actions';
import {Action, createReducer, on} from "@ngrx/store";

const reducer = createReducer(
    {},
    on(NgrxActions.SetUserDefinedPropertyAction, (state: any, action: any) => {
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

export function setUserDefinedPropertyReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}

/*
export function setUserDefinedPropertyReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== SetUserDefinedPropertyAction.TYPE) {
    return state;
  }

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
}
*/