import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EntityModel } from '../models/Entity';
import { EntityCollectionModel } from '../models/EntityCollection';

@Injectable({
  providedIn: 'root'
})
export class ManagerBaseService<ElementModel extends EntityModel> extends BaseService {
  
  elementsOnChanged: BehaviorSubject<any> = new BehaviorSubject([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  elementsCount = 0;

  selectedElementsOnChanged: BehaviorSubject<any> = new BehaviorSubject([]);
  selectedElements: number[] = [];

  elements: ElementModel[] = [];
  
  selectedFilters: { [key: string]: any } = {};
  selectedFiltersOnChanged: Subject<any> = new Subject();

  paginationValues: { [key: string]: any } = {};
  paginationValuesOnChanged: Subject<any> = new Subject();

  constructor(
    @Inject('API_URL') apiUrl: string,
    componentUrl: string,
    http: HttpClient) {
    super(apiUrl, componentUrl, http);
    this.paginationValues = {
      'sortField': '',
      'sortOrder': '',
      'pageSize': 20
    };
    this.selectedFiltersOnChanged.subscribe((selectedFilters: { [key: string]: any }) => {
      this.selectedFilters = selectedFilters;
    });
    this.paginationValuesOnChanged.subscribe(paginationValues => {
      this.paginationValues = paginationValues;
    });
}

getElements(action = ''): any {
  
  this.isLoading$.next(true);

  return new Promise((resolve, reject) => {

    this.getAll(action)
      .subscribe((response:  ElementModel[]) => {

        this.elements = response;
        this.elementsCount = response.length;
        this.elementsOnChanged.next(this.elements);

        resolve(this.elements);
      },
        (error) => {
          reject(error);
          this.isLoading$.next(false);
        },
        () => {
          this.isLoading$.next(false);
        }
      );
  });
}

createElement(elementData): Promise<any> {
  this.isLoading$.next(true);
  return new Promise((resolve, reject) => {
    this.create(elementData)
      .subscribe((response: any) => {
        this.getElements();
        resolve(response);
      },
        (error) => {
          this.isLoading$.next(false);
          reject(error);
        },
        () => {
          this.isLoading$.next(false);
        });
  });
}

updateElement(element): Promise<any> {
  this.isLoading$.next(true);
  return new Promise((resolve, reject) => {
    this.update(element)
      .subscribe((response: any) => {
        this.getElements();
        resolve(response);
      },
        (error) => {
          this.isLoading$.next(false);
          reject(error);
        },
        () => {
          this.isLoading$.next(false);
        });
  });
}

  deleteElement(elementToDelete, action = ''): Promise<any> {
    const element = this.elements.find(e => e.id === elementToDelete.id);
    const elementIndex = this.elements.indexOf(element);
    this.isLoading$.next(true);

  return new Promise((resolve, reject) => {

    this.delete(elementToDelete.id, action)
      .subscribe((response: any) => {

        this.elements.splice(elementIndex, 1);
        this.elementsOnChanged.next(this.elements);
        this.elementsCount--;

        resolve(response);
      },
        (error) => {
          this.isLoading$.next(false);
          reject(error.error);
        },
        () => {
          this.isLoading$.next(false);
        });
  });
}

deleteRange(entityCollectionModel: EntityCollectionModel, action = 'deleteRange'): Observable<any> {
  return this.http.post(`${this.fullUrl}/${action}`, entityCollectionModel, { observe: 'response' });
}

toggleSelectedElement(id): any {
  // First, check if we already have that element as selected...
  if (this.selectedElements.length > 0) {
    const index = this.selectedElements.indexOf(id);

    if (index !== -1) {
      this.selectedElements.splice(index, 1);

      // Trigger the next event
      this.selectedElementsOnChanged.next(this.selectedElements);

      return;
    }
  }
  // If we don't have it, push as selected
  this.selectedElements.push(id);

  // Trigger the next event
  this.selectedElementsOnChanged.next(this.selectedElements);
}

toggleSelectAll(): any {
  if (this.selectedElements.length > 0) {
    this.deselectElements();
  }
  else {
    this.getSelectedElements();
  }
}

getSelectedElements(filterParameter?, filterValue?): any {
  this.selectedElements = [];

  // If there is no filter, select all
  if (filterParameter === undefined || filterValue === undefined) {
    this.elements.map(element => {
      this.selectedElements.push(element.id);
    });
  }
  // Trigger the next event
  this.selectedElementsOnChanged.next(this.selectedElements);
}

deselectElements(): any {
  this.selectedElements = [];

  // Trigger the next event
  this.selectedElementsOnChanged.next(this.selectedElements);
}

deleteSelectedElements(): Observable<any> {

  for (const elementId of this.selectedElements) {

    const element = this.elements.find(_element =>
      _element.id === elementId
    );
    const elementIndex = this.elements.indexOf(element);
    this.elements.splice(elementIndex, 1);
  }
  this.elementsOnChanged.next(this.elements);
  this.deselectElements();

  const entityCollection = new EntityCollectionModel({ ids: this.selectedElements });
  return this.deleteRange(entityCollection);
}

extendParams(
  params: { [key: string]: any },
  extraParams: { [key: string]: any } = {}): {} {
  if (extraParams) {
    for (const key in extraParams) {
      if (extraParams.hasOwnProperty(key)) {
        const value = extraParams[key];
        params[key] = value;
      }
    }
  }
  return params;
}
}
