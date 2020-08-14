import {Action, combineReducers} from '@ngrx/store';

import { FormArrayState,  } from '../state';
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
import { moveControlReducer } from './reducer/move-control';
import { removeControlReducer } from './reducer/remove-control';
import { resetReducer } from './reducer/reset';
import { setAsyncErrorReducer } from './reducer/set-async-error';
import { setErrorsReducer } from './reducer/set-errors';
import { setUserDefinedPropertyReducer } from './reducer/set-user-defined-property';
import { setValueReducer } from './reducer/set-value';
import { startAsyncValidationReducer } from './reducer/start-async-validation';
import { swapControlReducer } from './reducer/swap-control';

/**
 * This reducer function updates a form array state with actions.
 */
export function formArrayReducer<TValue>(state: any | FormArrayState<TValue> | undefined, action: Action) {
  if (!state) {
    throw new Error('The array state must be defined!');
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
        swapControlReducer,
        moveControlReducer
      ]
  )(state, action);

}
