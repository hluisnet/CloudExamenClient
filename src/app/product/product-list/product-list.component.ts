import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatTableModule, MatSort, MatButton, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { MatCheckbox } from '@angular/material';
import { AddEditDialogComponent } from '../dialogs/add-edit-dialog/add-edit-dialog.component';
import { Observable, Subject, merge } from 'rxjs';
import { ProductService } from '../product.service';
import { takeUntil, tap } from 'rxjs/operators';
import { DataSourceRequestModel } from '../../models/DataSourceRequestModel';
import { ProductModel } from '../../models/Product/product';
import { FormGroup } from '@angular/forms';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['name', 'description', 'weight', 'price', 'buttons'];
  // displayedColumns: string[] = ['select', 'name', 'description', 'weight', 'price'];
  dataSource: BaseDataSource | null;
  elements: any;
  selectedElements: any[];
  checkboxes: {};
  isLoading$ = this._productService.isLoading$.asObservable();

  
  
  get elementsCount(): number { return this._productService.elementsCount; }

  protected _unsubscribeAll: Subject<any>;

  dialogRef: any;
  
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    private _productService: ProductService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.dataSource = new BaseDataSource(this._productService);
    this._productService.elementsOnChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(elements => {
        this.elements = elements;
        this.elements.paginator = this.paginator;
        this.checkboxes = {};
        elements.map(element => {
          this.checkboxes[element.id] = false;
        });
      });

    this._productService.selectedElementsOnChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selectedElements => {

        for (const id in this.checkboxes) {
          if (!this.checkboxes.hasOwnProperty(id)) {
            continue;
          }
          const idNumber = Number(id);
          this.checkboxes[id] = selectedElements.includes(idNumber);
        }
        this.selectedElements = selectedElements;
      });

    this._productService.selectedFiltersOnChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._productService.deselectElements();
      });
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();

    // Reset pagination for next component initialization
    this._productService.paginationValuesOnChanged.next({
      'sortField': '',
      'sortOrder': '',
      'pageSize': 10
    });
  }

  newProduct(): void {
    this.dialogRef = this.dialog.open(AddEditDialogComponent, {
      panelClass: 'add-edit-dialog',
      width:'450px',
      data: {
        action: 'new'
      }
    });

    this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {
        if (!response) {
          return;
        }
        console.log('product to create', response);

        this._productService.createElement(response.getRawValue())
          .then(() => {
            this.snackBar.open('Product added successfully!!!', 'close', { duration: 4000 });
            this._productService.getElements();
          })
          .catch(
            (error) => {
              this.snackBar.open(error, 'close', { duration: 4000 });
            }
          );
      });
  }

  editProduct(product): void {
    // Get customer from api first
    this._productService.get(product.id)
      .subscribe((productToUpdate: any) => {
        console.log('productToUpdate', productToUpdate);
        if (productToUpdate) {
          const productUpdate = new ProductModel(productToUpdate);
          this.dialogRef = this.dialog.open(AddEditDialogComponent, {
            panelClass: 'add-edit-dialog',
            width:'450px',
            data: {
              product: productUpdate,
             
              action: 'edit'
            }
          });
          this.dialogRef.afterClosed()
            .subscribe(response => {
              if (!response) {
                return;
              }
              const actionType: string = response[0];            
              const formData: FormGroup = response[1];
              switch (actionType) {
                /**
                 * Save
                 */
                case 'save':
                  this.updateProduct(formData.getRawValue());
                  break;
                /**
                 * Delete
                 */
                case 'delete':

                  this.deleteProduct(product);

                  break;
              }
            });
        } else {
          this.snackBar.open('There was an error', 'close', { duration: 1000 });
        }
      },
        (error) => {
          this.snackBar.open(error, 'close', { duration: 3000 });
        });
  }

  updateProduct(productToUpdate: ProductModel): void {
    this._productService.updateElement(productToUpdate)
      .then(
        () => {
          this.snackBar.open('Product updated successfully!!!', 'close', { duration: 3000 });
        }
      ).catch(error => {
        this.snackBar.open(error, 'close', { duration: 3000 });
      });
  }

  deleteProduct(product): void {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._productService.deleteElement(product)
          .then(
            () => {
              this.snackBar.open('Product deleted successfully!!!', 'close', { duration: 3000 });
            }
          ).catch(
            (errorMessage) => {
              this.snackBar.open(errorMessage, 'close', { duration: 3000 });
            });
      }
      this.confirmDialogRef = null;
    });
  }

}

export class BaseDataSource extends DataSource<ProductModel>
{
  constructor(
    private _productService: ProductService
  ) {
    super();
  }
  connect(): Observable<ProductModel[]> {

    return this._productService.elementsOnChanged;
  }
  /**
   * Disconnect
   */
  disconnect(): void {
  }
}