import {Action, combineReducers} from '@ngrx/store';

import { FormControlState, FormControlValueTypes, isArrayState, isGroupState } from '../state';
import { clearAsyncErrorReducer } from './reducer/clear-async-error';
import { disableReducer } from './reducer/disable';
import { enableReducer } from './reducer/enable';
import { focusReducer } from './reducer/focus';
import { markAsDirtyReducer } from './reducer/mark-as-dirty';
import { markAsPristineReducer } from './reducer/mark-as-pristine';
import { markAsSubmittedReducer } from './reducer/mark-as-submitted';
import { markAsTouchedReducer } from './reducer/mark-as-touched';
import { markAsUnsubmittedReducer } from './reducer/mark-as-unsubmitted';
import { markAsUntouchedReducer } from './reducer/mark-as-untouched';
import { resetReducer } from './reducer/reset';
import { setAsyncErrorReducer } from './reducer/set-async-error';
import { setErrorsReducer } from './reducer/set-errors';
import { setUserDefinedPropertyReducer } from './reducer/set-user-defined-property';
import { setValueReducer } from './reducer/set-value';
import { startAsyncValidationReducer } from './reducer/start-async-validation';
import { unfocusReducer } from './reducer/unfocus';

export function formControlReducerInternal(
  state: any,
  action: any,
) {
  if (isGroupState(state) || isArrayState(state)) {
    throw new Error('The state must be a control state');
  }

  if (action.controlId !== state.id) {
    return state;
  }
  return combineReducers(
      [
        setValueReducer,
        setErrorsReducer,
        startAsyncValidationReducer,
        setAsyncErrorReducer,
        clearAsyncErrorReducer,
        enableReducer,
        disableReducer,
        focusReducer,
        unfocusReducer,
        markAsDirtyReducer,
        markAsPristineReducer,
        markAsTouchedReducer,
        markAsUntouchedReducer,
        markAsSubmittedReducer,
        markAsUnsubmittedReducer,
        setUserDefinedPropertyReducer,
        resetReducer,
      ]
  )(state, action);

}

/**
 * This reducer function updates a form control state with actions.
 */
export function formControlReducer<TValue extends FormControlValueTypes>(state: FormControlState<TValue> | undefined, action: Action) {
  if (!state) {
    throw new Error('The control state must be defined!');
  }

  return formControlReducerInternal(state, action as any);
}
