import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    ChartsModule,
    
  ]
})
export class DashboardModule { }
