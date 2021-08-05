import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ExpenseService } from 'src/app/shared/services/expense.service';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css']
})
export class UpdateExpenseComponent implements OnInit {
  categoryList: any[] = []
 editExpense = new FormGroup({
   id: new FormControl(''),
   itemName: new FormControl(''),
   amount: new FormControl(''),
   categoryId: new FormControl('')
 })
  constructor(private _expenseService: ExpenseService, private _adminService: AdminService, private router: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    const id = this.router.snapshot.params.id;
    this._expenseService.getExpenseById(id)
     .subscribe(result => {
       console.log(result['itemName']);
       this.editExpense = new FormGroup({
         id: new FormControl(result['id']),
         itemName: new FormControl(result['itemName']),
         amount: new FormControl(result['amount']),
         categoryId: new FormControl(result['categoryId'])
       })
     },
     error => {
       console.log(error)
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
  public updateExpense()
  {
    this._expenseService.updateExpense(this.editExpense.value)
      .subscribe(list => {
        console.log(list);
      },
      error => {
        console.log(error);
      })
      this._router.navigateByUrl('/expense/list');
  }

}
