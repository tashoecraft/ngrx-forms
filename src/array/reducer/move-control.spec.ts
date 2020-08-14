import { MoveArrayControlAction } from '../../actions';
import { createFormArrayState } from '../../state';
import { moveControlReducer } from './move-control';
import { FORM_CONTROL_0_ID, FORM_CONTROL_ID, INITIAL_STATE_NESTED_GROUP } from './test-util';

describe(`form array ${moveControlReducer.name}`, () => {
  const testArrayValue = [0, 1, 2, 3, 4, 5];
  const testArrayState = createFormArrayState(FORM_CONTROL_ID, testArrayValue);

  it('should move controls forward', () => {
    let action = MoveArrayControlAction({controlId: FORM_CONTROL_ID, fromIndex: 2, toIndex: 5});
    let resultState = moveControlReducer(testArrayState, action);
    expect(resultState).not.toBe(testArrayState);
    expect(resultState.controls).not.toBe(testArrayState.controls);
    expect(resultState.value).toEqual([0, 1, 3, 4, 5, 2]);
    expect(resultState.isDirty).toEqual(true);

    action = MoveArrayControlAction({controlId: FORM_CONTROL_ID, fromIndex: 0, toIndex: 3});
    resultState = moveControlReducer(testArrayState, action);
    expect(resultState.value).toEqual([1, 2, 3, 0, 4, 5]);
  });

  it('should move controls backwards', () => {
    let action = MoveArrayControlAction({controlId: FORM_CONTROL_ID, fromIndex: 5, toIndex: 2});
    let resultState = moveControlReducer(testArrayState, action);
    expect(resultState).not.toBe(testArrayState);
    expect(resultState.controls).not.toBe(testArrayState.controls);
    expect(resultState.value).toEqual([0, 1, 5, 2, 3, 4]);

    action = MoveArrayControlAction({controlId: FORM_CONTROL_ID, fromIndex: 3, toIndex: 0});
    resultState = moveControlReducer(testArrayState, action);
    expect(resultState.value).toEqual([3, 0, 1, 2, 4, 5]);
  });

  it('should throw an error for negative or too large indices', () => {
    expect(() =>
      moveControlReducer(
        INITIAL_STATE_NESTED_GROUP,
        MoveArrayControlAction({controlId: FORM_CONTROL_ID, fromIndex: 0, toIndex: INITIAL_STATE_NESTED_GROUP.controls.length}))
    ).toThrowError();
    expect(() =>
      moveControlReducer(
        INITIAL_STATE_NESTED_GROUP,
        MoveArrayControlAction({controlId: FORM_CONTROL_ID, fromIndex: INITIAL_STATE_NESTED_GROUP.controls.length, toIndex: 0}))
    ).toThrowError();
    expect(() =>
      moveControlReducer(
        INITIAL_STATE_NESTED_GROUP,
        MoveArrayControlAction({controlId: FORM_CONTROL_ID, fromIndex: INITIAL_STATE_NESTED_GROUP.controls.length, toIndex: -3}))
    ).toThrowError();
    expect(() =>
      moveControlReducer(
        INITIAL_STATE_NESTED_GROUP,
        MoveArrayControlAction({controlId: FORM_CONTROL_ID, fromIndex: -1, toIndex: 0}))
    ).toThrowError();
  });

  it('should return the state on a 0 move', () => {
    const action = MoveArrayControlAction({controlId: FORM_CONTROL_ID, fromIndex: 1, toIndex: 1});
    const resultState = moveControlReducer(testArrayState, action);
    expect(resultState).toBe(testArrayState);
  });

  it('should return the state if applied on a different state ID', () => {
    const action = MoveArrayControlAction({controlId: FORM_CONTROL_0_ID, fromIndex: 0, toIndex: 1});
    const resultState = moveControlReducer(testArrayState, action);
    expect(resultState).toBe(testArrayState);
  });

  it('should update nested group IDs after a move', () => {
    const action = MoveArrayControlAction({controlId: FORM_CONTROL_ID, fromIndex: 0, toIndex: 1});
    const resultState = moveControlReducer(INITIAL_STATE_NESTED_GROUP, action);
    resultState.controls.forEach((control: any, index: number) => {
      expect(control.id).toEqual(`${FORM_CONTROL_ID}.${index}`);
      expect(control.controls.inner.id).toEqual(`${FORM_CONTROL_ID}.${index}.inner`);
    });
  });

  it('should update nested array child IDs after a move', () => {
    const testValue = [{ array: [0, 1, 2, 3] }, { array: [0, 1, 2, 3] }];
    const testState = createFormArrayState(FORM_CONTROL_ID, testValue);
    const action = MoveArrayControlAction({controlId: FORM_CONTROL_ID, fromIndex: 0, toIndex: 1});
    const resultState = moveControlReducer(testState, action);
    resultState.controls.forEach((control: any, index: number) => {
      expect(control.id).toEqual(`${FORM_CONTROL_ID}.${index}`);
      expect(control.controls.array.id).toEqual(`${FORM_CONTROL_ID}.${index}.array`);
      control.controls.array.controls.forEach((c: any, i: any) => {
        expect(c.id).toEqual(`${FORM_CONTROL_ID}.${index}.array.${i}`);
      });
    });
  });

  it('should mark the array as dirty', () => {
    const action = MoveArrayControlAction({controlId: FORM_CONTROL_ID, fromIndex: 3, toIndex: 1});
    const resultState = moveControlReducer(testArrayState, action);
    expect(resultState).not.toBe(testArrayState);
    expect(resultState.isDirty).toEqual(true);
  });
});
