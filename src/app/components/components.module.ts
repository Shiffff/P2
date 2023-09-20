import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts/charts.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    ChartsComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    BrowserModule,
  ],
  exports: [
    ChartsComponent, 
  ],
})
export class ComponentsModule { }
