import { Action, createReducer, on } from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { computeGroupState, createChildState, FormGroupState } from '../../state';
import { childReducer } from './util';

const reducer = createReducer(
    on(NgrxActions.AddGroupControlAction, (state: FormGroupState<any>, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.controls.hasOwnProperty(action.name)) {
            throw new Error(`Group '${state.id}' already has child control '${action.name}'!`); // `;
        }

        const controls = Object.assign({}, state.controls, {
            [action.name]: createChildState(`${state.id}.${action.name}`, action.value),
        });

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

export function addControlReducer(state: any, action: Action): any {
    return reducer(state, action);
}
