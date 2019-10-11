import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    MatDialogModule,
    MatButtonModule
],
entryComponents: [
  ConfirmDialogComponent
],
})
export class ConfirmDialogModule { }
