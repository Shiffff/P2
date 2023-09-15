import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts/charts.component';



@NgModule({
  declarations: [
    ChartsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChartsComponent, // Vérifiez que les éléments sont exportés ici
  ],
})
export class ComponentsModule { }
