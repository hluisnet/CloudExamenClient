import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { ManagerBaseService } from '../services/manager-base.service';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddEditDialogComponent } from './dialogs/add-edit-dialog/add-edit-dialog.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  dialogRef: any;
  hasSelectedElements: boolean;

  isLoading$ = this._elementsService.isLoading$.asObservable();

  protected _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param { Service that inherits from BaseListService } _genericBaseListService
   * @param {FuseSidebarService} _fuseSidebarService
   */
  constructor(
    private _elementsService: ManagerBaseService<any>,
    private _matDialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._elementsService.elementsOnChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selectedElements => {
        this.hasSelectedElements = selectedElements.length > 0;
      });
  }




  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this._elementsService.deselectElements();
  }

}
