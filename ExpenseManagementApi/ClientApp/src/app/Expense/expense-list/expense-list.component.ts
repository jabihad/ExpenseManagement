import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ExpenseService } from 'src/app/shared/services/expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenseList: any[] = []
  category
  constructor(private _expenseService: ExpenseService, private _adminService: AdminService, private _router: Router) { }

  ngOnInit() {
    this.getAllExpense();
      //this._adminService.getCategoryById()
  }
  public deleteExpense(id) {
    if (confirm("Are You sure to delete")) {
      this._expenseService.deleteExpense(id)
        .subscribe(
          (list: any) => {
            this.getAllExpense();
            console.log(list);
          },
          error => { console.log(error) }
        )
    }
  }
  public getAllExpense()
  {
    this._expenseService.getAllExpense()
      .subscribe(
        (list: any) => {
          this.expenseList = list;
          console.log(list);
        },
        error => {
          console.log(error);
        }
      )
  }

}
