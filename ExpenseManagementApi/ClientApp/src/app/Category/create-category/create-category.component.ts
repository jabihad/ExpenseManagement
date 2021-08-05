import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  newCategoryForm: FormGroup;

  constructor(private _router: Router, private _adminService: AdminService) { }

  ngOnInit() {
    this.newCategoryForm = new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null)
    })
  }
  public createCategory(newCategoryForm)
  {
    this._adminService.createCategory(newCategoryForm)
      .subscribe(result=>{
        console.log(result);
        this._router.navigateByUrl('/category/list');
      },
      error=>
      {
        console.log(error);
      })
  }

}
