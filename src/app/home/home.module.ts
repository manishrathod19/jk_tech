import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeRoutingModule } from './home-routing.module';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TableModule
  ]
})
export class HomeModule { }
