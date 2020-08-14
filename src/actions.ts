import {Action, createAction, props} from '@ngrx/store';
import { NgrxFormControlId, ValidationErrors } from './state';

// NOTE: the explicit type declaration for the `TYPE` properties is required
// for the output declarations to properly use the literal string type instead
// of just `string`

export enum ALL_NGRX_FORMS_ACTION_TYPES {
  SetValueActionType = 'ngrx/forms/SET_VALUE',
  SetErrorsActionType = 'ngrx/forms/SET_ERRORS',
  SetAsyncErrorsActionType = 'ngrx/forms/SET_ASYNC_ERROR',
  ClearAsyncErrorActionType = 'ngrx/forms/CLEAR_ASYNC_ERROR',
  StartAsyncValidationActionType = 'ngrx/forms/START_ASYNC_VALIDATION',
  MarkAsDirtyActionType = 'ngrx/forms/MARK_AS_DIRTY',
  MarkAsPristineActionType = 'ngrx/forms/MARK_AS_PRISTINE',
  DisableActionType = 'ngrx/forms/DISABLE',
  EnableActionType = 'ngrx/forms/ENABLE',
  MarkAsTouchedActionType = 'ngrx/forms/MARK_AS_TOUCHED',
  MarkAsUnTouchedActionType = 'ngrx/forms/MARK_AS_UNTOUCHED',
  FocusActionType = 'ngrx/forms/FOCUS',
  UnfocusActionType = 'ngrx/forms/UNFOCUS',
  MarkAsSubmittedType = 'ngrx/forms/MARK_AS_SUBMITTED',
  MarkAsUnsubmittedType = 'ngrx/forms/MARK_AS_UNSUBMITTED',
  AddArrayControlActionType = 'ngrx/forms/ADD_ARRAY_CONTROL',
  AddGroupControlActionType = 'ngrx/forms/ADD_GROUP_CONTROL',
  RemoveArrayControlActionType = 'ngrx/forms/REMOVE_ARRAY_CONTROL',
  SwapArrayControlActionType = 'ngrx/forms/SWAP_ARRAY_CONTROL',
  MoveArrayControlActionType = 'ngrx/forms/MOVE_ARRAY_CONTROL',
  RemoveGroupControlActionType = 'ngrx/forms/REMOVE_CONTROL',
  SetUserDefinedPropertyActionType = 'ngrx/forms/SET_USER_DEFINED_PROPERTY',
  ResetActionType = 'ngrx/forms/RESET',
}

export const SetValueAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.SetValueActionType,
    props<{controlId: NgrxFormControlId, value: any}>()
)
/**
export class SetValueAction<TValue> implements Action {
  static readonly TYPE: 'ngrx/forms/SET_VALUE' = 'ngrx/forms/SET_VALUE';
  readonly type = SetValueAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly value: TValue,
  ) { }
}
*/

/*
export class SetErrorsAction implements Action {
  static readonly TYPE: 'ngrx/forms/SET_ERRORS' = 'ngrx/forms/SET_ERRORS';
  readonly type = SetErrorsAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly errors: ValidationErrors,
  ) { }
}
*/
export const SetErrorsAction = createAction(
  ALL_NGRX_FORMS_ACTION_TYPES.SetErrorsActionType,
  props<{controlId: NgrxFormControlId, errors: ValidationErrors}>()
)

/*
export class SetAsyncErrorAction implements Action {
  static readonly TYPE: 'ngrx/forms/SET_ASYNC_ERROR' = 'ngrx/forms/SET_ASYNC_ERROR';
  readonly type = SetAsyncErrorAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly name: string,
    public readonly value: any,
  ) { }
}
 */

export const SetAsyncErrorAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.SetAsyncErrorsActionType,
    props<{controlId: NgrxFormControlId, name: string, value: any}>()
)
/*
export class ClearAsyncErrorAction implements Action {
  static readonly TYPE: 'ngrx/forms/CLEAR_ASYNC_ERROR' = 'ngrx/forms/CLEAR_ASYNC_ERROR';
  readonly type = ClearAsyncErrorAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly name: string,
  ) { }
}
 */

export const ClearAsyncErrorAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.ClearAsyncErrorActionType,
    props<{controlId: NgrxFormControlId, name: string}>()
)
/*
export class StartAsyncValidationAction implements Action {
  static readonly TYPE: 'ngrx/forms/START_ASYNC_VALIDATION' = 'ngrx/forms/START_ASYNC_VALIDATION';
  readonly type = StartAsyncValidationAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly name: string,
  ) { }
}
*/

export const StartAsyncValidationAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.StartAsyncValidationActionType,
    props<{controlId: NgrxFormControlId, name: string}>()
)
/*
export class MarkAsDirtyAction implements Action {
  static readonly TYPE: 'ngrx/forms/MARK_AS_DIRTY' = 'ngrx/forms/MARK_AS_DIRTY';
  readonly type = MarkAsDirtyAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}
*/

