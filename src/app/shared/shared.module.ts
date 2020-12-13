import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [NotFoundComponent, SafeHtmlPipe, ModalComponent],
  imports: [CommonModule],
  exports: [NotFoundComponent, SafeHtmlPipe],
})
export class SharedModule {}
