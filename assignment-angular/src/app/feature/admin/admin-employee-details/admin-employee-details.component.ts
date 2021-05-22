import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IEmployee, IReview } from 'src/app/core/models';
import { AdminService } from 'src/app/core/services/admin/admin.service';

@Component({
  selector: 'app-admin-employee-details',
  templateUrl: './admin-employee-details.component.html',
  styleUrls: ['./admin-employee-details.component.scss']
})
export class AdminEmployeeDetailsComponent implements OnInit {

  public empData$!: Observable<IEmployee>;
  public reviewForm!: FormGroup;
  public reviewDetails!: IReview[];
  private empId!: string;
  public spinner: boolean = true;
  public get reviewListFormArr(): any {
    return this.reviewForm.get('list') as any;
  }
  constructor(private readonly adminService: AdminService, private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      list: this.fb.array([
      ])
    });
    this.empId = this.route.snapshot.params.empId;
    this.empData$ = this.adminService.getEmployeeDetails(this.empId);
    this.getReviewList(this.empId);
  }

  public getReviewList(employeeId: string) {
    this.adminService.getEmployeeReviewList(employeeId).pipe(take(1))
      .subscribe(res => {
        this.reviewDetails = res;
        this.spinner = false;
        res.forEach(empData => {
          this.reviewListFormArr.push(this.createItem(empData))
        })
        this.reviewListFormArr.push(this.createItem({}));
      });
  }

  public createItem({ description = '', _id = '', review_assigned_to, isCompleted = false }: any): FormGroup {
    return this.fb.group({
      description: [description, Validators.required],
      employee: [this.empId],
      _id: [_id],
      assigned_to: [review_assigned_to],
      isCompleted: [isCompleted]
    });
  }

  public addNew(review: FormControl) {
    if (review.valid) {
      const { _id, ...payload } = review.value;
      this.adminService.addReview(payload).pipe(take(1)).subscribe((res: IReview) => {
        review.patchValue({
          description: res.description,
          _id: res._id,
          employee: res.employee,
          review_assigned_to: res.review_assigned_to,
          isCompleted: res.isCompleted
        })
        this.reviewListFormArr.push(this.createItem({}));
      });
    }

  }


  public updateItem(review: FormControl) {
    if (review.valid) {
      const payload = { ...review.value };
      this.adminService.updateReview(payload).pipe(take(1)).subscribe(res => {
        review.patchValue({
          description: res.description,
          _id: res._id,
          employee: res.employee,
          review_assigned_to: res.review_assigned_to,
          isCompleted: res.isCompleted
        })
      });
    }
  }

  public assignOthersToReview() {
    this.adminService.assignOthersToReview({ empId: this.empId }).pipe(take(1)).subscribe(res => {
    });
  }


}
