import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminEmployeeListComponent } from './admin-employee-list/admin-employee-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminEmployeeDetailsComponent } from './admin-employee-details/admin-employee-details.component';


@NgModule({
  declarations: [AdminEmployeeListComponent, AdminEmployeeDetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
