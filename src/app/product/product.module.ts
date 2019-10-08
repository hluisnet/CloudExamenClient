import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatCardModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatDialogModule,
 
  } from '@angular/material';
import { AddEditDialogComponent } from './dialogs/add-edit-dialog/add-edit-dialog.component';



@NgModule({
  declarations: [ProductComponent, ProductListComponent, AddEditDialogComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  entryComponents: [
    AddEditDialogComponent
  ]

})

export class ProductModule { }
