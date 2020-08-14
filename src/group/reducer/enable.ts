import { Action, createReducer, on } from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { computeGroupState, FormGroupState } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';
import {EnableAction} from "../../actions";

const reducer = createReducer(
    on(NgrxActions.EnableAction, (state: FormGroupState<any>, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        const controls = dispatchActionPerChild(state.controls, controlId => EnableAction({controlId}));

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
                wasOrShouldBeEnabled: true,
                wasOrShouldBeTouched: state.isTouched,
                wasOrShouldBeSubmitted: state.isSubmitted,
            },
        );
    })
)

export function enableReducer(state: any, action: Action): any {
    return reducer(state, action);
}