export const MarkAsDirtyAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.MarkAsDirtyActionType,
    props<{controlId: NgrxFormControlId}>()
)

/*
export class MarkAsPristineAction implements Action {
  static readonly TYPE: 'ngrx/forms/MARK_AS_PRISTINE' = 'ngrx/forms/MARK_AS_PRISTINE';
  readonly type = MarkAsPristineAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}
*/
export const MarkAsPristineAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.MarkAsPristineActionType,
    props<{controlId: NgrxFormControlId}>()
)
/*
export class EnableAction implements Action {
  static readonly TYPE: 'ngrx/forms/ENABLE' = 'ngrx/forms/ENABLE';
  readonly type = EnableAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}
*/
export const EnableAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.EnableActionType,
    props<{controlId: NgrxFormControlId}>()
)
/*
export class DisableAction implements Action {
  static readonly TYPE: 'ngrx/forms/DISABLE' = 'ngrx/forms/DISABLE';
  readonly type = DisableAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}
*/
export const DisableAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.DisableActionType,
    props<{controlId: NgrxFormControlId}>()
)
/*
export class MarkAsTouchedAction implements Action {
  static readonly TYPE: 'ngrx/forms/MARK_AS_TOUCHED' = 'ngrx/forms/MARK_AS_TOUCHED';
  readonly type = MarkAsTouchedAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}
*/
export const MarkAsTouchedAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.MarkAsTouchedActionType,
    props<{controlId: NgrxFormControlId}>()
)

export const MarkAsUntouchedAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.MarkAsUnTouchedActionType,
    props<{controlId: NgrxFormControlId}>()
)
/*
export class MarkAsUntouchedAction implements Action {
  static readonly TYPE: 'ngrx/forms/MARK_AS_UNTOUCHED' = 'ngrx/forms/MARK_AS_UNTOUCHED';
  readonly type = MarkAsUntouchedAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}
*/
/*
export class FocusAction implements Action {
  static readonly TYPE: 'ngrx/forms/FOCUS' = 'ngrx/forms/FOCUS';
  readonly type = FocusAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}
*/
export const FocusAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.FocusActionType,
    props<{controlId: NgrxFormControlId}>()
)
/*
export class UnfocusAction implements Action {
  static readonly TYPE: 'ngrx/forms/UNFOCUS' = 'ngrx/forms/UNFOCUS';
  readonly type = UnfocusAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}
*/
export const UnfocusAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.UnfocusActionType,
    props<{controlId: NgrxFormControlId}>()
)
/*
export class MarkAsSubmittedAction implements Action {
  static readonly TYPE: 'ngrx/forms/MARK_AS_SUBMITTED' = 'ngrx/forms/MARK_AS_SUBMITTED';
  readonly type = MarkAsSubmittedAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}
*/
export const MarkAsSubmittedAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.MarkAsSubmittedType,
    props<{controlId: NgrxFormControlId}>()
)
/*
export class MarkAsUnsubmittedAction implements Action {
  static readonly TYPE: 'ngrx/forms/MARK_AS_UNSUBMITTED' = 'ngrx/forms/MARK_AS_UNSUBMITTED';
  readonly type = MarkAsUnsubmittedAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}
*/
export const MarkAsUnsubmittedAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.MarkAsUnsubmittedType,
    props<{controlId: NgrxFormControlId}>()
)

/*
export class AddArrayControlAction<TValue> implements Action {
  static readonly TYPE: 'ngrx/forms/ADD_ARRAY_CONTROL' = 'ngrx/forms/ADD_ARRAY_CONTROL';
  readonly type = AddArrayControlAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly value: TValue,
    public readonly index?: number,
  ) { }
}
*/

export const AddArrayControlAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.AddArrayControlActionType,
    props<{
        controlId: NgrxFormControlId,
        value: any,
        index?: number
    }>()
)

