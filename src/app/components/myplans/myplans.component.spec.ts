import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyplansComponent } from './myplans.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

describe('MyplansComponent', () => {
  let component: MyplansComponent;
  let fixture: ComponentFixture<MyplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyplansComponent ],
      imports: [HttpClientModule,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
