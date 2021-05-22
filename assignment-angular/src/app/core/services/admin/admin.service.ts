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
export class AdminService {
  apiURL: string = environment.apiURL;
  constructor(private httpClient: HttpClient) { }

  public addEmployee(payload: any) {
    return this.httpClient.post<IEmployee>(`${this.apiURL}/admin/addEmployee`, payload);
  }

  public updateEmployee(payload: any) {
    return this.httpClient.patch<IEmployee>(`${this.apiURL}/admin/updateEmployee`, payload);
  }

  public deleteEmployee(empId: string){
    return this.httpClient.delete<any>(`${this.apiURL}/admin/deleteEmployee/${empId}`);
  }

  public getEmployeeList() {
    return this.httpClient.get<IEmployee[]>(`${this.apiURL}/admin/getEmployeeList`);
  }

  public updateReview(payload: any) {
    return this.httpClient.patch<IReview>(`${this.apiURL}/admin/updateReview`, payload);
  }

  public addReview(payload: any) {
    payload = {
      ...payload,
      isCompleted: true
    }
    return this.httpClient.post<IReview>(`${this.apiURL}/admin/addReview`, payload);
  }

  public getEmployeeReviewList(empId: string){
    return this.httpClient.get<IReview[]>(`${this.apiURL}/admin/getEmployeeReviewList/${empId}`);
  }

  public getEmployeeDetails(empId: string){
    return this.httpClient.get<IEmployee>( `${this.apiURL}/admin/employee/${empId}`);
  }

  public assignOthersToReview(payload: any){
    return this.httpClient.post<IReview>(`${this.apiURL}/admin/assignOthersToReview`, payload);
  }
}
