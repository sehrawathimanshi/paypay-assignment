import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminEmployeeDetailsComponent } from './admin-employee-details/admin-employee-details.component';
import { AdminEmployeeListComponent } from './admin-employee-list/admin-employee-list.component';

const routes: Routes = [
  {
    path: 'employee-list',
    component: AdminEmployeeListComponent
  },
  {
    path: 'employee/:empId',
    component: AdminEmployeeDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
