import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AbstractControl,FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router} from '@angular/router';
import { NotificationService } from 'src/app/services/notifications.service';
import { ToastrService } from "ngx-toastr";
import Swal from 'sweetalert2';
import { ResponsiveService } from '../../responsive/responsive.service';

declare var $: any;
@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class PagesLoginComponent implements OnInit {
  signinResults:any;


  loginform: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  forgotform: FormGroup = new FormGroup({
    email: new FormControl(''),

  });
  activation: FormGroup = new FormGroup({
    activationcode: new FormControl('')
  });
  submitted = false;
  logo: any;
  showPassword: string = 'password';
  fafaEye: string = 'fa fa-eye-slash';
  version: string;

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router: Router,private notifyService : NotificationService,private toastrService: ToastrService) { }

  ngOnInit(): void {
      this.logo=environment.loginPageLogo;
      this.version=environment.version;
    //Form Building for loginForm
    this.loginform = this.formBuilder.group(
      {

        username: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
          ],
        ],

      }
    );


    //Form Building for ForgotPassword
    this.forgotform = this.formBuilder.group(
      {

        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],


      }
    );

    //Form Building for activationCode
    this.activation = this.formBuilder.group(
      {

        activationcode: [
          '',
          [
            Validators.required],
        ],


      }
    );
  }
  togglePasswordVisibility() {
    this.showPassword = (this.showPassword === "password") ? "text" : "password";
    this.fafaEye = (this.fafaEye === "fa fa-eye-slash") ? "fa fa-eye" : "fa fa-eye-slash";
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }

  get forgot(): { [key: string]: AbstractControl } {
    return this.forgotform.controls;
  }
  get activate(): { [key: string]: AbstractControl } {
    return this.activation.controls;
  }

  onSubmit(): void {

    this.submitted = true;
    if (this.loginform.invalid) {
      return;
    }

    // console.log(JSON.stringify(this.loginform.value, null, 2));




    var endPoint = "/api/ap/auth/signin";
    var loginPostRequestBody = {
      "email": this.loginform.value.username,
      "password": this.loginform.value.password
    }

    //Testing
    // console.log("Request: ", loginPostRequestBody);



    this.http.post(environment.apiUrl+endPoint, loginPostRequestBody).subscribe((response: any) => {

      //modal alert
      // this.appComponent.modalAlert(response["message"]);

      if(response["status"] == 200 || response["statusCode"] == 200){
        // sessionStorage.setItem("userName", userName.value);
        // // sessionStorage.setItem("roleValue",response["data"]["roleId"]);
        // // sessionStorage.setItem("userID",response["data"]["userId"]);
        // // console.log('Raw response',response);
        // // console.log('user data',response["data"]);

        this.signinResults = response.data

        console.log(this.signinResults)
        sessionStorage.setItem("signinResults", JSON.stringify(response.data));

         sessionStorage.setItem("accessToken", response["token"]);
         sessionStorage.setItem("loginname", this.loginform.value.username);
         sessionStorage.setItem("adminName", response.data.userName);
         sessionStorage.setItem("role", response.data.role);

        //  sessionStorage.setItem("accessToken", JSON.stringify(response["token"]));


        // // //store the entire session data in local storage
        // // localStorage.setItem("sessionData", JSON.stringify(response["data"]));

        this.router.navigate(['/manageCorporates']);
      }
      else if(response["status"] == 206 || response["statusCode"] == 206){
$("#activationlink").show()

        // Swal.fire({title:'Alert',text:"Please Contact System admin"})
        // $("#activationlink").show()
      }
      else if(response["status"] == 400 || response["statusCode"] == 400){
        // alert("Invalid Details")
          // this.toastrService.error('Invalid Credentials', 'Error!');
          Swal.fire({title:'Error',text:response.message})
      }
      else{
        // alert("Invalid Details")
        this.toastrService.error("Invalid Credentials", 'Error!');
        Swal.fire({title:'Error',text:response.message})
      }
    }, (error) => {
      Swal.fire({title:'Error',text:"Invalid Credentials"})
      // this.toastrService.error("Invalid Credentials", 'Error!');
    });
  }



  onReset(): void {

    this.loginform.reset();
  }

  forgotpassword(){

    this.forgotform.reset()
    $("#forgotpassword").show()

  }

  closeForgotmodel(){
    $("#forgotpassword").hide()
    this.forgotform.reset()
  }
  closeActivationCode(){
    $("#activationlink").hide()
    this.activation.reset()

  }
  SubmitforgotPassword(){

    var endPoint = "/api/ap/auth/forgotPassword";
    let obj={
      "email":this.forgotform.value.email
    }
    this.http.post(environment.apiUrl+endPoint, obj).subscribe((response: any) => {

      if(response["statusCode"] == 200 || response["status"] == 200){
        Swal.fire({title:'Success',text:response.message})
        $("#forgotpassword").hide()
        this.forgotform.reset()
      }
      else if(response["statusCode"] = 400 || response["status"] == 400){

      Swal.fire({title:'Error',text:response.message})
      }
      else{

        Swal.fire({title:'Error',text:response.message})
      }
    }, (error) => {
      Swal.fire({title:'Error',text:error.error.error.message})
    });
  }
  SubmitactivationCode(){

    var endPoint = '/api/ap/auth/userActivation/'+ this.activation.value.activationcode + '';

    this.http.get(environment.apiUrl+endPoint,).subscribe((response: any) => {

      //modal alert
      // this.appComponent.modalAlert(response["message"]);

      if(response["statusCode"] == 200 || response["status"] == 200){
        $("#activationlink").hide()
        // Swal.fire(response.message)

        Swal.fire({
          title:'Info',
          text: response.message,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'Ok',

        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.onSubmit()
          }
        })




      }
      else if(response["statusCode"] = 400 || response["status"] == 400){

        // alert("Invalid Details")
          // this.toastrService.error('Invalid Credentials', 'Error!');
         Swal.fire({title:'Error',text:response.message})
      }
      else{
        Swal.fire({title:'Error',text:response.message})
      }
    }, (error) => {
      Swal.fire({title:'Error',text:error.error.error.message})
    });
  }
}



