import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-wallet-config',
  templateUrl: './wallet-config.component.html',
  styleUrls: ['./wallet-config.component.css']
})
export class WalletConfigComponent implements OnInit {
  defaultAmount:any;
  walletConfigType:any;
  walletAllotment:any;
  roolOverLimitToTheNextYear:any;
  payForService:any;
  walletSpendingLimit:any;
  walletconfig: FormGroup = new FormGroup({
    taxable: new FormControl(''),
    fullyearallotment: new FormControl(''),
    rollover: new FormControl(''),
    PreFunded: new FormControl(''),
    walletamount: new FormControl(''),
  });
  @Output() showEmployeePage = new EventEmitter<{ title: string }>();
  @Output() gotoplansPage = new EventEmitter<{ title: string }>();
  @Input() defaultAmountdata: any;
  constructor(private formBuilder: FormBuilder,private http: HttpClient,public router: Router,) { }

  ngOnInit(): void {

    this.defaultAmount = this.defaultAmountdata || ""
    this.walletconfig = this.formBuilder.group({
      taxable: ['', [Validators.required]],
      fullyearallotment: ['', [Validators.required]],
      rollover: ['', [Validators.required]],
      PreFunded: ['', [Validators.required]],
      walletamount: ['', [Validators.required]],
    });

    let walletData = JSON.parse(sessionStorage.getItem("walletConfig"))

    this.walletConfigType = walletData.walletType
    this.walletAllotment = walletData.walletAllotment
    this.roolOverLimitToTheNextYear = walletData.roolOverLimitToTheNextYear==false?"0":"1"
    this.payForService = walletData.payForService
    this.walletSpendingLimit = walletData.spendingLimit
  }

  get wallet() {
    return this.walletconfig.controls;
  }
  public submitwalletInfo() {


    if (this.walletconfig.invalid) {
      this.walletconfig.markAllAsTouched();
      // this.scrollToFirstInvalidControl1()
    } else {

      var corporateId = sessionStorage.getItem('corporateId');

      var walletConfig =
        '/api/ap/admin/corporate/' + corporateId + '/configureWallet';
      var accessToken = sessionStorage.getItem('accessToken');

      let requestBody:any = {
        corporateId: corporateId,
        walletType: this.walletconfig.value.taxable,
        walletAllotment: this.walletconfig.value.fullyearallotment,
        roolOverLimitToTheNextYear:this.walletconfig.value.rollover == '1' ? true : false,
        payForService: this.walletconfig.value.PreFunded,
        spendingLimit: parseInt(this.walletconfig.value.walletamount),
      };


      this.http
        .post(environment.apiUrl + walletConfig, requestBody, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe((response: any) => {

          if(response['status']==200){
            this.showEmployeePage.emit(requestBody)

            sessionStorage.setItem("walletConfig",JSON.stringify(requestBody))
            // this.selectedWalletConfig =  this.walletconfig.value.PreFunded
          }
          else{
            Swal.fire({title:'Error',text:response.message})
          }

        },
        (error) => {
          if (
            error.status == 400 ||
            error.status == 401 ||
            error.status == 402 ||
            error.status == 403
          ) {
            Swal.fire({
              title: 'Error',
              text: error.error.error.message,
              showDenyButton: false,
              showCancelButton: true,
              confirmButtonText: 'Proceed',
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                sessionStorage.clear();
                this.router.navigate(['/login']);
              }
              else{
                sessionStorage.clear();
                this.router.navigate(['/login']);
              }
            });
          } else {
            // Swal.fire(error.error.error.message)
            Swal.fire({ title: 'Error', text: error.error.error.message });
          }
          // this.toastrService.error("Invalid Credentials", 'Error!');
        }
        );
    }
  }

  public gotoplansInfo() {
   this.gotoplansPage.emit()
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
