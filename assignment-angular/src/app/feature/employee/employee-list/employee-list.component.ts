import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/core/models';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  emplList$!: Observable<IEmployee[]>;
  constructor(private empService: EmployeeService) { }

  ngOnInit(): void {
    this.emplList$ = this.empService.getEmployeeList();
  }

}
