import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSystemUsersComponent } from './manage-system-users.component';

describe('ManageSystemUsersComponent', () => {
  let component: ManageSystemUsersComponent;
  let fixture: ComponentFixture<ManageSystemUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSystemUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSystemUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
