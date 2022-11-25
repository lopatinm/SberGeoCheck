import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'error-dialog',
    templateUrl: 'error.dialog.html',
})
export class ErrorDialog {

    constructor(
        public dialogRef: MatDialogRef<ErrorDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

}
