import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ExpenseService } from 'src/app/shared/services/expense.service';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {
  categoryList: any[] = []
  newExpenseForm: FormGroup;

  constructor(private _router: Router, private _expenseService: ExpenseService, private _adminService: AdminService) { }

  ngOnInit() {
    this.newExpenseForm = new FormGroup({
      itemName: new FormControl(null),
      amount: new FormControl(null),
      categoryId: new FormControl(null)
    })
    this._adminService.getAllCategory()
      .subscribe(
        (res: any) => {
          this.categoryList = res;
          console.log(this.categoryList)
        },
        error => {
          console.log(error)
        }
      )
  }
  public createExpense(val) {
    this._expenseService.createExpense(val)
      .subscribe(
        res => {
          console.log(res);
          this._router.navigateByUrl('/expense/list');
        },
        error => { console.log(error) }
      )
  }

}
