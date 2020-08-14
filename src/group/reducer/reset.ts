import { Action, createReducer, on } from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { computeGroupState, FormGroupState } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';

const reducer = createReducer(
    on(NgrxActions.ResetAction, (state: FormGroupState<any>, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.isPristine && state.isUntouched && state.isUnsubmitted) {
            return state;
        }

        return computeGroupState(
            state.id,
            dispatchActionPerChild(state.controls, controlId => NgrxActions.ResetAction({controlId})),
            state.value,
            state.errors,
            state.pendingValidations,
            state.userDefinedProperties,
            {
                wasOrShouldBeDirty: false,
                wasOrShouldBeEnabled: state.isEnabled,
                wasOrShouldBeTouched: false,
                wasOrShouldBeSubmitted: false,
            },
        );
    })
)

export function resetReducer(state: any, action: Action): any {
    return reducer(state, action);
}
