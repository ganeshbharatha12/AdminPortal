import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AppComponent } from './../../app.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ExcelService } from './../../services/excel.service';
import * as moment from 'moment';
import { Router} from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { error } from 'jquery';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
declare var $: any;
@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.css'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.Emulated
})
export class ManageClientsComponent implements OnDestroy,OnInit {
  brokerList: Array<any> = [];
  clientList: Array<any> = [];

  dateFormat= 'YYYY-MM-DD';

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  persons: Array<any> = [];


  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger1: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  customerslist: Array<any> = [];
  role: any;
  employeelist: any;
  fusbillid: any;
  paymentMethodId: any;
  showmemberData = false;
  corporateCompany: any;
  valuFormChaild: any=1;
  clientDetails: any;
  terminationform: FormGroup = new FormGroup({
    reason: new FormControl(''),
    memberstatus: new FormControl(''),
    terminationDate: new FormControl(''),

  });
  emplomentName: any;
  memberid: any;
  version: string;
  allClientList: any[];
  constructor( private formBuilder: FormBuilder, private http: HttpClient, public router:Router,private datePipe: DatePipe,private excelService: ExcelService,) { }

  ngOnInit() {
    this.version=environment.version;
    this.terminationform = this.formBuilder.group({
      reason: [
        '',
        [
          Validators.required],
      ],
      memberstatus: [
        '',
        [Validators.required],
      ],
      terminationDate:[
        '',
        [Validators.required],
      ],

    });
    this.dtOptions = {
      pagingType: 'simple_numbers',
      language:{
        searchPlaceholder:'Search here...'
      },
    };

    this.getclientList();
    this.role=sessionStorage.getItem('role');



  }

  changeStatus(e:any){
    $("#DataTables_Table_0").dataTable().fnDestroy();
    this.clientList=[];

    let val=e.target.value.toLowerCase();//member.status.toLowerCase()==val
    if(val=='all'){
      this.clientList=this.allClientList;
    }else{
      this.clientList= this.allClientList.filter((member)=>{
        if(member.status?.toString().toLowerCase()==val){
          return member;
       }
          });
    }
    this.dtTrigger.next(null);
    console.log(this.clientList);
      // this.dtTrigger.next(null);
      // this.dtTrigger.unsubscribe();

  }


rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
     dtInstance.destroy();
     this.dtTrigger1.next(null);
  });
}
terminatemember(client:any,index:number){


  this.emplomentName =client.name

this.memberid = client.id

  Swal.fire({
    title: 'Info',
    text: 'Are you sure you want to Terminate?',
    showCancelButton: true,
    confirmButtonColor: '#10104d',
    cancelButtonColor: '#10104d',
    confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.isConfirmed) {
      $("#terminatemember").modal('show')


    }
  });

}
submittermination(){

  console.log(this.terminationform.value)


let data={
"reason":this.terminationform.value.reason,
"memberStatus" :this.terminationform.value.memberstatus,
"terminationDate":  this.datePipe.transform(
  this.terminationform.value.terminationDate,
  'MM-dd-yyyy'
) || ''
}

  var corporateId = sessionStorage.getItem('corporateId');
  var accessToken = sessionStorage.getItem('accessToken');
  var terminate = '/api/ap/member/'+this.memberid+'/terminate';
  this.http
  .post(environment.apiUrl + terminate, data,{
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  })
  .subscribe(
    (response: any) => {
      if (response['status'] == 200 || response['statusCode'] == 200) {
        $("#terminatemember").modal('hide')
        this.getclientList()

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
        Swal.fire({ title: 'Error', text: error.error.error.message });
      }
    }
  );
}
  viewsubBrokerList(brokerlist){

    $('#subGroupList-modal').modal('show');
    console.log(brokerlist)
    this.customerslist = brokerlist
    // $("#DataTables_Table_1").dataTable().OnDestroy()
    $("#DataTables_Table_1").dataTable().fnDestroy();

  }
  invitationbroker(details:any,index:any){

    // console.log(details)
    var corporateId = sessionStorage.getItem('corporateId');
    var accessToken = sessionStorage.getItem('accessToken');
    var GetBrokers = `/api/ap/admin/corporate/${details.uId}/invitation`;

//https://testadminapi.groupbenefitz.aitestpro.com/api/ap/admin/corporate/1660/invitation
    this.http.get(environment.apiUrl+GetBrokers,{
       headers:{
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
       }
    }).subscribe((response:any)=>{

      if(response['status']==200|| response['statusCode'] == 200){
       Swal.fire({title:"Info",text:response.message})
      } else {
        Swal.fire({title:'Error',text:response.message})
      }


    }),(error)=>{
      Swal.fire({ title: 'Error', text: error.error.error.message });
    }

  }
  public viewBrokerDetails(broker:any,index:number){

    this.router.navigate(['/manageCorporates/edit-corporate/'+broker.id]);

    // /broker/{brokerId}/details

}
public viewMemberDetails(member:any,index:number){

$("#showmemberlist").modal('hide')
  sessionStorage.setItem("customerId",member.uId)
  this.router.navigate(['/manageMembers/employee/'+member.uId+'/details']);


}
// public viewMemberDetails(member:any,index:number){

