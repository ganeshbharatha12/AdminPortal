import { Component, Input, OnInit } from '@angular/core';
import 'jquery';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var $: any;

declare global {
  // interface JQuery {
  //   (selector: string): JQuery;
  //   gaugeMeter(any): JQuery;
  //   updateGaugeMeter(any): JQuery;
  // }
}
@Component({
  selector: 'app-chart-guage',
  templateUrl: './chart-guage.component.html',
  styleUrls: ['./chart-guage.component.css']
})
export class ChartGuageComponent implements OnInit {


  @Input() MaxEmployee: any;
  @Input() MinEmployee: any;
  @Input() status: any;
  constructor(private http: HttpClient,) { }

  ngOnInit() {
    $( document ).ready(function() {
      $("#gm1").gaugeMeter(
        {id:"gm1",
        label:'Status',
        percent:0,
        used:0,
        total:10,
        size:200,
        width:20,
        prepend:"",
        append:"%",
        color:"green",
        back:"silver",
        style:"Semi",
        "stripe":3,
        animate_gauge_colors:1,
        animate_text_colors:1,
        showvalue:false});
      $("#gm2").gaugeMeter(
        {id:"gm2",
        label:'Employees Enrolled',
        percent:0,
        used:0,
        total:10,
        size:200,
        width:20,
        prepend:"",
        append:"%",
        color:"blue",
        back:"silver",
        style:"Semi",
        "stripe":3,
        animate_gauge_colors:1,
        animate_text_colors:1,
        showminmax:true});
        $("#gm3").gaugeMeter(
          {id:"gm3",
          label:'Employees Rostered',
          percent:0,
          used:0,
          total:10,
          size:200,
          width:20,
          prepend:"",
          append:"%",
          color:"blue",
          back:"silver",
          style:"Semi",
          "stripe":3,
          animate_gauge_colors:1,
          animate_text_colors:1,
          showminmax:true});
        $("#gm4").gaugeMeter(
          {id:"gm4",
          label:'Expected Premium',
          used:0,
          total:10,
          size:200,
          width:20,
          prepend:"",
          append:"K",
          color:"blue",
          back:"silver",
          style:"Semi",
          "stripe":3,
          animate_gauge_colors:1,
          animate_text_colors:1,
          showminmax:true,
          showvalue:true});
          $("#gm5").gaugeMeter(
            {id:"gm5",
            label:'Monthly Premium',
            percent:0,
            used:0,
            total:0,
            size:200,
            width:20,
            prepend:"",
            append:"K",
            color:"blue",
            back:"silver",
            style:"Semi",
            "stripe":3,
            animate_gauge_colors:1,
            animate_text_colors:1,
            showminmax:true,showvalue:true});
            $("#gm6").gaugeMeter(
              {id:"gm6",
              label:'Wallet Pre-pay',
              percent:0,
              used:0,
              total:0,
              size:200,
              width:20,
              prepend:"",
              append:"K",
              color:"blue",
              back:"silver",
              style:"Semi",
              "stripe":3,
              animate_gauge_colors:1,
              animate_text_colors:1,
              showminmax:true,showvalue:true});


    });
this.updateChart()

  }


  updateChart(){
    //get id of the element -- update min, total(max), used(value) and all below

    var accessToken = sessionStorage.getItem('accessToken');
    var corporateId = sessionStorage.getItem('corporateId');
    var endPoint = '/api/ap/admin/corporate/' + corporateId + '/metricsSummary1';
    this.http
      .get(environment.apiUrl + endPoint, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe((response: any) => {
        if (response['status'] == 200) {
            console.log("response",JSON.stringify(response));
          // console.log(this.fixUsedMaxGraph(response.data.summary_v2_v2.expectedPremium.totalEmployeesTotalPriceMin))
          // console.log(response.data.summary_v2.expectedPremium.totalEmployeesTotalPriceMin)

          // console.log(this.fixUsedMaxGraph(response.data.summary_v2.expectedPremium.totalEmployeesTotalPriceMax))
          // console.log(response.data.summary_v2.expectedPremium.totalEmployeesTotalPriceMax)
          $("#gm1").updateGaugeMeter(
            {id:"gm1",
            min:0,
            used:this.status,
            total:10,
          });
          $("#gm2").updateGaugeMeter(
            {id:"gm2",
            min:0,
            used:response.data.summary_v2.employeesInfo.employeesEnrolled,
            total:response.data.summary_v2.employeesInfo.totalEmployees,
            // append:response.data.enrolledEmployees.addedEmployees.appender
          });
          $("#gm3").updateGaugeMeter(
            {id:"gm3",
            min:0,
            used:response.data.summary_v2.employeesInfo.employeesRostered,
            total:response.data.summary_v2.employeesInfo.totalEmployees,
          });
            $("#gm4").updateGaugeMeter(

              {id:"gm4",
              min:0,
              used:this.fixUsedMaxGraph(response.data.summary_v2.expectedPremium.totalEmployeesTotalPriceMin) || 0,
              total:this.fixUsedMaxGraph(response.data.summary_v2.expectedPremium.totalEmployeesTotalPriceMax) || 0,
              append:response.data.summary_v2.expectedPremium.appender}

            );
              $("#gm5").updateGaugeMeter(
                {id:"gm5",
                min:0,
                used:this.fixUsedMaxGraph(response.data.summary_v2.expectedOptin.totalEmployeesTotalPriceMin) || 0,
                total:this.fixUsedMaxGraph(response.data.summary_v2.expectedOptin.totalEmployeesTotalPriceMax) || 0,
                append:response.data.summary_v2.expectedOptin.appender
              });

                $("#gm6").updateGaugeMeter(
                  {id:"gm6",
                  min:0,
                  used:this.fixUsedMaxGraph(response.data.summary_v2.walletPrepay.addedEmployeeWallet) || 0,
                  total:this.fixUsedMaxGraph(response.data.summary_v2.walletPrepay.totalWalletLimit) ||0,
                  append:response.data.summary_v2.walletPrepay.appender
                });
        }else{
          Swal.fire({title:'Error',text:response.message})
        }

      }, (error) => {
        Swal.fire({title:'Error',text:error.error.error.message})
        // this.toastrService.error("Invalid Credentials", 'Error!');
      });

  }

  public fixUsedMaxGraph(amount){

    return parseFloat(parseFloat(amount.toString()).toFixed(2))

    }

}
