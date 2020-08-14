import { Action, createReducer, on } from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { computeGroupState, FormGroupState } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';

const reducer = createReducer(
    on(NgrxActions.MarkAsUntouchedAction, (state: FormGroupState<any>, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.isUntouched) {
            return state;
        }

        return computeGroupState(
            state.id,
            dispatchActionPerChild(state.controls, controlId => NgrxActions.MarkAsUntouchedAction({controlId})),
            state.value,
            state.errors,
            state.pendingValidations,
            state.userDefinedProperties,
            {
                wasOrShouldBeDirty: state.isDirty,
                wasOrShouldBeEnabled: state.isEnabled,
                wasOrShouldBeTouched: false,
                wasOrShouldBeSubmitted: state.isSubmitted,
            },
        );
    })
)

export function markAsUntouchedReducer(state: any, action: Action): any {
    return reducer(state, action);
}
