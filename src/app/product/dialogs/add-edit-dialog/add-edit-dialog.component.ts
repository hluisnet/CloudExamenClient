import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../product-list/product-list.component';

@Component({
  selector: 'add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.scss']
})
export class AddEditDialogComponent {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) {
      dialogRef.disableClose = true;
      dialogRef.addPanelClass
     }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      weigth: ['', Validators.required],
      price: ['', Validators.required]
    });
  }


  get f() { return this.formGroup.controls; }

  submit(form) {
    
  }

  close(): void {
    this.dialogRef.close();
  }


  public confirmAdd(): void {
    //this.dataService.addIssue(this.data);
  }
//#region 

//#endregion

}
