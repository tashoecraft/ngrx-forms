import { computeGroupState, FormGroupState, KeyValue } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';
import { Action, createReducer, on } from "@ngrx/store";
import * as NgrxActions from '../../actions';

const reducer = createReducer(
    on(NgrxActions.MarkAsDirtyAction, (state: FormGroupState<any>, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        const controls = dispatchActionPerChild(state.controls, controlId => NgrxActions.MarkAsDirtyAction({controlId: controlId}));

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
                wasOrShouldBeDirty: true,
                wasOrShouldBeEnabled: state.isEnabled,
                wasOrShouldBeTouched: state.isTouched,
                wasOrShouldBeSubmitted: state.isSubmitted,
            },
        );
    })
)

export function markAsDirtyReducer(state: any, action: Action): any {
    return reducer(state, action);
}
