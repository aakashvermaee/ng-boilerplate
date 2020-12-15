import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import {
  SimpleSnackBar,
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openFromText(
    message: string,
    action?: string,
    config?: MatSnackBarConfig
  ): MatSnackBarRef<SimpleSnackBar> {
    config = _.assign(
      {},
      {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      },
      config
    );
    return this._snackBar.open(message, action, config);
  }

  openFromComponent<C extends SimpleSnackBar>(
    component: ComponentType<any>,
    config?: MatSnackBarConfig
  ): MatSnackBarRef<C> {
    config = _.assign({}, { duration: 2000 }, config);
    return this._snackBar.openFromComponent(component, config);
  }
}
