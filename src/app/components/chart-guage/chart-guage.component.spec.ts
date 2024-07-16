/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChartGuageComponent } from './chart-guage.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

describe('ChartGuageComponent', () => {
  let component: ChartGuageComponent;
  let fixture: ComponentFixture<ChartGuageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartGuageComponent ],imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartGuageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
