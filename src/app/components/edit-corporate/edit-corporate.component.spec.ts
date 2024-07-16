import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCorporateComponent } from './edit-corporate.component';

describe('EditCorporateComponent', () => {
  let component: EditCorporateComponent;
  let fixture: ComponentFixture<EditCorporateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCorporateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
