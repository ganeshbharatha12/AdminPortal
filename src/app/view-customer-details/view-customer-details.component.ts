

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
  selector: 'app-view-customer-details',
  templateUrl: './view-customer-details.component.html',
  styleUrls: ['./view-customer-details.component.css'],
  providers: [DatePipe],
})
export class ViewCustomerDetailsComponent implements OnDestroy,OnInit {
  brokerList: Array<any> = [];
  clientList: Array<any> = [];

  dateFormat= 'YYYY-MM-DD';

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  persons: Array<any> = [];


  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger1: Subject<any> = new Subject<any>();
  customerslist: Array<any> = [];

  constructor( private formBuilder: FormBuilder, private http: HttpClient, public router:Router,private datePipe: DatePipe,private excelService: ExcelService,) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'simple_numbers',
      language:{
        searchPlaceholder:'Search here...'
      },
    };

    // this.getclientList()



  }

rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
     dtInstance.destroy();
     this.dtTrigger1.next(null);
  });
}
scrollTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
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



