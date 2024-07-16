import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AppComponent } from './../../app.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ExcelService } from './../../services/excel.service';
import * as moment from 'moment';
import { Router} from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
// import{Modal} from 'bootstrap'

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
declare var $: any;
@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css'],
  providers: [DatePipe],
})
export class ManageCustomersComponent implements OnDestroy,OnInit {
  brokerList: Array<any> = [];
  members: Array<any> = [];

  dateFormat= 'YYYY-MM-DD';

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('memberdetails') memberdetails:any;

  dtOptions: DataTables.Settings = {};
  persons: Array<any> = [];

  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger1: Subject<any> = new Subject<any>();
  customerslist: Array<any> = [];
  role: any;
  showmemberData=false;
  customerId: any;
  popupDisplay:boolean=true;
  valuFormChaild:any=0;
  emplomentName: any;
  // members: any;
  terminationform: FormGroup = new FormGroup({
    reason: new FormControl(''),
    memberstatus: new FormControl(''),
    terminationDate: new FormControl(''),


  });
  terminationformDetails: FormGroup = new FormGroup({
    reason: new FormControl(''),
    memberstatus: new FormControl(''),
    terminationDate: new FormControl(''),
    proceedWithEquitable:new FormControl(''),
    proceedWithGreenshield: new FormControl(''),
    proceedWithRefund: new FormControl(''),
    proceedWithSmartchoice: new FormControl(''),
    proceedWithSubscriptionExpiry: new FormControl(''),

  });
  memberid: any;
  terminateReasonsWithKeys:any;
  Allmembers: any[];
  filterStatus: any[];
  minDate: Date;
  dummyData={
    "status": 200,
    "message": "Member Termination Configuration fetched",
    "error": "NA",
    "data": {
      "proceedWithEquitable": false,
      "proceedWithGreenshield": true,
      "proceedWithSmartchoice": false,
      "proceedWithRefund": false,
      "proceedWithCancelCustomer": false,
      "proceedWithSubscriptionExpiry": true,
      "terminateReasons": [
        "Termination of Employment (No Longer Employed)",
        "Declined Coverage",
        "Deceased",
        "Moved to Spousal Plan / Opted out of benefits",
        "All Others",
        "Audit (Only for TEST)"
      ],
      "terminateReasonsWithKeys": [
        {
          "display": "Termination of Employment (No Longer Employed)",
          "key": "Termination_Reason_001"
        },
        {
          "display": "Declined Coverage",
          "key": "Termination_Reason_002"
        },
        {
          "display": "Deceased",
          "key": "Termination_Reason_003"
        },
        {
          "display": "Moved to Spousal Plan / Opted out of benefits",
          "key": "Termination_Reason_004"
        },
        {
          "display": "All Others",
          "key": "Termination_Reason_005"
        },
        {
          "display": "Audit (Only for TEST)",
          "key": "Termination_Reason_006"
        }
      ],
      "terminateReasonsApplicable": true,
      "customerType": "GIG",
      "customerPlans": [
        "Private Health - Complete Executive Care (<60)",
        "GroupBenefitz Protect",
        "GroupBenefitz High Cost Drugs",
        "GroupBenefitz Wellbeing Services",
        "Classic Bronze"
      ],
      "customerPlansCount": 0,
      "terminationDate": "2024-03-01",
      "enrollmentDate": "2024-02-01",
      "monthlyRecurringAmount": 1456.53,
      "terminationData": {
        "staxbillInterval": 0,
        "staxbillRefund": false,
        "staxbillRefundAmount": 0,
        "staxbillCancelCustomer": null,
        "greenshield": {
          "GIG": "2024-03-01",
          "CORP": "2024-03-01"
        },
        "equitable": {
          "GIG": "2024-02-29",
          "CORP": "NA",
          "STUDENT": "2024-02-29"
        },
        "smartchoice": {
          "STUDENT": "2024-03-01"
        },
        "scenario": "TDF_PEDPc",
        "backdated": false,
        "billedMonths": [
          "Feb-24"
        ],
        "billedMonthsAdditional": [

        ],
        "monthsToChargeTillTermination": [

        ],
        "enrollmentDateCurrentMonth": true,
        "terminationDateCurrentMonth": false,
        "terminationDifference": 0,
        "terminationDifferenceUnits": "Months",
        "terminationDifference1": -9,
        "terminationDifference1Units": "Days",
        "enrollmentDifference": 20,
        "enrollmentDifferenceUnits": "Days",
        "terminationEnrollmentDifference": 0,
        "terminationEnrollmentDifferenceUnits": "Days",
        "cancelCustomer": null
      },
      "serviceType": "GREENSHIELD",
      "serviceDetails": {
        "name": "Green Shield",
        "policy": "BFLX 41001",
        "fullName": "The GroupBenefitz Classic",
        "carrier": "0",
        "issueNo": "01"
      },
      "terminationsProvisioning": [
        {
          "service": "The GroupBenefitz Classic",
          "policy": "BFLX 41001",
          "description": "First day without coverage",
          "date": "2024-03-01",
          "membershipId": "15809503"
        }
      ],
      "staxbillDetails": {
        "refundApplicable": false,
        "refundAmount": "NA",
        "cancelCustomerNotes": "Modify plan billing  cycle but no customer cancellation",
        "billingPeriodLeft": "NA",
        "billingMonthsLeft": [

        ],
        "billedMonths": [
          "Feb-24"
        ],
        "billedMonthsAdditional": [

        ]
      }
    }
  }
  terminateMemberDetails: any;
  servicDetails: any;
  terminateReasonsApplicable: any;
  staxbillDetails: any;
  proceedWithSubscriptionExpiry: any;
  proceedWithEquitable: any;
  proceedWithGreenshield: any;
  proceedWithRefund: any;
  proceedWithSmartchoice: any;
  constructor( private formBuilder: FormBuilder,
   private formBuilderDetails: FormBuilder,
     private http: HttpClient, public router:Router,private datePipe: DatePipe,private excelService: ExcelService,) { }

