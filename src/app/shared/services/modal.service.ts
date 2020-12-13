import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { IModalData } from '../types/IModalData';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalConfig: MatDialogConfig = {
    autoFocus: true,
  };

  constructor(private dialog: MatDialog) {}

  openDialog<C extends ModalComponent>(
    modalData: IModalData,
    modalConfig?: MatDialogConfig,
    component?: any
  ): MatDialogRef<C> {
    modalConfig = modalConfig ? modalConfig : ({} as MatDialogConfig);

    return this.dialog.open(component || ModalComponent, {
      ...this.modalConfig,
      ...modalConfig,
      data: modalData,
    });
  }
}
