import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  editCategory = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl('')
  })
  constructor(private _adminService: AdminService, private router: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    const id = this.router.snapshot.params.id;
    this._adminService.getCategoryById(id)
      .subscribe(result =>{
        this.editCategory = new FormGroup({
          id: new FormControl(result['id']),
          name: new FormControl(result['name']),
          description: new FormControl(result['description']),
        })
      },
      error =>{
        console.log(error);
        console.log("dfg dfg")
      }
      )
  }
  public updateCategory()
  {
    this._adminService.updateCategory(this.editCategory.value)
      .subscribe(list => {
        console.log(list);
      },
      error => {
        console.log(error);
      })
      this._router.navigateByUrl('/category/list');
  }

}
