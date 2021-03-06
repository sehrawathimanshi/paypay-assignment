import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'employee',
    loadChildren: () => import(`./feature/employee/employee.module`).then(m => m.EmployeeModule)
  },
  {
    path: 'admin',
    loadChildren: () => import(`./feature/admin/admin.module`).then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
