import { HttpClient } from '@angular/common/http';
import { Component, Renderer2, Input, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import * as saveAs from 'file-saver';
import { SignaturePad } from 'angular2-signaturepad';
import { Observable, ReplaySubject, ignoreElements } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";
import { JsonPipe, KeyValue } from '@angular/common';
import { HeaderComponent } from './../../layouts/header/header.component';
import { SharedService } from './../../services/sharedService/shared.service'
// import { PhoneFormatPipe } from 'src/app/pipes/phone-format.pipe';
import { PhoneFormatPipe } from "../../pipes/phone-format.pipe";
// import { Modal } from 'bootstrap';

import { state } from '@angular/animations';
// import { MaskNumberPipe } from '../pipes/mask-number.pipe';
import SwiperCore, { Navigation,EffectCoverflow, Pagination, SwiperOptions, Swiper, Virtual } from "swiper";
import {

  SafeResourceUrl,

  DomSanitizer,

  SafeHtml,

  SafeUrl,

  SafeStyle,

  SafeScript,

  EventManager,

} from "@angular/platform-browser";
import jsPDF from 'jspdf';
import { type } from 'jquery';
// import { moment } from 'ngx-bootstrap/chronos/testing/chain';

import * as moment from "moment";
import { DecimalPipe, } from "@angular/common";

SwiperCore.use([Navigation,Pagination,EffectCoverflow]);
// import M from 'materialize-css';
// import { ReCaptchaV3Service } from 'ng-recaptcha';
declare var $: any;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  providers: [DatePipe, TitleCasePipe, DecimalPipe,PhoneFormatPipe
    // HeaderComponent
  ],
  encapsulation: ViewEncapsulation.None
})
export class OverviewComponent implements OnInit{

  spouseDob: Date = new Date();

  addressform: FormGroup = new FormGroup({
    line1: new FormControl(''),
    line2: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    province: new FormControl(''),
    postalCode: new FormControl(''),
    primaryPhone: new FormControl(''),
    secondaryPhone: new FormControl(''),
    firstName:new FormControl(''),
    lastName:new FormControl(''),
  });

  phoneform: FormGroup = new FormGroup({
    primaryPhone: new FormControl(''),
    secondaryPhone: new FormControl(''),
  });

  uploadService: FormGroup=new FormGroup({
    uploadhealthCard :new FormControl(''),
    uploadhealthCardProvider:new FormControl(''),
    uploadhealthCardFile:new FormControl('')
  })

  spouseform: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl(this.spouseDob.toISOString().split("T")[0]),
    email: new FormControl(''),
    coveredByAnotherPlan: new FormControl(''),
    healthPlan: new FormControl(''),
    insurer: new FormControl(''),
    martialStatus: new FormControl(''),
    effectiveDate: new FormControl(''),
    gender: new FormControl(''),
  });

  dependentform: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    age: new FormControl(''),
    phoneNum: new FormControl(''),
    coveredByAnotherPlan: new FormControl(''),
    carrierName: new FormControl(''),
    specialNeeds: new FormControl(''),
    postSecondaryStudent: new FormControl(''),
    graduationDate: new FormControl(''),
    // martialStatus: new FormControl(''),
    effectiveDate: new FormControl(''),
  });

  paymentform: FormGroup = new FormGroup({
    cutomerId: new FormControl(''),
    // Id: new FormControl(''),
    PublicApiKey: new FormControl(''),
    SuccessUri: new FormControl(''),
    FailUri: new FormControl(''),
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    email: new FormControl(''),
    CardNumber: new FormControl(''),
    ExpirationMonth: new FormControl(''),
    ExpirationYear: new FormControl(''),
    Cvv: new FormControl(''),
    nameonthecard: new FormControl(''),
    aptcheck: new FormControl(''),
    streetaddress: new FormControl(''),
    streetaddressline2: new FormControl(''),
    city:  new FormControl(''),
    stateId:  new FormControl(''),
    postalcode:  new FormControl(''),
    recaptchaReactive: new FormControl(''),
  });

  ccform: FormGroup = new FormGroup({
    cutomerId: new FormControl(''),
    Id: new FormControl(''),
    PublicApiKey: new FormControl(''),
    SuccessUri: new FormControl(''),
    FailUri: new FormControl(''),
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    email: new FormControl(''),
    CardNumber: new FormControl(''),
    ExpirationMonth: new FormControl(''),
    ExpirationYear: new FormControl(''),
    Cvv: new FormControl(''),
    nameonthecard: new FormControl(''),
    aptcheck: new FormControl(''),
    streetaddress: new FormControl(''),
    streetaddressline2: new FormControl(''),
    city:  new FormControl(''),
    stateId:  new FormControl(''),
    postalcode:  new FormControl(''),
    recaptchaReactive: new FormControl(''),
  });

  padform: FormGroup = new FormGroup({
    bankcode: new FormControl(''),
    transitNumber: new FormControl(''),
    accountNo: new FormControl(''),
    bankdetails: new FormControl(''),
    file: new FormControl(''),
  });

  paymentMethodForm: FormGroup = new FormGroup({
    bankCode: new FormControl(''),
    branchCode: new FormControl(''),
    accountNumber: new FormControl(''),
    files: new FormControl(''),
    paymentmethod: new FormControl(''),
  });

  valisignform: FormGroup = new FormGroup({
    code: new FormControl(''),
  });

  invoicesList:any [] = [];
  hicList:any [] = [];
  @Input() customerId:any;
  customerData:any;
  childrenInfo:any [] = [];
  childrenId:any;

  // UpdateAddressComponent = false;
  // UpdateSpousePlanComponent = false;
  spouseInsurer:any;
  roe:any;
  viewRoe:boolean = true;
  formConfiguration:any;
  selectedTab:any = 'tab1';
  healthCard:any = false;
  src:any;
  spouseCoverage:any;
  childCoverage:any;
  specialNeeds:any;
  postSecondaryStudent:any;
  graduationDate = true;
  coverage:any = 'open';
  dependentCoverage = 'open';
  bookletList:any [] = [];
  bookletList1:any [] = [];
  serviceDetailsarray:any [] = [];
  // declare var $: any;
  // display:any = 'none';
  displayStyle = 'none';
  displayBooklet = 'none';
  roeUrl:any;
  secondaryPhone:any;
  invalidpostalcodeprivince: boolean = false;
  configprovinceres:any;
  openUpdatePaymentForm:any;
  provincialZipcodes:any;
  provincelistid:any;
  state_id:any;
  statename:any;
  postalvalue:any;
  resetButton = false;
  resetbutton = false;
  uploadCheque = false;
  bankInfo:any;
  bank:any;
  bankAddress:any [] = [];
  displayTimer: any;
  showTimer:any;
  startTimer:any;
  customerid:any;
  accessToken:any;
  invoiceResponse:any;
  creditCardNo:any;
  expire:any;
  bookletLink:any;
  booklet_link: any;
  support_link: any;
  health_card: any;
  hidebooklet:any = false;
  upcomingInvoice:any;
  spouseId:any;
  fusebillId:any;
  advisor:any;
  paymentVoidCheque:any;
  imagedisplay:any;
  address:any;
  fileExtension:any;
  signatureImg: any;
  encBank:any
  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 700,
    'canvasHeight': 300
  };
  spouseData:any;
  spouseUpdate:any;
  spouseStatus:any;
  spouseInfo:any;
  dependentData:any;
  dependentUpdate:any;
  dependentStatus:any;
  // selectedBase64: string | null = null;
  selectedBase64:any;
  expireMonth:any;
  expireYear:any;
  invalidExpiration = false;
  showImage = false;
  bankDetails = false;
  bankinfo = false;
  cheque = false;
  pad:any;
  signedPad:any;
  PADdetails:any;
  bankCode:any;
  transitNumber:any;
  accountNumber:any;
  banknameres:any;
  items:any = 1;
  cardNumber:any;
  currentIndex = 1;
  link:any;

  @ViewChild(SignaturePad)
  signaturePad!: SignaturePad;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('closePhonemodal') closePhonemodal:any;
  @ViewChild('closeAddressmodal') closeAddressmodal:any;
  @ViewChild('closeSpousemodal') closeSpousemodal:any;
  @ViewChild('closeDependentmodal') closeDependentmodal:any;
  @ViewChild('closePaymentmodal') closePaymentmodal:any;
  @ViewChild('openRoe') openRoe:any;
  @ViewChild('videoPopup') openPopup: any;
  @ViewChild('iframePopup') openiframe:any;
  @ViewChild('equitablePopup') openequitable:any;
  @ViewChild('supportPopup') opensupport:any;
  @ViewChild('closePaymenttoPAD') closePaymenttoPAD:any;
  @ViewChild('myFileInput') myFileInput: ElementRef;
  @ViewChild('myFileInputService') myFileInputService: ElementRef;
  paymentMethod:any;
  // @ViewChild(HeaderComponent)
  // headerComponent!: HeaderComponent;
  filename: any;
  padfilename: any;
  ext: any;
  mimetype: any;
  previewbutton: boolean = false;
  updatepreviewbutton: boolean = false;
  changetopad: boolean = false;
  invoicedraftData:any;
  paymentUri:any;
  paymentsuccessuri:any;
  publicapikey:any;
  paymentform2:any;
  recaptchaResponse:any;
  fusbillinfocaptchavalue:any;
  fullName: any;
  voidCheque1: any;
  voidCheque2:any;
  bankinformation: any;
  paymentMethodId: any;
  padAgreement: any;
  existVoid: any;
  review: any;
  fuseBillKey: any;
  voidCheckImage: any;
  voidCheckFileType: any;
  ccDetails: any;
  stateId: any;
  countryId: any;
  customerID: any;
  card: any;
  spouse: any;
  index: any = 1;
  lang: any = {};
  gender: any;
  dependentBackgroundColor:any [] = [];
  plans: any;
  benefits: any;
  unlistener: any;
  videoLink: any;
  videoTitle:any;
  videoPopup: any = 'none';
  iframeLink:any;
  iframeTitle:any;
  currentIndexOfSwipperDependents: any=1;

  currentIndexOfSwipperDownload: any=1;

  currentIndexOfSwipperPlan: any=1;

  currentIndexOfSwipperBenifits: any=1;
  @ViewChild('videoPlayer') videoplayer: any;

public startedPlay:boolean = false;

public show:boolean = false;
  logo: any;
  editSpouse: boolean = true;
  editChild: boolean = false;
  logoimage: any;
  headerName: any;
  voidCheckPdf: any;
  url: any;
  minDate: any;
  maxDate: any;
  minDatechild: any;
  minDateHire: any;
  maxDatechild:any;
  memberportalgreensShildCheck: any;
  memberportalEquitabelCheck: any;
  customerPlans: any;
  fubsillstatus: any;
  specialpackages:any [] = [];
  disabledelement: string;
  planobjdata: { packageId: any; packageName: any; planproductname: any; groupid: any; groupName: any; id: any; name: any; planLevel: any; planLevelParent: any; fusebillPlanID: any; planFrequencyID: any; isBundle: any; coverage: any; planCoverage: any; bundledProducts: any[]; products: any[]; };
  planssummarymain: any[];
  planssummaryopt: any[];
  plansskumain: any[] = [];
  cartcheckvalue: boolean;
  planAmount: any;
  plandetailsobjvalue: any;
  optionstitle: any[];
  optionmessage: any;
  showoptions: boolean =false;
  isFileUploaded: boolean;
  bankfile: any;
  Shared: any;
  pdfview: boolean;
  normalview: boolean;
  selectServiceError: boolean=false;
  servicesDetails: any;
  showProvider: boolean=false;
  providersArray: any=[];
  userName: any;
  showViewPlansLoading: boolean=true;
  showFifh: boolean=true;
  showLoadrForDownloadBookLets: boolean=true;
  showPadLoader: boolean=true;
  showVoidCheque:boolean=true;
  showvoidCheque2:boolean=true;
  achDetails: any;
  checkEmailKey: boolean=false;
  noService: boolean=false;
  provianceList: any;
  bankfileArray: any=[];

  // @ViewChild('content') content: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private titleCase: TitleCasePipe,
    private SharedService:SharedService,
    private phoneNoFormat: PhoneFormatPipe,
    private route: ActivatedRoute,
    // private maskNumber: MaskNumberPipe,
    private sanitizer: DomSanitizer,
    private renderer2: Renderer2,
    private router:Router,
    private _decimalPipe: DecimalPipe,
    public elementRef: ElementRef,

    ) {

  }
  ngOnInit() {




    this.minDate = moment().subtract(100, "years").calendar();
    this.maxDate = moment().subtract(16, "years").calendar();

    this.minDate = new Date(this.minDate);

    this.maxDate = new Date(this.maxDate);

    this.minDateHire = moment().subtract(60, "years").calendar();

    this.minDatechild = new Date(this.minDateHire);
    this.maxDatechild = new Date();
    this.getFormConfiguration('en');
    this.dependentBackgroundColor=["#E6D1FF",
    "#FFE2FB",
    "#E2F1FF",
    "#E6D1FF",]
    this.customerid = sessionStorage.getItem('customerId');
    this.accessToken = sessionStorage.getItem('accessToken');
    this.getCustomerData();


    // this.getInvoices();
    // this.getDraftInvoice();
    // this.getHealthBooklets();
    // this.getPlanes();
    // this.getbenefits();
    this.route.queryParams.subscribe(params => {
      console.log(params);
    })
    this.logoimage= sessionStorage.getItem("logo")
    this.unlistener = this.renderer2.listen("document", "click", event => {
    console.log(event)
    let element = event.target
    var attribute = element.getAttribute("href");
    var heading=element.innerText;
    // this.videoPopup = 'block';
    if(event.target.className == 'video') {
      event.preventDefault();
      this.videoLink = attribute;
      this.videoTitle = heading;
      console.log(this.videoLink)
      console.log(this.videoTitle)
      var video = document.getElementsByTagName('video')[0];
      console.log(video)

      this.openVideoPopup();
      video.load();
      video.play();
    }
    if(event.target.className == 'shortlink') {
      this.openSupportPopup();
      // this.support_link = this.sanitizer.bypassSecurityTrustResourceUrl(attribute);
      event.preventDefault();
    }
    if(event.target.className == 'booklet') {
      this.openequitablePopup();
      event.preventDefault();
      this.booklet_link = element.getAttribute("href");
    }
    if(event.target.className == 'healthcard') {
      this.downloadCard();
      event.preventDefault();
      this.health_card = element.getAttribute("href");
    }
    if(event.target.classList.contains('closevideo')) {
      var video = document.getElementsByTagName('video')[0];
      video.pause();
    }
    if(event.target.className == 'closevideo') {
      var video = document.getElementsByTagName('video')[0];
      video.pause();
    }
    if(event.target.className == 'drugsmart') {
      event.preventDefault();
      window.open ("https://drugsmart-pharmacy.myshopify.com/account/register",
                                    "Register Direct2U pharma","menubar=1,toolbar=yes,resizable=0,width=800,height=465,left=220,top=170");
    }
    if(event.target.className == 'bedrugsmart') {
      event.preventDefault();
      window.open ("https://bedrugsmart.ca/pages/direct2u",
                                    "Direct2U pharma","menubar=1,toolbar=yes,resizable=0,width=800,height=465,left=220,top=170");
    }
    if(event.target.classList.contains('site')) {
      console.log('attribute',attribute)
      console.log(typeof attribute)
      console.log(attribute == 'unsafe: https://www.myfriendlylawyer.com/subscriptions')
      console.log(attribute == 'https://www.myfriendlylawyer.com/subscriptions')
      if(attribute == 'unsafe: https://www.myfriendlylawyer.com/subscriptions') {
        attribute = 'https://www.myfriendlylawyer.com/subscriptions';
      }
      console.log('afterattribute',attribute)
      // this.iframeLink = this.sanitizer.bypassSecurityTrustResourceUrl(attribute)
      this.iframeTitle = heading;
      // console.log(this.iframeLink.changingThisBreaksApplicationSecurity)
      // if(this.iframeLink.changingThisBreaksApplicationSecurity != 'https://secure.kiihealth.ca/register?eac=BNFZ1222&locale=en' && this.iframeLink.changingThisBreaksApplicationSecurity != 'https://groupbenefitz.lifespeak.com' && this.iframeLink.changingThisBreaksApplicationSecurity != 'http://my.norton.com/') {
      //   console.log(this.iframeLink.changingThisBreaksApplicationSecurity != 'https://secure.kiihealth.ca/register?eac=BNFZ1222&locale=en')
      //   this.openiframePopup();
      // }
      // if(this.iframeLink.changingThisBreaksApplicationSecurity == 'https://secure.kiihealth.ca/register?eac=BNFZ1222&locale=en') {
      //   window.open ("https://secure.kiihealth.ca/register?eac=BNFZ1222&locale=en","CloudMDKii","menubar=1,toolbar=yes,resizable=0,width=800,height=465,left=220,top=170");
      // }
      // if(this.iframeLink.changingThisBreaksApplicationSecurity == 'https://groupbenefitz.lifespeak.com') {
      //   window.open ("https://groupbenefitz.lifespeak.com","LifeSpeak","menubar=1,toolbar=yes,resizable=0,width=800,height=465,left=220,top=170");
      // }
      // if(this.iframeLink.changingThisBreaksApplicationSecurity == 'http://my.norton.com/') {
      //   window.open ("http://my.norton.com/","Norton","menubar=1,toolbar=yes,resizable=0,width=800,height=465,left=220,top=170");
      // }
      event.preventDefault();
    }
    // alert(attribute);

// alert(heading);
// document.getElementsByClassName("vid-title")[0].innerText=heading;
// document.getElementsByTagName("source")[0].src=attribute;



// var video = document.getElementsByTagName('video')[0];



// video.load();
// video.play();
    });

    this.fusbillinfocaptchavalue = '6LfVtGwUAAAAALHn9Ycaig9801f6lrPmouzuKF11';
    // this.fusbillinfocaptchavalue = '6Lfj88QgAAAAAAJ8bY1NW0Bgmm9V8PV2onC4RCNx';
    this.url=window.origin+"/";
    this.paymentUri = this.url+"manageMembers/employee/5334/details";;

    this.paymentsuccessuri = this.url+"manageMembers/employee/5334/details";



    this.customerid = sessionStorage.getItem("customerId");


    this.phoneform = this.formBuilder.group({
      primaryPhone: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      secondaryPhone: ['', [Validators.minLength(14), Validators.maxLength(14)]],
    });

    this.uploadService=this.formBuilder.group({
      uploadhealthCard:[null,Validators.compose([Validators.required])],
      uploadhealthCardProvider:[null],
      uploadhealthCardFile:['',Validators.required]
    })



    this.addressform = this.formBuilder.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      line1: ['', [Validators.required]],
      line2: [''],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      province: ['', [Validators.required]],
      postalCode: ['', [Validators.required, postalcodeValidator]],
      primaryPhone: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      secondaryPhone: ['', [Validators.minLength(16), Validators.maxLength(16)]],
    });

    this.spouseform = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dob: ['', [Validators.required]],
      email: ['', [Validators.pattern('^(?!\\s)[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
                              // pattern('^(?!\\s)[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
      coveredByAnotherPlan: ['', [Validators.required]],
      healthPlan: ['', [Validators.required]],
      insurer: ['', [Validators.required]],
      martialStatus: ['', [Validators.required]],
      effectiveDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });

    this.dependentform = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      age: [''],
      phoneNum: [''],
      coveredByAnotherPlan: ['', [Validators.required]],
      graduationDate: [''],
      carrierName: ['', [Validators.required]],
      specialNeeds: [''],
      postSecondaryStudent: [''],
      // martialStatus: ['', [Validators.required]],
      effectiveDate: ['', [Validators.required]],
    });

    this.paymentform = this.formBuilder.group({
      cutomerId: [""],
      // Id: [""],
      PublicApiKey: [""],
      SuccessUri: [""],
      FailUri: [""],
      FirstName: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      CardNumber: ["", [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      ExpirationMonth: ["", Validators.required],
      ExpirationYear: ["", Validators.required],
      Cvv: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(4)])],
      recaptchaReactive: ["", Validators.required],
    })

    this.ccform = this.formBuilder.group({
      cutomerId: [""],
      Id: [""],
      PublicApiKey: [""],
      SuccessUri: [""],
      FailUri: [""],
      FirstName: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      email: [""],
      CardNumber: ["", [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      ExpirationMonth: ["", Validators.required],
      ExpirationYear: ["", Validators.required],
      Cvv: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(4)])],
      nameonthecard: [""],
      aptcheck: [""],
      streetaddress: [""],
      streetaddressline2: [""],
      city:  [""],
      countryId: [""],
      stateId:  [""],
      postalcode:  [""],
      recaptchaReactive: ["", Validators.required],
      });

    this.padform = this.formBuilder.group({
      bankcode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      transitNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      accountNo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      bankdetails: [''],
      file: [''],
    })

    this.paymentMethodForm = this.formBuilder.group({
      bankCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      branchCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      accountNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      files: [''],
      paymentmethod: [''],
    })

    this.valisignform = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
    })

    this.route.queryParams.subscribe((params) => {
      if (params["success"]) {
        if (params["success"] == "False")
         {

          setTimeout(() => {
          }, 10);
          Swal.fire({allowOutsideClick: false,
            title:"An error occurred while processing the transaction. possible failure reasons are",
            text: "The payment information could not be verified",
            icon: "warning",
            width: "50%",
            showCancelButton: false,
            confirmButtonText: "Ok",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.value) {
              this.router.navigate(["home"]);
            } else {
            }
          });
        }
        else {
            let Endpoint = '/'+this.customerid+'/paymentType/CREDIT_CARD/change';
            this.http.post(environment.apiUrl+'/api/ap'+Endpoint, {"paymentId":parseInt(params["paymentMethodId"])},{
              headers:{
                Authorization: 'Bearer ' + this.accessToken,
            }}).subscribe((response:any)=>{
              if(response.status==200) {
                this.getCustomerData();
                Swal.fire({allowOutsideClick: false,title: 'Info', text:response.message})
              }
              else {
                Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
              }
            },(error) => {
              Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
            });


        }
      }
    });
  }

  showplans(){
    $("#planDetails").show()  }


  pauseVideo(videoplayer: any)

{

  videoplayer.nativeElement.play();

  // this.startedPlay = true;

  // if(this.startedPlay == true)

  // {

     setTimeout(() =>

     {

      videoplayer.nativeElement.pause();

       if(videoplayer.nativeElement.paused)

      {

        this.show = !this.show;

      }

     }, 5000);

  // }

}

viewPlansLoading(e:any){
  this.showViewPlansLoading=false;
}
showLoaderfith(e:any){
  this.showFifh=false;
}
padLoader(e:any){
  this.showPadLoader=false;
}
LoadrForDownloadBookLets($event){
this.showLoadrForDownloadBookLets=false
}

  // ngAfterViewInit() {
  //   // no errors
  //   let elems = document.querySelectorAll('.carousel');
  //   let instances = M.Carousel.init(elems, this.options);
  // }

  get phoneForm() {
    return this.phoneform.controls;
  }

  pipeFunction = (
    a: KeyValue<string, [string]>,
    b: KeyValue<string, [string]>
  ): number => {
    return 0;
  };

  get addressForm() {
    return this.addressform.controls;
  }

  get spouseForm() {
    return this.spouseform.controls;
  }

  get dependentForm() {
    return this.dependentform.controls;
  }

  get paymentMethodControls() {
    return this.paymentMethodForm.controls;
  }

  get valisignControls() {
    return this.valisignform.controls;
  }

  get paymentForm() {
    return this.paymentform.controls;
  }

  get ccForm() {
    return this.ccform.controls;
  }

  get padForm() {
    return this.padform.controls;
  }

  getFormConfiguration(lang: any) {
    // let lang: any = 'en';
    // if(this.route.snapshot.queryParamMap.get('lang') != null) {
    //  lang = this.route.snapshot.queryParamMap.get('lang');
    // }


    let accessToken = sessionStorage.getItem('accessToken');
    let customerDataEndpoint = '/customer/formConfig';
    this.http.get(environment.apiUrl+'/api/ap'+customerDataEndpoint, {
      headers:{
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
        'Lang': lang,
    }}).subscribe((response:any)=>{

      if(response.status==200) {
        this.formConfiguration = response.data;
        this.provianceList=this.formConfiguration.states.filter((list)=>{
          if(list.countryId==1)
          return list
        });

        this.logo = this.formConfiguration.customerTiles;
        let tokens = this.formConfiguration.language_details.languageTokens;
        // this.servicesDetails = response.data.healthcard_services_with_providers
        let array=[]
        // array.push(Object.keys(this.servicesDetails))
        console.log(array)
        this.serviceDetailsarray = array
        for(let token of tokens) {
          this.lang[token.key] = token.value;
        }
        this.configprovinceres = response.data.states.sort(
          (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
        );
      }
      else {
        Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
  }

  getCustomerData() {
    let customerDataEndpoint = '/customer/'+this.customerid+'/details';
    this.http.get(environment.apiUrl+'/api/ap/admin'+customerDataEndpoint, {
      headers:{
        Authorization: 'Bearer ' + this.accessToken,
        'Content-Type': 'application/json',
    }}).subscribe((response:any)=>{
      if(response.status==200) {
        this.customerData = response.data;
        this.gender = this.customerData.gender;
        this.userName=this.customerData.username;
        this.SharedService.setUserName(this.customerData.username)
        sessionStorage.setItem('memberUserName',this.userName);
        this.bookletList=this.customerData.customerPlanBooklets;
        // this.headerComponent.headerDetails('member');
        this.customerPlans =response.data.customerPlans;

        if(response.data.secondaryPhone==null){
          this.customerData.secondaryPhone =""
           }
        if(this.customerData.gender == 'Male') {
          this.gender = 'Male'
        }
        else if(this.customerData.gender == 'Female') {
          this.gender = 'Female'
        }
        else if(this.customerData.gender == 'Non-Binary') {
          this.gender = 'Non-Binary'
        }
        else if(this.customerData.gender == 'Undisclosed') {
          this.gender = 'Undisclosed'
        }
        this.fuseBillKey = this.customerData.fuseBillKey;
        this.stateId = this.customerData.stateFusebillId;
        this.countryId = this.customerData.countryFusebillId;
        this.paymentMethod = this.customerData.paymentMethod;
        this.paymentMethodId = this.customerData.paymentMethodId;
        this.memberportalgreensShildCheck = response.data.customerType.greenShildCustomer;
        this.memberportalEquitabelCheck = response.data.customerType.equitableCustomer
        this.ccDetails = response.data.ccDetails[0];
         this.PADdetails=response.data.customerACHdetails.data;

        if(this.ccDetails){
          this.creditCardNo = this.ccDetails.maskedCardNumber;
          this.fullName = this.ccDetails.firstName + ' ' + this.ccDetails.lastName;
          this.expire = this.ccDetails.expirationMonth +'/'+ this.ccDetails.expirationYear;
        }
        if(this.paymentMethod=='ACH'){
          this.bankCode=this.PADdetails?this.PADdetails.bankCode:'NA';
          this.transitNumber=this.PADdetails?this.PADdetails.transitNumber:'NA';
          this.accountNumber=this.PADdetails?this.PADdetails.accountNumber:"NA";
          this.bankinfo=true;
          this.existVoid=true;
          this.imagedisplay=this.PADdetails?this.PADdetails.voidCheckImage:"";
          this.voidCheckFileType=this.PADdetails?this.PADdetails.voidCheckFileType:"";
          this.padAgreement=this.PADdetails?this.PADdetails.padAgreement:"";
          this.voidCheckImage=this.PADdetails?this.PADdetails.voidCheckImage:"";
          if((this.bankCode!='NA'&&this.transitNumber!='NA'&&this.accountNumber!='NA')||(this.bankCode!=''&&this.transitNumber!=''&&this.accountNumber!=''))
          this.getBankDetails();
        }

        this.bookletList =response.data.customerPlanBooklets
        if(response.data.advisor.type=="CORPOARTE"){
          this.advisor = response.data.advisor.parent;
        }else{
          this.advisor = response.data.advisor;
        }

        sessionStorage.setItem("GreenShild",this.memberportalgreensShildCheck)
        sessionStorage.setItem("Equitable",this.memberportalEquitabelCheck)


        // alert(typeof this.paymentMethodId)
        // this.childrenInfo.push(this.spouseInfo)
        this.childrenInfo = this.customerData.dependents.childrens;
        setTimeout(() => {
          this.getcoverflow()
        }, 1000);
        for(let children of this.childrenInfo) {
          children['relationType'] = 'child';
        }
        this.spouseInfo = this.customerData.dependents.spouseInfo;
        // this.spouseInfo = {};
        if(Object.keys(this.spouseInfo).length!=0) {
          this.spouseInfo['relationType'] = 'spouse';
          this.childrenInfo.splice(0,0,this.spouseInfo)
          // this.childrenInfo.push(this.spouseInfo)
          // if(this.spouseInfo.healthPlan) {
          //   this.spouseInfo.healthPlan = this.spouseInfo.healthPlan;
          // }
          // else {
          //   this.spouseInfo.healthPlan = 'No Coverage'
          // }
        }
        else {
          this.editSpouse = false;
          this.editChild = true;
        }
        // this.hicList = this.customerData.healthCards;
        this.hicList =this.customerData.HealthCards_New.data.apiFiles;
        // this.roeUrl = this.customerData.ROE==''?this.customerData.ROE_New:this.customerData.ROE;
        this.roeUrl = this.customerData.ROE_New.data.roe
        if(this.roeUrl == ''){
          this.viewRoe = false;
        }
        if(this.paymentMethod==='ACH') {
          this.getPADdetails();
        }
        else if(this.paymentMethod==='CREDIT_CARD') {
          this.getCreditcard();
        }
        if(this.roeUrl!="") {
          this.roe = this.roeUrl
        }

        this.fusebillId = parseInt(this.customerData.fusebillId)?parseInt(this.customerData.fusebillId):'-';
        // this.fusebillId
        this.fubsillstatus = this.customerData.status
        this.customerID = this.fusebillId;
        // sessionStorage.setItem('fuseBillId',this.customerData.fusebillId);
        this.spouseId = this.spouseInfo.id;
        this.secondaryPhone = this.customerData.secondaryPhone==null? "":this.customerData.secondaryPhone;
        if(JSON.stringify(this.spouseInfo)!=='{}') {
          this.spouseInfo.firstName = this.titleCase.transform(this.spouseInfo.firstName)
          this.spouseInfo.lastName = this.titleCase.transform(this.spouseInfo.lastName)
          this.spouseInfo.dob = this.datePipe.transform(this.spouseInfo.dob,'MM-dd-yyyy')
          this.spouse = 1;
        }
        else {
          this.spouse = 0;
        }
        let children = this.customerData.dependents.childrens.length;
        for(let i=0;i<children;i++) {
          this.customerData.dependents.childrens[i].firstName = this.titleCase.transform(this.customerData.dependents.childrens[i].firstName)
          this.customerData.dependents.childrens[i].lastName = this.titleCase.transform(this.customerData.dependents.childrens[i].lastName)
        }
        this.customerData.primaryPhone = this.customerData.primaryPhone
        this.customerData.secondaryPhone = this.customerData.secondaryPhone==null? '':this.customerData.secondaryPhone;
        // this.customerData.primaryPhone = this.phoneNoFormat.transform(this.customerData.primaryPhone)
        // this.customerData.secondaryPhone = this.phoneNoFormat.transform(this.customerData.secondaryPhone)
        this.customerData.line1 = this.titleCase.transform(this.customerData.line1)
        this.customerData.line2 = this.titleCase.transform(this.customerData.line2)
        this.customerData.city = this.titleCase.transform(this.customerData.city)
        for(let i=0;i<this.childrenInfo.length;i++) {
          this.childrenInfo[i].dob = this.datePipe.transform(this.childrenInfo[i].dob,'MM-dd-yyyy')
          this.childrenInfo[i].graduationDate = this.datePipe.transform(this.childrenInfo[i].graduationDate,'MM-dd-yyyy')
          // if(this.childrenInfo[i].carrierName) {
          //   this.childrenInfo[i].carrierName = this.childrenInfo[i].carrierName
          // }
          // else {
          //   this.childrenInfo[i].carrierName = 'Na';
          // }
          // if(this.childrenInfo[i].graduationDate) {
          //   this.childrenInfo[i].graduationDate = this.childrenInfo[i].graduationDate
          // }
          // else {
          //   this.childrenInfo[i].graduationDate = 'Na';
          // }
        }
        // if(this.spouseInfo.insurer) {
        //   this.spouseInsurer = this.spouseInfo.insurer
        // }
        // else {
        //   this.spouseInsurer = 'Na';
        // }
        // if(this.spouseInfo.email) {
        //   this.spouseInfo.email = this.spouseInfo.email
        // }
        // else {
        //   this.spouseInfo.email = 'Na';
        // }
        this.cardNumber = this.childrenInfo.length + this.spouse;

      }
      else {
        Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
  }

  getplansData(){


          this.specialpackages= [
              {
                  "description": "Health & Dental Insurance",
                  "id": 1,
                  "logo": null,
                  "name": "Health & Dental",
                  "published": true,
                  "ordering": 1,
                  "allowMultiple": false,
                  "applyFilters": true,
                  "optIn": false,
                  "groups": [
                      {
                          "id": 3,
                          "parentId": 1,
                          "name": "Classic Bronze",
                          "description": null,
                          "published": {
                              "type": "Buffer",
                              "data": [
                                  1
                              ]
                          },
                          "ordering": 4,
                          "level": 2,
                          "backgroundColor": "#8B6C4C",
                          "textColor": "#FFFFFF",
                          "tooltipTitle": "plan_coverage",
                          "disallowedPlanLevels": null,
                          "requirePlanLevel": null,
                          "childMaxAge": 21,
                          "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"plan_coverage\", \"background_color\": \"#8B6C4C\"}",
                          "planLevelFeatures": [
                              {
                                  "id": 2,
                                  "planLevelId": 3,
                                  "planFeatureId": 1,
                                  "description": "80% coverage up to $5,000\r\nper family member per year\r\n90% at PocketPills Pharmacy",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 1,
                                  "feature": {
                                      "id": 1,
                                      "name": "Prescription Drugs",
                                      "category": "Health & Wellness",
                                      "description": "(Pay Direct Drug Card)",
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 10,
                                  "planLevelId": 3,
                                  "planFeatureId": 4,
                                  "description": "50% coverage up to\r\n7 days per stay",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 4,
                                  "feature": {
                                      "id": 4,
                                      "name": "Semi-Private Hospital Room",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 14,
                                  "planLevelId": 3,
                                  "planFeatureId": 5,
                                  "description": "Included up to plan maximums and coinsurance as outlined in the plan booklet\r\nand/or reasonable & customary limits as per the insurer",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 5,
                                  "feature": {
                                      "id": 5,
                                      "name": "Medical Supplies & Equipment",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 18,
                                  "planLevelId": 3,
                                  "planFeatureId": 6,
                                  "description": "100% up to $5,000,000\r\n(Emergency Medical Services for unforeseen accidents and illnesses)",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 6,
                                  "feature": {
                                      "id": 6,
                                      "name": "Travel\r\n60 Day Out-of-Province/Country Coverage",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 21,
                                  "planLevelId": 3,
                                  "planFeatureId": 7,
                                  "description": "80% coverage up to $1,000\r\nper family member per year",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 7,
                                  "feature": {
                                      "id": 7,
                                      "name": "Basic Services",
                                      "category": "Dental",
                                      "description": "(checkups, x-rays, fillings, oral surgery,\r\nendodontics/periodontics, 8 units of scaling)",
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 26,
                                  "planLevelId": 3,
                                  "planFeatureId": 10,
                                  "description": "Every 9 months",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 10,
                                  "feature": {
                                      "id": 10,
                                      "name": "Frequency of Check-Ups",
                                      "category": "Dental",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              }
                          ],
                          "plans": [
                              {
                                  "activationDate": null,
                                  "advisorCommissionAmount": null,
                                  "advisorCommissionRate": null,
                                  "code": "classicbronze",
                                  "commissionHouseAmount": null,
                                  "commissionHouseRate": null,
                                  "corporatePlan": false,
                                  "cost": null,
                                  "description": "Health & Dental Insurance",
                                  "equitableInsurerTaxAmount": null,
                                  "equitableInsurerTaxRate": null,
                                  "equitableInsurerTotalAmount": null,
                                  "frqMonthly": "104574",
                                  "frqYearly": null,
                                  "fusebillId": "48082",
                                  "id": 623,
                                  "insuranceCompanyId": null,
                                  "isMonthlyCost": null,
                                  "jsonData": null,
                                  "logo": null,
                                  "maxAge": null,
                                  "minAge": null,
                                  "name": "Classic Bronze",
                                  "ordering": null,
                                  "packageId": 1,
                                  "planCost": null,
                                  "planCoverage": "HEALTH_PLAN",
                                  "planLevel": 3,
                                  "published": {
                                      "type": "Buffer",
                                      "data": [
                                          1
                                      ]
                                  },
                                  "singleSku": true,
                                  "isBundle": true,
                                  "isMandatory": true,
                                  "isTaxPlan": false,
                                  "showBundledProducts": false,
                                  "customBundleName": null,
                                  "restrictedAccess": null,
                                  "plan_level": 3,
                                  "package_id": 1,
                                  "planLevels": {
                                      "id": 3,
                                      "parentId": 1,
                                      "name": "Classic Bronze",
                                      "description": null,
                                      "published": {
                                          "type": "Buffer",
                                          "data": [
                                              1
                                          ]
                                      },
                                      "ordering": 4,
                                      "level": 2,
                                      "backgroundColor": "#8B6C4C",
                                      "textColor": "#FFFFFF",
                                      "tooltipTitle": "plan_coverage",
                                      "disallowedPlanLevels": null,
                                      "requirePlanLevel": null,
                                      "childMaxAge": 21,
                                      "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"plan_coverage\", \"background_color\": \"#8B6C4C\"}"
                                  },
                                  "productAddons": [
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 516,
                                          "mandatory": false,
                                          "name": "Single Gig",
                                          "displayName": null,
                                          "description": null,
                                          "published": true,
                                          "ordering": 1,
                                          "planCoverage": "SINGLE",
                                          "planId": 623,
                                          "planProductId": "183176",
                                          "price": 153.12,
                                          "productId": 34,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                          "productType": "GIG",
                                          "planLevel": null,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 15.31, \"commission_house_amount_based_upon_premium_price\": 7.66}",
                                          "restrictedAccess": null,
                                          "product_id": 34,
                                          "plan_id": 623,
                                          "plan_level": null,
                                          "product": {
                                              "backgroundColor": null,
                                              "code": "singlegig",
                                              "color": null,
                                              "fusebillId": "127484",
                                              "glCode": "73210",
                                              "id": 34,
                                              "name": "Single Gig",
                                              "price": 249.97,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}"
                                          },
                                          "tax": null
                                      }
                                  ],
                                  "productAddonss": {
                                      "Classic Bronze": [
                                          {
                                              "activationDate": "2023-11-01T00:00:00.000Z",
                                              "businessTaxNumber": null,
                                              "id": 516,
                                              "mandatory": false,
                                              "name": "Classic Bronze",
                                              "displayName": null,
                                              "ordering": 1,
                                              "planCoverage": "SINGLE",
                                              "planCoverageUI": "Single",
                                              "planId": 623,
                                              "planProductId": "183176",
                                              "price": 153.12,
                                              "productId": 34,
                                              "stateId": 12,
                                              "taxCode": null,
                                              "taxDescription": null,
                                              "taxName": null,
                                              "taxSku": null,
                                              "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                              "product_id": 34,
                                              "plan_id": 623,
                                              "product": {
                                                  "backgroundColor": null,
                                                  "code": "singlegig",
                                                  "color": null,
                                                  "fusebillId": "127484",
                                                  "glCode": "73210",
                                                  "id": 34,
                                                  "name": "Single Gig",
                                                  "price": 249.97,
                                                  "published": true,
                                                  "logo": null,
                                                  "display": "TITLE",
                                                  "data": "{}"
                                              },
                                              "tax": null,
                                              "taxesDataJSON": [
                                                  {
                                                      "tax_name": "PST ON HEALTH INSURANCE",
                                                      "tax_code": null,
                                                      "plan_id": 609,
                                                      "plan_product_id": 178464,
                                                      "tax_description": "PST on Health Insurance (#709505879TR0001)",
                                                      "business_tax_number": "709505879TR0001",
                                                      "tax_rate": 0.08,
                                                      "tax_sku": "pstonhealthinsurance"
                                                  }
                                              ],
                                              "calculatedTax": {
                                                  "price": 153.12,
                                                  "tax": 12.249600000000001,
                                                  "total": 165.3696,
                                                  "planProductIds": [
                                                      178464
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "PST ON HEALTH INSURANCE",
                                                          "description": "PST on Health Insurance (#709505879TR0001)",
                                                          "price": 12.249600000000001,
                                                          "planProductUniqueId": 178464,
                                                          "isIncluded": true,
                                                          "taxRate": 0.08,
                                                          "taxRatePercentage": "8%"
                                                      }
                                                  ]
                                              },
                                              "price1": "153.12",
                                              "bundledProducts": [
                                                  "Single Gig"
                                              ],
                                              "planlevel": 3,
                                              "description": " Single Gig"
                                          }
                                      ]
                                  },
                                  "productAddonssCSS": {
                                      "Classic Bronze": {
                                          "backgroundColor": null,
                                          "code": "singlegig",
                                          "color": null,
                                          "fusebillId": "127484",
                                          "glCode": "73210",
                                          "id": 34,
                                          "name": "Single Gig",
                                          "price": 249.97,
                                          "published": true,
                                          "logo": null,
                                          "display": "TITLE",
                                          "data": "{}"
                                      }
                                  }
                              }
                          ]
                      },
                      {
                          "id": 4,
                          "parentId": 1,
                          "name": "Classic Silver",
                          "description": null,
                          "published": {
                              "type": "Buffer",
                              "data": [
                                  1
                              ]
                          },
                          "ordering": 5,
                          "level": 2,
                          "backgroundColor": "#A5A6A9",
                          "textColor": "#FFFFFF",
                          "tooltipTitle": "plan_coverage",
                          "disallowedPlanLevels": null,
                          "requirePlanLevel": null,
                          "childMaxAge": 21,
                          "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"plan_coverage\", \"background_color\": \"#A5A6A9\"}",
                          "planLevelFeatures": [
                              {
                                  "id": 3,
                                  "planLevelId": 4,
                                  "planFeatureId": 1,
                                  "description": "90% coverage up to $5,000\r\nper family member per year\r\n100% at PocketPills Pharmacy",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 1,
                                  "feature": {
                                      "id": 1,
                                      "name": "Prescription Drugs",
                                      "category": "Health & Wellness",
                                      "description": "(Pay Direct Drug Card)",
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 5,
                                  "planLevelId": 4,
                                  "planFeatureId": 2,
                                  "description": "80% coverage up to $300 per\r practitioner category,\r per family member per year\r. Reasonable limits as per the insurer apply",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 2,
                                  "feature": {
                                      "id": 2,
                                      "name": "Professional Services",
                                      "category": "Health & Wellness",
                                      "description": "Chiropractor, Chiropodist or Podiatrist,\r\nRegistered Massage Therapist, Naturopath,\r\nOsteopath, Physiotherapist, Psychologist,\r\nSpeech Therapist, Acupuncturist",
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 7,
                                  "planLevelId": 4,
                                  "planFeatureId": 3,
                                  "description": "100% coverage up to $200 every 24 months,\r\nper family member per year",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 3,
                                  "feature": {
                                      "id": 3,
                                      "name": "Vision",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 11,
                                  "planLevelId": 4,
                                  "planFeatureId": 4,
                                  "description": "100% coverage up to\r\n14 days per stay",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 4,
                                  "feature": {
                                      "id": 4,
                                      "name": "Semi-Private Hospital Room",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 15,
                                  "planLevelId": 4,
                                  "planFeatureId": 5,
                                  "description": "Included up to plan maximums and coinsurance as outlined in the plan booklet\r\nand/or reasonable & customary limits as per the insurer",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 5,
                                  "feature": {
                                      "id": 5,
                                      "name": "Medical Supplies & Equipment",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 19,
                                  "planLevelId": 4,
                                  "planFeatureId": 6,
                                  "description": "100% up to $5,000,000\r\n(Emergency Medical Services for unforeseen accidents and illnesses)",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 6,
                                  "feature": {
                                      "id": 6,
                                      "name": "Travel\r\n60 Day Out-of-Province/Country Coverage",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 22,
                                  "planLevelId": 4,
                                  "planFeatureId": 7,
                                  "description": "90% coverage up to $1,500\r\nper family member per year",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 7,
                                  "feature": {
                                      "id": 7,
                                      "name": "Basic Services",
                                      "category": "Dental",
                                      "description": "(checkups, x-rays, fillings, oral surgery,\r\nendodontics/periodontics, 8 units of scaling)",
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 27,
                                  "planLevelId": 4,
                                  "planFeatureId": 10,
                                  "description": "Every 6 months",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 10,
                                  "feature": {
                                      "id": 10,
                                      "name": "Frequency of Check-Ups",
                                      "category": "Dental",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              }
                          ],
                          "plans": [
                              {
                                  "activationDate": null,
                                  "advisorCommissionAmount": null,
                                  "advisorCommissionRate": null,
                                  "code": "classicsilver",
                                  "commissionHouseAmount": null,
                                  "commissionHouseRate": null,
                                  "corporatePlan": false,
                                  "cost": null,
                                  "description": "Health & Dental Insurance",
                                  "equitableInsurerTaxAmount": null,
                                  "equitableInsurerTaxRate": null,
                                  "equitableInsurerTotalAmount": null,
                                  "frqMonthly": "104575",
                                  "frqYearly": null,
                                  "fusebillId": "48083",
                                  "id": 624,
                                  "insuranceCompanyId": null,
                                  "isMonthlyCost": null,
                                  "jsonData": null,
                                  "logo": null,
                                  "maxAge": null,
                                  "minAge": null,
                                  "name": "Classic Silver",
                                  "ordering": null,
                                  "packageId": 1,
                                  "planCost": null,
                                  "planCoverage": "HEALTH_PLAN",
                                  "planLevel": 4,
                                  "published": {
                                      "type": "Buffer",
                                      "data": [
                                          1
                                      ]
                                  },
                                  "singleSku": true,
                                  "isBundle": true,
                                  "isMandatory": true,
                                  "isTaxPlan": false,
                                  "showBundledProducts": false,
                                  "customBundleName": null,
                                  "restrictedAccess": null,
                                  "plan_level": 4,
                                  "package_id": 1,
                                  "planLevels": {
                                      "id": 4,
                                      "parentId": 1,
                                      "name": "Classic Silver",
                                      "description": null,
                                      "published": {
                                          "type": "Buffer",
                                          "data": [
                                              1
                                          ]
                                      },
                                      "ordering": 5,
                                      "level": 2,
                                      "backgroundColor": "#A5A6A9",
                                      "textColor": "#FFFFFF",
                                      "tooltipTitle": "plan_coverage",
                                      "disallowedPlanLevels": null,
                                      "requirePlanLevel": null,
                                      "childMaxAge": 21,
                                      "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"plan_coverage\", \"background_color\": \"#A5A6A9\"}"
                                  },
                                  "productAddons": [
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 576,
                                          "mandatory": false,
                                          "name": "Single Gig",
                                          "displayName": null,
                                          "description": null,
                                          "published": true,
                                          "ordering": 1,
                                          "planCoverage": "SINGLE",
                                          "planId": 624,
                                          "planProductId": "183153",
                                          "price": 194.12,
                                          "productId": 34,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                          "productType": "GIG",
                                          "planLevel": null,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 19.41, \"commission_house_amount_based_upon_premium_price\": 9.71}",
                                          "restrictedAccess": null,
                                          "product_id": 34,
                                          "plan_id": 624,
                                          "plan_level": null,
                                          "product": {
                                              "backgroundColor": null,
                                              "code": "singlegig",
                                              "color": null,
                                              "fusebillId": "127484",
                                              "glCode": "73210",
                                              "id": 34,
                                              "name": "Single Gig",
                                              "price": 249.97,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}"
                                          },
                                          "tax": null
                                      }
                                  ],
                                  "productAddonss": {
                                      "Classic Silver": [
                                          {
                                              "activationDate": "2023-11-01T00:00:00.000Z",
                                              "businessTaxNumber": null,
                                              "id": 576,
                                              "mandatory": false,
                                              "name": "Classic Silver",
                                              "displayName": null,
                                              "ordering": 1,
                                              "planCoverage": "SINGLE",
                                              "planCoverageUI": "Single",
                                              "planId": 624,
                                              "planProductId": "183153",
                                              "price": 194.12,
                                              "productId": 34,
                                              "stateId": 12,
                                              "taxCode": null,
                                              "taxDescription": null,
                                              "taxName": null,
                                              "taxSku": null,
                                              "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                              "product_id": 34,
                                              "plan_id": 624,
                                              "product": {
                                                  "backgroundColor": null,
                                                  "code": "singlegig",
                                                  "color": null,
                                                  "fusebillId": "127484",
                                                  "glCode": "73210",
                                                  "id": 34,
                                                  "name": "Single Gig",
                                                  "price": 249.97,
                                                  "published": true,
                                                  "logo": null,
                                                  "display": "TITLE",
                                                  "data": "{}"
                                              },
                                              "tax": null,
                                              "taxesDataJSON": [
                                                  {
                                                      "tax_name": "PST ON HEALTH INSURANCE",
                                                      "tax_code": null,
                                                      "plan_id": 609,
                                                      "plan_product_id": 178464,
                                                      "tax_description": "PST on Health Insurance (#709505879TR0001)",
                                                      "business_tax_number": "709505879TR0001",
                                                      "tax_rate": 0.08,
                                                      "tax_sku": "pstonhealthinsurance"
                                                  }
                                              ],
                                              "calculatedTax": {
                                                  "price": 194.12,
                                                  "tax": 15.5296,
                                                  "total": 209.6496,
                                                  "planProductIds": [
                                                      178464
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "PST ON HEALTH INSURANCE",
                                                          "description": "PST on Health Insurance (#709505879TR0001)",
                                                          "price": 15.5296,
                                                          "planProductUniqueId": 178464,
                                                          "isIncluded": true,
                                                          "taxRate": 0.08,
                                                          "taxRatePercentage": "8%"
                                                      }
                                                  ]
                                              },
                                              "price1": "194.12",
                                              "bundledProducts": [
                                                  "Single Gig"
                                              ],
                                              "planlevel": 4,
                                              "description": " Single Gig"
                                          }
                                      ]
                                  },
                                  "productAddonssCSS": {
                                      "Classic Silver": {
                                          "backgroundColor": null,
                                          "code": "singlegig",
                                          "color": null,
                                          "fusebillId": "127484",
                                          "glCode": "73210",
                                          "id": 34,
                                          "name": "Single Gig",
                                          "price": 249.97,
                                          "published": true,
                                          "logo": null,
                                          "display": "TITLE",
                                          "data": "{}"
                                      }
                                  }
                              }
                          ]
                      },
                      {
                          "id": 7,
                          "parentId": 6,
                          "name": "All-In Bronze",
                          "description": null,
                          "published": {
                              "type": "Buffer",
                              "data": [
                                  1
                              ]
                          },
                          "ordering": 8,
                          "level": 2,
                          "backgroundColor": "#8B6C4C",
                          "textColor": "#FFFFFF",
                          "tooltipTitle": "plan_coverage",
                          "disallowedPlanLevels": "1,10,14,24",
                          "requirePlanLevel": null,
                          "childMaxAge": 21,
                          "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"plan_coverage\", \"background_color\": \"#8B6C4C\"}",
                          "planLevelFeatures": [
                              {
                                  "id": 29,
                                  "planLevelId": 7,
                                  "planFeatureId": 1,
                                  "description": "80% coverage up to $2,500\r\nper family member per year\r\n90% at PocketPills Pharmacy",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 1,
                                  "feature": {
                                      "id": 1,
                                      "name": "Prescription Drugs",
                                      "category": "Health & Wellness",
                                      "description": "(Pay Direct Drug Card)",
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 32,
                                  "planLevelId": 7,
                                  "planFeatureId": 11,
                                  "description": "Catastrophic drug coverage from $5,000 up to $1,000,000 per family member per year $50,000 of biologic drugs limited to lowest cost biosimilar.\r *24 month pre-existing condition clause applies",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 11,
                                  "feature": {
                                      "id": 11,
                                      "name": "GroupBenefitz High-Cost Drugs",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 35,
                                  "planLevelId": 7,
                                  "planFeatureId": 12,
                                  "description": "Ongoing mental health counselling, telemedicine, fitness and nutrition plans, legal advice, and much more!",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 12,
                                  "feature": {
                                      "id": 12,
                                      "name": "GroupBenefitz Complete Wellness",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 38,
                                  "planLevelId": 7,
                                  "planFeatureId": 2,
                                  "description": "80% coverage up to $300 per practitioner category, per family member per year, up to $900 per family combined. Reasonable limits as per the insurer apply.",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 2,
                                  "feature": {
                                      "id": 2,
                                      "name": "Professional Services",
                                      "category": "Health & Wellness",
                                      "description": "Chiropractor, Chiropodist or Podiatrist,\r\nRegistered Massage Therapist, Naturopath,\r\nOsteopath, Physiotherapist, Psychologist,\r\nSpeech Therapist, Acupuncturist",
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 43,
                                  "planLevelId": 7,
                                  "planFeatureId": 4,
                                  "description": "100% coverage up to\r\n7 days per stay",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 4,
                                  "feature": {
                                      "id": 4,
                                      "name": "Semi-Private Hospital Room",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 46,
                                  "planLevelId": 7,
                                  "planFeatureId": 5,
                                  "description": "Included up to plan maximums and coinsurance as outlined in the plan booklet\r\nand/or reasonable & customary limits as per the insurer",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 5,
                                  "feature": {
                                      "id": 5,
                                      "name": "Medical Supplies & Equipment",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 49,
                                  "planLevelId": 7,
                                  "planFeatureId": 14,
                                  "description": "$1,500 per family member per year for approved treatments",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 14,
                                  "feature": {
                                      "id": 14,
                                      "name": "Medical Cannabis",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 52,
                                  "planLevelId": 7,
                                  "planFeatureId": 15,
                                  "description": "100% up to $5,000,000\r\n(Emergency Medical Services for unforeseen accidents and illnesses)",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 15,
                                  "feature": {
                                      "id": 15,
                                      "name": "Travel\r\n90 Day Out-of-Province/Country Coverage",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 55,
                                  "planLevelId": 7,
                                  "planFeatureId": 7,
                                  "description": "80% coverage up to $750\r\nper family member per year",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 7,
                                  "feature": {
                                      "id": 7,
                                      "name": "Basic Services",
                                      "category": "Dental",
                                      "description": "(checkups, x-rays, fillings, oral surgery,\r\nendodontics/periodontics, 8 units of scaling)",
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 58,
                                  "planLevelId": 7,
                                  "planFeatureId": 10,
                                  "description": "Every 9 months",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 10,
                                  "feature": {
                                      "id": 10,
                                      "name": "Frequency of Check-Ups",
                                      "category": "Dental",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              }
                          ],
                          "plans": [
                              {
                                  "activationDate": null,
                                  "advisorCommissionAmount": null,
                                  "advisorCommissionRate": null,
                                  "code": "allinbronze",
                                  "commissionHouseAmount": null,
                                  "commissionHouseRate": null,
                                  "corporatePlan": false,
                                  "cost": null,
                                  "description": "Health & Dental Insurance",
                                  "equitableInsurerTaxAmount": null,
                                  "equitableInsurerTaxRate": null,
                                  "equitableInsurerTotalAmount": null,
                                  "frqMonthly": "104571",
                                  "frqYearly": null,
                                  "fusebillId": "48079",
                                  "id": 626,
                                  "insuranceCompanyId": null,
                                  "isMonthlyCost": null,
                                  "jsonData": null,
                                  "logo": null,
                                  "maxAge": null,
                                  "minAge": null,
                                  "name": "All-in Bronze",
                                  "ordering": null,
                                  "packageId": 1,
                                  "planCost": null,
                                  "planCoverage": "HEALTH_PLAN",
                                  "planLevel": 7,
                                  "published": {
                                      "type": "Buffer",
                                      "data": [
                                          1
                                      ]
                                  },
                                  "singleSku": true,
                                  "isBundle": true,
                                  "isMandatory": true,
                                  "isTaxPlan": false,
                                  "showBundledProducts": false,
                                  "customBundleName": null,
                                  "restrictedAccess": null,
                                  "plan_level": 7,
                                  "package_id": 1,
                                  "planLevels": {
                                      "id": 7,
                                      "parentId": 6,
                                      "name": "All-In Bronze",
                                      "description": null,
                                      "published": {
                                          "type": "Buffer",
                                          "data": [
                                              1
                                          ]
                                      },
                                      "ordering": 8,
                                      "level": 2,
                                      "backgroundColor": "#8B6C4C",
                                      "textColor": "#FFFFFF",
                                      "tooltipTitle": "plan_coverage",
                                      "disallowedPlanLevels": "1,10,14,24",
                                      "requirePlanLevel": null,
                                      "childMaxAge": 21,
                                      "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"plan_coverage\", \"background_color\": \"#8B6C4C\"}"
                                  },
                                  "productAddons": [
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 686,
                                          "mandatory": false,
                                          "name": "Equitable",
                                          "displayName": null,
                                          "description": null,
                                          "published": true,
                                          "ordering": 1,
                                          "planCoverage": "SINGLE",
                                          "planId": 626,
                                          "planProductId": "182926",
                                          "price": 140.06,
                                          "productId": 7,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                          "productType": "BOTH",
                                          "planLevel": null,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 17.51, \"commission_house_amount_based_upon_premium_price\": 8.75}",
                                          "restrictedAccess": null,
                                          "product_id": 7,
                                          "plan_id": 626,
                                          "plan_level": null,
                                          "product": {
                                              "backgroundColor": "#212A3E",
                                              "code": "single",
                                              "color": "#FFFFFF",
                                              "fusebillId": "126187",
                                              "glCode": "73210",
                                              "id": 7,
                                              "name": "Single",
                                              "price": 229.72,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}",
                                              "productFeatureCategories": [
                                                  {
                                                      "description": null,
                                                      "id": 11,
                                                      "name": "Health & Dental Insurance",
                                                      "ordering": 1,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Prescription Drugs",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                              "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                              "id": 1,
                                                              "ordering": 1,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Professional Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                              "content": "",
                                                              "id": 5,
                                                              "ordering": 2,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Vision",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 10,
                                                              "ordering": 3,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Medical Supplies & Equipment",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 11,
                                                              "ordering": 4,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Travel Insurance",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                              "content": null,
                                                              "id": 12,
                                                              "ordering": 5,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Basic Dental Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                              "content": null,
                                                              "id": 13,
                                                              "ordering": 6,
                                                              "category_id": 11
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": null,
                                                      "id": 12,
                                                      "name": "GroupBenefitz Complete Wellness ",
                                                      "ordering": 2,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 12,
                                                              "title": "CloudMD Kii",
                                                              "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                              "content": null,
                                                              "id": 14,
                                                              "ordering": 1,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "Phzio MSK360",
                                                              "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                              "content": null,
                                                              "id": 15,
                                                              "ordering": 2,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "My Friendly Lawyer",
                                                              "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                              "content": null,
                                                              "id": 16,
                                                              "ordering": 3,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LifeSpeak",
                                                              "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                              "content": null,
                                                              "id": 17,
                                                              "ordering": 4,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "RxFood",
                                                              "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                              "content": null,
                                                              "id": 18,
                                                              "ordering": 5,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LIFT Session",
                                                              "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                              "content": null,
                                                              "id": 19,
                                                              "ordering": 6,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "The Solid Ground Method",
                                                              "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                              "content": null,
                                                              "id": 20,
                                                              "ordering": 7,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "ALAViDA",
                                                              "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                              "content": null,
                                                              "id": 21,
                                                              "ordering": 8,
                                                              "category_id": 12
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                      "id": 1,
                                                      "name": "Critical Illness Insurance",
                                                      "ordering": 3,
                                                      "published": true
                                                  }
                                              ]
                                          },
                                          "tax": null
                                      },
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 687,
                                          "mandatory": false,
                                          "name": "High Cost Drugs",
                                          "displayName": null,
                                          "description": null,
                                          "published": true,
                                          "ordering": 2,
                                          "planCoverage": "SINGLE",
                                          "planId": 626,
                                          "planProductId": "182926",
                                          "price": 15,
                                          "productId": 7,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[]",
                                          "productType": "BOTH",
                                          "planLevel": null,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 17.51, \"commission_house_amount_based_upon_premium_price\": 8.75}",
                                          "restrictedAccess": null,
                                          "product_id": 7,
                                          "plan_id": 626,
                                          "plan_level": null,
                                          "product": {
                                              "backgroundColor": "#212A3E",
                                              "code": "single",
                                              "color": "#FFFFFF",
                                              "fusebillId": "126187",
                                              "glCode": "73210",
                                              "id": 7,
                                              "name": "Single",
                                              "price": 229.72,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}",
                                              "productFeatureCategories": [
                                                  {
                                                      "description": null,
                                                      "id": 11,
                                                      "name": "Health & Dental Insurance",
                                                      "ordering": 1,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Prescription Drugs",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                              "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                              "id": 1,
                                                              "ordering": 1,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Professional Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                              "content": "",
                                                              "id": 5,
                                                              "ordering": 2,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Vision",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 10,
                                                              "ordering": 3,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Medical Supplies & Equipment",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 11,
                                                              "ordering": 4,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Travel Insurance",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                              "content": null,
                                                              "id": 12,
                                                              "ordering": 5,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Basic Dental Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                              "content": null,
                                                              "id": 13,
                                                              "ordering": 6,
                                                              "category_id": 11
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": null,
                                                      "id": 12,
                                                      "name": "GroupBenefitz Complete Wellness ",
                                                      "ordering": 2,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 12,
                                                              "title": "CloudMD Kii",
                                                              "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                              "content": null,
                                                              "id": 14,
                                                              "ordering": 1,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "Phzio MSK360",
                                                              "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                              "content": null,
                                                              "id": 15,
                                                              "ordering": 2,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "My Friendly Lawyer",
                                                              "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                              "content": null,
                                                              "id": 16,
                                                              "ordering": 3,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LifeSpeak",
                                                              "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                              "content": null,
                                                              "id": 17,
                                                              "ordering": 4,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "RxFood",
                                                              "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                              "content": null,
                                                              "id": 18,
                                                              "ordering": 5,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LIFT Session",
                                                              "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                              "content": null,
                                                              "id": 19,
                                                              "ordering": 6,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "The Solid Ground Method",
                                                              "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                              "content": null,
                                                              "id": 20,
                                                              "ordering": 7,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "ALAViDA",
                                                              "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                              "content": null,
                                                              "id": 21,
                                                              "ordering": 8,
                                                              "category_id": 12
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                      "id": 1,
                                                      "name": "Critical Illness Insurance",
                                                      "ordering": 3,
                                                      "published": true
                                                  }
                                              ]
                                          },
                                          "tax": null
                                      },
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 688,
                                          "mandatory": false,
                                          "name": "Complete Wellness",
                                          "displayName": null,
                                          "description": null,
                                          "published": true,
                                          "ordering": 3,
                                          "planCoverage": "SINGLE",
                                          "planId": 626,
                                          "planProductId": "182926",
                                          "price": 20,
                                          "productId": 7,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[]",
                                          "productType": "BOTH",
                                          "planLevel": null,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 17.51, \"commission_house_amount_based_upon_premium_price\": 8.75}",
                                          "restrictedAccess": null,
                                          "product_id": 7,
                                          "plan_id": 626,
                                          "plan_level": null,
                                          "product": {
                                              "backgroundColor": "#212A3E",
                                              "code": "single",
                                              "color": "#FFFFFF",
                                              "fusebillId": "126187",
                                              "glCode": "73210",
                                              "id": 7,
                                              "name": "Single",
                                              "price": 229.72,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}",
                                              "productFeatureCategories": [
                                                  {
                                                      "description": null,
                                                      "id": 11,
                                                      "name": "Health & Dental Insurance",
                                                      "ordering": 1,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Prescription Drugs",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                              "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                              "id": 1,
                                                              "ordering": 1,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Professional Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                              "content": "",
                                                              "id": 5,
                                                              "ordering": 2,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Vision",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 10,
                                                              "ordering": 3,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Medical Supplies & Equipment",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 11,
                                                              "ordering": 4,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Travel Insurance",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                              "content": null,
                                                              "id": 12,
                                                              "ordering": 5,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Basic Dental Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                              "content": null,
                                                              "id": 13,
                                                              "ordering": 6,
                                                              "category_id": 11
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": null,
                                                      "id": 12,
                                                      "name": "GroupBenefitz Complete Wellness ",
                                                      "ordering": 2,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 12,
                                                              "title": "CloudMD Kii",
                                                              "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                              "content": null,
                                                              "id": 14,
                                                              "ordering": 1,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "Phzio MSK360",
                                                              "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                              "content": null,
                                                              "id": 15,
                                                              "ordering": 2,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "My Friendly Lawyer",
                                                              "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                              "content": null,
                                                              "id": 16,
                                                              "ordering": 3,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LifeSpeak",
                                                              "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                              "content": null,
                                                              "id": 17,
                                                              "ordering": 4,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "RxFood",
                                                              "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                              "content": null,
                                                              "id": 18,
                                                              "ordering": 5,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LIFT Session",
                                                              "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                              "content": null,
                                                              "id": 19,
                                                              "ordering": 6,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "The Solid Ground Method",
                                                              "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                              "content": null,
                                                              "id": 20,
                                                              "ordering": 7,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "ALAViDA",
                                                              "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                              "content": null,
                                                              "id": 21,
                                                              "ordering": 8,
                                                              "category_id": 12
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                      "id": 1,
                                                      "name": "Critical Illness Insurance",
                                                      "ordering": 3,
                                                      "published": true
                                                  }
                                              ]
                                          },
                                          "tax": null
                                      }
                                  ],
                                  "productAddonss": {
                                      "All-in Bronze": [
                                          {
                                              "activationDate": "2023-11-01T00:00:00.000Z",
                                              "businessTaxNumber": null,
                                              "id": 688,
                                              "mandatory": false,
                                              "name": "All-in Bronze",
                                              "displayName": null,
                                              "ordering": 3,
                                              "planCoverage": "SINGLE",
                                              "planCoverageUI": "Single",
                                              "planId": 626,
                                              "planProductId": "182926",
                                              "price": 175.06,
                                              "productId": 7,
                                              "stateId": 12,
                                              "taxCode": null,
                                              "taxDescription": null,
                                              "taxName": null,
                                              "taxSku": null,
                                              "taxesData": "[]",
                                              "product_id": 7,
                                              "plan_id": 626,
                                              "product": {
                                                  "backgroundColor": "#212A3E",
                                                  "code": "single",
                                                  "color": "#FFFFFF",
                                                  "fusebillId": "126187",
                                                  "glCode": "73210",
                                                  "id": 7,
                                                  "name": "Single",
                                                  "price": 229.72,
                                                  "published": true,
                                                  "logo": null,
                                                  "display": "TITLE",
                                                  "data": "{}",
                                                  "productFeatureCategories": [
                                                      {
                                                          "description": null,
                                                          "id": 11,
                                                          "name": "Health & Dental Insurance",
                                                          "ordering": 1,
                                                          "published": true,
                                                          "productFeatureItems": [
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Prescription Drugs",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                                  "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                                  "id": 1,
                                                                  "ordering": 1,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Professional Services",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                                  "content": "",
                                                                  "id": 5,
                                                                  "ordering": 2,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Vision",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                                  "content": null,
                                                                  "id": 10,
                                                                  "ordering": 3,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Medical Supplies & Equipment",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                                  "content": null,
                                                                  "id": 11,
                                                                  "ordering": 4,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Travel Insurance",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                                  "content": null,
                                                                  "id": 12,
                                                                  "ordering": 5,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Basic Dental Services",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                                  "content": null,
                                                                  "id": 13,
                                                                  "ordering": 6,
                                                                  "category_id": 11
                                                              }
                                                          ]
                                                      },
                                                      {
                                                          "description": null,
                                                          "id": 12,
                                                          "name": "GroupBenefitz Complete Wellness ",
                                                          "ordering": 2,
                                                          "published": true,
                                                          "productFeatureItems": [
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "CloudMD Kii",
                                                                  "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                                  "content": null,
                                                                  "id": 14,
                                                                  "ordering": 1,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "Phzio MSK360",
                                                                  "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                                  "content": null,
                                                                  "id": 15,
                                                                  "ordering": 2,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "My Friendly Lawyer",
                                                                  "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                                  "content": null,
                                                                  "id": 16,
                                                                  "ordering": 3,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "LifeSpeak",
                                                                  "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                                  "content": null,
                                                                  "id": 17,
                                                                  "ordering": 4,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "RxFood",
                                                                  "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                                  "content": null,
                                                                  "id": 18,
                                                                  "ordering": 5,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "LIFT Session",
                                                                  "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                                  "content": null,
                                                                  "id": 19,
                                                                  "ordering": 6,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "The Solid Ground Method",
                                                                  "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                                  "content": null,
                                                                  "id": 20,
                                                                  "ordering": 7,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "ALAViDA",
                                                                  "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                                  "content": null,
                                                                  "id": 21,
                                                                  "ordering": 8,
                                                                  "category_id": 12
                                                              }
                                                          ]
                                                      },
                                                      {
                                                          "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                          "id": 1,
                                                          "name": "Critical Illness Insurance",
                                                          "ordering": 3,
                                                          "published": true
                                                      }
                                                  ]
                                              },
                                              "tax": null,
                                              "taxesDataJSON": [],
                                              "calculatedTax": {
                                                  "price": 175.06,
                                                  "tax": 11.2048,
                                                  "total": 186.2648,
                                                  "planProductIds": [
                                                      178464
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "PST ON HEALTH INSURANCE",
                                                          "description": "PST on Health Insurance (#709505879TR0001)",
                                                          "price": 11.2048,
                                                          "planProductUniqueId": 178464,
                                                          "isIncluded": true,
                                                          "taxRate": 0.08,
                                                          "taxRatePercentage": "8%"
                                                      }
                                                  ]
                                              },
                                              "price1": "175.06",
                                              "bundledProducts": [
                                                  "Equitable",
                                                  "High Cost Drugs",
                                                  "Complete Wellness"
                                              ],
                                              "planlevel": 7,
                                              "description": " Equitable High Cost Drugs Complete Wellness"
                                          }
                                      ]
                                  },
                                  "productAddonssCSS": {
                                      "All-in Bronze": {
                                          "backgroundColor": "#212A3E",
                                          "code": "single",
                                          "color": "#FFFFFF",
                                          "fusebillId": "126187",
                                          "glCode": "73210",
                                          "id": 7,
                                          "name": "Single",
                                          "price": 229.72,
                                          "published": true,
                                          "logo": null,
                                          "display": "TITLE",
                                          "data": "{}",
                                          "productFeatureCategories": [
                                              {
                                                  "description": null,
                                                  "id": 11,
                                                  "name": "Health & Dental Insurance",
                                                  "ordering": 1,
                                                  "published": true,
                                                  "productFeatureItems": [
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Prescription Drugs",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                          "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                          "id": 1,
                                                          "ordering": 1,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Professional Services",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                          "content": "",
                                                          "id": 5,
                                                          "ordering": 2,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Vision",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                          "content": null,
                                                          "id": 10,
                                                          "ordering": 3,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Medical Supplies & Equipment",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                          "content": null,
                                                          "id": 11,
                                                          "ordering": 4,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Travel Insurance",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                          "content": null,
                                                          "id": 12,
                                                          "ordering": 5,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Basic Dental Services",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                          "content": null,
                                                          "id": 13,
                                                          "ordering": 6,
                                                          "category_id": 11
                                                      }
                                                  ]
                                              },
                                              {
                                                  "description": null,
                                                  "id": 12,
                                                  "name": "GroupBenefitz Complete Wellness ",
                                                  "ordering": 2,
                                                  "published": true,
                                                  "productFeatureItems": [
                                                      {
                                                          "categoryId": 12,
                                                          "title": "CloudMD Kii",
                                                          "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                          "content": null,
                                                          "id": 14,
                                                          "ordering": 1,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "Phzio MSK360",
                                                          "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                          "content": null,
                                                          "id": 15,
                                                          "ordering": 2,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "My Friendly Lawyer",
                                                          "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                          "content": null,
                                                          "id": 16,
                                                          "ordering": 3,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "LifeSpeak",
                                                          "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                          "content": null,
                                                          "id": 17,
                                                          "ordering": 4,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "RxFood",
                                                          "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                          "content": null,
                                                          "id": 18,
                                                          "ordering": 5,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "LIFT Session",
                                                          "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                          "content": null,
                                                          "id": 19,
                                                          "ordering": 6,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "The Solid Ground Method",
                                                          "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                          "content": null,
                                                          "id": 20,
                                                          "ordering": 7,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "ALAViDA",
                                                          "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                          "content": null,
                                                          "id": 21,
                                                          "ordering": 8,
                                                          "category_id": 12
                                                      }
                                                  ]
                                              },
                                              {
                                                  "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                  "id": 1,
                                                  "name": "Critical Illness Insurance",
                                                  "ordering": 3,
                                                  "published": true
                                              }
                                          ]
                                      }
                                  }
                              }
                          ]
                      },
                      {
                          "id": 8,
                          "parentId": 6,
                          "name": "All-In Silver",
                          "description": null,
                          "published": {
                              "type": "Buffer",
                              "data": [
                                  1
                              ]
                          },
                          "ordering": 9,
                          "level": 2,
                          "backgroundColor": "#A5A6A9",
                          "textColor": "#FFFFFF",
                          "tooltipTitle": "plan_coverage",
                          "disallowedPlanLevels": "1,10,14,24",
                          "requirePlanLevel": null,
                          "childMaxAge": 21,
                          "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"plan_coverage\", \"background_color\": \"#A5A6A9\"}",
                          "planLevelFeatures": [
                              {
                                  "id": 30,
                                  "planLevelId": 8,
                                  "planFeatureId": 1,
                                  "description": "80% coverage up to $5,000\r\nper family member per year\r\n90% at PocketPills Pharmacy",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 1,
                                  "feature": {
                                      "id": 1,
                                      "name": "Prescription Drugs",
                                      "category": "Health & Wellness",
                                      "description": "(Pay Direct Drug Card)",
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 33,
                                  "planLevelId": 8,
                                  "planFeatureId": 11,
                                  "description": "Catastrophic drug coverage from $5,000 up to $1,000,000 per family member per year $50,000 of biologic drugs limited to lowest cost biosimilar.\r *24 month pre-existing condition clause applies",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 11,
                                  "feature": {
                                      "id": 11,
                                      "name": "GroupBenefitz High-Cost Drugs",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 36,
                                  "planLevelId": 8,
                                  "planFeatureId": 12,
                                  "description": "Ongoing mental health counselling, telemedicine, fitness and nutrition plans, legal advice, and much more!",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 12,
                                  "feature": {
                                      "id": 12,
                                      "name": "GroupBenefitz Complete Wellness",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 39,
                                  "planLevelId": 8,
                                  "planFeatureId": 2,
                                  "description": "90% coverage up to $500 per practitioner category, per family member per year, up to $1,500 per family combined. Reasonable limits as per the insurer apply.",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 2,
                                  "feature": {
                                      "id": 2,
                                      "name": "Professional Services",
                                      "category": "Health & Wellness",
                                      "description": "Chiropractor, Chiropodist or Podiatrist,\r\nRegistered Massage Therapist, Naturopath,\r\nOsteopath, Physiotherapist, Psychologist,\r\nSpeech Therapist, Acupuncturist",
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 41,
                                  "planLevelId": 8,
                                  "planFeatureId": 3,
                                  "description": "100% coverage up to $200 every 24 months,\r\nper family member per year",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 3,
                                  "feature": {
                                      "id": 3,
                                      "name": "Vision",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 44,
                                  "planLevelId": 8,
                                  "planFeatureId": 4,
                                  "description": "100% coverage up to\r\n14 days per stay",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 4,
                                  "feature": {
                                      "id": 4,
                                      "name": "Semi-Private Hospital Room",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 47,
                                  "planLevelId": 8,
                                  "planFeatureId": 5,
                                  "description": "Included up to plan maximums and coinsurance as outlined in the plan booklet\r\nand/or reasonable & customary limits as per the insurer",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 5,
                                  "feature": {
                                      "id": 5,
                                      "name": "Medical Supplies & Equipment",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 50,
                                  "planLevelId": 8,
                                  "planFeatureId": 14,
                                  "description": "$1,500 per family member per year for approved treatments",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 14,
                                  "feature": {
                                      "id": 14,
                                      "name": "Medical Cannabis",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 53,
                                  "planLevelId": 8,
                                  "planFeatureId": 15,
                                  "description": "100% up to $5,000,000\r\n(Emergency Medical Services for unforeseen accidents and illnesses)",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 15,
                                  "feature": {
                                      "id": 15,
                                      "name": "Travel\r\n90 Day Out-of-Province/Country Coverage",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 56,
                                  "planLevelId": 8,
                                  "planFeatureId": 7,
                                  "description": "80% coverage up to $1,500\r\nper family member per year",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 7,
                                  "feature": {
                                      "id": 7,
                                      "name": "Basic Services",
                                      "category": "Dental",
                                      "description": "(checkups, x-rays, fillings, oral surgery,\r\nendodontics/periodontics, 8 units of scaling)",
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 59,
                                  "planLevelId": 8,
                                  "planFeatureId": 10,
                                  "description": "Every 6 months",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 10,
                                  "feature": {
                                      "id": 10,
                                      "name": "Frequency of Check-Ups",
                                      "category": "Dental",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              }
                          ],
                          "plans": [
                              {
                                  "activationDate": null,
                                  "advisorCommissionAmount": null,
                                  "advisorCommissionRate": null,
                                  "code": "allinsilver",
                                  "commissionHouseAmount": null,
                                  "commissionHouseRate": null,
                                  "corporatePlan": false,
                                  "cost": null,
                                  "description": "Health & Dental Insurance",
                                  "equitableInsurerTaxAmount": null,
                                  "equitableInsurerTaxRate": null,
                                  "equitableInsurerTotalAmount": null,
                                  "frqMonthly": "104572",
                                  "frqYearly": null,
                                  "fusebillId": "48080",
                                  "id": 627,
                                  "insuranceCompanyId": null,
                                  "isMonthlyCost": null,
                                  "jsonData": null,
                                  "logo": null,
                                  "maxAge": null,
                                  "minAge": null,
                                  "name": "All-in Silver",
                                  "ordering": null,
                                  "packageId": 1,
                                  "planCost": null,
                                  "planCoverage": "HEALTH_PLAN",
                                  "planLevel": 8,
                                  "published": {
                                      "type": "Buffer",
                                      "data": [
                                          1
                                      ]
                                  },
                                  "singleSku": true,
                                  "isBundle": true,
                                  "isMandatory": true,
                                  "isTaxPlan": false,
                                  "showBundledProducts": false,
                                  "customBundleName": null,
                                  "restrictedAccess": null,
                                  "plan_level": 8,
                                  "package_id": 1,
                                  "planLevels": {
                                      "id": 8,
                                      "parentId": 6,
                                      "name": "All-In Silver",
                                      "description": null,
                                      "published": {
                                          "type": "Buffer",
                                          "data": [
                                              1
                                          ]
                                      },
                                      "ordering": 9,
                                      "level": 2,
                                      "backgroundColor": "#A5A6A9",
                                      "textColor": "#FFFFFF",
                                      "tooltipTitle": "plan_coverage",
                                      "disallowedPlanLevels": "1,10,14,24",
                                      "requirePlanLevel": null,
                                      "childMaxAge": 21,
                                      "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"plan_coverage\", \"background_color\": \"#A5A6A9\"}"
                                  },
                                  "productAddons": [
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 767,
                                          "mandatory": false,
                                          "name": "Equitable",
                                          "displayName": null,
                                          "description": null,
                                          "published": true,
                                          "ordering": 1,
                                          "planCoverage": "SINGLE",
                                          "planId": 627,
                                          "planProductId": "182832",
                                          "price": 155.08,
                                          "productId": 7,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                          "productType": "BOTH",
                                          "planLevel": null,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 19.01, \"commission_house_amount_based_upon_premium_price\": 9.5}",
                                          "restrictedAccess": null,
                                          "product_id": 7,
                                          "plan_id": 627,
                                          "plan_level": null,
                                          "product": {
                                              "backgroundColor": "#212A3E",
                                              "code": "single",
                                              "color": "#FFFFFF",
                                              "fusebillId": "126187",
                                              "glCode": "73210",
                                              "id": 7,
                                              "name": "Single",
                                              "price": 229.72,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}",
                                              "productFeatureCategories": [
                                                  {
                                                      "description": null,
                                                      "id": 11,
                                                      "name": "Health & Dental Insurance",
                                                      "ordering": 1,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Prescription Drugs",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                              "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                              "id": 1,
                                                              "ordering": 1,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Professional Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                              "content": "",
                                                              "id": 5,
                                                              "ordering": 2,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Vision",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 10,
                                                              "ordering": 3,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Medical Supplies & Equipment",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 11,
                                                              "ordering": 4,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Travel Insurance",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                              "content": null,
                                                              "id": 12,
                                                              "ordering": 5,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Basic Dental Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                              "content": null,
                                                              "id": 13,
                                                              "ordering": 6,
                                                              "category_id": 11
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": null,
                                                      "id": 12,
                                                      "name": "GroupBenefitz Complete Wellness ",
                                                      "ordering": 2,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 12,
                                                              "title": "CloudMD Kii",
                                                              "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                              "content": null,
                                                              "id": 14,
                                                              "ordering": 1,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "Phzio MSK360",
                                                              "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                              "content": null,
                                                              "id": 15,
                                                              "ordering": 2,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "My Friendly Lawyer",
                                                              "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                              "content": null,
                                                              "id": 16,
                                                              "ordering": 3,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LifeSpeak",
                                                              "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                              "content": null,
                                                              "id": 17,
                                                              "ordering": 4,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "RxFood",
                                                              "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                              "content": null,
                                                              "id": 18,
                                                              "ordering": 5,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LIFT Session",
                                                              "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                              "content": null,
                                                              "id": 19,
                                                              "ordering": 6,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "The Solid Ground Method",
                                                              "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                              "content": null,
                                                              "id": 20,
                                                              "ordering": 7,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "ALAViDA",
                                                              "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                              "content": null,
                                                              "id": 21,
                                                              "ordering": 8,
                                                              "category_id": 12
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                      "id": 1,
                                                      "name": "Critical Illness Insurance",
                                                      "ordering": 3,
                                                      "published": true
                                                  }
                                              ]
                                          },
                                          "tax": null
                                      },
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 768,
                                          "mandatory": false,
                                          "name": "High Cost Drugs",
                                          "displayName": null,
                                          "description": null,
                                          "published": true,
                                          "ordering": 2,
                                          "planCoverage": "SINGLE",
                                          "planId": 627,
                                          "planProductId": "182832",
                                          "price": 15,
                                          "productId": 7,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[]",
                                          "productType": "BOTH",
                                          "planLevel": null,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 19.01, \"commission_house_amount_based_upon_premium_price\": 9.5}",
                                          "restrictedAccess": null,
                                          "product_id": 7,
                                          "plan_id": 627,
                                          "plan_level": null,
                                          "product": {
                                              "backgroundColor": "#212A3E",
                                              "code": "single",
                                              "color": "#FFFFFF",
                                              "fusebillId": "126187",
                                              "glCode": "73210",
                                              "id": 7,
                                              "name": "Single",
                                              "price": 229.72,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}",
                                              "productFeatureCategories": [
                                                  {
                                                      "description": null,
                                                      "id": 11,
                                                      "name": "Health & Dental Insurance",
                                                      "ordering": 1,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Prescription Drugs",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                              "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                              "id": 1,
                                                              "ordering": 1,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Professional Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                              "content": "",
                                                              "id": 5,
                                                              "ordering": 2,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Vision",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 10,
                                                              "ordering": 3,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Medical Supplies & Equipment",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 11,
                                                              "ordering": 4,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Travel Insurance",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                              "content": null,
                                                              "id": 12,
                                                              "ordering": 5,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Basic Dental Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                              "content": null,
                                                              "id": 13,
                                                              "ordering": 6,
                                                              "category_id": 11
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": null,
                                                      "id": 12,
                                                      "name": "GroupBenefitz Complete Wellness ",
                                                      "ordering": 2,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 12,
                                                              "title": "CloudMD Kii",
                                                              "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                              "content": null,
                                                              "id": 14,
                                                              "ordering": 1,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "Phzio MSK360",
                                                              "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                              "content": null,
                                                              "id": 15,
                                                              "ordering": 2,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "My Friendly Lawyer",
                                                              "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                              "content": null,
                                                              "id": 16,
                                                              "ordering": 3,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LifeSpeak",
                                                              "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                              "content": null,
                                                              "id": 17,
                                                              "ordering": 4,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "RxFood",
                                                              "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                              "content": null,
                                                              "id": 18,
                                                              "ordering": 5,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LIFT Session",
                                                              "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                              "content": null,
                                                              "id": 19,
                                                              "ordering": 6,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "The Solid Ground Method",
                                                              "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                              "content": null,
                                                              "id": 20,
                                                              "ordering": 7,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "ALAViDA",
                                                              "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                              "content": null,
                                                              "id": 21,
                                                              "ordering": 8,
                                                              "category_id": 12
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                      "id": 1,
                                                      "name": "Critical Illness Insurance",
                                                      "ordering": 3,
                                                      "published": true
                                                  }
                                              ]
                                          },
                                          "tax": null
                                      },
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 769,
                                          "mandatory": false,
                                          "name": "Complete Wellness",
                                          "displayName": null,
                                          "description": null,
                                          "published": true,
                                          "ordering": 3,
                                          "planCoverage": "SINGLE",
                                          "planId": 627,
                                          "planProductId": "182832",
                                          "price": 20,
                                          "productId": 7,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[]",
                                          "productType": "BOTH",
                                          "planLevel": null,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 19.01, \"commission_house_amount_based_upon_premium_price\": 9.5}",
                                          "restrictedAccess": null,
                                          "product_id": 7,
                                          "plan_id": 627,
                                          "plan_level": null,
                                          "product": {
                                              "backgroundColor": "#212A3E",
                                              "code": "single",
                                              "color": "#FFFFFF",
                                              "fusebillId": "126187",
                                              "glCode": "73210",
                                              "id": 7,
                                              "name": "Single",
                                              "price": 229.72,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}",
                                              "productFeatureCategories": [
                                                  {
                                                      "description": null,
                                                      "id": 11,
                                                      "name": "Health & Dental Insurance",
                                                      "ordering": 1,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Prescription Drugs",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                              "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                              "id": 1,
                                                              "ordering": 1,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Professional Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                              "content": "",
                                                              "id": 5,
                                                              "ordering": 2,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Vision",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 10,
                                                              "ordering": 3,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Medical Supplies & Equipment",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 11,
                                                              "ordering": 4,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Travel Insurance",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                              "content": null,
                                                              "id": 12,
                                                              "ordering": 5,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Basic Dental Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                              "content": null,
                                                              "id": 13,
                                                              "ordering": 6,
                                                              "category_id": 11
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": null,
                                                      "id": 12,
                                                      "name": "GroupBenefitz Complete Wellness ",
                                                      "ordering": 2,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 12,
                                                              "title": "CloudMD Kii",
                                                              "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                              "content": null,
                                                              "id": 14,
                                                              "ordering": 1,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "Phzio MSK360",
                                                              "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                              "content": null,
                                                              "id": 15,
                                                              "ordering": 2,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "My Friendly Lawyer",
                                                              "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                              "content": null,
                                                              "id": 16,
                                                              "ordering": 3,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LifeSpeak",
                                                              "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                              "content": null,
                                                              "id": 17,
                                                              "ordering": 4,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "RxFood",
                                                              "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                              "content": null,
                                                              "id": 18,
                                                              "ordering": 5,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LIFT Session",
                                                              "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                              "content": null,
                                                              "id": 19,
                                                              "ordering": 6,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "The Solid Ground Method",
                                                              "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                              "content": null,
                                                              "id": 20,
                                                              "ordering": 7,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "ALAViDA",
                                                              "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                              "content": null,
                                                              "id": 21,
                                                              "ordering": 8,
                                                              "category_id": 12
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                      "id": 1,
                                                      "name": "Critical Illness Insurance",
                                                      "ordering": 3,
                                                      "published": true
                                                  }
                                              ]
                                          },
                                          "tax": null
                                      }
                                  ],
                                  "productAddonss": {
                                      "All-in Silver": [
                                          {
                                              "activationDate": "2023-11-01T00:00:00.000Z",
                                              "businessTaxNumber": null,
                                              "id": 769,
                                              "mandatory": false,
                                              "name": "All-in Silver",
                                              "displayName": null,
                                              "ordering": 3,
                                              "planCoverage": "SINGLE",
                                              "planCoverageUI": "Single",
                                              "planId": 627,
                                              "planProductId": "182832",
                                              "price": 190.08,
                                              "productId": 7,
                                              "stateId": 12,
                                              "taxCode": null,
                                              "taxDescription": null,
                                              "taxName": null,
                                              "taxSku": null,
                                              "taxesData": "[]",
                                              "product_id": 7,
                                              "plan_id": 627,
                                              "product": {
                                                  "backgroundColor": "#212A3E",
                                                  "code": "single",
                                                  "color": "#FFFFFF",
                                                  "fusebillId": "126187",
                                                  "glCode": "73210",
                                                  "id": 7,
                                                  "name": "Single",
                                                  "price": 229.72,
                                                  "published": true,
                                                  "logo": null,
                                                  "display": "TITLE",
                                                  "data": "{}",
                                                  "productFeatureCategories": [
                                                      {
                                                          "description": null,
                                                          "id": 11,
                                                          "name": "Health & Dental Insurance",
                                                          "ordering": 1,
                                                          "published": true,
                                                          "productFeatureItems": [
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Prescription Drugs",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                                  "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                                  "id": 1,
                                                                  "ordering": 1,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Professional Services",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                                  "content": "",
                                                                  "id": 5,
                                                                  "ordering": 2,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Vision",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                                  "content": null,
                                                                  "id": 10,
                                                                  "ordering": 3,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Medical Supplies & Equipment",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                                  "content": null,
                                                                  "id": 11,
                                                                  "ordering": 4,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Travel Insurance",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                                  "content": null,
                                                                  "id": 12,
                                                                  "ordering": 5,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Basic Dental Services",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                                  "content": null,
                                                                  "id": 13,
                                                                  "ordering": 6,
                                                                  "category_id": 11
                                                              }
                                                          ]
                                                      },
                                                      {
                                                          "description": null,
                                                          "id": 12,
                                                          "name": "GroupBenefitz Complete Wellness ",
                                                          "ordering": 2,
                                                          "published": true,
                                                          "productFeatureItems": [
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "CloudMD Kii",
                                                                  "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                                  "content": null,
                                                                  "id": 14,
                                                                  "ordering": 1,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "Phzio MSK360",
                                                                  "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                                  "content": null,
                                                                  "id": 15,
                                                                  "ordering": 2,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "My Friendly Lawyer",
                                                                  "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                                  "content": null,
                                                                  "id": 16,
                                                                  "ordering": 3,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "LifeSpeak",
                                                                  "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                                  "content": null,
                                                                  "id": 17,
                                                                  "ordering": 4,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "RxFood",
                                                                  "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                                  "content": null,
                                                                  "id": 18,
                                                                  "ordering": 5,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "LIFT Session",
                                                                  "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                                  "content": null,
                                                                  "id": 19,
                                                                  "ordering": 6,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "The Solid Ground Method",
                                                                  "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                                  "content": null,
                                                                  "id": 20,
                                                                  "ordering": 7,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "ALAViDA",
                                                                  "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                                  "content": null,
                                                                  "id": 21,
                                                                  "ordering": 8,
                                                                  "category_id": 12
                                                              }
                                                          ]
                                                      },
                                                      {
                                                          "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                          "id": 1,
                                                          "name": "Critical Illness Insurance",
                                                          "ordering": 3,
                                                          "published": true
                                                      }
                                                  ]
                                              },
                                              "tax": null,
                                              "taxesDataJSON": [],
                                              "calculatedTax": {
                                                  "price": 190.08,
                                                  "tax": 12.406400000000001,
                                                  "total": 202.4864,
                                                  "planProductIds": [
                                                      178464
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "PST ON HEALTH INSURANCE",
                                                          "description": "PST on Health Insurance (#709505879TR0001)",
                                                          "price": 12.406400000000001,
                                                          "planProductUniqueId": 178464,
                                                          "isIncluded": true,
                                                          "taxRate": 0.08,
                                                          "taxRatePercentage": "8%"
                                                      }
                                                  ]
                                              },
                                              "price1": "190.08",
                                              "bundledProducts": [
                                                  "Equitable",
                                                  "High Cost Drugs",
                                                  "Complete Wellness"
                                              ],
                                              "planlevel": 8,
                                              "description": " Equitable High Cost Drugs Complete Wellness"
                                          }
                                      ]
                                  },
                                  "productAddonssCSS": {
                                      "All-in Silver": {
                                          "backgroundColor": "#212A3E",
                                          "code": "single",
                                          "color": "#FFFFFF",
                                          "fusebillId": "126187",
                                          "glCode": "73210",
                                          "id": 7,
                                          "name": "Single",
                                          "price": 229.72,
                                          "published": true,
                                          "logo": null,
                                          "display": "TITLE",
                                          "data": "{}",
                                          "productFeatureCategories": [
                                              {
                                                  "description": null,
                                                  "id": 11,
                                                  "name": "Health & Dental Insurance",
                                                  "ordering": 1,
                                                  "published": true,
                                                  "productFeatureItems": [
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Prescription Drugs",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                          "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                          "id": 1,
                                                          "ordering": 1,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Professional Services",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                          "content": "",
                                                          "id": 5,
                                                          "ordering": 2,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Vision",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                          "content": null,
                                                          "id": 10,
                                                          "ordering": 3,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Medical Supplies & Equipment",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                          "content": null,
                                                          "id": 11,
                                                          "ordering": 4,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Travel Insurance",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                          "content": null,
                                                          "id": 12,
                                                          "ordering": 5,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Basic Dental Services",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                          "content": null,
                                                          "id": 13,
                                                          "ordering": 6,
                                                          "category_id": 11
                                                      }
                                                  ]
                                              },
                                              {
                                                  "description": null,
                                                  "id": 12,
                                                  "name": "GroupBenefitz Complete Wellness ",
                                                  "ordering": 2,
                                                  "published": true,
                                                  "productFeatureItems": [
                                                      {
                                                          "categoryId": 12,
                                                          "title": "CloudMD Kii",
                                                          "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                          "content": null,
                                                          "id": 14,
                                                          "ordering": 1,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "Phzio MSK360",
                                                          "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                          "content": null,
                                                          "id": 15,
                                                          "ordering": 2,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "My Friendly Lawyer",
                                                          "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                          "content": null,
                                                          "id": 16,
                                                          "ordering": 3,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "LifeSpeak",
                                                          "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                          "content": null,
                                                          "id": 17,
                                                          "ordering": 4,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "RxFood",
                                                          "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                          "content": null,
                                                          "id": 18,
                                                          "ordering": 5,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "LIFT Session",
                                                          "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                          "content": null,
                                                          "id": 19,
                                                          "ordering": 6,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "The Solid Ground Method",
                                                          "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                          "content": null,
                                                          "id": 20,
                                                          "ordering": 7,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "ALAViDA",
                                                          "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                          "content": null,
                                                          "id": 21,
                                                          "ordering": 8,
                                                          "category_id": 12
                                                      }
                                                  ]
                                              },
                                              {
                                                  "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                  "id": 1,
                                                  "name": "Critical Illness Insurance",
                                                  "ordering": 3,
                                                  "published": true
                                              }
                                          ]
                                      }
                                  }
                              }
                          ]
                      },
                      {
                          "id": 9,
                          "parentId": 6,
                          "name": "All-In Gold",
                          "description": null,
                          "published": {
                              "type": "Buffer",
                              "data": [
                                  1
                              ]
                          },
                          "ordering": 10,
                          "level": 2,
                          "backgroundColor": "#D4B05B",
                          "textColor": "#FFFFFF",
                          "tooltipTitle": "plan_coverage",
                          "disallowedPlanLevels": "1,10,14,24",
                          "requirePlanLevel": null,
                          "childMaxAge": 21,
                          "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"plan_coverage\", \"background_color\": \"#D4B05B\"}",
                          "planLevelFeatures": [
                              {
                                  "id": 31,
                                  "planLevelId": 9,
                                  "planFeatureId": 1,
                                  "description": "90% coverage up to $5,000\r\nper family member per year\r\n100% at PocketPills Pharmacy",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 1,
                                  "feature": {
                                      "id": 1,
                                      "name": "Prescription Drugs",
                                      "category": "Health & Wellness",
                                      "description": "(Pay Direct Drug Card)",
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 34,
                                  "planLevelId": 9,
                                  "planFeatureId": 11,
                                  "description": "Catastrophic drug coverage from $5,000 up to $1,000,000 per family member per year $50,000 of biologic drugs limited to lowest cost biosimilar.\r *24 month pre-existing condition clause applies",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 11,
                                  "feature": {
                                      "id": 11,
                                      "name": "GroupBenefitz High-Cost Drugs",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 37,
                                  "planLevelId": 9,
                                  "planFeatureId": 12,
                                  "description": "Ongoing mental health counselling, telemedicine, fitness and nutrition plans, legal advice, and much more!",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 12,
                                  "feature": {
                                      "id": 12,
                                      "name": "GroupBenefitz Complete Wellness",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 40,
                                  "planLevelId": 9,
                                  "planFeatureId": 2,
                                  "description": "100% coverage up to $750 per practitioner category, per family member per year, up to $2,000 per family combined. Reasonable limits as per the insurer apply.",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 2,
                                  "feature": {
                                      "id": 2,
                                      "name": "Professional Services",
                                      "category": "Health & Wellness",
                                      "description": "Chiropractor, Chiropodist or Podiatrist,\r\nRegistered Massage Therapist, Naturopath,\r\nOsteopath, Physiotherapist, Psychologist,\r\nSpeech Therapist, Acupuncturist",
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 42,
                                  "planLevelId": 9,
                                  "planFeatureId": 3,
                                  "description": "100% coverage up to $200 every 24 months,\r\nper family member per year",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 3,
                                  "feature": {
                                      "id": 3,
                                      "name": "Vision",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 45,
                                  "planLevelId": 9,
                                  "planFeatureId": 4,
                                  "description": "100% coverage up to\r\n14 days per stay",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 4,
                                  "feature": {
                                      "id": 4,
                                      "name": "Semi-Private Hospital Room",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 48,
                                  "planLevelId": 9,
                                  "planFeatureId": 5,
                                  "description": "Included up to plan maximums and coinsurance as outlined in the plan booklet\r\nand/or reasonable & customary limits as per the insurer",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 5,
                                  "feature": {
                                      "id": 5,
                                      "name": "Medical Supplies & Equipment",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 51,
                                  "planLevelId": 9,
                                  "planFeatureId": 14,
                                  "description": "$1,500 per family member per year for approved treatments",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 14,
                                  "feature": {
                                      "id": 14,
                                      "name": "Medical Cannabis",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 54,
                                  "planLevelId": 9,
                                  "planFeatureId": 15,
                                  "description": "100% up to $5,000,000\r\n(Emergency Medical Services for unforeseen accidents and illnesses)",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 15,
                                  "feature": {
                                      "id": 15,
                                      "name": "Travel\r\n90 Day Out-of-Province/Country Coverage",
                                      "category": "Health & Wellness",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 57,
                                  "planLevelId": 9,
                                  "planFeatureId": 7,
                                  "description": "100% coverage up to $1,500\r\nper family member per year",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 7,
                                  "feature": {
                                      "id": 7,
                                      "name": "Basic Services",
                                      "category": "Dental",
                                      "description": "(checkups, x-rays, fillings, oral surgery,\r\nendodontics/periodontics, 8 units of scaling)",
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 60,
                                  "planLevelId": 9,
                                  "planFeatureId": 10,
                                  "description": "Every 6 months",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 10,
                                  "feature": {
                                      "id": 10,
                                      "name": "Frequency of Check-Ups",
                                      "category": "Dental",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              }
                          ],
                          "plans": [
                              {
                                  "activationDate": null,
                                  "advisorCommissionAmount": null,
                                  "advisorCommissionRate": null,
                                  "code": "allingold",
                                  "commissionHouseAmount": null,
                                  "commissionHouseRate": null,
                                  "corporatePlan": false,
                                  "cost": null,
                                  "description": "Health & Dental Insurance",
                                  "equitableInsurerTaxAmount": null,
                                  "equitableInsurerTaxRate": null,
                                  "equitableInsurerTotalAmount": null,
                                  "frqMonthly": "104573",
                                  "frqYearly": null,
                                  "fusebillId": "48081",
                                  "id": 628,
                                  "insuranceCompanyId": null,
                                  "isMonthlyCost": null,
                                  "jsonData": null,
                                  "logo": null,
                                  "maxAge": null,
                                  "minAge": null,
                                  "name": "All-in Gold",
                                  "ordering": null,
                                  "packageId": 1,
                                  "planCost": null,
                                  "planCoverage": "HEALTH_PLAN",
                                  "planLevel": 9,
                                  "published": {
                                      "type": "Buffer",
                                      "data": [
                                          1
                                      ]
                                  },
                                  "singleSku": true,
                                  "isBundle": true,
                                  "isMandatory": true,
                                  "isTaxPlan": false,
                                  "showBundledProducts": false,
                                  "customBundleName": null,
                                  "restrictedAccess": null,
                                  "plan_level": 9,
                                  "package_id": 1,
                                  "planLevels": {
                                      "id": 9,
                                      "parentId": 6,
                                      "name": "All-In Gold",
                                      "description": null,
                                      "published": {
                                          "type": "Buffer",
                                          "data": [
                                              1
                                          ]
                                      },
                                      "ordering": 10,
                                      "level": 2,
                                      "backgroundColor": "#D4B05B",
                                      "textColor": "#FFFFFF",
                                      "tooltipTitle": "plan_coverage",
                                      "disallowedPlanLevels": "1,10,14,24",
                                      "requirePlanLevel": null,
                                      "childMaxAge": 21,
                                      "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"plan_coverage\", \"background_color\": \"#D4B05B\"}"
                                  },
                                  "productAddons": [
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 848,
                                          "mandatory": false,
                                          "name": "Equitable",
                                          "displayName": null,
                                          "description": null,
                                          "published": true,
                                          "ordering": 1,
                                          "planCoverage": "SINGLE",
                                          "planId": 628,
                                          "planProductId": "182836",
                                          "price": 194.72,
                                          "productId": 7,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                          "productType": "BOTH",
                                          "planLevel": null,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 22.97, \"commission_house_amount_based_upon_premium_price\": 11.49}",
                                          "restrictedAccess": null,
                                          "product_id": 7,
                                          "plan_id": 628,
                                          "plan_level": null,
                                          "product": {
                                              "backgroundColor": "#212A3E",
                                              "code": "single",
                                              "color": "#FFFFFF",
                                              "fusebillId": "126187",
                                              "glCode": "73210",
                                              "id": 7,
                                              "name": "Single",
                                              "price": 229.72,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}",
                                              "productFeatureCategories": [
                                                  {
                                                      "description": null,
                                                      "id": 11,
                                                      "name": "Health & Dental Insurance",
                                                      "ordering": 1,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Prescription Drugs",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                              "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                              "id": 1,
                                                              "ordering": 1,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Professional Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                              "content": "",
                                                              "id": 5,
                                                              "ordering": 2,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Vision",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 10,
                                                              "ordering": 3,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Medical Supplies & Equipment",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 11,
                                                              "ordering": 4,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Travel Insurance",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                              "content": null,
                                                              "id": 12,
                                                              "ordering": 5,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Basic Dental Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                              "content": null,
                                                              "id": 13,
                                                              "ordering": 6,
                                                              "category_id": 11
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": null,
                                                      "id": 12,
                                                      "name": "GroupBenefitz Complete Wellness ",
                                                      "ordering": 2,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 12,
                                                              "title": "CloudMD Kii",
                                                              "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                              "content": null,
                                                              "id": 14,
                                                              "ordering": 1,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "Phzio MSK360",
                                                              "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                              "content": null,
                                                              "id": 15,
                                                              "ordering": 2,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "My Friendly Lawyer",
                                                              "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                              "content": null,
                                                              "id": 16,
                                                              "ordering": 3,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LifeSpeak",
                                                              "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                              "content": null,
                                                              "id": 17,
                                                              "ordering": 4,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "RxFood",
                                                              "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                              "content": null,
                                                              "id": 18,
                                                              "ordering": 5,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LIFT Session",
                                                              "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                              "content": null,
                                                              "id": 19,
                                                              "ordering": 6,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "The Solid Ground Method",
                                                              "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                              "content": null,
                                                              "id": 20,
                                                              "ordering": 7,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "ALAViDA",
                                                              "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                              "content": null,
                                                              "id": 21,
                                                              "ordering": 8,
                                                              "category_id": 12
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                      "id": 1,
                                                      "name": "Critical Illness Insurance",
                                                      "ordering": 3,
                                                      "published": true
                                                  }
                                              ]
                                          },
                                          "tax": null
                                      },
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 849,
                                          "mandatory": false,
                                          "name": "High Cost Drugs",
                                          "displayName": null,
                                          "description": null,
                                          "published": true,
                                          "ordering": 2,
                                          "planCoverage": "SINGLE",
                                          "planId": 628,
                                          "planProductId": "182836",
                                          "price": 15,
                                          "productId": 7,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[]",
                                          "productType": "BOTH",
                                          "planLevel": null,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 22.97, \"commission_house_amount_based_upon_premium_price\": 11.49}",
                                          "restrictedAccess": null,
                                          "product_id": 7,
                                          "plan_id": 628,
                                          "plan_level": null,
                                          "product": {
                                              "backgroundColor": "#212A3E",
                                              "code": "single",
                                              "color": "#FFFFFF",
                                              "fusebillId": "126187",
                                              "glCode": "73210",
                                              "id": 7,
                                              "name": "Single",
                                              "price": 229.72,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}",
                                              "productFeatureCategories": [
                                                  {
                                                      "description": null,
                                                      "id": 11,
                                                      "name": "Health & Dental Insurance",
                                                      "ordering": 1,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Prescription Drugs",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                              "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                              "id": 1,
                                                              "ordering": 1,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Professional Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                              "content": "",
                                                              "id": 5,
                                                              "ordering": 2,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Vision",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 10,
                                                              "ordering": 3,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Medical Supplies & Equipment",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 11,
                                                              "ordering": 4,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Travel Insurance",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                              "content": null,
                                                              "id": 12,
                                                              "ordering": 5,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Basic Dental Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                              "content": null,
                                                              "id": 13,
                                                              "ordering": 6,
                                                              "category_id": 11
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": null,
                                                      "id": 12,
                                                      "name": "GroupBenefitz Complete Wellness ",
                                                      "ordering": 2,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 12,
                                                              "title": "CloudMD Kii",
                                                              "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                              "content": null,
                                                              "id": 14,
                                                              "ordering": 1,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "Phzio MSK360",
                                                              "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                              "content": null,
                                                              "id": 15,
                                                              "ordering": 2,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "My Friendly Lawyer",
                                                              "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                              "content": null,
                                                              "id": 16,
                                                              "ordering": 3,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LifeSpeak",
                                                              "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                              "content": null,
                                                              "id": 17,
                                                              "ordering": 4,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "RxFood",
                                                              "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                              "content": null,
                                                              "id": 18,
                                                              "ordering": 5,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LIFT Session",
                                                              "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                              "content": null,
                                                              "id": 19,
                                                              "ordering": 6,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "The Solid Ground Method",
                                                              "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                              "content": null,
                                                              "id": 20,
                                                              "ordering": 7,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "ALAViDA",
                                                              "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                              "content": null,
                                                              "id": 21,
                                                              "ordering": 8,
                                                              "category_id": 12
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                      "id": 1,
                                                      "name": "Critical Illness Insurance",
                                                      "ordering": 3,
                                                      "published": true
                                                  }
                                              ]
                                          },
                                          "tax": null
                                      },
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 850,
                                          "mandatory": false,
                                          "name": "Complete Wellness",
                                          "displayName": null,
                                          "description": null,
                                          "published": true,
                                          "ordering": 3,
                                          "planCoverage": "SINGLE",
                                          "planId": 628,
                                          "planProductId": "182836",
                                          "price": 20,
                                          "productId": 7,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[]",
                                          "productType": "BOTH",
                                          "planLevel": null,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 22.97, \"commission_house_amount_based_upon_premium_price\": 11.49}",
                                          "restrictedAccess": null,
                                          "product_id": 7,
                                          "plan_id": 628,
                                          "plan_level": null,
                                          "product": {
                                              "backgroundColor": "#212A3E",
                                              "code": "single",
                                              "color": "#FFFFFF",
                                              "fusebillId": "126187",
                                              "glCode": "73210",
                                              "id": 7,
                                              "name": "Single",
                                              "price": 229.72,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}",
                                              "productFeatureCategories": [
                                                  {
                                                      "description": null,
                                                      "id": 11,
                                                      "name": "Health & Dental Insurance",
                                                      "ordering": 1,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Prescription Drugs",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                              "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                              "id": 1,
                                                              "ordering": 1,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Professional Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                              "content": "",
                                                              "id": 5,
                                                              "ordering": 2,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Vision",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 10,
                                                              "ordering": 3,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Medical Supplies & Equipment",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 11,
                                                              "ordering": 4,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Travel Insurance",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                              "content": null,
                                                              "id": 12,
                                                              "ordering": 5,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Basic Dental Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                              "content": null,
                                                              "id": 13,
                                                              "ordering": 6,
                                                              "category_id": 11
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": null,
                                                      "id": 12,
                                                      "name": "GroupBenefitz Complete Wellness ",
                                                      "ordering": 2,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 12,
                                                              "title": "CloudMD Kii",
                                                              "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                              "content": null,
                                                              "id": 14,
                                                              "ordering": 1,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "Phzio MSK360",
                                                              "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                              "content": null,
                                                              "id": 15,
                                                              "ordering": 2,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "My Friendly Lawyer",
                                                              "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                              "content": null,
                                                              "id": 16,
                                                              "ordering": 3,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LifeSpeak",
                                                              "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                              "content": null,
                                                              "id": 17,
                                                              "ordering": 4,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "RxFood",
                                                              "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                              "content": null,
                                                              "id": 18,
                                                              "ordering": 5,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LIFT Session",
                                                              "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                              "content": null,
                                                              "id": 19,
                                                              "ordering": 6,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "The Solid Ground Method",
                                                              "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                              "content": null,
                                                              "id": 20,
                                                              "ordering": 7,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "ALAViDA",
                                                              "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                              "content": null,
                                                              "id": 21,
                                                              "ordering": 8,
                                                              "category_id": 12
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                      "id": 1,
                                                      "name": "Critical Illness Insurance",
                                                      "ordering": 3,
                                                      "published": true
                                                  }
                                              ]
                                          },
                                          "tax": null
                                      }
                                  ],
                                  "productAddonss": {
                                      "All-in Gold": [
                                          {
                                              "activationDate": "2023-11-01T00:00:00.000Z",
                                              "businessTaxNumber": null,
                                              "id": 850,
                                              "mandatory": false,
                                              "name": "All-in Gold",
                                              "displayName": null,
                                              "ordering": 3,
                                              "planCoverage": "SINGLE",
                                              "planCoverageUI": "Single",
                                              "planId": 628,
                                              "planProductId": "182836",
                                              "price": 229.72,
                                              "productId": 7,
                                              "stateId": 12,
                                              "taxCode": null,
                                              "taxDescription": null,
                                              "taxName": null,
                                              "taxSku": null,
                                              "taxesData": "[]",
                                              "product_id": 7,
                                              "plan_id": 628,
                                              "product": {
                                                  "backgroundColor": "#212A3E",
                                                  "code": "single",
                                                  "color": "#FFFFFF",
                                                  "fusebillId": "126187",
                                                  "glCode": "73210",
                                                  "id": 7,
                                                  "name": "Single",
                                                  "price": 229.72,
                                                  "published": true,
                                                  "logo": null,
                                                  "display": "TITLE",
                                                  "data": "{}",
                                                  "productFeatureCategories": [
                                                      {
                                                          "description": null,
                                                          "id": 11,
                                                          "name": "Health & Dental Insurance",
                                                          "ordering": 1,
                                                          "published": true,
                                                          "productFeatureItems": [
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Prescription Drugs",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                                  "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                                  "id": 1,
                                                                  "ordering": 1,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Professional Services",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                                  "content": "",
                                                                  "id": 5,
                                                                  "ordering": 2,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Vision",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                                  "content": null,
                                                                  "id": 10,
                                                                  "ordering": 3,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Medical Supplies & Equipment",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                                  "content": null,
                                                                  "id": 11,
                                                                  "ordering": 4,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Travel Insurance",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                                  "content": null,
                                                                  "id": 12,
                                                                  "ordering": 5,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Basic Dental Services",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                                  "content": null,
                                                                  "id": 13,
                                                                  "ordering": 6,
                                                                  "category_id": 11
                                                              }
                                                          ]
                                                      },
                                                      {
                                                          "description": null,
                                                          "id": 12,
                                                          "name": "GroupBenefitz Complete Wellness ",
                                                          "ordering": 2,
                                                          "published": true,
                                                          "productFeatureItems": [
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "CloudMD Kii",
                                                                  "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                                  "content": null,
                                                                  "id": 14,
                                                                  "ordering": 1,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "Phzio MSK360",
                                                                  "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                                  "content": null,
                                                                  "id": 15,
                                                                  "ordering": 2,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "My Friendly Lawyer",
                                                                  "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                                  "content": null,
                                                                  "id": 16,
                                                                  "ordering": 3,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "LifeSpeak",
                                                                  "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                                  "content": null,
                                                                  "id": 17,
                                                                  "ordering": 4,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "RxFood",
                                                                  "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                                  "content": null,
                                                                  "id": 18,
                                                                  "ordering": 5,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "LIFT Session",
                                                                  "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                                  "content": null,
                                                                  "id": 19,
                                                                  "ordering": 6,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "The Solid Ground Method",
                                                                  "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                                  "content": null,
                                                                  "id": 20,
                                                                  "ordering": 7,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "ALAViDA",
                                                                  "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                                  "content": null,
                                                                  "id": 21,
                                                                  "ordering": 8,
                                                                  "category_id": 12
                                                              }
                                                          ]
                                                      },
                                                      {
                                                          "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                          "id": 1,
                                                          "name": "Critical Illness Insurance",
                                                          "ordering": 3,
                                                          "published": true
                                                      }
                                                  ]
                                              },
                                              "tax": null,
                                              "taxesDataJSON": [],
                                              "calculatedTax": {
                                                  "price": 229.72,
                                                  "tax": 15.5776,
                                                  "total": 245.2976,
                                                  "planProductIds": [
                                                      178464
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "PST ON HEALTH INSURANCE",
                                                          "description": "PST on Health Insurance (#709505879TR0001)",
                                                          "price": 15.5776,
                                                          "planProductUniqueId": 178464,
                                                          "isIncluded": true,
                                                          "taxRate": 0.08,
                                                          "taxRatePercentage": "8%"
                                                      }
                                                  ]
                                              },
                                              "price1": "229.72",
                                              "bundledProducts": [
                                                  "Equitable",
                                                  "High Cost Drugs",
                                                  "Complete Wellness"
                                              ],
                                              "planlevel": 9,
                                              "description": " Equitable High Cost Drugs Complete Wellness"
                                          }
                                      ]
                                  },
                                  "productAddonssCSS": {
                                      "All-in Gold": {
                                          "backgroundColor": "#212A3E",
                                          "code": "single",
                                          "color": "#FFFFFF",
                                          "fusebillId": "126187",
                                          "glCode": "73210",
                                          "id": 7,
                                          "name": "Single",
                                          "price": 229.72,
                                          "published": true,
                                          "logo": null,
                                          "display": "TITLE",
                                          "data": "{}",
                                          "productFeatureCategories": [
                                              {
                                                  "description": null,
                                                  "id": 11,
                                                  "name": "Health & Dental Insurance",
                                                  "ordering": 1,
                                                  "published": true,
                                                  "productFeatureItems": [
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Prescription Drugs",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                          "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                          "id": 1,
                                                          "ordering": 1,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Professional Services",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                          "content": "",
                                                          "id": 5,
                                                          "ordering": 2,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Vision",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                          "content": null,
                                                          "id": 10,
                                                          "ordering": 3,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Medical Supplies & Equipment",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                          "content": null,
                                                          "id": 11,
                                                          "ordering": 4,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Travel Insurance",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                          "content": null,
                                                          "id": 12,
                                                          "ordering": 5,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Basic Dental Services",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                          "content": null,
                                                          "id": 13,
                                                          "ordering": 6,
                                                          "category_id": 11
                                                      }
                                                  ]
                                              },
                                              {
                                                  "description": null,
                                                  "id": 12,
                                                  "name": "GroupBenefitz Complete Wellness ",
                                                  "ordering": 2,
                                                  "published": true,
                                                  "productFeatureItems": [
                                                      {
                                                          "categoryId": 12,
                                                          "title": "CloudMD Kii",
                                                          "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                          "content": null,
                                                          "id": 14,
                                                          "ordering": 1,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "Phzio MSK360",
                                                          "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                          "content": null,
                                                          "id": 15,
                                                          "ordering": 2,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "My Friendly Lawyer",
                                                          "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                          "content": null,
                                                          "id": 16,
                                                          "ordering": 3,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "LifeSpeak",
                                                          "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                          "content": null,
                                                          "id": 17,
                                                          "ordering": 4,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "RxFood",
                                                          "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                          "content": null,
                                                          "id": 18,
                                                          "ordering": 5,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "LIFT Session",
                                                          "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                          "content": null,
                                                          "id": 19,
                                                          "ordering": 6,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "The Solid Ground Method",
                                                          "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                          "content": null,
                                                          "id": 20,
                                                          "ordering": 7,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "ALAViDA",
                                                          "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                          "content": null,
                                                          "id": 21,
                                                          "ordering": 8,
                                                          "category_id": 12
                                                      }
                                                  ]
                                              },
                                              {
                                                  "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                  "id": 1,
                                                  "name": "Critical Illness Insurance",
                                                  "ordering": 3,
                                                  "published": true
                                              }
                                          ]
                                      }
                                  }
                              }
                          ]
                      }
                  ]
              },
              {
                  "description": "Mental Health & Wellness",
                  "id": 2,
                  "logo": null,
                  "name": "Mental Health & Wellbeing",
                  "published": true,
                  "ordering": 3,
                  "allowMultiple": false,
                  "applyFilters": true,
                  "optIn": false,
                  "groups": [
                      {
                          "id": 14,
                          "parentId": null,
                          "name": "Wellness",
                          "description": null,
                          "published": {
                              "type": "Buffer",
                              "data": [
                                  1
                              ]
                          },
                          "ordering": 17,
                          "level": 1,
                          "backgroundColor": null,
                          "textColor": null,
                          "tooltipTitle": "name",
                          "disallowedPlanLevels": null,
                          "requirePlanLevel": null,
                          "childMaxAge": 21,
                          "data": "{\"text_color\": null, \"tooltip_title\": \"name\", \"background_color\": null}",
                          "planLevelFeatures": [
                              {
                                  "id": 81,
                                  "planLevelId": 14,
                                  "planFeatureId": 31,
                                  "description": "Ongoing access to virtual medical care with Doctors, and long-term,\r professional mental health counselling\r Additional specialized services available",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 31,
                                  "feature": {
                                      "id": 31,
                                      "name": "Maple Telemedicine\r\nand Mind By Maple",
                                      "category": null,
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              }
                          ],
                          "plans": [
                              {
                                  "activationDate": null,
                                  "advisorCommissionAmount": null,
                                  "advisorCommissionRate": null,
                                  "code": "groupbenefitzwellbeingservices",
                                  "commissionHouseAmount": null,
                                  "commissionHouseRate": null,
                                  "corporatePlan": false,
                                  "cost": null,
                                  "description": "Employee Assistance Program",
                                  "equitableInsurerTaxAmount": null,
                                  "equitableInsurerTaxRate": null,
                                  "equitableInsurerTotalAmount": null,
                                  "frqMonthly": "106703",
                                  "frqYearly": null,
                                  "fusebillId": "49633",
                                  "id": 621,
                                  "insuranceCompanyId": null,
                                  "isMonthlyCost": null,
                                  "jsonData": null,
                                  "logo": null,
                                  "maxAge": null,
                                  "minAge": null,
                                  "name": "GroupBenefitz Wellbeing Services",
                                  "ordering": null,
                                  "packageId": 2,
                                  "planCost": null,
                                  "planCoverage": "EMPLOYEE_ASSISTANCE",
                                  "planLevel": 14,
                                  "published": {
                                      "type": "Buffer",
                                      "data": [
                                          1
                                      ]
                                  },
                                  "singleSku": true,
                                  "isBundle": false,
                                  "isMandatory": true,
                                  "isTaxPlan": false,
                                  "showBundledProducts": false,
                                  "customBundleName": null,
                                  "restrictedAccess": null,
                                  "plan_level": 14,
                                  "package_id": 2,
                                  "planLevels": {
                                      "id": 14,
                                      "parentId": null,
                                      "name": "Wellness",
                                      "description": null,
                                      "published": {
                                          "type": "Buffer",
                                          "data": [
                                              1
                                          ]
                                      },
                                      "ordering": 17,
                                      "level": 1,
                                      "backgroundColor": null,
                                      "textColor": null,
                                      "tooltipTitle": "name",
                                      "disallowedPlanLevels": null,
                                      "requirePlanLevel": null,
                                      "childMaxAge": 21,
                                      "data": "{\"text_color\": null, \"tooltip_title\": \"name\", \"background_color\": null}"
                                  },
                                  "productAddons": [
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 470,
                                          "mandatory": false,
                                          "name": "GroupBenefitz EAP 2.0",
                                          "displayName": null,
                                          "description": "",
                                          "published": true,
                                          "ordering": 1,
                                          "planCoverage": "EMPLOYEE_ASSISTANCE",
                                          "planId": 621,
                                          "planProductId": "182811",
                                          "price": 5,
                                          "productId": 25,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[{\"tax_name\":\"HST\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178463,\"tax_description\":\"HST (#709505879RT0001)\",\"business_tax_number\":\"709505879RT0001\",\"tax_rate\":0.13,\"tax_sku\":\"hst\"}]",
                                          "productType": "BOTH",
                                          "planLevel": 19,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 0.5, \"commission_house_amount_based_upon_premium_price\": 0.25}",
                                          "restrictedAccess": null,
                                          "product_id": 25,
                                          "plan_id": 621,
                                          "plan_level": 19,
                                          "product": {
                                              "backgroundColor": null,
                                              "code": "groupbenefitzeap20singlesku",
                                              "color": null,
                                              "fusebillId": "127217",
                                              "glCode": "53210",
                                              "id": 25,
                                              "name": "GroupBenefitz EAP 2.0",
                                              "price": 5,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}"
                                          },
                                          "planlevel": {
                                              "id": 19,
                                              "parentId": 14,
                                              "name": "EAP 2.0",
                                              "description": null,
                                              "published": {
                                                  "type": "Buffer",
                                                  "data": [
                                                      1
                                                  ]
                                              },
                                              "ordering": 18,
                                              "level": 2,
                                              "backgroundColor": "#7D6D93",
                                              "textColor": "#FFFFFF",
                                              "tooltipTitle": "name",
                                              "disallowedPlanLevels": null,
                                              "requirePlanLevel": null,
                                              "childMaxAge": 21,
                                              "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"name\", \"background_color\": \"#7D6D93\"}",
                                              "planLevelFeatures": [
                                                  {
                                                      "id": 109,
                                                      "planLevelId": 19,
                                                      "planFeatureId": 28,
                                                      "description": "Short-term counselling services for individuals and their families; in person, virtual or via phone",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 28,
                                                      "feature": {
                                                          "id": 28,
                                                          "name": "CloudMD Kii",
                                                          "category": null,
                                                          "description": "Basic EAP",
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 110,
                                                      "planLevelId": 19,
                                                      "planFeatureId": 29,
                                                      "description": "Virtual ergonomic assessments, conditioning plans and unlimited pain\r\nconsultations with Athletic Therapists\r\nVirtual physiotherapy available at preferred rates",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 29,
                                                      "feature": {
                                                          "id": 29,
                                                          "name": "Phzio MSK360",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 111,
                                                      "planLevelId": 19,
                                                      "planFeatureId": 30,
                                                      "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 30,
                                                      "feature": {
                                                          "id": 30,
                                                          "name": "My Friendly Lawyer",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  }
                                              ]
                                          },
                                          "tax": null,
                                          "taxExtended": {
                                              "planPrice": 5,
                                              "gstPrice": 0,
                                              "gstCheck": false,
                                              "hstPrice": 0,
                                              "hstCheck": false,
                                              "pstPrice": 0,
                                              "pstCheck": false,
                                              "qstPrice": 0,
                                              "qstCheck": true,
                                              "taxUI": "<span>-</span>",
                                              "tax": 0,
                                              "totalPrice": 5,
                                              "totalUI": "$5",
                                              "total": 5
                                          },
                                          "taxesDataJSON": [
                                              {
                                                  "tax_name": "HST",
                                                  "tax_code": null,
                                                  "plan_id": 609,
                                                  "plan_product_id": 178463,
                                                  "tax_description": "HST (#709505879RT0001)",
                                                  "business_tax_number": "709505879RT0001",
                                                  "tax_rate": 0.13,
                                                  "tax_sku": "hst"
                                              }
                                          ],
                                          "calculatedTaxes": {
                                              "price": 5,
                                              "tax": 0.65,
                                              "total": 5.65,
                                              "planProductIds": [
                                                  178463
                                              ],
                                              "planProductInfos": [
                                                  {
                                                      "name": "HST",
                                                      "description": "HST (#709505879RT0001)",
                                                      "price": 0.65,
                                                      "planProductUniqueId": 178463,
                                                      "isIncluded": true,
                                                      "taxRate": 0.13,
                                                      "taxRatePercentage": "13%"
                                                  }
                                              ]
                                          },
                                          "calculatedTax": {
                                              "price": 5,
                                              "tax": 0.65,
                                              "total": 5.65,
                                              "planProductIds": [
                                                  178463
                                              ],
                                              "planProductInfos": [
                                                  {
                                                      "name": "HST",
                                                      "description": "HST (#709505879RT0001)",
                                                      "price": 0.65,
                                                      "planProductUniqueId": 178463,
                                                      "isIncluded": true,
                                                      "taxRate": 0.13,
                                                      "taxRatePercentage": "13%"
                                                  }
                                              ]
                                          },
                                          "price1": "5.00",
                                          "bundledProducts": [
                                              "GroupBenefitz EAP 2.0"
                                          ]
                                      },
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 480,
                                          "mandatory": false,
                                          "name": "GroupBenefitz Mind & Body",
                                          "displayName": null,
                                          "description": "",
                                          "published": true,
                                          "ordering": 1,
                                          "planCoverage": "EMPLOYEE_ASSISTANCE",
                                          "planId": 621,
                                          "planProductId": "182812",
                                          "price": 15,
                                          "productId": 24,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[{\"tax_name\":\"HST\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178463,\"tax_description\":\"HST (#709505879RT0001)\",\"business_tax_number\":\"709505879RT0001\",\"tax_rate\":0.13,\"tax_sku\":\"hst\"}]",
                                          "productType": "BOTH",
                                          "planLevel": 21,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 1.5, \"commission_house_amount_based_upon_premium_price\": 0.75}",
                                          "restrictedAccess": null,
                                          "product_id": 24,
                                          "plan_id": 621,
                                          "plan_level": 21,
                                          "product": {
                                              "backgroundColor": null,
                                              "code": "groupbenefitzmindbody",
                                              "color": null,
                                              "fusebillId": "123805",
                                              "glCode": "53210",
                                              "id": 24,
                                              "name": "GroupBenefitz Mind & Body",
                                              "price": 15,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}"
                                          },
                                          "planlevel": {
                                              "id": 21,
                                              "parentId": 14,
                                              "name": "Mind & Body",
                                              "description": null,
                                              "published": {
                                                  "type": "Buffer",
                                                  "data": [
                                                      1
                                                  ]
                                              },
                                              "ordering": 19,
                                              "level": 2,
                                              "backgroundColor": "#97579B",
                                              "textColor": "#FFFFFF",
                                              "tooltipTitle": "name",
                                              "disallowedPlanLevels": null,
                                              "requirePlanLevel": null,
                                              "childMaxAge": 21,
                                              "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"name\", \"background_color\": \"#97579B\"}",
                                              "planLevelFeatures": [
                                                  {
                                                      "id": 114,
                                                      "planLevelId": 21,
                                                      "planFeatureId": 28,
                                                      "description": "Short-term counselling services for individuals and their families; in person, virtual or via phone",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 28,
                                                      "feature": {
                                                          "id": 28,
                                                          "name": "CloudMD Kii",
                                                          "category": null,
                                                          "description": "Basic EAP",
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  }
                                              ]
                                          },
                                          "tax": null,
                                          "taxExtended": {
                                              "planPrice": 15,
                                              "gstPrice": 0,
                                              "gstCheck": false,
                                              "hstPrice": 0,
                                              "hstCheck": false,
                                              "pstPrice": 0,
                                              "pstCheck": false,
                                              "qstPrice": 0,
                                              "qstCheck": true,
                                              "taxUI": "<span>-</span>",
                                              "tax": 0,
                                              "totalPrice": 15,
                                              "totalUI": "$15",
                                              "total": 15
                                          },
                                          "taxesDataJSON": [
                                              {
                                                  "tax_name": "HST",
                                                  "tax_code": null,
                                                  "plan_id": 609,
                                                  "plan_product_id": 178463,
                                                  "tax_description": "HST (#709505879RT0001)",
                                                  "business_tax_number": "709505879RT0001",
                                                  "tax_rate": 0.13,
                                                  "tax_sku": "hst"
                                              }
                                          ],
                                          "calculatedTaxes": {
                                              "price": 15,
                                              "tax": 1.9500000000000002,
                                              "total": 16.95,
                                              "planProductIds": [
                                                  178463
                                              ],
                                              "planProductInfos": [
                                                  {
                                                      "name": "HST",
                                                      "description": "HST (#709505879RT0001)",
                                                      "price": 1.9500000000000002,
                                                      "planProductUniqueId": 178463,
                                                      "isIncluded": true,
                                                      "taxRate": 0.13,
                                                      "taxRatePercentage": "13%"
                                                  }
                                              ]
                                          },
                                          "calculatedTax": {
                                              "price": 15,
                                              "tax": 1.9500000000000002,
                                              "total": 16.95,
                                              "planProductIds": [
                                                  178463
                                              ],
                                              "planProductInfos": [
                                                  {
                                                      "name": "HST",
                                                      "description": "HST (#709505879RT0001)",
                                                      "price": 1.9500000000000002,
                                                      "planProductUniqueId": 178463,
                                                      "isIncluded": true,
                                                      "taxRate": 0.13,
                                                      "taxRatePercentage": "13%"
                                                  }
                                              ]
                                          },
                                          "price1": "15.00",
                                          "bundledProducts": [
                                              "GroupBenefitz Mind & Body"
                                          ]
                                      },
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 490,
                                          "mandatory": false,
                                          "name": "GroupBenefitz Complete Wellness",
                                          "displayName": null,
                                          "description": "",
                                          "published": true,
                                          "ordering": 1,
                                          "planCoverage": "EMPLOYEE_ASSISTANCE",
                                          "planId": 621,
                                          "planProductId": "182813",
                                          "price": 20,
                                          "productId": 23,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[{\"tax_name\":\"HST\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178463,\"tax_description\":\"HST (#709505879RT0001)\",\"business_tax_number\":\"709505879RT0001\",\"tax_rate\":0.13,\"tax_sku\":\"hst\"}]",
                                          "productType": "BOTH",
                                          "planLevel": 20,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 2, \"commission_house_amount_based_upon_premium_price\": 1}",
                                          "restrictedAccess": null,
                                          "product_id": 23,
                                          "plan_id": 621,
                                          "plan_level": 20,
                                          "product": {
                                              "backgroundColor": null,
                                              "code": "groupbenefitzcompletewellnesssinglesku",
                                              "color": null,
                                              "fusebillId": "127218",
                                              "glCode": "53210",
                                              "id": 23,
                                              "name": "GroupBenefitz Complete Wellness",
                                              "price": 20,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}"
                                          },
                                          "planlevel": {
                                              "id": 20,
                                              "parentId": 14,
                                              "name": "Complete Wellness",
                                              "description": null,
                                              "published": {
                                                  "type": "Buffer",
                                                  "data": [
                                                      1
                                                  ]
                                              },
                                              "ordering": 20,
                                              "level": 2,
                                              "backgroundColor": "#684585",
                                              "textColor": "#FFFFFF",
                                              "tooltipTitle": "name",
                                              "disallowedPlanLevels": null,
                                              "requirePlanLevel": null,
                                              "childMaxAge": 21,
                                              "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"name\", \"background_color\": \"#684585\"}",
                                              "planLevelFeatures": [
                                                  {
                                                      "id": 78,
                                                      "planLevelId": 20,
                                                      "planFeatureId": 28,
                                                      "description": "Short-term counselling services for individuals and their families; in person, virtual or via phone",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 28,
                                                      "feature": {
                                                          "id": 28,
                                                          "name": "CloudMD Kii",
                                                          "category": null,
                                                          "description": "Basic EAP",
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 79,
                                                      "planLevelId": 20,
                                                      "planFeatureId": 29,
                                                      "description": "Virtual ergonomic assessments, conditioning plans and unlimited pain\r\nconsultations with Athletic Therapists\r\nVirtual physiotherapy available at preferred rates",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 29,
                                                      "feature": {
                                                          "id": 29,
                                                          "name": "Phzio MSK360",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 80,
                                                      "planLevelId": 20,
                                                      "planFeatureId": 30,
                                                      "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 30,
                                                      "feature": {
                                                          "id": 30,
                                                          "name": "My Friendly Lawyer",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 82,
                                                      "planLevelId": 20,
                                                      "planFeatureId": 32,
                                                      "description": "Expert-led mental health and wellbeing education platform with Ask the Expert\r\nweb chats, blogs, videos and podcasts",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 32,
                                                      "feature": {
                                                          "id": 32,
                                                          "name": "LifeSpeak",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 83,
                                                      "planLevelId": 20,
                                                      "planFeatureId": 33,
                                                      "description": "Innovative nutrition app optimizes food for health by aligning your individual\r\ndata with specific goals. Detailed reports and guidance serve real life, targeted issues\r\nincluding diabetes and overall wellness",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 33,
                                                      "feature": {
                                                          "id": 33,
                                                          "name": "RxFood",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 84,
                                                      "planLevelId": 20,
                                                      "planFeatureId": 34,
                                                      "description": "Industry-leading virtual fitness support program with unlimited on-demand\r\nhome workout videos and live sessions",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 34,
                                                      "feature": {
                                                          "id": 34,
                                                          "name": "LIFT Session",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 85,
                                                      "planLevelId": 20,
                                                      "planFeatureId": 35,
                                                      "description": "Personal development program helps you live life on your terms while gaining more life and\r\njob satisfaction. Learn how to reduce stress, improve energy and time management, and\r\nachieve work-life balance",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 35,
                                                      "feature": {
                                                          "id": 35,
                                                          "name": "The Solid Ground Method",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 86,
                                                      "planLevelId": 20,
                                                      "planFeatureId": 36,
                                                      "description": "Virtual substance use support with early intervention that helps keep employees at work.\r\nBoard-certified substance use disorder physicians, mental health support, self-assessments,\r\n24/7 resources, and more personalized care\r\nVirtual rehabilitation available; fees apply",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 36,
                                                      "feature": {
                                                          "id": 36,
                                                          "name": "ALAViDA",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  }
                                              ]
                                          },
                                          "tax": null,
                                          "taxExtended": {
                                              "planPrice": 20,
                                              "gstPrice": 0,
                                              "gstCheck": false,
                                              "hstPrice": 0,
                                              "hstCheck": false,
                                              "pstPrice": 0,
                                              "pstCheck": false,
                                              "qstPrice": 0,
                                              "qstCheck": true,
                                              "taxUI": "<span>-</span>",
                                              "tax": 0,
                                              "totalPrice": 20,
                                              "totalUI": "$20",
                                              "total": 20
                                          },
                                          "taxesDataJSON": [
                                              {
                                                  "tax_name": "HST",
                                                  "tax_code": null,
                                                  "plan_id": 609,
                                                  "plan_product_id": 178463,
                                                  "tax_description": "HST (#709505879RT0001)",
                                                  "business_tax_number": "709505879RT0001",
                                                  "tax_rate": 0.13,
                                                  "tax_sku": "hst"
                                              }
                                          ],
                                          "calculatedTaxes": {
                                              "price": 20,
                                              "tax": 2.6,
                                              "total": 22.6,
                                              "planProductIds": [
                                                  178463
                                              ],
                                              "planProductInfos": [
                                                  {
                                                      "name": "HST",
                                                      "description": "HST (#709505879RT0001)",
                                                      "price": 2.6,
                                                      "planProductUniqueId": 178463,
                                                      "isIncluded": true,
                                                      "taxRate": 0.13,
                                                      "taxRatePercentage": "13%"
                                                  }
                                              ]
                                          },
                                          "calculatedTax": {
                                              "price": 20,
                                              "tax": 2.6,
                                              "total": 22.6,
                                              "planProductIds": [
                                                  178463
                                              ],
                                              "planProductInfos": [
                                                  {
                                                      "name": "HST",
                                                      "description": "HST (#709505879RT0001)",
                                                      "price": 2.6,
                                                      "planProductUniqueId": 178463,
                                                      "isIncluded": true,
                                                      "taxRate": 0.13,
                                                      "taxRatePercentage": "13%"
                                                  }
                                              ]
                                          },
                                          "price1": "20.00",
                                          "bundledProducts": [
                                              "GroupBenefitz Complete Wellness"
                                          ]
                                      }
                                  ],
                                  "productAddonss": {
                                      "GroupBenefitz EAP 2.0": [
                                          {
                                              "activationDate": "2023-11-01T00:00:00.000Z",
                                              "businessTaxNumber": null,
                                              "id": 470,
                                              "mandatory": false,
                                              "name": "GroupBenefitz EAP 2.0",
                                              "displayName": null,
                                              "ordering": 1,
                                              "planCoverage": "EMPLOYEE_ASSISTANCE",
                                              "planCoverageUI": "Select",
                                              "planId": 621,
                                              "planProductId": "182811",
                                              "price": 5,
                                              "productId": 25,
                                              "stateId": 12,
                                              "taxCode": null,
                                              "taxDescription": null,
                                              "taxName": null,
                                              "taxSku": null,
                                              "taxesData": "[{\"tax_name\":\"HST\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178463,\"tax_description\":\"HST (#709505879RT0001)\",\"business_tax_number\":\"709505879RT0001\",\"tax_rate\":0.13,\"tax_sku\":\"hst\"}]",
                                              "product_id": 25,
                                              "plan_id": 621,
                                              "product": {
                                                  "backgroundColor": null,
                                                  "code": "groupbenefitzeap20singlesku",
                                                  "color": null,
                                                  "fusebillId": "127217",
                                                  "glCode": "53210",
                                                  "id": 25,
                                                  "name": "GroupBenefitz EAP 2.0",
                                                  "price": 5,
                                                  "published": true,
                                                  "logo": null,
                                                  "display": "TITLE",
                                                  "data": "{}"
                                              },
                                              "tax": null,
                                              "taxExtended": {
                                                  "planPrice": 5,
                                                  "gstPrice": 0,
                                                  "gstCheck": false,
                                                  "hstPrice": 0,
                                                  "hstCheck": false,
                                                  "pstPrice": 0,
                                                  "pstCheck": false,
                                                  "qstPrice": 0,
                                                  "qstCheck": true,
                                                  "taxUI": "<span>-</span>",
                                                  "tax": 0,
                                                  "totalPrice": 5,
                                                  "totalUI": "$5",
                                                  "total": 5
                                              },
                                              "taxesDataJSON": [
                                                  {
                                                      "tax_name": "HST",
                                                      "tax_code": null,
                                                      "plan_id": 609,
                                                      "plan_product_id": 178463,
                                                      "tax_description": "HST (#709505879RT0001)",
                                                      "business_tax_number": "709505879RT0001",
                                                      "tax_rate": 0.13,
                                                      "tax_sku": "hst"
                                                  }
                                              ],
                                              "calculatedTaxes": {
                                                  "price": 5,
                                                  "tax": 0.65,
                                                  "total": 5.65,
                                                  "planProductIds": [
                                                      178463
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "HST",
                                                          "description": "HST (#709505879RT0001)",
                                                          "price": 0.65,
                                                          "planProductUniqueId": 178463,
                                                          "isIncluded": true,
                                                          "taxRate": 0.13,
                                                          "taxRatePercentage": "13%"
                                                      }
                                                  ]
                                              },
                                              "calculatedTax": {
                                                  "price": 5,
                                                  "tax": 0.65,
                                                  "total": 5.65,
                                                  "planProductIds": [
                                                      178463
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "HST",
                                                          "description": "HST (#709505879RT0001)",
                                                          "price": 0.65,
                                                          "planProductUniqueId": 178463,
                                                          "isIncluded": true,
                                                          "taxRate": 0.13,
                                                          "taxRatePercentage": "13%"
                                                      }
                                                  ]
                                              },
                                              "price1": "5.00",
                                              "bundledProducts": [
                                                  "GroupBenefitz EAP 2.0"
                                              ],
                                              "planlevel": {
                                                  "id": 19,
                                                  "parentId": 14,
                                                  "name": "EAP 2.0",
                                                  "description": null,
                                                  "published": {
                                                      "type": "Buffer",
                                                      "data": [
                                                          1
                                                      ]
                                                  },
                                                  "ordering": 18,
                                                  "level": 2,
                                                  "backgroundColor": "#7D6D93",
                                                  "textColor": "#FFFFFF",
                                                  "tooltipTitle": "name",
                                                  "disallowedPlanLevels": null,
                                                  "requirePlanLevel": null,
                                                  "childMaxAge": 21,
                                                  "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"name\", \"background_color\": \"#7D6D93\"}",
                                                  "planLevelFeatures": [
                                                      {
                                                          "id": 109,
                                                          "planLevelId": 19,
                                                          "planFeatureId": 28,
                                                          "description": "Short-term counselling services for individuals and their families; in person, virtual or via phone",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 28,
                                                          "feature": {
                                                              "id": 28,
                                                              "name": "CloudMD Kii",
                                                              "category": null,
                                                              "description": "Basic EAP",
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 110,
                                                          "planLevelId": 19,
                                                          "planFeatureId": 29,
                                                          "description": "Virtual ergonomic assessments, conditioning plans and unlimited pain\r\nconsultations with Athletic Therapists\r\nVirtual physiotherapy available at preferred rates",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 29,
                                                          "feature": {
                                                              "id": 29,
                                                              "name": "Phzio MSK360",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 111,
                                                          "planLevelId": 19,
                                                          "planFeatureId": 30,
                                                          "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 30,
                                                          "feature": {
                                                              "id": 30,
                                                              "name": "My Friendly Lawyer",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      }
                                                  ]
                                              },
                                              "description": ""
                                          }
                                      ],
                                      "GroupBenefitz Mind & Body": [
                                          {
                                              "activationDate": "2023-11-01T00:00:00.000Z",
                                              "businessTaxNumber": null,
                                              "id": 480,
                                              "mandatory": false,
                                              "name": "GroupBenefitz Mind & Body",
                                              "displayName": null,
                                              "ordering": 1,
                                              "planCoverage": "EMPLOYEE_ASSISTANCE",
                                              "planCoverageUI": "Select",
                                              "planId": 621,
                                              "planProductId": "182812",
                                              "price": 15,
                                              "productId": 24,
                                              "stateId": 12,
                                              "taxCode": null,
                                              "taxDescription": null,
                                              "taxName": null,
                                              "taxSku": null,
                                              "taxesData": "[{\"tax_name\":\"HST\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178463,\"tax_description\":\"HST (#709505879RT0001)\",\"business_tax_number\":\"709505879RT0001\",\"tax_rate\":0.13,\"tax_sku\":\"hst\"}]",
                                              "product_id": 24,
                                              "plan_id": 621,
                                              "product": {
                                                  "backgroundColor": null,
                                                  "code": "groupbenefitzmindbody",
                                                  "color": null,
                                                  "fusebillId": "123805",
                                                  "glCode": "53210",
                                                  "id": 24,
                                                  "name": "GroupBenefitz Mind & Body",
                                                  "price": 15,
                                                  "published": true,
                                                  "logo": null,
                                                  "display": "TITLE",
                                                  "data": "{}"
                                              },
                                              "tax": null,
                                              "taxExtended": {
                                                  "planPrice": 15,
                                                  "gstPrice": 0,
                                                  "gstCheck": false,
                                                  "hstPrice": 0,
                                                  "hstCheck": false,
                                                  "pstPrice": 0,
                                                  "pstCheck": false,
                                                  "qstPrice": 0,
                                                  "qstCheck": true,
                                                  "taxUI": "<span>-</span>",
                                                  "tax": 0,
                                                  "totalPrice": 15,
                                                  "totalUI": "$15",
                                                  "total": 15
                                              },
                                              "taxesDataJSON": [
                                                  {
                                                      "tax_name": "HST",
                                                      "tax_code": null,
                                                      "plan_id": 609,
                                                      "plan_product_id": 178463,
                                                      "tax_description": "HST (#709505879RT0001)",
                                                      "business_tax_number": "709505879RT0001",
                                                      "tax_rate": 0.13,
                                                      "tax_sku": "hst"
                                                  }
                                              ],
                                              "calculatedTaxes": {
                                                  "price": 15,
                                                  "tax": 1.9500000000000002,
                                                  "total": 16.95,
                                                  "planProductIds": [
                                                      178463
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "HST",
                                                          "description": "HST (#709505879RT0001)",
                                                          "price": 1.9500000000000002,
                                                          "planProductUniqueId": 178463,
                                                          "isIncluded": true,
                                                          "taxRate": 0.13,
                                                          "taxRatePercentage": "13%"
                                                      }
                                                  ]
                                              },
                                              "calculatedTax": {
                                                  "price": 15,
                                                  "tax": 1.9500000000000002,
                                                  "total": 16.95,
                                                  "planProductIds": [
                                                      178463
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "HST",
                                                          "description": "HST (#709505879RT0001)",
                                                          "price": 1.9500000000000002,
                                                          "planProductUniqueId": 178463,
                                                          "isIncluded": true,
                                                          "taxRate": 0.13,
                                                          "taxRatePercentage": "13%"
                                                      }
                                                  ]
                                              },
                                              "price1": "15.00",
                                              "bundledProducts": [
                                                  "GroupBenefitz Mind & Body"
                                              ],
                                              "planlevel": {
                                                  "id": 21,
                                                  "parentId": 14,
                                                  "name": "Mind & Body",
                                                  "description": null,
                                                  "published": {
                                                      "type": "Buffer",
                                                      "data": [
                                                          1
                                                      ]
                                                  },
                                                  "ordering": 19,
                                                  "level": 2,
                                                  "backgroundColor": "#97579B",
                                                  "textColor": "#FFFFFF",
                                                  "tooltipTitle": "name",
                                                  "disallowedPlanLevels": null,
                                                  "requirePlanLevel": null,
                                                  "childMaxAge": 21,
                                                  "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"name\", \"background_color\": \"#97579B\"}",
                                                  "planLevelFeatures": [
                                                      {
                                                          "id": 114,
                                                          "planLevelId": 21,
                                                          "planFeatureId": 28,
                                                          "description": "Short-term counselling services for individuals and their families; in person, virtual or via phone",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 28,
                                                          "feature": {
                                                              "id": 28,
                                                              "name": "CloudMD Kii",
                                                              "category": null,
                                                              "description": "Basic EAP",
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      }
                                                  ]
                                              },
                                              "description": ""
                                          }
                                      ],
                                      "GroupBenefitz Complete Wellness": [
                                          {
                                              "activationDate": "2023-11-01T00:00:00.000Z",
                                              "businessTaxNumber": null,
                                              "id": 490,
                                              "mandatory": false,
                                              "name": "GroupBenefitz Complete Wellness",
                                              "displayName": null,
                                              "ordering": 1,
                                              "planCoverage": "EMPLOYEE_ASSISTANCE",
                                              "planCoverageUI": "Select",
                                              "planId": 621,
                                              "planProductId": "182813",
                                              "price": 20,
                                              "productId": 23,
                                              "stateId": 12,
                                              "taxCode": null,
                                              "taxDescription": null,
                                              "taxName": null,
                                              "taxSku": null,
                                              "taxesData": "[{\"tax_name\":\"HST\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178463,\"tax_description\":\"HST (#709505879RT0001)\",\"business_tax_number\":\"709505879RT0001\",\"tax_rate\":0.13,\"tax_sku\":\"hst\"}]",
                                              "product_id": 23,
                                              "plan_id": 621,
                                              "product": {
                                                  "backgroundColor": null,
                                                  "code": "groupbenefitzcompletewellnesssinglesku",
                                                  "color": null,
                                                  "fusebillId": "127218",
                                                  "glCode": "53210",
                                                  "id": 23,
                                                  "name": "GroupBenefitz Complete Wellness",
                                                  "price": 20,
                                                  "published": true,
                                                  "logo": null,
                                                  "display": "TITLE",
                                                  "data": "{}"
                                              },
                                              "tax": null,
                                              "taxExtended": {
                                                  "planPrice": 20,
                                                  "gstPrice": 0,
                                                  "gstCheck": false,
                                                  "hstPrice": 0,
                                                  "hstCheck": false,
                                                  "pstPrice": 0,
                                                  "pstCheck": false,
                                                  "qstPrice": 0,
                                                  "qstCheck": true,
                                                  "taxUI": "<span>-</span>",
                                                  "tax": 0,
                                                  "totalPrice": 20,
                                                  "totalUI": "$20",
                                                  "total": 20
                                              },
                                              "taxesDataJSON": [
                                                  {
                                                      "tax_name": "HST",
                                                      "tax_code": null,
                                                      "plan_id": 609,
                                                      "plan_product_id": 178463,
                                                      "tax_description": "HST (#709505879RT0001)",
                                                      "business_tax_number": "709505879RT0001",
                                                      "tax_rate": 0.13,
                                                      "tax_sku": "hst"
                                                  }
                                              ],
                                              "calculatedTaxes": {
                                                  "price": 20,
                                                  "tax": 2.6,
                                                  "total": 22.6,
                                                  "planProductIds": [
                                                      178463
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "HST",
                                                          "description": "HST (#709505879RT0001)",
                                                          "price": 2.6,
                                                          "planProductUniqueId": 178463,
                                                          "isIncluded": true,
                                                          "taxRate": 0.13,
                                                          "taxRatePercentage": "13%"
                                                      }
                                                  ]
                                              },
                                              "calculatedTax": {
                                                  "price": 20,
                                                  "tax": 2.6,
                                                  "total": 22.6,
                                                  "planProductIds": [
                                                      178463
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "HST",
                                                          "description": "HST (#709505879RT0001)",
                                                          "price": 2.6,
                                                          "planProductUniqueId": 178463,
                                                          "isIncluded": true,
                                                          "taxRate": 0.13,
                                                          "taxRatePercentage": "13%"
                                                      }
                                                  ]
                                              },
                                              "price1": "20.00",
                                              "bundledProducts": [
                                                  "GroupBenefitz Complete Wellness"
                                              ],
                                              "planlevel": {
                                                  "id": 20,
                                                  "parentId": 14,
                                                  "name": "Complete Wellness",
                                                  "description": null,
                                                  "published": {
                                                      "type": "Buffer",
                                                      "data": [
                                                          1
                                                      ]
                                                  },
                                                  "ordering": 20,
                                                  "level": 2,
                                                  "backgroundColor": "#684585",
                                                  "textColor": "#FFFFFF",
                                                  "tooltipTitle": "name",
                                                  "disallowedPlanLevels": null,
                                                  "requirePlanLevel": null,
                                                  "childMaxAge": 21,
                                                  "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"name\", \"background_color\": \"#684585\"}",
                                                  "planLevelFeatures": [
                                                      {
                                                          "id": 78,
                                                          "planLevelId": 20,
                                                          "planFeatureId": 28,
                                                          "description": "Short-term counselling services for individuals and their families; in person, virtual or via phone",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 28,
                                                          "feature": {
                                                              "id": 28,
                                                              "name": "CloudMD Kii",
                                                              "category": null,
                                                              "description": "Basic EAP",
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 79,
                                                          "planLevelId": 20,
                                                          "planFeatureId": 29,
                                                          "description": "Virtual ergonomic assessments, conditioning plans and unlimited pain\r\nconsultations with Athletic Therapists\r\nVirtual physiotherapy available at preferred rates",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 29,
                                                          "feature": {
                                                              "id": 29,
                                                              "name": "Phzio MSK360",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 80,
                                                          "planLevelId": 20,
                                                          "planFeatureId": 30,
                                                          "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 30,
                                                          "feature": {
                                                              "id": 30,
                                                              "name": "My Friendly Lawyer",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 82,
                                                          "planLevelId": 20,
                                                          "planFeatureId": 32,
                                                          "description": "Expert-led mental health and wellbeing education platform with Ask the Expert\r\nweb chats, blogs, videos and podcasts",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 32,
                                                          "feature": {
                                                              "id": 32,
                                                              "name": "LifeSpeak",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 83,
                                                          "planLevelId": 20,
                                                          "planFeatureId": 33,
                                                          "description": "Innovative nutrition app optimizes food for health by aligning your individual\r\ndata with specific goals. Detailed reports and guidance serve real life, targeted issues\r\nincluding diabetes and overall wellness",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 33,
                                                          "feature": {
                                                              "id": 33,
                                                              "name": "RxFood",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 84,
                                                          "planLevelId": 20,
                                                          "planFeatureId": 34,
                                                          "description": "Industry-leading virtual fitness support program with unlimited on-demand\r\nhome workout videos and live sessions",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 34,
                                                          "feature": {
                                                              "id": 34,
                                                              "name": "LIFT Session",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 85,
                                                          "planLevelId": 20,
                                                          "planFeatureId": 35,
                                                          "description": "Personal development program helps you live life on your terms while gaining more life and\r\njob satisfaction. Learn how to reduce stress, improve energy and time management, and\r\nachieve work-life balance",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 35,
                                                          "feature": {
                                                              "id": 35,
                                                              "name": "The Solid Ground Method",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 86,
                                                          "planLevelId": 20,
                                                          "planFeatureId": 36,
                                                          "description": "Virtual substance use support with early intervention that helps keep employees at work.\r\nBoard-certified substance use disorder physicians, mental health support, self-assessments,\r\n24/7 resources, and more personalized care\r\nVirtual rehabilitation available; fees apply",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 36,
                                                          "feature": {
                                                              "id": 36,
                                                              "name": "ALAViDA",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      }
                                                  ]
                                              },
                                              "description": ""
                                          }
                                      ]
                                  },
                                  "productAddonssCSS": {
                                      "GroupBenefitz EAP 2.0": {
                                          "backgroundColor": null,
                                          "code": "groupbenefitzeap20singlesku",
                                          "color": null,
                                          "fusebillId": "127217",
                                          "glCode": "53210",
                                          "id": 25,
                                          "name": "GroupBenefitz EAP 2.0",
                                          "price": 5,
                                          "published": true,
                                          "logo": null,
                                          "display": "TITLE",
                                          "data": "{}"
                                      },
                                      "GroupBenefitz Mind & Body": {
                                          "backgroundColor": null,
                                          "code": "groupbenefitzmindbody",
                                          "color": null,
                                          "fusebillId": "123805",
                                          "glCode": "53210",
                                          "id": 24,
                                          "name": "GroupBenefitz Mind & Body",
                                          "price": 15,
                                          "published": true,
                                          "logo": null,
                                          "display": "TITLE",
                                          "data": "{}"
                                      },
                                      "GroupBenefitz Complete Wellness": {
                                          "backgroundColor": null,
                                          "code": "groupbenefitzcompletewellnesssinglesku",
                                          "color": null,
                                          "fusebillId": "127218",
                                          "glCode": "53210",
                                          "id": 23,
                                          "name": "GroupBenefitz Complete Wellness",
                                          "price": 20,
                                          "published": true,
                                          "logo": null,
                                          "display": "TITLE",
                                          "data": "{}"
                                      }
                                  }
                              }
                          ]
                      }
                  ]
              },
              {
                  "description": "Catastrophic Medication Insurance",
                  "id": 3,
                  "logo": null,
                  "name": "Catastrophic Medication Insurance",
                  "published": true,
                  "ordering": 4,
                  "allowMultiple": false,
                  "applyFilters": true,
                  "optIn": false,
                  "groups": [
                      {
                          "id": 10,
                          "parentId": 24,
                          "name": "High-Cost Drugs",
                          "description": null,
                          "published": {
                              "type": "Buffer",
                              "data": [
                                  1
                              ]
                          },
                          "ordering": 12,
                          "level": 2,
                          "backgroundColor": "#433893",
                          "textColor": "#FFFFFF",
                          "tooltipTitle": "name",
                          "disallowedPlanLevels": null,
                          "requirePlanLevel": null,
                          "childMaxAge": 21,
                          "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"name\", \"background_color\": \"#433893\"}",
                          "planLevelFeatures": [
                              {
                                  "id": 61,
                                  "planLevelId": 10,
                                  "planFeatureId": 17,
                                  "description": "$50,000 per family member per policy year.\r\nLimited to lowest cost biosimilar",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 17,
                                  "feature": {
                                      "id": 17,
                                      "name": "Biologic Drugs",
                                      "category": null,
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 62,
                                  "planLevelId": 10,
                                  "planFeatureId": 18,
                                  "description": "$1,000,000 per family member per policy year.",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 18,
                                  "feature": {
                                      "id": 18,
                                      "name": "Overall Drug Coverage",
                                      "category": null,
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 63,
                                  "planLevelId": 10,
                                  "planFeatureId": 19,
                                  "description": "Medications legally requiring a prescription according to the\r\nCanadian Compendium of Pharmaceuticals and ",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 19,
                                  "feature": {
                                      "id": 19,
                                      "name": "Description of Coverage",
                                      "category": null,
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 64,
                                  "planLevelId": 10,
                                  "planFeatureId": 20,
                                  "description": "$5,000 deductible per family member per policy year.",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 20,
                                  "feature": {
                                      "id": 20,
                                      "name": "Annual Deductible",
                                      "category": null,
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 65,
                                  "planLevelId": 10,
                                  "planFeatureId": 21,
                                  "description": "24 months",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 21,
                                  "feature": {
                                      "id": 21,
                                      "name": "Pre-existing Condition Clause*",
                                      "category": null,
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 104,
                                  "planLevelId": 10,
                                  "planFeatureId": 42,
                                  "description": "MedHelper - advice from clinical pharmacists on optimal and safe medication care plans.",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 42,
                                  "feature": {
                                      "id": 42,
                                      "name": "Medication Review",
                                      "category": "Complete Executive Care",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              }
                          ],
                          "plans": [
                              {
                                  "activationDate": null,
                                  "advisorCommissionAmount": null,
                                  "advisorCommissionRate": null,
                                  "code": "groupbenefitzhighcostdrugs",
                                  "commissionHouseAmount": null,
                                  "commissionHouseRate": null,
                                  "corporatePlan": false,
                                  "cost": null,
                                  "description": "Health Insurance - (High Cost Drugs) ",
                                  "equitableInsurerTaxAmount": null,
                                  "equitableInsurerTaxRate": null,
                                  "equitableInsurerTotalAmount": null,
                                  "frqMonthly": "104585",
                                  "frqYearly": null,
                                  "fusebillId": "48093",
                                  "id": 620,
                                  "insuranceCompanyId": null,
                                  "isMonthlyCost": null,
                                  "jsonData": {
                                      "maximum_age": 75,
                                      "start_date": "2023-09-01T00:00:00.000Z",
                                      "end_date": "2024-08-31T00:00:00.000Z"
                                  },
                                  "logo": null,
                                  "maxAge": null,
                                  "minAge": null,
                                  "name": "GroupBenefitz High Cost Drugs",
                                  "ordering": null,
                                  "packageId": 3,
                                  "planCost": null,
                                  "planCoverage": "HIGH_COST_DRUGS",
                                  "planLevel": 10,
                                  "published": {
                                      "type": "Buffer",
                                      "data": [
                                          1
                                      ]
                                  },
                                  "singleSku": true,
                                  "isBundle": true,
                                  "isMandatory": true,
                                  "isTaxPlan": false,
                                  "showBundledProducts": false,
                                  "customBundleName": null,
                                  "restrictedAccess": null,
                                  "plan_level": 10,
                                  "package_id": 3,
                                  "planLevels": {
                                      "id": 10,
                                      "parentId": 24,
                                      "name": "High-Cost Drugs",
                                      "description": null,
                                      "published": {
                                          "type": "Buffer",
                                          "data": [
                                              1
                                          ]
                                      },
                                      "ordering": 12,
                                      "level": 2,
                                      "backgroundColor": "#433893",
                                      "textColor": "#FFFFFF",
                                      "tooltipTitle": "name",
                                      "disallowedPlanLevels": null,
                                      "requirePlanLevel": null,
                                      "childMaxAge": 21,
                                      "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"name\", \"background_color\": \"#433893\"}"
                                  },
                                  "productAddons": [
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 452,
                                          "mandatory": false,
                                          "name": "Single",
                                          "displayName": null,
                                          "description": null,
                                          "published": true,
                                          "ordering": 1,
                                          "planCoverage": "SINGLE",
                                          "planId": 620,
                                          "planProductId": "182918",
                                          "price": 15,
                                          "productId": 7,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                          "productType": "BOTH",
                                          "planLevel": null,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 1.5, \"commission_house_amount_based_upon_premium_price\": 0.75}",
                                          "restrictedAccess": null,
                                          "product_id": 7,
                                          "plan_id": 620,
                                          "plan_level": null,
                                          "product": {
                                              "backgroundColor": "#212A3E",
                                              "code": "single",
                                              "color": "#FFFFFF",
                                              "fusebillId": "126187",
                                              "glCode": "73210",
                                              "id": 7,
                                              "name": "Single",
                                              "price": 229.72,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}",
                                              "productFeatureCategories": [
                                                  {
                                                      "description": null,
                                                      "id": 11,
                                                      "name": "Health & Dental Insurance",
                                                      "ordering": 1,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Prescription Drugs",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                              "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                              "id": 1,
                                                              "ordering": 1,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Professional Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                              "content": "",
                                                              "id": 5,
                                                              "ordering": 2,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Vision",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 10,
                                                              "ordering": 3,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Medical Supplies & Equipment",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 11,
                                                              "ordering": 4,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Travel Insurance",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                              "content": null,
                                                              "id": 12,
                                                              "ordering": 5,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Basic Dental Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                              "content": null,
                                                              "id": 13,
                                                              "ordering": 6,
                                                              "category_id": 11
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": null,
                                                      "id": 12,
                                                      "name": "GroupBenefitz Complete Wellness ",
                                                      "ordering": 2,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 12,
                                                              "title": "CloudMD Kii",
                                                              "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                              "content": null,
                                                              "id": 14,
                                                              "ordering": 1,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "Phzio MSK360",
                                                              "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                              "content": null,
                                                              "id": 15,
                                                              "ordering": 2,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "My Friendly Lawyer",
                                                              "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                              "content": null,
                                                              "id": 16,
                                                              "ordering": 3,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LifeSpeak",
                                                              "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                              "content": null,
                                                              "id": 17,
                                                              "ordering": 4,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "RxFood",
                                                              "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                              "content": null,
                                                              "id": 18,
                                                              "ordering": 5,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LIFT Session",
                                                              "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                              "content": null,
                                                              "id": 19,
                                                              "ordering": 6,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "The Solid Ground Method",
                                                              "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                              "content": null,
                                                              "id": 20,
                                                              "ordering": 7,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "ALAViDA",
                                                              "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                              "content": null,
                                                              "id": 21,
                                                              "ordering": 8,
                                                              "category_id": 12
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                      "id": 1,
                                                      "name": "Critical Illness Insurance",
                                                      "ordering": 3,
                                                      "published": true
                                                  }
                                              ]
                                          },
                                          "tax": null
                                      }
                                  ],
                                  "productAddonss": {
                                      "GroupBenefitz High Cost Drugs": [
                                          {
                                              "activationDate": "2023-11-01T00:00:00.000Z",
                                              "businessTaxNumber": null,
                                              "id": 452,
                                              "mandatory": false,
                                              "name": "GroupBenefitz High Cost Drugs",
                                              "displayName": null,
                                              "ordering": 1,
                                              "planCoverage": "SINGLE",
                                              "planCoverageUI": "Single",
                                              "planId": 620,
                                              "planProductId": "182918",
                                              "price": 15,
                                              "productId": 7,
                                              "stateId": 12,
                                              "taxCode": null,
                                              "taxDescription": null,
                                              "taxName": null,
                                              "taxSku": null,
                                              "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                              "product_id": 7,
                                              "plan_id": 620,
                                              "product": {
                                                  "backgroundColor": "#212A3E",
                                                  "code": "single",
                                                  "color": "#FFFFFF",
                                                  "fusebillId": "126187",
                                                  "glCode": "73210",
                                                  "id": 7,
                                                  "name": "Single",
                                                  "price": 229.72,
                                                  "published": true,
                                                  "logo": null,
                                                  "display": "TITLE",
                                                  "data": "{}",
                                                  "productFeatureCategories": [
                                                      {
                                                          "description": null,
                                                          "id": 11,
                                                          "name": "Health & Dental Insurance",
                                                          "ordering": 1,
                                                          "published": true,
                                                          "productFeatureItems": [
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Prescription Drugs",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                                  "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                                  "id": 1,
                                                                  "ordering": 1,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Professional Services",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                                  "content": "",
                                                                  "id": 5,
                                                                  "ordering": 2,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Vision",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                                  "content": null,
                                                                  "id": 10,
                                                                  "ordering": 3,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Medical Supplies & Equipment",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                                  "content": null,
                                                                  "id": 11,
                                                                  "ordering": 4,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Travel Insurance",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                                  "content": null,
                                                                  "id": 12,
                                                                  "ordering": 5,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Basic Dental Services",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                                  "content": null,
                                                                  "id": 13,
                                                                  "ordering": 6,
                                                                  "category_id": 11
                                                              }
                                                          ]
                                                      },
                                                      {
                                                          "description": null,
                                                          "id": 12,
                                                          "name": "GroupBenefitz Complete Wellness ",
                                                          "ordering": 2,
                                                          "published": true,
                                                          "productFeatureItems": [
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "CloudMD Kii",
                                                                  "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                                  "content": null,
                                                                  "id": 14,
                                                                  "ordering": 1,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "Phzio MSK360",
                                                                  "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                                  "content": null,
                                                                  "id": 15,
                                                                  "ordering": 2,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "My Friendly Lawyer",
                                                                  "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                                  "content": null,
                                                                  "id": 16,
                                                                  "ordering": 3,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "LifeSpeak",
                                                                  "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                                  "content": null,
                                                                  "id": 17,
                                                                  "ordering": 4,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "RxFood",
                                                                  "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                                  "content": null,
                                                                  "id": 18,
                                                                  "ordering": 5,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "LIFT Session",
                                                                  "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                                  "content": null,
                                                                  "id": 19,
                                                                  "ordering": 6,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "The Solid Ground Method",
                                                                  "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                                  "content": null,
                                                                  "id": 20,
                                                                  "ordering": 7,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "ALAViDA",
                                                                  "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                                  "content": null,
                                                                  "id": 21,
                                                                  "ordering": 8,
                                                                  "category_id": 12
                                                              }
                                                          ]
                                                      },
                                                      {
                                                          "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                          "id": 1,
                                                          "name": "Critical Illness Insurance",
                                                          "ordering": 3,
                                                          "published": true
                                                      }
                                                  ]
                                              },
                                              "tax": null,
                                              "taxesDataJSON": [
                                                  {
                                                      "tax_name": "PST ON HEALTH INSURANCE",
                                                      "tax_code": null,
                                                      "plan_id": 609,
                                                      "plan_product_id": 178464,
                                                      "tax_description": "PST on Health Insurance (#709505879TR0001)",
                                                      "business_tax_number": "709505879TR0001",
                                                      "tax_rate": 0.08,
                                                      "tax_sku": "pstonhealthinsurance"
                                                  }
                                              ],
                                              "calculatedTax": {
                                                  "price": 15,
                                                  "tax": 1.2,
                                                  "total": 16.2,
                                                  "planProductIds": [
                                                      178464
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "PST ON HEALTH INSURANCE",
                                                          "description": "PST on Health Insurance (#709505879TR0001)",
                                                          "price": 1.2,
                                                          "planProductUniqueId": 178464,
                                                          "isIncluded": true,
                                                          "taxRate": 0.08,
                                                          "taxRatePercentage": "8%"
                                                      }
                                                  ]
                                              },
                                              "price1": "15.00",
                                              "bundledProducts": [
                                                  "Single"
                                              ],
                                              "planlevel": 10,
                                              "description": " Single"
                                          }
                                      ]
                                  },
                                  "productAddonssCSS": {
                                      "GroupBenefitz High Cost Drugs": {
                                          "backgroundColor": "#212A3E",
                                          "code": "single",
                                          "color": "#FFFFFF",
                                          "fusebillId": "126187",
                                          "glCode": "73210",
                                          "id": 7,
                                          "name": "Single",
                                          "price": 229.72,
                                          "published": true,
                                          "logo": null,
                                          "display": "TITLE",
                                          "data": "{}",
                                          "productFeatureCategories": [
                                              {
                                                  "description": null,
                                                  "id": 11,
                                                  "name": "Health & Dental Insurance",
                                                  "ordering": 1,
                                                  "published": true,
                                                  "productFeatureItems": [
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Prescription Drugs",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                          "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                          "id": 1,
                                                          "ordering": 1,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Professional Services",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                          "content": "",
                                                          "id": 5,
                                                          "ordering": 2,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Vision",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                          "content": null,
                                                          "id": 10,
                                                          "ordering": 3,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Medical Supplies & Equipment",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                          "content": null,
                                                          "id": 11,
                                                          "ordering": 4,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Travel Insurance",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                          "content": null,
                                                          "id": 12,
                                                          "ordering": 5,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Basic Dental Services",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                          "content": null,
                                                          "id": 13,
                                                          "ordering": 6,
                                                          "category_id": 11
                                                      }
                                                  ]
                                              },
                                              {
                                                  "description": null,
                                                  "id": 12,
                                                  "name": "GroupBenefitz Complete Wellness ",
                                                  "ordering": 2,
                                                  "published": true,
                                                  "productFeatureItems": [
                                                      {
                                                          "categoryId": 12,
                                                          "title": "CloudMD Kii",
                                                          "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                          "content": null,
                                                          "id": 14,
                                                          "ordering": 1,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "Phzio MSK360",
                                                          "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                          "content": null,
                                                          "id": 15,
                                                          "ordering": 2,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "My Friendly Lawyer",
                                                          "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                          "content": null,
                                                          "id": 16,
                                                          "ordering": 3,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "LifeSpeak",
                                                          "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                          "content": null,
                                                          "id": 17,
                                                          "ordering": 4,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "RxFood",
                                                          "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                          "content": null,
                                                          "id": 18,
                                                          "ordering": 5,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "LIFT Session",
                                                          "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                          "content": null,
                                                          "id": 19,
                                                          "ordering": 6,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "The Solid Ground Method",
                                                          "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                          "content": null,
                                                          "id": 20,
                                                          "ordering": 7,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "ALAViDA",
                                                          "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                          "content": null,
                                                          "id": 21,
                                                          "ordering": 8,
                                                          "category_id": 12
                                                      }
                                                  ]
                                              },
                                              {
                                                  "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                  "id": 1,
                                                  "name": "Critical Illness Insurance",
                                                  "ordering": 3,
                                                  "published": true
                                              }
                                          ]
                                      }
                                  }
                              }
                          ]
                      }
                  ]
              },
              {
                  "description": "Accident & Serious Illness Disability Insurance",
                  "id": 4,
                  "logo": null,
                  "name": "Accident & Serious Illness Disability Insurance",
                  "published": true,
                  "ordering": 5,
                  "allowMultiple": false,
                  "applyFilters": true,
                  "optIn": false,
                  "groups": [
                      {
                          "id": 11,
                          "parentId": null,
                          "name": "Protect",
                          "description": null,
                          "published": {
                              "type": "Buffer",
                              "data": [
                                  1
                              ]
                          },
                          "ordering": 13,
                          "level": 1,
                          "backgroundColor": "#384C9F",
                          "textColor": null,
                          "tooltipTitle": "name",
                          "disallowedPlanLevels": null,
                          "requirePlanLevel": null,
                          "childMaxAge": 21,
                          "data": "{\"text_color\": null, \"tooltip_title\": \"name\", \"background_color\": \"#384C9F\"}",
                          "plans": [
                              {
                                  "activationDate": null,
                                  "advisorCommissionAmount": null,
                                  "advisorCommissionRate": null,
                                  "code": "groupbenefitzprotectsinglesku",
                                  "commissionHouseAmount": null,
                                  "commissionHouseRate": null,
                                  "corporatePlan": false,
                                  "cost": null,
                                  "description": "Income Replacement Insurance",
                                  "equitableInsurerTaxAmount": null,
                                  "equitableInsurerTaxRate": null,
                                  "equitableInsurerTotalAmount": null,
                                  "frqMonthly": "106701",
                                  "frqYearly": null,
                                  "fusebillId": "49631",
                                  "id": 619,
                                  "insuranceCompanyId": null,
                                  "isMonthlyCost": null,
                                  "jsonData": {
                                      "maximum_age": 65
                                  },
                                  "logo": null,
                                  "maxAge": null,
                                  "minAge": null,
                                  "name": "GroupBenefitz Protect",
                                  "ordering": null,
                                  "packageId": 4,
                                  "planCost": null,
                                  "planCoverage": "EMPLOYEE_ASSISTANCE",
                                  "planLevel": 11,
                                  "published": {
                                      "type": "Buffer",
                                      "data": [
                                          1
                                      ]
                                  },
                                  "singleSku": true,
                                  "isBundle": false,
                                  "isMandatory": true,
                                  "isTaxPlan": false,
                                  "showBundledProducts": false,
                                  "customBundleName": null,
                                  "restrictedAccess": null,
                                  "plan_level": 11,
                                  "package_id": 4,
                                  "planLevels": {
                                      "id": 11,
                                      "parentId": null,
                                      "name": "Protect",
                                      "description": null,
                                      "published": {
                                          "type": "Buffer",
                                          "data": [
                                              1
                                          ]
                                      },
                                      "ordering": 13,
                                      "level": 1,
                                      "backgroundColor": "#384C9F",
                                      "textColor": null,
                                      "tooltipTitle": "name",
                                      "disallowedPlanLevels": null,
                                      "requirePlanLevel": null,
                                      "childMaxAge": 21,
                                      "data": "{\"text_color\": null, \"tooltip_title\": \"name\", \"background_color\": \"#384C9F\"}"
                                  },
                                  "productAddons": [
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 432,
                                          "mandatory": false,
                                          "name": "Protect 100",
                                          "displayName": null,
                                          "description": "",
                                          "published": true,
                                          "ordering": 1,
                                          "planCoverage": "EMPLOYEE_ASSISTANCE",
                                          "planId": 619,
                                          "planProductId": "182806",
                                          "price": 30,
                                          "productId": 21,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                          "productType": "BOTH",
                                          "planLevel": 12,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 3, \"commission_house_amount_based_upon_premium_price\": 1.5}",
                                          "restrictedAccess": null,
                                          "product_id": 21,
                                          "plan_id": 619,
                                          "plan_level": 12,
                                          "product": {
                                              "backgroundColor": null,
                                              "code": "protect100",
                                              "color": null,
                                              "fusebillId": "127215",
                                              "glCode": "53210",
                                              "id": 21,
                                              "name": "Protect 100",
                                              "price": 30,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}"
                                          },
                                          "planlevel": {
                                              "id": 12,
                                              "parentId": 11,
                                              "name": "Protect 100",
                                              "description": null,
                                              "published": {
                                                  "type": "Buffer",
                                                  "data": [
                                                      1
                                                  ]
                                              },
                                              "ordering": 14,
                                              "level": 2,
                                              "backgroundColor": "#384C9F",
                                              "textColor": "#FFFFFF",
                                              "tooltipTitle": "name",
                                              "disallowedPlanLevels": null,
                                              "requirePlanLevel": null,
                                              "childMaxAge": 21,
                                              "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"name\", \"background_color\": \"#384C9F\"}",
                                              "planLevelFeatures": [
                                                  {
                                                      "id": 66,
                                                      "planLevelId": 12,
                                                      "planFeatureId": 22,
                                                      "description": "70% of income up to\r\n$1,000/week for up to 17 weeks",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 22,
                                                      "feature": {
                                                          "id": 22,
                                                          "name": "Weekly benefit for income loss due\r\nto accident",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 68,
                                                      "planLevelId": 12,
                                                      "planFeatureId": 23,
                                                      "description": "$1,000/month for up to 24 months",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 23,
                                                      "feature": {
                                                          "id": 23,
                                                          "name": "Monthly income on prolonged\r\ninability to work due to accident or\r\nserious physical illness",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 70,
                                                      "planLevelId": 12,
                                                      "planFeatureId": 24,
                                                      "description": "$100,000 total after 52 weeks",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 24,
                                                      "feature": {
                                                          "id": 24,
                                                          "name": "Permanent total disability benefit",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 72,
                                                      "planLevelId": 12,
                                                      "planFeatureId": 25,
                                                      "description": "$5,000 lump sum",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 25,
                                                      "feature": {
                                                          "id": 25,
                                                          "name": "Integrated Serious Illness Benefits\r\n(Includes: cancer (life-threatening), heart attack, kidney failure, stroke (cerebrovascular))",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 74,
                                                      "planLevelId": 12,
                                                      "planFeatureId": 26,
                                                      "description": "$100,000 lump sum",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 26,
                                                      "feature": {
                                                          "id": 26,
                                                          "name": "Accidental Death and\r\nDismemberment",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 76,
                                                      "planLevelId": 12,
                                                      "planFeatureId": 27,
                                                      "description": "Accidental dental; rehabilitation; funeral; bereavement; spousal retraining; special education; daycare; family transportation; home, vehicle, workplace alteration; hospital confinement; parental care.",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 27,
                                                      "feature": {
                                                          "id": 27,
                                                          "name": "Additional benefit coverage",
                                                          "category": null,
                                                          "description": "See plan booklet for benefit details and amounts",
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  }
                                              ]
                                          },
                                          "tax": null,
                                          "taxExtended": {
                                              "planPrice": 30,
                                              "gstPrice": 0,
                                              "gstCheck": false,
                                              "hstPrice": 0,
                                              "hstCheck": false,
                                              "pstPrice": 0,
                                              "pstCheck": false,
                                              "qstPrice": 0,
                                              "qstCheck": true,
                                              "taxUI": "<span>-</span>",
                                              "tax": 0,
                                              "totalPrice": 30,
                                              "totalUI": "$30",
                                              "total": 30
                                          },
                                          "taxesDataJSON": [
                                              {
                                                  "tax_name": "PST ON HEALTH INSURANCE",
                                                  "tax_code": null,
                                                  "plan_id": 609,
                                                  "plan_product_id": 178464,
                                                  "tax_description": "PST on Health Insurance (#709505879TR0001)",
                                                  "business_tax_number": "709505879TR0001",
                                                  "tax_rate": 0.08,
                                                  "tax_sku": "pstonhealthinsurance"
                                              }
                                          ],
                                          "calculatedTaxes": {
                                              "price": 30,
                                              "tax": 2.4,
                                              "total": 32.4,
                                              "planProductIds": [
                                                  178464
                                              ],
                                              "planProductInfos": [
                                                  {
                                                      "name": "PST ON HEALTH INSURANCE",
                                                      "description": "PST on Health Insurance (#709505879TR0001)",
                                                      "price": 2.4,
                                                      "planProductUniqueId": 178464,
                                                      "isIncluded": true,
                                                      "taxRate": 0.08,
                                                      "taxRatePercentage": "8%"
                                                  }
                                              ]
                                          },
                                          "calculatedTax": {
                                              "price": 30,
                                              "tax": 2.4,
                                              "total": 32.4,
                                              "planProductIds": [
                                                  178464
                                              ],
                                              "planProductInfos": [
                                                  {
                                                      "name": "PST ON HEALTH INSURANCE",
                                                      "description": "PST on Health Insurance (#709505879TR0001)",
                                                      "price": 2.4,
                                                      "planProductUniqueId": 178464,
                                                      "isIncluded": true,
                                                      "taxRate": 0.08,
                                                      "taxRatePercentage": "8%"
                                                  }
                                              ]
                                          },
                                          "price1": "30.00",
                                          "bundledProducts": [
                                              "Protect 100"
                                          ]
                                      },
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 442,
                                          "mandatory": false,
                                          "name": "Protect 200",
                                          "displayName": null,
                                          "description": "",
                                          "published": true,
                                          "ordering": 1,
                                          "planCoverage": "EMPLOYEE_ASSISTANCE",
                                          "planId": 619,
                                          "planProductId": "182808",
                                          "price": 60,
                                          "productId": 20,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                          "productType": "BOTH",
                                          "planLevel": 13,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 6, \"commission_house_amount_based_upon_premium_price\": 3}",
                                          "restrictedAccess": null,
                                          "product_id": 20,
                                          "plan_id": 619,
                                          "plan_level": 13,
                                          "product": {
                                              "backgroundColor": null,
                                              "code": "protect200",
                                              "color": null,
                                              "fusebillId": "127216",
                                              "glCode": "53210",
                                              "id": 20,
                                              "name": "Protect 200",
                                              "price": 60,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}"
                                          },
                                          "planlevel": {
                                              "id": 13,
                                              "parentId": 11,
                                              "name": "Protect 200",
                                              "description": null,
                                              "published": {
                                                  "type": "Buffer",
                                                  "data": [
                                                      1
                                                  ]
                                              },
                                              "ordering": 15,
                                              "level": 2,
                                              "backgroundColor": "#384C9F",
                                              "textColor": "#FFFFFF",
                                              "tooltipTitle": "name",
                                              "disallowedPlanLevels": null,
                                              "requirePlanLevel": null,
                                              "childMaxAge": 21,
                                              "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"name\", \"background_color\": \"#384C9F\"}",
                                              "planLevelFeatures": [
                                                  {
                                                      "id": 67,
                                                      "planLevelId": 13,
                                                      "planFeatureId": 22,
                                                      "description": "70% of income up to\r\n$1,000/week for up to 17 weeks",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 22,
                                                      "feature": {
                                                          "id": 22,
                                                          "name": "Weekly benefit for income loss due\r\nto accident",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 69,
                                                      "planLevelId": 13,
                                                      "planFeatureId": 23,
                                                      "description": "$2,000/month for up to 24 months",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 23,
                                                      "feature": {
                                                          "id": 23,
                                                          "name": "Monthly income on prolonged\r\ninability to work due to accident or\r\nserious physical illness",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 71,
                                                      "planLevelId": 13,
                                                      "planFeatureId": 24,
                                                      "description": "$200,000 total after 52 weeks",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 24,
                                                      "feature": {
                                                          "id": 24,
                                                          "name": "Permanent total disability benefit",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 73,
                                                      "planLevelId": 13,
                                                      "planFeatureId": 25,
                                                      "description": "$10,000 lump sum",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 25,
                                                      "feature": {
                                                          "id": 25,
                                                          "name": "Integrated Serious Illness Benefits\r\n(Includes: cancer (life-threatening), heart attack, kidney failure, stroke (cerebrovascular))",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 75,
                                                      "planLevelId": 13,
                                                      "planFeatureId": 26,
                                                      "description": "$200,000 lump sum",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 26,
                                                      "feature": {
                                                          "id": 26,
                                                          "name": "Accidental Death and\r\nDismemberment",
                                                          "category": null,
                                                          "description": null,
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  },
                                                  {
                                                      "id": 77,
                                                      "planLevelId": 13,
                                                      "planFeatureId": 27,
                                                      "description": "Accidental dental; rehabilitation; funeral; bereavement; spousal retraining; special education; daycare; family transportation; home, vehicle, workplace alteration; hospital confinement; parental care.",
                                                      "ordering": 0,
                                                      "content": null,
                                                      "plan_feature_id": 27,
                                                      "feature": {
                                                          "id": 27,
                                                          "name": "Additional benefit coverage",
                                                          "category": null,
                                                          "description": "See plan booklet for benefit details and amounts",
                                                          "published": true,
                                                          "ordering": 0
                                                      }
                                                  }
                                              ]
                                          },
                                          "tax": null,
                                          "taxExtended": {
                                              "planPrice": 60,
                                              "gstPrice": 0,
                                              "gstCheck": false,
                                              "hstPrice": 0,
                                              "hstCheck": false,
                                              "pstPrice": 0,
                                              "pstCheck": false,
                                              "qstPrice": 0,
                                              "qstCheck": true,
                                              "taxUI": "<span>-</span>",
                                              "tax": 0,
                                              "totalPrice": 60,
                                              "totalUI": "$60",
                                              "total": 60
                                          },
                                          "taxesDataJSON": [
                                              {
                                                  "tax_name": "PST ON HEALTH INSURANCE",
                                                  "tax_code": null,
                                                  "plan_id": 609,
                                                  "plan_product_id": 178464,
                                                  "tax_description": "PST on Health Insurance (#709505879TR0001)",
                                                  "business_tax_number": "709505879TR0001",
                                                  "tax_rate": 0.08,
                                                  "tax_sku": "pstonhealthinsurance"
                                              }
                                          ],
                                          "calculatedTaxes": {
                                              "price": 60,
                                              "tax": 4.8,
                                              "total": 64.8,
                                              "planProductIds": [
                                                  178464
                                              ],
                                              "planProductInfos": [
                                                  {
                                                      "name": "PST ON HEALTH INSURANCE",
                                                      "description": "PST on Health Insurance (#709505879TR0001)",
                                                      "price": 4.8,
                                                      "planProductUniqueId": 178464,
                                                      "isIncluded": true,
                                                      "taxRate": 0.08,
                                                      "taxRatePercentage": "8%"
                                                  }
                                              ]
                                          },
                                          "calculatedTax": {
                                              "price": 60,
                                              "tax": 4.8,
                                              "total": 64.8,
                                              "planProductIds": [
                                                  178464
                                              ],
                                              "planProductInfos": [
                                                  {
                                                      "name": "PST ON HEALTH INSURANCE",
                                                      "description": "PST on Health Insurance (#709505879TR0001)",
                                                      "price": 4.8,
                                                      "planProductUniqueId": 178464,
                                                      "isIncluded": true,
                                                      "taxRate": 0.08,
                                                      "taxRatePercentage": "8%"
                                                  }
                                              ]
                                          },
                                          "price1": "60.00",
                                          "bundledProducts": [
                                              "Protect 200"
                                          ]
                                      }
                                  ],
                                  "productAddonss": {
                                      "Protect 100": [
                                          {
                                              "activationDate": "2023-11-01T00:00:00.000Z",
                                              "businessTaxNumber": null,
                                              "id": 432,
                                              "mandatory": false,
                                              "name": "Protect 100",
                                              "displayName": null,
                                              "ordering": 1,
                                              "planCoverage": "EMPLOYEE_ASSISTANCE",
                                              "planCoverageUI": "Select",
                                              "planId": 619,
                                              "planProductId": "182806",
                                              "price": 30,
                                              "productId": 21,
                                              "stateId": 12,
                                              "taxCode": null,
                                              "taxDescription": null,
                                              "taxName": null,
                                              "taxSku": null,
                                              "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                              "product_id": 21,
                                              "plan_id": 619,
                                              "product": {
                                                  "backgroundColor": null,
                                                  "code": "protect100",
                                                  "color": null,
                                                  "fusebillId": "127215",
                                                  "glCode": "53210",
                                                  "id": 21,
                                                  "name": "Protect 100",
                                                  "price": 30,
                                                  "published": true,
                                                  "logo": null,
                                                  "display": "TITLE",
                                                  "data": "{}"
                                              },
                                              "tax": null,
                                              "taxExtended": {
                                                  "planPrice": 30,
                                                  "gstPrice": 0,
                                                  "gstCheck": false,
                                                  "hstPrice": 0,
                                                  "hstCheck": false,
                                                  "pstPrice": 0,
                                                  "pstCheck": false,
                                                  "qstPrice": 0,
                                                  "qstCheck": true,
                                                  "taxUI": "<span>-</span>",
                                                  "tax": 0,
                                                  "totalPrice": 30,
                                                  "totalUI": "$30",
                                                  "total": 30
                                              },
                                              "taxesDataJSON": [
                                                  {
                                                      "tax_name": "PST ON HEALTH INSURANCE",
                                                      "tax_code": null,
                                                      "plan_id": 609,
                                                      "plan_product_id": 178464,
                                                      "tax_description": "PST on Health Insurance (#709505879TR0001)",
                                                      "business_tax_number": "709505879TR0001",
                                                      "tax_rate": 0.08,
                                                      "tax_sku": "pstonhealthinsurance"
                                                  }
                                              ],
                                              "calculatedTaxes": {
                                                  "price": 30,
                                                  "tax": 2.4,
                                                  "total": 32.4,
                                                  "planProductIds": [
                                                      178464
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "PST ON HEALTH INSURANCE",
                                                          "description": "PST on Health Insurance (#709505879TR0001)",
                                                          "price": 2.4,
                                                          "planProductUniqueId": 178464,
                                                          "isIncluded": true,
                                                          "taxRate": 0.08,
                                                          "taxRatePercentage": "8%"
                                                      }
                                                  ]
                                              },
                                              "calculatedTax": {
                                                  "price": 30,
                                                  "tax": 2.4,
                                                  "total": 32.4,
                                                  "planProductIds": [
                                                      178464
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "PST ON HEALTH INSURANCE",
                                                          "description": "PST on Health Insurance (#709505879TR0001)",
                                                          "price": 2.4,
                                                          "planProductUniqueId": 178464,
                                                          "isIncluded": true,
                                                          "taxRate": 0.08,
                                                          "taxRatePercentage": "8%"
                                                      }
                                                  ]
                                              },
                                              "price1": "30.00",
                                              "bundledProducts": [
                                                  "Protect 100"
                                              ],
                                              "planlevel": {
                                                  "id": 12,
                                                  "parentId": 11,
                                                  "name": "Protect 100",
                                                  "description": null,
                                                  "published": {
                                                      "type": "Buffer",
                                                      "data": [
                                                          1
                                                      ]
                                                  },
                                                  "ordering": 14,
                                                  "level": 2,
                                                  "backgroundColor": "#384C9F",
                                                  "textColor": "#FFFFFF",
                                                  "tooltipTitle": "name",
                                                  "disallowedPlanLevels": null,
                                                  "requirePlanLevel": null,
                                                  "childMaxAge": 21,
                                                  "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"name\", \"background_color\": \"#384C9F\"}",
                                                  "planLevelFeatures": [
                                                      {
                                                          "id": 66,
                                                          "planLevelId": 12,
                                                          "planFeatureId": 22,
                                                          "description": "70% of income up to\r\n$1,000/week for up to 17 weeks",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 22,
                                                          "feature": {
                                                              "id": 22,
                                                              "name": "Weekly benefit for income loss due\r\nto accident",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 68,
                                                          "planLevelId": 12,
                                                          "planFeatureId": 23,
                                                          "description": "$1,000/month for up to 24 months",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 23,
                                                          "feature": {
                                                              "id": 23,
                                                              "name": "Monthly income on prolonged\r\ninability to work due to accident or\r\nserious physical illness",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 70,
                                                          "planLevelId": 12,
                                                          "planFeatureId": 24,
                                                          "description": "$100,000 total after 52 weeks",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 24,
                                                          "feature": {
                                                              "id": 24,
                                                              "name": "Permanent total disability benefit",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 72,
                                                          "planLevelId": 12,
                                                          "planFeatureId": 25,
                                                          "description": "$5,000 lump sum",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 25,
                                                          "feature": {
                                                              "id": 25,
                                                              "name": "Integrated Serious Illness Benefits\r\n(Includes: cancer (life-threatening), heart attack, kidney failure, stroke (cerebrovascular))",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 74,
                                                          "planLevelId": 12,
                                                          "planFeatureId": 26,
                                                          "description": "$100,000 lump sum",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 26,
                                                          "feature": {
                                                              "id": 26,
                                                              "name": "Accidental Death and\r\nDismemberment",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 76,
                                                          "planLevelId": 12,
                                                          "planFeatureId": 27,
                                                          "description": "Accidental dental; rehabilitation; funeral; bereavement; spousal retraining; special education; daycare; family transportation; home, vehicle, workplace alteration; hospital confinement; parental care.",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 27,
                                                          "feature": {
                                                              "id": 27,
                                                              "name": "Additional benefit coverage",
                                                              "category": null,
                                                              "description": "See plan booklet for benefit details and amounts",
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      }
                                                  ]
                                              },
                                              "description": ""
                                          }
                                      ],
                                      "Protect 200": [
                                          {
                                              "activationDate": "2023-11-01T00:00:00.000Z",
                                              "businessTaxNumber": null,
                                              "id": 442,
                                              "mandatory": false,
                                              "name": "Protect 200",
                                              "displayName": null,
                                              "ordering": 1,
                                              "planCoverage": "EMPLOYEE_ASSISTANCE",
                                              "planCoverageUI": "Select",
                                              "planId": 619,
                                              "planProductId": "182808",
                                              "price": 60,
                                              "productId": 20,
                                              "stateId": 12,
                                              "taxCode": null,
                                              "taxDescription": null,
                                              "taxName": null,
                                              "taxSku": null,
                                              "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                              "product_id": 20,
                                              "plan_id": 619,
                                              "product": {
                                                  "backgroundColor": null,
                                                  "code": "protect200",
                                                  "color": null,
                                                  "fusebillId": "127216",
                                                  "glCode": "53210",
                                                  "id": 20,
                                                  "name": "Protect 200",
                                                  "price": 60,
                                                  "published": true,
                                                  "logo": null,
                                                  "display": "TITLE",
                                                  "data": "{}"
                                              },
                                              "tax": null,
                                              "taxExtended": {
                                                  "planPrice": 60,
                                                  "gstPrice": 0,
                                                  "gstCheck": false,
                                                  "hstPrice": 0,
                                                  "hstCheck": false,
                                                  "pstPrice": 0,
                                                  "pstCheck": false,
                                                  "qstPrice": 0,
                                                  "qstCheck": true,
                                                  "taxUI": "<span>-</span>",
                                                  "tax": 0,
                                                  "totalPrice": 60,
                                                  "totalUI": "$60",
                                                  "total": 60
                                              },
                                              "taxesDataJSON": [
                                                  {
                                                      "tax_name": "PST ON HEALTH INSURANCE",
                                                      "tax_code": null,
                                                      "plan_id": 609,
                                                      "plan_product_id": 178464,
                                                      "tax_description": "PST on Health Insurance (#709505879TR0001)",
                                                      "business_tax_number": "709505879TR0001",
                                                      "tax_rate": 0.08,
                                                      "tax_sku": "pstonhealthinsurance"
                                                  }
                                              ],
                                              "calculatedTaxes": {
                                                  "price": 60,
                                                  "tax": 4.8,
                                                  "total": 64.8,
                                                  "planProductIds": [
                                                      178464
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "PST ON HEALTH INSURANCE",
                                                          "description": "PST on Health Insurance (#709505879TR0001)",
                                                          "price": 4.8,
                                                          "planProductUniqueId": 178464,
                                                          "isIncluded": true,
                                                          "taxRate": 0.08,
                                                          "taxRatePercentage": "8%"
                                                      }
                                                  ]
                                              },
                                              "calculatedTax": {
                                                  "price": 60,
                                                  "tax": 4.8,
                                                  "total": 64.8,
                                                  "planProductIds": [
                                                      178464
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "PST ON HEALTH INSURANCE",
                                                          "description": "PST on Health Insurance (#709505879TR0001)",
                                                          "price": 4.8,
                                                          "planProductUniqueId": 178464,
                                                          "isIncluded": true,
                                                          "taxRate": 0.08,
                                                          "taxRatePercentage": "8%"
                                                      }
                                                  ]
                                              },
                                              "price1": "60.00",
                                              "bundledProducts": [
                                                  "Protect 200"
                                              ],
                                              "planlevel": {
                                                  "id": 13,
                                                  "parentId": 11,
                                                  "name": "Protect 200",
                                                  "description": null,
                                                  "published": {
                                                      "type": "Buffer",
                                                      "data": [
                                                          1
                                                      ]
                                                  },
                                                  "ordering": 15,
                                                  "level": 2,
                                                  "backgroundColor": "#384C9F",
                                                  "textColor": "#FFFFFF",
                                                  "tooltipTitle": "name",
                                                  "disallowedPlanLevels": null,
                                                  "requirePlanLevel": null,
                                                  "childMaxAge": 21,
                                                  "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"name\", \"background_color\": \"#384C9F\"}",
                                                  "planLevelFeatures": [
                                                      {
                                                          "id": 67,
                                                          "planLevelId": 13,
                                                          "planFeatureId": 22,
                                                          "description": "70% of income up to\r\n$1,000/week for up to 17 weeks",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 22,
                                                          "feature": {
                                                              "id": 22,
                                                              "name": "Weekly benefit for income loss due\r\nto accident",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 69,
                                                          "planLevelId": 13,
                                                          "planFeatureId": 23,
                                                          "description": "$2,000/month for up to 24 months",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 23,
                                                          "feature": {
                                                              "id": 23,
                                                              "name": "Monthly income on prolonged\r\ninability to work due to accident or\r\nserious physical illness",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 71,
                                                          "planLevelId": 13,
                                                          "planFeatureId": 24,
                                                          "description": "$200,000 total after 52 weeks",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 24,
                                                          "feature": {
                                                              "id": 24,
                                                              "name": "Permanent total disability benefit",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 73,
                                                          "planLevelId": 13,
                                                          "planFeatureId": 25,
                                                          "description": "$10,000 lump sum",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 25,
                                                          "feature": {
                                                              "id": 25,
                                                              "name": "Integrated Serious Illness Benefits\r\n(Includes: cancer (life-threatening), heart attack, kidney failure, stroke (cerebrovascular))",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 75,
                                                          "planLevelId": 13,
                                                          "planFeatureId": 26,
                                                          "description": "$200,000 lump sum",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 26,
                                                          "feature": {
                                                              "id": 26,
                                                              "name": "Accidental Death and\r\nDismemberment",
                                                              "category": null,
                                                              "description": null,
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      },
                                                      {
                                                          "id": 77,
                                                          "planLevelId": 13,
                                                          "planFeatureId": 27,
                                                          "description": "Accidental dental; rehabilitation; funeral; bereavement; spousal retraining; special education; daycare; family transportation; home, vehicle, workplace alteration; hospital confinement; parental care.",
                                                          "ordering": 0,
                                                          "content": null,
                                                          "plan_feature_id": 27,
                                                          "feature": {
                                                              "id": 27,
                                                              "name": "Additional benefit coverage",
                                                              "category": null,
                                                              "description": "See plan booklet for benefit details and amounts",
                                                              "published": true,
                                                              "ordering": 0
                                                          }
                                                      }
                                                  ]
                                              },
                                              "description": ""
                                          }
                                      ]
                                  },
                                  "productAddonssCSS": {
                                      "Protect 100": {
                                          "backgroundColor": null,
                                          "code": "protect100",
                                          "color": null,
                                          "fusebillId": "127215",
                                          "glCode": "53210",
                                          "id": 21,
                                          "name": "Protect 100",
                                          "price": 30,
                                          "published": true,
                                          "logo": null,
                                          "display": "TITLE",
                                          "data": "{}"
                                      },
                                      "Protect 200": {
                                          "backgroundColor": null,
                                          "code": "protect200",
                                          "color": null,
                                          "fusebillId": "127216",
                                          "glCode": "53210",
                                          "id": 20,
                                          "name": "Protect 200",
                                          "price": 60,
                                          "published": true,
                                          "logo": null,
                                          "display": "TITLE",
                                          "data": "{}"
                                      }
                                  }
                              }
                          ]
                      }
                  ]
              },
              {
                  "description": "Private Health(Earlier Executive Benefits)- Executive Health, Complete Executive Care",
                  "id": 5,
                  "logo": null,
                  "name": "Private Health",
                  "published": true,
                  "ordering": 6,
                  "allowMultiple": false,
                  "applyFilters": false,
                  "optIn": false,
                  "groups": [
                      {
                          "id": 17,
                          "parentId": 15,
                          "name": "Executive Health",
                          "description": null,
                          "published": {
                              "type": "Buffer",
                              "data": [
                                  1
                              ]
                          },
                          "ordering": 25,
                          "level": 2,
                          "backgroundColor": "#84626B",
                          "textColor": "#FFFFFF",
                          "tooltipTitle": "plan_coverage",
                          "disallowedPlanLevels": null,
                          "requirePlanLevel": null,
                          "childMaxAge": 24,
                          "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"plan_coverage\", \"background_color\": \"#84626B\"}",
                          "planLevelFeatures": [
                              {
                                  "id": 99,
                                  "planLevelId": 17,
                                  "planFeatureId": 37,
                                  "description": "$1,000,000 per family member per policy year to go to a private clinic outside of\r Canada for care, after a $5,000 deductible. Travel budget Included.\r 36 month pre-existing condition clause applies",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 37,
                                  "feature": {
                                      "id": 37,
                                      "name": "Global Medical Care",
                                      "category": "Executive Health",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 100,
                                  "planLevelId": 17,
                                  "planFeatureId": 38,
                                  "description": "MRI or CT Scans within as few as 72 hours. Available in AB, BC, NB, NS, SK and QC.",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 38,
                                  "feature": {
                                      "id": 38,
                                      "name": "Express Diagnostic Imaging Services",
                                      "category": "Executive Health",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              }
                          ],
                          "plans": [
                              {
                                  "activationDate": null,
                                  "advisorCommissionAmount": null,
                                  "advisorCommissionRate": null,
                                  "code": "privatehealthexecutivehealth60",
                                  "commissionHouseAmount": null,
                                  "commissionHouseRate": null,
                                  "corporatePlan": false,
                                  "cost": null,
                                  "description": "Health Insurance",
                                  "equitableInsurerTaxAmount": null,
                                  "equitableInsurerTaxRate": null,
                                  "equitableInsurerTotalAmount": null,
                                  "frqMonthly": "104591",
                                  "frqYearly": null,
                                  "fusebillId": "48099",
                                  "id": 613,
                                  "insuranceCompanyId": null,
                                  "isMonthlyCost": null,
                                  "jsonData": {
                                      "maximum_age": 60,
                                      "start_date": "2023-09-01T00:00:00.000Z",
                                      "end_date": "2024-08-31T00:00:00.000Z"
                                  },
                                  "logo": null,
                                  "maxAge": null,
                                  "minAge": null,
                                  "name": "Private Health - Executive Health (<60)",
                                  "ordering": null,
                                  "packageId": 5,
                                  "planCost": null,
                                  "planCoverage": "HEALTH_PLAN",
                                  "planLevel": 17,
                                  "published": {
                                      "type": "Buffer",
                                      "data": [
                                          1
                                      ]
                                  },
                                  "singleSku": true,
                                  "isBundle": true,
                                  "isMandatory": true,
                                  "isTaxPlan": false,
                                  "showBundledProducts": false,
                                  "customBundleName": null,
                                  "restrictedAccess": null,
                                  "plan_level": 17,
                                  "package_id": 5,
                                  "planLevels": {
                                      "id": 17,
                                      "parentId": 15,
                                      "name": "Executive Health",
                                      "description": null,
                                      "published": {
                                          "type": "Buffer",
                                          "data": [
                                              1
                                          ]
                                      },
                                      "ordering": 25,
                                      "level": 2,
                                      "backgroundColor": "#84626B",
                                      "textColor": "#FFFFFF",
                                      "tooltipTitle": "plan_coverage",
                                      "disallowedPlanLevels": null,
                                      "requirePlanLevel": null,
                                      "childMaxAge": 24,
                                      "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"plan_coverage\", \"background_color\": \"#84626B\"}"
                                  },
                                  "productAddons": [
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 289,
                                          "mandatory": false,
                                          "name": "Single",
                                          "displayName": null,
                                          "description": null,
                                          "published": true,
                                          "ordering": 1,
                                          "planCoverage": "SINGLE",
                                          "planId": 613,
                                          "planProductId": "182783",
                                          "price": 264.27,
                                          "productId": 7,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                          "productType": "BOTH",
                                          "planLevel": null,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 26.43, \"commission_house_amount_based_upon_premium_price\": 13.21}",
                                          "restrictedAccess": null,
                                          "product_id": 7,
                                          "plan_id": 613,
                                          "plan_level": null,
                                          "product": {
                                              "backgroundColor": "#212A3E",
                                              "code": "single",
                                              "color": "#FFFFFF",
                                              "fusebillId": "126187",
                                              "glCode": "73210",
                                              "id": 7,
                                              "name": "Single",
                                              "price": 229.72,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}",
                                              "productFeatureCategories": [
                                                  {
                                                      "description": null,
                                                      "id": 11,
                                                      "name": "Health & Dental Insurance",
                                                      "ordering": 1,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Prescription Drugs",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                              "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                              "id": 1,
                                                              "ordering": 1,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Professional Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                              "content": "",
                                                              "id": 5,
                                                              "ordering": 2,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Vision",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 10,
                                                              "ordering": 3,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Medical Supplies & Equipment",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 11,
                                                              "ordering": 4,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Travel Insurance",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                              "content": null,
                                                              "id": 12,
                                                              "ordering": 5,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Basic Dental Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                              "content": null,
                                                              "id": 13,
                                                              "ordering": 6,
                                                              "category_id": 11
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": null,
                                                      "id": 12,
                                                      "name": "GroupBenefitz Complete Wellness ",
                                                      "ordering": 2,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 12,
                                                              "title": "CloudMD Kii",
                                                              "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                              "content": null,
                                                              "id": 14,
                                                              "ordering": 1,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "Phzio MSK360",
                                                              "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                              "content": null,
                                                              "id": 15,
                                                              "ordering": 2,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "My Friendly Lawyer",
                                                              "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                              "content": null,
                                                              "id": 16,
                                                              "ordering": 3,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LifeSpeak",
                                                              "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                              "content": null,
                                                              "id": 17,
                                                              "ordering": 4,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "RxFood",
                                                              "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                              "content": null,
                                                              "id": 18,
                                                              "ordering": 5,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LIFT Session",
                                                              "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                              "content": null,
                                                              "id": 19,
                                                              "ordering": 6,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "The Solid Ground Method",
                                                              "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                              "content": null,
                                                              "id": 20,
                                                              "ordering": 7,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "ALAViDA",
                                                              "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                              "content": null,
                                                              "id": 21,
                                                              "ordering": 8,
                                                              "category_id": 12
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                      "id": 1,
                                                      "name": "Critical Illness Insurance",
                                                      "ordering": 3,
                                                      "published": true
                                                  }
                                              ]
                                          },
                                          "tax": null
                                      }
                                  ],
                                  "productAddonss": {
                                      "Private Health - Executive Health (<60)": [
                                          {
                                              "activationDate": "2023-11-01T00:00:00.000Z",
                                              "businessTaxNumber": null,
                                              "id": 289,
                                              "mandatory": false,
                                              "name": "Private Health - Executive Health (<60)",
                                              "displayName": null,
                                              "ordering": 1,
                                              "planCoverage": "SINGLE",
                                              "planCoverageUI": "Single",
                                              "planId": 613,
                                              "planProductId": "182783",
                                              "price": 264.27,
                                              "productId": 7,
                                              "stateId": 12,
                                              "taxCode": null,
                                              "taxDescription": null,
                                              "taxName": null,
                                              "taxSku": null,
                                              "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                              "product_id": 7,
                                              "plan_id": 613,
                                              "product": {
                                                  "backgroundColor": "#212A3E",
                                                  "code": "single",
                                                  "color": "#FFFFFF",
                                                  "fusebillId": "126187",
                                                  "glCode": "73210",
                                                  "id": 7,
                                                  "name": "Single",
                                                  "price": 229.72,
                                                  "published": true,
                                                  "logo": null,
                                                  "display": "TITLE",
                                                  "data": "{}",
                                                  "productFeatureCategories": [
                                                      {
                                                          "description": null,
                                                          "id": 11,
                                                          "name": "Health & Dental Insurance",
                                                          "ordering": 1,
                                                          "published": true,
                                                          "productFeatureItems": [
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Prescription Drugs",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                                  "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                                  "id": 1,
                                                                  "ordering": 1,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Professional Services",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                                  "content": "",
                                                                  "id": 5,
                                                                  "ordering": 2,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Vision",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                                  "content": null,
                                                                  "id": 10,
                                                                  "ordering": 3,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Medical Supplies & Equipment",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                                  "content": null,
                                                                  "id": 11,
                                                                  "ordering": 4,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Travel Insurance",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                                  "content": null,
                                                                  "id": 12,
                                                                  "ordering": 5,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Basic Dental Services",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                                  "content": null,
                                                                  "id": 13,
                                                                  "ordering": 6,
                                                                  "category_id": 11
                                                              }
                                                          ]
                                                      },
                                                      {
                                                          "description": null,
                                                          "id": 12,
                                                          "name": "GroupBenefitz Complete Wellness ",
                                                          "ordering": 2,
                                                          "published": true,
                                                          "productFeatureItems": [
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "CloudMD Kii",
                                                                  "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                                  "content": null,
                                                                  "id": 14,
                                                                  "ordering": 1,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "Phzio MSK360",
                                                                  "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                                  "content": null,
                                                                  "id": 15,
                                                                  "ordering": 2,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "My Friendly Lawyer",
                                                                  "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                                  "content": null,
                                                                  "id": 16,
                                                                  "ordering": 3,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "LifeSpeak",
                                                                  "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                                  "content": null,
                                                                  "id": 17,
                                                                  "ordering": 4,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "RxFood",
                                                                  "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                                  "content": null,
                                                                  "id": 18,
                                                                  "ordering": 5,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "LIFT Session",
                                                                  "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                                  "content": null,
                                                                  "id": 19,
                                                                  "ordering": 6,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "The Solid Ground Method",
                                                                  "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                                  "content": null,
                                                                  "id": 20,
                                                                  "ordering": 7,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "ALAViDA",
                                                                  "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                                  "content": null,
                                                                  "id": 21,
                                                                  "ordering": 8,
                                                                  "category_id": 12
                                                              }
                                                          ]
                                                      },
                                                      {
                                                          "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                          "id": 1,
                                                          "name": "Critical Illness Insurance",
                                                          "ordering": 3,
                                                          "published": true
                                                      }
                                                  ]
                                              },
                                              "tax": null,
                                              "taxesDataJSON": [
                                                  {
                                                      "tax_name": "PST ON HEALTH INSURANCE",
                                                      "tax_code": null,
                                                      "plan_id": 609,
                                                      "plan_product_id": 178464,
                                                      "tax_description": "PST on Health Insurance (#709505879TR0001)",
                                                      "business_tax_number": "709505879TR0001",
                                                      "tax_rate": 0.08,
                                                      "tax_sku": "pstonhealthinsurance"
                                                  }
                                              ],
                                              "calculatedTax": {
                                                  "price": 264.27,
                                                  "tax": 21.1416,
                                                  "total": 285.41159999999996,
                                                  "planProductIds": [
                                                      178464
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "PST ON HEALTH INSURANCE",
                                                          "description": "PST on Health Insurance (#709505879TR0001)",
                                                          "price": 21.1416,
                                                          "planProductUniqueId": 178464,
                                                          "isIncluded": true,
                                                          "taxRate": 0.08,
                                                          "taxRatePercentage": "8%"
                                                      }
                                                  ]
                                              },
                                              "price1": "264.27",
                                              "bundledProducts": [
                                                  "Single"
                                              ],
                                              "planlevel": 17,
                                              "description": " Single"
                                          }
                                      ]
                                  },
                                  "productAddonssCSS": {
                                      "Private Health - Executive Health (<60)": {
                                          "backgroundColor": "#212A3E",
                                          "code": "single",
                                          "color": "#FFFFFF",
                                          "fusebillId": "126187",
                                          "glCode": "73210",
                                          "id": 7,
                                          "name": "Single",
                                          "price": 229.72,
                                          "published": true,
                                          "logo": null,
                                          "display": "TITLE",
                                          "data": "{}",
                                          "productFeatureCategories": [
                                              {
                                                  "description": null,
                                                  "id": 11,
                                                  "name": "Health & Dental Insurance",
                                                  "ordering": 1,
                                                  "published": true,
                                                  "productFeatureItems": [
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Prescription Drugs",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                          "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                          "id": 1,
                                                          "ordering": 1,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Professional Services",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                          "content": "",
                                                          "id": 5,
                                                          "ordering": 2,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Vision",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                          "content": null,
                                                          "id": 10,
                                                          "ordering": 3,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Medical Supplies & Equipment",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                          "content": null,
                                                          "id": 11,
                                                          "ordering": 4,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Travel Insurance",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                          "content": null,
                                                          "id": 12,
                                                          "ordering": 5,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Basic Dental Services",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                          "content": null,
                                                          "id": 13,
                                                          "ordering": 6,
                                                          "category_id": 11
                                                      }
                                                  ]
                                              },
                                              {
                                                  "description": null,
                                                  "id": 12,
                                                  "name": "GroupBenefitz Complete Wellness ",
                                                  "ordering": 2,
                                                  "published": true,
                                                  "productFeatureItems": [
                                                      {
                                                          "categoryId": 12,
                                                          "title": "CloudMD Kii",
                                                          "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                          "content": null,
                                                          "id": 14,
                                                          "ordering": 1,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "Phzio MSK360",
                                                          "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                          "content": null,
                                                          "id": 15,
                                                          "ordering": 2,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "My Friendly Lawyer",
                                                          "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                          "content": null,
                                                          "id": 16,
                                                          "ordering": 3,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "LifeSpeak",
                                                          "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                          "content": null,
                                                          "id": 17,
                                                          "ordering": 4,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "RxFood",
                                                          "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                          "content": null,
                                                          "id": 18,
                                                          "ordering": 5,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "LIFT Session",
                                                          "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                          "content": null,
                                                          "id": 19,
                                                          "ordering": 6,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "The Solid Ground Method",
                                                          "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                          "content": null,
                                                          "id": 20,
                                                          "ordering": 7,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "ALAViDA",
                                                          "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                          "content": null,
                                                          "id": 21,
                                                          "ordering": 8,
                                                          "category_id": 12
                                                      }
                                                  ]
                                              },
                                              {
                                                  "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                  "id": 1,
                                                  "name": "Critical Illness Insurance",
                                                  "ordering": 3,
                                                  "published": true
                                              }
                                          ]
                                      }
                                  }
                              }
                          ]
                      },
                      {
                          "id": 18,
                          "parentId": 15,
                          "name": "Complete Executive Care",
                          "description": null,
                          "published": {
                              "type": "Buffer",
                              "data": [
                                  1
                              ]
                          },
                          "ordering": 26,
                          "level": 2,
                          "backgroundColor": "#5E172E",
                          "textColor": "#FFFFFF",
                          "tooltipTitle": "plan_coverage",
                          "disallowedPlanLevels": null,
                          "requirePlanLevel": null,
                          "childMaxAge": 24,
                          "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"plan_coverage\", \"background_color\": \"#5E172E\"}",
                          "planLevelFeatures": [
                              {
                                  "id": 101,
                                  "planLevelId": 18,
                                  "planFeatureId": 39,
                                  "description": "$1,000,000 per family member per policy year to go to a private clinic outside of\r Canada for care, after a $5,000 deductible. Travel budget Included.\r 36 month pre-existing condition clause applies",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 39,
                                  "feature": {
                                      "id": 39,
                                      "name": "Global Medical Care",
                                      "category": "Complete Executive Care",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 102,
                                  "planLevelId": 18,
                                  "planFeatureId": 40,
                                  "description": "MRI or CT Scans within as few as 72 hours. Available in AB, BC, NB, NS, SK and QC.",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 40,
                                  "feature": {
                                      "id": 40,
                                      "name": "Express Diagnostic Imaging Services",
                                      "category": "Complete Executive Care",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 103,
                                  "planLevelId": 18,
                                  "planFeatureId": 41,
                                  "description": "Annual Executive Health Assessment at the clinic of your choice (MedCan network,\r\nCleveland Clinic, Telus Health). Year-Round Virtual Care membership for the entire family.",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 41,
                                  "feature": {
                                      "id": 41,
                                      "name": "Executive Health Assessment\r\nand Year-Round Virtual Care",
                                      "category": "Complete Executive Care",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 105,
                                  "planLevelId": 18,
                                  "planFeatureId": 43,
                                  "description": "Pillcheck - Find the right drug in the right dosage the first time.\r\n1 per lifetime, limited 2 per family",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 43,
                                  "feature": {
                                      "id": 43,
                                      "name": "Pharmacogenetic Testing",
                                      "category": "Complete Executive Care",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 106,
                                  "planLevelId": 18,
                                  "planFeatureId": 44,
                                  "description": "gutChek - Over time, our digestive system changes so food sensitivities can happen with\r\nfoods you’ve eaten your entire life. A food sensitivity test identifies what is causing inflammation.\r\n1 every two years",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 44,
                                  "feature": {
                                      "id": 44,
                                      "name": "Food Sensitivity Testing",
                                      "category": "Complete Executive Care",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 107,
                                  "planLevelId": 18,
                                  "planFeatureId": 45,
                                  "description": "RxFood - Diet management made easy. Submit three days of your meal\r\nphotos and receive custom nutrition plans that align with medical guidelines.\r\n1 per year",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 45,
                                  "feature": {
                                      "id": 45,
                                      "name": "Diabetes & Diet Management",
                                      "category": "Complete Executive Care",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              },
                              {
                                  "id": 108,
                                  "planLevelId": 18,
                                  "planFeatureId": 46,
                                  "description": "Candoo - for easy and secure storage and sharing of medical files,\r\nplus unlimited short term healthcare navigation that guides people through the medical system.",
                                  "ordering": 0,
                                  "content": null,
                                  "plan_feature_id": 46,
                                  "feature": {
                                      "id": 46,
                                      "name": "Health System Navigation\r\n& Medical Record Storage",
                                      "category": "Complete Executive Care",
                                      "description": null,
                                      "published": true,
                                      "ordering": 0
                                  }
                              }
                          ],
                          "plans": [
                              {
                                  "activationDate": null,
                                  "advisorCommissionAmount": null,
                                  "advisorCommissionRate": null,
                                  "code": "privatehealthcompleteexecutivecare60",
                                  "commissionHouseAmount": null,
                                  "commissionHouseRate": null,
                                  "corporatePlan": false,
                                  "cost": null,
                                  "description": "Health Insurance",
                                  "equitableInsurerTaxAmount": null,
                                  "equitableInsurerTaxRate": null,
                                  "equitableInsurerTotalAmount": null,
                                  "frqMonthly": "104588",
                                  "frqYearly": null,
                                  "fusebillId": "48096",
                                  "id": 615,
                                  "insuranceCompanyId": null,
                                  "isMonthlyCost": null,
                                  "jsonData": {
                                      "maximum_age": 60,
                                      "start_date": "2023-09-01T00:00:00.000Z",
                                      "end_date": "2024-08-31T00:00:00.000Z"
                                  },
                                  "logo": null,
                                  "maxAge": null,
                                  "minAge": null,
                                  "name": "Private Health - Complete Executive Care (<60)",
                                  "ordering": null,
                                  "packageId": 5,
                                  "planCost": null,
                                  "planCoverage": "HEALTH_PLAN",
                                  "planLevel": 18,
                                  "published": {
                                      "type": "Buffer",
                                      "data": [
                                          1
                                      ]
                                  },
                                  "singleSku": true,
                                  "isBundle": true,
                                  "isMandatory": true,
                                  "isTaxPlan": false,
                                  "showBundledProducts": false,
                                  "customBundleName": null,
                                  "restrictedAccess": null,
                                  "plan_level": 18,
                                  "package_id": 5,
                                  "planLevels": {
                                      "id": 18,
                                      "parentId": 15,
                                      "name": "Complete Executive Care",
                                      "description": null,
                                      "published": {
                                          "type": "Buffer",
                                          "data": [
                                              1
                                          ]
                                      },
                                      "ordering": 26,
                                      "level": 2,
                                      "backgroundColor": "#5E172E",
                                      "textColor": "#FFFFFF",
                                      "tooltipTitle": "plan_coverage",
                                      "disallowedPlanLevels": null,
                                      "requirePlanLevel": null,
                                      "childMaxAge": 24,
                                      "data": "{\"text_color\": \"#FFFFFF\", \"tooltip_title\": \"plan_coverage\", \"background_color\": \"#5E172E\"}"
                                  },
                                  "productAddons": [
                                      {
                                          "activationDate": "2023-11-01T00:00:00.000Z",
                                          "businessTaxNumber": null,
                                          "id": 349,
                                          "mandatory": false,
                                          "name": "Single",
                                          "displayName": null,
                                          "description": null,
                                          "published": true,
                                          "ordering": 1,
                                          "planCoverage": "SINGLE",
                                          "planId": 615,
                                          "planProductId": "183168",
                                          "price": 348.59,
                                          "productId": 7,
                                          "stateId": 12,
                                          "taxCode": null,
                                          "taxDescription": null,
                                          "taxName": null,
                                          "taxSku": null,
                                          "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                          "productType": "BOTH",
                                          "planLevel": null,
                                          "data": "{\"commission_house_rate\": 0.05, \"advisor_commission_rate\": 0.1, \"advisor_commission_amount_based_on_premium_price\": 34.86, \"commission_house_amount_based_upon_premium_price\": 17.43}",
                                          "restrictedAccess": null,
                                          "product_id": 7,
                                          "plan_id": 615,
                                          "plan_level": null,
                                          "product": {
                                              "backgroundColor": "#212A3E",
                                              "code": "single",
                                              "color": "#FFFFFF",
                                              "fusebillId": "126187",
                                              "glCode": "73210",
                                              "id": 7,
                                              "name": "Single",
                                              "price": 229.72,
                                              "published": true,
                                              "logo": null,
                                              "display": "TITLE",
                                              "data": "{}",
                                              "productFeatureCategories": [
                                                  {
                                                      "description": null,
                                                      "id": 11,
                                                      "name": "Health & Dental Insurance",
                                                      "ordering": 1,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Prescription Drugs",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                              "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                              "id": 1,
                                                              "ordering": 1,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Professional Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                              "content": "",
                                                              "id": 5,
                                                              "ordering": 2,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Vision",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 10,
                                                              "ordering": 3,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Medical Supplies & Equipment",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                              "content": null,
                                                              "id": 11,
                                                              "ordering": 4,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Travel Insurance",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                              "content": null,
                                                              "id": 12,
                                                              "ordering": 5,
                                                              "category_id": 11
                                                          },
                                                          {
                                                              "categoryId": 11,
                                                              "title": "Basic Dental Services",
                                                              "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                              "content": null,
                                                              "id": 13,
                                                              "ordering": 6,
                                                              "category_id": 11
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": null,
                                                      "id": 12,
                                                      "name": "GroupBenefitz Complete Wellness ",
                                                      "ordering": 2,
                                                      "published": true,
                                                      "productFeatureItems": [
                                                          {
                                                              "categoryId": 12,
                                                              "title": "CloudMD Kii",
                                                              "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                              "content": null,
                                                              "id": 14,
                                                              "ordering": 1,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "Phzio MSK360",
                                                              "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                              "content": null,
                                                              "id": 15,
                                                              "ordering": 2,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "My Friendly Lawyer",
                                                              "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                              "content": null,
                                                              "id": 16,
                                                              "ordering": 3,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LifeSpeak",
                                                              "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                              "content": null,
                                                              "id": 17,
                                                              "ordering": 4,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "RxFood",
                                                              "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                              "content": null,
                                                              "id": 18,
                                                              "ordering": 5,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "LIFT Session",
                                                              "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                              "content": null,
                                                              "id": 19,
                                                              "ordering": 6,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "The Solid Ground Method",
                                                              "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                              "content": null,
                                                              "id": 20,
                                                              "ordering": 7,
                                                              "category_id": 12
                                                          },
                                                          {
                                                              "categoryId": 12,
                                                              "title": "ALAViDA",
                                                              "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                              "content": null,
                                                              "id": 21,
                                                              "ordering": 8,
                                                              "category_id": 12
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                      "id": 1,
                                                      "name": "Critical Illness Insurance",
                                                      "ordering": 3,
                                                      "published": true
                                                  }
                                              ]
                                          },
                                          "tax": null
                                      }
                                  ],
                                  "planOptions": [
                                      {
                                          "id": 1,
                                          "name": "Please select your preferred Executive Assessment Clinic",
                                          "description": null,
                                          "type": "radio",
                                          "planOptionsValues": [
                                              {
                                                  "id": 1,
                                                  "planOptionsId": 1,
                                                  "name": "Cleveland Clinic (Toronto)",
                                                  "value": "Cleveland Clinic (Toronto)",
                                                  "reportingEmail": "ABBOTTO@ccf.org",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 2,
                                                  "planOptionsId": 1,
                                                  "name": "Medcan Clinic (Toronto)",
                                                  "value": "Medcan Clinic (Toronto)",
                                                  "reportingEmail": "AlanWearmouth@medcan.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 3,
                                                  "planOptionsId": 1,
                                                  "name": "Medcan Clinic (Oakville)",
                                                  "value": "Medcan Clinic (Oakville)",
                                                  "reportingEmail": "AlanWearmouth@medcan.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 4,
                                                  "planOptionsId": 1,
                                                  "name": "Exec Health Clinic (Ottawa)",
                                                  "value": "Exec Health Clinic (Ottawa)",
                                                  "reportingEmail": "AlanWearmouth@medcan.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 5,
                                                  "planOptionsId": 1,
                                                  "name": "Westmount Square Health Group (Westmount)",
                                                  "value": "Westmount Square Health Group (Westmount)",
                                                  "reportingEmail": "AlanWearmouth@medcan.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 6,
                                                  "planOptionsId": 1,
                                                  "name": "Signature Health (Halifax)",
                                                  "value": "Signature Health (Halifax)",
                                                  "reportingEmail": "AlanWearmouth@medcan.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 7,
                                                  "planOptionsId": 1,
                                                  "name": "INLIV Clinic (Calgary)",
                                                  "value": "INLIV Clinic (Calgary)",
                                                  "reportingEmail": "AlanWearmouth@medcan.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 8,
                                                  "planOptionsId": 1,
                                                  "name": "Enhance Medical (formerly Weiss Clinics) (Edmonton)",
                                                  "value": "Enhance Medical (formerly Weiss Clinics) (Edmonton)",
                                                  "reportingEmail": "AlanWearmouth@medcan.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 9,
                                                  "planOptionsId": 1,
                                                  "name": "Clearpoint Health Network (Vancouver)",
                                                  "value": "Clearpoint Health Network (Vancouver)",
                                                  "reportingEmail": "AlanWearmouth@medcan.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 10,
                                                  "planOptionsId": 1,
                                                  "name": "TELUS Health Care Centre (Toronto)",
                                                  "value": "TELUS Health Care Centre (Toronto)",
                                                  "reportingEmail": "Abdel.Abu_Saleh@telus.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 11,
                                                  "planOptionsId": 1,
                                                  "name": "TELUS Health Care Centre (Montreal)",
                                                  "value": "TELUS Health Care Centre (Montreal)",
                                                  "reportingEmail": "Abdel.Abu_Saleh@telus.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 12,
                                                  "planOptionsId": 1,
                                                  "name": "TELUS Health Care Centre (Quebec City)",
                                                  "value": "TELUS Health Care Centre (Quebec City)",
                                                  "reportingEmail": "Abdel.Abu_Saleh@telus.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 13,
                                                  "planOptionsId": 1,
                                                  "name": "TELUS Health Care Centre (St. John's, NL)",
                                                  "value": "TELUS Health Care Centre (St. John's, NL)",
                                                  "reportingEmail": "Abdel.Abu_Saleh@telus.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 14,
                                                  "planOptionsId": 1,
                                                  "name": "TELUS Health Care Centre (Calgary)",
                                                  "value": "TELUS Health Care Centre (Calgary)",
                                                  "reportingEmail": "Abdel.Abu_Saleh@telus.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 15,
                                                  "planOptionsId": 1,
                                                  "name": "TELUS Health Care Centre (Edmonton)",
                                                  "value": "TELUS Health Care Centre (Edmonton)",
                                                  "reportingEmail": "Abdel.Abu_Saleh@telus.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 16,
                                                  "planOptionsId": 1,
                                                  "name": "TELUS Health Care Centre (Vancouver)",
                                                  "value": "TELUS Health Care Centre (Vancouver)",
                                                  "reportingEmail": "Abdel.Abu_Saleh@telus.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 17,
                                                  "planOptionsId": 1,
                                                  "name": "TELUS Health Care Centre (Thompson)",
                                                  "value": "TELUS Health Care Centre (Thompson)",
                                                  "reportingEmail": "Abdel.Abu_Saleh@telus.com",
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 21,
                                                  "planOptionsId": 1,
                                                  "name": "TELUS Health Care Centre (Ottawa)",
                                                  "value": "TELUS Health Care Centre (Ottawa)",
                                                  "reportingEmail": null,
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 22,
                                                  "planOptionsId": 1,
                                                  "name": "La Vie Executive Health Centre (Ottawa)",
                                                  "value": "La Vie Executive Health Centre (Ottawa)",
                                                  "reportingEmail": null,
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 24,
                                                  "planOptionsId": 1,
                                                  "name": "Porta Clinic (Additonal $1000 applies to each deductible option) (Winnipeg)",
                                                  "value": "Porta Clinic (Additonal $1000 applies to each deductible option) (Winnipeg)",
                                                  "reportingEmail": null,
                                                  "plan_options_id": 1
                                              },
                                              {
                                                  "id": 28,
                                                  "planOptionsId": 1,
                                                  "name": "I'm not sure, I'll pick later",
                                                  "value": "I'm not sure, I'll pick later",
                                                  "reportingEmail": null,
                                                  "plan_options_id": 1
                                              }
                                          ]
                                      },
                                      {
                                          "id": 2,
                                          "name": "Opt In - Activate My Year-Round Family Virtual Care (included) ",
                                          "description": null,
                                          "type": "radio",
                                          "planOptionsValues": [
                                              {
                                                  "id": 29,
                                                  "planOptionsId": 2,
                                                  "name": "Yes, I would like to activate my year round virtual health care program. Please share my information with my chosen clinic network to get started.",
                                                  "value": "Yes",
                                                  "reportingEmail": null,
                                                  "plan_options_id": 2
                                              },
                                              {
                                                  "id": 30,
                                                  "planOptionsId": 2,
                                                  "name": "No, I would not like to activate my year round virtual health care program that is included in my program. Please do not share my information with my chosen clinic at this time.",
                                                  "value": "No",
                                                  "reportingEmail": null,
                                                  "plan_options_id": 2
                                              }
                                          ]
                                      }
                                  ],
                                  "productAddonss": {
                                      "Private Health - Complete Executive Care (<60)": [
                                          {
                                              "activationDate": "2023-11-01T00:00:00.000Z",
                                              "businessTaxNumber": null,
                                              "id": 349,
                                              "mandatory": false,
                                              "name": "Private Health - Complete Executive Care (<60)",
                                              "displayName": null,
                                              "ordering": 1,
                                              "planCoverage": "SINGLE",
                                              "planCoverageUI": "Single",
                                              "planId": 615,
                                              "planProductId": "183168",
                                              "price": 348.59,
                                              "productId": 7,
                                              "stateId": 12,
                                              "taxCode": null,
                                              "taxDescription": null,
                                              "taxName": null,
                                              "taxSku": null,
                                              "taxesData": "[{\"tax_name\":\"PST ON HEALTH INSURANCE\",\"tax_code\":null,\"plan_id\":609,\"plan_product_id\":178464,\"tax_description\":\"PST on Health Insurance (#709505879TR0001)\",\"business_tax_number\":\"709505879TR0001\",\"tax_rate\":0.08,\"tax_sku\":\"pstonhealthinsurance\"}]",
                                              "product_id": 7,
                                              "plan_id": 615,
                                              "product": {
                                                  "backgroundColor": "#212A3E",
                                                  "code": "single",
                                                  "color": "#FFFFFF",
                                                  "fusebillId": "126187",
                                                  "glCode": "73210",
                                                  "id": 7,
                                                  "name": "Single",
                                                  "price": 229.72,
                                                  "published": true,
                                                  "logo": null,
                                                  "display": "TITLE",
                                                  "data": "{}",
                                                  "productFeatureCategories": [
                                                      {
                                                          "description": null,
                                                          "id": 11,
                                                          "name": "Health & Dental Insurance",
                                                          "ordering": 1,
                                                          "published": true,
                                                          "productFeatureItems": [
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Prescription Drugs",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                                  "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                                  "id": 1,
                                                                  "ordering": 1,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Professional Services",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                                  "content": "",
                                                                  "id": 5,
                                                                  "ordering": 2,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Vision",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                                  "content": null,
                                                                  "id": 10,
                                                                  "ordering": 3,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Medical Supplies & Equipment",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                                  "content": null,
                                                                  "id": 11,
                                                                  "ordering": 4,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Travel Insurance",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                                  "content": null,
                                                                  "id": 12,
                                                                  "ordering": 5,
                                                                  "category_id": 11
                                                              },
                                                              {
                                                                  "categoryId": 11,
                                                                  "title": "Basic Dental Services",
                                                                  "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                                  "content": null,
                                                                  "id": 13,
                                                                  "ordering": 6,
                                                                  "category_id": 11
                                                              }
                                                          ]
                                                      },
                                                      {
                                                          "description": null,
                                                          "id": 12,
                                                          "name": "GroupBenefitz Complete Wellness ",
                                                          "ordering": 2,
                                                          "published": true,
                                                          "productFeatureItems": [
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "CloudMD Kii",
                                                                  "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                                  "content": null,
                                                                  "id": 14,
                                                                  "ordering": 1,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "Phzio MSK360",
                                                                  "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                                  "content": null,
                                                                  "id": 15,
                                                                  "ordering": 2,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "My Friendly Lawyer",
                                                                  "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                                  "content": null,
                                                                  "id": 16,
                                                                  "ordering": 3,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "LifeSpeak",
                                                                  "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                                  "content": null,
                                                                  "id": 17,
                                                                  "ordering": 4,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "RxFood",
                                                                  "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                                  "content": null,
                                                                  "id": 18,
                                                                  "ordering": 5,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "LIFT Session",
                                                                  "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                                  "content": null,
                                                                  "id": 19,
                                                                  "ordering": 6,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "The Solid Ground Method",
                                                                  "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                                  "content": null,
                                                                  "id": 20,
                                                                  "ordering": 7,
                                                                  "category_id": 12
                                                              },
                                                              {
                                                                  "categoryId": 12,
                                                                  "title": "ALAViDA",
                                                                  "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                                  "content": null,
                                                                  "id": 21,
                                                                  "ordering": 8,
                                                                  "category_id": 12
                                                              }
                                                          ]
                                                      },
                                                      {
                                                          "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                          "id": 1,
                                                          "name": "Critical Illness Insurance",
                                                          "ordering": 3,
                                                          "published": true
                                                      }
                                                  ]
                                              },
                                              "tax": null,
                                              "taxesDataJSON": [
                                                  {
                                                      "tax_name": "PST ON HEALTH INSURANCE",
                                                      "tax_code": null,
                                                      "plan_id": 609,
                                                      "plan_product_id": 178464,
                                                      "tax_description": "PST on Health Insurance (#709505879TR0001)",
                                                      "business_tax_number": "709505879TR0001",
                                                      "tax_rate": 0.08,
                                                      "tax_sku": "pstonhealthinsurance"
                                                  }
                                              ],
                                              "calculatedTax": {
                                                  "price": 348.59,
                                                  "tax": 27.8872,
                                                  "total": 376.4772,
                                                  "planProductIds": [
                                                      178464
                                                  ],
                                                  "planProductInfos": [
                                                      {
                                                          "name": "PST ON HEALTH INSURANCE",
                                                          "description": "PST on Health Insurance (#709505879TR0001)",
                                                          "price": 27.8872,
                                                          "planProductUniqueId": 178464,
                                                          "isIncluded": true,
                                                          "taxRate": 0.08,
                                                          "taxRatePercentage": "8%"
                                                      }
                                                  ]
                                              },
                                              "price1": "348.59",
                                              "bundledProducts": [
                                                  "Single"
                                              ],
                                              "planlevel": 18,
                                              "description": " Single"
                                          }
                                      ]
                                  },
                                  "productAddonssCSS": {
                                      "Private Health - Complete Executive Care (<60)": {
                                          "backgroundColor": "#212A3E",
                                          "code": "single",
                                          "color": "#FFFFFF",
                                          "fusebillId": "126187",
                                          "glCode": "73210",
                                          "id": 7,
                                          "name": "Single",
                                          "price": 229.72,
                                          "published": true,
                                          "logo": null,
                                          "display": "TITLE",
                                          "data": "{}",
                                          "productFeatureCategories": [
                                              {
                                                  "description": null,
                                                  "id": 11,
                                                  "name": "Health & Dental Insurance",
                                                  "ordering": 1,
                                                  "published": true,
                                                  "productFeatureItems": [
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Prescription Drugs",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Coverage for drugs on the provincial government formulary listing</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $2,000/family member/year</li>\r    <li style=\"line-height: 1;\">Generic pricing in effect when a generic exists</li>\r  </ul> ",
                                                          "content": "<p><strong>Coverage $15,000</strong></p>\n<p><strong>23 Conditions covered </strong><strong>plys</strong><strong> 4 additional Benefits</strong></p>\n<p><strong>Second Event Benefit Included</strong></p>\n<p><strong>Benefits are Tax Free</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><strong>Full Benefits Covered Event</strong></u></p>\n<p>1.Cancer</p>\n<p>2.Heart Attack</p>\n<p>3.Stroke</p>\n<p>4.Coronary Bypass Surgery (CABS)</p>\n<p>5.Multiple Sclerosis</p>\n<p>6.Paralysis (Hemiplegia, Paraplegia, Quadriplegia)</p>\n<p>7.Alzheimer's Disease</p>\n<p>8.Aorta Surgery</p>\n<p>9.Benign Brain Tumour Blindness</p>\n<p>10.Coma</p>\n<p>11.Deafness</p>\n<p>12.Dismemberment</p>\n<p>13.Heart Valve Replacement</p>\n<p>14.Loss of Speech</p>\n<p>15.Major Organ Failure<em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em></p>\n<p>16.Major Organ Transplant <em>[Bone Marrow, Heart, Kidneys, Liver, Lungs, Pancreas] </em>Motor Neuron Disease (incl. ALS)</p>\n<p>17.Occupational HIV Infection</p>\n<p>18.Parkinson's Disease</p>\n<p>19.Severe Burns <br /> <u><strong>Partial Benefits Covered Event</strong></u></p>\n<p>20.Loss of Independence</p>\n<p>21.Ductal Carcinoma In Situ</p>\n<p>22.Early-Stage Prostate Cancer (T1a or T1b) Treatment</p>\n<ol start=\"23\">\n<li>Hip or Knee Replacement Surgery</li>\n</ol>\n<p><br /> Refer to Booklet for coverage details and limits</p>",
                                                          "id": 1,
                                                          "ordering": 1,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Professional Services",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\" >\r    <li style=\"line-height: 1;\">Includes acupuncture, athletic therapist, audiologist, chiropodist, chiropractor, dietician, massage therapist, naturopath, osteopath, podiatrist, physiotherapist, psychologist, psychotherapist, social worker, speech therapist.</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Combined annual maximum of $800/family member/year.</li>\r    <li style=\"line-height: 1;\">Reasonable and customary per visit limits as per the insurer apply.</li>\r  </ul>",
                                                          "content": "",
                                                          "id": 5,
                                                          "ordering": 2,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Vision",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Prescription glasses and contact lenses</li>\r    <li style=\"line-height: 1;\">80% coverage</li>\r    <li style=\"line-height: 1;\">Maximum of $200 every 24 months/family member/year</li>\r  </ul> ",
                                                          "content": null,
                                                          "id": 10,
                                                          "ordering": 3,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Medical Supplies & Equipment",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Included, see booklet for details </li>\r  </ul> ",
                                                          "content": null,
                                                          "id": 11,
                                                          "ordering": 4,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Travel Insurance",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Out-of-Province/Out-of-Country coverage for trips up to 30 days in length</li>\r    <li style=\"line-height: 1;\">Emergency medical services for unforeseen accidents and illnesses</li>\r    <li style=\"line-height: 1;\">100% coverage</li>\r      <li style=\"line-height: 1;\">Maximum of $1,000,000</li>\r  </ul>",
                                                          "content": null,
                                                          "id": 12,
                                                          "ordering": 5,
                                                          "category_id": 11
                                                      },
                                                      {
                                                          "categoryId": 11,
                                                          "title": "Basic Dental Services",
                                                          "description": "<ul class=\"ult\" style=\"line-height: 2;\">\r    <li style=\"line-height: 1;\">Cleanings, polishing, fillings, x-rays, extractions, endodontics, periodontics, 8 scaling units</li>\r    <li style=\"line-height: 1;\">Check-ups every 6 months</li>\r    <li style=\"line-height: 1;\">70% coverage</li>\r    <li style=\"line-height: 1;\">Annual maximum of $750/family member/year</li>\r  </ul>  ",
                                                          "content": null,
                                                          "id": 13,
                                                          "ordering": 6,
                                                          "category_id": 11
                                                      }
                                                  ]
                                              },
                                              {
                                                  "description": null,
                                                  "id": 12,
                                                  "name": "GroupBenefitz Complete Wellness ",
                                                  "ordering": 2,
                                                  "published": true,
                                                  "productFeatureItems": [
                                                      {
                                                          "categoryId": 12,
                                                          "title": "CloudMD Kii",
                                                          "description": "Unlimited access to Telemedicine with nurses and nurse practitioners.\r\nAccess to ongoing mental health counselling for individuals and their families.\r\nTherapy is available in-person, virtual or via phone. \r\n",
                                                          "content": null,
                                                          "id": 14,
                                                          "ordering": 1,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "Phzio MSK360",
                                                          "description": "Unlimited access to virtual pain consultations, rehabilitation, and ergonomic assessments with Athletic Therapists.",
                                                          "content": null,
                                                          "id": 15,
                                                          "ordering": 2,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "My Friendly Lawyer",
                                                          "description": "Legal advice line with qualified Canadian lawyers handling multiple specializations",
                                                          "content": null,
                                                          "id": 16,
                                                          "ordering": 3,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "LifeSpeak",
                                                          "description": "Expert-led mental health and wellbeing education platform with Ask the Expert web chats, blogs, videos and podcasts",
                                                          "content": null,
                                                          "id": 17,
                                                          "ordering": 4,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "RxFood",
                                                          "description": "Innovative nutrition app optimizes food for health by aligning your individual data with specific goals. Detailed reports and guidance serve real life, targeted issues including diabetes and overall wellness",
                                                          "content": null,
                                                          "id": 18,
                                                          "ordering": 5,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "LIFT Session",
                                                          "description": "Industry-leading virtual fitness support program with unlimited on-demand home workout videos and live sessions",
                                                          "content": null,
                                                          "id": 19,
                                                          "ordering": 6,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "The Solid Ground Method",
                                                          "description": "Personal development program helps you live life on your terms while gaining more life and job satisfaction. Learn how to reduce stress, improve energy and time management, and achieve work-life balance",
                                                          "content": null,
                                                          "id": 20,
                                                          "ordering": 7,
                                                          "category_id": 12
                                                      },
                                                      {
                                                          "categoryId": 12,
                                                          "title": "ALAViDA",
                                                          "description": "Virtual substance use support with early intervention that helps keep employees at work. Board-certified substance use disorder physicians, mental health support, self-assessments, 24/7 resources, and more personalized care.",
                                                          "content": null,
                                                          "id": 21,
                                                          "ordering": 8,
                                                          "category_id": 12
                                                      }
                                                  ]
                                              },
                                              {
                                                  "description": " <ul class=\"ult\" style=\"line-height: 2;\">\r     <li style=\"line-height: 1;\">Coverage of $15,000 benefit</li>\r       <li style=\"line-height: 1;\">Payable upon the diagnosis of 1 of 23 Insured conditions plus survival period</li>\r        <li style=\"line-height: 1;\">Partial benefits payable for 4 conditions</li>\r   </ul>",
                                                  "id": 1,
                                                  "name": "Critical Illness Insurance",
                                                  "ordering": 3,
                                                  "published": true
                                              }
                                          ]
                                      }
                                  }
                              }
                          ]
                      }
                  ]
              }
          ]


  }

  public onCheckboxChange(
    e,
    allowMultiple,
    disallowedPlanLevels,
    options,
    pname,
    groupname,
    plancoverage,
    planprice,
    gst,
    hst,
    pst,
    event,
    event1,
    packageindex,
    groupindex,
    planindex,
    plan,
    product,pckage,group
  ) {

    let multiple = allowMultiple ? Boolean(allowMultiple.data[0]) : false;

    console.log(disallowedPlanLevels)

    if (disallowedPlanLevels != null) {
      console.log(disallowedPlanLevels)
      let disallowed_plans = disallowedPlanLevels.split(",");
      const dom1: HTMLElement = this.elementRef.nativeElement;
      const disallowed_elements = dom1.querySelectorAll(
        ".plansscreen input[type='checkbox']"
      );

      // disallowed_elements.forEach((elem: any) => {

        for(let i =0; i<disallowed_elements.length;i++){

          let elem:any =disallowed_elements[i]
        // elementcv.checked=false

        let plandetails = elem.attributes.data.value;

        let plandetailsobj = plandetails.split("##");

        console.log("main",plandetailsobj)

        if (e.target.checked) {
          if (!elem.disabled) {
            if (plandetailsobj[12] == null || plandetailsobj[12] == "") {
              if (disallowed_plans.indexOf(plandetailsobj[13]) >= 0) {
                //  elem.checked=false
                elem.disabled = true;

                this.disabledelement =
                  "Already included in GroupBenefitz All-In";
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[12]) >= 0) {
                //  elem.checked=false
                elem.disabled = true;
                this.disabledelement =
                  "Already included in GroupBenefitz All-In";
              }
            }
          }
          if (elem.checked) {
            //console.log(disallowed_plans)
            //console.log(plandetailsobj)

            if (plandetailsobj[12] == null || plandetailsobj[12] == "") {
              if (disallowed_plans.indexOf(plandetailsobj[13]) >= 0) {
                elem.checked = false;
                this.unselectplan(elem)
              }
            } else {
              //console.log(disallowed_plans)
              //console.log(plandetailsobj)
              if (disallowed_plans.indexOf(plandetailsobj[12]) >= 0) {
                elem.checked = false;
                this.unselectplan(elem)
                // elem.disabled =true
              }
            }
          }
        }
        else {
          if (elem.disabled) {
            if (plandetailsobj[12] == null || plandetailsobj[12] == "") {
              if (disallowed_plans.indexOf(plandetailsobj[13]) >= 0) {
                //  elem.checked=false
                elem.disabled = false;
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[12]) >= 0) {
                //  elem.checked=false
                elem.disabled = false;
              }
            }
          }
          if (elem.checked) {
            if (plandetailsobj[12] == null || plandetailsobj[12] == "") {
              if (disallowed_plans.indexOf(plandetailsobj[13]) >= 0) {
                elem.checked = false;
                // elem.disabled =true
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[12]) >= 0) {
                elem.checked = false;
                // elem.disabled =true
              }
            }
          }
        }
      };
    }

    // ////console.log(e)
    let classname = e.target.className;
    classname = classname.split(" ").join(".");

    // ////console.log(classname)
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll("." + classname);

    // ////console.log(elements);

    let element: any;
    let elementcv: any;

    if (!multiple) {
      if (e.target.checked) {


         for(let i =0; i<elements.length;i++){
            let elem = elements[i]
          element = elem;

          if(element.checked){
            this.unselectplan(elem)
            element.checked = false;
          }


         }



        e.checked = true;
        e.target.checked = true;

      } else {

      }
    } else {
      //no checking for other checkboxes you can selet multiple
    }
    setTimeout(() => {


      if(e.target.checked){


        this.selectplan(e.target,options,plan,product,pckage,group)
      }
      else{
        this.unselectplan(e.target)
      }

    }, 10);
  }

  public selectplan(elementcv:any,options:any,plan:any,product:any,pckage:any,group:any){
    console.log(plan)
    console.log(product)
      let plandetails = elementcv.attributes.data.value;

      let plandetailsobj = plandetails.split("##");
      if(options && options.length > 0){

        let coverage = product.planCoverage

        coverage = ["SINGLE","COUPLE","FAMILY"].includes(coverage)?coverage:null
        //console.log(obj)
        let productobj = {

       id: product.id,
       productId: product.productId,
       name: product.name,
       planProductId: product.planProductId,
       price: this._decimalPipe.transform(product.price1 || product.price,"1.2-2").replace(/,/g, ""),
       tax: this._decimalPipe.transform(product.calculatedTax ? product.calculatedTax.tax : 0,"1.2-2").replace(/,/g, ""),
       total: this._decimalPipe.transform(product.calculatedTax ? product.calculatedTax.total : 0,"1.2-2").replace(/,/g, ""),
       tax_details:product.bundledTaxes && product.bundledTaxes.length > 0? product.bundledTaxes: product.taxesDataJSON,
       calculatedTax: product.calculatedTax,
       bundledProducts: product.bundledProducts,
       planCoverage: product.planCoverage,
       planLevel: product.planlevel?product.planlevel.id:'',
       planLevelParent:product.planlevel?product.planlevel.parentId:"",
      description:product.description,
      coverage:coverage
        };


     let obj1 = {

          packageId: plan.packageId,
       packageName: pckage.name,

          planproductname: productobj.name,

          groupid: plan.planLevel,
       groupName: group.name,
       id: plan.id,
       name: plan.name,
       planLevel: plan.planLevel?plan.planLevel:group.id,
       planLevelParent: group.parentId,
       fusebillPlanID: plan.fusebillId,
       planFrequencyID: plan.frqMonthly,
       isBundle: plan.isBundle,
       coverage:coverage,
       planCoverage: product.planCoverage,
       bundledProducts: [],
       products: [],

        };
     obj1.products.push(productobj);
     this.planobjdata =obj1

     this.openplanoptions(elementcv, options,plan,product);
    }
      else{
        let obj = {
          isBundle:plan.isBundle,
          enrollmentDate: "",
          // "name":plandetailsobj[1]+"-"+plandetailsobj[2],
          name: plandetailsobj[14],
          details: plandetailsobj[0],
          packagename: plandetailsobj[0],
          groupName: plandetailsobj[1],
          amount: parseFloat(product.calculatedTax.price),
          planCoverage: plandetailsobj[2],
          planPrice: parseFloat(product.calculatedTax.price),
          amountUI:
            "$" + this._decimalPipe.transform(product.calculatedTax.price, "1.2-2"),
          gst:
            plandetailsobj[4] == null ||
            plandetailsobj[4] == "" ||
            plandetailsobj[4] == undefined ||
            plandetailsobj[4] == "null"
              ? 0
              : parseFloat(plandetailsobj[4]),
          hst:
            plandetailsobj[5] == null ||
            plandetailsobj[5] == "" ||
            plandetailsobj[5] == undefined ||
            plandetailsobj[5] == "null"
              ? 0
              : parseFloat(plandetailsobj[5]),
          pst:
            plandetailsobj[6] == null ||
            plandetailsobj[6] == "" ||
            plandetailsobj[6] == undefined ||
            plandetailsobj[6] == "null"
              ? 0
              : parseFloat(plandetailsobj[6]),
          qst:
            plandetailsobj[17] == null ||
            plandetailsobj[17] == "" ||
            plandetailsobj[17] == undefined ||
            plandetailsobj[17] == "null"
              ? 0
              : parseFloat(plandetailsobj[17]),
          gstCheck:
            plandetailsobj[4] == null ||
            plandetailsobj[4] == "" ||
            plandetailsobj[4] == undefined ||
            plandetailsobj[4] == "null"
              ? false
              : true,
          hstCheck:
            plandetailsobj[5] == null ||
            plandetailsobj[5] == "" ||
            plandetailsobj[5] == undefined ||
            plandetailsobj[5] == "null"
              ? false
              : true,
          pstCheck:
            plandetailsobj[6] == null ||
            plandetailsobj[6] == "" ||
            plandetailsobj[6] == undefined ||
            plandetailsobj[6] == "null"
              ? false
              : true,
          qstCheck:
            plandetailsobj[17] == null ||
            plandetailsobj[17] == "" ||
            plandetailsobj[17] == undefined ||
            plandetailsobj[17] == "null"
              ? false
              : true,
          id: parseFloat(plandetailsobj[7]),
          fusebillPlanID:
            plandetailsobj[8] == null ||
            plandetailsobj[8] == "" ||
            plandetailsobj[8] == undefined ||
            plandetailsobj[8] == "null"
              ? 0
              : parseFloat(plandetailsobj[8]),
          planFrequencyID:
            plandetailsobj[9] == null ||
            plandetailsobj[9] == "" ||
            plandetailsobj[9] == undefined ||
            plandetailsobj[9] == "null"
              ? 0
              : parseFloat(plandetailsobj[9]),
          optIn: plandetailsobj[10] == "true" ? true : false,
          planname: plandetailsobj[14],
          planLevel: parseInt(plandetailsobj[15]),
          packageId: parseInt(plandetailsobj[16]),
          options: [],
          //  "disallowedPlanLevels":plandetailsobj[11]
        };
        if (plandetailsobj[11] != null || plandetailsobj[11] != "null") {
          if (plandetailsobj[11].includes(plandetailsobj[12])) {

          }
        }

        let coverage = product.planCoverage

        coverage = ["SINGLE","COUPLE","FAMILY"].includes(coverage)?coverage:null
        //console.log(obj)
        let productobj = {
       id: product.id,
       productId: product.productId,
       name: product.name,
       planProductId: product.planProductId,
       price: this._decimalPipe.transform(product.price1 || product.price,"1.2-2").replace(/,/g, ""),
       tax: this._decimalPipe.transform(product.calculatedTax ? product.calculatedTax.tax : 0,"1.2-2").replace(/,/g, ""),
       total: this._decimalPipe.transform(product.calculatedTax ? product.calculatedTax.total : 0,"1.2-2").replace(/,/g, ""),
       tax_details:product.bundledTaxes && product.bundledTaxes.length > 0? product.bundledTaxes: product.taxesDataJSON,
       calculatedTax: product.calculatedTax,
       bundledProducts: product.bundledProducts,
       planCoverage: product.planCoverage,
       planLevel: product.planlevel?product.planlevel.id:'',
       planLevelParent:product.planlevel?product.planlevel.parentId:"",
      description:product.description,
      coverage:coverage
        };


     let obj1 = {

          packageId: plan.packageId,
       packageName: pckage.name,

          planproductname: productobj.name,

          groupid: plan.planLevel,
       groupName: group.name,
       id: plan.id,
       name: plan.name,
       planLevel: plan.planLevel?plan.planLevel:group.id,
       planLevelParent: group.parentId,
       fusebillPlanID: plan.fusebillId,
       planFrequencyID: plan.frqMonthly,
       isBundle: plan.isBundle,
       coverage:coverage,
       planCoverage: product.planCoverage,
       bundledProducts: [],
       products: [],

        };
     obj1.products.push(productobj);
     console.log(obj1)

      this.addtoplansummary(obj,obj1)
      }




    }

    showProviders(e:any){

     if(this.servicesDetails[e.target.value]?.provider.length!=0&&this.servicesDetails[e.target.value]?.provider!=undefined){
        this.showProvider=true;
        this.providersArray=this.servicesDetails[e.target.value].provider;
        this.uploadService.get('uploadhealthCardProvider').setValidators(Validators.required);
        this.uploadService.get('uploadhealthCardProvider').updateValueAndValidity();

     }
     else{
      this.showProvider=false;
      this.uploadService.get('uploadhealthCardProvider').clearValidators();
        this.uploadService.get('uploadhealthCardProvider').updateValueAndValidity();
      this.changeUploadService(e);
     }
    }

    changeUploadService(event:any){
       if(event.target.value.toString()!='null'){
        this.selectServiceError=false;
       }
       else{
        this.selectServiceError=true;
       }
    }


    public unselectplan(elementcv:any){



      let plandetails = elementcv.attributes.data.value;

      let plandetailsobj = plandetails.split("##");
      let obj = {
        enrollmentDate: "",
        // "name":plandetailsobj[1]+"-"+plandetailsobj[2],
        name: plandetailsobj[14],
        details: plandetailsobj[0],
        packagename: plandetailsobj[0],
        groupName: plandetailsobj[1],
        amount: parseFloat(plandetailsobj[3]),
        planCoverage: plandetailsobj[2],
        planPrice: parseFloat(plandetailsobj[3]),
        amountUI:
          "$" + this._decimalPipe.transform(plandetailsobj[3], "1.2-2"),
        gst:
          plandetailsobj[4] == null ||
          plandetailsobj[4] == "" ||
          plandetailsobj[4] == undefined ||
          plandetailsobj[4] == "null"
            ? 0
            : parseFloat(plandetailsobj[4]),
        hst:
          plandetailsobj[5] == null ||
          plandetailsobj[5] == "" ||
          plandetailsobj[5] == undefined ||
          plandetailsobj[5] == "null"
            ? 0
            : parseFloat(plandetailsobj[5]),
        pst:
          plandetailsobj[6] == null ||
          plandetailsobj[6] == "" ||
          plandetailsobj[6] == undefined ||
          plandetailsobj[6] == "null"
            ? 0
            : parseFloat(plandetailsobj[6]),
        qst:
          plandetailsobj[17] == null ||
          plandetailsobj[17] == "" ||
          plandetailsobj[17] == undefined ||
          plandetailsobj[17] == "null"
            ? 0
            : parseFloat(plandetailsobj[17]),
        gstCheck:
          plandetailsobj[4] == null ||
          plandetailsobj[4] == "" ||
          plandetailsobj[4] == undefined ||
          plandetailsobj[4] == "null"
            ? false
            : true,
        hstCheck:
          plandetailsobj[5] == null ||
          plandetailsobj[5] == "" ||
          plandetailsobj[5] == undefined ||
          plandetailsobj[5] == "null"
            ? false
            : true,
        pstCheck:
          plandetailsobj[6] == null ||
          plandetailsobj[6] == "" ||
          plandetailsobj[6] == undefined ||
          plandetailsobj[6] == "null"
            ? false
            : true,
        qstCheck:
          plandetailsobj[17] == null ||
          plandetailsobj[17] == "" ||
          plandetailsobj[17] == undefined ||
          plandetailsobj[17] == "null"
            ? false
            : true,
        id: parseFloat(plandetailsobj[7]),
        fusebillPlanID:
          plandetailsobj[8] == null ||
          plandetailsobj[8] == "" ||
          plandetailsobj[8] == undefined ||
          plandetailsobj[8] == "null"
            ? 0
            : parseFloat(plandetailsobj[8]),
        planFrequencyID:
          plandetailsobj[9] == null ||
          plandetailsobj[9] == "" ||
          plandetailsobj[9] == undefined ||
          plandetailsobj[9] == "null"
            ? 0
            : parseFloat(plandetailsobj[9]),
        optIn: plandetailsobj[10] == "true" ? true : false,
        planname: plandetailsobj[14],
        planLevel: parseInt(plandetailsobj[15]),
        packageId: parseInt(plandetailsobj[16]),
        options: [],
        //  "disallowedPlanLevels":plandetailsobj[11]
      };
      if (plandetailsobj[11] != null || plandetailsobj[11] != "null") {
        if (plandetailsobj[11].includes(plandetailsobj[12])) {

        }
      }

      this.removeplansummary(obj)


    }

    public addtoplansummary(obj:any,obj1:any){
      let planSummary = JSON.parse(sessionStorage.getItem("plansummary") || "[]")

      console.log(obj1)
       //console.log(planSummary)
       //console.log("addroplansummaryplans")
       //console.log(planSummary.length)
       //console.log(obj.id)
  console.log("obj",obj)

      this.addtoslectplans(obj.id,planSummary.length)
      planSummary.push(obj)


        let gstprice = 0;
        let hstprice = 0;
        let pstprice = 0;
        let qstprice = 0;

        if (obj.gst > 0) {
          gstprice = obj.planPrice * obj.gst;
          obj["gstPrice"] = parseFloat(
            this._decimalPipe.transform(gstprice, "1.2-2")
          );
        }
        else {
          obj["gstPrice"] = 0;
        }

        if (obj.hst > 0) {
          hstprice = obj.planPrice * obj.hst;

          obj["hstPrice"] = parseFloat(
            this._decimalPipe.transform(hstprice, "1.2-2")
          );
        }
        else {
          obj["hstPrice"] = 0;
        }

        if (obj.pst > 0) {
          pstprice = obj.planPrice * obj.pst;
          obj["pstPrice"] = parseFloat(
            this._decimalPipe.transform(pstprice, "1.2-2")
          );
        }
        else {
          obj["pstPrice"] = 0;
        }

        if (obj.qst > 0) {
          qstprice = obj.planPrice * obj.qst;
          obj["qstPrice"] = parseFloat(
            this._decimalPipe.transform(qstprice, "1.2-2")
          );
        }
        else {
          obj["qstPrice"] = 0;
        }

        obj["taxUI"] = "";
        if (obj["gstCheck"]) {
          obj["taxUI"] += "<span>";
          if (obj["gstPrice"] == 0) {
            obj["taxUI"] += "-";
          } else {
            obj["taxUI"] +=
              "$" +
              this._decimalPipe.transform(obj["gstPrice"], "1.2-2") +
              "&nbsp;(GST)";
          }
          obj["taxUI"] += "</span>";
        }

        if (obj["pstCheck"]) {
          obj["taxUI"] += "<span>";
          if (obj["pstPrice"] == 0) {
            obj["taxUI"] += "-";
          } else {
            obj["taxUI"] +=
              "$" +
              this._decimalPipe.transform(obj["pstPrice"], "1.2-2") +
              "&nbsp;(PST)";
          }
          obj["taxUI"] += "</span>";
        }

        if (obj["qstCheck"]) {
          obj["taxUI"] += "<span>";
          if (obj["qstPrice"] == 0) {
            obj["taxUI"] += "-";
          } else {
            obj["taxUI"] +=
              "$" +
              this._decimalPipe.transform(obj["qstPrice"], "1.2-2") +
              "&nbsp;(QST)";
          }
          obj["taxUI"] += "</span>";
        }

        if (obj["hstCheck"]) {
          obj["taxUI"] += "<span> ";
          if (obj["hstPrice"] == 0) {
            obj["taxUI"] += "-";
          } else {
            obj["taxUI"] +=
              "$" +
              this._decimalPipe.transform(obj["hstPrice"], "1.2-2") +
              "&nbsp;(HST)";
          }
          obj["taxUI"] += "</span>";
        }

        if (
          !obj["hstCheck"] &&
          !obj["gstCheck"] &&
          !obj["pstCheck"] &&
          !obj["qstCheck"]
        ) {
          obj["taxUI"] += "<span>-";

          obj["taxUI"] += "</span>";
        }

        // //console.log(object["taxUI"])

        obj["tax"] = parseFloat(
          this._decimalPipe.transform(
            obj1.products.reduce((acc, calculatedTax) => { return acc + calculatedTax.tax; }, 0),
            "1.2-2"
          )
        );

  // obj["products"] =obj1
  obj["coverage"] =obj1.coverage
  obj["planCoverage"] =obj1.planCoverage
  obj["planLevelParent"] =obj1.planLevelParent
  obj["planproductname"] =obj1.planproductname

  obj["products"] =obj1.products

        console.log(obj.planPrice)
        console.log(gstprice)
        console.log(hstprice)
        console.log(pstprice)

        console.log(qstprice)
        let pricecal = obj1.products.reduce((acc, calculatedTax) => { return acc + calculatedTax.total; }, 0)
        obj["totalPrice"] =pricecal


        obj["totalUI"] ="$" +this._decimalPipe.transform(pricecal,"1.2-2");

          obj["total"] =
          this._decimalPipe.transform(
            pricecal,
            "1.2-2"
          );

          console.log(obj1)

  obj["skuTotalPrice"] = obj1.products.reduce((acc, calculatedTax) => { return acc + calculatedTax.total; }, 0);

      let updatedSum = this.addtosum(obj.totalPrice)
      this.planssummarymain = [];
          this.planssummaryopt = [];

      planSummary.forEach((element: any) => {
        if (element.packagename != "Opt-in") {
          this.planssummarymain.push(element);
        } else {

          this.planssummaryopt.push(element);
        }
      });

      console.log(obj1)

      this.plansskumain.push(obj1)

      sessionStorage.setItem(
        "plansskumain",
        JSON.stringify(this.plansskumain)
      );
      sessionStorage.setItem(
        "plansummarymain",
        JSON.stringify(this.planssummarymain)
      );
      sessionStorage.setItem(
        "plansummaryopt",
        JSON.stringify(this.planssummaryopt)
      );

      sessionStorage.setItem(
        "plansummary",
        JSON.stringify(planSummary)
      );

      if (planSummary.length > 0) {
      } else {
      }
      if (updatedSum > 0) {
        this.cartcheckvalue = false;
      } else {
        this.cartcheckvalue = true;
      }

      setTimeout(() => {



        this.planssummarymain =
        JSON.parse(sessionStorage.getItem("plansummarymain")) || "";

        var total = 0;
        for (let i = 0; i < this.planssummarymain.length; i++) {
          total += parseFloat(this.planssummarymain[i].skuTotalPrice);
        }

        console.log(total);

        this.planAmount = this._decimalPipe
          .transform(total, "1.2-2")
          .replace(/,/g, "");
        sessionStorage.setItem("totalAmount", this.planAmount);


        if (this.planAmount > 0) {
          this.cartcheckvalue = false;
        } else {
          this.cartcheckvalue = true;
        }

   }, 100);

    }

    public removeplansummary(obj:any){

      let planSummary = JSON.parse(sessionStorage.getItem("plansummary"))


      //  //console.log("Beforeremoving")
       //console.log(planSummary)
       //console.log("removeingobject")
      //console.log(obj)


      // //console.log(obj.name)


      if(planSummary){
        //console.log("removeinplanid"+obj.id)
        let index = this.getslectedplans(obj.id)
         //console.log(index)

        if(index>-1){
          planSummary.splice(index,1)
        //console.log("afterremove")
        //console.log(planSummary)
        }
        else{
          return
        }

        // //console.log(planSummary)
        // //console.log(planSummary.length)
        //console.log("beforeremoveplans")
        let selectedPlans = JSON.parse(sessionStorage.getItem("selectedPlans"))
        var newselectedplans={}
  for(var i=0; i<planSummary.length;i++){
    newselectedplans[planSummary[i].id] =i

  }

  //console.log("newselectedPlans")
  //console.log(newselectedplans)
  sessionStorage.setItem("selectedPlans",JSON.stringify(newselectedplans))
        // this.removeslectplans(obj.id,planSummary.length)

        let gstprice = 0;
          let hstprice = 0;
          let pstprice = 0;
          let qstprice = 0;

          if (obj.gst > 0) {
            gstprice = obj.planPrice * obj.gst;
            obj["gstPrice"] = parseFloat(
              this._decimalPipe.transform(gstprice, "1.2-2")
            );
          } else {
            obj["gstPrice"] = 0;
          }

          if (obj.hst > 0) {
            hstprice = obj.planPrice * obj.hst;

            obj["hstPrice"] = parseFloat(
              this._decimalPipe.transform(hstprice, "1.2-2")
            );
          } else {
            obj["hstPrice"] = 0;
          }

          if (obj.pst > 0) {
            pstprice = obj.planPrice * obj.pst;
            obj["pstPrice"] = parseFloat(
              this._decimalPipe.transform(pstprice, "1.2-2")
            );
          } else {
            obj["pstPrice"] = 0;
          }
          if (obj.qst > 0) {
            qstprice = obj.planPrice * obj.qst;
            obj["qstPrice"] = parseFloat(
              this._decimalPipe.transform(qstprice, "1.2-2")
            );
          } else {
            obj["qstPrice"] = 0;
          }

          obj["taxUI"] = "";
          if (obj["gstCheck"]) {
            obj["taxUI"] += "<span>";
            if (obj["gstPrice"] == 0) {
              obj["taxUI"] += "-";
            } else {
              obj["taxUI"] +=
                "$" +
                this._decimalPipe.transform(obj["gstPrice"], "1.2-2") +
                "&nbsp;(GST)";
            }
            obj["taxUI"] += "</span>";
          }

          if (obj["pstCheck"]) {
            obj["taxUI"] += "<span>";
            if (obj["pstPrice"] == 0) {
              obj["taxUI"] += "-";
            } else {
              obj["taxUI"] +=
                "$" +
                this._decimalPipe.transform(obj["pstPrice"], "1.2-2") +
                "&nbsp;(PST)";
            }
            obj["taxUI"] += "</span>";
          }

          if (obj["qstCheck"]) {
            obj["taxUI"] += "<span>";
            if (obj["qstPrice"] == 0) {
              obj["taxUI"] += "-";
            } else {
              obj["taxUI"] +=
                "$" +
                this._decimalPipe.transform(obj["qstPrice"], "1.2-2") +
                "&nbsp;(QST)";
            }
            obj["taxUI"] += "</span>";
          }

          if (obj["hstCheck"]) {
            obj["taxUI"] += "<span> ";
            if (obj["hstPrice"] == 0) {
              obj["taxUI"] += "-";
            } else {
              obj["taxUI"] +=
                "$" +
                this._decimalPipe.transform(obj["hstPrice"], "1.2-2") +
                "&nbsp;(HST)";
            }
            obj["taxUI"] += "</span>";
          }

          if (
            !obj["hstCheck"] &&
            !obj["gstCheck"] &&
            !obj["pstCheck"] &&
            !obj["qstCheck"]
          ) {
            obj["taxUI"] += "<span>-";

            obj["taxUI"] += "</span>";
          }

          // //console.log(object["taxUI"])

          obj["tax"] = parseFloat(
            this._decimalPipe.transform(
              gstprice + hstprice + pstprice + qstprice,
              "1.2-2"
            )
          );
          obj["totalPrice"] =
              obj.planPrice + gstprice + hstprice + pstprice + qstprice,


          obj["totalUI"] =
            "$" +
            this._decimalPipe.transform(
              obj.planPrice + gstprice + hstprice + pstprice + qstprice,
              "1.2-2"
            );

            obj["total"] = parseFloat(
            this._decimalPipe.transform(
              obj.planPrice + gstprice + hstprice + pstprice + qstprice,
              "1.2-2"
            )
          );


        let updatedSum = this.removetosum(obj.totalPrice)
        this.planssummarymain = [];
            this.planssummaryopt = [];

        planSummary.forEach((element: any) => {
          if (element.packagename != "Opt-in") {
            this.planssummarymain.push(element);
          } else {

            this.planssummaryopt.push(element);
          }
        });



        sessionStorage.setItem(
          "plansummarymain",
          JSON.stringify(this.planssummarymain)
        );
        sessionStorage.setItem(
          "plansummaryopt",
          JSON.stringify(this.planssummaryopt)
        );

        sessionStorage.setItem(
          "plansummary",
          JSON.stringify(planSummary)
        );

        if (planSummary.length > 0) {
          // this.plansnexttab = false;
        } else {
          // this.plansnexttab = true;
        }
        if (updatedSum > 0) {
          this.cartcheckvalue = false;
        } else {
          this.cartcheckvalue = true;
        }
      }

      setTimeout(() => {



        this.planssummarymain =
        JSON.parse(sessionStorage.getItem("plansummarymain")) || "";

        var total = 0;
        for (let i = 0; i < this.planssummarymain.length; i++) {
          total += parseFloat(this.planssummarymain[i].skuTotalPrice);
        }

        console.log(total);

        this.planAmount = this._decimalPipe
          .transform(total, "1.2-2")
          .replace(/,/g, "");
        sessionStorage.setItem("totalAmount", this.planAmount);




   }, 100);
    }



    public addtoslectplans(planid:number,plansumamryindex:number){

      //console.log("beforeaddtoplans")
      //console.log(planid)
      //console.log(plansumamryindex)
      let selectedPlans = JSON.parse(sessionStorage.getItem("selectedPlans") || "{}")
      //console.log(selectedPlans)
      selectedPlans[planid]=plansumamryindex
      //console.log("afteraddtoplans")
      //console.log(selectedPlans)
      sessionStorage.setItem("selectedPlans",JSON.stringify(selectedPlans))

    }
    public removeslectplans(planid:number,plansumamryindex:number){


      //console.log("beforeremoveplans")
      let selectedPlans = JSON.parse(sessionStorage.getItem("selectedPlans"))

      //console.log(selectedPlans)
      delete selectedPlans[planid]




      for(const planid in selectedPlans){

        //console.log(planid)
        //console.log(selectedPlans[planid])

        if(selectedPlans[planid] !=0){
          selectedPlans[planid] = selectedPlans[planid]-1
          if(selectedPlans[planid]){

          }
        }
      }
      //console.log("adjustedselectedPlans")
      //console.log(selectedPlans)
      sessionStorage.setItem("selectedPlans",JSON.stringify(selectedPlans))


    }

    public getslectedplans(planid:number){
      //console.log(planid)
      let selectedPlans = JSON.parse(sessionStorage.getItem("selectedPlans") || "{}")
      //console.log(selectedPlans)
     return selectedPlans[planid]


    }
    public addtosum(amount:any){


  console.log("addtosum"+amount)

      // amount = Math.round((amount + Number.EPSILON) * 100) / 100;

      let selectedPlansAmount = parseFloat(sessionStorage.getItem("totalAmount") || "0.00")

      selectedPlansAmount = selectedPlansAmount+parseFloat(amount)

       console.log("selectedPlansAmount"+selectedPlansAmount)
      sessionStorage.setItem("totalAmount",this._decimalPipe.transform(selectedPlansAmount, "1.2-2").replace(/,/g, ""))

      sessionStorage.setItem(
        "totalAmountUI",
        "$" + this._decimalPipe.transform(selectedPlansAmount, "1.2-2").replace(/,/g, "")
      );



      this.planAmount = this._decimalPipe.transform(selectedPlansAmount, "1.2-2").replace(/,/g, "")


      return selectedPlansAmount


    }

    public removetosum(amount:number){

      let selectedPlansAmount = parseFloat(sessionStorage.getItem("totalAmount").replace(/,/g, ""))


      selectedPlansAmount = selectedPlansAmount-amount
      sessionStorage.setItem("totalAmount",this._decimalPipe.transform(selectedPlansAmount, "1.2-2").replace(/,/g, ""))
      sessionStorage.setItem(
        "totalAmountUI",
        "$" + this._decimalPipe.transform(selectedPlansAmount, "1.2-2").replace(/,/g, "")
      );


      this.planAmount = this._decimalPipe.transform(selectedPlansAmount, "1.2-2").replace(/,/g, "")
      return selectedPlansAmount

    }

    public openplanoptions(elementcv,options,plan,product){
      let plandetails = elementcv.attributes.data.value;

      let plandetailsobj = plandetails.split("##");


      let modifiedOptions = [];


      // this.plandetailsobjvalue = plandetailsobj;
      console.log(plandetails)
      console.log(product.id)

      this.plandetailsobjvalue = plandetails;


      options.forEach((element) => {
        element.planOptionsValues.forEach((options) => {
          options.planOptionName = element.name;
          options.json = JSON.stringify(options);
        });

        modifiedOptions.push(element);
      });

      this.optionstitle = modifiedOptions;
      this.showoptions =true;
      alert("startrhetre")
      setTimeout(() => {
        $('#showplanoptions-modal').modal('show');

      }, 1000);


    }
    public planoptionselection(event, optionvalue, optionid, optionvalueid) {
      // $(".optionselectionmethod-" + optionid)
      //   .not(this)
      //   .prop("checked", false);

      // $("#planselectionvalue-" + optionvalueid + "-" + optionid).prop(
      //   "checked",
      //   true
      // );

      this.optionmessage = "";
    }

    public confirmoptionsselection() {
      let optionumber = $("#optionumber").val();
      console.log("plandetailsobj",$("#plandetailsobj").val())

      let plandetailsobj = $("#plandetailsobj").val().split("##");

      let array = [];

      let optionarray = [];


      let checkvalue = true;

      for (let i = 1; i <= optionumber; i++) {
        checkvalue = checkvalue && $(".optionselectionmethod-" + i + ":checked").val();
      }

      if (!checkvalue) {
        this.optionmessage = "Please select all plan options";
        return;
      } else {
        this.optionmessage = "";
      }

      $("#showplanoptions-modal").modal("hide");


      if (sessionStorage.getItem("maritalStatus") == plandetailsobj[2]) {
      } else {
        if (sessionStorage.getItem("brokerType") == "EXECUTIVE") {
          $("#insuranceconfirmation-modal").modal("show");
        }
      }

      for (let i = 1; i <= optionumber; i++) {
        let optionobj: any = {};

        let selectedOptionValues = JSON.parse(
          $(".optionselectionmethod-" + i + ":checked").val()
        );
        // //console.log(selectedOptionValues)
        optionobj = selectedOptionValues;

        optionobj.name = selectedOptionValues.planOptionName;
        optionobj.value = selectedOptionValues.value;
        optionobj.planOptionsValueId = selectedOptionValues.planOptionsValueId;

        optionarray.push(optionobj);
      }

      // let plandetailsobj = $("#plandetailsobj").val().split(",");

      let obj = {
        enrollmentDate: "",
        // "name":plandetailsobj[1]+"-"+plandetailsobj[2],
        name: plandetailsobj[14],
        details: plandetailsobj[0],
        packagename: plandetailsobj[0],
        groupName: plandetailsobj[1],
        amount: parseFloat(plandetailsobj[3]),
        planCoverage: plandetailsobj[2],
        planPrice: parseFloat(plandetailsobj[3]),
        amountUI: "$" + this._decimalPipe.transform(plandetailsobj[3], "1.2-2"),
        gst:
          plandetailsobj[4] == null ||
          plandetailsobj[4] == "" ||
          plandetailsobj[4] == undefined ||
          plandetailsobj[4] == "null"
            ? 0
            : parseFloat(plandetailsobj[4]),
        hst:
          plandetailsobj[5] == null ||
          plandetailsobj[5] == "" ||
          plandetailsobj[5] == undefined ||
          plandetailsobj[5] == "null"
            ? 0
            : parseFloat(plandetailsobj[5]),
        pst:
          plandetailsobj[6] == null ||
          plandetailsobj[6] == "" ||
          plandetailsobj[6] == undefined ||
          plandetailsobj[6] == "null"
            ? 0
            : parseFloat(plandetailsobj[6]),
        qst:
          plandetailsobj[17] == null ||
          plandetailsobj[17] == "" ||
          plandetailsobj[17] == undefined ||
          plandetailsobj[17] == "null"
            ? 0
            : parseFloat(plandetailsobj[17]),
        gstCheck:
          plandetailsobj[4] == null ||
          plandetailsobj[4] == "" ||
          plandetailsobj[4] == undefined ||
          plandetailsobj[4] == "null"
            ? false
            : true,
        hstCheck:
          plandetailsobj[5] == null ||
          plandetailsobj[5] == "" ||
          plandetailsobj[5] == undefined ||
          plandetailsobj[5] == "null"
            ? false
            : true,
        pstCheck:
          plandetailsobj[6] == null ||
          plandetailsobj[6] == "" ||
          plandetailsobj[6] == undefined ||
          plandetailsobj[6] == "null"
            ? false
            : true,
        qstCheck:
          plandetailsobj[17] == null ||
          plandetailsobj[17] == "" ||
          plandetailsobj[17] == undefined ||
          plandetailsobj[17] == "null"
            ? false
            : true,
        id: parseFloat(plandetailsobj[7]),
        fusebillPlanID:
          plandetailsobj[8] == null ||
          plandetailsobj[8] == "" ||
          plandetailsobj[8] == undefined ||
          plandetailsobj[8] == "null"
            ? 0
            : parseFloat(plandetailsobj[8]),
        planFrequencyID:
          plandetailsobj[9] == null ||
          plandetailsobj[9] == "" ||
          plandetailsobj[9] == undefined ||
          plandetailsobj[9] == "null"
            ? 0
            : parseFloat(plandetailsobj[9]),
        optIn: plandetailsobj[10] == "true" ? true : false,
        planname: plandetailsobj[14],
        planLevel: parseInt(plandetailsobj[15]),
        packageId: parseInt(plandetailsobj[16]),
        options: optionarray || [],
        //  "disallowedPlanLevels":plandetailsobj[11]
      };
      if (plandetailsobj[11] != null || plandetailsobj[11] != "null") {
        if (plandetailsobj[11].includes(plandetailsobj[12])) {
          // elementcv.checked =false
        }
      }

      let obj1={}
      console.log(obj)
    this.addtoplansummary(obj,this.planobjdata)




    }



    public closeoptionsselection() {
      $("#showplanoptions-modal").modal("hide");
      let plandetailsobj = $("#plandetailsobj").val().split("##");

       console.log(plandetailsobj[19])
      // console.log(plandetailsobj[20])

      $("#plancheck" + plandetailsobj[19]).prop("checked", false);



      let optionumber = $("#optionumber").val();

      $("#showplanoptions-modal").modal("hide");

      for (let i = 1; i <= optionumber; i++) {
        $(".optionselectionmethod-" + i + ":checked").prop("checked", false);
      }
    }
  getPADdetails() {
    return false
    let endPoint = '/customer/'+this.customerid+'/achDetails'
    // let endPoint = '/customer/'+3493+'/achDetails'
    this.http.get(environment.apiUrl+'/api/ap/admin'+endPoint,{
      headers:{
        Authorization: 'Bearer ' + this.accessToken,
        'Content-Type': 'application/json',
    }}).subscribe((response:any)=>{
      if(response.status==200) {
        this.PADdetails = response.data.achDetails.data;
        if(this.PADdetails.padAgreement) {
          this.padAgreement = this.PADdetails.padAgreement;
        }
        this.voidCheckImage = this.PADdetails.voidCheckImage;
        console.log('voidCheckImage',this.voidCheckImage)
        const doc = new jsPDF();

        doc.addImage(this.voidCheckImage, 'JPEG', 10, 10, 190, 100);
        const pdfFile = doc.output('blob');
        this.voidCheckPdf = new File([pdfFile], 'voidCheque.pdf', { type: 'application/pdf' });
        console.log('voidCheckPdf',this.voidCheckPdf)
        this.voidCheckFileType = this.PADdetails.voidCheckFileType;
        if(this.padAgreement != null) {
          this.existVoid = true;
        }
        this.bankCode = this.PADdetails.bankCode;
        this.transitNumber = this.PADdetails.transitNumber;
        // this.accountNumber = this.maskNumber.transform(this.PADdetails.accountNumber);
        this.accountNumber = this.PADdetails.accountNumber

        this.getBankDetails();
      }
      else {
        // Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      }
    },(error)=>{
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    })
  }

  getBankDetails() {
    let data = this.PADdetails??{};
    data['branchCode'] = this.PADdetails.transitNumber;
      let accessToken = sessionStorage.getItem('accessToken');
      const bankInfoUrl = 'https://testcustomersapi.groupbenefitz.aitestpro.com/api/ep/customer/bank/verify';
      this.http.post(bankInfoUrl, data,{
        headers:{
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
      }}).subscribe((response:any)=>{
        if(response.status==200) {
          this.bank = response.data;
          this.address = this.bank.address;
          this.bankinformation = response.data.bank.name + "\n" + response.data.address.split(",").join("\n");
        }
        else {
          Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
        }
      }, (error)=>{
        Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.message})
      })
  }

  updateAddressForm() {
    // this.UpdateAddressComponent = true;
    console.log('this.customerData',this.customerData)
    this.addressform.patchValue(this.customerData);
    this.invalidpostalcodeprivince=false;
    this.addressform.markAllAsTouched();
  }

  updateAddress() {
    console.log(this.addressForm['postalCode'].valid)
    if(this.addressform.invalid) {
      this.addressform.markAllAsTouched();
      return;
    }
    else {
      const endPoint = '/customer/'+this.customerid+'/address';
      let data = this.addressform.value;
      data['firstName']=this.addressform.value.firstName;
      data['lastName']=this.addressform.value.lastName;
      data["street_address_line1"] = this.addressform.value.line1
      data["street_address_line2"] = this.addressform.value.line2
      if(data["street_address_line2"] == '') {
        data["street_address_line2"] = ' ';
      }
      data["postal_code"] = this.addressform.value.postalCode
      data["code"] = this.valisignform.value.code
      if(this.addressForm['secondaryPhone'].value==null) {
        data['secondaryPhone'] = '';
      }
      if(this.addressform.valid && this.invalidpostalcodeprivince==false){
        this.http.put(environment.apiUrl+'/api/ap'+endPoint, data,{
          headers:{
            Authorization: 'Bearer ' + this.accessToken,
            'Content-Type': 'application/json',
        }}).subscribe((response:any)=>{
          if(response.status==200) {
            this.getCustomerData();
            this.closeAddressmodal.nativeElement.click();
            Swal.fire({allowOutsideClick: false, title: 'Info', text: response.message });
          }
          else {
            Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
          }
        },(error) => {

          Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})

        });
      }
    }
  }


   alphabatesOnly(event: any) {
    const charCode = event.which ? event.which : event.keyCode;

    if(event.currentTarget.value.length==0){
      if((charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122)||((charCode >= 192 && charCode <= 255))||charCode==46||charCode==45||charCode==39||charCode==95)
        return true;
        else return false;
    }
    else{
      if (
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122) ||((charCode >= 192 && charCode <= 255))||
        charCode === 32||charCode==46||charCode==45||charCode==39||charCode==95)
        return true;
      else return false;
    }
  }
  alphanumericOnly(event: any) {
    const charCode = event.which ? event.which : event.keyCode;

    if (event.currentTarget.value.length === 0) {
      if (
        (charCode >= 48 && charCode <= 57) || // Numbers
        (charCode >= 65 && charCode <= 90) || // Uppercase letters
        (charCode >= 97 && charCode <= 122) || // Lowercase letters
        ((charCode >= 192 && charCode <= 255)) ||
        charCode === 46 || charCode === 45 || charCode === 39 || charCode === 95
      )
        return true;
      else return false;
    } else {
      if (
        (charCode >= 48 && charCode <= 57) || // Numbers
        (charCode >= 65 && charCode <= 90) || // Uppercase letters
        (charCode >= 97 && charCode <= 122) || // Lowercase letters
        ((charCode >= 192 && charCode <= 255)) ||
        charCode === 32 || charCode === 46 || charCode === 45 || charCode === 39 || charCode === 95
      )
        return true;
      else return false;
    }
  }

  updatePhoneNoForm() {
    this.phoneform.patchValue(this.customerData);
  }

  updatePhoneNo(value:any) {
    if(this.phoneform.invalid) {
      this.phoneform.markAllAsTouched();
      return;
    }
    else {
      const endPoint = '/customer/'+this.customerid+'/address';
      let data = this.phoneform.value;
      if(this.phoneForm['secondaryPhone'].value==null) {
        data['secondaryPhone'] = '';
      }
      this.http.put(environment.apiUrl+'/api/ap/admin'+endPoint, data,{
        headers:{
          Authorization: 'Bearer ' + this.accessToken,
          'Content-Type': 'application/json',
      }}).subscribe((response:any)=>{
        if(response.status==200) {
          this.getCustomerData();
          this.closePhonemodal.nativeElement.click();
          Swal.fire({allowOutsideClick: false, title: 'Info', text: response.message});
        }
        else {
          Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
        }
      },(error) => {
        Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
      });

    }

  }

  closePhoneModal() {
    this.phoneform.reset();
  }

  updateSpousePlan() {
    // this.UpdateSpousePlanComponent = true;
    this.spouseUpdate = true;
    this.spouseStatus = true;
    this.spouseform.patchValue(this.spouseInfo);
    this.spouseCoverage = this.spouseInfo.coveredByAnotherPlan;
    this.spouseForm['martialStatus'].clearValidators();
    this.spouseForm['martialStatus'].updateValueAndValidity();
    this.spouseForm['effectiveDate'].clearValidators();
    this.spouseForm['effectiveDate'].updateValueAndValidity();
    if(this.spouseCoverage===false) {
      this.spouseForm['insurer'].clearValidators();
      this.spouseForm['insurer'].updateValueAndValidity();
      this.spouseForm['healthPlan'].clearValidators();
      this.spouseForm['healthPlan'].updateValueAndValidity();

    }
  }

  updateSpouseDetails() {



    let data = this.spouseform.value;
    let spouseData = this.childrenInfo;

    // if(this.spouseForm['effectiveDate'].invalid || this.spouseForm['martialStatus'].invalid) {
    //   this.spouseform.markAllAsTouched();
    //   return;
    // }
    if(this.spouseform.invalid) {
      this.spouseform.markAllAsTouched();
      return;
    }
    else {
      // const endPoint = '/customer/'+this.customerid+'/lifeChange/spouse/add/true';
      const endPoint = '/customer/'+this.customerid+'/customerRelative/'+this.spouseId+'/details';

      let data = this.spouseform.value;
      // console.log(this.spouseForm['dob'].value)
      data["carrierName"]=this.spouseform.value.insurer;
      data["coverage"]=this.spouseform.value.healthPlan;
      // for(let spouse of spouseData){
      //   console.log(spouse)
      //   if(spouse["relationType"]=="spouse"){
      //    data["firstName"]=spouse.firstName;
      //    data["lastName"]=spouse.lastName;
      //    data["dob"]=spouse.dob;
      //    data["gender"]=spouse.gender;
      //    data["email"]=spouse.email;
      //    data["coverage"]=spouse.healthPlan;
      //    data["carrierName"]=spouse.insurer;
      //    data["healthPlan"]=spouse.healthPlan;
      //    data["insurer"]=spouse.insurer;
      //   }

      // }
      data["relationType"] = "SPOUSE"
      if(this.spouseform.value.coveredByAnotherPlan===true) {
        data["coveredByAnotherPlan"] = true
      }
      else {
        data["coveredByAnotherPlan"] = false
      }

      data["dob"]= this.datePipe.transform(new Date(this.spouseform.value.dob).toLocaleString(),'MM-dd-yyyy')
      console.log(data)
      this.http.put(environment.apiUrl+'/api/ap'+endPoint, data,{
        headers:{
          Authorization: 'Bearer ' + this.accessToken,
          'Content-Type': 'application/json',
      }}).subscribe((response:any)=>{
        if(response.status==200) {
          this.getCustomerData();
          this.closeSpousemodal.nativeElement.click();
          Swal.fire({allowOutsideClick: false, title: 'Info', text: response.message });
        }
        else {
          Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
        }
      },(error) => {
        Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
      });
    }
  }

  openCoverage(value:any) {
    this.coverage = value;
    if(this.coverage==='open') {
      this.spouseCoverage = true;
      this.spouseForm['insurer'].setValidators([Validators.required]);
      this.spouseForm['insurer'].updateValueAndValidity();
      this.spouseForm['healthPlan'].setValidators([Validators.required]);
      this.spouseForm['healthPlan'].updateValueAndValidity();
    }
    else {
      this.spouseForm['insurer'].reset();
      this.spouseForm['healthPlan'].reset();
      this.spouseForm['insurer'].clearValidators();
      this.spouseForm['insurer'].updateValueAndValidity();
      this.spouseForm['healthPlan'].clearValidators();
      this.spouseForm['healthPlan'].updateValueAndValidity();
    }
  }

  openDependentCoverage(value:any) {
    this.dependentCoverage = value;
    if(this.dependentCoverage==='open') {
      this.childCoverage = true;
      this.dependentForm['carrierName'].setValidators([Validators.required]);
      this.dependentForm['carrierName'].updateValueAndValidity();
    }
    else {
      this.dependentForm['carrierName'].reset();
      this.dependentForm['carrierName'].clearValidators();
      this.dependentForm['carrierName'].updateValueAndValidity();

    }
  }

  updateDependentForm(i: any) {
    // let i=this.currentIndexOfSwipperDependents-1;
    let childId=this.childrenInfo[i].id;
    this.dependentUpdate = true;
    this.dependentStatus = true;
    this.childrenId = childId;
    this.dependentform.patchValue(this.customerData.dependents.childrens[i]);
    this.childCoverage = this.customerData.dependents.childrens[i].coveredByAnotherPlan;
    this.specialNeeds = this.customerData.dependents.childrens[i].specialNeeds;
    this.postSecondaryStudent = this.customerData.dependents.childrens[i].postSecondaryStudent;
    // this.dependentForm['martialStatus'].clearValidators();
    // this.dependentForm['martialStatus'].updateValueAndValidity();
    this.dependentForm['effectiveDate'].clearValidators();
    this.dependentForm['effectiveDate'].updateValueAndValidity();
    if(this.childCoverage===false) {
      this.dependentForm['carrierName'].clearValidators();
      this.dependentForm['carrierName'].updateValueAndValidity();
      this.dependentForm['graduationDate'].clearValidators();
      this.dependentForm['graduationDate'].updateValueAndValidity();
    }
    if(this.postSecondaryStudent===false) {
      this.dependentForm['graduationDate'].clearValidators();
      this.dependentForm['graduationDate'].updateValueAndValidity();
    }
  }

  updateDependent() {
    if(this.dependentform.invalid) {
      this.dependentform.markAllAsTouched();
      return;
    }
    else {

      let childId = this.childrenId;
      const endPoint = '/customer/'+this.customerid+'/customerRelative/'+childId+'/details';
      let accessToken = sessionStorage.getItem('accessToken');
      let data = this.dependentform.value;
      data["relationType"] = "CHILDREN";
      // data["carrierName"]=this.dependentform.value.insurer;
      data["coverage"]=this.dependentform.value.healthPlan;
      data["coveredByAnotherPlan"]=this.dependentform.value.coveredByAnotherPlan===true?true:false;
      // if(this.dependentform.value.coveredByAnotherPlan===true) {
      //   data["coveredByAnotherPlan"] = true
      // }
      // else {
      //   data["coveredByAnotherPlan"] = false
      // }
      if(this.dependentform.value.coveredByAnotherPlan===false) {
        data["carrierName"] = ""
      }
      if(this.dependentform.value.postSecondaryStudent!=true) {
        data["graduationDate"] = ""
      }
      if(data["graduationDate"]){
        data['graduationDate']=moment(data['graduationDate']).format("MM-DD-YYYY");
      }
      else{
        data["graduationDate"] = ""
      }
      // data["carrierName"] = this.dependentform.value.coveredByAnotherPlan
      data["dob"]= this.datePipe.transform(new Date(this.dependentform.value.dob).toLocaleString(),'MM-dd-yyyy')
      this.http.put(environment.apiUrl+'/api/ap'+endPoint, data,{
        headers:{
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
      }}).subscribe((response:any)=>{
        if(response.status==200) {
          this.getCustomerData();
          this.closeDependentmodal.nativeElement.click();
          Swal.fire({allowOutsideClick: false, title: 'Info', text: response.message });
        }
        else {
          Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
        }
      },(error) => {
        Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
      });
    }
  }

  openGraduationDate(value:any) {
    this.graduationDate = value.currentTarget.checked;
    this.postSecondaryStudent = value.currentTarget.checked;
    if(this.postSecondaryStudent) {
      this.dependentForm['graduationDate'].setValidators([Validators.required]);
      this.dependentForm['graduationDate'].updateValueAndValidity();
    }
    else {
      this.dependentForm['graduationDate'].reset();
      this.dependentForm['graduationDate'].clearValidators();
      this.dependentForm['graduationDate'].updateValueAndValidity();
    }
  }

  closeDependentForm() {
    this.graduationDate = true;
    this.dependentCoverage = 'open';
    this.childCoverage = '';
  }

  closeSpouseForm() {
    this.spouseCoverage = '';
    this.coverage = 'open'
  }

  selectTab(tabName: string): void {
    this.selectedTab = tabName;
  }

  tabData() {
    this.selectedTab = 'tab1';
  }

  hicDetails() {
    // this.hicList = this.customerData.healthCards;
    this.hicList = this.customerData.HealthCards_New.data.apiFiles;
  }

  viewHealthCard(link:any) {
    this.src = link.fileName;
    this.healthCard = true;
    if(this.src=='') {
      this.card = true;
    }
  }

  clearpadsignature(){
    this.clearSignature()

  }
  closeHealthCard() {
    this.healthCard = false;
    this.displayStyle = "none";
    this.card = false;
  }

  closeDownloadBooklet() {
    this.hidebooklet = false;
  }

  download() {
    // Swal.fire({allowOutsideClick: false,
    //   icon: 'info',
    //   title: 'Are you sure you want to download helathcard?',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes',
    //   cancelButtonText: 'No',
    // })
  }

  downloadAllHic() {
    Swal.fire({allowOutsideClick: false,
      title: 'Alert',
      text: 'Download all healthcards?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Download',
    }).then((result) => {
      if (result.isConfirmed) {
        // this.hicList = this.customerData.healthCards;
        this.hicList = this.customerData.HealthCards_New.data.apiFiles;
        if(this.hicList.length>0) {
          for(let i=0;i<this.hicList.length;i++) {
              this.http.get(this.hicList[i].fileName, { responseType: "arraybuffer" }).subscribe(
              pdf => {
                const blob = new Blob([pdf], { type: "application/pdf" });
                const fileName = this.hicList[i].name+".pdf";
                saveAs(blob, fileName);
              },
              (error) => {
                Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
              }
            );
          }
        }
        else {
          Swal.fire({allowOutsideClick: false,title:'Info',text:'No Health Cards Found'})
        }
      }
      else {
        // document.getElementById("viewHicDetails").click();
        // $("#hicDetails").modal('show');

        // this.hicList = this.customerData.healthCards;
        // this.displayStyle = "block";
        // this.viewHicDetails();
        // this.display='block';
        // this.content.open();
        // this.content.nativeElement.style.display = 'block';
      }
    });
  }

  downloadHic(value:any) {
    this.http.get(value.fileName, { responseType: "arraybuffer" }).subscribe(
      pdf => {
        const blob = new Blob([pdf], { type: "application/pdf" });
        const fileName = value.name+".pdf";
        saveAs(blob, fileName);
      },
      (error) => {
        Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
      }
    );
  }

  checkAllCheckBox(value: any) {
    this.hicList.forEach(hic => hic.checked = value.target.checked)
  }

  isAllCheckBoxChecked() {
		return this.hicList.every(hic => hic.checked);
	}

  checkAllBooklets(value: any) {
    this.bookletList.forEach(booklet => booklet.checked = value.target.checked)
  }

  isAllBookletsChecked() {
		return this.bookletList.every(booklet => booklet.checked);
	}

  // disabledDownload() {
  //   this.bookletList = this.bookletList.filter((selected:any)=>selected.checked).map((selected: any)=>selected);
  //   if(this.bookletList.length>0) {
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }

  downloadSelected() {
    this.bookletList1 = this.bookletList.filter((selected:any)=>selected.checked).map((selected: any)=>selected);
    if(this.bookletList1.length>0) {
      for(let i=0;i<this.bookletList1.length;i++) {
        this.http.get(this.bookletList1[i].link, { responseType: "arraybuffer" }).subscribe(
          pdf => {
            const blob = new Blob([pdf], { type: "application/pdf" });
            const fileName = this.bookletList1[i].name+".pdf";
            saveAs(blob, fileName);
          },
          (error) => {
            Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
          }
        );
      }
    }
    else {
      Swal.fire({allowOutsideClick: false,title: 'Info',text:'No booklets Selected'})
    }
  }

  downloadAllHpBooklets() {
    // this.getHealthBooklets();
    Swal.fire({allowOutsideClick: false,
      title: 'Alert',
      text: 'Download all booklets?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Download',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if(result.isConfirmed) {
        if(this.bookletList.length>0) {
          for(let i=0;i<this.bookletList.length;i++) {
              this.http.get(this.bookletList[i].link, { responseType: "arraybuffer" }).subscribe(
              pdf => {
                const blob = new Blob([pdf], { type: "application/pdf" });
                const fileName = this.bookletList[i].name+".pdf";
                saveAs(blob, fileName);
              },
              (error) => {
                Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
              }
            );
          }
        }
        else {
          Swal.fire({allowOutsideClick: false,title:'Info',text:'No Booklets Found'})
        }
        // this.hicList = this.customerData.healthCards;
        this.hicList = this.customerData.HealthCards_New.data.apiFiles;
        if(this.hicList.length>0) {
          for(let i=0;i<this.hicList.length;i++) {
              this.http.get(this.hicList[i].fileName, { responseType: "arraybuffer" }).subscribe(
              pdf => {
                const blob = new Blob([pdf], { type: "application/pdf" });
                const fileName = this.hicList[i].name+".pdf";
                saveAs(blob, fileName);
              },
              (error) => {
                Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
              }
            );
          }
        }
        else {
          Swal.fire({allowOutsideClick: false,title:'Info',text:'No Health Cards Found'})
        }
        this.downloadRoe();
      }
      else {
        // this.getHealthBooklets();
        // this.displayBooklet = "block";
      }
    });
  }

  downloadHpbooklet(value:any) {
    this.http.get(value.link, { responseType: "arraybuffer" }).subscribe(
      pdf => {
        const blob = new Blob([pdf], { type: "application/pdf" });
        const fileName = value.name+".pdf";
        saveAs(blob, fileName);
      },
      (error) => {
        Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
      }
    );
  }


  getRoe() {
    console.log('retghvcg');
    setTimeout(() => {
      if(this.roeUrl!="") {
        // if(!hasWhiteSpace(this.roeUrl)) {
          this.roe = this.roeUrl;
          this.viewRoe = true;
        // }

      }
      else {
        // alert("2")
        this.viewRoe = false;
      }
      // else {
      //   let customerDataEndpoint = '/customer/'+this.customerid+'/ROE';
      //   this.http.get(environment.apiUrl+'/api/ap/admin'+customerDataEndpoint, {
      //     headers:{
      //       Authorization: 'Bearer ' + this.accessToken,
      //       'Content-Type': 'application/json',
      //   }}).subscribe((response:any)=>{
      //     if(response.status==200) {
      //       this.roe = response.data.roe;
      //     }
      //     else {
      //       Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      //     }
      //   },(error) => {
      //     Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
      //   });
      // }
    }, 1000);
  }

  closeRoe() {
    this.viewRoe = true;
  }

  downloadRoe() {
    this.getRoe();
    this.http.get(this.roe, { responseType: "arraybuffer" }).subscribe(
    pdf => {
      const blob = new Blob([pdf], { type: "application/pdf" });
      const fileName = this.roe+".pdf";
//       const fileName = this.roe+".pdf";
// const fileName = this.roe
      saveAs(blob, fileName);
    },
    (error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
    this.openRoe.nativeElement.click();
  }

  openPaymentDetails(value:any) {
    this.openUpdatePaymentForm = value;
    if(value == 'close') {
      Object.keys(this.paymentMethodControls).forEach(controlName => {
        if (controlName !== 'paymentmethod') {
          const control = this.paymentMethodControls[controlName];
          control.reset();
        }
      });
      this.bankDetails = false;
      this.resetButton = false;
      this.uploadCheque = false;
      setTimeout(() => {
        this.closePaymenttoPAD.nativeElement.click();
      }, 1000);
    }
  }

  public provincelist(event: any) {
    this.configprovinceres.forEach((element: any) => {
      if (element.shortName == event.target.value) {
        this.provincialZipcodes = element.zipcodes.split(',');
        this.provincelistid = element.id;
        this.state_id = parseInt(element.fusebillId);
        this.statename = element.name;
      }
    });
    if (this.addressform.value.postalCode) {
      if (
        this.provincialZipcodes.indexOf(
          this.addressform.value.postalCode[0]
        ) == -1
      ) {
        this.invalidpostalcodeprivince = true;
        this.addressForm['postalCode'].markAsTouched();
        // this.addressForm['postalCode'].updateValueAndValidity();
      } else {
        this.invalidpostalcodeprivince = false;
      }
      if (this.addressform.value.postalCode.length == 0) {
        this.invalidpostalcodeprivince = false;
      }
    }
  }

  changeTextToUppercase(event: any) {
    const inputValue = this.addressform.get('postalCode')?.value;
    this.addressform.get('postalCode')?.setValue(inputValue.toUpperCase(), { emitEvent: false });
    this.postalvalue = event.target.value;
    if (this.provincialZipcodes.indexOf(this.postalvalue[0]) == -1) {
      this.invalidpostalcodeprivince = true;
      this.addressForm['postalCode'].markAsTouched();
    } else {
      this.invalidpostalcodeprivince = false;
    }
    if (this.postalvalue.length == 0) {
      this.invalidpostalcodeprivince = false;
    }
  }

  upperCase(event:any) {
    console.log(event.data)
    const inputValue = event.data;
    console.log(this.paymentform.get('postalcode')?.value)
    if(inputValue!=null) {
      this.paymentform.get('postalcode')?.setValue(inputValue.toUpperCase(), { emitEvent: false });
    }
  }

  phoneFormat(event:any) {
    if(event.target.id == 'primaryPhone') {
      const inputValue = this.addressform.get('primaryPhone')?.value;
      this.addressform.get('primaryPhone')?.setValue(this.phoneNoFormat.transform(inputValue), { emitEvent: false });
      // this.addressform.get('primaryPhone')?.setValue(inputValue, { emitEvent: false });

    }
    else if(event.target.id == 'secondaryPhone') {
      const inputValue = this.addressform.get('secondaryPhone')?.value;
      this.addressform.get('secondaryPhone')?.setValue(this.phoneNoFormat.transform(inputValue), { emitEvent: false });
      // this.addressform.get('secondaryPhone')?.setValue(inputValue, { emitEvent: false });

    }

  }

  getBankInfo() {
    if(this.paymentMethodForm.invalid) {
      this.paymentMethodForm.markAllAsTouched();
      return
    }
    else {
      let data = this.paymentMethodForm.value;
      let accessToken = sessionStorage.getItem('accessToken');
      const bankInfoUrl = 'https://testcustomersapi.groupbenefitz.aitestpro.com/api/ep/customer/bank/verify';
      this.http.post(bankInfoUrl, data,{
        headers:{
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
      }}).subscribe((response:any)=>{
        if(response.status==200) {
          this.bankDetails = true;
        }
        else {
          Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
        }
        this.bankInfo = response.data;
        this.address = this.bankInfo.address;
        this.bankAddress = this.bankInfo.address.split(', ');
        this.resetButton = true;
        this.uploadCheque = true;
      },(error) => {
        Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
      });
    }
  }

  openpad() {
    this.openUpdatePaymentForm = 'close';
  }

  closeChangeToPad() {
    this.paymentMethodForm.reset();
    this.paymentMethodForm.get('paymentmethod')?.setValue('');
    this.resetButton = false;
    this.uploadCheque = false;
    this.bankDetails = false;
    this.previewbutton = false;
    this.paymentMethodForm.get('files')?.setValue('');
  }

  closepadinfo() {
    this.bankinfo = true;
    this.resetbutton = true;
    this.cheque = false;
    this.paymentMethodForm.reset();
    this.paymentMethodForm.get('paymentmethod')?.setValue('');
    this.resetButton = false;
    this.uploadCheque = false;
    this.bankDetails = false;
    this.updatepreviewbutton = false;
    this.existVoid = true;
    this.padform.get('file')?.setValue('');
    this.paymentMethodForm.get('files')?.setValue('');
    this.voidCheckFileType = this.PADdetails.voidCheckFileType;
  }

  updateBankInfo() {
    if(this.padform.invalid) {
      this.padform.markAllAsTouched();
      return
    }
    else {
      let data = this.padform.value;
      data['branchCode'] = this.padform.value.transitNumber
      data['accountNumber'] = this.padform.value.accountNo
      data['bankCode'] = this.padform.value.bankcode
      let accessToken = sessionStorage.getItem('accessToken');
      const bankInfoUrl = 'https://testcustomersapi.groupbenefitz.aitestpro.com/api/ep/customer/bank/verify';
      this.http.post(bankInfoUrl, data,{
        headers:{
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
      }}).subscribe((response:any)=>{
        if(response.status==200) {
          this.banknameres = response.data.bank.name + "\n" + response.data.address.split(",").join("\n");
          this.bankinfo = true;
        }
        else {
          Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
        }
        this.bank = response.data;
        this.address = this.bank.address;
        this.bankAddress = this.bank.address.split(', ');
        this.resetbutton = true;
        this.cheque = true;
      },(error) => {
        Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
      });
    }
  }

  valisignModal() {
    this.showTimer = true;
    this.timer(1);
    const endPoint = '/customer/'+this.customerid+'/address/initialize';
    this.http.get(environment.apiUrl+'/api/ap/admin'+endPoint,{
      headers:{
        Authorization: 'Bearer ' + this.accessToken,
        'Content-Type': 'application/json',
    }}).subscribe((response:any)=>{
      // if(response.status==200) {
      //     Swal.fire({allowOutsideClick: false, title: 'Info', text: response.message });
      //   }
      // else {
      //   Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      // }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
  }

  closeValisign() {
    clearInterval(this.startTimer);
  }

  timer(minute:any) {
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;
    const prefix = minute < 10 ? "0" : "";
    this.startTimer = setInterval(() => {
      seconds--;
      if (statSec != 0) {
        statSec--;
      }
      else {
        statSec = 59;
      }
      if (statSec < 10) {
        textSec = "0" + statSec;
      }
      else {
        textSec = statSec;
      }
      this.displayTimer = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0) {
        clearInterval(this.startTimer);
        this.showTimer = false;
      }
    }, 1000);
  }

  getHealthBooklets() {
    let Endpoint = '/customer/'+this.customerid+'/booklets/false/false';
    this.http.get(environment.apiUrl+'/api/ap/admin'+Endpoint, {
      headers:{
        Authorization: 'Bearer ' + this.accessToken,
        'Content-Type': 'application/json',
    }}).subscribe((response:any)=>{
      if(response.status==200) {
        this.bookletList = response.data;
      }
      else {
        Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
  }

  getInvoices() {
    let Endpoint = '/v2/'+this.customerid+'/invoices';
    this.http.post(environment.apiUrl+'/api/ap'+Endpoint,{}, {
      headers:{
        Authorization: 'Bearer ' + this.accessToken,
        'Content-Type': 'application/json',
    }}).subscribe((response:any)=>{
      if(response.status==200) {
        this.invoiceResponse = response.data.invoices;
        this.upcomingInvoice = response.data.upcomingInvoice;
      }
      else {
        Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
  }

  getDraftInvoice() {
    let Endpoint = '/v2/'+this.customerid+'/invoices';
    this.http.post(environment.apiUrl+'/api/ap'+Endpoint, {}, {
      headers:{
        Authorization: 'Bearer ' + this.accessToken,
        'Content-Type': 'application/json',
    }}).subscribe((response:any)=>{
      if(response.status==200) {
        this.invoicedraftData = response.data.invoice;
      }
      else {
        Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
  }
  triggerFileInput(): void {
    // Use the native element here
    this.fileInput.nativeElement.click();
  }

  closeUploadHealthCard(){
      this.uploadService.reset();
      let formControl=Object.keys(this.uploadService);
      for(let key of formControl){
        this.uploadService.get(key).setValue(null);
      this.uploadService.get(key).updateValueAndValidity();
      }

  }

  uploadRoe(event: any) {
    // alert("uploadRoe");
    var fileExtension = '.' + event.target.files[0].name.split('.').pop();
    this.isFileUploaded = true
    this.imagedisplay = null;
    // alert(event.target.files[0].name.replace(event.target.files[0].name,"void.pdf"))
    this.bankfile = event.target.files[0];
    var allowedMimes = [
      "application/pdf",
    ];

    let error = false;
    let message = "";

    if (allowedMimes.includes(this.bankfile.type)) {
      if (this.bankfile.size <= 300 * 1024) {
        //300KB
        error = false;

      } else {
        error = true;
        message = "File size is too large,maximum file size is 300kb";
      }
    }
    else {
      error = true;
      message = "Invalid file type. Only pdf files is allowed.";
    }

    if (error) {
      Swal.fire({
        title: "Error",
        html: message,
        width: "50%",
        showCancelButton: false,
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.value) {
          this.myFileInput.nativeElement.value = null;
        } else {
        }
      });
    }

    else {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imagedisplay = reader.result;
        console.log("imgedisplay :",this.imagedisplay);

    let accessToken = sessionStorage.getItem('accessToken');
    let customerDataEndpoint = `/${this.customerid}/uploadROE`;
    var formData: any = new FormData();

    formData.append("firstName",this.customerData.firstName);
    formData.append("roe",this.bankfile);

    this.http.post(environment.apiUrl+'/api/ap/customer'+customerDataEndpoint,formData,
    { headers:{
        'Authorization': 'Bearer ' + accessToken,
          // 'Content-Type': 'application/pdf',
        // 'Content-Type': 'multipart/form-data',
        'Accept' :'*',

    }}).subscribe((response:any)=>{

      if(response.status==200) {
       console.log(response);
       this.myFileInput.nativeElement.value = null;
       Swal.fire({title: 'Info', text: response.message}).then((result) => {
        if (result.value) {
          this.getCustomerData();
        } else {
        }
      });
      }
      else {
        Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message});
        this.myFileInput.nativeElement.value = null;
      }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message});
      this.myFileInput.nativeElement.value = null;
    });
      };
    }

  }

  uploadServiceType(event: any) {
    let error = false;

    let message = "";

    var fileExtension = '.' + event.target.files[0].name.split('.').pop();
    this.isFileUploaded = true
    this.imagedisplay = null;
    // alert(event.target.files[0].name.replace(event.target.files[0].name,"void.pdf"))
   

    var allowedMimes = [
      "application/pdf",
    ];
    if(this.uploadService.invalid&&this.noService){
      // return false;noService
      error = true;
      message = "Please select Service And Provider";
    }
    this.bankfileArray=[];
    console.log("file",event.target.files[0])
    for(let i =0 ;i <event.target.files.length;i++){
      this.bankfileArray.push( event.target.files[i]);
      console.log("arrayaaas",this.bankfileArray);
      if (allowedMimes.includes(this.bankfileArray[0].type)) {
        if (this.bankfileArray[0].size <= 1000 * 1024) {
          //300KB
          error = false;
  
        } else {
          error = true;
          message = "File size is too large,maximum file size is 300kb";
        }
      } else {
        error = true;
        message = "Invalid file type. Only pdf file is allowed.";
      }
  
      if (error) {
        Swal.fire({
          title: "Error",
          html: message,
          width: "50%",
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.value) {
            this.myFileInputService.nativeElement.value = null;
            this.uploadService.get('uploadhealthCardFile').setValue(null);
            this.uploadService.get('uploadhealthCardFile').updateValueAndValidity();
          } else {
          }
        });
      }
  
      else {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
  
        reader.onload = (_event) => {
          this.imagedisplay.push(reader.result);
          console.log("imgedisplay :",this.imagedisplay);
  
  
        };
      }
    }
  
}

UploadHealthCard(){
  if(!this.noService){
    let controls=['uploadhealthCard','uploadhealthCardProvider']
    for(let control of controls){
      this.uploadService.get(control).clearValidators();
      this.uploadService.get(control).updateValueAndValidity();
    }
  }
     if(this.uploadService.invalid){//this.uploadService.invalid&&this.noService
      this.uploadService.markAllAsTouched();
      return false;
     }else{
      let accessToken = sessionStorage.getItem('accessToken');
      let customerDataEndpoint = `/${this.customerid}/uploadHealthcard`;
      var formData: any = new FormData();
      let service;
      let provider;
          if(Object.keys(this.servicesDetails).length>0){
            service=this.servicesDetails[this.uploadService.get('uploadhealthCard').value]??['service'];
            provider=this.uploadService.get('uploadhealthCardProvider').value;
          }else{
             service="";
             provider="";
          }



      formData.append("firstName",this.customerData.firstName);
      formData.append("service",service.replaceAll(' ','')||'');
      // formData.append("card",this.bankfileArray);
      for (let i = 0; i < this.bankfileArray.length; i++) {
        formData.append("card",this.bankfileArray[i]);
      }

      formData.append("provider",provider.replace(' ',"")||'')

      this.http.post(environment.apiUrl+'/api/ap/customer'+customerDataEndpoint,formData ,
      { headers:{
          Authorization: 'Bearer ' + accessToken,
          'Accept' :'*'

      }}).subscribe((response:any)=>{

        if(response.status==200) {
         console.log(response);
         this.getCustomerData();
         $('#healthCardDropdown').modal('hide');
         this.uploadService.get('uploadhealthCardFile').setValue(null);
         this.uploadService.get('uploadhealthCardFile').updateValueAndValidity();
         Swal.fire({allowOutsideClick: false,title: 'Info', text:response.message}).then((res)=>{
          if(res.value){
            // this.getCustomerData();
            // $('#healthCardDropdown').modal('hide');
            // this.uploadService.get('uploadhealthCardFile').setValue(null);
            // this.uploadService.get('uploadhealthCardFile').updateValueAndValidity();
          }
         });
        }
        else {
          Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message}).then((result) => {
            if (result.value) {
              this.uploadService.get('uploadhealthCardFile').setValue(null);
              this.uploadService.get('uploadhealthCardFile').updateValueAndValidity();
              this.myFileInputService.nativeElement.value = null;
            } else {
            }
          });
        }
      },(error) => {
        Swal.fire({allowOutsideClick: false,title: 'Error', text: error.message}).then((result) => {
          if (result.value) {
            this.uploadService.get('uploadhealthCardFile').setValue(null);
            this.uploadService.get('uploadhealthCardFile').updateValueAndValidity();
            this.myFileInputService.nativeElement.value = null;
          } else {
          }
        });
      });
}

}

  getCreditcard() {

    return false
    let Endpoint = '/customer/'+this.customerid+'/creditCards';
    this.http.get(environment.apiUrl+'/api/ap'+Endpoint, {
      headers:{
        Authorization: 'Bearer ' + this.accessToken,
        'Content-Type': 'application/json',
    }}).subscribe((response:any)=>{
      if(response.status==200) {
        this.ccDetails = response.data[0];
        this.publicapikey = response.data[0].publicKey;
        // this.paymentMethodId = response.data[0].paymentMethodId;
        this.creditCardNo = response.data[0].maskedCardNumber;
        this.fullName = response.data[0].firstName + ' ' + response.data[0].lastName;
        this.expire = response.data[0].expirationMonth +'/'+ response.data[0].expirationYear;
      }
      else {
        // Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
  }


  getHealthCards() {
    let customerDataEndpoint = '/customer/'+this.customerid+'/uploadHealthcard';
    this.http.get(environment.apiUrl+'/api/ap'+customerDataEndpoint, {
      headers:{
        Authorization: 'Bearer ' + this.accessToken,
        'Content-Type': 'application/json',
    }}).subscribe((response:any)=>{
      if(response.status==200) {
        console.log('responceOfHealthCards',response);
        this.servicesDetails = response.data.healthcard_services_with_providers;
        this.showProvider=false;
        if(Object.keys( this.servicesDetails).length>0){
          this.noService=true;
          // this.uploadService.invalid
          let keys=Object.keys( this.uploadService);
          for (let key of keys){
            this.uploadService.get(key).clearValidators();
            this.uploadService.get(key).updateValueAndValidity();
          }

        }else{
          this.noService=false;
        }

      }
      else {
        Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
  }
  viewBooklet(value:any) {
    console.log('bookletlink',value)
    setTimeout(() => {
      this.bookletLink =  value;
    }, 1000);
    this.hidebooklet = true;
  }

  closeBooklet() {
    this.hidebooklet = false;
    this.displayBooklet = "none";
  }

  // lifeEventChanges() {
  //   Swal.fire({allowOutsideClick: false,title:'Info',text:"Work in progress!"});
  // }

  resetPaymentForm() {
    this.paymentMethodControls['bankCode'].reset();
    this.paymentMethodControls['branchCode'].reset();
    this.paymentMethodControls['accountNumber'].reset();
    this.paymentMethodControls['files'].reset();
    this.bankDetails = false;
    this.uploadCheque = false;
    this.resetButton = false;
    // document.getElementById('bankDetails')?.remove();
  }

  resetPadForm() {
    this.bankinfo = false;
    this.cheque = false;
    this.resetbutton = false;
    this.padForm['bankcode'].reset();
    this.padForm['transitNumber'].reset();
    this.padForm['accountNo'].reset();
    this.padForm['file'].reset();
    this.existVoid = false;
    // document.getElementById('bankinfo')?.remove();
  }

  onFileSelect(event:any) {
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.paymentMethodForm.get('files')?.setValue(file);
    // }
    this.fileExtension = "." + event.target.files[0].name.split(".").pop();
    this.paymentVoidCheque = event.target.files[0];
    this.selectedBase64 = this.convertFile(this.paymentVoidCheque);
    // if(this.paymentVoidCheque) {
    //   const reader = new FileReader();
    //   reader.readAsBinaryString(this.paymentVoidCheque);
    //   reader.onload = (e) => {
    //     this.selectedBase64 = e.target?.result as string;
    //   };
    // }

    var allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "application/pdf",
    ];
    let error = false;
    let message = "";
    if (allowedMimes.includes(this.paymentVoidCheque.type)) {
      if (this.paymentVoidCheque.size <= 600 * 1024) {
        error = false;
      } else {
        error = true;
        message = "File size is too large,maximum file size is 600kb";
      }
    } else {
      error = true;
      message = "Invalid file type. Only jpg, png image,pdf files are allowed.";
    }
    if (error) {
      Swal.fire({allowOutsideClick: false,
        title: "Error",
        html: message,
        width: "50%",
        showCancelButton: false,
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.value) {
          this.paymentMethodForm.get('files')?.reset();
        } else {
        }
      });
    }
    else {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imagedisplay = reader.result;
        this.previewbutton = true;
      };
    }
  }

  fileSelect(event:any) {
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.paymentMethodForm.get('files')?.setValue(file);
    // }
    this.fileExtension = "." + event.target.files[0].name.split(".").pop();
    if(this.fileExtension == '.pdf') {
      this.voidCheckFileType = 'application/pdf';
    }
    else {
      this.voidCheckFileType = 'image/jpeg';
    }
    this.paymentVoidCheque = event.target.files[0];
    this.selectedBase64 = this.convertFile(this.paymentVoidCheque);
    // if(this.paymentVoidCheque) {
    //   const reader = new FileReader();
    //   reader.readAsBinaryString(this.paymentVoidCheque);
    //   reader.onload = (e) => {
    //     this.selectedBase64 = e.target?.result as string;
    //   };
    // }

    var allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "application/pdf",
    ];
    let error = false;
    let message = "";
    if (allowedMimes.includes(this.paymentVoidCheque.type)) {
      if (this.paymentVoidCheque.size <= 600 * 1024) {
        error = false;
      } else {
        error = true;
        message = "File size is too large,maximum file size is 600kb";
      }
    } else {
      error = true;
      message = "Invalid file type. Only jpg, png image,pdf files are allowed.";
    }
    if (error) {
      Swal.fire({allowOutsideClick: false,
        title: "Error",
        html: message,
        width: "30%",
        showCancelButton: false,
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.value) {
          this.paymentMethodForm.get('files')?.reset();
        } else {
        }
      });
    }
    else {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imagedisplay = reader.result;
        this.updatepreviewbutton = true;
        if(this.padform.get('file')?.value!='') {
          this.review = false;
        }
      };
    }
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) =>{
      if(event.target?.result) {
        result.next(btoa(event.target.result.toString()));
      }
    }
    return result;
  }

  DataURIToBlob(dataURI: string) {
    const byteCharacters = atob(dataURI);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: 'application/octet-stream' });
  }

  generateCorporatePAD() {

    let inputData1 = {
      bankCode: this.paymentMethodForm.get("bankCode")?.value,
      branchCode: this.paymentMethodForm.get("branchCode")?.value,
      accountNumber: this.paymentMethodForm.get("accountNumber")?.value,
    };
    let bankAddress = this.address;
    let bankAdressArr = bankAddress.split(",")
    let provincePostal = bankAdressArr[bankAdressArr.length - 1];
    let provincePostalArr = provincePostal.split(" ");
    let bankobject = {
      name: this.bankInfo.bank.name,
      address: this.bankInfo.bank.address.split(",")[0],
      city: bankAdressArr[bankAdressArr.length - 2].replace(" ", ''),
      province: provincePostalArr[provincePostalArr.length - 3],
      postalCode: provincePostalArr[provincePostalArr.length - 2] + " " + provincePostalArr[provincePostalArr.length - 1],
    }
    //  var fileExtension = '.' +this.bankfile.name.split('.').pop();
    // event.target.files[0].name ="void_cheque_"+Date.now()+fileExtension
    var fileExtension = "." + this.paymentVoidCheque.name.split(".").pop();
    this.encBank = btoa(JSON.stringify(inputData1));
    var formData:any = new FormData();
    formData.append("bank", JSON.stringify(bankobject));
    // formData.append("files", this.paymentVoidCheque, this.paymentVoidCheque.name);
    formData.append(

      "files",

      this.paymentVoidCheque,

      "void_cheque_" + Date.now() + fileExtension.toLowerCase()

    );
    // formData.append("files", this.paymentVoidCheque,"void_cheque_"+Date.now()+this.fileExtension.toLowerCase());
    // if(this.selectedBase64) {
    //   let file = this.DataURIToBlob(this.selectedBase64);
    //   let file = this.selectedBase64._buffer[0];
      // formData.append("files", file, this.paymentVoidCheque.name);
    // }
    // formData.append("files", this.bankfile.name,"void.pdf");
    formData.append("session",this.encBank) || "";
    formData.append("timestamp", new Date().getTime());
    let Endpoint = '/'+this.customerid+'/generatePAD';
    // let data = this.paymentMethodForm.value.files;
    this.http.post(environment.apiUrl+'/api/ap'+Endpoint, formData, {
      headers:{
        Authorization: 'Bearer ' + this.accessToken,
    }}).subscribe((response:any)=>{
      if(response.status==200) {
        this.pad = response.data.url;
        this.filename = response.data.filename;
        this.padfilename = response.data.padfilename;
        this.ext = response.data.ext;
        this.mimetype = response.data.mimetype;
      }
      else {
        Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
  }

  updateCorporatePAD() {

    let inputData1 = {
      bankCode: this.padform.get("bankcode")?.value,
      branchCode: this.padform.get("transitNumber")?.value,
      accountNumber: this.padform.get("accountNo")?.value,
      amount: this.PADdetails.nextBillingPrice,
      customerId: this.customerid
    };
    let bankAddress;
    if(this.address==null) {
      bankAddress = this.bankinformation;
    }
    else {
      bankAddress = this.address;
    }
    let bankAdressArr = bankAddress.split(",")
    let provincePostal = bankAdressArr[bankAdressArr.length - 1];
    let provincePostalArr = provincePostal.split(" ");
    let bankobject = {
      name: this.bank.bank.name,
      address: this.bank.bank.address.split(",")[0],
      city: bankAdressArr[bankAdressArr.length - 2].replace(" ", ''),
      province: provincePostalArr[provincePostalArr.length - 3],
      postalCode: provincePostalArr[provincePostalArr.length - 2] + " " + provincePostalArr[provincePostalArr.length - 1],
    }
    //  var fileExtension = '.' +this.bankfile.name.split('.').pop();
    // event.target.files[0].name ="void_cheque_"+Date.now()+fileExtension;
    const doc = new jsPDF();

    doc.addImage(this.voidCheckImage, 'JPEG', 10, 10, 190, 100);
    const pdfFile = doc.output('blob');
    this.voidCheckPdf = new File([pdfFile], 'voidCheque.pdf', { type: 'application/pdf' });
    if(!this.paymentVoidCheque) {

      this.paymentVoidCheque = this.voidCheckPdf;
      console.log(this.paymentVoidCheque)
    }
    console.log(this.paymentVoidCheque)
    var fileExtension = "." + this.paymentVoidCheque.name.split(".").pop();
    this.encBank = btoa(JSON.stringify(inputData1));
    var formData:any = new FormData();
    formData.append("bank", JSON.stringify(bankobject));
    // formData.append("files", this.paymentVoidCheque, this.paymentVoidCheque.name);
    formData.append(

      "files",

      this.paymentVoidCheque,

      "void_cheque_" + Date.now() + fileExtension.toLowerCase()

    );
    // formData.append("files", this.paymentVoidCheque,"void_cheque_"+Date.now()+this.fileExtension.toLowerCase());
    // if(this.selectedBase64) {
    //   let file = this.DataURIToBlob(this.selectedBase64);
    //   let file = this.selectedBase64._buffer[0];
      // formData.append("files", file, this.paymentVoidCheque.name);
    // }
    // formData.append("files", this.bankfile.name,"void.pdf");
    formData.append("session",this.encBank) || "";
    formData.append("timestamp", new Date().getTime());
    let Endpoint = '/'+this.customerid+'/generatePAD';
    // let data = this.paymentMethodForm.value.files;
    this.http.post(environment.apiUrl+'/api/ap'+Endpoint, formData, {
      headers:{
        Authorization: 'Bearer ' + this.accessToken,
    }}).subscribe((response:any)=>{
      if(response.status==200) {
        this.pad = response.data.url;
        this.filename = response.data.filename;
        this.padfilename = response.data.padfilename;
        this.ext = response.data.ext;
        this.mimetype = response.data.mimetype;
      }
      else {
        Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
  }

  closeAgreement() {

  }

  drawComplete() {
  }

  drawStart() {
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    // const base64Data = "";

    this.signatureImg = base64Data;
    let Endpoint = '/'+this.customerid+'/updatePAD';
    let data = {
    url : this.pad,
    signature : this.signatureImg,
    session  : this.encBank,
    filename : this.filename,
    padfilename : this.padfilename,
    ext : this.ext,
    mimetype : this.mimetype,
    adminName : 'sai',
    }
    this.http.post(environment.apiUrl+'/api/ap'+Endpoint, data, {
      headers:{
        Authorization: 'Bearer ' + this.accessToken,
    }}).subscribe((response:any)=>{
      if(response.status==200) {
        this.signedPad = response.data.url;
      }
      else {
        Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
  }

  closeSignaturePad() {
    this.closePaymentmodal.nativeElement.click();
  }


  addSpouse() {
    this.spouseUpdate = false;
    if(JSON.stringify(this.spouseInfo)==='{}') {
      this.spouseStatus = true;
      this.spouseForm['martialStatus'].clearValidators();
      this.spouseForm['martialStatus'].updateValueAndValidity();
      this.spouseForm['effectiveDate'].clearValidators();
      this.spouseForm['effectiveDate'].updateValueAndValidity();
    }
    else {
      this.spouseStatus = false;
      // this.spouseForm['firstName'].clearValidators();
      // this.spouseForm['firstName'].updateValueAndValidity();
      // this.spouseForm['lastName'].clearValidators();
      // this.spouseForm['lastName'].updateValueAndValidity();
      // this.spouseForm['dob'].clearValidators();
      // this.spouseForm['dob'].updateValueAndValidity();
      // this.spouseForm['phoneNum'].clearValidators();
      // this.spouseForm['phoneNum'].updateValueAndValidity();
      // this.spouseForm['coveredByAnotherPlan'].clearValidators();
      // this.spouseForm['coveredByAnotherPlan'].updateValueAndValidity();
      // this.spouseForm['healthPlan'].clearValidators();
      // this.spouseForm['healthPlan'].updateValueAndValidity();
      // this.spouseForm['insurer'].clearValidators();
      // this.spouseForm['insurer'].updateValueAndValidity();
    }
    this.spouseform.reset();
  }

  addSpouseData() {

    // Object.keys(this.spouseForm).forEach(controlName => {
    //   if (controlName !== 'martialStatus' && controlName !== 'effectiveDate') {
    //     const control = this.spouseForm[controlName];
    //     control.reset();
    //   }
    //   if(controlName == 'email') {
    //     const control = this.spouseForm[controlName];
    //     control.setErrors(null);
    //     const updatedErrors = { ...control.errors };
    //     delete updatedErrors['pattern'];
    //     control.setErrors(updatedErrors);
    //   }
    // });

    if(this.spouseStatus){

      if(this.spouseform.invalid) {
        this.spouseform.markAllAsTouched();
        return;
      }
      else {
        const endPoint = '/customer/'+this.customerid+'/lifeChange/spouse/add/true';
        this.spouseData = this.spouseform.value;
        if(this.spouseform.value.coveredByAnotherPlan!=true) {
          this.spouseData["coverage"] = ""
          this.spouseData["carrierName"] = ""
        }
        else {
          this.spouseData["coverage"] = this.spouseform.value.healthPlan
          this.spouseData["carrierName"] = this.spouseform.value.insurer
        }
        if(this.spouseform.value.email==null) {
          this.spouseData["email"] = ""
        }
        this.spouseData["dob"]= this.datePipe.transform(new Date(this.spouseform.value.dob).toLocaleString(),'MM-dd-yyyy')
        this.spouseData["relationType"] = "SPOUSE"

        let data:any;
        data={'spouse' : this.spouseData,
              'dependent' : []
        }

        this.http.post(environment.apiUrl+'/api/ap/admin'+endPoint, data,{
          headers:{
            Authorization: 'Bearer ' + this.accessToken,
            'Content-Type': 'application/json',
        }}).subscribe((response:any)=>{
          if(response.status==200) {
            // this.getCustomerData();
            this.closeSpousemodal.nativeElement.click();
            Swal.fire({allowOutsideClick: false,title: 'Info', text: response.message });
          }
          else {
            Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
          }
        },(error) => {
          Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
        });
      }
    }
    else

    {
       if(this.spouseForm['effectiveDate'].invalid || this.spouseForm['martialStatus'].invalid) {

      this.spouseform.markAllAsTouched();
      return;
    }
    else{


      let spouseData = this.childrenInfo;


        let data = this.spouseform.value;
        console.log(data)

        for(let spouse of spouseData){
          console.log(spouse)
          if(spouse["relationType"]=="spouse"){
           data["firstName"]=spouse.firstName;
           data["lastName"]=spouse.lastName;
           data["dob"]=spouse.dob;
           data["gender"]=spouse.gender;
           data["email"]=spouse.email || "";
           data["coverage"]=spouse.healthPlan;
           data["carrierName"]=spouse.insurer;
           data["healthPlan"]=spouse.healthPlan;
           data["insurer"]=spouse.insurer;
          }

        }
        data["effectiveDate"]=this.spouseForm['effectiveDate'].value
        data["martialStatus"]=this.spouseForm['martialStatus'].value || ""
        data["email"]=this.spouseForm['email'].value || ""
        data["relationType"] = "SPOUSE"
        // this.spouseData["dob"]= this.datePipe.transform(new Date(this.spouseform.value.dob).toLocaleString(),'MM-dd-yyyy')

        if(this.spouseform.value.coveredByAnotherPlan===true) {
          data["coveredByAnotherPlan"] = true
        }
        else {
          data["coveredByAnotherPlan"] = false
        }

        data={'spouse' : data,
        'dependent' : []
  }
        const endPoint = '/customer/'+this.customerid+'/lifeChange/spouse/add/false';

        // data["dob"]= this.datePipe.transform(new Date(this.spouseform.value.dob).toLocaleString(),'MM-dd-yyyy')
        this.http.post(environment.apiUrl+'/api/ap/admin'+endPoint, data,{
          headers:{
            Authorization: 'Bearer ' + this.accessToken,
            'Content-Type': 'application/json',
        }}).subscribe((response:any)=>{
          if(response.status==200) {
            this.getCustomerData();
            this.closeSpousemodal.nativeElement.click();
            Swal.fire({allowOutsideClick: false, title: 'Info', text: response.message });
          }
          else {
            Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
          }
        },(error) => {
          console.log(error)
          Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
        });
      }
    }


    // this.closeSpousemodal.nativeElement.click();
  }

  addDependent() {
    this.dependentform.reset();
    this.dependentUpdate = false;
    this.postSecondaryStudent = false;
    // if(this.childrenInfo.length!==0) {
      this.dependentStatus = true;
    //   this.dependentForm['effectiveDate'].clearValidators();
    //   this.dependentForm['effectiveDate'].updateValueAndValidity();
    // }
    // else {
    //   this.dependentStatus = false;
    // }
    this.dependentForm['graduationDate'].clearValidators();
    this.dependentForm['graduationDate'].updateValueAndValidity();
    this.dependentData = [];
  }

  addAnotherDependent() {
    if(this.dependentform.valid) {
      if(this.dependentform.value.coveredByAnotherPlan===false) {
        this.dependentForm["carrierName"].setValue("");
      }
      if(this.dependentform.value.postSecondaryStudent!=true) {
        this.dependentForm["graduationDate"].setValue("");
      }
      this.dependentData.push(this.dependentform.value);
      this.dependentform.reset();
    }
    else {
      this.dependentform.markAllAsTouched();
    }

  }

  addDependentData() {
    if(this.dependentform.valid) {
      let data:any;
      if(this.dependentform.value.coveredByAnotherPlan===false) {
        this.dependentForm["carrierName"].setValue("");
      }
      if(this.dependentform.value.postSecondaryStudent!=true) {
        this.dependentForm["graduationDate"].setValue("");
      }

      this.dependentData.push(this.dependentform.value);
      if(this.dependentData['graduationDate']){
        this.dependentData['graduationDate']=moment(this.dependentData['graduationDate'].format('MM-DD-YYYY'));
      }
      else{
        this.dependentData['graduationDate'] = "";
      }
      this.dependentData['dob']=moment(this.dependentData['dob'].format('MM-DD-YYYY'));
      // this.dependentData['dob']= this.datePipe.transform(new Date(this.dependentform.value.dob).toLocaleString(),'MM-dd-yyyy')
      data={'spouse' : {},
            'dependent' : this.dependentData
      }
      const endPoint = '/customer/'+this.customerid+'/lifeChange/dependent/add/true';
      this.http.post(environment.apiUrl+'/api/ap/admin'+endPoint, data,{
        headers:{
          Authorization: 'Bearer ' + this.accessToken,
          'Content-Type': 'application/json',
      }}).subscribe((response:any)=>{
        if(response.status==200) {
          // this.getCustomerData();
          this.closeSpousemodal.nativeElement.click();
          Swal.fire({allowOutsideClick: false, title: 'Info', text: response.message });
        }
        else {
          Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
        }
      },(error) => {
        Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
      });
      this.closeDependentmodal.nativeElement.click();
    }
    else {
      this.dependentform.markAllAsTouched();
    }
  }

  getMonth(event:any) {
    this.expireMonth = event.target.value;
    this.validateExpire(this.expireYear, this.expireMonth);
  }

  getYear(event:any) {
    this.expireYear = event.target.value;
    this.validateExpire(this.expireYear, this.expireMonth);
  }

  validateExpire(year:any, month:any) {
    let date = 31
    if(month==4||month==6||month==9||month==11) {
      date = 30
    }
    else if(month==2) {
      if((year % 4 == 0 && year %100 !==0) || (year % 400  == 0)) {
        date = 29;
      }
      else {
        date = 28;
      }
    }
    if(year!=null&&month!=null) {
      const expiry = new Date(parseInt("20"+ year), month-1, date);
      const current = new Date();
      if(expiry.getTime() < current.getTime()) {
        this.invalidExpiration = true;
      }
      else {
        this.invalidExpiration = false;
      }
    }
  }

  closePaymentInfo() {
    this.paymentform.reset();
    this.paymentform.get('expireMonth')?.setValue('');
    this.paymentform.get('expireYear')?.setValue('');
  }

  closeCcInfo() {
    this.ccform.reset();
    this.ccform.get('expireMonth')?.setValue('');
    this.ccform.get('expireYear')?.setValue('');
  }

  // closeButton() {
  //   this.closebutton.nativeElement.click();
  // }

  changeToCC() {
    this.getCreditcard();
    // this.paymentform.get('FirstName')?.setValue(this.customerData.firstName);
    // this.paymentform.get('LastName')?.setValue(this.customerData.lastName);
    // this.paymentform.get('address1')?.setValue(this.customerData.line1);
    // this.paymentform.get('streetaddressline2')?.setValue(this.customerData.line2);
    // this.paymentform.get('countryId')?.setValue(this.customerData.country);
    // this.paymentform.get('email')?.setValue(this.customerData.email);
    // this.paymentform.get('city')?.setValue(this.customerData.city);
    // this.paymentform.get('province')?.setValue(this.customerData.province);
    // this.paymentform.get('postalcode')?.setValue(this.customerData.postalCode);
  }

  saveCcPayment(value:any,value1:any) {
    if(this.paymentform.invalid) {
      this.paymentform.markAllAsTouched();
      return;
    }
    else {
      // value1.CutomerID.value=parseInt(value1.CustomerID.value)
      value1.submit();
      // value.submit();
    }
  }

  checkEmail(FormGroup1, formControl1) {
    let pattern = /^(?!\\s)[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
    let email = FormGroup1.get(formControl1).value;
    if (pattern.test(email)) {
      this.checkEmailKey = false;
    } else {
      this.checkEmailKey = true;
    }
  }

  updateCcInfo(value:any,value1:any) {
    if(this.ccform.invalid) {
      this.ccform.markAllAsTouched();
      return;
    }
    else {
      value1.submit();
    }
  }

  padUpdate() {
    this.padform.patchValue(this.PADdetails);
    this.padForm['branchCode'] = this.PADdetails.transitNumber;
    this.padform.get('accountNo')?.setValue(this.PADdetails.accountNumber)
    this.padform.get('bankcode')?.setValue(this.PADdetails.bankCode)
    // this.padform.get('bankdetails')?.setValue(this.bankinformation)
    this.banknameres = this.bankinformation;
    this.bankinfo = true;
    this.resetbutton = true;
  }

  checkFirstCharacter(event: any, form: any) {
    console.log(event)
    if(event.target.value.startsWith(' ')) {
      event.target.value = event.target.value.trimStart();
    }
    console.log(form)
    console.log(event.target.id)
    console.log(this.addressform.get('line1')?.value)
    console.log(form.get(event.target.id));
    // Removing the special characters
    form.get(event.target.id).setValue(event.target.value.replace(/[^a-zA-Z0-9\s]/g, ''));
  }

  changepad() {
    this.changetopad = true;
    setTimeout(() => {
      this.voidCheque1 = this.imagedisplay;
    }, 1000);
  }

  updatePadpreview() {
    this.changetopad = false;
    setTimeout(() => {
      this.voidCheque2 = this.imagedisplay;
    }, 1000);
  }

  uploadNewVoid() {
    this.bankinfo = true;
    this.cheque = true;
    this.resetbutton = true;
    this.existVoid = false;
    if(this.padform.get('file')?.value==null) {
      this.review = false;
    }
  }

  existingVoidCheque() {
    setTimeout(() => {
      if(this.voidCheckFileType=='application/pdf') {
        this.voidCheque2 = this.voidCheckImage;
      }
    }, 1000);
    setTimeout(() => {
      this.pad = this.padAgreement;
    }, 1000);
  }

  padformValid() {
    if(this.padform.invalid) {
      this.resetbutton = false;
      this.bankinfo = false;
      this.cheque = false;
      return
    }
  }

  paymentMethodFormValid() {
    if(this.paymentMethodForm.invalid) {
      this.resetButton = false;
      this.bankDetails = false;
      this.uploadCheque = false;
      return
    }
  }

  ccUpdate() {
    // alert("!")
    this.ccform.get('FirstName')?.setValue(this.ccDetails.firstName);
    this.ccform.get('LastName')?.setValue(this.ccDetails.lastName);
    this.ccform.get('ExpirationMonth')?.setValue(this.ccDetails.expirationMonth);
    this.ccform.get('ExpirationYear')?.setValue(this.ccDetails.expirationYear);
  }

  changeToPAD() {
    let Endpoint = '/'+this.customerid+'/paymentType/ACH/change';
    this.http.post(environment.apiUrl+'/api/ap'+Endpoint, {"paymentId": 0},{
      headers:{
        Authorization: 'Bearer ' + this.accessToken,
    }}).subscribe((response:any)=>{
      if(response.status==200) {
        this.getCustomerData();
        Swal.fire({allowOutsideClick: false,title: 'Info', text:response.message})
      }
      else {
        Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
    this.bankinfo = true;
    this.resetbutton = true;
    this.cheque = false;
    this.paymentMethodForm.reset();
    this.paymentMethodForm.get('paymentmethod')?.setValue('');
    this.resetButton = false;
    this.uploadCheque = false;
    this.bankDetails = false;
    this.updatepreviewbutton = false;
    this.existVoid = true;
    this.padform.get('file')?.setValue('');
    this.voidCheckFileType = this.PADdetails.voidCheckFileType;
  }

  resolved(captchaResponse: any) {
    this.recaptchaResponse = captchaResponse;
  }

  dependentnextcard() {
    // this.index = i+1;
    this.currentIndex = (this.currentIndex + 1) % this.childrenInfo.length;
  }

  dependentpreviouscard() {
    // this.index = i;
    this.currentIndex = (this.currentIndex - 1 + this.childrenInfo.length) % this.childrenInfo.length;
  }

  getindex(i:any) {
  }

  getPlanes(){
    let accessToken=sessionStorage.getItem('accessToken');
    let customerId=sessionStorage.getItem('customerId');
    let customerEndpoint=`/customer/${customerId}/plans/false`;
    this.http.get(environment.apiUrl+'/api/ap/admin'+customerEndpoint,{
      headers:{
        Authorization: 'Bearer ' + accessToken,
        'Content-type': 'applivation/json',
      }
    }).subscribe((response:any)=>{
      if(response.status==200){
        this.plans=response.data.plans;

        console.log(this.plans)
        setTimeout(() => {
          this.getcoverflow()
        }, 1000);
      }
      else {
        Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
  }

  getbenefits() {
    let accessToken=sessionStorage.getItem('accessToken');
    let customerId=sessionStorage.getItem('customerId');
    let customerEndpoint=`/customer/${customerId}/planBenefits/false`;
    this.http.get(environment.apiUrl+'/api/ap/admin'+customerEndpoint,{
      headers:{
        Authorization: 'Bearer ' + accessToken,
        'Content-type': 'applivation/json',
      }
    }).subscribe((response:any)=>{
      if(response.status==200){
        let planbenefits = response.data.plansBenefits;
        this.benefits = [];
        for(let benefit of planbenefits) {
          if(benefit.content.includes('{{booklet_link}}')) {
            this.headerName = benefit.name;
            console.log('headerName',this.headerName)
            benefit.content = benefit.content.replace('{{booklet_link}}',benefit.bookletLink)
          }
          // if(benefit.content.includes('greenshield')) {
          //   this.headerName = benefit.name;
          //   console.log('headerName',this.headerName)
          //   benefit.content = benefit.content.replace('{{booklet_link}}',benefit.bookletLink)
          // }
          if(this.hicList && this.hicList.length>0){
          if(benefit.content.includes('{{health_card_link}}')) {
            benefit.content = benefit.content.replace('{{health_card_link}}',this.hicList[0].healthCard);
          }
        }
          this.benefits.push(benefit)
          // console.log("rakesh",this.benefits)
          setTimeout(() => {
            this.getcoverflow()
          }, 1000);
        }
      }
      else {
        Swal.fire({allowOutsideClick: false,title: 'Error', text:response.message})
      }
    },(error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
  }



  openVideoPopup() {
    let el: HTMLElement = this.openPopup.nativeElement;
    el.click();
}

// closeVideo() {
//   var video = document.getElementsByTagName('video')[0];
//   video.pause()
// }

openiframePopup() {
  let el: HTMLElement = this.openiframe.nativeElement;
  el.click();
}

openequitablePopup() {
  let el: HTMLElement = this.openequitable.nativeElement;
  el.click();
}

openSupportPopup() {
  let el: HTMLElement = this.opensupport.nativeElement;
  el.click();
}

downloadCard() {
  this.http.get(this.health_card, { responseType: "arraybuffer" }).subscribe(
    pdf => {
      const blob = new Blob([pdf], { type: "application/pdf" });
      const fileName = this.health_card+".pdf";
      saveAs(blob, fileName);
    },
    (error) => {
      Swal.fire({allowOutsideClick: false,title: 'Error', text: error.error.error.message})
    });
}

onSlideChangeDependents(event :any){
  console.log(event)

  this.currentIndexOfSwipperDependents=event[0].realIndex+1;
  if(this.childrenInfo[event[0].realIndex].relationType=="spouse"){

    this.editSpouse=true;

    this.editChild=false;

  }

  else if(this.childrenInfo[event[0].realIndex].relationType=="child"){

    this.editSpouse=false;

    this.editChild=true;

  }

}

onSlideChangeDownload(event :any){

  this.currentIndexOfSwipperDownload=event[0].realIndex+1;

}

onSlideChangePlan(event :any){

  this.currentIndexOfSwipperPlan=event[0].realIndex+1;

}

onSlideChangeBenifuts(event :any){

  this.currentIndexOfSwipperBenifits=event[0].realIndex+1;

}

setlanguage(event: any) {
  this.getFormConfiguration(event);
  console.log("123")
}

getcoverflow(){
  var TrandingSlider = new Swiper('.tranding-slider', {
    effect: 'coverflow',
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    allowTouchMove: false,
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
  console.log(TrandingSlider.activeIndex)
}



}

export function postalcodeValidator(control: FormControl): { [key: string]: any} | null {
  var postalRegexp = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/gm;
  if (control.value && !postalRegexp.test(control.value)) {
    return { invalidPostalCode: true };
  }
  return null
}

function phoneNumbersMustBeDifferent(control: AbstractControl): { [key: string]: boolean } | null {
  const primaryPhoneNumber = control.get('primaryPhone')?.value;
  const secondaryPhoneNumber = control.get('secondaryPhone')?.value;
  if (secondaryPhoneNumber=="") {
    return { phoneNumbersMatch: false };
  }else if (primaryPhoneNumber === secondaryPhoneNumber) {
    return { phoneNumbersMatch: true };
  }
  return null;
}

function hasWhiteSpace(s:any) {
  return /\s/g.test(s);
}

// export function postalcodeValidator2(control: FormControl): {
//   [key: string]: any;
// } {
//   var postalRegexp = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/gm;
//   if (control.value && !postalRegexp.test(control.value)) {
//     return { invalidPostalCode: true };
//   }
// }



