import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'alert-dialog',
    templateUrl: 'alert.dialog.html',
})
export class AlertDialog {

    constructor(
        public dialogRef: MatDialogRef<AlertDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

}
