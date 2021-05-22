import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/core/models';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-employee-list',
  templateUrl: './admin-employee-list.component.html',
  styleUrls: ['./admin-employee-list.component.scss']
})
export class AdminEmployeeListComponent implements OnInit {
  emplList$!: Observable<IEmployee[]>;
  form!: FormGroup;
  public get empListFormArr(): any {
    return this.form.get('list');
  }
  constructor(private adminService: AdminService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      list: this.formBuilder.array([
      ])
    });
    this.adminService.getEmployeeList().pipe(take(1)).subscribe(res => {
      res.forEach(emp => {
        this.empListFormArr.push(this.createItem(emp));
      });
      this.empListFormArr.push(this.createItem({ name: '' }));
    });
  }

  public addNew(item: FormControl): void {
    if (item.valid) {
      const { _id, ...payload } = item.value;
      this.adminService.addEmployee(payload).pipe(take(1)).subscribe(res => {
        item.patchValue({
          name: res.name,
          _id: res._id,
        });
        this.empListFormArr.push(this.createItem({}));
      });
    }
  }

  public remove(index: number) {
    const emp = this.empListFormArr.controls[index];
    this.adminService.deleteEmployee(emp.value._id).pipe(take(1)).subscribe(res => {
      this.empListFormArr.removeAt(index);
    });

  }

  public updateItem(item: FormControl) {
    if (item.valid) {
      const payload = { ...item.value };
      this.adminService.updateEmployee(payload).pipe(take(1)).subscribe(res => {
        item.patchValue({
          name: res.name,
          _id: res._id,
        })
      });
    }
  }

  private createItem({ name = '', _id = '' }): FormGroup {
    return this.formBuilder.group({
      name: [name, Validators.required],
      _id: [_id]
    });
  }


}
