import { Action, createReducer, on } from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { computeGroupState, FormGroupState } from '../../state';
import { deepEquals } from '../../util';
import { childReducer } from './util';

const reducer = createReducer(
    on(NgrxActions.SetAsyncErrorAction, (state: FormGroupState<any>, action) => {
      if (action.controlId !== state.id) {
        return childReducer(state, action);
      }

      if (state.isDisabled) {
        return state;
      }

      const name = `$${action.name}`;
      let value = action.value;

      if (deepEquals(state.errors[name], action.value)) {
        value = state.errors[name];
      }

      const errors = { ...state.errors, [name]: value };
      const pendingValidations = state.pendingValidations.filter((v: string) => v !== action.name);

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

export function setAsyncErrorReducer(state: any, action: Action): any {
  return reducer(state, action);
}
