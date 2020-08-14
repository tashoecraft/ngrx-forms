import {Action, createReducer, on} from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { computeGroupState } from '../../state';
import { childReducer } from './util';

const reducer = createReducer(
    on(NgrxActions.ClearAsyncErrorAction, (state: any, action) => {
      if (action.controlId !== state.id) {
        return childReducer(state, action);
      }

    const name = `$${action.name}`;

    let errors = state.errors;

    if (errors.hasOwnProperty(name)) {
      errors = { ...state.errors };
      delete (errors as any)[name];
    }

    const pendingValidations = state.pendingValidations.filter((v: string) => v !== action.name);

    if (errors === state.errors && pendingValidations.length === state.pendingValidations.length) {
      return state;
    }

    return computeGroupState(
      state.id,
      state.controls,
      state.value,
      errors,
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

 export function clearAsyncErrorReducer(state: any, action: Action): any {
  return reducer(state, action);
 }
