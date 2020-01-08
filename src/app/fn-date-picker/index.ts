import { NgModule } from '@angular/core';
import { FnDatePickerComponent } from './fn-date-picker.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
    declarations: [FnDatePickerComponent],
    imports: [CommonModule, FormsModule, MatDatepickerModule, MatNativeDateModule],
    exports: [FnDatePickerComponent]
})
export class FnDatePickerModule {

}