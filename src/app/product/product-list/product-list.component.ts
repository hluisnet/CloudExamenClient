import { Component, OnInit, ViewChild } from '@angular/core';
import { products } from 'src/app/models/products';
import { MatTableModule, MatSort, MatButton, MatDialog } from '@angular/material'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckbox } from '@angular/material';
import { AddEditDialogComponent } from '../dialogs/add-edit-dialog/add-edit-dialog.component';


export interface Product {
  id: number;
  name: string;
  description: string;
  weight: number;
  price: number;
}

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'description', 'weight', 'price'];
  dataSource = new MatTableDataSource<Product>(products);
  selection = new SelectionModel<Product>(true, []);
  product: Product;
 

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  /*Dialogs */

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      width: '250px',
      data:{product:this.product},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.product = result;
    });
  }

}