export const AddGroupControlAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.AddGroupControlActionType,
    props<{controlId: NgrxFormControlId, name: string, value: any}>()
)
/*
export class AddGroupControlAction<TValue extends KeyValue, TControlKey extends keyof TValue = keyof TValue> implements Action {
  static readonly TYPE: 'ngrx/forms/ADD_GROUP_CONTROL' = 'ngrx/forms/ADD_GROUP_CONTROL';
  readonly type = AddGroupControlAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly name: keyof TValue,
    public readonly value: TValue[TControlKey],
  ) { }
}
*/
/*
export class RemoveArrayControlAction implements Action {
  static readonly TYPE: 'ngrx/forms/REMOVE_ARRAY_CONTROL' = 'ngrx/forms/REMOVE_ARRAY_CONTROL';
  readonly type = RemoveArrayControlAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly index: number,
  ) { }
}
*/
export const RemoveArrayControlAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.RemoveArrayControlActionType,
    props<{controlId: NgrxFormControlId, index: number}>()
)
/*
export class SwapArrayControlAction implements Action {
  static readonly TYPE: 'ngrx/forms/SWAP_ARRAY_CONTROL' = 'ngrx/forms/SWAP_ARRAY_CONTROL';
  readonly type = SwapArrayControlAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly fromIndex: number,
    public readonly toIndex: number
  ) { }
}
*/
export const SwapArrayControlAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.SwapArrayControlActionType,
    props<{
      controlId: NgrxFormControlId,
      fromIndex: number,
      toIndex: number
    }>()
)
/*
export class MoveArrayControlAction implements Action {
  static readonly TYPE: 'ngrx/forms/MOVE_ARRAY_CONTROL' = 'ngrx/forms/MOVE_ARRAY_CONTROL';
  readonly type = MoveArrayControlAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly fromIndex: number,
    public readonly toIndex: number
  ) { }
}
*/

export const MoveArrayControlAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.MoveArrayControlActionType,
    props<{
      controlId: NgrxFormControlId,
      fromIndex: number,
      toIndex: number
    }>()
)
/*
export class RemoveGroupControlAction<TValue> implements Action {
  static readonly TYPE: 'ngrx/forms/REMOVE_CONTROL' = 'ngrx/forms/REMOVE_CONTROL';
  readonly type = RemoveGroupControlAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly name: keyof TValue,
  ) { }
}
*/

export const RemoveGroupControlAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.RemoveGroupControlActionType,
    props<{
        controlId: NgrxFormControlId,
        name: string
    }>()
)
/*
export class SetUserDefinedPropertyAction implements Action {
  static readonly TYPE: 'ngrx/forms/SET_USER_DEFINED_PROPERTY' = 'ngrx/forms/SET_USER_DEFINED_PROPERTY';
  readonly type = SetUserDefinedPropertyAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly name: string,
    public readonly value: any,
  ) { }
}
*/

export const SetUserDefinedPropertyAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.SetUserDefinedPropertyActionType,
    props<{
        controlId: NgrxFormControlId,
        name: string,
        value: any
    }>()
)

/*
export class ResetAction implements Action {
  static readonly TYPE: 'ngrx/forms/RESET' = 'ngrx/forms/RESET';
  readonly type = ResetAction.TYPE;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}
*/

export const ResetAction = createAction(
    ALL_NGRX_FORMS_ACTION_TYPES.ResetActionType,
    props<{controlId: NgrxFormControlId}>()
)
// export type Actions<TValue> =
//   | SetValueAction<TValue>
//   | SetErrorsAction
//   | SetAsyncErrorAction
//   | ClearAsyncErrorAction
//   | StartAsyncValidationAction
//   | MarkAsDirtyAction
//   | MarkAsPristineAction
//   | EnableAction
//   | DisableAction
//   | MarkAsTouchedAction
//   | MarkAsUntouchedAction
//   | FocusAction
//   | UnfocusAction
//   | MarkAsSubmittedAction
//   | MarkAsUnsubmittedAction
//   | AddGroupControlAction<TValue>
//   | RemoveGroupControlAction<TValue>
//   | AddArrayControlAction<any>
//   | RemoveArrayControlAction
//   | SetUserDefinedPropertyAction
//   | ResetAction
//   | SwapArrayControlAction
//   | MoveArrayControlAction
//   ;

export function isNgrxFormsAction(action: Action) {
  return !!action.type && action.type.startsWith('ngrx/forms/');
}

// export const ALL_NGRX_FORMS_ACTION_TYPES: Actions<any>['type'][] = [
//   SetValueAction.TYPE,
//   SetErrorsAction.TYPE,
//   SetAsyncErrorAction.TYPE,
//   ClearAsyncErrorAction.TYPE,
//   StartAsyncValidationAction.TYPE,
//   MarkAsDirtyAction.TYPE,
//   MarkAsPristineAction.TYPE,
//   EnableAction.TYPE,
//   DisableAction.TYPE,
//   MarkAsTouchedAction.TYPE,
//   MarkAsUntouchedAction.TYPE,
//   FocusAction.TYPE,
//   UnfocusAction.TYPE,
//   MarkAsSubmittedAction.TYPE,
//   MarkAsUnsubmittedAction.TYPE,
//   AddGroupControlAction.TYPE,
//   RemoveGroupControlAction.TYPE,
//   AddArrayControlAction.TYPE,
//   RemoveArrayControlAction.TYPE,
//   SetUserDefinedPropertyAction.TYPE,
//   ResetAction.TYPE,
//   SwapArrayControlAction.TYPE,
//   MoveArrayControlAction.TYPE,
// ];
