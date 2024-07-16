import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { error } from 'jquery';
import Swal from 'sweetalert2';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settingsKeyLabel: any;
  userDetails: any;
   accessToken = sessionStorage.getItem('accessToken');
   headers = {
    headers: {
      Authorization: 'Bearer ' + this.accessToken,
      'Content-Type': 'application/json',
    },
  };
  // mailConfigSmtp: any;
  mailConfigSmtp: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  cCmailConfigSmtp :FormGroup=new FormGroup({
    gbSuportMail :new FormControl(''),
    mailRegardsStudent:new FormControl(''),
    systemAdminMail:new FormControl(),
    systemAdminName:new FormControl(''),
    emailRegards:new FormControl(''),

  })
  description: void;
  this: any;
  id: any;
  ccSettingsKeyLabel: any;
  pachToCc: {};

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private ccformBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.getDetails();
    this.mailDetailsForm();
    this.ccmailDetailsForm();
  }
  mailDetailsForm() {
    this.mailConfigSmtp = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }
  ccmailDetailsForm(){
    this.cCmailConfigSmtp =this.ccformBuilder.group({
      gbSuportMail : ['', Validators.compose([Validators.required])],
      mailRegardsStudent: ['', Validators.compose([Validators.required])],
      systemAdminMail: ['', Validators.compose([Validators.required])],
      systemAdminName: ['', Validators.compose([Validators.required])],
      emailRegards: ['', Validators.compose([Validators.required])],

    })
  }
  get mailFormGet(){
    return this.mailConfigSmtp.controls;
  }
  get cCmailConfigSmtpGet(){
    return this.cCmailConfigSmtp.controls;
  }
  getDetails() {
    let endPoint = '/api/ap/settings';

    this.http.get(environment.apiUrl + endPoint).subscribe(
      (response: any) => {
        if (response.status == '200') {
          let details = response.data[0];
          console.log('responce : ', response.data[0]);
          this.settingsKeyLabel = details.settingsKeyLabel;
          let userDetails = JSON.parse(details.settingsValue);
          this.mailConfigSmtp.patchValue(userDetails);
          this.mailConfigSmtp.markAllAsTouched();
          console.log(userDetails);
          this.description=details.description;
          this.id=details.id;
          let OtherDetails=response.data[1];
          this.ccSettingsKeyLabel=OtherDetails.settingsKeyLabel;
          let ccDetails=JSON.parse(OtherDetails.settingsValue);
          console.log(ccDetails);

          let pachToCc={
            gbSuportMail:ccDetails.GBSUPPORT,
            mailRegardsStudent:ccDetails.MAIL_REGARDS_STUDENTS,
            systemAdminMail:ccDetails.SYS_ADMIN_EMAIL,
            systemAdminName:ccDetails.SYS_ADMIN_NAME,
            emailRegards:ccDetails.MAIL_REGARDS,
          }
          this.cCmailConfigSmtp.patchValue(pachToCc);



        } else {
          Swal.fire({ title: 'Error', text: response.data.message ||
          response.error.message ||
          response.data.error});

        }
      },
      (error) => {
        Swal.fire({ title: 'Error', text:error.message || error.status.message});
      }
    );
  }
  UpdatesmtpMail() {
    if (this.mailConfigSmtp.invalid) {
      return false;
    } else {
      let data = {
        description: '',
        key: '',
        keyLabel: '',
        category: '',
        valueType: 'string',
        display: false,
        value: this.mailConfigSmtp.value
      };
      let endPoint=`/api/ap/settings/${this.id}`
      this.http.put(environment.apiUrl+endPoint,data)
      .subscribe((responce:any)=>{
        if(responce.status=='200'){
          console.log(responce.data);
        }
      },(error)=>{
        Swal.fire({ title: 'Error', text:error.message || error.status.message});
      })
    }
  }
}
