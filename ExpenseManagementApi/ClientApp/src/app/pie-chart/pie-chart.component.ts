import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../shared/services/expense.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  
  public list : any;
  constructor(private _expenseService: ExpenseService) { }
  
  pieChartData: number[] = [350, 450, 120, 45, 34];
  pieChartLabels: string[] = ['a', 'b', 'c', 'd', 'e'];
  // colors: any[] = [
  //   {
  //     backgroundColor: ['#26547c', '#ff6b6b', '#ffd166']
  //   }
  // ];
  
  pieChartType = "pie";

  ngOnInit() {
    this._expenseService.calculateWeeklyExpense()
      .subscribe(res => {
         this.list = res;
         this.pieChartLabels = Object.keys(this.list);
         this.pieChartData = Object.values(this.list);
         console.log(this.list)
      })
  }

}
