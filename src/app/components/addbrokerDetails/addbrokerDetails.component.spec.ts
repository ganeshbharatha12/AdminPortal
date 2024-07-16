/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddbrokerDetailsComponent } from './addbrokerDetails.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from "ngx-toastr";

describe('AddbrokerDetailsComponent', () => {
  let component: AddbrokerDetailsComponent;
  let fixture: ComponentFixture<AddbrokerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbrokerDetailsComponent ],
      imports:[RouterTestingModule,HttpClientModule,ReactiveFormsModule],
      providers:[ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbrokerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
