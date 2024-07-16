import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import SwiperCore, { Navigation,EffectCoverflow, Pagination, SwiperOptions, Swiper, Virtual } from "swiper";


SwiperCore.use([Navigation,Pagination,EffectCoverflow]);

@Component({
  selector: 'app-myplans',
  templateUrl: './myplans.component.html',
  styleUrls: ['./myplans.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class MyplansComponent implements OnInit {
  buttons:any;
  selectedButtonIndex: number = 1;
  plansResults: any;
  configprovinceres: any;
  showPlanAvailble: boolean =true;
  showPlanAvailbletext: boolean =false;
  usaconfigprovinceres: any;

  constructor(private http: HttpClient,public router: Router) { }

  ngOnInit(): void {
    this. buttons = [
      { label: 'USA' },
      { label: 'CA' }
    ];





    this.getReports()
    this.formConfig()
  }

  getReports() {

    var corporateId = sessionStorage.getItem('corporateId');

    var reportsList = '/api/ap/broker/1/12/plans/true';
    var accessToken = sessionStorage.getItem('accessToken');

    this.http
      .get(environment.apiUrl + reportsList, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe((response: any) => {

        if (response['status'] == 200) {
          this.plansResults = response.data.products
          setTimeout(() => {
            this.SwiperPropertys()

          }, 1000);

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
  selectButton(index: number): void {
    this.selectedButtonIndex = index;
    if(index==0){
      this.plansResults =[]
      this.showPlanAvailble=false
      this.showPlanAvailbletext = true
      this.configprovinceres =this.usaconfigprovinceres

      // console.log(this.usaconfigprovinceres)
    }
    else{
      this.getReports()
      this.showPlanAvailble=true
      this.showPlanAvailbletext = false
      this.configprovinceres=[]
    }
  }
  toggleItem(item: any): void {
    item.expanded = !item.expanded;
  }
  formConfig() {
    var endPoint = '/api/ap/broker/formConfig';
    var accessToken = sessionStorage.getItem('accessToken');

    this.http
      .get(environment.apiUrl + endPoint, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (response: any) => {
          if (response['status'] == 200) {

            console.log(response)


            this.configprovinceres = response.data.states.sort(
              (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
            );


            for(let i=0;i<response.data.countries.length;i++){
              if(response.data.countries[i].name=="USA"){
                this.usaconfigprovinceres = response.data.countries[i].statesAndProvinces.sort(
                  (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
                );
                console.log(this.usaconfigprovinceres)
              }
            }

            setTimeout(() => {
              var swiper = new Swiper(".mySwiper", {
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                },
              });
            }, 1000);
          } else {
            Swal.fire({ title: 'Error', text: response.message });
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

  SwiperPropertys(){
    var TrandingSlider = new Swiper('.tranding-slider', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      },
      pagination: {
        el: '.swiper-pagination',
        type: "fraction",
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
  }
}
