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
  // members: any;


  constructor( private formBuilder: FormBuilder, private http: HttpClient, public router:Router,private datePipe: DatePipe,private excelService: ExcelService,) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'simple_numbers',
      language:{
        searchPlaceholder:'Search here...'
      },
    };

    //  this.getclientList();



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

    this.router.navigate(['/editAdvisor/'+broker.id]);

    // /broker/{brokerId}/details

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


public showDetails(member:any,index:number){

this.customerId=member.id;
  sessionStorage.setItem("customerId",member.id);
  this.showmemberData =true;
  // const modal = new Modal(this.memberdetails.nativeElement);
  // modal.show();
  // setTimeout(() => {
  //   // $('#memberdetails-modal').modal('show');

  // }, 100);

}

public brokerStatus(broker:any,event:any,index:number){
  $("#DataTables_Table_0").dataTable().fnDestroy();

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
      this.getclientList()
      // window.location.reload()
    }
  })

}



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  openModelAddMumber(){
      // alert('1212')
  }




}


export function moments(date: string | undefined): moment.Moment {

  if (date)

  return moment((new Date(date)).toJSON())

  else

return moment();

  }