  ngOnInit() {
    this.minDate = new Date();
    this.terminationform = this.formBuilder.group({
      reason: [''],
      memberstatus: [''],
      terminationDate:[ '', [Validators.required], ],
    });
    this.dtOptions = {
      pagingType: 'simple_numbers',
      language:{
        searchPlaceholder:'Search here...'
      },
    };

    this.role=sessionStorage.getItem('role');

     this.getclientList();





  }

  terminationformDetailsValidations(){
    this.terminationformDetails = this.formBuilderDetails.group({
      reason: ['', [ Validators.required], ],
      memberstatus: ['', [Validators.required],],
      terminationDate:['', [Validators.required],],
      proceedWithEquitable:[''],
      proceedWithGreenshield: [''],
      proceedWithRefund:[''],
      proceedWithSmartchoice:[''],
      proceedWithSubscriptionExpiry:[''],

    });
  }

rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
     dtInstance.destroy();
     this.dtTrigger1.next(null);
  });
}
  viewsubBrokerList(brokerlist){

    $('#subGroupList-modal').modal('show');
    console.log(brokerlist)
    this.customerslist = brokerlist
    this.dtTrigger1.next(null);
    // $("#DataTables_Table_1").dataTable().OnDestroy()
    $("#DataTables_Table_1").dataTable().fnDestroy();

  }

  public viewBrokerDetails(broker:any,index:number){

    this.router.navigate(['/manageAdvisors/editAdvisor/'+broker.id]);

    // /broker/{brokerId}/details

}
terminatemember(client:any,index:number){
  this.terminationform.reset();
  this.emplomentName =client.firstName;//client.name;
this.memberid = client.id;
$("#showmemberlist").modal('show');

}
submitterminationEnd(){
    let data={
      'data':this.terminateMemberDetails,
      'reason':this.terminationform.get('reason').value??" ",
    };
    console.log(this.terminationform.value)
    var corporateId = sessionStorage.getItem('corporateId');
   var accessToken = sessionStorage.getItem('accessToken');
   var terminate = '/api/ap/member/'+this.memberid+'/confirmMemberTermination';
   var headers={
    Authorization: 'Bearer ' + accessToken,
    'Content-Type': 'application/json',
  };

   this.http.post(environment.apiUrl+terminate,data,{headers:headers})
   .subscribe((responce:any)=>{
    if(responce.status=='200'){
      Swal.fire({title:responce.message ,html:responce.data.message});
      $('#showTerminateMemberDetails').modal('hide')

    }else{
      Swal.fire({title:"info" ,text:responce.data.message});
    }

   },(error)=>{
    Swal.fire({title:"Error",text:error.message||error.data.message});
   })
}
closeTerminatePopup(id:any){
  $(`#${id}`).modal("hide");
  this.terminationform.reset();
}
submittermination(){
  if(this.terminationform.invalid){
    this.terminationform.markAllAsTouched()
    return
  }
  console.log(this.terminationform.value)
   var corporateId = sessionStorage.getItem('corporateId');
  var accessToken = sessionStorage.getItem('accessToken');
  var terminate = '/api/ap/member/'+this.memberid+'/configureMemberTermination';

let data={
"reason":this.terminationform.value.reason,
"memberStatus" :this.terminationform.value.memberstatus,
"terminationDate":  this.datePipe.transform(
  this.terminationform.value.terminationDate,
  'yyyy-MM-dd'
) || ''
}
let terminateDate=this.datePipe.transform( this.terminationform.value.terminationDate, 'yyyy-MM-dd') || ''

  var corporateId = sessionStorage.getItem('corporateId');
  var accessToken = sessionStorage.getItem('accessToken');
  var terminate = '/api/ap/member/'+this.memberid+'/configureMemberTermination';
                   // /member/{memberId}/configureMemberTermination
                   let queryParams = new HttpParams();
                   queryParams = queryParams.append("terminationDate",terminateDate);
  this.http
  .get(environment.apiUrl + terminate,{
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
    params:queryParams
  })
  .subscribe(
    (response: any) => {
      if (response['status'] == 200 || response['statusCode'] == 200) {
        $("#showmemberlist").modal('hide');
        $('#showTerminateMemberDetails').modal('show');

        this.terminateMemberDetails=response.data;
        console.log("asasasa", this.terminateMemberDetails);
        this.terminateReasonsApplicable=this.terminateMemberDetails.terminateReasonsApplicable;
        this.servicDetails=this.terminateMemberDetails.serviceDetails;
        this.terminateReasonsWithKeys=response.data.terminateReasonsWithKeys;
        console.log('terminateReasonsWithKeys',this.terminateReasonsWithKeys);
        this.staxbillDetails=this.terminateMemberDetails.staxbillDetails;

        this.proceedWithEquitable=this.terminateMemberDetails.proceedWithEquitable;


        this.proceedWithGreenshield=this.terminateMemberDetails.proceedWithGreenshield;
        this.terminationformDetails.get('proceedWithGreenshield').setValue(this.proceedWithGreenshield);
        this.proceedWithRefund=this.terminateMemberDetails.proceedWithRefund;
        this.proceedWithSmartchoice=this.terminateMemberDetails.proceedWithSmartchoice;
        this.proceedWithSubscriptionExpiry=this.terminateMemberDetails.proceedWithSubscriptionExpiry;

        this.terminationformDetails.get('proceedWithEquitable').setValue(this.proceedWithEquitable);
        this.terminationformDetails.get('proceedWithGreenshield').setValue(this.proceedWithGreenshield);
        this.terminationformDetails.get('proceedWithRefund').setValue(this.proceedWithRefund);
        this.terminationformDetails.get('proceedWithSubscriptionExpiry').setValue(this.proceedWithSubscriptionExpiry);

        for(let control of Object.keys(this.terminationformDetails.controls)) {
          this.terminationformDetails.get(control).updateValueAndValidity();
        }

      } else {
        Swal.fire({title:'Error',text:response.message})
      }
    },(error) => {
      if (error.status == 400 ||
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
        Swal.fire({ title: 'Error', text: error.error.error.message });
      }
    }
  );
}

