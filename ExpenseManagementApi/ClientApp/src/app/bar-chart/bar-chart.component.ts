import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../shared/services/expense.service';

const SAMPLE_BARCHART_DATA: any[] = [
  { data: [65, 59, 80, 81, 56, 54, 30], label: "Q3 Sales"}
  //{ data: [25, 39, 60, 91, 36, 54, 50], label: "Q4 Sales"}
]

const SAMPLE_BARCHART_LABELS: string[] = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7']

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  public list : any
  constructor(private _expenseService: ExpenseService) { }
  
  public barChartData: any[] = [];// = SAMPLE_BARCHART_DATA;
  public barChartLabels: string[] = [];// = SAMPLE_BARCHART_LABELS;
  public barChartType = "bar";
  public barChartLegend = false;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  public temp: number[];

  ngOnInit() {
    this._expenseService.calculateMonthlyExpense()
       .subscribe(res => {
         this.list = res;
         
         this.barChartLabels = Object.keys(this.list);
         this.temp = Object.values(this.list);
         const val = [
           { data: this.temp, label: "Total Cost" }
         ]
        //  this.barChartData = [
        //    { data: this.temp, label: "Total Cost"}
        //  ]
        this.barChartData = val;

         //console.log(this.datas);

       },
       
       error => {
         console.log(error)
       })
  }

}
