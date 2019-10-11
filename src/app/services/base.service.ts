import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    @Inject('API_URL') public apiUrl: string,
    public url: string,
    public http: HttpClient) { }

    get fullUrl(): any {
      return `${this.apiUrl}api/${this.url}`;
    }

    get(id, action = ''): any {
      return this.http.get(`${this.fullUrl}/${action}/${id}`);
    }

    getAll(action = ''): any {
      return this.http.get(`${this.fullUrl}/${action}`);
    }
  
    create(resource, action = ''): any {
      return this.http.post(`${this.fullUrl}/${action}`, resource, { observe: 'response' });
    }
  
    update(resource, action = ''): any {
      return this.http.put(`${this.fullUrl}/${action}`, resource);
    }
  
    delete(id, action = ''): any {
      return this.http.delete(`${this.fullUrl}/${action}/${id}`);
    }
}
