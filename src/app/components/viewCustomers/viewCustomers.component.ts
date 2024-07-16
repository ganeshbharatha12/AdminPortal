import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables';


class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
declare var $: any;
@Component({
  selector: 'app-viewCustomers',
  templateUrl: './viewCustomers.component.html',
  styleUrls: ['./viewCustomers.component.css']
})
export class ViewCustomersComponent implements OnInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger1: Subject<any> = new Subject<any>();
  customerList:  Array<any> = [];
  customerList1:  Array<any> = [];
  customerListStatus:  Array<any> = [];
  customersplanslist:  Array<any> = [];
  basicDetails: any;
  ParentName: any;
  brokerType: any;
  BrokerName: any;
  showdata:boolean =false
  constructor(private http:HttpClient,private route: ActivatedRoute,public router:Router) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      language:{
        searchPlaceholder:'Search here...'
      },
    };

    this.getCustomerDetails()
  }

  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //      dtInstance.destroy();
  //      this.dtTrigger.next(null);
  //   });
  // }
  getCustomerDetails(){

        var accessToken = sessionStorage.getItem('accessToken');
        var GetBrokersDetails = '/api/ap/broker/'+ this.route.snapshot.params['id']+'/details';

        this.http
        .get(environment.apiUrl + GetBrokersDetails, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response: any) => {
            if (response['status'] == 200 || response['statusCode'] == 200) {

console.log(response.data.customers)
              this.customerList = response.data.customers
              this.basicDetails =response.data
              this.ParentName =this.basicDetails.parent.name
              this.brokerType =this.basicDetails.brokerType
              this.BrokerName =this.basicDetails.name
                this.showdata =true
              var arr=[]

              for(let i=0;i<this.customerList.length;i++){
                arr.push(this.customerList[i].status)
                this.customerListStatus= arr.filter((item,
                  index) => arr.indexOf(item) === index);
                if(this.customerList[i].status=="Active"){
                  this.customerList1.push(this.customerList[i])
                }
                this.customerList1 = this.customerList1.sort((a, b) =>
                a.firstName > b.firstName ? 1 : -1
              );

              }


              $("#DataTables_Table_0").dataTable().fnDestroy();
              this.dtTrigger.next(null);

            }
            else {
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
                confirmButtonText: 'OK',
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


filtercustomerstatus(e,status){
console.log(e)
console.log(e.target.value)

$("#DataTables_Table_0").dataTable().fnDestroy();
this.dtTrigger.next(null);

if(e.target.value!="All"){
  this.customerList1 =[]
  for(let i=0;i<this.customerList.length;i++){
    if(this.customerList[i].status==e.target.value){
      this.customerList1.push(this.customerList[i])
    }
  }
  this.customerList1 = this.customerList1.sort((a, b) =>
  a.firstName > b.firstName ? 1 : -1
);
}
else{
  this.customerList1 = this.customerList.sort((a, b) =>
  a.firstName > b.firstName ? 1 : -1
);
}



      }
      rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
           dtInstance.destroy();
           this.dtTrigger1.next(null);
        });
      }
        viewcustomerPlansList(brokerlist){

          $('#customerPlansList-modal').modal('show');
          console.log(brokerlist)
          this.customersplanslist = brokerlist

          $("#DataTables_Table_1").dataTable().fnDestroy();
          this.dtTrigger1.next(null);

        }
        closePopup(){
          $('#customerPlansListTable').dataTable().fnDestroy();
          this.dtTrigger1.next(null);

        }
}
