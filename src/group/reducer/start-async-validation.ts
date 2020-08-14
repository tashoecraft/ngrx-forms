import { Action, createReducer, on } from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { computeGroupState, FormGroupState } from '../../state';
import { childReducer } from './util';

const reducer = createReducer(
    on(NgrxActions.StartAsyncValidationAction, (state: FormGroupState<any>, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.pendingValidations.indexOf(action.name) >= 0) {
            return state;
        }

        const pendingValidations = [...state.pendingValidations, action.name];

        return computeGroupState(
            state.id,
            state.controls,
            state.value,
            state.errors,
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

export function startAsyncValidationReducer(state: any, action: Action): any {
    return reducer(state, action);
}
