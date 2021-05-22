import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedEmployeeListComponent } from './components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

const components = [
  SharedEmployeeListComponent
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ], exports: [
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...components
  ]
})
export class SharedModule { }
