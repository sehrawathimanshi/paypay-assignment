import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEmployee } from 'src/app/core/models';

@Component({
  selector: 'app-shared-employee-list',
  templateUrl: './shared-employee-list.component.html',
  styleUrls: ['./shared-employee-list.component.scss']
})
export class SharedEmployeeListComponent implements OnInit {
  @Input() public employeeList: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
