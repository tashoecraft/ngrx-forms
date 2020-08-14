import { Action, createReducer, on } from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { computeGroupState, FormGroupState, KeyValue } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';

const reducer = createReducer(
    on(NgrxActions.MarkAsUnsubmittedAction, (state: any, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.isUnsubmitted) {
            return state;
        }

        return computeGroupState(
            state.id,
            dispatchActionPerChild(state.controls, controlId => NgrxActions.MarkAsUnsubmittedAction({controlId})),
            state.value,
            state.errors,
            state.pendingValidations,
            state.userDefinedProperties,
            {
                wasOrShouldBeDirty: state.isDirty,
                wasOrShouldBeEnabled: state.isEnabled,
                wasOrShouldBeTouched: state.isTouched,
                wasOrShouldBeSubmitted: false,
            },
        );
    })
)

export function markAsUnsubmittedReducer(state: any, action: Action): any {
    return reducer(state, action);
}
