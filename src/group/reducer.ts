import {Action, combineReducers} from '@ngrx/store';

import {
  isNgrxFormsAction,
} from '../actions';
import { isGroupState } from '../state';
import { addControlReducer } from './reducer/add-control';
import { clearAsyncErrorReducer } from './reducer/clear-async-error';
import { disableReducer } from './reducer/disable';
import { enableReducer } from './reducer/enable';
import { markAsDirtyReducer } from './reducer/mark-as-dirty';
import { markAsPristineReducer } from './reducer/mark-as-pristine';
import { markAsSubmittedReducer } from './reducer/mark-as-submitted';
import { markAsTouchedReducer } from './reducer/mark-as-touched';
import { markAsUnsubmittedReducer } from './reducer/mark-as-unsubmitted';
import { markAsUntouchedReducer } from './reducer/mark-as-untouched';
import { removeControlReducer } from './reducer/remove-control';
import { resetReducer } from './reducer/reset';
import { setAsyncErrorReducer } from './reducer/set-async-error';
import { setErrorsReducer } from './reducer/set-errors';
import { setUserDefinedPropertyReducer } from './reducer/set-user-defined-property';
import { setValueReducer } from './reducer/set-value';
import { startAsyncValidationReducer } from './reducer/start-async-validation';
import {focusReducer} from "../control/reducer/focus";
import {unfocusReducer} from "../control/reducer/unfocus";

export function formGroupReducer(state: any, action: Action) {
  if (!isGroupState(state)) {
    throw new Error('The state must be a group state');
  }

  if (!isNgrxFormsAction(action)) {
    return state;
  }

  if (!(action as any).controlId.startsWith(state.id)) {
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
        markAsDirtyReducer,
        markAsPristineReducer,
        markAsTouchedReducer,
        markAsUntouchedReducer,
        markAsSubmittedReducer,
        markAsUnsubmittedReducer,
        setUserDefinedPropertyReducer,
        resetReducer,
        addControlReducer,
        removeControlReducer,
        focusReducer,
        unfocusReducer
      ]
  )(state as any, action);
}
