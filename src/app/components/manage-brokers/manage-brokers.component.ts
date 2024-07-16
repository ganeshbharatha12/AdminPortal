


import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
declare var $: any;
@Component({
  selector: 'app-manage-brokers',
  templateUrl: './manage-brokers.component.html',
  styleUrls: ['./manage-brokers.component.css'],
  providers: [DatePipe],
})
export class ManageBrokersComponent implements OnDestroy,OnInit {
  brokerList: Array<any> = [];

  dateFormat= 'YYYY-MM-DD';

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  persons: Array<any> = [];


  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger1: Subject<any> = new Subject<any>();
  customerslist: Array<any> = [];
  role: any;
  allBrokerList: any[];

  constructor( private formBuilder: FormBuilder, private http: HttpClient, public router:Router,private datePipe: DatePipe,private excelService: ExcelService,) { }

  ngOnInit() {
    this.role=sessionStorage.getItem('role');
    this.dtOptions = {
      pagingType: 'simple_numbers',
      language:{
        searchPlaceholder:'Search here...'
      },
    };

    this.getBrokerList()



  }

rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
     dtInstance.destroy();
     this.dtTrigger1.next(null);
  });
}

adviserInvitation(broker:any,index:any){

  var corporateId = sessionStorage.getItem('corporateId');
  var accessToken = sessionStorage.getItem('accessToken');
  var GetBrokers = `/api/ap/broker/${broker.id}/invitation`;

  this.http
    .get(environment.apiUrl + GetBrokers, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    })
    .subscribe(
      (response: any) => {
        if (response['status'] == 200 || response['statusCode'] == 200) {

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
            showCancelButton: true,
            confirmButtonText: 'Proceed',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
          });
        } else {
          // Swal.fire(error.error.error.message)
          Swal.fire({ title: 'Error', text: error.error.error.message });
        }
        // this.toastrService.error("Invalid Credentials", 'Error!');
      }
    );
}
  viewsubBrokerList(brokerlist){

    $('#subGroupList-modal').modal('show');
    console.log(brokerlist)
    this.customerslist = brokerlist
    this.dtTrigger1.next(null);
    // $("#DataTables_Table_1").dataTable().OnDestroy()
    $("#dataTableId").dataTable().fnDestroy();

  }
  closePopup(){
    $("#DataTables_Table_1").dataTable().fnDestroy();
    this.dtTrigger.next(null);
    // this.getBrokerList();



  }

  changeStatus(e:any){
    $("#dataTableId").dataTable().fnDestroy();
    this.brokerList=[];

    let val=e.target.value.toLowerCase();//member.status.toLowerCase()==val
    if(val=='all'){
      this.brokerList=this.allBrokerList;
    }else{
      this.brokerList= this.allBrokerList.filter((member)=>{
        if(member.status?.toString().toLowerCase()==val){
          return member;
       }
          });
    }
      // this.dtTrigger.next(null);
      // this.dtTrigger.unsubscribe();
      this.dtTrigger.next(null);
      console.log(this.brokerList);
  }

  public viewBrokerDetails(broker:any,index:number){

    this.router.navigate(['/manageAdvisors/editAdvisor/'+broker.id]);

    // /broker/{brokerId}/details

}
public viewBrokerCustomers(broker:any,index:number){
  $('#subGroupList-modal').modal('hide');
  this.router.navigate(['/manageAdvisors/advsiors/'+broker.id+'/customers']);

  // /broker/{brokerId}/details

}


  public addBrokerDetails(){
    this.router.navigate(['/manageAdvisors/addAdvisor']);

  }
  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

public getBrokerList(){

  var corporateId = sessionStorage.getItem('corporateId');
  var accessToken = sessionStorage.getItem('accessToken');
  var GetBrokers = '/api/ap/brokers/details';
  const that = this;


  this.http
    .get(environment.apiUrl + GetBrokers, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    })
    .subscribe(
      (response: any) => {
        if (response['status'] == 200 || response['statusCode'] == 200) {

          this.brokerList = (response as any).data;
          this.allBrokerList=this.brokerList ;
          // this.brokerList=this.brokerList.sort((a, b)=>{
          //   const order={true :1,false:2};
          //   return order[a.status]-order[b.status]
          // })
          this.brokerList.sort((a, b) => {

            const order = { true: 1, false: 2,};

            if (order[a.status] !== order[b.status]) {
              return order[a.status] - order[b.status];
          }
          return a.name.trim().localeCompare(b.name.trim());
          });

          this.dtTrigger.next(null);
          // arrayOfObjects.sort((a, b) => {
          //   const order = { active: 1, draft: 2, cancelled: 3 };

          //   return order[a.status] - order[b.status];
          // });
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

public brokerStatus(broker:any,event:any,index:number){
  $("#dataTableId").dataTable().fnDestroy();

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
      this.getBrokerList()
      // window.location.reload()
    }
  })

}



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
export function moments(date: string | undefined): moment.Moment {

  if (date)

  return moment((new Date(date)).toJSON())

  else

return moment();

  }
