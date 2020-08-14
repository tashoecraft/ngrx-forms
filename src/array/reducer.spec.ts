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
import { createFormArrayState } from '../state';
import { formArrayReducer } from './reducer';

describe('form array reducer', () => {
  const FORM_CONTROL_ID = 'test ID';
  const FORM_CONTROL_0_ID = `${FORM_CONTROL_ID}.0`;
  type FormArrayValue = string[];
  const INITIAL_FORM_CONTROL_VALUE: FormArrayValue = [''];
  const INITIAL_STATE = createFormArrayState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);

  it('should skip any non-ngrx-forms action', () => {
    const resultState = formArrayReducer(INITIAL_STATE, { type: '' } as any);
    expect(resultState).toBe(INITIAL_STATE as any);
  });

  it('should skip any action with non-equal control ID', () => {
    const resultState = formArrayReducer(INITIAL_STATE, SetValueAction({controlId: `A${FORM_CONTROL_ID}`, value: 'A'}) as any);
    expect(resultState).toBe(INITIAL_STATE as any);
  });

  it(`should forward ${FocusAction.name}s to children`, () => {
    const resultState: any = formArrayReducer(INITIAL_STATE, FocusAction({controlId: FORM_CONTROL_0_ID}) as any);
    expect(resultState?.controls[0].isFocused).toEqual(true);
    expect(resultState?.controls[0].isUnfocused).toEqual(false);
  });

  it(`should forward ${UnfocusAction.name}s to children`, () => {
    const state = {
      ...INITIAL_STATE,
      controls: [
        {
          ...INITIAL_STATE.controls[0],
          isFocused: true,
          isUnfocused: false,
        },
      ],
    };
    const resultState: any = formArrayReducer(state,  UnfocusAction({controlId: FORM_CONTROL_0_ID}) as any);
    expect(resultState.controls[0].isFocused).toEqual(false);
    expect(resultState.controls[0].isUnfocused).toEqual(true);
  });

  it(`should forward ${AddGroupControlAction.name}s to children`, () => {
    const value = [{ inner: '' }];
    const state = createFormArrayState(FORM_CONTROL_ID, value);
    const resultState: any = formArrayReducer(state, AddGroupControlAction({controlId: FORM_CONTROL_0_ID, name: 'inner2', value: ''}));
    expect((resultState.controls[0].controls as any).inner2).toBeDefined();
  });

  it(`should forward ${RemoveGroupControlAction.name}s to children`, () => {
    const value = [{ inner: '', inner2: '' }];
    const state = createFormArrayState(FORM_CONTROL_ID, value);
    const resultState: any = formArrayReducer(state,  RemoveGroupControlAction({controlId: FORM_CONTROL_0_ID, name: 'inner2'}));
    expect(resultState.controls[0].controls.inner2).toBeUndefined();
  });

  it('should not update state if no child was updated', () => {
    const resultState = formArrayReducer(INITIAL_STATE, SetValueAction({controlId: FORM_CONTROL_0_ID, value: ''}) as any);
    expect(resultState).toBe(INITIAL_STATE as any);
  });

  it('should not update state value if no child value was updated', () => {
    const resultState: any = formArrayReducer(INITIAL_STATE,  MarkAsDirtyAction({controlId: FORM_CONTROL_0_ID}));
    expect(resultState.value).toBe(INITIAL_STATE.value);
  });

  it('should not reset child states', () => {
    const value = 'A';
    const state: any = formArrayReducer(INITIAL_STATE, SetValueAction({controlId: FORM_CONTROL_0_ID, value}) as any);
    const resultState: any = formArrayReducer(state, MarkAsSubmittedAction({controlId: FORM_CONTROL_ID}));
    expect(resultState.controls[0].value).toBe(value);
  });

  it('should not be stateful', () => {
    formArrayReducer(INITIAL_STATE, SetValueAction({controlId: FORM_CONTROL_ID, value: []}));
    expect(() => formArrayReducer(INITIAL_STATE,  MarkAsDirtyAction({controlId: FORM_CONTROL_ID}))).not.toThrowError();
  });

  it('should preserve the order of properties when stringified', () => {
    const expected = JSON.stringify(INITIAL_STATE);
    let state: any = formArrayReducer(INITIAL_STATE,  MarkAsDirtyAction({controlId: FORM_CONTROL_ID}));
    state = formArrayReducer(state,  MarkAsPristineAction({controlId: FORM_CONTROL_ID}));
    expect(JSON.stringify(state)).toEqual(expected);
  });

  it('should throw if state is undefined', () => {
    expect(() => formArrayReducer(undefined, { type: '' })).toThrowError();
  });

  it('should throw if state is not an array state', () => {
    expect(() => formArrayReducer(INITIAL_STATE.controls[0] as any, MarkAsDirtyAction({controlId: FORM_CONTROL_ID}))).toThrowError();
  });

  describe(SetValueAction.name, () => {
    it('should update state', () => {
      const resultState = formArrayReducer(INITIAL_STATE, SetValueAction({controlId: FORM_CONTROL_ID, value: ['A']}));
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(SetErrorsAction.name, () => {
    it('should update state', () => {
      const errors = { required: true };
      const resultState = formArrayReducer(INITIAL_STATE, SetErrorsAction({controlId: FORM_CONTROL_ID, errors}));
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(StartAsyncValidationAction.name, () => {
    it('should update state', () => {
      const name = 'required';
      const resultState = formArrayReducer(INITIAL_STATE, StartAsyncValidationAction({controlId: FORM_CONTROL_ID, name}));
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(SetAsyncErrorAction.name, () => {
    it('should update state', () => {
      const name = 'required';
      const value = true;
      const state = { ...INITIAL_STATE, pendingValidations: [name], isValidationPending: true };
      const resultState = formArrayReducer(state, SetAsyncErrorAction({controlId: FORM_CONTROL_ID, name, value}));
      expect(resultState).not.toBe(INITIAL_STATE as any);
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

      const resultState = formArrayReducer(state, ClearAsyncErrorAction({controlId: FORM_CONTROL_ID, name}));
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(MarkAsDirtyAction.name, () => {
    it('should update state', () => {
      const resultState = formArrayReducer(INITIAL_STATE,  MarkAsDirtyAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(MarkAsPristineAction.name, () => {
    it('should update state', () => {
      const state = { ...INITIAL_STATE, isDirty: true, isPristine: false };
      const resultState = formArrayReducer(state,  MarkAsPristineAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(EnableAction.name, () => {
    it('should update state', () => {
      const state = { ...INITIAL_STATE, isEnabled: false, isDisabled: true };
      const resultState = formArrayReducer(state, EnableAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(DisableAction.name, () => {
    it('should update state', () => {
      const resultState = formArrayReducer(INITIAL_STATE, DisableAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(MarkAsTouchedAction.name, () => {
    it('should update state', () => {
      const resultState = formArrayReducer(INITIAL_STATE, MarkAsTouchedAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(MarkAsUntouchedAction.name, () => {
    it('should update state', () => {
      const state = { ...INITIAL_STATE, isTouched: true, isUntouched: false };
      const resultState = formArrayReducer(state, MarkAsUntouchedAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(MarkAsSubmittedAction.name, () => {
    it('should update state', () => {
      const resultState = formArrayReducer(INITIAL_STATE, MarkAsSubmittedAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(MarkAsUnsubmittedAction.name, () => {
    it('should update state', () => {
      const state = { ...INITIAL_STATE, isSubmitted: true, isUnsubmitted: false };
      const resultState = formArrayReducer(state, MarkAsUnsubmittedAction({controlId: FORM_CONTROL_ID}));
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(SetUserDefinedPropertyAction.name, () => {
    it('should update state', () => {
      const action = SetUserDefinedPropertyAction({controlId: FORM_CONTROL_ID, name: 'prop', value: 12});
      const resultState = formArrayReducer<string>(INITIAL_STATE, action);
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(ResetAction.name, () => {
    it('should update state', () => {
      const action =  ResetAction({controlId: FORM_CONTROL_ID});
      const state = { ...INITIAL_STATE, isSubmitted: true, isUnsubmitted: false };
      const resultState = formArrayReducer<string>(state, action);
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(AddArrayControlAction.name, () => {
    it('should update state', () => {
      const action = AddArrayControlAction({controlId: FORM_CONTROL_ID, value: ''});
      const resultState = formArrayReducer<string>(INITIAL_STATE, action);
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });

  describe(RemoveArrayControlAction.name, () => {
    it('should update state', () => {
      const action = RemoveArrayControlAction({controlId: FORM_CONTROL_ID, index: 0});
      const resultState = formArrayReducer<string>(INITIAL_STATE, action);
      expect(resultState).not.toBe(INITIAL_STATE as any);
    });
  });
});
