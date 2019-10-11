import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductModel } from '../../../models/Product/product';
import { CreateProductModel } from '../../../models/Product/create-product';

@Component({
  selector: 'add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.scss']
})
export class AddEditDialogComponent {

  action: string;
  product: ProductModel;
  productForm: FormGroup;
  dialogTitle: string;
  // formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
    ) {
      this.action = data.action;
      if (this.action === 'edit') {
        this.dialogTitle = 'Edit Product';
        this.product = data.product;
        this.productForm = this.generateProductForm();
      }
      else {
        this.dialogTitle = 'New Product';
        this.product = new ProductModel({});
      }
      this.productForm = this.generateProductForm();
      // dialogRef.disableClose = true;
      // dialogRef.addPanelClass
     }

     generateProductForm(): FormGroup {
      return this.formBuilder.group({
        id: [this.product.id],
        name: [this.product.name, Validators.required],
        description: [this.product.description],
        weight: [this.product.weight, Validators.required],
        price: [this.product.price, Validators.required]
      });
    }

  // ngOnInit() {

  //   this.formGroup = this.formBuilder.group({
  //     name: ['', Validators.required],
  //     description: '',
  //     weigth: ['', Validators.required],
  //     price: ['', Validators.required]
  //   });
  // }


  // get f() { return this.formGroup.controls; }

  // submit(form) {
    
  // }

  // close(): void {
  //   this.dialogRef.close();
  // }


  // public confirmAdd(): void {
  //   //this.dataService.addIssue(this.data);
  // }
//#region 

//#endregion

}
