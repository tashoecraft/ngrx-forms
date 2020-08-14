import { computeArrayState } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';

import * as NgrxActions from '../../actions';
import {Action, createReducer, on} from "@ngrx/store";

const reducer = createReducer(
    {},
    on(NgrxActions.EnableAction, (state: any, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        const controls = dispatchActionPerChild(state.controls, controlId => NgrxActions.EnableAction({controlId}));

        if (controls === state.controls && state.isEnabled) {
            return state;
        }

        return computeArrayState(
            state.id,
            controls,
            state.value,
            state.errors,
            state.pendingValidations,
            state.userDefinedProperties,
            {
                wasOrShouldBeDirty: state.isDirty,
                wasOrShouldBeEnabled: true,
                wasOrShouldBeTouched: state.isTouched,
                wasOrShouldBeSubmitted: state.isSubmitted,
            },
        );
    })
)
export function enableReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}