//   $("#showmemberlist").modal('hide')
//     sessionStorage.setItem("customerId",member.uId)
//     this.router.navigate(['/employee/'+member.uId+'/details']);

//   }
public viewBrokerCustomers(broker:any,index:number){
  $('#subGroupList-modal').modal('hide');
  this.router.navigate(['/advsiors/'+broker.id+'/customers']);

  // /broker/{brokerId}/details

}



ShowDetails(data:any,id:any){

  var corporateId = sessionStorage.getItem('corporateId');
  var accessToken = sessionStorage.getItem('accessToken');
  // var GetBrokers = `/api/ap/broker/${id}/details`;
var GetEmployees=`/api/ap/admin/corporate/${id}/employees`


  this.http.get(environment.apiUrl+GetEmployees,{
     headers:{
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
     }
  }).subscribe((response:any)=>{
    if(response['status']==200|| response['statusCode'] == 200){
      console.log("responce details",JSON.stringify(response));
      this.dtTrigger1.next(null);
      $("#DataTables_Table_1").dataTable().fnDestroy();
      this.employeelist = response.data.employees
      this.corporateCompany =data.name
      // $('#showmemberlist').show();
    } else {
      Swal.fire({title:'Error',text:response.message})
    }
  }),(error)=>{
    Swal.fire({ title: 'Error', text: error.error.error.message });
  }

}



  public addClientDetails(){
    this.router.navigate(['/manageCorporates/addCorporate']);
  }

  addEmployee(client){
    //  alert(compName)
    sessionStorage.setItem('corpId',client.id);
    sessionStorage.setItem("compName",client.name);
    sessionStorage.setItem("compFormId",client.formId);

    this.router.navigate(['/manageCorporates/addEmployee']);
      // alert('1212')
  }
  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

public getclientList(){

  var corporateId = sessionStorage.getItem('corporateId');
  var accessToken = sessionStorage.getItem('accessToken');
  var getClients = '/api/ap/admin/corporate/details/false';


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

          this.clientList = (response as any).data;
          this.allClientList=this.clientList;
          this.clientList.sort((a, b) => {

            const order = { true: 1, false: 2, cancelled: 3 };

            if (order[a.status] !== order[b.status]) {
              return order[a.status] - order[b.status];
          }
          // const result = a.name.localeCompare(b.name);
          // return result !== 0 ? result : a.lastName.localeCompare(b.lastName);
          return a.name.trim().localeCompare(b.name.trim());
          });
          this.dtTrigger.next(null);


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

public deletebrokerDetails(broker:any,index:any){

  console.log(broker)
  // console.log(index)
  var accessToken = sessionStorage.getItem('accessToken');
  var deleteBroker = '/api/ap/broker/'+ broker.id+''


  Swal.fire({
    title:'Alert',
    text: 'Are you sure you want to delete this '+broker.brokerType+'?',
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
            // window.location.reload()
        // this.getBrokerList()
        this.getclientList()
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

public brokerStatus(broker:any,event:any,index:number){
  $("#DataTables_Table_0").dataTable().fnDestroy();
  // $("#DataTables_Table_0").dataTable().fnDestroy();
  var accessToken = sessionStorage.getItem('accessToken');
  var brokerStatus = '/api/ap/broker/' + broker.id + '/activation/'+event

  Swal.fire({
    title:'Alert',
    text: 'Are you sure you want to change this '+broker.brokerType+' status?',
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: 'Proceed',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      // $("#DataTables_Table_0").dataTable().fnDestroy();

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

            // console.log(this.clientList);
            // window.location.reload()
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
    else{
      this.getclientList();
    }
  })

}



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe();
  }
}
export function moments(date: string | undefined): moment.Moment {

  if (date)

  return moment((new Date(date)).toJSON())

  else

return moment();

  }

