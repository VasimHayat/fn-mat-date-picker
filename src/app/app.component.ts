import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dateObject = {
    startDate: new Date("2019-12-10"),
    endDate: new Date("2019-12-17")
  }
  maxDate = new Date("2024-11-30");
  changeDate(event) {
    console.log("SKDLEEEEEEEEEEEEEEEEE")
    console.log('as', event);
  }
  disabledDate(obj) {
    //   obj.callback(obj.date < new Date("2019-12-20") && obj.date > new Date("2019-11-10") )  ;
  }
  nextDisable(dateObj: any) {
    let currentDate = dateObj.date;
    dateObj.callback(new Date(currentDate.setDate(currentDate.getDate() + 1)) > new Date("2019-12-19"));
  }
  prevDisable(dateObj: any) {
    let currentDate = dateObj.date;
    //obj.callback(new Date(currentDate.setDate(currentDate.getDate() -1)) < new Date("2019-11-10"));
  }
  nextPrevDate(dateObj: any) {
    console.log(dateObj)
  }
}
