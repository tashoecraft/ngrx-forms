import {
  AddArrayControlAction,
  AddGroupControlAction,
  ClearAsyncErrorAction,
  DisableAction,
  EnableAction,
  FocusAction,
  MarkAsDirtyAction,
  MarkAsPristineAction,
  MarkAsSubmittedAction,
  MarkAsTouchedAction,
  MarkAsUnsubmittedAction,
  MarkAsUntouchedAction,
  RemoveArrayControlAction,
  RemoveGroupControlAction,
  ResetAction,
  SetAsyncErrorAction,
  SetErrorsAction,
  SetUserDefinedPropertyAction,
  SetValueAction,
  StartAsyncValidationAction,
  UnfocusAction,
} from '../actions';
import { createFormGroupState } from '../state';
import { formGroupReducer } from './reducer';

describe('form group reducer', () => {
  const FORM_CONTROL_ID = 'test ID';
  const FORM_CONTROL_INNER_ID = `${FORM_CONTROL_ID}.inner`;
  const FORM_CONTROL_INNER5_ID = `${FORM_CONTROL_ID}.inner5`;
  interface FormGroupValue { inner: string; inner2?: string; inner3?: { inner4: string }; inner5?: string[]; }
  const INITIAL_FORM_CONTROL_VALUE: FormGroupValue = { inner: '' };
  const INITIAL_FORM_CONTROL_VALUE_FULL: FormGroupValue = { inner: '', inner2: '', inner3: { inner4: '' }, inner5: [''] };
  const INITIAL_STATE = createFormGroupState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
  const INITIAL_STATE_FULL = createFormGroupState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE_FULL);

  it('should skip any non-ngrx-forms action', () => {
    const resultState = formGroupReducer(INITIAL_STATE, { type: '' } as any);
    expect(resultState).toBe(INITIAL_STATE);
  });

  it('should skip any action with non-equal control ID', () => {
    const resultState = formGroupReducer(INITIAL_STATE, SetValueAction({controlId: `A${FORM_CONTROL_ID}`, value: 'A'}));
    expect(resultState).toBe(INITIAL_STATE);
  });

  it(`should forward ${FocusAction.name}s to children`, () => {
    const resultState: any = formGroupReducer(INITIAL_STATE, FocusAction({controlId: FORM_CONTROL_INNER_ID}));
    expect(resultState.controls.inner.isFocused).toEqual(true);
    expect(resultState.controls.inner.isUnfocused).toEqual(false);
  });

  it(`should forward ${UnfocusAction.name}s to children`, () => {
    const state = {
      ...INITIAL_STATE,
      controls: {
        inner: {
          ...INITIAL_STATE.controls.inner,
          isFocused: true,
          isUnfocused: false,
        },
      },
    };
    const resultState: any = formGroupReducer(state, UnfocusAction({controlId: FORM_CONTROL_INNER_ID}));
    expect(resultState.controls.inner.isFocused).toEqual(false);
    expect(resultState.controls.inner.isUnfocused).toEqual(true);
  });

  it(`should forward add ${AddArrayControlAction.name}s to children`, () => {
    const resultState: any = formGroupReducer(INITIAL_STATE_FULL, AddArrayControlAction({controlId: FORM_CONTROL_INNER5_ID, value: ''}));
    expect(resultState.controls.inner5!.controls[1]).toBeDefined();
  });

  it(`should forward remove ${RemoveArrayControlAction.name}s to children`, () => {
    const resultState: any = formGroupReducer(INITIAL_STATE_FULL, RemoveArrayControlAction({controlId: FORM_CONTROL_INNER5_ID, index: 0}));
    expect(resultState.controls.inner5!.controls[0]).toBeUndefined();
  });

  it('should not update state if no child was updated', () => {
    const resultState: any = formGroupReducer(INITIAL_STATE, SetValueAction({controlId: FORM_CONTROL_INNER_ID, value: ''}));
    expect(resultState).toBe(INITIAL_STATE);
  });

  it('should not update state value if no child value was updated', () => {
    const resultState: any = formGroupReducer(INITIAL_STATE, MarkAsDirtyAction({controlId: FORM_CONTROL_INNER_ID}));
    expect(resultState.value).toBe(INITIAL_STATE.value);
  });

  it('should not reset child states', () => {
    const value = 'A';
    const state = formGroupReducer(INITIAL_STATE, SetValueAction({controlId: FORM_CONTROL_INNER_ID, value}));
    const resultState: any = formGroupReducer(state, MarkAsSubmittedAction({controlId: FORM_CONTROL_ID}));
    expect(resultState.controls.inner.value).toBe(value);
  });

  it('should not be stateful', () => {
    formGroupReducer(INITIAL_STATE_FULL, SetValueAction({controlId: FORM_CONTROL_ID, value: INITIAL_FORM_CONTROL_VALUE}));
    expect(() => formGroupReducer(INITIAL_STATE_FULL, MarkAsDirtyAction({controlId: FORM_CONTROL_ID}))).not.toThrowError();
  });

  it('should preserve the order of properties when stringified', () => {
    const expected = JSON.stringify(INITIAL_STATE_FULL);
    let state = formGroupReducer(INITIAL_STATE_FULL, MarkAsDirtyAction({controlId: FORM_CONTROL_ID}));
    state = formGroupReducer(state, MarkAsPristineAction({controlId: FORM_CONTROL_ID}));
    expect(JSON.stringify(state)).toEqual(expected);
  });

  it('should throw if trying to set a date as value', () => {
    const state = createFormGroupState<any>(FORM_CONTROL_ID, {});
    expect(() => formGroupReducer(state, SetValueAction({controlId: FORM_CONTROL_ID, value: new Date()}))).toThrowError();
  });

  it('should throw if trying to set a date as a child value', () => {
    const state = createFormGroupState<any>(FORM_CONTROL_ID, { inner: null });
    expect(() => formGroupReducer(state, SetValueAction({controlId: FORM_CONTROL_INNER_ID, value: new Date()}))).toThrowError();
  });

  it('should throw if state is undefined', () => {
    expect(() => formGroupReducer(undefined, { type: '' })).toThrowError();
  });

  it('should throw if state is not a group state', () => {
    expect(() => formGroupReducer(INITIAL_STATE.controls.inner as any, MarkAsDirtyAction({controlId: FORM_CONTROL_ID}))).toThrowError();
  });

  describe(SetValueAction.name, () => {
    it('should update state', () => {
      const resultState = formGroupReducer(INITIAL_STATE, SetValueAction({controlId: FORM_CONTROL_ID, value: { inner: 'A' }}));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(SetErrorsAction.name, () => {
    it('should update state', () => {
      const errors = { required: true };
      const resultState = formGroupReducer(INITIAL_STATE, SetErrorsAction({controlId: FORM_CONTROL_ID, errors}));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(StartAsyncValidationAction.name, () => {
    it('should update state', () => {
      const name = 'required';
      const resultState = formGroupReducer(INITIAL_STATE, StartAsyncValidationAction({controlId: FORM_CONTROL_ID, name}));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(SetAsyncErrorAction.name, () => {
    it('should update state', () => {
      const name = 'required';
      const value = true;
      const state = { ...INITIAL_STATE, pendingValidations: [name], isValidationPending: true };
      const resultState = formGroupReducer(state, SetAsyncErrorAction({controlId: FORM_CONTROL_ID, name, value}));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(ClearAsyncErrorAction.name, () => {
    it('should update state', () => {
      const name = 'required';
      const state = {
        ...INITIAL_STATE,
        isValid: false,
        isInvalid: true,
        errors: { [`$${name}`]: true },
        pendingValidations: [name],
        isValidationPending: true,
      };

      const resultState = formGroupReducer(state, ClearAsyncErrorAction({controlId: FORM_CONTROL_ID, name}));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(MarkAsDirtyAction.name, () => {
    it('should update state', () => {
      const resultState = formGroupReducer(INITIAL_STATE, MarkAsDirtyAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(MarkAsPristineAction.name, () => {
    it('should update state', () => {
      const state = { ...INITIAL_STATE, isDirty: true, isPristine: false };
      const resultState = formGroupReducer(state, MarkAsPristineAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(EnableAction.name, () => {
    it('should update state', () => {
      const state = { ...INITIAL_STATE, isEnabled: false, isDisabled: true };
      const resultState = formGroupReducer(state, EnableAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(DisableAction.name, () => {
    it('should update state', () => {
      const resultState = formGroupReducer(INITIAL_STATE, DisableAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(MarkAsTouchedAction.name, () => {
    it('should update state', () => {
      const resultState = formGroupReducer(INITIAL_STATE, MarkAsTouchedAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(MarkAsUntouchedAction.name, () => {
    it('should update state', () => {
      const state = { ...INITIAL_STATE, isTouched: true, isUntouched: false };
      const resultState = formGroupReducer(state, MarkAsUntouchedAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(MarkAsSubmittedAction.name, () => {
    it('should update state', () => {
      const resultState = formGroupReducer(INITIAL_STATE, MarkAsSubmittedAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(MarkAsUnsubmittedAction.name, () => {
    it('should update state', () => {
      const state = { ...INITIAL_STATE, isSubmitted: true, isUnsubmitted: false };
      const resultState = formGroupReducer(state, MarkAsUnsubmittedAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(AddGroupControlAction.name, () => {
    it('should update state', () => {
      const action = AddGroupControlAction({controlId: FORM_CONTROL_ID, name: 'inner2', value: ''});
      const resultState = formGroupReducer(INITIAL_STATE, action);
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(RemoveGroupControlAction.name, () => {
    it('should update state', () => {
      const action = RemoveGroupControlAction({controlId: FORM_CONTROL_ID, name: 'inner2'});
      const resultState = formGroupReducer(INITIAL_STATE_FULL, action);
      expect(resultState).not.toBe(INITIAL_STATE_FULL);
    });
  });

  describe(SetUserDefinedPropertyAction.name, () => {
    it('should update state', () => {
      const action = SetUserDefinedPropertyAction({controlId: FORM_CONTROL_ID, name: 'prop', value: 12});
      const resultState = formGroupReducer(INITIAL_STATE_FULL, action);
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(ResetAction.name, () => {
    it('should update state', () => {
      const action = ResetAction({controlId: FORM_CONTROL_ID});
      const state = { ...INITIAL_STATE, isSubmitted: true, isUnsubmitted: false };
      const resultState = formGroupReducer(state, action);
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });
});
