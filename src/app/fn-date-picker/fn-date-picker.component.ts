import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FnDateFormatter } from '../FNDateFormatter';



@Component({
  selector: 'fn-date-picker',
  templateUrl: 'fn-date-picker.component.html',
  styleUrls: ['fn-date-picker.component.scss'],
  providers: [
    FnDateFormatter
  ],
})
export class FnDatePickerComponent implements OnInit {
  @Input() currentDate = new Date();
  @Input() globalConfig: FnDateConfig;
  @Input() isDisable: boolean = false;
  @Input() format = "d/M/Y";
  @Input() selectedDate: Date;
  @Input() customClass: string;
  @Output() callback = new EventEmitter();
  @Output() nextDisabledCallback = new EventEmitter();
  @Output() prevDisabledCallback = new EventEmitter();
  @Output() nextPrevCallback = new EventEmitter();
  @Output() dateDisabled = new EventEmitter();
  startView = "month";
  constructor(private fnDateFormatter: FnDateFormatter) { }

  ngOnInit() {

    this.globalConfig = this.globalConfig === undefined ? new FnDateConfig() : this.initGlbConfig(this.globalConfig);
    this.setDateModel(this.selectedDate || this.currentDate);
    this.customClass = this.customClass === undefined ? this.globalConfig.isMonthView ? "fn-date-month-picker" : '' : this.customClass;
    this.startView = this.globalConfig.isMonthView ? "year" : "month";
  }


  getFormattedDate() {
    return this.fnDateFormatter.format(this.getDateObj(), this.format);
  }
  getDateObj() {
    return new Date(this.selectedDate);
  }
  setDate() {
    this.callback.emit(this.getDateObj());
  }

  nextPrevHandler(isNext: boolean) {
    if (this.globalConfig.isAutoHandler) {
      this.setDateModel(isNext ? this.getNextDate(this.globalConfig.noOfNavDay) : this.getPrevDate(this.globalConfig.noOfNavDay));
    } else {
      if (this.globalConfig.isMonthView) {
        this.setDateModel(isNext ? this.getNextMonth() : this.getPrevMonth());
      } else {
        this.setDateModel(isNext ? this.getNextDate(1) : this.getPrevDate(1));
      }
    }
    this.nextPrevCallback.emit({ date: this.getDateObj(), isNext: isNext });
  }

  nextDisable() {
    if (this.globalConfig.isAutoHandler && this.globalConfig.isFutureDisable) {
      if (this.selectedDate !== undefined) {
        return new Date(this.getNextDate(this.globalConfig.noOfNavDay)) >= this.globalConfig.disabledDate;
      }
    } else if (this.globalConfig.isFutureDisable) {
      let isDisable: boolean;
      this.nextDisabledCallback.emit({
        date: this.getDateObj(),
        callback: (value: boolean) => {
          isDisable = value;
        }
      });
      return isDisable;
    }
    return false;
  }
  prevDisable() {
    let isDisable: boolean;
    this.prevDisabledCallback.emit({
      date: this.getDateObj(),
      callback: (value: boolean) => {
        isDisable = value;
      }
    })
    return isDisable;
  }
  setDateModel(date: Date) {
    this.selectedDate = date;
  }

  datePickerFilter = (date: Date) => {
    if (this.globalConfig.maxDate !== null) {
      return;
    }
    if (this.globalConfig.isAutoHandler && this.globalConfig.isFutureDisable) {
      return new Date(date.toString()) < this.globalConfig.disabledDate;
    }
    let returnVal = true;
    this.dateDisabled.emit({
      date: new Date(date.toString()), callback: (val: boolean) => {
        returnVal = val;
      }
    });
    return returnVal;
  }

  getNextDate(noOfNavDay: number) {
    let date = this.getDateObj();
    return new Date(date.setDate(date.getDate() + noOfNavDay));
  }
  getPrevDate(noOfNavDay: number) {
    let date = this.getDateObj();
    return new Date(date.setDate(date.getDate() - noOfNavDay));
  }
  getNextMonth() {
    let date = this.getDateObj();
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }
  getPrevMonth() {
    let date = this.getDateObj();
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }
  _monthSelectedHandler(event, datePicker) {
    if (this.globalConfig.isMonthView) {
      this.setDateModel(new Date(event));
      this.setDate();
      datePicker.close();
    }
  }
  initGlbConfig(configHash: FnDateConfig) {
    let returnGlbHash = Object.assign(configHash, {});
    let defaultCnfHash = new FnDateConfig();
    Object.keys(defaultCnfHash).forEach((key) => {
      if (!returnGlbHash.hasOwnProperty(key)) {
        returnGlbHash[key] = defaultCnfHash[key];
      } else if (key == "type") {
        if (returnGlbHash[key] == "month") {
          returnGlbHash.isMonthView = true;
        }
      }

    });
    return returnGlbHash;
  }
}
export class FnDateConfig {
  minDate: Date = new Date("1-1-1990");
  maxDate: Date = null;
  navigation = "select";
  startingDay: number = 2;
  displayMonths = 1;
  isAutoHandler = false; // handle next prev functionality
  isFutureDisable = false; // use this if you are using the autoHandler.
  noOfNavDay = 7;
  disabledDate: Date = new Date();
  isMonthView = false;
  type = null;
}

