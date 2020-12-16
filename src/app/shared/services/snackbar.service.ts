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
  constructor(private snackBar: MatSnackBar) {}

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
    return this.snackBar.open(message, action, config);
  }

  openFromComponent<C extends SimpleSnackBar>(
    component: ComponentType<any>,
    config?: MatSnackBarConfig
  ): MatSnackBarRef<C> {
    config = _.assign({}, { duration: 2000 }, config);
    return this.snackBar.openFromComponent(component, config);
  }
}
