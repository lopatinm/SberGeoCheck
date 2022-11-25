import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialog } from './error.dialog';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ErrorDialog],
  entryComponents: [ErrorDialog],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports: [
    ErrorDialog,
  ]
})
export class ErrorModule { }
