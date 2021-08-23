import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  public baseUrl: string = 'https://localhost:44372/api/expense/'
  public reqHeader = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  constructor(private _http: HttpClient) { }

  public createExpense(val) {
    return this._http.post(this.baseUrl + 'createexpense', val, { headers: this.reqHeader })
  }
  public getAllExpense() {
    return this._http.get(this.baseUrl + 'getallexpense', { headers: this.reqHeader })
  }
  public getExpenseById(id) {
    return this._http.get(this.baseUrl + 'getexpensebyid/' + id, { headers: this.reqHeader })
  }
  public updateExpense(val) {
    return this._http.put(this.baseUrl + 'updateexpense', val, { headers: this.reqHeader })
  }
  public deleteExpense(id) {
    return this._http.delete(this.baseUrl + 'deleteexpense/' + id, { headers: this.reqHeader })
  }
  public calculateMonthlyExpense() {
    return this._http.get(this.baseUrl + 'calculatemonthlyexpense', { headers: this.reqHeader })
  }
  public calculateWeeklyExpense() {
    return this._http.get(this.baseUrl + 'calculateweeklyexpense', { headers: this.reqHeader })
  }
}
