import { Action, createReducer, on } from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { computeGroupState, FormGroupState } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';

const reducer = createReducer(
    on(NgrxActions.MarkAsSubmittedAction, (state: FormGroupState<any>, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        const controls = dispatchActionPerChild(state.controls, controlId => NgrxActions.MarkAsSubmittedAction({controlId}));

        if (controls === state.controls) {
            return state;
        }

        return computeGroupState(
            state.id,
            controls,
            state.value,
            state.errors,
            state.pendingValidations,
            state.userDefinedProperties,
            {
                wasOrShouldBeDirty: state.isDirty,
                wasOrShouldBeEnabled: state.isEnabled,
                wasOrShouldBeTouched: state.isTouched,
                wasOrShouldBeSubmitted: true,
            },
        );
    })
)

export function markAsSubmittedReducer(state: any, action: Action): any {
    return reducer(state, action);
}
