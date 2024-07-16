import { Component, OnInit, Inject, Input, ViewChild, Output, EventEmitter,ElementRef, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { MangeClientsComponent } from './../../pages/mange-clients/mange-clients.component'
import { OverviewComponent } from 'src/app/components/overview/overview.component';
import { SharedService } from './../../services/sharedService/shared.service'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('myInput') myInput: ElementRef;
  clientName:any;
  ClientId:any;
  searchbox=true;
  clienDetails=false
  walletConfig:any
  tierConfig:any
  corpname:any;
  corpName:any;
  searchResults:any;
  currentUser:any;
  showeditcorp =false;
  showAddButton =  false;
  appStatus:any;
  dropDownDisplay:boolean=false;
  dashBordLogo=environment.clientLogoDashBord;

  // planspage= false

  @ViewChild(OverviewComponent)
   overview!:OverviewComponent;

  @ViewChild(MangeClientsComponent)
  manageclients!: MangeClientsComponent;
  @Output("GetCorpDetails") GetCorpDetails: EventEmitter<any> = new EventEmitter();
  @Output("ShowCorpDetails") ShowCorpDetails: EventEmitter<any> = new EventEmitter();
  @Output("editCorpDetails") editCorpDetails: EventEmitter<any> = new EventEmitter();

  changepasswordform: FormGroup = new FormGroup({
    oldpassword: new FormControl(''),
    newpassword: new FormControl(''),
    confirmpassword: new FormControl(''),

  });
  adminname: string;
  showMemberDetails: boolean=false;
  memberUserName: string;
  userName: any;

  constructor(@Inject(DOCUMENT) private document: Document,private formBuilder: FormBuilder, private http: HttpClient,public Shared:SharedService,public  _router: Router,@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    // alert(this._router.url)
    if(this._router.url.includes("edit-corporate")){
      this.clienDetails =true
      this.clientName = sessionStorage.getItem("corporateClientName") || "";
      this.ClientId =   sessionStorage.getItem("corporateClientId");
      this.appStatus ="Completed"
 
    }
    else{
      this.clienDetails =false
 
    }
    this.userName=  this.Shared.getUserName();
    console.log("this.userName",this.userName);
    this.GetDetails()

    this.changepasswordform = this.formBuilder.group(
      {
        oldpassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
          ],
        ],
        newpassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
          ],
        ],
        confirmpassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
          ],
        ],

      },
      {
        validator: this.ConfirmedValidator('newpassword', 'confirmpassword'),
      }

    );


    this.adminname =sessionStorage.getItem('adminName')
  }
  get changepass(): { [key: string]: AbstractControl } {
    return this.changepasswordform.controls;
  }
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  GetDetails(){


  setTimeout(() => {
    this.clientName = sessionStorage.getItem("corporateClientName") || "";
    this.ClientId =sessionStorage.getItem("corporateClientId") || "";
    this.memberUserName=sessionStorage.getItem('memberUserName')||"";
  }, 1000);



  }

  public applicationStatus(status:number){

console.log(status)

if(status<5){

  this.appStatus="Pending"
}
else if(status<=7){
  this.appStatus="Partially Completed"

}
else if(status<=9){
  this.appStatus="Partially Completed"

}
else{
  this.appStatus="Completed"
}

  }

  public headerDetails(mgs:any){


    let formData = JSON.parse(sessionStorage.getItem("formData") || "")
    console.log(formData)
    this.clientName = sessionStorage.getItem("corporateClientName") || ""
this.ClientId =sessionStorage.getItem("corporateClientId") || ""

console.log(mgs)

    if(mgs=="Home"){
      // if(formData.tierConfig=="false"){
      //   this.tierConfig ="NO"

      // }
      // else{
      //   this.tierConfig ="YES"
      // }
      // if(formData.walletConfig=="false"){
      //   this.walletConfig ="NO"
      // }
      // else{
      //   this.walletConfig ="YES"
      // }
      this.searchbox =true
       this.clienDetails =false;
       this.showMemberDetails=false;

    }else if(mgs=="member"){
      this.showMemberDetails=true;
      this.searchbox =false;
    }

    else{
      this.searchbox = false
      this.clienDetails = true;
      this.showMemberDetails=false;

      // alert(this.searchbox)

      // if(formData.tierConfig=="false"){
      //   this.tierConfig ="NO"

      // }
      // else{
      //   this.tierConfig ="YES"
      // }
      // if(formData.walletConfig=="false"){
      //   this.walletConfig ="NO"
      // }
      // else{
      //   this.walletConfig ="YES"
      // }

    }



  }

  fetchSeries(id: string){

    console.log(this.corpname)

    let value=this.currentUser
    if(value.length==0){
      this.showeditcorp =false
      this.showAddButton =false
      this.dropDownDisplay=false
      this.GetCorpDetails.emit()
    }
    else{
      if(value.length>2){
        this.showAddButton =true
      }

    }

    if(value.length>0){
    var endPoint = '/api/ap/admin/corporate/search';
    var accessToken = sessionStorage.getItem('accessToken');
    // this.Shared.setCorpData(this.corpname);

    let inputData={
      "searchArray": [{"searchterm":"name", "searchvalue":value}],
      "count": 0,
      "strictOrpartial": true
    }

    this.http
    .post(environment.apiUrl + endPoint, inputData, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    })
    .subscribe(
      (response: any) => {
        if (response['status'] == 200) {
          this.searchResults = response.data;
          this.dropDownDisplay=true;
          this[id].nativeElement.focus();


          console.log(this.searchResults)
          // this.showeditcorp =false
          let dispaly=response.data.filter(data=>data.name==value);
          if(dispaly.length==1){//loop by ganesh
            this.GetCorpDetails.emit(dispaly[0].id)
          }


        } else {
          // Swal.fire('Invalid bank details');
        }
      },
      (error) => {

        Swal.fire({title:'Error',text:error.error.message})
      }
    );
    }
  }

  getCorpDetails(item){
    console.log(item)
    var endPoint = '/api/ap/admin/corporate/search';
    var accessToken = sessionStorage.getItem('accessToken');
    // this.Shared.setCorpData(this.corpname);
    if(item.length>0){
    let inputData={
      "searchArray": [{"searchterm":"name", "searchvalue":item}],
      "count": 0,
      "strictOrpartial": true
    }

    this.http
    .post(environment.apiUrl + endPoint, inputData, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    })
    .subscribe(
      (response: any) => {
        if (response['status'] == 200) {
          if(response.data){
            this.showeditcorp =true
          this.GetCorpDetails.emit(response.data[0].id)
          }
        } else {
          // Swal.fire('Invalid bank details');
        }
      },
      (error) => {
        console.log(error)
        Swal.fire({title:'Error',text:error.error.error.message})
      }
    );

    }

  }
  addCorpDetails(){

  }

  EditCorpDetails(){
    this.editCorpDetails.emit()

  }

  ShowCorpDetailsDetails(){
console.log(this.currentUser)
    this.ShowCorpDetails.emit(this.currentUser)
    this.showeditcorp =false
  }


  showDetails(series:any) {

    console.log(series)

}

  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout(){
    sessionStorage.clear()
  }

  changepassword(){


    $("#changepassword").show()
    this.changepasswordform.reset()
    this.changepasswordform.get('oldpassword')?.reset();


  }

  closeChangepassmodel(){
    $("#changepassword").hide()
    this.changepasswordform.reset()
    this.changepasswordform.get('oldpassword')?.reset();
  }
  SubmitChangePassword(){
    // var endPoint = "/api/ap/user/changePassword ";
    if (this.changepasswordform.value.oldpassword != this.changepasswordform.value.newpassword) {
    let obj={
      "oldpassword":this.changepasswordform.value.oldpassword,
      "newpassword":this.changepasswordform.value.newpassword
    }
    var endPoint = "/api/ap/user/changePassword";
    var accessToken = sessionStorage.getItem('accessToken');

    this.http
      .post(environment.apiUrl + endPoint,obj, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      }).subscribe((response: any) => {

      if(response["statusCode"] == 200 || response["status"] == 200){
        Swal.fire({title:'Success',text:response.message})
        this.changepasswordform.reset()
        $("#changepassword").hide()
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

  } else {
    Swal.fire({ title: 'Error', text: 'Old password same as New password' })
  }
  }

  diaplayinInputbox(details:any){
    this.currentUser=details.name;
    this.GetCorpDetails.emit(details.id);
    this.dropDownDisplay=false;

  }
  hideList(){
    this.dropDownDisplay=false;
  }

}
