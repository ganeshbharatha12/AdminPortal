import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
public displayStyle:any
loginame:any;
finalResults:any;
  role: any;
  userName: any;
  email: any;

  constructor(private elementRef: ElementRef) { }
  paymentForm = new FormGroup({
    cutomerId:new FormControl,
    PublicApiKey:new FormControl,
    SuccessUri: new FormControl,
    FailUri: new FormControl,
    FirstName: new FormControl,
    LastName: new FormControl,
    email: new FormControl,
    CardNumber: new FormControl,
    ExpirationMonth: new FormControl,
    ExporationYear: new FormControl,
    cvv: new FormControl,

    // signature:["", Validators.required],
    nameonthecard:new FormControl,

    aptcheck: new FormControl,
    streetaddress: new FormControl,
    streetaddressline2:new FormControl,
    city:new FormControl,
    province:new FormControl,
    postalcode:new FormControl,
    recaptchaReactive:new FormControl,
  });

  ngOnInit(): void {
    this.role=sessionStorage.getItem('role');
    this.userName=sessionStorage.getItem('adminName');
    this.email=sessionStorage.getItem('loginname');
    this.loginame =sessionStorage.getItem("loginname")

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    this.finalResults = JSON.parse(sessionStorage.getItem("signinResults"))

  }

  public closePopup(){
    this.displayStyle = "none"
  }


}
