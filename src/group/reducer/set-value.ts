import { Action, createReducer, on } from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { formStateReducer } from '../../reducer';
import { computeGroupState, createChildState, FormGroupControls, FormGroupState } from '../../state';
import { childReducer } from './util';

const reducer = createReducer(
    on(NgrxActions.SetValueAction, (state: FormGroupState<any>, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.value === action.value) {
            return state;
        }

        if (action.value instanceof Date) {
            throw new Error('Date values are not supported. Please used serialized strings instead.');
        }

        const value = action.value;

        const controls = Object.keys(value)
            .reduce((c, key) => {
                // tslint:disable-next-line:prefer-conditional-expression
                if (!state.controls[key]) {
                    Object.assign(c, { [key]: createChildState(`${state.id}.${key}`, value[key]) });
                } else {
                    Object.assign(c, { [key]: formStateReducer(state.controls[key], NgrxActions.SetValueAction({controlId: state.controls[key].id, value: value[key]})) });
                }
                return c;
            }, {} as FormGroupControls<any>);

        return computeGroupState(
            state.id,
            controls,
            value,
            state.errors,
            state.pendingValidations,
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

export function setValueReducer(state: any, action: Action): any {
    return reducer(state, action);
}
