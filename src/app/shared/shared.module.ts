import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [NotFoundComponent, SafeHtmlPipe],
  imports: [CommonModule],
  exports: [NotFoundComponent, SafeHtmlPipe],
})
export class SharedModule {}
