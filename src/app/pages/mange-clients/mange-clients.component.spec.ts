import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeClientsComponent } from './mange-clients.component';

describe('MangeClientsComponent', () => {
  let component: MangeClientsComponent;
  let fixture: ComponentFixture<MangeClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangeClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangeClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
