import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedEmployeeListComponent } from './shared-employee-list.component';

describe('SharedEmployeeListComponent', () => {
  let component: SharedEmployeeListComponent;
  let fixture: ComponentFixture<SharedEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedEmployeeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
