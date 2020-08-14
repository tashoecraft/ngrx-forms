import { Action, createReducer, on } from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { computeGroupState, FormGroupState } from '../../state';
import { childReducer } from './util';

const reducer = createReducer(
    on(NgrxActions.RemoveGroupControlAction, (state: FormGroupState<any>, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (!state.controls.hasOwnProperty(action.name)) {
            throw new Error(`Group '${state.id}' does not have child control '${action.name}'!`); // `;
        }

        const controls = Object.assign({}, state.controls);
        // @ts-ignore
        delete controls[action.name];

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

export function removeControlReducer(state: any, action: Action): any {
    return reducer(state, action);
}
