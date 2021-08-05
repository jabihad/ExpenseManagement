import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categoryList: any[] = []
  constructor(private _adminService: AdminService) { }

  ngOnInit() {
    this.getAllCategory();
  }
  public deleteCategory(id) {
    if (confirm("Are You sure to delete")) {
      this._adminService.deleteCategory(id)
        .subscribe(
          (list: any) => {
            this.getAllCategory();
            console.log(list);
          },
          error => { console.log(error) }
        )
    }
  }
  public getAllCategory()
  {
    this._adminService.getAllCategory()
      .subscribe((res: any) => {
        this.categoryList = res;
      },
      error=>{
        console.log(error);
      }
    )
  }

}
