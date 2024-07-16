import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletConfigComponent } from './wallet-config.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";

describe('WalletConfigComponent', () => {
  let component: WalletConfigComponent;
  let fixture: ComponentFixture<WalletConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletConfigComponent ],imports:[ReactiveFormsModule,HttpClientModule,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
