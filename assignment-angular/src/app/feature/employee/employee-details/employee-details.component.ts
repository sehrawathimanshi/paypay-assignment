import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IEmployee, IReview } from 'src/app/core/models';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  public empData$!: Observable<IEmployee>;
  public reviewList!: IReview[];
  public reviewForm!: FormGroup;
  public spinner: boolean = true;
  public get reviewListFormArr(): any {
    return this.reviewForm.get('list') as any;
  }

  private empId: string = '';
  constructor(private empService: EmployeeService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.empId = this.activatedRoute.snapshot.params.empId;
    this.reviewForm = this.fb.group({
      list: this.fb.array([
      ])
    });
    this.empData$ = this.empService.getEmployeeDetail(this.empId);
    this.empService.getReviewsForFeedback(this.empId).pipe(take(1))
      .subscribe((res: IReview[]) => {
        this.reviewList = res;
        this.spinner = false;
        res.forEach(empData => {
          this.reviewListFormArr.push(this.createItem(empData))
        });
      });

  }

  public createItem({ description = '', employee = '', _id = '', review_assigned_to, isCompleted = false }: any): FormGroup {
    return this.fb.group({
      description: [description, Validators.required],
      employee: [employee],
      _id: [_id],
      review_assigned_to: [review_assigned_to],
      isCompleted: [isCompleted],
    });
  }

  public submitFeedback(index: number) {
    const review = this.reviewListFormArr.controls[index];
    if (review.valid) {
      let { employee, ...payload } = review.value;
      payload = { ...payload, employee: employee._id, isCompleted: true };
      this.empService.submitFeedback(payload).pipe(take(1)).subscribe((res: IReview) => {
        this.reviewListFormArr.removeAt(index);
        this.reviewList.splice(index, 1);
      });
    }
  }


}
