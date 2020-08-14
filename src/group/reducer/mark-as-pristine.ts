import { Action, createReducer, on } from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { computeGroupState, FormGroupState } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';

const reducer = createReducer(
    on(NgrxActions.MarkAsPristineAction, (state: FormGroupState<any>, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.isPristine) {
            return state;
        }

      return computeGroupState(
        state.id,
        dispatchActionPerChild(state.controls, controlId => NgrxActions.MarkAsPristineAction({controlId})),
        state.value,
        state.errors,
        state.pendingValidations,
        state.userDefinedProperties,
        {
          wasOrShouldBeDirty: false,
          wasOrShouldBeEnabled: state.isEnabled,
          wasOrShouldBeTouched: state.isTouched,
          wasOrShouldBeSubmitted: state.isSubmitted,
        },
        );
    })
)
export function markAsPristineReducer(state: any, action: Action): any {
    return reducer(state, action);
}
