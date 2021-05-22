import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  IEmployee,
  IReview
} from '../../models'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiURL: string = environment.apiURL;
  constructor(private httpClient: HttpClient) { }

  public getEmployeeList() {
    return this.httpClient.get<IEmployee[]>(`${this.apiURL}/employee/getEmployeeList`);
  }

  public submitFeedback(payload: any) {
    return this.httpClient.patch<IReview>(`${this.apiURL}/employee/submitFeedback`, payload);
  }

  public getReviewsForFeedback(empId: string){
    return this.httpClient.get<IReview[]>(`${this.apiURL}/employee/getReviewsForFeedback/${empId}`);
  }

  public getEmployeeDetail(empId: string) {
    return this.httpClient.get<IEmployee>(`${this.apiURL}/employee/${empId}`);
  }
}
