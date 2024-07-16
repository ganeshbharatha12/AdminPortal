import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-brokerDetails',
  templateUrl: './brokerDetails.component.html',
  styleUrls: ['./brokerDetails.component.css']
})
export class BrokerDetailsComponent implements OnInit {
  public id: string;
  brokerData: Array<any> = [];
  brokerregform: FormGroup = new FormGroup({
    brokerName: new FormControl(''),
    corporationName: new FormControl(''),
    PolicyStartDate: new FormControl(''),
    streetAddress: new FormControl(''),
    streetAddress2: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    Province: new FormControl(''),
    postalCode: new FormControl(''),
    waitingPeriod: new FormControl(''),
    paymentInfo: new FormControl(''),
    bankCode: new FormControl(''),
    BankTransit: new FormControl(''),
    accounNum: new FormControl(''),
    voidcheck: new FormControl(''),
    corporatelogo: new FormControl(''),
    walletConfig: new FormControl(''),
    tierConfig: new FormControl(''),
    expectednoofEmployees: new FormControl(''),
  });
  constructor(private route: ActivatedRoute,private http: HttpClient,private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.brokerregform = this.formBuilder.group({
      brokerName: [''],
     brokersName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      streetAddress: [''],
      streetAddress2: [''],
      country: [''],
      city: [''],
      Province: ['', [Validators.required]],
      postalCode: ["", Validators.compose([postalcodeValidator])],

    });
    this.id = this.route.snapshot.paramMap.get('id');

    this.getBrokerData(this.id)
  }
  get broker() {
    return this.brokerregform.controls;
  }

  public getBrokerData(id){

    var corporateId = sessionStorage.getItem('corporateId');
    var accessToken = sessionStorage.getItem('accessToken');
    var GetBrokerData = '/api/ap/broker/'+id+'/details';
    const that = this;
    this.http
      .get(environment.apiUrl + GetBrokerData, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (response: any) => {
          if (response['status'] == 200 || response['statusCode'] == 200) {

            this.brokerData = response.data;


          } else {
            Swal.fire({title:'Error',text:response.message})
          }
        },
        (error) => {
          console.log(error);
          Swal.fire({title:'Error',text:error.error.error.message})
        }
      );
  }
}
export function postalcodeValidator(control: AbstractControl) {
  var postalRegexp = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/gm;
  if (control.value && !postalRegexp.test(control.value)) {
    return { invalidPostalCode: true };
  }
  return null;
}
