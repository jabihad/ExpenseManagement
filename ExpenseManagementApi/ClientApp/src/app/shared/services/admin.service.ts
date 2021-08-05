import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public baseUrl: string = 'https://localhost:44372/api/admin/'
  public reqHeader = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  constructor(private _http: HttpClient) { }

  public getAllCategory() {
    return this._http.get(this.baseUrl + 'getallcategory', { headers: this.reqHeader })
  }
  public createCategory(val) {
    return this._http.post(this.baseUrl + 'createcategory', val, { headers: this.reqHeader })
  }
  public getCategoryById(id) {
    return this._http.get(this.baseUrl + 'getcategorybyid/' + id, { headers: this.reqHeader })
  }
  public updateCategory(val) {
    return this._http.put(this.baseUrl + 'updatecategory', val, { headers: this.reqHeader })
  }
  public deleteCategory(id) {
    return this._http.delete(this.baseUrl + 'deletecategory/' + id, { headers: this.reqHeader })
  }

}