closeModelPopup(id:any){
  $('#'+id).modal('hide');
}
viewCustomerDetails(id:any){
  this.router.navigate(['/customer/'+id+'/details']);
}



  public addClientDetails(){
    this.router.navigate(['/addCorporate']);

  }
  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

public getclientList(){

  //https://testadminapi.groupbenefitz.aitestpro.com/api/ap/admin/customers/list

  var corporateId = sessionStorage.getItem('corporateId');
  var accessToken = sessionStorage.getItem('accessToken');
  var getClients = '/api/ap/admin/customers/list';
  const that = this;


  this.http
    .get(environment.apiUrl + getClients, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    })
    .subscribe(
      (response: any) => {
        if (response['status'] == 200 || response['statusCode'] == 200) {
          this.members = (response as any).data;
          this.filterStatus=[];
          this.members.map((member)=>{
              if(!this.filterStatus.includes(member.status))
                  this.filterStatus.push(member.status);
          });
          console.log("status",this.filterStatus);
          this.members.sort((a, b) => {
            const order = { Active: 1, Draft: 2, Suspended: 3, Hold:4,Cancelled:5,Incomplete:6};

            if (order[a.status] !== order[b.status]) {
              return order[a.status] - order[b.status];
          }
          // return a.firstName.localeCompare(b.firstName);
            const result = a.firstName.localeCompare(b.firstName);
          return result !== 0 ? result : a.lastName.localeCompare(b.lastName);
          });
          this.Allmembers=this.members;
          let filter//sorting get all active members sub sort by last name. append draft sub sort by last name

          this.dtTrigger.next(null);
          console.log(JSON.stringify(response));
          // this.members=response.data;
        } else {
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

changeStatus(e:any){
  // this.Allmembers=this.members;
  $("#DataTables_Table_0").dataTable().fnDestroy();
  this.members=[];

  let val=e.target.value.toLowerCase();//member.status.toLowerCase()==val
  if(val=='all'){
    this.members=this.Allmembers;
  }else{
    this.members= this.Allmembers.filter((member)=>{
      if(member.status.toLowerCase()==val){
        return member;
     }
        });
  }
    this.dtTrigger.next(null);
    console.log(this.members);
}

public deletebrokerDetails(broker:any,index:any){

  console.log(broker)
  // console.log(index)
  var accessToken = sessionStorage.getItem('accessToken');
  var deleteBroker = '/api/ap/broker/'+ broker.id+''


  Swal.fire({
    title:'Alert',
    text: 'Are you sure you want to delete this',
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: 'Proceed',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

      this.http
      .delete(environment.apiUrl + deleteBroker, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (response: any) => {
          if (response['status'] == 200 || response['statusCode'] == 200) {
            // this.dtTrigger.next("");
            window.location.reload()
        // this.getBrokerList()
          } else {
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
  })

}


public showDetails(member:any,index:number){

this.customerId=member.id;
  sessionStorage.setItem("customerId",member.id);
  this.showmemberData =true;

  this.router.navigate(['/manageMembers/employee/'+member.id+'/details']);

  // const modal = new Modal(this.memberdetails.nativeElement);
  // modal.show();
  // setTimeout(() => {
  //   // $('#memberdetails-modal').modal('show');

  // }, 100);

}

public brokerStatus(broker:any,event:any,index:number){

  console.log(broker)
  $("#DataTables_Table_0").dataTable().fnDestroy();

  var accessToken = sessionStorage.getItem('accessToken');
  var brokerStatus = '/api/ap/broker/' + broker.id + '/activation/'+event

  Swal.fire({
    title:'Alert',
    text: 'Are you sure you want to change this '+broker.firstName+' status?',
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: 'Proceed',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

      this.http
      .get(environment.apiUrl + brokerStatus, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (response: any) => {
          if (response['status'] == 200 || response['statusCode'] == 200) {
            // window.location.reload()
          } else {
            Swal.fire({title:'Error',text:response.message})
          }
        },
        (error) => {
          if (error.status == 400 ||
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
                // sessionStorage.clear();
                // this.router.navigate(['/login']);
              }
              else{
                // sessionStorage.clear();
                // this.router.navigate(['/login']);
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
    else{
      this.getclientList()
      // window.location.reload()
    }
  })

}


invitationMail(id:any){
///api/ap/member/1/inviteMail'
  var accessToken = sessionStorage.getItem('accessToken');
  var brokerStatus = '/api/ap/member/' +id + '/inviteMail/'
 console.log('invition Id',id)

    this.http
    .get(environment.apiUrl + brokerStatus, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    })
    .subscribe(
      (response: any) => {
        if (response['status'] == 200 || response['statusCode'] == 200) {
          // window.location.reload()
          Swal.fire({title:'Info',text:response.message})
        } else {
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
            showCancelButton: false,
            // confirmButtonText: 'Proceed',
          }).then((result) => {
            if (result.isConfirmed) {
            }
            else{
            }
          });
        } else {
          // Swal.fire(error.error.error.message)
          Swal.fire({ title: 'Error', text: error.error.error.message });
        }
        // this.toastrService.error("Invalid Credentials", 'Error!');
      }
    );
  // }

}



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  openModelAddMumber(){
    this.valuFormChaild++;
    this.router.navigate(['/manageMembers/addMember']);//member
      // alert('1212')
  }




}


export function moments(date: string | undefined): moment.Moment {

  if (date)

  return moment((new Date(date)).toJSON())

  else

return moment();

  }


