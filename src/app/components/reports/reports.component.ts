import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  // dtOptions: DataTables.Settings = {};
  persons: Array<any> = [];
  generateROEpdf: any;
  reportResults: Array<any> = [];
  dtTrigger: Subject<any> = new Subject<any>();
  afterapprove = true;
  categoryProvider = false;
  showtable =false;
  categoryRole = false;
  showactions = null;
  StartDateRange: any;
  endDateRange: any;
  showaction =false;
  requestforapprove=false;
  approve=false;
  reportId:any;
  selectedTab: string = 'tab1';
  @Input() getBrokerDetails: any;
  message: any;

  constructor(private http: HttpClient, public router: Router,) {
  }


  ngOnInit() {
    // this.getReports()
    console.log(this.getBrokerDetails)

  }

  changeMessage(newMessage: string): void {
    this.message = newMessage;

    alert(this.message)
  }
  selectTab(tabName: string): void {
    this.selectedTab = tabName;
  }
  getReports() {

    var corporateId = sessionStorage.getItem('corporateId');

    var reportsList = '/api/ap/admin/reportFiles';
    var accessToken = sessionStorage.getItem('accessToken');
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 2
    // };
    this.http
      .get(environment.apiUrl + reportsList, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe((response: any) => {

        if (response['status'] == 200) {
          this.reportResults = (response as any).data;
          this.reportId = response.reportId
          this.dtTrigger.next("l");
        }
        else {
          Swal.fire({ title: 'Error', text: response.message })
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
              else {
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

  approveReport(report, i) {

    this.afterapprove = true
    this.showactions = i

  }
  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  dateRangeCreated($event) {

    let startDate = $event[0].toJSON().split('T')[0];
    let endDate = $event[1].toJSON().split('T')[0];

    this.StartDateRange = startDate

    this.endDateRange = endDate

  }

  getReportsRange() {
    var data = {
      "whereObj": [{
        "searchterm": "registrationDate",
        "searchvalue": {
          "from": this.StartDateRange, "to": this.endDateRange
        }
      }], "limit": 0, "brokerId": 0
    }

    var reportNotificationdates = '/api/ap/customers/reports/generate';
    var accessToken = sessionStorage.getItem('accessToken');
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 2
    // };
    this.http
      .post(environment.apiUrl + reportNotificationdates, data, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe((response: any) => {

        if (response['status'] == 200) {

          this.reportResults = (response as any).data.info.data;
          this.reportId = response.data.reportId
          this.showtable =true;
          this.requestforapprove =true;
          this.dtTrigger.next("l");

        }
        else {
          Swal.fire({ title: 'Error', text: response.message })
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
              else {
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

  requestapprove(){
    var reportNotificationdates = '/api/ap/customers/reports/approvalRequest';
    var accessToken = sessionStorage.getItem('accessToken');
         let data={
            "reportId": this.reportId,
            "brokerId": 1
              }
    this.http
      .post(environment.apiUrl + reportNotificationdates, data, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe((response: any) => {

        if (response['status'] == 200) {
          Swal.fire({ title: 'Info', text: response.message })

          this.requestforapprove =false;
          this.approve =true

        }
        else {
          Swal.fire({ title: 'Error', text: response.message })
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
              else {
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

  approvereport(){
    var reportNotificationdates = '/api/ap/customers/reports/approveRequest';
    var accessToken = sessionStorage.getItem('accessToken');
         let data={
            "reportId": this.reportId
              }
    this.http
      .post(environment.apiUrl + reportNotificationdates, data, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe((response: any) => {

        if (response['status'] == 200) {
          Swal.fire({ title: 'Info', text: response.message })

          this.requestforapprove =false;
          this.approve =false
          this.showaction =true

        }
        else {
          Swal.fire({ title: 'Error', text: response.message })
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
              else {
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
  downloadReports(report) {

    console.log(report)

    if (report.type == 'pdf') {
      this.http.get(report.link, { responseType: "arraybuffer" }).subscribe(
        pdf => {
          const blob = new Blob([pdf], { type: "application/pdf" });
          const fileName = report.name + ".pdf";
          saveAs(blob, fileName);
        },
        err => {
          console.log("err->", err);
        }
      );
    }
    if (report.type == 'excel') {
      this.http.get(report.link, { responseType: "arraybuffer" }).subscribe(
        xlsx => {
          const blob = new Blob([xlsx], { type: "xlsx" });
          const fileName = report.name + ".xlsx";
          saveAs(blob, fileName);
        },
        err => {
          console.log("err->", err);
        }
      );
    }
  }

  sentmailtoAdvisor(report) {
    var corporateId = sessionStorage.getItem('corporateId');

    var reportNotification = '/api/ap/admin/reportNotification';
    var accessToken = sessionStorage.getItem('accessToken');

    let data = {
      "type": report.type,
      "name": report.name,
      "extension": report.extension,
      "key": "",
      "link": report.link,
      "reportingEmail": report.reportingEmail,
      "reportingType": report.reportingType
    }
    this.http
      .post(environment.apiUrl + reportNotification, data, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe((response: any) => {

        if (response['status'] == 200) {

          Swal.fire({ title: 'Success', text: response.message })
        }
        else {
          Swal.fire({ title: 'Error', text: response.message })
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
              else {
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
  selectBrokerrole(value) {
    if (value == 'role') {
      this.categoryRole = true
      this.categoryProvider = false

    } else {
      this.categoryRole = false
      this.categoryProvider = true
    }
  }
}
