import { computeArrayState  } from '../../state';
import { childReducer } from './util';
import * as NgrxActions from '../../actions';
import {Action, createReducer, on} from "@ngrx/store";

const reducer = createReducer(
    {},
    on(NgrxActions.StartAsyncValidationAction, (state: any, action: any) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.pendingValidations.indexOf(action.name) >= 0) {
            return state;
        }

        const pendingValidations = [...state.pendingValidations, action.name];

      return computeArrayState(
        state.id,
        state.controls,
        state.value,
        state.errors,
        pendingValidations,
        state.userDefinedProperties,
        {
          wasOrShouldBeDirty: state.isDirty,
          wasOrShouldBeEnabled: state.isEnabled,
          wasOrShouldBeTouched: state.isTouched,
          wasOrShouldBeSubmitted: state.isSubmitted,
        },
      );
    })
)

export function startAsyncValidationReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}
