import { Action, createReducer, on } from "@ngrx/store";
import * as NgrxActions from '../../actions';
import { computeGroupState, FormGroupState } from '../../state';
import { childReducer, dispatchActionPerChild } from './util';

const reducer = createReducer(
    on(NgrxActions.DisableAction, (state: FormGroupState<any>, action) => {
        if (action.controlId !== state.id) {
            return childReducer(state, action);
        }

        if (state.isDisabled) {
            return state;
        }

        return computeGroupState(
            state.id,
            dispatchActionPerChild(state.controls, controlId => NgrxActions.DisableAction({controlId})),
            state.value,
        {},
[],
            state.userDefinedProperties,
        {
          wasOrShouldBeDirty: state.isDirty,
          wasOrShouldBeEnabled: false,
          wasOrShouldBeTouched: state.isTouched,
          wasOrShouldBeSubmitted: state.isSubmitted,
        },
      );
    })
)


export function disableReducer(state: any, action: Action): any {
    return reducer(state, action);
}
//   state: FormGroupState<TValue>,
//   action: Actions<TValue>,
// ): FormGroupState<TValue> {
//   if (action.type !== DisableAction.TYPE) {
//     return state;
//   }
//
//   if (action.controlId !== state.id) {
//     return childReducer(state, action);
//   }
//
//   if (state.isDisabled) {
//     return state;
//   }
//
//   return computeGroupState(
//     state.id,
//     dispatchActionPerChild(state.controls, controlId => new DisableAction(controlId)),
//     state.value,
//     {},
//     [],
//     state.userDefinedProperties,
//     {
//       wasOrShouldBeDirty: state.isDirty,
//       wasOrShouldBeEnabled: false,
//       wasOrShouldBeTouched: state.isTouched,
//       wasOrShouldBeSubmitted: state.isSubmitted,
//     },
//   );
// }
