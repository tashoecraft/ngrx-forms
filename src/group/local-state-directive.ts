import { Directive, EventEmitter, Output } from '@angular/core';
import { NgrxFormDirective } from './directive';
import {Action} from "@ngrx/store";

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'form[ngrxFormState][ngrxFormsAction]',
})
export class NgrxLocalFormDirective<TValue extends { [key: string]: any }>
  extends NgrxFormDirective<TValue> {

  @Output() ngrxFormsAction = new EventEmitter<Action>();

  constructor() {
    super(null);
  }

  protected dispatchAction(action: Action) {
    this.ngrxFormsAction.emit(action);
  }
}
