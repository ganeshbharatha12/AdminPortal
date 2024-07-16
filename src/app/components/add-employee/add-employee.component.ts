
import { state } from '@angular/animations';
import { Component, ElementRef, Input, OnInit,OnChanges, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
// import { DecimalPipe, KeyValue } from '@angular/common';
import SignaturePad from 'signature_pad';
// import { Modal } from 'bootstrap';
import { DecimalPipe, KeyValue, formatNumber } from "@angular/common";
import { error } from 'jquery';
import { PhoneFormatPipe } from "../../pipes/phone-format.pipe";
import { DatePipe } from "@angular/common";
import { floatWith2Decimals, groupBy, sumBy, adjustWith2DecimalsForUI } from "../../common-functions";
import { Title } from '@angular/platform-browser';


declare var $:any
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers: [ DecimalPipe,PhoneFormatPipe,DatePipe],
  // encapsulation: ViewEncapsulation.None
})




export class AddEmployeeComponent implements OnChanges,OnInit  {
  configprovinceres: any;
  currencySymbol: any;
  languageTokensArray: any;
  lang:any= {};
  configresults: any;
  configPlanEnrollmentDate: any;
  requireDentalHealthCoverage: any=true;
  brokerTermsConditions: any;
  disclosureAgreement_dynamicData: any;
  disclosureAgreement: any;
  term_and_conditions: any;
  formid: any;
  postalvalue: any;
  provincialZipcodes: any;
  invalidpostalcodeprivince: boolean;
  pdfvisibletermsandconditions: boolean;
  // phoneNoFormat: any;
  public applicantDateofBirth: any = new Date(2000, 3, 1);
  provincialHealthcareUrl: any;
  state_id: number;
  statename: any;
  // QCproviance: any;
  checkstudenthealthcardstatus_UHIP: boolean;
  checkhealthcardstatus: boolean=false;
  checkstudenthealthcardstatus: boolean;
  checkhealthcardstatusuhip: boolean;
  spouseinformation: boolean;
  spousehealthcardinfo: boolean;
  parentalhelathinsuranecheck: boolean;
  childrenhealthinformation: boolean;
  childInfoAddDataArray: any=[];
  planssummary: any[] = [];

  // childTableRowsLength: any;
applicanthavingchildren: any;
  pdfvisibleadvisouredisclosure: boolean=true;
  Shared: any;
  applicantfirstname: any;
  countrydetails: any;
  selectedTab: any="tab1";
  planAmount: any=0;
  specialpackages: any;
  tab1Img: boolean;
  minDate: any;
  maxDate: any;
  applicantChildrenname: any;
  completeapplicantinfo: string;
  marital_status: any;
  pdfvisibletermsandcodionsmodel: boolean=true;
  padAgrementLoad: boolean=true;
  withSignLoad: boolean=true;
  graducationdaycheck: boolean=false;
  plansnexttab: boolean;
  cartcheckvalue: boolean;
  allproducts: any;
  // private _decimalPipe: any;
  paymentfirstname: any;
  paymentemail: any;
  homeaddresscheckvalue: boolean=false;
  homeaddressEnrollmentVal: boolean;
  planssummarymain: any;
  planssummaryopt: any;
  studentplanssummarymain: any;
  studentplanssummarymain1: any[];
  paymentMethodSelectCC: boolean;
  bankDetailsNames: string;
  enrollmentBankDetailedVerify: boolean;
  bankDetailsError: string;
  bankDetailsVerifyStatus: boolean;
  bankverifyDetails: any;
  signaturePadClear: boolean=false;
  signaturemessagecc: boolean;
  oldvaluenumber: any;
  childrenDetailsArray: any;
  childTableEditRowIndex: number = 0;
  noOfChildrenChangedValue: number = 1;
  childTableRowsLength: number = 0;
  dependentchildInsurenceval: boolean;
  // childTableEditRowIndex: any;
  childInfoModalAddAndUpdateButton: string;
  provincelistid: any;
  invalidenrollmentpostalcodeprovince: boolean;
  childrenenrollement: boolean;
  isFileUploaded: boolean;
  imagedisplay: any;
  bankfile: any;
  pdfview: boolean;
  public mainarray:any=[];

  normalview: boolean;
  showSignAndAgreeOrAgree: boolean;
  padAgreementSignaturePadClear: boolean;
  padAgreementSignaturemessagecc: boolean;
  generatePADaggrement: any;
  agreestatus: boolean;
  signaturestatus: boolean;
  signatureImgcc: any;
  publicapikey: any;
  customerid: any;
  displayStudentId: boolean=false;
  hoursperweek: boolean=false;
  hourperweekvalue: boolean=false;
  displatGig: boolean=false;
  firstName: any;
  lastName: any;
  primaryEmail: any;
  primaryPhone: any;
  country: any;
  line1: any;
  line2: any;
  city: any;
  state: any;
  postalZip: any;
  brokers: any;
  showBrokersList: boolean=false;
  formsList: any;
  forms: any=[];
  showForm: boolean=false;
  // phoneNoFormat: any;
  planobjdata: { packageId: any; packageName: any; planproductname: any; groupid: any; groupName: any; id: any; name: any; planLevel: any; planLevelParent: any; fusebillPlanID: any; planFrequencyID: any; isBundle: any; coverage: any; planCoverage: any; bundledProducts: any[]; products: any[]; };

  public companypaidproductid =[];
public packagesInBlocks: any;
  plansskumain: any[] = [];
  plandetailsobjvalue: any;
  optionstitle:  any[] = [];
  optionmessage: any;
  showoptions: boolean =false;
  disabledelement: string;
  fusebill_paymentMethod: any="CC";
  minDateHire: any;
  minDatechild: Date;
  maxDatechild: Date;
  compName: any;
  employercheck: any;
  brokerid: any;

  public showPaymenthMethod: boolean = false;
  public showPaymenthMethod1: boolean = true;
  isExecutiveCP: boolean;
  public isDisabledplan: boolean = false;
  public creditcardform: boolean = false;
  public bankpaymentmethod: any;
 public directpayCCplansarr:any = [];
  public payrollCCplansarr:any = [];
  public employeeDealingPlansarr:any =[];
 public companySelectedPlans = [];
  public companyCoveredPlans = [];
  public EmployeeSelectedPlans = [];
  public allSelectedPlans=[];
  public companyDealingPlans =[];

  public coveredEmployeeShare: any = 0;
  public paidEmployeeShare: any = 0;
  public totalEmployeeShare: any = 0;
  public cartDisplayAmount: any = 0;
  public allPlansAmountTotal: any = 0;
  public allPlansTotal: any = 0;
  public allPlansTotaltax: any = 0;
  public allCPPlansAmountTotal: any = 0;
  public allCCPlansAmountTotal: any = 0;
  public allEPPlansAmountTotal: any = 0;
  public allCPTaxTotal: any = 0;
  public allCCTaxTotal: any = 0;
  public allEPTaxTotal: any = 0;
  public companyPaidTotal: any = 0;
  public companyCoveredTotal: any = 0;
  public paidEmployeedTotal: any = 0;
  public companyCoveredCompanyShareTotal: any = 0;
  public  companyCoveredCompanySharePlanAmountTotal: any = 0;
  public companyCoveredCompanyShareTaxTotal: any = 0;
  public companyCoveredEmployeeShareTotal: any = 0;
  public companyCoveredEmployeeSharePlanAmountTotal: any = 0;
  public companyCoveredEmployeeShareTaxTotal: any = 0;
  public effectiveCompanyTotalContibution: any = 0;
  public effectiveEmployeeTotalContibution: any = 0;
  public effectiveCompanyPlansAmountTotal: any = 0;
  public effectiveCompanyTaxTotal: any = 0;
  basepackages: any;
  public alloptinplans = [];
  payrollCCPlantaxTotal: any;
  empDirectpayPlanamountTotal: any;
  empDirectpayPlantaxTotal: any;
  payrollCCPlansAmountTotal: any;
  payrollCCPlangrandTotal: any;
  empDirectpayPlangrandTotal: any;
  DirectCCpayPlanamountTotal: any;
  DirectCCpayPlantaxTotal: any;
  DirectCCpayPlangrandTotal: any;
  companydealingplansTotal: any;
  companydealingplanstaxTotal: any;
  companydealingplansgrandTotal: any;
  deltaCompanyTax: any;
  corporateAutoPlanSelection: any;
  employername: any;
  public modifiedBlocksCoveredByCompany:any;

  public CORP_PAYROLL_NOT_MANDATORY_PACKAGES:any = [2, 8, 9];
  public CORP_PAYROLL_NOT_MANDATORY_PLANLEVELS:any = [19, 20, 21, 23, 25, 26];
  plansummary: any;
  companyId: number;
  companyName: any;
  ShowNextButton: boolean=true;
  paidEmployeedTotalDub: any;
  working_provinces: any;
  studentPlaceHolder: any;
  studentPlaceHolderln: any;
  role: string;
    constructor(
      private http: HttpClient,
      private fb: FormBuilder,
      private childInfoFormBuilder: FormBuilder,

      private toastrService: ToastrService,
      private enrollmentFormBuilder: FormBuilder,
      private bankPayFormBuilder: FormBuilder,
      private creditCardFormBuilder: FormBuilder,
      private router: Router,
      private _decimalPipe: DecimalPipe,
      private datePipe: DatePipe,

      // private phoneNoFormat1: PhoneNoFormatPipe,
      // private studentService: StudentService,
      // private Shared: SharedService,
      // private _decimalPipe: DecimalPipe,
      private renderer: Renderer2,
      private elementRef: ElementRef,
      private el: ElementRef,
      private phoneNoFormat: PhoneFormatPipe
      ) {
      this.minDate = moment().subtract(100, "years").calendar();
      this.maxDate = moment().subtract(16, "years").calendar();
    }
    signaturePadCC: any = SignaturePad;
  padAggsignaturePadCC: any = SignaturePad;
  @ViewChild('dependentWithSpecialNeeds') dependentWithSpecialNeeds: any;
  @ViewChild(' PADpafaggrementModal') PADpafaggrementModalpopup: any;
  @ViewChild('PADpafaggrementModalSign') PADpafaggrementModalpopupSign: any;
  @ViewChild('signaturePadagreementModal') signaturePadagreementModalPopup: any;
  @ViewChild('postSecondaryStudent') postSecondaryStudentVal: any;
  @ViewChild('signaturePadCanvas') signaturePadCanvasEl?: ElementRef;
  @ViewChild('padAgreementSignaturePadCanvas') padAgreementSignaturePadCanvasEl?: ElementRef;
  @ViewChild('dependentChildInfo') dependentChildInfo?: ElementRef;
  @ViewChild('QCproviance') QCproviance: any;
  @ViewChild('checkuhipstatusModal') checkuhipstatusModal: any;
  @ViewChild('checkphcpstatusModal') checkphcpstatusModal: any;
  // @ViewChild('childInfoModal') childInfoModal: any;
  @ViewChild('advisoranddisclousreModal') advisoranddisclousreModal: any;
  @ViewChild('termsAndConditionsModal') termsAndConditionsModal: any;
  @Input() valuFormChaild:any;
  // @ViewChild('signaturePadCanvas') signaturePadCanvasEl?: ElementRef;
  // @ViewChild('padAgreementSignaturePadCanvas') padAgreementSignaturePadCanvasEl?: ElementRef;

  ngOnInit(): void {
    this.role=sessionStorage.getItem('role');
    this.minDate = moment().subtract(100, "years").calendar();
    this.maxDate = moment().subtract(16, "years").calendar();
    this.studentPlaceHolder=this.lang.name_as_shown_on_provincial_health_card;
    this.studentPlaceHolderln=this.lang.name_as_shown_on_provincial_health_card;

    this.minDate = new Date(this.minDate);

    this.maxDate = new Date(this.maxDate);

    this.minDateHire = moment().subtract(60, "years").calendar();

    this.minDateHire=new Date(this.minDateHire);

     this.minDatechild = new Date(this.minDateHire);
    this.maxDatechild = new Date();
    this.compName=sessionStorage.getItem("compName");
  this.getFormConfig();
  this.userFormGroup();
  this.childInfoValidators();
    this.enrolmentFormValidator();
    this.bankPayFormValidator();
    // this.memberInfoFormGropu();

    // alert('aaaaaaaaaa')
  }

  ngOnChanges(){
    console.log('enter to ng on change');
    this.userForm.reset();
    // this.memberInfo.reset();
    this.enrollmentForm.reset();

  }
  ngAfterViewInit(){
    console.log('ngAfterViewInit()')
    this.userForm.reset();
    // this.memberInfo.reset();
    this.enrollmentForm.reset();
  }
  ngDocheck(){
    console.log('enter to ng onDo')
    this.userForm.reset();
    // this.memberInfo.reset();
    this.enrollmentForm.reset();
  }



  getFormConfig() {
    // let formLink = environment.app.formLink
    var accessToken = sessionStorage.getItem('accessToken');
    var endPoint = '/api/ap/customer/coporate/formConfig';
    let dataInput={
      "coporateId":parseInt(sessionStorage.getItem('corpId')),
      "formId":parseInt(sessionStorage.getItem('compFormId')),
    }

    //https://testadminapi.groupbenefitz.aitestpro.com/api/ap/customer/coporate/formConfig'

    // let configData: string = "https://testadminapi.groupbenefitz.aitestpro.com/api/ap/customer/formConfig_2"

      let lang = "en";
      this.http.post(environment.apiUrl + endPoint,dataInput,{
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
        .subscribe(
          (result: any) => {
            // this.isLoaded =true
            if (result.status == "200") {
              let states;
              states=result.data.states.filter((country)=>{
                return country.countryId==1
              });
              result.data.states=states;
              console.log(JSON.stringify(states));
              this.configprovinceres = result.data.states.sort((a: any, b: any) =>
                a.shortName > b.shortName ? 1 : -1
              );
              // this.provincelist
              this.currencySymbol = result.data.countries[0].currencySymbol;
              this.companyName=result.data.form.broker?.name;
              this.companyId=result.data.form.broker?.fusebillCorporateCustomerId;
              this.working_provinces=result.data.working_provinces;
              this.working_provinces = this.working_provinces.sort((a: any, b: any) =>
                a.shortName > b.shortName ? 1 : -1
              );
              console.log('working_provinces',this.working_provinces);

              console.log("result: " + JSON.stringify(result))
              this.employercheck = result.data.form.requireEmployerName;
              if(this.employercheck){
                this.userForm.get('employername').setValidators([Validators.required]);
                this.userForm.get('employername').updateValueAndValidity();
              }else{
                this.userForm.get('employername').clearValidators();
                this.userForm.get('employername').updateValueAndValidity();
              }

              this.languageTokensArray =
                result.data.languageDetails_2.languageTokens;
              this.lang = {};
              for (let token of this.languageTokensArray) {
                const langValue: any = token['value'];
                if (typeof langValue === 'string') {
                  this.lang[token['key']] = langValue.trim();
                } else {
                  this.lang[token['key']] = langValue;
                }
                // this.lang[token['key']] = token['value'];
              }

              this.configresults = result.data;

              sessionStorage.setItem("provincelist", result.data.broker_licensed_provinces);
              sessionStorage.setItem("countrydetails", JSON.stringify(result.data.countries));



              console.log("this.lang: " + JSON.stringify(this.lang));
              sessionStorage.setItem("langTokens", JSON.stringify(this.lang));
              this.configPlanEnrollmentDate =
                result.data.validations.customer.planEnrollmentDatesFullMonth;

              this.brokerTermsConditions = result.data?.links?.brokerTermsConditions;
              this.disclosureAgreement_dynamicData = result.data?.links?.disclosureAgreement;
              this.disclosureAgreement = this.disclosureAgreement_dynamicData;
              console.log("lang token: " + sessionStorage.getItem("lanToken"))
              if (sessionStorage.getItem("lanToken") == "en") {

                this.term_and_conditions = this.brokerTermsConditions;
              } else {

                this.term_and_conditions = this.brokerTermsConditions;
              }
              this.formid = result.data.form?.id;
              this.brokerid =result.data.form?.brokerId;

            }
            else {
              Swal.fire({
                title: '<strong>HTML <u>example</u></strong>',
                // icon: 'warning',
                html: `<div class="custom-content">${result.message ? result.message : result.error}</div>`,
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: "OK",
                confirmButtonAriaLabel: 'Thumbs up, great!',
                cancelButtonText:
                  '<i class="fa fa-thumbs-down"></i>',
                cancelButtonAriaLabel: 'Thumbs down'
              })
            }
          },
          (error) => {
            if (error.value) {
              this.router.navigate(["error"]);
            } else {
            }
          }
        );


  }
  userForm: FormGroup = new FormGroup({
    planEnrollmentDate: new FormControl(''),
    studentId: new FormControl(''),
    employername: new FormControl(''),
    givenname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    phonenumber: new FormControl(''),
    apt_suite: new FormControl(''),
    streetaddress: new FormControl(''),
    streetaddressline2: new FormControl(''),
    city: new FormControl(''),
    province: new FormControl(''),
    workingProvince: new FormControl(''),
    postalcode: new FormControl(''),
    dateofbirth: new FormControl(''),
    dateofhire: new FormControl(''),
    gender: new FormControl(''),
    foreignStudent: new FormControl(''),
    parentalinsurance: new FormControl(''),
    havingspouse: new FormControl(''),
    Dependentchildren: new FormControl(''),
    uhipprovincialhealth: new FormControl(''),
    provincialhealth: new FormControl(''),
    spousefirstname: new FormControl(''),
    spouselastname: new FormControl(''),
    spousegender: new FormControl(''),
    spousedateofbirth: new FormControl(''),
    spousehealthcard: new FormControl(''),
    workinghours:new FormControl(''),
    hoursperweek:new FormControl(''),
    fusbillId:new FormControl(''),
    formrname:new FormControl(''),
    brokername:new FormControl(''),
    memberType:new FormControl(''),

  });

  // memberInfo: FormGroup=new FormGroup({
  //   memberType: new FormControl(''),
  //   brokername:new FormControl(''),
  //   fusbillId:new FormControl(''),

  // })
  // memberInfoFormGropu(){
  //   this.memberInfo=this.fb.group({
  //     memberType:['',Validators.compose([Validators.required])],
  //     brokername:['',],
  //     fusbillId:['',Validators.compose([Validators.required])]
  //   })
  // }

  userFormGroup() {
    this.userForm = this.fb.group({
      planEnrollmentDate: ['', [Validators.required]],
      studentId: [''],
      employername: [''],
      givenname: ["", Validators.compose([Validators.required, Validators.minLength(1),])],
      lastname: ["", Validators.compose([Validators.required])],
      // email: ["", Validators.compose([Validators.required, emailValidator, Validators.pattern('^(?!\\s)[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
      email: ["", Validators.compose([Validators.required, Validators.pattern('^(?!\\s)[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
      ])],

      // phonenumber: ["", Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern(/^[^A-Za-z@#$%&*{}'";:<>?]+$/)]),],
      phonenumber: ["", Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16)])],
      apt_suite: ["", Validators.compose([apt_suitecheck,])],
      streetaddress: ["", Validators.compose([Validators.required])],
      streetaddressline2: [""],
      city: ["", Validators.compose([Validators.required])],
      province: ["", Validators.required],
      workingProvince: ["", Validators.required],
      postalcode: ["", Validators.compose([Validators.required, postalcodeValidator])],
      dateofbirth: ["", Validators.compose([Validators.required, dateofbirthvalidation])],
      gender: ["", Validators.required],
      dateofhire: ["", Validators.required],
      foreignStudent: [""],
      parentalinsurance: [""],
      havingspouse: ["", Validators.required],

      uhipprovincialhealth: [''],
      provincialhealth: ['',Validators.compose([Validators.required])],

      spousefirstname: [''],
      spouselastname: [''],
      spousegender: [""],
      spousedateofbirth: ['04-01-2000'],
      spousehealthcard: [''],

      Spousenameofthecarrier: [''],
      spousecob: [''],

      Dependentchildren: ["", Validators.required],
      enrolledunversity: [""],
      childdsiablility: [""],
      graducationday: [""],
      noofchildren: [''],
      termsandconditions: [""],
      disclouseradvisor: [""],
      recaptchaReactivePerInfo: [""],
      childrenDetails: this.fb.array([this.initChildDetails()]),
      workinghours:['',Validators.compose([Validators.required])],
      // hoursperweek:[''],
      hoursperweek: [
        "40",
        Validators.compose([Validators.required, validatehoursperweek]),
      ],
      fusbillId:[''],
      formrname:[''],
      brokername:[''],
      memberType:['']
    });
  }

  enrollmentForm: FormGroup = new FormGroup({
    enrollmentSummaryEmail: new FormControl(''),
      ///enrolmentForm
      enrollmentSummaryCardHolderFirstName: new FormControl(''),
      enrollmentSummaryCardHolderLastName: new FormControl(''),
      enrollmentSummaryCardNumnber: new FormControl(''),
      enrollmentSummaryExpirymonth: new FormControl(''),
      enrollmentSummaryExpiryyear: new FormControl(''),
      enrollmentSummaryCVV: new FormControl(''),
 ////******** */
    homeAddressSameasBillingAddress: new FormControl(''),
    enrollmentSummaryApartSuite: new FormControl(''),
    enrollmentSummaryStreetAddress: new FormControl(''),
    enrollmentSummaryStreetAddressLane2: new FormControl(''),
    enrollmentSummaryCity: new FormControl(''),
    enrollmentSummaryProvince: new FormControl(''),
    enrollmentSummaryPostalCode: new FormControl(''),

  });

  enrolmentFormValidator() {
    this.enrollmentForm = this.enrollmentFormBuilder.group({
      enrollmentSummaryEmail: [''],
      homeAddressSameasBillingAddress: [''],
      enrollmentSummaryApartSuite:['', Validators.compose([apt_suitecheck, Validators.maxLength(50)])],
      enrollmentSummaryStreetAddress:['', Validators.compose([Validators.required])],
      enrollmentSummaryStreetAddressLane2:[''],
      enrollmentSummaryCity:['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      enrollmentSummaryProvince:['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      enrollmentSummaryPostalCode:['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      recaptchaReactive:[''],

      //enrollmentSummaryApartSuite: ["", Validators.compose([apt_suitecheck, Validators.maxLength(50)])],
     // enrollmentSummaryStreetAddress: ['', [Validators.required]],
     // enrollmentSummaryStreetAddressLane2: ['', [Validators.required]],
      //enrollmentSummaryCity: ['', [Validators.required]],
      // enrollmentSummaryProvince: ['', [Validators.required]],
      // enrollmentSummaryPostalCode: ["", Validators.compose([Validators.required, postalcodeValidator])],
      // recaptchaReactive: ["",],
      // recaptchaReactive: ["", Validators.required],
      // creditCardFormValid: this.creditCardForm,
             //enrollment
      enrollmentSummaryCardHolderFirstName:[''], //['', Validators.compose([Validators.required, Validators.pattern("^(?!\\s)[A-Za-z\\s]+$")])],
      enrollmentSummaryCardHolderLastName:[''], //['', Validators.compose([Validators.required, Validators.pattern("^(?!\\s)[A-Za-z\\s]+$")])],
      enrollmentSummaryCardNumnber:[''],// ["", Validators.compose([Validators.required, creditcardvalidation]),],
      enrollmentSummaryExpirymonth:[''],// ['', [Validators.required]],
      enrollmentSummaryExpiryyear:[''],// ['', [Validators.required]],
      // enrollmentSummaryCVV: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(4)])],
      enrollmentSummaryCVV:['']


    })
  }
  bankPayForm: FormGroup = new FormGroup({
    enrollmentSummaryBankNumber: new FormControl(''),
    enrollmentSummaryTransitNumber: new FormControl(''),
    enrollmentSummaryAccontNumber: new FormControl(''),
    enrollmentBankTextdescription: new FormControl(''),
    reviewAndSignThePadAgreementBtn: new FormControl(''),
    enrollmentSummaryvoidCheckUpload: new FormControl(''),
  })

  bankPayFormValidator() {
    this.bankPayForm = this.bankPayFormBuilder.group({
      enrollmentSummaryBankNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      enrollmentSummaryTransitNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      enrollmentSummaryAccontNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      enrollmentBankTextdescription: ['', [Validators.required]],
      enrollmentSummaryvoidCheckUpload: ['', [Validators.required]],
      // reviewAndSignThePadAgreementBtn:['',[Validators.required]],
      reviewAndSignThePadAgreementBtn: ['',],
    })
  }

  childFormGroup: FormGroup = new FormGroup({
    childInfoFirstName: new FormControl(''),
    childInfoLastName: new FormControl(''),
    childInfoGender: new FormControl(''),
    childInfoDOB: new FormControl(''),
    childdisablility: new FormControl(''),
    childInfoCarrierName: new FormControl(''),
    childPostGraduate: new FormControl(''),
    childInfoGraduationday: new FormControl(''),
    DependentchildInsurence: new FormControl(''),
  });

  childInfoValidators() {
    this.childFormGroup = this.childInfoFormBuilder.group({
      childInfoFirstName: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      childInfoLastName: ['', Validators.compose([Validators.required,Validators.minLength(1)])],
      childInfoGender: ["",[Validators.required]],
      childInfoDOB: ['', [Validators.required]],
      childdisablility: [''],
      childInfoCarrierName: [''],
      childPostGraduate: [''],
      childInfoGraduationday: [''],
      DependentchildInsurence: ['',Validators.required]
    })
  }

  initChildDetails() {
    return this.childFormGroup = this.childInfoFormBuilder.group({
      childInfoFirstName: [''],
      childInfoLastName: [''],
      childInfoGender: [""],
      childInfoDOB: [''],
      childdisablility: [''],
      childInfoCarrierName: [''],
      childPostGraduate: [''],
      childInfoGraduationday: [''],
      DependentchildInsurence: ['']
    });
  }



  alphaNumarics(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if(event.currentTarget.value.length==0){//for first latter not allow space
      if((charCode >= 65 && charCode <= 90) ||
       (charCode >= 97 && charCode <= 122)||
       (charCode >= 48 && charCode <= 57)||
       (charCode >= 192 && charCode <= 255)
       ||charCode==46||charCode==45||charCode==39||charCode==95){
    return true;
      }
    else{
      return false;
    }
     }
     else{
      if (
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122) ||
        (charCode >= 48 && charCode <= 57)||
        (charCode >= 192 && charCode <= 255)||charCode==46||charCode==45||charCode==39||charCode==95 ||
        charCode === 32
      )
        return true;
      else return false;
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



  numberOnly(event: any): boolean {
    //we have numeric 48 to 57 it return true when enter number

    const charCode = event.which ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      //if(charCode>48&&charCode<57)
      return false;
    } else return true;
  }


  // phoneFormat(event: any) {
  //   const inputValue = this.userForm.get("phonenumber")?.value;
  //   this.userForm.get("phonenumber")?.setValue(this.phoneNoFormat.transform(inputValue), { emitEvent: false });


  // }

  phoneFormat(event: any) {
    const inputValue = this.userForm.get("phonenumber").value;

    this.userForm
      .get("phonenumber")
      .setValue(this.phoneNoFormat.transform(inputValue), { emitEvent: false });
  }
  termsandconditionsLoaded(event: any) {
    console.log("termsandconditionsLoaded here")
    this.pdfvisibletermsandconditions = false;
  }

  enrollmentFormSubmit(value1: any) {
    // Retrieve the data from sessionStorage and parse it into an object
    let inputData: any = sessionStorage.getItem("Data");
    inputData = JSON.parse(inputData);
    let validationInputData = typeof (inputData) != 'object' ? JSON.parse(inputData) : inputData;
    validationInputData['fusebill_paymentMethod']=this.paidEmployeedTotalDub>0?this.fusebill_paymentMethod:'NONE';
    let enrollmentSummaryProvinceval: string = this.enrollmentFormControl['enrollmentSummaryProvince'].value;
    //this.paymentMethodSelectCC it means credit card
    if (this.paymentMethodSelectCC) {
      // validationInputData['marital_status'] = this.marital_status;
      validationInputData.signature = sessionStorage.getItem("signatureCC")?? "";
    } else {

    }

    let provincelist = sessionStorage.getItem("provincelist") || "";
    if (provincelist.includes(inputData.province_id)) {
    } else {
      if (this.configresults.assign_default_form == true) {
        inputData.formId = this.configresults.default_form.id;
        inputData.brokershipTransfered = true;
        inputData.originalFormId = this.configresults.form.id;
      } else {
      }
    }

    var fusebillCustomerAddressId = sessionStorage.getItem("fusebillCustomerAddressId");
    if (
      fusebillCustomerAddressId &&
      fusebillCustomerAddressId.length > 0
    ) {
      inputData["fusebillCustomerAddressId"] =
        sessionStorage.getItem("fusebillCustomerAddressId") || null;
    }
    var fusebillCustomerId = sessionStorage.getItem("fusebillCustomerId");
    if (
      fusebillCustomerId &&
      fusebillCustomerId.length > 0
    ) {
      inputData.fusebillCustomerId =
        sessionStorage.getItem("fusebillCustomerId") || null;
    }
    var fusebillCustomerBillingAddressId = sessionStorage.getItem("fusebillCustomerBillingAddressId");
    if (
      fusebillCustomerBillingAddressId &&
      fusebillCustomerBillingAddressId.length > 0
    ) {
      inputData.fusebillCustomerBillingAddressId =
        sessionStorage.getItem("fusebillCustomerBillingAddressId") || null;
    }
    var customerId =sessionStorage.getItem("customerId");

    if (customerId && customerId.length > 0) {
      inputData.customerId =parseInt(sessionStorage.getItem("customerId")) || null;
    }

    let statesData: any = this.configprovinceres.filter((item: { shortName: any; }) => {
      return item.shortName === (enrollmentSummaryProvinceval == '' ? validationInputData.province : this.enrollmentFormControl['enrollmentSummaryProvince'].value);
    });

    if (typeof validationInputData === 'object' && validationInputData !== null) {
      validationInputData['marital_status'] = this.marital_status !== '' ? this.marital_status : '';
      validationInputData['billing_sameas_homeAddress'] =this.paidEmployeedTotalDub>0? this.homeaddressEnrollmentVal:true; //this.enrollmentFormControl['homeAddressSameasBillingAddress'].value == 'true' ? true : false;
      if (!validationInputData['billing_sameas_homeAddress']) {
        validationInputData['billing_address'] = {
          "line1": this.enrollmentFormControl['enrollmentSummaryStreetAddress'].value,
          "line2": this.enrollmentFormControl['enrollmentSummaryStreetAddressLane2'].value,
          "city": this.enrollmentFormControl['enrollmentSummaryCity'].value,
          "state": statesData.length != 0 ? statesData[0].name : '',
          "state_id": statesData.length != 0 ? statesData[0].id : '',
          "country": "Canada",
          "country_id": 124,
          "apt": this.enrollmentFormControl['enrollmentSummaryApartSuite'].value,
        }
      }
      else {
        validationInputData['billing_address'] = {
          // "customer_id": parseInt(sessionStorage.getItem("customerId")) || null,
          // "fusebill_customer_id": parseInt(sessionStorage.getItem("fusebillCustomerId")) || null,
          line1: inputData.street_address_line1||'', //this.enrollmentFormControl["enrollmentSummaryStreetAddress"].value || "",
          line2: inputData.street_address_line2||'', //this.enrollmentFormControl["enrollmentSummaryStreetAddressLane2"].value || "",
          city: inputData.city||'', //this.enrollmentFormControl["enrollmentSummaryCity"].value || "",
          state:inputData.province||'', //this.enrollmentFormControl["enrollmentSummaryProvince"].value || "",
          state_id: this.state_id || "",
          country: "Canada",
          country_id: 124,
          postal_zip: inputData.postal_code||'',//this.enrollmentFormControl["enrollmentSummaryPostalCode"].value || "",
          apt: inputData.apt||'',//this.enrollmentFormControl["enrollmentSummaryApartSuite"].value || "",
        };
      }


    } else {
      console.error("Data in sessionStorage is not a valid JSON object.");
    }
    console.log("validationInputData: " + JSON.stringify(validationInputData));
    let formValid = true;

    if(!(this.paidEmployeedTotalDub>0 && !this.homeaddressEnrollmentVal)){
      this.enrollmentForm.get('homeAddressSameasBillingAddress')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryApartSuite')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryStreetAddress')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryStreetAddressLane2')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryCity')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryProvince')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryPostalCode')?.clearValidators();
      for(let control of Object.keys(this.enrollmentForm.controls)){
        this.enrollmentForm.get(control).clearValidators();
        this.enrollmentForm.get(control).updateValueAndValidity();
    }
  }
    if (this.homeaddressEnrollmentVal) {
      this.enrollmentForm.get('homeAddressSameasBillingAddress')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryApartSuite')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryStreetAddress')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryStreetAddressLane2')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryCity')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryProvince')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryPostalCode')?.clearValidators();
      for(let control of Object.keys(this.enrollmentForm.controls)){
        this.enrollmentForm.get(control).clearValidators();
        this.enrollmentForm.get(control).updateValueAndValidity();
      }
    }


     if(this.enrollmentForm.valid){
    // if (formValid) {
    //  let personalinfo: string = `${environment.app.grp}api/students/registration`;
     var endPoint = '/api/ap/corporate/customer/registration';

     var accessToken = sessionStorage.getItem('accessToken');
     this.planssummarymain =
     JSON.parse(sessionStorage.getItem("plansummarymain")) || "";

     var total = 0;
     var amount = 0;
     var tax = 0;
     for (let i = 0; i < this.planssummarymain.length; i++) {
       total += parseFloat(this.planssummarymain[i].total);
       amount += parseFloat(this.planssummarymain[i].amount);

       tax += parseFloat(this.planssummarymain[i].tax);

     }


     let plans=[]
     this.plansummary = JSON.parse(sessionStorage.getItem("allSelectedPlans"))
     // this.optplansummary = JSON.parse(sessionStorage.getItem("allSelectedOptPlans"))

     this.plansummary.forEach(element => {



    element.totalPrice = this._decimalPipe.transform(element.totalPrice,"1.2-2").replace(/,/g, "")
    element.total = this._decimalPipe.transform(element.totalPrice,"1.2-2").replace(/,/g, "")
    element.tax = this._decimalPipe.transform(element.tax,"1.2-2").replace(/,/g, "")
    element.amount = this._decimalPipe.transform(element.amount,"1.2-2").replace(/,/g, "")
    element.planLevelName = element.groupName
     plans.push(element)
     });

      validationInputData["planAllAmount"] = amount
     validationInputData["taxAllAmount"] =tax
     validationInputData["totalAllAmount"] = total
     validationInputData["totalAmount"] = total
     validationInputData["corporateStateId"] =parseInt(sessionStorage.getItem("corporateStateId"))
     validationInputData['plans']=plans;
     //************** */
     validationInputData['equitableRegistrationStatus']="";
     validationInputData['equitableCertificateId']='';
     validationInputData['greenshieldMemberId']='';
     validationInputData['greenshieldRegistrationStatus']='';
     validationInputData['isCorporateAccount']=true;
     validationInputData['provincialHealthcardName']='';

     validationInputData['terminationReason']='';
     validationInputData['paymentMethod']='';
     validationInputData['paymentMethodId']='';
     validationInputData['paymentMethodName']='true';


     console.log('validationInputData',JSON.stringify(validationInputData));

    //  this.studentService.login1(validationInputData)
      this.http.post(environment.apiUrl + endPoint, validationInputData,{
        headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      }}).subscribe(
        (result: any) => {
          if (result.status == "200") {
            Swal.fire({
              title: "Info",
              // html: error.error.message ? error.error.message : error.error.error,
              html:"Enrolled Employee Successfully" ,
              // icon: "warning",
              width: "30%",
              showCancelButton: true,
              confirmButtonText: "View Employee",
              cancelButtonText:'Add Another Employee'
            }).then((result) => {
              if (result.value) {
                this.router.navigate(["/manageMembers"]);
                console.log("result.value: " + result.value);
              }else{
                window.location.reload();
              }
            })


          }
          else{
            Swal.fire({title:'Info',text:result.message||result.error||result.data.error})

          }

        },
        (error) => {

          Swal.fire({
            title: "Error",
            // html: error.error.message ? error.error.message : error.error.error,
            html: `<div class="custom-content">${error.error.message ? error.error.message : error.error.error}</div>`,
            // icon: "warning",
            width: "30%",
            showCancelButton: false,
            confirmButtonText: "Ok",

          }).then((result) => {
            if (result.value) {
              console.log("result.value: " + result.value)
            }
          })

        });
    } else {


    }
  }
  public bankformsubmitdetails() {
    var formData: any = new FormData();

    let personalInfo = JSON.parse(sessionStorage.getItem("Data") ?? '');


    let inputData = {
      customerId: parseInt(sessionStorage.getItem("normalcustomerid") ?? ''),
      bankCode: this.bankPayForm.get('enrollmentSummaryBankNumber')?.value,
      branchCode: this.bankPayForm.get('enrollmentSummaryTransitNumber')?.value,
      accountNumber: this.bankPayForm.get("enrollmentSummaryAccontNumber")?.value,

      amount: this._decimalPipe.transform(sessionStorage.getItem("totalAmount") ?? "", "1.2-2")?.replace(/,/g, ""),
      totalAmount: this._decimalPipe?.transform(sessionStorage.getItem("totalAmount") ?? '', "1.2-2")?.replace(/,/g, ""),

      totalAmountUI: sessionStorage.getItem("totalAmountUI"),
      enrollmentDate: sessionStorage.getItem("enrollmentdate"),
      customerName: personalInfo.firstName + " " + personalInfo.lastName,
    };

    console.log(inputData)

    var encBank = btoa(JSON.stringify(inputData));
    formData.append("session", encBank);
    formData.append("timestamp", new Date().getTime());
    formData.append("files", this.bankfile);

    //console.log(this.bankfile)

    sessionStorage.setItem("session", encBank);

    this.router.navigate(["/signupcomplete"]);

    return false;
  }
  public areYouInternationalStudent(value: any) {
    if (value == 'yes') {
      this.userForm.get('provincialhealth')?.reset();
      this.userForm.get('provincialhealth')?.clearValidators();
      this.userForm.get('provincialhealth')?.updateValueAndValidity();
      this.userForm.get('uhipprovincialhealth')?.reset();
      this.userForm.get('uhipprovincialhealth')?.clearValidators();
      this.userForm.get('uhipprovincialhealth')?.setValidators([Validators.required]);

      this.checkstudenthealthcardstatus = true;
      this.checkstudenthealthcardstatus_UHIP = false;
      this.checkhealthcardstatus = false;

    }
    else {
      this.userForm.get('provincialhealth')?.reset();
      this.userForm.get('provincialhealth')?.clearValidators();
      this.userForm.get('provincialhealth')?.setValidators([Validators.required]);
      this.userForm.get('uhipprovincialhealth')?.reset();
      this.userForm.get('uhipprovincialhealth')?.clearValidators();
      this.userForm.get('uhipprovincialhealth')?.updateValueAndValidity();
      this.checkstudenthealthcardstatus = false;
      this.checkstudenthealthcardstatus_UHIP = true;

      this.checkhealthcardstatusuhip = false;

    }
  }

  public spouseinfo(event: any) {
    if (event.target.value == "true") {
      this.spouseinformation = true;
      this.userForm.get('spousefirstname')?.reset();
      this.userForm.get('spousefirstname')?.clearValidators();
      this.userForm.get('spousefirstname')?.setValidators(Validators.compose([Validators.required,Validators.minLength(1),
        // Validators.pattern("^(?!\\s)[A-Za-z\\s]+$")
      ]));
      this.userForm.get('spouselastname')?.reset();
      this.userForm.get('spouselastname')?.clearValidators();
      this.userForm.get('spouselastname')?.setValidators(Validators.compose([Validators.required,Validators.minLength(1),
        // Validators.pattern("^(?!\\s)[A-Za-z\\s]+$")
      ]))
      this.userForm.get('spousegender')?.reset();
      this.userForm.get('spousegender')?.clearValidators();
      this.userForm.get('spousegender')?.setValidators([Validators.required]);

      // this.userForm.get('spousedateofbirth')?.reset();
      this.userForm.get('spousedateofbirth')?.clearValidators();
      this.userForm.get('spousedateofbirth')?.setValidators(Validators.compose([Validators.required, dateofbirthvalidation]));

      this.userForm.get('spousehealthcard')?.reset();
      this.userForm.get('spousehealthcard')?.clearValidators();
      this.userForm.get('spousehealthcard')?.setValidators([Validators.required]);

    } else {
      // alert("spouseinformation false");
      this.spouseinformation = false;
      this.spousehealthcardinfo = false;
      this.userForm.get('spousefirstname')?.reset();
      this.userForm.get('spousefirstname')?.clearValidators();
      this.userForm.get('spousefirstname')?.updateValueAndValidity();

      this.userForm.get('spouselastname')?.reset();
      this.userForm.get('spouselastname')?.clearValidators();
      this.userForm.get('spouselastname')?.updateValueAndValidity();

      this.userForm.get('spousegender')?.reset();
      this.userForm.get('spousegender')?.clearValidators();
      this.userForm.get('spousegender')?.updateValueAndValidity();

      // this.userForm.get('spousedateofbirth')?.reset();
      this.userForm.get('spousedateofbirth')?.clearValidators();
      this.userForm.get('spousedateofbirth')?.updateValueAndValidity();

      this.userForm.get('spousehealthcard')?.reset();
      this.userForm.get('spousehealthcard')?.clearValidators();
      this.userForm.get('spousehealthcard')?.updateValueAndValidity();
    }
  }



  public havingchildrenDependentInsurence(event: any) {

    let childrenVal = event.target.value;
    console.log("havingchildrenDependentInsurence: " + childrenVal)
    if (childrenVal == 'true') {
      this.dependentchildInsurenceval = true;
      this.childFormGroup.get('childInfoCarrierName')?.setValidators([Validators.required]);
    } else {
      this.childFormGroup.get('childInfoCarrierName')?.reset();
      this.childFormGroup.get('childInfoCarrierName')?.clearValidators();
      this.childFormGroup.get('childInfoCarrierName')?.updateValueAndValidity();
      this.dependentchildInsurenceval = false;
    }
  }

  public enrolledunversity(event: any) {
    console.log("enrolledUnv: " + event.target.checked)
    if (event.target.checked == true) {
      this.graducationdaycheck = true;
      this.childFormGroup.get('childInfoGraduationday')?.setValidators([Validators.required]);
    } else {
      this.childFormGroup.get('childInfoGraduationday')?.reset();
      this.childFormGroup.get('childInfoGraduationday')?.clearValidators();
      this.childFormGroup.get('childInfoGraduationday')?.updateValueAndValidity();
      this.graducationdaycheck = false;
    }
  }
  closePopup(id:any){
    $(`#${id}`).hide();
  }






  provincelist12345(event: any) {
    // alert(event.target.value)
    if (event.target.value == "QC") {
      $('#QCproviance').show();
    }
    this.configprovinceres.forEach((element: any) => {
      if (element.shortName == event.target.value) {
        this.provincialHealthcareUrl = element.provincialHealthcareUrl;
        this.provincialZipcodes = element.zipcodes.split(",");
        this.provincelistid = element.id;
        this.state_id = parseInt(element.fusebillId);
        this.statename = element.name;
      }
    });

    // //console.log(this.userForm.get('postalcode').value)
    if (this.userForm.get("postalcode")?.value) {
      if (
        this.provincialZipcodes.indexOf(
          this.userForm.get("postalcode")?.value[0]
        ) == -1
      ) {
        this.invalidpostalcodeprivince = true;
        this.userForm.get("postalcode")?.markAsTouched();
      } else {
        this.invalidpostalcodeprivince = false;
      }

      if (this.userForm.get("postalcode")?.value.length == 0) {
        this.invalidpostalcodeprivince = false;
      }
    }
    // alert(this.postalvalue)
  }

  // provincelist12345(event:any){
  //   alert('121212');
  // }

  public havingchildren(event: any) {
    console.log("havingchildren: ");
    if (event.target.value == "true") {
      this.childrenhealthinformation = true;
      // this.noOfChildrenChangedValue=1;
      console.log(this.noOfChildrenChangedValue);
      this.userForm.get('noofchildren').setValue(this.noOfChildrenChangedValue);
    } else {
      this.childrenhealthinformation = false;
      this.childInfoAddDataArray.shift();
      this.childTableRowsLength = this.childInfoAddDataArray.length;
      this.userForm.get('childrenDetails')?.reset();
      this.userForm.get('childrenDetails')?.clearValidators();
      this.userForm.get('noofchildren')?.clearValidators();
      this.userForm.get('noofchildren')?.updateValueAndValidity();
      // this.childrenhealthcardinfo = false;
      // this.childrenshealthcardinfo = false;
    }
  }

  public checkparentalhealthinsuarnce(value: any) {
    console.log("value >" + value.target.value)
    if (value.target.value == "false") {
      this.parentalhelathinsuranecheck = false;
    } else {
      this.parentalhelathinsuranecheck = true;
    }
  }

  public avisordisclosure() {

    ///need to check
    if (this.Shared.getlangdiscloure()) {
      if (sessionStorage.getItem("lanToken") == "en") {

        this.disclosureAgreement = this.disclosureAgreement_dynamicData;
      } else {
        this.disclosureAgreement = this.disclosureAgreement_dynamicData;

      }
    } else {
    }
    // const model=new Modal(this.advisoranddisclousreModal.nativeElement);
    // model.show();
  }

  public childdob(value: any) {
    let dob = new Date(value.target.value);
    var res = diff_years(dob);

    if (res > 18) {
      this.childrenenrollement = true;
    } else {
      this.childrenenrollement = false;
    }
  }

  public childdsiablility(value: any) {
    // this.childendisability = value.target.checked;
  }

  public dependentchildspecialinfo() {
    // jQuery("#dependentchildspecialinfo-modal").modal("show");
  }
  public showpadaggrement() {


    return false
    this.showSignAndAgreeOrAgree = false;
    this.PADpafaggrementModalShow();
    this.generatePADaggrement = '';
    //     if(sessionStorage.getItem("fileurl") && sessionStorage.getItem("filename") && sessionStorage.getItem("signature")){
    // this.showmodelsign()
    //     }
    //     else{

    let Data = JSON.parse(sessionStorage?.getItem('Data') || "")
    this.agreestatus = false
    this.signaturestatus = true
    // if(this.bankdetailsverify == true){

    //   this.bankdetailsverify =true
    // }

    // this.Shared.getMessage()
    if (this.Shared.getMessage()) {
      this.isFileUploaded = false
    }
    else {
      this.isFileUploaded = true
    }

    // alert(this.bankdetailsverify)
    console.log("homeAddressSameasBillingAddress " + this.enrollmentForm.get('homeAddressSameasBillingAddress')?.valid);
    if (this.enrollmentForm.get('homeAddressSameasBillingAddress')?.valid) {
      let addressobject = {
        "address1": this.enrollmentForm.get("enrollmentSummaryStreetAddress")?.value || Data.street_address_line1 || sessionStorage.getItem("addressline1") || "",
        "address2": this.enrollmentForm.get("enrollmentSummaryStreetAddressLane2")?.value || Data.street_address_line2 || "",
        "apt": this.enrollmentForm.get("enrollmentSummaryApartSuite")?.value || Data.apt || "",
        "city": this.enrollmentForm.get("enrollmentSummaryCity")?.value || Data.city || sessionStorage.getItem("billingaddresscity") || "",
        "province": this.enrollmentForm.get("enrollmentSummaryProvince")?.value || Data.province || this.bankPayForm.get("enrollmentSummaryProvince")?.value || "",
        "postalCode": this.enrollmentForm.get("enrollmentSummaryPostalCode")?.value || Data.postal_code || sessionStorage.getItem("enrollmentSummaryPostalCode") || "",
        "phone": Data.phone_number,
        "email": Data.email,
      }
      console.log("addressobject: " + JSON.stringify("addressobject: " + addressobject))

      let bankAddress = this.bankverifyDetails.address
      let bankAdressArr = bankAddress.split(",")
      let bankCity = bankAdressArr[bankAdressArr.length - 2].replace(" ", '');
      let provincePostal = bankAdressArr[bankAdressArr.length - 1];
      let provincePostalArr = provincePostal.split(" ")
      let bankProvince = provincePostalArr[provincePostalArr.length - 3]
      let bankPostalCode = provincePostalArr[provincePostalArr.length - 2] + " " + provincePostalArr[provincePostalArr.length - 1]

      let bankobject =
      {
        "name": this.bankverifyDetails.bank.name,
        "address": this.bankverifyDetails.bank.address.split(",")[0],
        "city": bankAdressArr[bankAdressArr.length - 2].replace(" ", ''),
        "province": provincePostalArr[provincePostalArr.length - 3],
        "postalCode": provincePostalArr[provincePostalArr.length - 2] + " " + provincePostalArr[provincePostalArr.length - 1]
      }
      console.log("bankobject: " + bankobject)

      let inputData1 = {
        "bankCode": this.bankPayForm.get("enrollmentSummaryBankNumber")?.value,
        "branchCode": this.bankPayForm.get("enrollmentSummaryTransitNumber")?.value,
        "accountNumber": this.bankPayForm.get("enrollmentSummaryAccontNumber")?.value,
      };
      console.log("inputData1: " + inputData1)

      var fileExtension = '.' + this.bankfile.name.split('.').pop();

      var encBank = btoa(JSON.stringify(inputData1));
      var formData: any = new FormData();
      formData.append("firstName", Data.firstName);
      formData.append("lastName", Data.lastName);
      formData.append("address", JSON.stringify(addressobject));
      formData.append("bank", JSON.stringify(bankobject));
      formData.append("files", this.bankfile, "void_cheque_" + Date.now() + fileExtension.toLowerCase());
      // formData.append("files", this.bankfile.name,"void.pdf");
      formData.append("session", encBank) || "";
      formData.append("timestamp", new Date().getTime());


      // let padAggrement: string = `${environment.app.grp}api/students/generatePAD`;
      let padAggrement: string = "";

        //this.studentService.padaddgrementdetails(formData).
        this.http.post(padAggrement,formData,{})
      .subscribe((result: any) => {
        if (result.status == "200") {
          this.generatePADaggrement = result.data.url;
          console.log("generatePADaggrement: " + this.generatePADaggrement);
           this.generatePADaggrement="https://testapi.groupbenefitz.aitestpro.com/app/server/PAD_Agreement_l_1700036759458.pdf";
          // jQuery("#PADpafaggrement-modal").modal("show");
          sessionStorage.setItem("fileurl", result.data.url)
          sessionStorage.setItem("filename", result.data.filename)
        }
        else {
          Swal.fire({
            title: "Error",
            text: result.message ? result.message : result.error,
            width: "30%",
            showCancelButton: false,
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.value) {
            } else {
              // this.router.navigate(['pages/signup-form']);
            }
          });
        }
      })
    }
    else {

      this.bankPayForm.markAsTouched();
      this.bankPayForm.get("enrollmentSummaryBankNumber")?.markAsTouched();
      this.bankPayForm.get("enrollmentSummaryTransitNumber")?.markAsTouched();
      this.bankPayForm.get("enrollmentSummaryAccontNumber")?.markAsTouched();
      this.bankPayForm.get("enrollmentSummaryvoidCheckUpload")?.markAsTouched();
      // this.bankPayForm.get("checkbankdetails").markAsTouched();
      this.enrollmentForm.get("enrollmentSummaryApartSuite")?.markAsTouched();
      this.enrollmentForm.get("enrollmentSummaryStreetAddress")?.markAsTouched();
      this.enrollmentForm.get("enrollmentSummaryCity")?.markAsTouched();
      this.enrollmentForm.get("enrollmentSummaryProvince")?.markAsTouched();
      this.enrollmentForm.get("enrollmentSummaryPostalCode")?.markAsTouched();

      // if (this.signaturecheck == true) {
      //   this.signaturemessage = true;
      // }
    }
  }

  dependentWithSpecialNeedsShow() {
    $('#dependentWithSpecialNeeds').show();
  }
  PADpafaggrementModalShow() {
    //see that using ViewChildren you use nativeElement
    //const modal = new Modal(this.PADpafaggrementModalpopup.nativeElement);
    //modal.show();
  }

  PADpafaggrementModalShowSign() {
    //see that using ViewChildren you use nativeElement
    //const modal = new Modal(this.PADpafaggrementModalpopupSign.nativeElement);
    //modal.show();
  }
  PADpafaggrementModalClose() {
    //see that using ViewChildren you use nativeElement
    console.log("PADpafaggrementModalClose working this function")
    //const modal = new Modal(this.PADpafaggrementModalpopup.nativeElement);
    // modal.hide();

    // const modalElement = this.PADpafaggrementModalpopup.nativeElement;
    // modalElement.parentNode.removeChild(modalElement);
  }
  signaturePadagreementModalShow() {
    //see that using ViewChildren you use nativeElement
    this.clearSignature();
    this.padAgreementClearSignature();
    //const modal = new Modal(this.signaturePadagreementModalPopup.nativeElement);
    //modal.show();
  }
  padAgreementClearSignature() {
    this.padAggsignaturePadCC.clear();
    this.padAgreementSignaturePadClear = false;

    this.padAgreementSignaturemessagecc = true;
  }

  startSigning(event: any) {
    if (event.target.touched) {
      console.log('sign touched')
      this.signaturemessagecc = false;
    } else {
      console.log('sign not toched')
    }
    this.signaturePadClear = true;
    this.signaturemessagecc = false;

    const base64Data = this.signaturePadCC.toDataURL();
    this.signatureImgcc = base64Data;
    sessionStorage.setItem("signatureCC", this.signatureImgcc);
  }


  postSecondaryShow() {
    $('#postSecondaryStudent').show();
  }
  // this.createCutomerPADagreement(data)
  // }

  public padLoaded(event: any) {

  }
  public voidcheckupload(event: any) {


    var fileExtension = '.' + event.target.files[0].name.split('.').pop();

    // event.target.files[0].name ="void_cheque_"+Date.now()+fileExtension

    // "void_cheque_"+Date.now()+fileExt
    //console.log(event)
    this.isFileUploaded = true
    this.imagedisplay = null;
    // alert(event.target.files[0].name.replace(event.target.files[0].name,"void.pdf"))
    this.bankfile = event.target.files[0];
    // this.bankfile.name = (this.bankfile.name,"void_cheque_"+Date.now()+fileExtension)
    // alert(fileExtension.toLowerCase())
    this.Shared.setMessage(this.bankfile);
    var allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
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
    } else {
      error = true;


      message = "Invalid file type. Only jpg, png image,pdf files are allowed.";
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

          this.bankPayForm.get('enrollmentSummaryvoidCheckUpload')?.reset();
          this.isFileUploaded = true
        } else {
        }
      });
    }

    else {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      if (event.target.files[0].type == "application/pdf") {
        // alert("1")
        this.pdfview = true;
        this.normalview = false;
      } else {
        this.pdfview = false;
        this.normalview = true;
      }

      reader.onload = (_event) => {
        this.imagedisplay = reader.result;
        console.log("imgedisplay :",this.imagedisplay);
      };

      // let id = parseInt(sessionStorage.getItem("normalcustomerid"));
    }

    // sessionStorage.setItem("files", event.target.files[0]);
    // localStorage.setItem("files", JSON.stringify(event.target.files[0]));

    // sessionStorage.setItem("voidCheque",this.bankfile)
  }



  public spousehealthcard(event: any) {
    // alert("spousehealthcard")
    if (event.target.value == "true") {
      this.spousehealthcardinfo = true;
      this.userForm.get('Spousenameofthecarrier')?.reset();
      this.userForm.get('Spousenameofthecarrier')?.clearValidators();
      this.userForm.get('Spousenameofthecarrier')?.setValidators(Validators.compose([Validators.required,
        // Validators.pattern('^(?!\\s)[A-Za-z0-9\\s]+$')
      ]));

      this.userForm.get('spousecob')?.reset();
      this.userForm.get('spousecob')?.clearValidators();
      this.userForm.get('spousecob')?.setValidators([Validators.required]);

    } else {
      this.spousehealthcardinfo = false;

      this.userForm.get('Spousenameofthecarrier')?.reset();
      this.userForm.get('Spousenameofthecarrier')?.clearValidators();
      this.userForm.get('Spousenameofthecarrier')?.updateValueAndValidity();

      this.userForm.get('spousecob')?.reset();
      this.userForm.get('spousecob')?.clearValidators();
      this.userForm.get('spousecob')?.updateValueAndValidity();
    }
  }
  public childAddFun() {
    this.childInfoModalAddAndUpdateButton = "Add";
    this.dependentchildInsurenceval = false;
    this.childFormGroup.get("childInfoFirstName")?.setValidators(Validators.compose([Validators.required, Validators.minLength(1)]));
    this.childFormGroup.get("childInfoLastName")?.setValidators(Validators.compose([Validators.required,Validators.minLength(1)]));

   this.childFormGroup.get("childInfoGender")?.clearValidators();
    this.childFormGroup.get("childInfoGender")?.setValidators(Validators.required);

    this.childFormGroup.get('childInfoDOB')?.clearValidators();
    this.childFormGroup.get("childInfoDOB")?.setValidators(Validators.required);

    this.childFormGroup.get('DependentchildInsurence')?.clearValidators();
    this.childFormGroup.get('DependentchildInsurence')?.setValidators(Validators.required);

    // const model=new Modal(this.childInfoModal.nativeElement);
    // model.show();
    this.childFormGroup.reset();
    $('#childInfoModal').show();

  }



  advisourediscloserLoaded(event: any) {
    this.pdfvisibleadvisouredisclosure = false;
  }

  public termandconditions() {
    console.log("termscondition***********************");
    if (this.Shared.getlangterms()) {
      if (sessionStorage.getItem("lanToken") == "en") {
        this.term_and_conditions = this.brokerTermsConditions;
      }
      else {
        this.term_and_conditions = this.brokerTermsConditions;
      }
      console.log("url print: " + this.term_and_conditions)
    } else {
    }
    // document.getElementById('termsAndConditionsModal')?.show();
    // const model=new Modal(this.termsAndConditionsModal.nativeElement);
    // model.show();
  }

  changeTextToUppercase(field: any) {
    console.log("studentId field: " + field)
    this.userForm.get(field)?.setValue(this.userForm.controls[field].value.toUpperCase());
  }

  changeTextToUppercasePostalCode(field: any, event: any) {

    this.userForm.get(field)?.setValue(this.userForm.controls[field].value.toUpperCase());

    this.postalvalue = event.target.value;
    if (this.provincialZipcodes.indexOf(this.postalvalue[0]) == -1) {
      this.invalidpostalcodeprivince = true;
    } else {
      this.invalidpostalcodeprivince = false;
    }
    if (this.postalvalue.length == 0) {
      this.invalidpostalcodeprivince = false;
    }
  }

  changeTextToUppercaseenrollmentPostalCode(field: any, event: any) {
    this.enrollmentForm.get(field)?.setValue(this.enrollmentForm.controls[field].value.toUpperCase());
    this.postalvalue = event.target.value;
    console.log("postalvalue12212: " + this.postalvalue);
    if (this.provincialZipcodes.indexOf(this.postalvalue[0]) == -1) {
      this.invalidenrollmentpostalcodeprovince = true;
    } else {
      this.invalidenrollmentpostalcodeprovince = false;
    }
    if (this.postalvalue.length == 0) {
      this.invalidenrollmentpostalcodeprovince = false;
    }
  }


  public personalInfoSubmit() {
    console.log("userForm validations1233 " + JSON.stringify(this.userForm.value));
    // console.log("userForm validations " + JSON.stringify(this.userForm));

    // this.userFormControl
    if(this.userForm.invalid){
    console.log(this.userForm.value);
    }



    let userFormDetails = this.userForm.value;
    let childInfo = this.childInfoAddDataArray;

    // console.log("childInfo",childInfo);

    let childInfoArray = [];

    for (let childData of childInfo) {
      let childObject: any = {
        "first_name": childData.childInfoFirstName,
        "last_name": childData.childInfoLastName,
        "firstName": childData.childInfoFirstName,
        "lastName": childData.childInfoLastName,
        "gender": childData.childInfoGender,
        "date_of_birth": moment(childData.childInfoDOB).format('YYYY-MM-DD'),
        "dob": moment(childData.childInfoDOB).format('YYYY-MM-DD'),
        "is_child_having_healthcard":JSON.parse(childData.DependentchildInsurence?childData.DependentchildInsurence:'false') , //== 'true' ? true : false,
        "child_carrier_name": childData.childInfoCarrierName,
        "enrolledInUniversity":JSON.parse(childData.childPostGraduate?childData.childPostGraduate:'false'),
        "isDisabled": JSON.parse(childData.childdisablility?childData.childdisablility:'false'),
        "graduationDay": childData.childInfoGraduationday
      }
      // console.log('forArry',childObject)
      childInfoArray.push(childObject);
    }

    console.log("userFormDetails.havingspouse: " + userFormDetails.havingspouse)
    let spouseInfo = {};
    if (userFormDetails.havingspouse) {
      spouseInfo = {
        first_name: userFormDetails.spousefirstname,
        last_name: userFormDetails.spouselastname,
        firstName: userFormDetails.spousefirstname,
        lastName: userFormDetails.spouselastname,
        // email:userFormDetails.spouseemail || "",
        email: "",
        date_of_birth: moment(userFormDetails.spousedateofbirth).format('YYYY-MM-DD'),
        dob: moment(userFormDetails.spousedateofbirth).format('YYYY-MM-DD'),
        gender: userFormDetails.spousegender,
        is_spouse_having_healthcard: userFormDetails.havingspouse == 'true' ? true : false,
        spouse_carrier_name: userFormDetails.Spousenameofthecarrier,
        cobCoverage: userFormDetails.spousecob,
      }
    } else {
      spouseInfo = {}
    }

    let statesData = this.configprovinceres.filter((item: { shortName: any; }) => {
      return item.shortName === userFormDetails.province;
    });
    let statesId: any;
    let statesName: any;
    if (statesData.length > 0) {
      statesId = statesData[0].id;
      statesName = statesData[0].name;
    } else {
      statesId = "";
      statesName = "";
    }

    // console.log("configprovinceres: "+JSON.stringify(this.configprovinceres))
    console.log("state id: " + statesData)
    console.log("state id: " + JSON.stringify(statesData))
    let personalInfoData = {
      "isStudent":false,
      // "brokerId" :parseInt(userFormDetails.brokername),
      "recaptchaCheck": false,
      "g_recaptcha_response": "test",
      "planEnrollmentDate":moment(userFormDetails.planEnrollmentDate,"DD-MMM-YYYY").format("YYYY-MM-DD"), //userFormDetails.planEnrollmentDate,
      "enrollmentDate":moment(userFormDetails.planEnrollmentDate,"DD-MMM-YYYY").format("YYYY-MM-DD"), //userFormDetails.planEnrollmentDate,
      "EnrollmentDate":moment(userFormDetails.planEnrollmentDate,"DD-MMM-YYYY").format("YYYY-MM-DD"), //userFormDetails.planEnrollmentDate,

      "first_name": userFormDetails.givenname,
      "firstName": userFormDetails.givenname,
      "last_name": userFormDetails.lastname,
      "lastName": userFormDetails.lastname,
      "email": userFormDetails.email,
      "phone_number": userFormDetails.phonenumber,
      "street_address_line1": userFormDetails.streetaddress,
      "street_address_line2": userFormDetails.streetaddressline2==undefined?'':userFormDetails.streetaddressline2,
      "city": userFormDetails.city,
      "province": userFormDetails.province,
      "province_id": statesId,
      "country": "Canada",
      "country_id": 124,
      "postal_code": userFormDetails.postalcode,
      "date_of_birth": moment(userFormDetails.dateofbirth).format('YYYY-MM-DD'),
      "dob": moment(userFormDetails.dateofbirth).format('YYYY-MM-DD'),
      "gender": userFormDetails.gender,
      "workingProvince": userFormDetails.workingProvince,
      // "universityName": "AUSU" || "",
      "enrolmentProgramName": "",
      // "date_of_hiring": moment(userFormDetails.planEnrollmentDate,"DD-MMM-YYYY").format("YYYY-MM-DD"),//userFormDetails.planEnrollmentDate,
      "working_20hours": true,
      "weeklyHours": 0,
      "hours_per_week": 40,//userFormDetails.hoursperweek==undefiend?''userFormDetails.hoursperweek:
      // "foreignStudent": userFormDetails.foreignStudent == 'true' ? true : false,
      // "isUHIP": userFormDetails.uhipprovincialhealth == 'true' ? true : false,
      "coveredParentalHealthInsurance": userFormDetails.parentalinsurance == 'true' ? true : false,
      "provincial_health_coverage": userFormDetails.provincialhealth == 'true' ? true : false,
      "work_visa": "",
      "having_spouse": userFormDetails.havingspouse == 'true' ? true : false,
      "spouse_details":userFormDetails.havingspouse == 'false'?{}: spouseInfo,
      "having_dependent_children": userFormDetails.Dependentchildren == 'true' ? true : false,
      "no_of_children": userFormDetails.Dependentchildren == 'true' ?(this.noOfChildrenChangedValue) : 0,
      "children_details": childInfoArray.length > 0 ? childInfoArray : "",
      "signature": "digiSign",
      "fusebillCustomer": true,
      "formId": parseInt(this.formid),
      "brokerId": parseInt(this.brokerid),
      // "formId":parseInt(userFormDetails.formrname),//this.formid,
      "termsandconditions": '',//userFormDetails.termsandconditions,
      "disclouseradvisor": true,
      "state": statesName,
      "state_id": statesId,
      "currency": "CAD",
      "currencySymbol": "$",
      "apt": userFormDetails.apt_suite==undefined?'':userFormDetails.apt_suite,
      "studentId": userFormDetails.studentId,
      "beneficiaries_details": [

      ],
      "employeeKey": "",
      "employeeGeneric": true,
      "employerName":userFormDetails.employername || "",
      "date_of_hiring": moment(userFormDetails.dateofhire, "MM-DD-YYYY").format(
        "YYYY-MM-DD"
      ),
    }

    console.log("personalInfoData: " + JSON.stringify(personalInfoData))

    this.applicantfirstname = userFormDetails.givenname;
    //API calling https://testapi.groupbenefitz.aitestpro.com/api/students/validation
    let dependent_info=true;
    if(this.userForm.get('Dependentchildren')?.value === 'true'){
      if(this.childTableRowsLength>0)
        dependent_info=true;
      else
      dependent_info=false;
    }
  else{
        dependent_info=true;
  }

    if (this.userForm.valid && !this.invalidpostalcodeprivince&&dependent_info&&!this.checkhealthcardstatus) {
      //https://testadminapi.groupbenefitz.aitestpro.com/api/ap/customer/plans
      let validationdata: string = `${environment.apiUrl}/api/ap/corporate/customer/validation`;
      var accessToken = sessionStorage.getItem('accessToken');
      //this.studentService.validation(personalInfoData)
      this.http.post(validationdata, personalInfoData,
        {headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      }})
      .subscribe(
        (result: any) => {
          console.log("json result: " + JSON.stringify(result))
          if (result.status == "200") {
            this.selectedTab = 'tab2';
            // this.loaderService.show();
////this.loaders.showLoader();
            sessionStorage.setItem("customerTierId", result.data.customer.customerTierId);
            sessionStorage.setItem("employeeshare","0")
            this.mainarray =[]

            sessionStorage.setItem("planDetailsArrayBlock", "[]");
            this.effectiveEmployeeTotalContibution = 0
            sessionStorage.setItem("totalAmount", "0");
            sessionStorage.setItem("totalAmountUI", "0");

            sessionStorage.setItem("allSelectedPlans", "[]");

            sessionStorage.setItem("plansummary", "[]");
            sessionStorage.setItem("selectedPlans", "{}");
            sessionStorage.setItem("plansummarymain", "[]");
            sessionStorage.setItem("plansummaryopt", "[]");
            sessionStorage.setItem("corporateStateId", result.data.corporateProvince.id);
            // sessionStorage.removeItem("paymentMethod")   ////here
            sessionStorage.removeItem("paymentfail");
            this.companypaidproductid =[]



            jQuery("html, body").scrollTop(0);

            this.specialpackages = [];
            this.packagesInBlocks = result.data.blocks;
            this.basepackages =result.data.packages;
            let companyplans = this.convertpackagesToPlans2(this.packagesInBlocks)[1]
            let baseplans = this.convertpackagesToPlans2(this.basepackages)[1]
            this.calculateBasePlanDeltasforCCplans(this.packagesInBlocks.coveredByCompany,baseplans,companyplans)

            this.mainarray =this.cobminedcommonfunction(this.packagesInBlocks.paidByCompany,this.modifiedBlocksCoveredByCompany,this.packagesInBlocks.paidByEmployee)



            let allPackages=[]
            for (let key in this.mainarray){
              console.log(key)
              allPackages.push(this.mainarray[key]);

            }
            this.mainarray = allPackages


            this.mainarray.forEach(element => {
              element.groups.forEach(group => {
                if(group.categorization.paidByCompany==1){
                  group.plans.forEach(plan => {
                    Object.keys(plan.productAddonss).forEach(key=>{
                      plan.productAddonss[key].forEach(product => {
                        this.companypaidproductid.push({"id":product.id})

                        $("#plancheck" + product.id).prop("checked", false);

                      });
                    })
                  });
                }

                setTimeout(() => {
                  if(group.categorization.coveredByCompany==1){
                    group.plans.forEach(plan => {
                      Object.keys(plan.productAddonss).forEach(key=>{
                        plan.productAddonss[key].forEach(product => {
                          $("#plancheck" + product.id).prop("checked", false);


                        });
                      })
                    });
                  }
                  if(group.categorization.paidByEmployee==1){
                    group.plans.forEach(plan => {
                      Object.keys(plan.productAddonss).forEach(key=>{
                        plan.productAddonss[key].forEach(product => {

                          $("#plancheck" + product.id).prop("checked", false);

                        });
                      })
                    });
                  }
                  if(group.categorization.paidByCompany){
                    // this.planAmount=0.00;
                    // sessionStorage.setItem('')
                  }
                }, 1000);


              });

            });


            sessionStorage.setItem("stateid", result.data.province.id);
            sessionStorage.setItem("maritalStatus", result.data.customer.maritalStatus);

            sessionStorage.setItem("planDetailsArray", JSON.stringify(this.specialpackages));
            sessionStorage.setItem("planDetailsArrayBlock", JSON.stringify(this.mainarray));
            this.autoSelectCompanyPaidPlans();
            setTimeout(() => {

              sessionStorage.setItem("Data", JSON.stringify(personalInfoData));

              // sessionStorage.setItem("customerId",result.data.customer.fusebill.customerId)
              // sessionStorage.setItem("publicApiKey",result.data.customer.fusebill.publicApiKey)
              // sessionStorage.setItem("normalcustomerid",result.data.customer.id)
              sessionStorage.setItem("enrollmentdate", personalInfoData.planEnrollmentDate);
              // this.loaderService.hide();
//this.loaders.hideLoader();
            }, 2000);

            // (this.applicantfirstname = this.capitalize(
            //   result.data.customer.name
            // )),
            // if ( personalInfoData.having_spouse &&
            //   userFormDetails.Dependentchildren == 'true'){

            // }
            this.completeapplicantinfo='Based on the information provided, Employee is eligible to apply for the following plans';

            sessionStorage.setItem("completeapplicantinfo", this.completeapplicantinfo);
          }
          else {
            Swal.fire({
              title: "Error",
              text: result.message ? result.message : result.error,
              width: "30%",
              showCancelButton: false,
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.value) {
              } else {
                // this.router.navigate(['pages/signup-form']);
              }
            });
          }
        }, (error) => {
          console.log("error", error);
          if (error.error.errorCode == "GBS_CV_0009_A" || error.error.errorCode == "GBS_CV_0010") {//"GBS_CV_0010"
            console.log("error", error);//409
            Swal.fire({
              title: "Error",
              // html: error.error.message ? error.error.message : error.error.error,
              html: `<div class="custom-content">${error.error.message ? error.error.message : error.error.error}</div>`,

              showCancelButton: true,
              confirmButtonText: "Visit Portal",

              // text:'codes',
            }).then((result) => {
              if (result.value) {
                let link = error.error.customerportalLink != undefined ||
                  error.error.customerportalLink != null || error.error.customerportalLink != "" ?
                  error.error.customerportalLink : error.error.data.customerportalLink;

                window.open(link);
                // let url=this.location['origin']
                // this.router.navigate([url+'/portal/']);
                // this.router.navigate(['/portal/']);
                if (
                  error.error.message.includes("incomplete") ||
                  error.error.message.includes("The email address already exists")
                ) {
                  let formLink = sessionStorage.getItem("formlink");
                  // sessionStorage.clear();

                  // this.router.navigate([formLink]);
                  // window.location.reload();
                }
              } else {
              }
            });
          }
          else {
            console.log("error", error);//409
            Swal.fire({
              title: "Error",
              // html: error.error.message ? error.error.message : error.error.error,
              html: `<div class="custom-content">${error.error.error.message ? error.error.error.message : error.error.error.error}</div>`,
              // icon: "warning",
              width: "30%",
              showCancelButton: false,
              // confirmButtonText: "Visit Portal",

            }).then((result) => {
              if (result.value) {
                // let link=error.error.customerportalLink!=undefined||
                // error.error.customerportalLink!=null||error.error.customerportalLink!=""?
                // error.error.customerportalLink:error.error.data.customerportalLink;

                // window.open(link);
                // let url=this.location['origin']
                // this.router.navigate([url+'/portal/']);
                // this.router.navigate(['/portal/']);
                if (
                  error.error.message.includes("incomplete") ||
                  error.error.message.includes("The email address already exists")
                ) {
                  let formLink = sessionStorage.getItem("formlink");
                  // sessionStorage.clear();

                  // this.router.navigate([formLink]);
                  // window.location.reload();
                }
              } else {
              }
            });
          }
        });
    } else {
      this.scrollToFirstInvalidControl1();
    }
  }

  private scrollToFirstInvalidControl1() {

    const firstInvalidControl: HTMLElement =
      this.el.nativeElement.querySelector(
        "form .ng-invalid" || "form .ng-untouched"
      );
    // //console.log(firstInvalidControl);
    window.scroll({
      top: this.getTopOffset(firstInvalidControl),
      left: 0,
      behavior: "smooth",
    });
  }
  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 300;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }

  public uhipprovincialhealth(value: any) {
    console.log("value: " + value);
    if (value.target.value == "true") {
      //const modal = new Modal(this.checkphcpstatusModal.nativeElement);//checkuhipstatusModal
      //modal.show();

      this.checkhealthcardstatusuhip = false;
    } else {
      $('#checkphcpstatusModal').show();
      this.checkhealthcardstatusuhip = true;
    }
  }


  public confirmoptionsselection() {
    let optionumber = $('#optionumber').val();
    console.log('plandetailsobj', $('#plandetailsobj').val());

    let plandetailsobj = $('#plandetailsobj').val().split('##');

    let array = [];

    let optionarray = [];

    let checkvalue = true;

    for (let i = 1; i <= optionumber; i++) {
      checkvalue =
        checkvalue && $('.optionselectionmethod-' + i + ':checked').val();
    }

    if (!checkvalue) {
      this.optionmessage = 'Please select all plan options';
      return;
    } else {
      this.optionmessage = '';
    }

    $('#showplanoptions-modal').hide();

    if (sessionStorage.getItem('maritalStatus') == plandetailsobj[2]) {
    } else {
      if (sessionStorage.getItem('brokerType') == 'EXECUTIVE') {
        $('#insuranceconfirmation-modal').modal('show');
      }
    }

    for (let i = 1; i <= optionumber; i++) {
      let optionobj: any = {};

      let selectedOptionValues = JSON.parse(
        $('.optionselectionmethod-' + i + ':checked').val()
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
      // enrollmentDate: moment(
      //   this.userForm.get('planEnrollmentDate')?.value,
      //   'DD-MMM-YYYY'
      // ).format('YYYY-MM-DD'),
      enrollmentDate:sessionStorage.getItem('enrollmentdate'),
      // "name":plandetailsobj[1]+"-"+plandetailsobj[2],
      name: plandetailsobj[14],
      details: plandetailsobj[0],
      packagename: plandetailsobj[0],
      groupName: plandetailsobj[1],
      amount: parseFloat(plandetailsobj[3]),
      planCoverage: plandetailsobj[2],
      planPrice: parseFloat(plandetailsobj[3]),
      amountUI: '$' + this._decimalPipe.transform(plandetailsobj[3], '1.2-2'),
      gst:
        plandetailsobj[4] == null ||
        plandetailsobj[4] == '' ||
        plandetailsobj[4] == undefined ||
        plandetailsobj[4] == 'null'
          ? 0
          : parseFloat(plandetailsobj[4]),
      hst:
        plandetailsobj[5] == null ||
        plandetailsobj[5] == '' ||
        plandetailsobj[5] == undefined ||
        plandetailsobj[5] == 'null'
          ? 0
          : parseFloat(plandetailsobj[5]),
      pst:
        plandetailsobj[6] == null ||
        plandetailsobj[6] == '' ||
        plandetailsobj[6] == undefined ||
        plandetailsobj[6] == 'null'
          ? 0
          : parseFloat(plandetailsobj[6]),
      qst:
        plandetailsobj[17] == null ||
        plandetailsobj[17] == '' ||
        plandetailsobj[17] == undefined ||
        plandetailsobj[17] == 'null'
          ? 0
          : parseFloat(plandetailsobj[17]),
      gstCheck:
        plandetailsobj[4] == null ||
        plandetailsobj[4] == '' ||
        plandetailsobj[4] == undefined ||
        plandetailsobj[4] == 'null'
          ? false
          : true,
      hstCheck:
        plandetailsobj[5] == null ||
        plandetailsobj[5] == '' ||
        plandetailsobj[5] == undefined ||
        plandetailsobj[5] == 'null'
          ? false
          : true,
      pstCheck:
        plandetailsobj[6] == null ||
        plandetailsobj[6] == '' ||
        plandetailsobj[6] == undefined ||
        plandetailsobj[6] == 'null'
          ? false
          : true,
      qstCheck:
        plandetailsobj[17] == null ||
        plandetailsobj[17] == '' ||
        plandetailsobj[17] == undefined ||
        plandetailsobj[17] == 'null'
          ? false
          : true,
      id: parseFloat(plandetailsobj[7]),
      fusebillPlanID:
        plandetailsobj[8] == null ||
        plandetailsobj[8] == '' ||
        plandetailsobj[8] == undefined ||
        plandetailsobj[8] == 'null'
          ? 0
          : parseFloat(plandetailsobj[8]),
      planFrequencyID:
        plandetailsobj[9] == null ||
        plandetailsobj[9] == '' ||
        plandetailsobj[9] == undefined ||
        plandetailsobj[9] == 'null'
          ? 0
          : parseFloat(plandetailsobj[9]),
      optIn: plandetailsobj[10] == 'true' ? true : false,
      planname: plandetailsobj[14],
      planLevel: parseInt(plandetailsobj[15]),
      packageId: parseInt(plandetailsobj[16]),
      options: optionarray || [],
      //  "disallowedPlanLevels":plandetailsobj[11]
    };
    if (plandetailsobj[11] != null || plandetailsobj[11] != 'null') {
      if (plandetailsobj[11].includes(plandetailsobj[12])) {
        // elementcv.checked =false
      }
    }

    let obj1 = {};
    console.log(obj);
    this.addtoplansummary(obj, this.planobjdata);
  }

  public closeoptionsselection() {
    $('#showplanoptions-modal').hide()
    let plandetailsobj = $('#plandetailsobj').val().split('##');

    console.log(plandetailsobj[19]);
    // console.log(plandetailsobj[20])

    $('#plancheck' + plandetailsobj[19]).prop('checked', false);

    let optionumber = $('#optionumber').val();

    $('#showplanoptions-modal').hide()

    for (let i = 1; i <= optionumber; i++) {
      $('.optionselectionmethod-' + i + ':checked').prop('checked', false);
    }
  }
  selectTab(tabName: string): void {
    this.planssummary = JSON.parse(sessionStorage.getItem("plansummarymain"));


    //console.log(this.planssummary);

   if (this.planssummary) {

     this.planssummary.forEach((element,index) => {


       setTimeout(() => {
         const dom: HTMLElement = this.elementRef.nativeElement;
         const plan: any = dom.querySelector("#plancheck" + element.id);
         // //console.log(element)
         if (element.options && element.options.length > 1) {
           element.products.forEach((products,index) => {
             $("#plancheck" + products.id).click();
           })
element.options.forEach(element1 => {

 setTimeout(() => {
   $("#planselectionvalue"+"-"+ element1.id+"-"+element1.planOptionsId).prop("checked", true);
  this.confirmoptionsselection()
 },10)


});

         } else {
           // $("#plancheck" + element.id).click();
           element.products.forEach((products,index) => {
             $("#plancheck" + products.id).click();
           })




           // $("#plancheck" + element.id).prop("checked", true);
         }

       }, 100);


     });


   }
    this.selectedTab = tabName;

    if (tabName == 'tab1') {
      const elements = this.elementRef.nativeElement.getElementsByClassName('imgdisplay1');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
        // elements[i].style.display = 'inline';
      }
      const elements1 = this.elementRef.nativeElement.getElementsByClassName('imgdisplay2');
      for (let i = 0; i < elements1.length; i++) {
        elements1[i].style.display = 'none';
        // elements1[i].style.display = 'inline';
      }
    }

    if (tabName == 'tab2') {
      // this.cartcheckvalue=false;
      const elements = this.elementRef.nativeElement.getElementsByClassName('imgdisplay2');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
        // elements[i].style.display = 'inline';
      }
      sessionStorage.removeItem('studentsPlansArray');
      this.planAmount=0;
      sessionStorage.removeItem('totalAmount');

      sessionStorage.setItem('totalAmount', this.planAmount);
      setTimeout(() => {
        let selectedstudentPlans = JSON.parse(sessionStorage.getItem("allproducts") ?? "[]");
        // selectedstudentPlans.forEach((element: any) => {
        //   document.getElementById("plancheck" + element.id)?.click();
        //   // $('#plancheck'+element.id).click();
        // });
        sessionStorage.setItem('allproducts', '');
      }, 100)

    }

  }

  termAndConditionsLoading(event: any) {
    this.pdfvisibletermsandcodionsmodel = false;
  }
  AdviserDisclosureloading(event: any) {
    this.pdfvisibleadvisouredisclosure = false;
  }

  padAgrementLoading(event: any) {
    this.padAgrementLoad = false;
  }

  padAgrementWithOutSignLoading(evenr: any) {
    this.withSignLoad = false;
  }
  get userFormControl() {
    // console.log("form controls: "+this.userForm)
    return this.userForm.controls;
  }
  get childInfoControl() {
    return this.childFormGroup.controls;
  }

  public closeprovinceinfo() {
    this.userFormControl['province'].reset();
    this.userFormControl['province'].setValue('');
    //  document?.getElementById('Province')?.value='';
    const elements = this.elementRef.nativeElement.getElementsByClassName('ProvinceClass');
    for (let i = 0; i < elements.length; i++) {
      elements.value = '';
    }
  }
  public childrenPopupClose() {
    this.childFormGroup.reset();
    this.childFormGroup.get('childInfoGender')?.setValue('Select');
    // this.creditCardForm.get('enrollmentSummaryExpirymonth')?.setValue('01');
    this.childFormGroup.clearValidators();
    this.childFormGroup.updateValueAndValidity();
    // this.childFormGroup.get('childInfoGender')?.setValue('Select');
    this.graducationdaycheck = false;
  }



  pipeFunction = (
    a: KeyValue<string, [string]>,
    b: KeyValue<string, [string]>
  ): number => {
    return 0;
  };

  public autoSelectCompanyPaidPlans() {
    // alert("auto select now")
    let packagesInBlocks: any = JSON.parse(sessionStorage.getItem("planDetailsArrayBlock"));
console.log(this.companypaidproductid)

    // for(let productid of this.companypaidproductid){
    //   setTimeout(() => {
    //     $("#plancheck"+productid).click();
    //   }, 100);


    // }

    this.companypaidproductid.forEach((element,index) => {


      setTimeout(() => {
        const dom: HTMLElement = this.elementRef.nativeElement;
        const plan: any = dom.querySelector("#plancheck" + element.id);

            $("#plancheck" + element.id).click();


      }, 100);

    });


    this.toastrService.success("Company paid plans are all selected", "");
  }
  public paymentpage(tabId: number) {

    this.paymentfirstname = this.userFormControl?.['givenname'].value;
    this.paymentfirstname = this.userFormControl?.["lastname"].value;
    this.paymentemail = this.userFormControl?.["email"].value.toLowerCase();

    // if (sessionStorage.getItem("homeAddress") == "true") {
    //   this.homeaddresscheckvalue = true;
    //   this.aptcheck = this.userForm.get("apt_suite").value;
    //   this.streetaddress = this.userForm.get("streetaddress").value;
    //   this.streetaddress2 = this.userForm.get("streetaddressline2").value;
    //   this.city = this.userForm.get("city").value;
    //   this.province = this.userForm.get("province").value;
    //   this.postalcode = this.userForm.get("postalcode").value;

    //   this.paymentForm.get("aptcheck").disable();
    //   this.paymentForm.get("streetaddress").disable();
    //   this.paymentForm.get("streetaddressline2").disable();
    //   this.paymentForm.get("city").disable();
    //   this.paymentForm.get("province").disable();
    //   this.paymentForm.get("postalcode").disable();
    // }
    // this.paymenttab = 0;

    // jQuery("html, body").scrollTop(0);


      //'

      this.selectedTab = 'tab3';


        this.homeaddresscheckvalue=false;
        this.homeaddressEnrollmentVal=false;
        this.planssummarymain = JSON.parse(sessionStorage.getItem("plansummarymain") ?? "[]") || "";
        this.planssummaryopt = JSON.parse(sessionStorage.getItem("plansummaryopt") ?? "[]");

        let healthplan = []
        let healthplanvol = []
        this.studentplanssummarymain =
          JSON.parse(sessionStorage.getItem("plansummarymain") ?? "[]").sort((a: { id: any; }, b: { id: any; }) => a.id - b.id) || "";

        const combinedArray = [];
        const groupedByParent: any = {};

        for (const obj of this.studentplanssummarymain) {

          const name = obj.name;

          const products = obj.products;
          if (!groupedByParent[name]) {
            groupedByParent[name] = [];
          }
          groupedByParent[name] = groupedByParent[name].concat(products);
        }

        for (const name in groupedByParent) {
          combinedArray.push({ name, products: groupedByParent[name] });
        }

        this.studentplanssummarymain1 = combinedArray;
        setTimeout(() => {
          this.allproducts = JSON.parse(sessionStorage.getItem("allproducts") ?? "[]");
          var total = 0;
          for (let i = 0; i < this.allproducts.length; i++) {
            total += this.allproducts[i].calculatedTax.total;
          }
          console.log(total);
          this.planAmount = this._decimalPipe?.transform(total, "1.2-2")?.replace(/,/g, "");
          sessionStorage.setItem("totalAmount", this.planAmount);
          this.cartcheckvalue = this.planAmount > 0 ? true : false;
          // alert(this.planAmount)
        }, 1000);

        this.selectedTab = 'tab3';

        setTimeout(() => {
          this.signaturePadCC = new SignaturePad(this.signaturePadCanvasEl?.nativeElement);
          this.padAggsignaturePadCC = new SignaturePad(this.padAgreementSignaturePadCanvasEl?.nativeElement);
        }, 1000);

        this.enrollmentForm.reset();
        // this.creditCardForm.reset();
        this.enrollmentForm.get('enrollmentSummaryExpirymonth')?.setValue('');
        this.enrollmentForm.get('enrollmentSummaryExpiryyear')?.setValue('');
        this.bankPayForm.reset();
        this.paymentMethodSelectCC = true;
        this.enrollmentBankDetailedVerify = false;
        this.bankDetailsNames = "";
        const elements = this.elementRef.nativeElement.getElementsByClassName('imgdisplay2');
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.display = 'block';
          elements[i].style.display = 'inline';
        }
        sessionStorage.setItem("paymentMethod","CC");
        console.log("***********tab3: " + this.studentplanssummarymain1);

      return  false
  let endPoint=`/api/ap/customer/validatePlans`;
  let url=`${environment.apiUrl}${endPoint}`;
  var accessToken = sessionStorage.getItem('accessToken');

  let data={"plans":JSON.parse(sessionStorage.getItem("plansummarymain"))}
  this.http.post(url,data,{
    headers: {
    Authorization: 'Bearer ' + accessToken,
    'Content-Type': 'application/json',
  },}).subscribe((Response:any)=>{
    if(Response.status=='200'){
      this.homeaddresscheckvalue=false;
      this.homeaddressEnrollmentVal=false;
      this.planssummarymain = JSON.parse(sessionStorage.getItem("plansummarymain") ?? "[]") || "";
      this.planssummaryopt = JSON.parse(sessionStorage.getItem("plansummaryopt") ?? "[]");

      let healthplan = []
      let healthplanvol = []
      this.studentplanssummarymain =
        JSON.parse(sessionStorage.getItem("plansummarymain") ?? "[]").sort((a: { id: any; }, b: { id: any; }) => a.id - b.id) || "";

      const combinedArray = [];
      const groupedByParent: any = {};

      for (const obj of this.studentplanssummarymain) {

        const name = obj.name;

        const products = obj.products;
        if (!groupedByParent[name]) {
          groupedByParent[name] = [];
        }
        groupedByParent[name] = groupedByParent[name].concat(products);
      }

      for (const name in groupedByParent) {
        combinedArray.push({ name, products: groupedByParent[name] });
      }

      this.studentplanssummarymain1 = combinedArray;
      setTimeout(() => {
        this.allproducts = JSON.parse(sessionStorage.getItem("allproducts") ?? "[]");
        var total = 0;
        for (let i = 0; i < this.allproducts.length; i++) {
          total += this.allproducts[i].calculatedTax.total;
        }
        console.log(total);
        this.planAmount = this._decimalPipe?.transform(total, "1.2-2")?.replace(/,/g, "");
        sessionStorage.setItem("totalAmount", this.planAmount);
        this.cartcheckvalue = this.planAmount > 0 ? true : false;
        // alert(this.planAmount)
      }, 1000);

      this.selectedTab = 'tab3';

      setTimeout(() => {
        this.signaturePadCC = new SignaturePad(this.signaturePadCanvasEl?.nativeElement);
        this.padAggsignaturePadCC = new SignaturePad(this.padAgreementSignaturePadCanvasEl?.nativeElement);
      }, 1000);

      this.enrollmentForm.reset();
      // this.creditCardForm.reset();
      this.enrollmentForm.get('enrollmentSummaryExpirymonth')?.setValue('');
      this.enrollmentForm.get('enrollmentSummaryExpiryyear')?.setValue('');
      this.bankPayForm.reset();
      this.paymentMethodSelectCC = true;
      this.enrollmentBankDetailedVerify = false;
      this.bankDetailsNames = "";
      const elements = this.elementRef.nativeElement.getElementsByClassName('imgdisplay2');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'block';
        elements[i].style.display = 'inline';
      }
      sessionStorage.setItem("paymentMethod","CC");
      console.log("***********tab3: " + this.studentplanssummarymain1);
    }
    else{
      Swal.fire({title:"Error",text:Response.error||Response.data.error})
    }

  },(error)=>{
    if (error.value) {
      Swal.fire({title:'error',text:error.error})
      // this.router.navigate(["error"]);
    } else {
      Swal.fire({title:'error',text:error.error});
    }
  })


    //  $("#planSelectionInfo").css("display", "block");
    // $('#personalinfocheck').css("dispaly","none");

  }
  closeAddMemberPopup(){
    this.bankPayForm.reset();
    this.enrollmentForm.reset();
    this.userForm.reset();
    this.displayStudentId=false;
    this.displatGig=false;
    this.showBrokersList=false;
    this.forms=[];
    this.showForm=false;
  }

  public noofchildrenchanged(event: any) {
    let count = event.target.value;
    if (count < this.oldvaluenumber) {
      this.childrenDetailsArray.removeAt(count);
      this.oldvaluenumber--;
    } else {
      this.childrenDetailsArray.push(this.initChildDetails());
      this.oldvaluenumber++;
    }
  }
  closeAddChildrenPopup(){
    $('#childInfoModal').hide();
    this.childFormGroup.reset();
  }
  childInfoAddData() {
    console.log("Button name: " + this.childInfoModalAddAndUpdateButton)
    if (this.childInfoModalAddAndUpdateButton == 'Add') {
      //  this.childInfoAddDataArray=this.childFormGroup.value;
      let childObj = this.childFormGroup.value;
      console.log(">><<", childObj)
      childObj['childInfoDOB'] = moment(childObj.childInfoDOB).format("MM-DD-YYYY");
      childObj['childInfoGraduationday']=childObj.childPostGraduate? moment(childObj['childInfoGraduationday']).format("MM-DD-YYYY"):childObj.childPostGraduate;
      // this.childInfoAddDataArray.push(this.childFormGroup.value);
      console.log("?>>?", childObj);
      this.childInfoAddDataArray.push(childObj);
      this.noOfChildrenChangedValue = this.childInfoAddDataArray.length;
      this.userForm.get('noofchildren').setValue(this.noOfChildrenChangedValue);
      this.childTableRowsLength = this.childInfoAddDataArray.length;
      console.log("childInfo123: " + JSON.stringify(this.childInfoAddDataArray))
      this.graducationdaycheck = false;

    } else if (this.childInfoModalAddAndUpdateButton == 'Update') {


      let childObj=this.childFormGroup.value;
      childObj['childInfoDOB'] = moment(childObj.childInfoDOB).format("MM-DD-YYYY");
      childObj['childInfoGraduationday']=childObj.childPostGraduate? moment(childObj['childInfoGraduationday']).format("MM-DD-YYYY"):childObj.childPostGraduate;


      this.childInfoAddDataArray[this.childTableEditRowIndex] =childObj; //this.childFormGroup.value;

      this.childInfoModalAddAndUpdateButton = 'Add';
      console.log("this.childInfoAddDataArray: " + JSON.stringify(this.childInfoAddDataArray));
      this.childInfoAddDataArray['']
      this.dependentchildInsurenceval = false;
      this.graducationdaycheck = false;

      this.childFormGroup.clearValidators();
      this.closeAddChildrenPopup();

    }
    this.childFormGroup.reset();
    this.closeAddChildrenPopup();
   this.clearChildFormValidations();

  }
      clearChildFormValidations(){
        // childdisablility: [''],
        // childInfoCarrierName: [''],
        // childPostGraduate: [''],
        // childInfoGraduationday: [''],
        let controls=['childdisablility','childInfoCarrierName','childPostGraduate','childInfoGraduationday'];
        for(let control of controls){
          this.childFormGroup.get(control)?.clearValidators();
          this.childFormGroup.updateValueAndValidity();
          this.childFormGroup.get(control)?.reset();
        }
      }
      setVlidationsForChild(){

        let controls=['childInfoFirstName','childInfoLastName','childInfoGender','childInfoDOB',
      'DependentchildInsurence'];
      this.childFormGroup.get('childInfoFirstName').setValidators([Validators.required]);
      this.childFormGroup.get('childInfoLastName').setValidators([Validators.required]);
      this.childFormGroup.get('childInfoGender').setValidators([Validators.required]);
      this.childFormGroup.get('childInfoDOB').setValidators([Validators.required]);
      this.childFormGroup.get('DependentchildInsurence').setValidators([Validators.required]);

      for (const name of Object.keys(this.childFormGroup.controls)) {
        this.childFormGroup.get(name).updateValueAndValidity();
      }
        this.childFormGroup = this.childInfoFormBuilder.group({
          childInfoFirstName: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
          childInfoLastName: ['', Validators.compose([Validators.required,Validators.minLength(1)])],
          childInfoGender: ["",[Validators.required]],
          childInfoDOB: ['', [Validators.required]],
          childdisablility: [''],
          childInfoCarrierName: [''],
          childPostGraduate: [''],
          childInfoGraduationday: [''],
          DependentchildInsurence: ['',Validators.required]
        })
      }

  childInforTableEdit(index: any) {

    this.setVlidationsForChild();

    this.childInfoModalAddAndUpdateButton = "Update";
    this.childTableEditRowIndex = index;
    let dataObject = this.childInfoAddDataArray[index];
    if (dataObject.childInfoGraduationday != '' && dataObject.childPostGraduate) {
      this.graducationdaycheck = true;
    } else {
      this.graducationdaycheck = false;
    }
    if (dataObject.childInfoCarrierName != '' && dataObject.DependentchildInsurence == 'true') {
      this.dependentchildInsurenceval = true;

    } else {
      this.dependentchildInsurenceval = false;;
    }

    console.log("Child data: " + dataObject + " index: " + index)
    console.log("Child data123: " + JSON.stringify(dataObject))
    // this.childInfoControl['childInfoFirstName.=dataObject.childInfoFirstName;
    // const model=new Modal(this.childInfoModal.nativeElement);
    // model.show();

    $('#childInfoModal').show();
    this.childFormGroup.patchValue(dataObject);
  }

  deleteChildrenSwal(index: any) {
    Swal.fire({
      title: "Info",
      text: "Are you sure you want to delete?",
      showCancelButton: true,
      confirmButtonColor: "#10104d",
      cancelButtonColor: "#10104d",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.childInforTableDelete(index);
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",

        // });
      }
    });

  }

  childInforTableDelete(index: any) {

    if(this.childInfoAddDataArray.length==1)
      document.getElementById('Dependentchildrenno')?.click();

    this.childInfoAddDataArray.splice(index, 1);
    this.noOfChildrenChangedValue = this.childInfoAddDataArray.length;
    this.userForm.get('noofchildren').setValue(this.noOfChildrenChangedValue);
    this.childTableRowsLength = this.childInfoAddDataArray.length;
    // if(this.childTableRowsLength==0){
    //   this.childTableRowsLength=1;
    // }


    console.log("table length: " + this.childTableRowsLength)
  }
  public provinceEnrollmentlist(event: any) {
      if (event.target.value == "QC") {
        $('#QCproviance').show();

    }
    this.configprovinceres.forEach((element: any) => {
      if (element.shortName == event.target.value) {
        this.provincialHealthcareUrl = element.provincialHealthcareUrl;
        this.provincialZipcodes = element.zipcodes.split(",");
        this.provincelistid = element.id;
        this.state_id = parseInt(element.fusebillId);
        this.statename = element.name;
      }
    });

    // //console.log(this.userForm.get('postalcode').value)
    if (this.enrollmentForm.get("enrollmentSummaryPostalCode")?.value) {
      if (
        this.provincialZipcodes.indexOf(
          this.enrollmentForm.get("enrollmentSummaryPostalCode")?.value[0]
        ) == -1
      ) {
        this.invalidenrollmentpostalcodeprovince = true;
        this.enrollmentForm.get("enrollmentSummaryPostalCode")?.markAsTouched();
      } else {
        this.invalidenrollmentpostalcodeprovince = false;
      }

      if (this.enrollmentForm.get("enrollmentSummaryPostalCode")?.value.length == 0) {
        this.invalidenrollmentpostalcodeprovince = false;
      }
    }
    // alert(this.postalvalue)
  }



  //enrolment

  // this.paymentMethodSelectCC = true;
  // homeaddressEnrollmentVal: boolean = false;
  paymentMethodSelect(event: any) {
    if (event == 'Credit_Card') {
      this.fusebill_paymentMethod='CC';
      sessionStorage.setItem("paymentMethod", "CC");
      this.paymentMethodSelectCC = true;
      this.enrollmentBankDetailedVerify = false;
      // this.voidCheckUploaded=false;

      this.bankPayForm.reset();
      this.enrollmentForm.get('enrollmentSummaryBankNumber')?.reset();
      this.enrollmentForm.get('enrollmentSummaryBankNumber')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryBankNumber')?.updateValueAndValidity();

      this.enrollmentForm.get('enrollmentSummaryTransitNumber')?.reset();
      this.enrollmentForm.get('enrollmentSummaryTransitNumber')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryTransitNumber')?.updateValueAndValidity();

      this.enrollmentForm.get('enrollmentSummaryAccontNumber')?.reset();
      this.enrollmentForm.get('enrollmentSummaryAccontNumber')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryAccontNumber')?.updateValueAndValidity();

      this.enrollmentForm.get('enrollmentBankTextdescription')?.reset();
      this.enrollmentForm.get('enrollmentBankTextdescription')?.clearValidators();
      this.enrollmentForm.get('enrollmentBankTextdescription')?.updateValueAndValidity();

      // this.signaturePad= new SignaturePad(this.signaturePadCanvas?.nativeElement);
      // this.ngAfterViewInit();
      // this.creditCard();
      const elements = this.elementRef.nativeElement.getElementsByClassName('paymentMethodSelectCC');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'block';
      }
    } else {
      // this.creditCardForm.reset();
      this.fusebill_paymentMethod='PAD';
      this.enrollmentForm.get('enrollmentSummaryCardHolderFirstName')?.reset();
      this.enrollmentForm.get('enrollmentSummaryCardHolderLastName')?.reset();
      this.enrollmentForm.get('enrollmentSummaryCardNumnber')?.reset();
      this.enrollmentForm.get('enrollmentSummaryCVV')?.reset();
      this.enrollmentForm.get('enrollmentSummaryExpiryyear')?.reset();
      this.enrollmentForm.get('enrollmentSummaryExpirymonth')?.reset();


      this.enrollmentForm.get('enrollmentSummaryExpirymonth')?.setValue('');
      this.enrollmentForm.get('enrollmentSummaryExpiryyear')?.setValue('');
      this.paymentMethodSelectCC = false;
      this.bankDetailsNames = "";
      sessionStorage.setItem("paymentMethod", "PAD");
      const elements = this.elementRef.nativeElement.getElementsByClassName('paymentMethodSelectCC');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
      }
      this.clearSignature();
    }
    this.signaturemessagecc = false;
  }

  homeaddressEnrollment(event: any) {
    console.log(" event.target.value: " + event.target.checked)
    this.homeaddressEnrollmentVal = event.target.checked;
    if (this.homeaddressEnrollmentVal) {
      console.log('The homeaddressEnrollmentVal is checked.');

      this.enrollmentForm.get('enrollmentSummaryPostalCode')?.reset();
      this.enrollmentForm.get('enrollmentSummaryPostalCode')?.clearValidators();

      this.enrollmentForm.get('enrollmentSummaryApartSuite')?.reset();
      this.enrollmentForm.get('enrollmentSummaryApartSuite')?.clearValidators();

      this.enrollmentForm.get('enrollmentSummaryProvince')?.reset();
      this.enrollmentForm.get('enrollmentSummaryProvince')?.clearValidators();

      this.enrollmentForm.get('enrollmentSummaryCity')?.reset();
      this.enrollmentForm.get('enrollmentSummaryCity')?.clearValidators();

      this.enrollmentForm.get('enrollmentSummaryStreetAddressLane2')?.reset();
      this.enrollmentForm.get('enrollmentSummaryStreetAddressLane2')?.clearValidators();

      this.enrollmentForm.get('enrollmentSummaryStreetAddress')?.reset();
      this.enrollmentForm.get('enrollmentSummaryStreetAddress')?.clearValidators();

      this.enrollmentForm.updateValueAndValidity();
    } else {
      console.log('The homeaddressEnrollmentVal is not checked.');
      this.enrollmentForm.get('enrollmentSummaryApartSuite')?.setValidators( Validators.compose([apt_suitecheck, Validators.maxLength(50)]));
      this.enrollmentForm.get('enrollmentSummaryStreetAddress')?.setValidators(Validators.compose([Validators.required,Validators.maxLength(50)]));
      this.enrollmentForm.get('enrollmentSummaryCity')?.setValidators(Validators.compose([Validators.required,Validators.maxLength(50)]));
      this.enrollmentForm.get('enrollmentSummaryProvince')?.setValidators(Validators.compose([Validators.required,]));
      this.enrollmentForm.get('enrollmentSummaryPostalCode')?.setValidators(Validators.compose([Validators.required,Validators.maxLength(50)]));

      // this.enrollmentForm.get('recaptchaReactive')?.setValidators(Validators.compose([Validators.required]));
      this.enrollmentForm.updateValueAndValidity();
    }
    this.enrollmentForm.reset();
  }


  bankDetailsVerify() {
    return false
    console.log('bankDetailsVerify')
    let inputData = {
      bankCode: this.bankPayForm.get('enrollmentSummaryBankNumber')?.value,
      branchCode: this.bankPayForm.get('enrollmentSummaryTransitNumber')?.value
    };
    // let getbanknamesvalues: string = `${environment.app.grp}api/students/bank/verify`;

    let getbanknamesvalues: string = "";
// this.studentService.getbanknames(inputData)
      this.http.post(getbanknamesvalues,inputData,{})
   .subscribe(
      (result: any) => {
        console.log("bank details verify: " + result);
        if (result.status == '200') {
          this.bankDetailsVerifyStatus = false;
          this.bankDetailsError = '';
          //data saved into this bankverifyDetails variable
          this.bankverifyDetails = result.data;
          this.bankDetailsNames = result.data.bank.name + "\n" + result.data.address.split(',').join("\n");
          console.log("this.bankDetailsNames: " + this.bankDetailsNames)
          this.enrollmentBankDetailedVerify = true;
        } else {
          this.bankDetailsClear();
          this.bankDetailsVerifyStatus = true;
          this.bankDetailsError = result.message;


        }

      },
      (error) => {
        console.log("bank details getting error: " + JSON.stringify(error))
      });

  }

  clearSignature() {

    // this.signaturePad.clear();
    if (this.signaturePadCC) {
      this.signaturePadCC.clear();
    }
    this.signaturePadClear = false;

    this.signaturemessagecc = true;
  }

  get enrollmentFormControl() {
    // console.log("this.enrollmentForm.controls: "+JSON.stringify(this.enrollmentForm))
    return this.enrollmentForm.controls;
  }
  bankDetailsClear() {
    this.enrollmentBankDetailedVerify = false;
    this.bankDetailsNames = "";
    this.bankPayForm.get('enrollmentSummaryBankNumber')?.reset();
    this.bankPayForm.get('enrollmentSummaryTransitNumber')?.reset();
    this.bankPayForm.get('enrollmentSummaryAccontNumber')?.reset();
    this.bankPayForm.get('enrollmentBankTextarea')?.reset();
    this.bankPayForm.get('enrollmentSummaryvoidCheckUpload')?.reset();
    this.bankDetailsError = "";

  }

  memberTypeChange(event:any){

    console.log('enter to function');
    if(event.target.value.toLowerCase()=='student'){
      this.showBrokersList=true;
      this.displayStudentId=true;
      this.displatGig=false;
      this.showForm=false;
      this.getBrokerDetails(event.target.value);
      this.userForm.get('provincialhealth')?.setValidators(Validators.required);
      this.userForm.get('uhipprovincialhealth').setValidators(Validators.required);
      this.userForm.get('provincialhealth').setValidators(Validators.required);
      this.userForm.get('parentalinsurance').setValidators(Validators.required);
      this.userForm.get('studentId').setValidators(Validators.required);
      this.userForm.get('workinghours').clearValidators();
      this.userForm.get('hoursperweek').clearValidators();

      this.userForm.get('workinghours').updateValueAndValidity();
      this.userForm.get('hoursperweek').updateValueAndValidity();
      this.userForm.updateValueAndValidity();
      this.studentPlaceHolder=this.lang.student_fn;
      this.studentPlaceHolderln=this.lang.student_ln;

    }
    else if(event.target.value=='GIG'){
      this.studentPlaceHolder=this.lang.name_as_shown_on_provincial_health_card;
      this.studentPlaceHolderln=this.lang.name_as_shown_on_provincial_health_card;
      this.showBrokersList=true;
      this.displatGig=true;
      this.displayStudentId=false;
      this.showForm=false;
      this.getBrokerDetails(event.target.value);
      this.userForm.get('provincialhealth')?.clearValidators();
      this.userForm.get('uhipprovincialhealth').clearValidators();
      this.userForm.get('parentalinsurance').clearValidators();
      this.userForm.get('foreignStudent').clearValidators();
      this.userForm.get('studentId').clearValidators();

      this.userForm.get('foreignStudent')?.updateValueAndValidity();
      this.userForm.get('studentId')?.updateValueAndValidity();
      this.userForm.get('uhipprovincialhealth')?.updateValueAndValidity();
      this.userForm.get('parentalinsurance')?.updateValueAndValidity();

      this.userForm.get('workinghours').setValidators(Validators.required);
      this.userForm.get('hoursperweek').setValidators([Validators.required, validatehoursperweek]);
      this.userForm.get('hoursperweek').setValue('40');
      this.userForm.get('hoursperweek').updateValueAndValidity();
    }
    else{
      this.displayStudentId=false;
      this.displatGig=false;
      this.showBrokersList=false;
      this.forms=[];
      this.showForm=false;
      this.userForm.get('workinghours').clearValidators();
      this.userForm.get('hoursperweek').clearValidators();
    }
  }
  provincialhealth(e:any){
     if(e.target.value=="false"){
    this.checkhealthcardstatus=true;
    $('#checkuhipstatusModal').modal('show');
    console.log('false no');
     }else{
      this.checkhealthcardstatus=false;
     }
  }
  over(){

  }
  getBrokerDetails(memnerType:any){
    //'
//http://localhost:3002/api/ap/customers/broker/list?type=GIG'
let endPoint=`/api/ap/customers/broker/list?type=${memnerType.toUpperCase()}`;
let url=`${environment.apiUrl}${endPoint}`;
var accessToken = sessionStorage.getItem('accessToken');
this.http.get(url,{ headers: {
  Authorization: 'Bearer ' + accessToken,
  'Content-Type': 'application/json',
},}).subscribe((Response:any)=>{
  if(Response.status=='200'){
    console.log(JSON.stringify(Response));
    this.brokers=Response.data.allBrokers;
    console.log('broker details',JSON.stringify(this.brokers));
  }
  else{
          //  Swal.fire({title:'Info',Text:Response.message})
          Swal.fire({
            title: 'Info',
            text: Response.message ? Response.message : Response.error,
          })
  }

},(error)=>{
  if (error.value) {
    Swal.fire({title:'error',text:error.error})
    // this.router.navigate(["error"]);
  } else {
    Swal.fire({title:'error',text:error.error});
  }
})
  }
  public hoursperweekvalue(event) {
    let value = event.target.value;

    // hoursperweekfun1(value)
  }

  public workinghours(value) {
    if (value == "true") {
      this.hoursperweek = false;
       this.hourperweekvalue = true;
       this.userForm.get('hoursperweek').setValue('40');
    } else {
      this.hoursperweek = true;
      this.hourperweekvalue = false;
    }
  }





    //https://testadminapi.groupbenefitz.aitestpro.com/api/ap/11111111111/details
   // https://testapi.groupbenefitz.aitestpro.com/api/ap/12531466/details
  checkFusBillId() {
    console.log('enter to checkFusBillId');
    let fusbillId=this.userForm.get('fusbillId').value;
    let formLink = environment.apiUrl;
    var accessToken = sessionStorage.getItem('accessToken');
    let Url: string = `${environment.apiUrl}/api/ap/${fusbillId}/details`;
      let lang = "en";
      this.http.get(Url, {headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      }}) .subscribe(
          (responce: any) => {
            // this.isLoaded =true
//             hideOnOverlayClick: false,
// hideOnContentClick: false,
// closeClick: false,
            if(responce.status == "200"){
              console.log(JSON.stringify(responce));
              Swal.fire({
                title: "Info",
                text: "Are you sure you want to load the existing details?",
                showCancelButton: true,
                cancelButtonText:'No',
                confirmButtonText: "Yes",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.patchUserDetails(responce.data)
                }
                else{

                }
              });
            }
            else {
              // if(responce.status!='201'){
                Swal.fire({
                  title: 'Info',
                  // icon: 'warning',
                  html: `<div class="custom-content">${responce.message ? responce.message : responce.error}</div>`,
                  confirmButtonText: "OK",

                })
              // }

            }
          },
          (error) => {
            if (error.value) {
              this.router.navigate(["error"]);
            } else {
            }
          }
        );


  }

  patchUserDetails(data:any){
   this.firstName=data.customerData.firstName;
   this.lastName=data.customerData.lastName;
   this.primaryEmail=data.customerData.primaryEmail;

   this.primaryPhone=data.customerData?.primaryPhone;
   this.country=data.customerAddress?.billingAddress?.country;
   this.line1=data.customerAddress?.billingAddress?.line1;
   this.line2=data.customerAddress?.billingAddress?.line2;
   this.city=data.customerAddress?.billingAddress?.city;
  //  this.state=data.customerAddress.billingAddress.state;
   this.postalZip=data.customerAddress?.billingAddress?.postalZip;
   this.postalZip=data.customerAddress?.billingAddress?.postalZip;
   this.configprovinceres.filter((proviance)=>{
    if(proviance.name.toLowerCase()==data.customerAddress?.billingAddress?.state.toLowerCase()){
      this.state=proviance.shortName;
    }
   });
   console.log(this.state);

   this.userForm.markAsTouched();

  }

  getForms(id:any){
    this.showForm=true;
   this.forms= this.brokers.filter((broker)=>{
      if(broker.id==id){
        return broker;
      }
    });
    console.log('forms',this.forms)
  }



  public onCheckboxChange(
    e,
    allow_multiple,
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

    let multiple = allow_multiple ? Boolean(allow_multiple.data[0]) : false;

    if (disallowedPlanLevels != null) {
      let disallowed_plans = disallowedPlanLevels.split(",");
      const dom1: HTMLElement = this.elementRef.nativeElement;
      const disallowed_elements = dom1.querySelectorAll(".plansscreen input[type='checkbox']");

      // disallowed_elements.forEach((elem: any) => {

      for (let i = 0; i < disallowed_elements.length; i++) {
        let elem: any = disallowed_elements[i];
        // elementcv.checked=false

        let plandetails = elem.attributes.data.value;

        let plandetailsobj = plandetails.split("##");

        //console.log("main", plandetailsobj);

        if (e.target.checked) {
          if (!elem.disabled) {
            if (plandetailsobj[12] == null || plandetailsobj[12] == "") {
              if (disallowed_plans.indexOf(plandetailsobj[13]) >= 0) {
                //  elem.checked=false
                elem.disabled = true;

                this.disabledelement = "Already included in GroupBenefitz All-In";
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[12]) >= 0) {
                //  elem.checked=false
                elem.disabled = true;
                this.disabledelement = "Already included in GroupBenefitz All-In";
              }
            }
          }
          if (elem.checked) {
            ////console.log(disallowed_plans)
            ////console.log(plandetailsobj)

            if (plandetailsobj[12] == null || plandetailsobj[12] == "") {
              if (disallowed_plans.indexOf(plandetailsobj[13]) >= 0) {
                elem.checked = false;
                this.unselectplan(elem,options,plan,product,pckage,group);
              }
            } else {
              ////console.log(disallowed_plans)
              ////console.log(plandetailsobj)
              if (disallowed_plans.indexOf(plandetailsobj[12]) >= 0) {
                elem.checked = false;
                this.unselectplan(elem,options,plan,product,pckage,group);
                // elem.disabled =true
              }
            }
          }
        } else {
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
      }
    }

    // //////console.log(e)
    let classname = e.target.className;
    classname = classname.split(" ").join(".");

    // //////console.log(classname)
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll("." + classname);

    // //////console.log(elements);

    let element: any;
    let elementcv: any;

    if (!multiple) {
      if (e.target.checked) {
        for (let i = 0; i < elements.length; i++) {
          let elem = elements[i];
          element = elem;

          if (element.checked) {
            this.unselectplan(elem,options,plan,product,pckage,group);
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
      if (e.target.checked) {
        this.selectplan(e.target, options,plan,product,pckage,group);
      } else {
        this.unselectplan(e.target,options,plan,product,pckage,group);
      }
    }, 10);
  }

  public onCheckboxChangemodified(
    e,
    allow_multiple,
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
    let multiple = allow_multiple ? Boolean(allow_multiple.data[0]) : false;

    if (disallowedPlanLevels != null) {
      let disallowed_plans = disallowedPlanLevels.split(",");
      const dom1: HTMLElement = this.elementRef.nativeElement;
      const disallowed_elements = dom1.querySelectorAll(".plansscreen input[type='checkbox']");

      // disallowed_elements.forEach((elem: any) => {

      for (let i = 0; i < disallowed_elements.length; i++) {
        let elem: any = disallowed_elements[i];
        // elementcv.checked=false

        let plandetails = elem.attributes.data.value;

        let plandetailsobj = plandetails.split("##");

        //console.log("main", plandetailsobj);

        if (e.target.checked) {
          if (!elem.disabled) {
            if (plandetailsobj[12] == null || plandetailsobj[12] == "") {
              if (disallowed_plans.indexOf(plandetailsobj[13]) >= 0) {
                //  elem.checked=false
                elem.disabled = true;

                this.disabledelement = "Already included in GroupBenefitz All-In";
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[12]) >= 0) {
                //  elem.checked=false
                elem.disabled = true;
                this.disabledelement = "Already included in GroupBenefitz All-In";
              }
            }
          }
          if (elem.checked) {
            ////console.log(disallowed_plans)
            ////console.log(plandetailsobj)

            if (plandetailsobj[12] == null || plandetailsobj[12] == "") {
              if (disallowed_plans.indexOf(plandetailsobj[13]) >= 0) {
                elem.checked = false;
                this.unselectplan(elem,options,plan,product,pckage,group);
              }
            } else {
              ////console.log(disallowed_plans)
              ////console.log(plandetailsobj)
              if (disallowed_plans.indexOf(plandetailsobj[12]) >= 0) {
                elem.checked = false;
                this.unselectplan(elem,options,plan,product,pckage,group);
                // elem.disabled =true
              }
            }
          }
        } else {
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
      }
    }

    // //////console.log(e)
    let classname = e.target.className;
    classname = classname.split(" ").join(".");

    // //////console.log(classname)
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll("." + classname);

    // //////console.log(elements);

    let element: any;
    let elementcv: any;

    if (!multiple) {
      if (e.target.checked) {
        for (let i = 0; i < elements.length; i++) {
          let elem = elements[i];
          element = elem;

          if (element.checked) {
            this.unselectplan(elem,options,plan,product,pckage,group);
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
      if (e.target.checked) {
        this.selectplan(e.target, options,plan,product,pckage,group);
      } else {
        this.unselectplan(e.target,options,plan,product,pckage,group);
      }
    }, 10);
  }

  public allowmultipleplans() {}

  public disallowedPlans() {}
  public selectplan(elementcv:any,options:any,plan:any,product:any,pckage:any,group:any){

    console.log(options)
    // ////console.log(elementcv)
    //console.log(plan)
    //console.log(product)
    //console.log(pckage)
    //console.log(group)


    // if(group.categorization.coveredByCompany==1 || group.categorization.paidByEmployee==1){
    //   pckage.groups.forEach(element => {

    //         if(element.categorization.paidByCompany==1){
    //           element.plans.forEach(plan => {
    //             Object.keys(plan.productAddonss).forEach(key=>{
    //               plan.productAddonss[key].forEach(product => {
    //                 this.removedisabledcompanypaidproductid.push({"id":product.id})


    //               });
    //             })
    //           });
    //         }


    //   });

    // }
    // else{

    // }
    // this.removedisabledcompanypaidproductid.forEach((element,index) => {


    //   setTimeout(() => {
    //     const dom: HTMLElement = this.elementRef.nativeElement;
    //     const plan: any = dom.querySelector("#plancheck" + element.id);

    //         plan.disabled=false


    //   }, 100);

    // });
    let plandetails = elementcv.attributes.data.value;

    let plandetailsobj = plandetails.split("##");
    if (options && options.length > 0) {

    let obj = {
        isBundle:plan.isBundle,
        // enrollmentDate:this.datePipe.transform(
        //   this.userForm.value.planenrollmentdate,
        //   'yyyy-MM-dd'
        // ),
        enrollmentDate:sessionStorage.getItem('enrollmentdate'),
        // "name":plandetailsobj[1]+"-"+plandetailsobj[2],
        name: plandetailsobj[14],
        details: plandetailsobj[0],
        packagename: plandetailsobj[0],
        groupName: plandetailsobj[1],
        // amount: parseFloat(plandetailsobj[3]),
        amount: parseFloat(product.calculatedTax.price),
        planCoverage: plandetailsobj[2],
        // planPrice: parseFloat(plandetailsobj[3]),
        planPrice: parseFloat(product.calculatedTax.price),
        // amountUI: "$" + this._decimalPipe.transform(plandetailsobj[3], "1.2-2"),
        amountUI: "$" + parseFloat(product.calculatedTax.price),
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
        paidByCompany1: plandetailsobj[19],
        coveredByCompany1: plandetailsobj[20],
        paidByEmployee1: plandetailsobj[21],
        planLevel_parentId: plandetailsobj[12],
        disallowedPlanLevels: plandetailsobj[11],
      };
      if (plandetailsobj[11] != null || plandetailsobj[11] != "null") {
        if (plandetailsobj[11].includes(plandetailsobj[12])) {
        }
      }
      let coverage = product.planCoverage

      coverage = ["SINGLE","COUPLE","FAMILY"].includes(coverage)?coverage:null
      ////console.log(obj)
      let productobj = {

        id: product.id,
     productId: product.productId,
     name: product.name,


     planProductId: product.planProductId,
     price: adjustWith2DecimalsForUI(product.price1 || product.price) ,
     tax: adjustWith2DecimalsForUI(product.calculatedTax ? product.calculatedTax.tax : 0),
     total:adjustWith2DecimalsForUI(product.calculatedTax ? product.calculatedTax.total : 0),
    //  price: parseFloat(this._decimalPipe.transform(product.price1 || product.price, "1.2-2")) ,
    //  tax: parseFloat(this._decimalPipe.transform(product.calculatedTax ? product.calculatedTax.tax : 0, "1.2-2")),
    //  total:parseFloat(this._decimalPipe.transform(product.calculatedTax ? product.calculatedTax.total : 0, "1.2-2")),
     tax_details:product.bundledTaxes && product.bundledTaxes.length > 0 ? product.bundledTaxes: product.taxesDataJSON,
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
     upgradeCalculation:plan.upgradeCalculation,
      paidByCompany:group.categorization.paidByCompany,
     coveredByCompany:group.categorization.coveredByCompany,
      paidByEmployee:group.categorization.paidByEmployee

      };


   obj1.products.push(productobj);
   this.planobjdata =obj1
      this.openplanoptions(elementcv, options,plan,product);
    }

    else {
      let obj = {
        isBundle:plan.isBundle,
        // enrollmentDate:this.datePipe.transform(
        //   this.userForm.value.planenrollmentdate,
        //   'yyyy-MM-dd'
        // ),
        enrollmentDate:sessionStorage.getItem('enrollmentdate'),

        // "name":plandetailsobj[1]+"-"+plandetailsobj[2],
        name: plandetailsobj[14],
        details: plandetailsobj[0],
        packagename: plandetailsobj[0],
        groupName: plandetailsobj[1],
        // amount: parseFloat(plandetailsobj[3]),
        amount: parseFloat(product.calculatedTax.price),
        planCoverage: plandetailsobj[2],
        // planPrice: parseFloat(plandetailsobj[3]),
        planPrice: parseFloat(product.calculatedTax.price),
        // amountUI: "$" + this._decimalPipe.transform(plandetailsobj[3], "1.2-2"),
        amountUI: "$" + parseFloat(product.calculatedTax.price),
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
        paidByCompany1: plandetailsobj[19],
        coveredByCompany1: plandetailsobj[20],
        paidByEmployee1: plandetailsobj[21],
        planLevel_parentId: plandetailsobj[12],
        disallowedPlanLevels: plandetailsobj[11],
      };
      if (plandetailsobj[11] != null || plandetailsobj[11] != "null") {
        if (plandetailsobj[11].includes(plandetailsobj[12])) {
        }
      }

      let coverage = product.planCoverage

      coverage = ["SINGLE","COUPLE","FAMILY"].includes(coverage)?coverage:null
      ////console.log(obj)
      let productobj = {

        id: product.id,
     productId: product.productId,
     name: product.name,


     planProductId: product.planProductId,
    //  price: product.price1 || product.price,
    //  tax: product.calculatedTax ? product.calculatedTax.tax : 0,
    //  total: product.calculatedTax ? product.calculatedTax.total : 0,

    price: adjustWith2DecimalsForUI(product.price1 || product.price) ,
    tax: adjustWith2DecimalsForUI(product.calculatedTax ? product.calculatedTax.tax : 0),
    total:adjustWith2DecimalsForUI(product.calculatedTax ? product.calculatedTax.total : 0),
    //  price: parseFloat(this._decimalPipe.transform(product.price1 || product.price, "1.2-2")) ,
    //  tax: parseFloat(this._decimalPipe.transform(product.calculatedTax ? product.calculatedTax.tax : 0, "1.2-2")),
    //  total:parseFloat(this._decimalPipe.transform(product.calculatedTax ? product.calculatedTax.total : 0, "1.2-2")),


     tax_details:

          product.bundledTaxes && product.bundledTaxes.length > 0

            ? product.bundledTaxes

            : product.taxesDataJSON,
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
     upgradeCalculation:plan.upgradeCalculation,
     paidByCompany:group.categorization.paidByCompany,
     coveredByCompany:group.categorization.coveredByCompany,
      paidByEmployee:group.categorization.paidByEmployee



      };

      //console.log(group)
   obj1.products.push(productobj);
   //console.log(obj1)

   this.addtoplansummary(obj,obj1)
    }
  }

  public unselectplan(elementcv: any,options:any,plan:any,product:any,pckage:any,group:any) {

    // this.adddisabledcompanypaidproductid =[]

    // if(group.categorization.coveredByCompany==1 || group.categorization.paidByEmployee==1){
    //   pckage.groups.forEach(element => {

    //         if(element.categorization.paidByCompany==1){
    //           element.plans.forEach(plan => {
    //             Object.keys(plan.productAddonss).forEach(key=>{
    //               plan.productAddonss[key].forEach(product => {
    //                 this.adddisabledcompanypaidproductid.push({"id":product.id})


    //               });
    //             })
    //           });
    //         }


    //   });
    //   this.adddisabledcompanypaidproductid.forEach((element,index) => {


    //     setTimeout(() => {
    //       const dom: HTMLElement = this.elementRef.nativeElement;
    //       const plan: any = dom.querySelector("#plancheck" + element.id);
    //       $("#plancheck" + element.id).click()
    //           plan.disabled=true


    //     }, 100);
    //   })

    // }
    // else{

    // }


    let plandetails = elementcv.attributes.data.value;

    let plandetailsobj = plandetails.split("##");
    let obj = {
      isBundle:plan.isBundle,
      // enrollmentDate:this.datePipe.transform(
      //   this.userForm.value.planenrollmentdate,
      //   'yyyy-MM-dd'
      // ),
      enrollmentDate:sessionStorage.getItem('enrollmentdate'),

      // "name":plandetailsobj[1]+"-"+plandetailsobj[2],
      name: plandetailsobj[14],
      details: plandetailsobj[0],
      packagename: plandetailsobj[0],
      groupName: plandetailsobj[1],
      amount: parseFloat(plandetailsobj[3].replace(/\,/g,'')),
      planCoverage: plandetailsobj[2],
      planPrice: parseFloat(plandetailsobj[3].replace(/\,/g,'')),
      amountUI: "$" + parseFloat(plandetailsobj[3].replace(/\,/g,'')),
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
      paidByCompany1: plandetailsobj[19],
      coveredByCompany1: plandetailsobj[20],
      paidByEmployee1: plandetailsobj[21],
      planLevel_parentId: plandetailsobj[12],
      disallowedPlanLevels: plandetailsobj[11],
    };
    if (plandetailsobj[11] != null || plandetailsobj[11] != "null") {
      if (plandetailsobj[11].includes(plandetailsobj[12])) {
      }
    }

    this.removeplansummary(obj);
  }

  public addtoplansummary(obj: any,obj1: any) {
    let planSummary = JSON.parse(sessionStorage.getItem("plansummary") || "[]");

    //console.log("obj1", obj1);
    //console.log("obj", obj);

    this.addtoslectplans(obj.id, planSummary.length);
    planSummary.push(obj);

    let gstprice = 0;
    let hstprice = 0;
    let pstprice = 0;
    let qstprice = 0;

    if (obj.gst > 0) {
      gstprice = obj.planPrice * obj.gst;
      obj["gstPrice"] = parseFloat(this._decimalPipe.transform(gstprice, "1.2-2"));
    } else {
      obj["gstPrice"] = 0;
    }

    if (obj.hst > 0) {
      hstprice = obj.planPrice * obj.hst;

      obj["hstPrice"] = parseFloat(this._decimalPipe.transform(hstprice, "1.2-2"));
    } else {
      obj["hstPrice"] = 0;
    }

    if (obj.pst > 0) {
      pstprice = obj.planPrice * obj.pst;
      obj["pstPrice"] = parseFloat(this._decimalPipe.transform(pstprice, "1.2-2"));
    } else {
      obj["pstPrice"] = 0;
    }

    if (obj.qst > 0) {
      qstprice = obj.planPrice * obj.qst;
      obj["qstPrice"] = parseFloat(this._decimalPipe.transform(qstprice, "1.2-2"));
    } else {
      obj["qstPrice"] = 0;
    }

    obj["taxUI"] = "";
    if (obj["gstCheck"]) {
      obj["taxUI"] += "<span>";
      if (obj["gstPrice"] == 0) {
        obj["taxUI"] += "-";
      } else {
        obj["taxUI"] += "$" + this._decimalPipe.transform(obj["gstPrice"], "1.2-2") + "&nbsp;(GST)";
      }
      obj["taxUI"] += "</span>";
    }

    if (obj["pstCheck"]) {
      obj["taxUI"] += "<span>";
      if (obj["pstPrice"] == 0) {
        obj["taxUI"] += "-";
      } else {
        obj["taxUI"] += "$" + this._decimalPipe.transform(obj["pstPrice"], "1.2-2") + "&nbsp;(PST)";
      }
      obj["taxUI"] += "</span>";
    }

    if (obj["qstCheck"]) {
      obj["taxUI"] += "<span>";
      if (obj["qstPrice"] == 0) {
        obj["taxUI"] += "-";
      } else {
        obj["taxUI"] += "$" + this._decimalPipe.transform(obj["qstPrice"], "1.2-2") + "&nbsp;(QST)";
      }
      obj["taxUI"] += "</span>";
    }

    if (obj["hstCheck"]) {
      obj["taxUI"] += "<span> ";
      if (obj["hstPrice"] == 0) {
        obj["taxUI"] += "-";
      } else {
        obj["taxUI"] += "$" + this._decimalPipe.transform(obj["hstPrice"], "1.2-2") + "&nbsp;(HST)";
      }
      obj["taxUI"] += "</span>";
    }

    if (!obj["hstCheck"] && !obj["gstCheck"] && !obj["pstCheck"] && !obj["qstCheck"]) {
      obj["taxUI"] += "<span>-";

      obj["taxUI"] += "</span>";
    }

    // ////console.log(object["taxUI"])

    // obj["tax"] = parseFloat(
    //   this._decimalPipe.transform(gstprice + hstprice + pstprice + qstprice, "1.2-2")
    // );
    obj["tax"] = parseFloat(
      this._decimalPipe.transform(obj1.products[0].calculatedTax.tax, "1.2-2")
    );


    // obj["products"] =obj1


    obj["coverage"] =obj1.coverage
    obj["planCoverage"] =obj1.planCoverage
    obj["planLevelParent"] =obj1.planLevelParent
    obj["planproductname"] =obj1.planproductname

    obj["products"] =obj1.products
    obj["upgradeCalculation"] =obj1.upgradeCalculation
    obj["paidByCompany"] =obj1.paidByCompany
    obj["coveredByCompany"] =obj1.coveredByCompany
    obj["paidByEmployee"] =obj1.paidByEmployee


    //console.log(obj.planPrice)
    //console.log(gstprice)
    //console.log(hstprice)
    //console.log(pstprice)

    //console.log(qstprice)
    // let pricecal = obj.planPrice + gstprice + hstprice + pstprice + qstprice

    let pricecal = obj1.products[0].calculatedTax.total
    obj["totalPrice"] =pricecal


    obj["totalUI"] ="$" +pricecal;

      obj["total"] =pricecal,


obj["skuTotalPrice"] = parseFloat(obj1.products.reduce((acc, calculatedTax) => { return acc + calculatedTax.total; }, 0));

let updatedSum = this.addtosum(obj.skuTotalPrice)
  this.planssummarymain = [];
      this.planssummaryopt = [];

  planSummary.forEach((element: any) => {
    if (element.packagename != "Opt-in") {
      this.planssummarymain.push(element);
    } else {

      this.planssummaryopt.push(element);
    }
  });


  this.plansskumain.push(obj1)


  sessionStorage.setItem(
    "plansskumain",
    JSON.stringify(this.plansskumain)
  );

    sessionStorage.setItem("plansummarymain", JSON.stringify(this.planssummarymain));
    sessionStorage.setItem("plansummaryopt", JSON.stringify(this.planssummaryopt));

    sessionStorage.setItem("plansummary", JSON.stringify(planSummary));


    // setTimeout(() => {
      this.planCoverafeFunction();

    // }, 3000);

    if (planSummary.length > 0) {
      this.plansnexttab = false;
    } else {
      this.plansnexttab = true;
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
        total += this.planssummarymain[i].skuTotalPrice;
      }

      //console.log(total);

      this.planAmount = parseFloat(total.toString());
      sessionStorage.setItem("totalAmount", this.planAmount);




 }, 100);
  }


  public getindexofplan(obj) {

    let plansproductarray = JSON.parse(sessionStorage.getItem("plansummary"))

    for (let i = 0; i < plansproductarray.length; i++) {


      if(obj.isBundle==false){
        if (plansproductarray[i].id == obj.id) {

             return i

           }
      }
      else{
        if (plansproductarray[i].packagename == obj.packagename) {

             return i

           }
      }



 }





  }

  toggleItem1(item: any): void {
    item.expanded = !item.expanded;
  }
  toggleItem2(item: any): void {
    item.expanded = !item.expanded;
  }
  public removeplansummary(obj: any) {

    //console.log(obj)

    let planSummary = JSON.parse(sessionStorage.getItem("plansummary"));

    //  ////console.log("Beforeremoving")
    ////console.log(planSummary)
    ////console.log("removeingobject")
    ////console.log(obj)

    // ////console.log(obj.name)



    if (planSummary) {
      ////console.log("removeinplanid"+obj.id)


      // let index = this.getslectedplans(obj.id);
      // ////console.log(index)

      // if (index > -1) {
      //   planSummary.splice(index, 1);

      // } else {
      //   return;
      // }
      let index = this.getindexofplan(obj)
        if (index > -1) {
        planSummary.splice(index, 1);

      } else {
        return;
      }


      let selectedPlans = JSON.parse(sessionStorage.getItem("selectedPlans"));
      var newselectedplans = {};
      for (var i = 0; i < planSummary.length; i++) {
        newselectedplans[planSummary[i].id] = i;
      }

      ////console.log("newselectedPlans")
      ////console.log(newselectedplans)
      sessionStorage.setItem("selectedPlans", JSON.stringify(newselectedplans));
      // this.removeslectplans(obj.id,planSummary.length)

      let gstprice = 0;
      let hstprice = 0;
      let pstprice = 0;
      let qstprice = 0;

      if (obj.gst > 0) {
        gstprice = obj.planPrice * obj.gst;
        obj["gstPrice"] = parseFloat(this._decimalPipe.transform(gstprice, "1.2-2"));
      } else {
        obj["gstPrice"] = 0;
      }

      if (obj.hst > 0) {
        hstprice = obj.planPrice * obj.hst;

        obj["hstPrice"] = parseFloat(this._decimalPipe.transform(hstprice, "1.2-2"));
      } else {
        obj["hstPrice"] = 0;
      }

      if (obj.pst > 0) {
        pstprice = obj.planPrice * obj.pst;
        obj["pstPrice"] = parseFloat(this._decimalPipe.transform(pstprice, "1.2-2"));
      } else {
        obj["pstPrice"] = 0;
      }
      if (obj.qst > 0) {
        qstprice = obj.planPrice * obj.qst;
        obj["qstPrice"] = parseFloat(this._decimalPipe.transform(qstprice, "1.2-2"));
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
            "$" + this._decimalPipe.transform(obj["gstPrice"], "1.2-2") + "&nbsp;(GST)";
        }
        obj["taxUI"] += "</span>";
      }

      if (obj["pstCheck"]) {
        obj["taxUI"] += "<span>";
        if (obj["pstPrice"] == 0) {
          obj["taxUI"] += "-";
        } else {
          obj["taxUI"] +=
            "$" + this._decimalPipe.transform(obj["pstPrice"], "1.2-2") + "&nbsp;(PST)";
        }
        obj["taxUI"] += "</span>";
      }

      if (obj["qstCheck"]) {
        obj["taxUI"] += "<span>";
        if (obj["qstPrice"] == 0) {
          obj["taxUI"] += "-";
        } else {
          obj["taxUI"] +=
            "$" + this._decimalPipe.transform(obj["qstPrice"], "1.2-2") + "&nbsp;(QST)";
        }
        obj["taxUI"] += "</span>";
      }

      if (obj["hstCheck"]) {
        obj["taxUI"] += "<span> ";
        if (obj["hstPrice"] == 0) {
          obj["taxUI"] += "-";
        } else {
          obj["taxUI"] +=
            "$" + this._decimalPipe.transform(obj["hstPrice"], "1.2-2") + "&nbsp;(HST)";
        }
        obj["taxUI"] += "</span>";
      }

      if (!obj["hstCheck"] && !obj["gstCheck"] && !obj["pstCheck"] && !obj["qstCheck"]) {
        obj["taxUI"] += "<span>-";

        obj["taxUI"] += "</span>";
      }

      // ////console.log(object["taxUI"])

      obj["tax"] = parseFloat(
        this._decimalPipe.transform(gstprice + hstprice + pstprice + qstprice, "1.2-2")
      );
      (obj["totalPrice"] = obj.planPrice + gstprice + hstprice + pstprice + qstprice),
        obj["totalUI"] ="$" + parseFloat(obj.planPrice + gstprice + hstprice + pstprice + qstprice);

      obj["total"] =
      parseFloat(obj.planPrice + gstprice + hstprice + pstprice + qstprice);

      let updatedSum = this.removetosum(obj.totalPrice);
      this.planssummarymain = [];
      this.planssummaryopt = [];

      planSummary.forEach((element: any) => {
        if (element.packagename != "Opt-in") {
          this.planssummarymain.push(element);
        } else {
          this.planssummaryopt.push(element);
        }
      });

      sessionStorage.setItem("plansummarymain", JSON.stringify(this.planssummarymain));
      sessionStorage.setItem("plansummaryopt", JSON.stringify(this.planssummaryopt));

      sessionStorage.setItem("plansummary", JSON.stringify(planSummary));
      this.planCoverafeFunction();

      if (planSummary.length > 0) {
        this.plansnexttab = false;
      } else {
        this.plansnexttab = true;
      }
      if (updatedSum > 0) {
        this.cartcheckvalue = false;
      } else {
        this.cartcheckvalue = true;
      }
    }
  }

  public addtoslectplans(planid: number, plansumamryindex: number) {
    ////console.log("beforeaddtoplans")
    ////console.log(planid)
    ////console.log(plansumamryindex)
    let selectedPlans = JSON.parse(sessionStorage.getItem("selectedPlans") || "{}");
    ////console.log(selectedPlans)
    selectedPlans[planid] = plansumamryindex;
    ////console.log("afteraddtoplans")
    ////console.log(selectedPlans)
    sessionStorage.setItem("selectedPlans", JSON.stringify(selectedPlans));
  }
  public removeslectplans(planid: number, plansumamryindex: number) {
    ////console.log("beforeremoveplans")
    let selectedPlans = JSON.parse(sessionStorage.getItem("selectedPlans"));

    ////console.log(selectedPlans)
    delete selectedPlans[planid];

    for (const planid in selectedPlans) {
      ////console.log(planid)
      ////console.log(selectedPlans[planid])

      if (selectedPlans[planid] != 0) {
        selectedPlans[planid] = selectedPlans[planid] - 1;
        if (selectedPlans[planid]) {
        }
      }
    }
    ////console.log("adjustedselectedPlans")
    ////console.log(selectedPlans)
    sessionStorage.setItem("selectedPlans", JSON.stringify(selectedPlans));
  }

  public getslectedplans(planid: number) {
    ////console.log(planid)
    let selectedPlans = JSON.parse(sessionStorage.getItem("selectedPlans") || "{}");
    ////console.log(selectedPlans)
    return selectedPlans[planid];
  }
  public addtosum(amount: number) {
    //console.log("addtosum" + amount);

    // amount = Math.round((amount + Number.EPSILON) * 100) / 100;

    let selectedPlansAmount = parseFloat(sessionStorage.getItem("totalAmount") || "0.00");

    selectedPlansAmount = selectedPlansAmount + amount;

    //console.log("selectedPlansAmount" + selectedPlansAmount);
    sessionStorage.setItem(
      "totalAmount",
      this._decimalPipe.transform(selectedPlansAmount, "1.2-2").replace(/,/g, "")
    );

    sessionStorage.setItem(
      "totalAmountUI",
      "$" + this._decimalPipe.transform(selectedPlansAmount, "1.2-2").replace(/,/g, "")
    );

    // this.planAmount = selectedPlansAmount

    this.planAmount = this._decimalPipe.transform(selectedPlansAmount, "1.2-2").replace(/,/g, "");

    //console.log("palnamopunt" + this.planAmount);
    return selectedPlansAmount;
    // //////console.log(this.planAmount )
  }

  public removetosum(amount: number) {
    let selectedPlansAmount = parseFloat(sessionStorage.getItem("totalAmount").replace(/,/g, ""));

    selectedPlansAmount = selectedPlansAmount - amount;
    sessionStorage.setItem(
      "totalAmount",
      this._decimalPipe.transform(selectedPlansAmount, "1.2-2").replace(/,/g, "")
    );
    sessionStorage.setItem(
      "totalAmountUI",
      "$" + this._decimalPipe.transform(selectedPlansAmount, "1.2-2").replace(/,/g, "")
    );

    // this.planAmount = selectedPlansAmount
    this.planAmount = this._decimalPipe.transform(selectedPlansAmount, "1.2-2").replace(/,/g, "");
    return selectedPlansAmount;
  }

  calculateBasePlanDeltasforCCplans(ccplanspackages,baseplans,compnayplans){


    let modifiedCCplanPackages =[]
    for(let i=0;i<ccplanspackages.length;i++){
      let modifiedCCPackage =ccplanspackages[i]
      //console.log(ccplanspackages[i].name)
      //console.log(ccplanspackages[i].id)
     let CCplansgroups = ccplanspackages[i].groupsCC

     modifiedCCPackage.groupsCC=[]
     for(let CCplangroup of CCplansgroups){

      let modifiedCCgroup = CCplangroup
      //console.log(CCplangroup.id)
      //console.log(CCplangroup.parentId)
      //console.log(CCplangroup.name)
      let CCplans = CCplangroup.plans


      modifiedCCgroup.plans =[]
      for(let CCplan of CCplans){

        let modifiedCCplan = CCplan
        //console.log(CCplan.id)
        //console.log(CCplan.isBundle)
        //console.log(CCplan.name)

        CCplan.planLevel_parentId = CCplangroup.parentId

        let payroll =true;
        let EmployeeChoice = 0

        if(this.CORP_PAYROLL_NOT_MANDATORY_PACKAGES.includes(CCplan.packageId)){

          if(EmployeeChoice==2){
            payroll =false;
          }

        }
        else{
          if(this.CORP_PAYROLL_NOT_MANDATORY_PLANLEVELS.includes(CCplan.planLevel)){

            if(EmployeeChoice==2){
              payroll =false;
            }
          }
        }
        if(CCplan.isBundle){
          //console.log("BundlePlan")

            //console.log(baseplans)
          var filtered_base_plans = baseplans.filter(function (plan) {

            //console.log(plan)
            //cp_plans

            //console.log(CCplan.packageId,plan.packageId)
            //console.log(CCplan.planLevel_parentId,plan.planLevel_parentId)
            //console.log(CCplan.planLevel,plan.planLevel)

            return (
              CCplan.packageId == plan.packageId &&
              CCplan.planLevel_parentId == plan.planLevel_parentId &&
              CCplan.planLevel >= plan.planLevel
            );
          });

          var filtered_compnay_plans = compnayplans.filter(function (plan) {

            //console.log(plan)
            //cp_plans

            //console.log(CCplan.packageId,plan.packageId)
            //console.log(CCplan.planLevel_parentId,plan.planLevel_parentId)
            //console.log(CCplan.planLevel,plan.planLevel)

            return (
              CCplan.packageId == plan.packageId &&
              CCplan.planLevel_parentId == plan.planLevel_parentId &&
              CCplan.planLevel >= plan.planLevel
            );
          });

          //console.log(filtered_base_plans)

          //console.log(filtered_compnay_plans)
            let selectedBasePlan;
            let selectedCompnayPlan;
            let DeltaPlan;
            let selectedBaseplanProduct
            let selectedCompanyplanProduct
          if(filtered_base_plans.length ==0){

          }else if(filtered_base_plans.length==1){
            selectedBasePlan = filtered_base_plans[0]
            selectedCompnayPlan= filtered_compnay_plans[0]

          }else{
            //console.log(filtered_base_plans.length)
          }

          if(selectedBasePlan){
            selectedBaseplanProduct = selectedBasePlan.productAddonss[selectedBasePlan.name][0]

          }else{
            selectedBasePlan={}
            selectedBaseplanProduct={}
            selectedBaseplanProduct.calculatedTax ={}
            selectedBaseplanProduct.calculatedTax.price =0
            selectedBaseplanProduct.calculatedTax.tax =0
            selectedBaseplanProduct.calculatedTax.total =0
            selectedBaseplanProduct.name="NA"
          }

          if(selectedCompnayPlan){
          selectedCompanyplanProduct = selectedCompnayPlan.productAddonss[selectedCompnayPlan.name][0]

          }else{
            selectedCompanyplanProduct={}
          selectedCompanyplanProduct.calculatedTax ={}
       selectedCompanyplanProduct.calculatedTax.planProductInfos=[]
          }

          //console.log(selectedBaseplanProduct.calculatedTax.price)
          //console.log(selectedBaseplanProduct.calculatedTax.tax)
          //console.log(selectedBaseplanProduct.calculatedTax.total)

          let selectedCCplanProduct = CCplan.productAddonss[CCplan.name][0]

          //console.log(selectedCCplanProduct.calculatedTax.price)
          //console.log(selectedCCplanProduct.calculatedTax.tax)
          //console.log(selectedCCplanProduct.calculatedTax.total)


          //console.log("Delta")
          //console.log(selectedCCplanProduct.calculatedTax.price-selectedBaseplanProduct.calculatedTax.price)
          //console.log("EmployeeTax")
          //console.log(selectedCCplanProduct.calculatedTax.planProductInfos.length>0?selectedCCplanProduct.calculatedTax.planProductInfos[0].taxRate:0)
          //console.log(selectedCCplanProduct.calculatedTax.planProductInfos.length>0?selectedCCplanProduct.calculatedTax.planProductInfos[0].taxRatePercentage:0)


          //console.log("CompanyTax")
          //console.log(selectedCompanyplanProduct.calculatedTax.planProductInfos.length>0?selectedCompanyplanProduct.calculatedTax.planProductInfos[0].taxRate:0)
          //console.log(selectedCompanyplanProduct.calculatedTax.planProductInfos.length>0?selectedCompanyplanProduct.calculatedTax.planProductInfos[0].taxRatePercentage:0)


  let upgradeText;
  let upgradepaymentText;
          if(payroll){
            upgradeText = "Employee upgraded using payroll deduction"
            upgradepaymentText="using payroll deduction"
            //console.log("One subscription to parent/corp with base(company tax)+Delta(employee tax)")
          }
          else{
            upgradeText = "Employee upgraded using Direct payment"
            upgradepaymentText="using Direct payment"


          }

        let companyTax = selectedCompanyplanProduct.calculatedTax.planProductInfos.length>0?selectedCompanyplanProduct.calculatedTax.planProductInfos[0].taxRate:0
        let companyTaxPercentage=selectedCompanyplanProduct.calculatedTax.planProductInfos.length>0?selectedCompanyplanProduct.calculatedTax.planProductInfos[0].taxRatePercentage:0
        let baseplanPrice= selectedBaseplanProduct.calculatedTax.price
        let baseplanTaxorg = selectedBaseplanProduct.calculatedTax.tax
        let baseplanTax = baseplanPrice*companyTax
        let baseplanTotalorg =selectedBaseplanProduct.calculatedTax.total
        let baseplanTotal =baseplanPrice+baseplanTax
        let employeeTax = selectedCCplanProduct.calculatedTax.planProductInfos.length>0?selectedCCplanProduct.calculatedTax.planProductInfos[0].taxRate:0
        let employeeTaxPercentage =selectedCCplanProduct.calculatedTax.planProductInfos.length>0?selectedCCplanProduct.calculatedTax.planProductInfos[0].taxRatePercentage:0




        let deltaplanPrice =selectedCCplanProduct.calculatedTax.price-selectedBaseplanProduct.calculatedTax.price
        let deltaplanTax = deltaplanPrice*(this.deltaCompanyTax?companyTax:employeeTax)
        let deltaplanTotal =deltaplanPrice+deltaplanTax



        let combinedplanPrice = baseplanPrice+deltaplanPrice
        let combinedplanbasePrice= baseplanPrice
        let combinedplanDeltaprice= deltaplanPrice
        let combinedplanTax= this._decimalPipe.transform(baseplanTax+deltaplanTax, "1.2-2")
        let combinedplanCompanyTax=baseplanTax
        let combinedplanEmployeeTax=this._decimalPipe.transform(deltaplanTax, "1.2-2")
        let combinedplanCompanyTaxPercentage= companyTaxPercentage
        let combinedplanemployeeTaxPercentage=this.deltaCompanyTax?companyTaxPercentage:employeeTaxPercentage
        let combinedplanemployeeTaxPercentageorg=employeeTaxPercentage

        let combinedplanTotal=this._decimalPipe.transform(baseplanTotal+deltaplanTotal , "1.2-2")

        let scenario=`Employee Upgrade from ${selectedBasePlan.name} to ${CCplan.name}`
        let planName =`${CCplan.name} (${upgradeText})`
        let compnayShareStatement =`${CCplan.name} Contribution`
        let employeeShareStatement =`${CCplan.name} upgrade cost`
        let planDescription =`${scenario} On a total of ${combinedplanTotal}, company share ${baseplanTotal} and Employee- pays ${upgradepaymentText} ${deltaplanTotal} `
        let planDescription2 =`${scenario} On a total of ${combinedplanTotal}, company share ${baseplanPrice}(with tax:${companyTaxPercentage}) and Employee- pays ${upgradepaymentText} ${deltaplanPrice}(with tax:${employeeTaxPercentage}) `
        let type;

        if(payroll){
          type="Split with payroll deduction"
        }else{
          type="Split with direct pay"

        }
        let basePlanDetails= {
          planId: selectedBasePlan.id, //0
          planName: selectedBasePlan.name, //NA
          planLevelId: selectedBasePlan.planLevel, //0
          amount: baseplanPrice, //0
          amountUI: `$${baseplanPrice}`, //0
          tax: baseplanTax,
          total: baseplanTotal,
          taxUI:  `$${baseplanTax}`, //companyTaxpercentage
          totalUI: `$${baseplanTotal}`,
          planLevelName: selectedBasePlan.groupName || "", //if it is Bundle
          planFrequencyID:selectedBasePlan.frqMonthly || "",
          planFusebillID:selectedBasePlan.fusebillId || "",
          products:[selectedBaseplanProduct],
          planLevel_parentId:selectedBasePlan.planLevel_parentId,
          packageName:selectedBasePlan.packageName,
          packageId:selectedBasePlan.packageId
        };
        let obj={
          companyTax,companyTaxPercentage,baseplanPrice,baseplanTaxorg,baseplanTax,baseplanTotalorg,baseplanTotal,employeeTax,employeeTaxPercentage,
          deltaplanPrice,deltaplanTax,deltaplanTotal,combinedplanPrice,combinedplanbasePrice,combinedplanDeltaprice,combinedplanTax,
          combinedplanCompanyTax,combinedplanEmployeeTax,combinedplanCompanyTaxPercentage,combinedplanemployeeTaxPercentage,combinedplanTotal,payroll,
          scenario,planName,compnayShareStatement,employeeShareStatement,planDescription,planDescription2,type,basePlanDetails,combinedplanemployeeTaxPercentageorg
        }

        //console.log(obj)

        modifiedCCplan.upgradeCalculation = obj
        }
        else{
          //console.log("Not a BundlePlan")

          //console.log(baseplans)
          var filtered_base_plans = baseplans.filter(function (plan) {

            //console.log(plan)
            //cp_plans

            //console.log(CCplan.packageId,plan.packageId)
            //console.log(CCplan.planLevel_parentId,plan.planLevel_parentId)
            //console.log(CCplan.planLevel,plan.planLevel)

            return (
              CCplan.packageId == plan.packageId &&
              CCplan.planLevel_parentId == plan.planLevel_parentId &&
              CCplan.planLevel >= plan.planLevel
            );
          });

          var filtered_compnay_plans = compnayplans.filter(function (plan) {

            //console.log(plan)
            //cp_plans

            //console.log(CCplan.packageId,plan.packageId)
            //console.log(CCplan.planLevel_parentId,plan.planLevel_parentId)
            //console.log(CCplan.planLevel,plan.planLevel)

            return (
              CCplan.packageId == plan.packageId &&
              CCplan.planLevel_parentId == plan.planLevel_parentId &&
              CCplan.planLevel >= plan.planLevel
            );
          });

          //console.log(filtered_base_plans)

          //console.log(filtered_compnay_plans)
            let selectedBasePlan;
            let selectedCompnayPlan;
            let DeltaPlan;
          if(filtered_base_plans.length ==0){

          }else if(filtered_base_plans.length==1){
            selectedBasePlan = filtered_base_plans[0]
            selectedCompnayPlan= filtered_compnay_plans[0]

          }else{
            //console.log(filtered_base_plans.length)
          }

        let selectedbaseplanproduct
        let selectedBaseplanProduct

        if(selectedBasePlan){
        for(let planname in selectedBasePlan.productAddonss){

          //console.log(planname)
          //console.log(selectedBasePlan.productAddonss[planname])
          let products =  selectedBasePlan.productAddonss[planname]

          if(products.length ==0){

          }else if(products.length==1){
            selectedbaseplanproduct = products[0]
            // selectedCompnayPlan= filtered_compnay_plans[0]

          }else{
            //console.log(products.length)
          }
        }
        //console.log(selectedbaseplanproduct)
        selectedBaseplanProduct = selectedbaseplanproduct

        //console.log(selectedBaseplanProduct.calculatedTax.price)
        //console.log(selectedBaseplanProduct.calculatedTax.tax)
        //console.log(selectedBaseplanProduct.calculatedTax.total)
      }
      else{
        selectedBasePlan={}
        selectedBaseplanProduct={}
        selectedBaseplanProduct.calculatedTax ={}
        selectedBaseplanProduct.calculatedTax.price =0
        selectedBaseplanProduct.calculatedTax.tax =0
        selectedBaseplanProduct.calculatedTax.total =0
        selectedBaseplanProduct.name="NA"
      }





        let CCplanProduct;

          for(let planname in CCplan.productAddonss){


            let products =  CCplan.productAddonss[planname]

            if(products.length ==0){

            }else if(products.length==1){
              CCplanProduct = products[0]
              // selectedCompnayPlan= filtered_compnay_plans[0]

            }else{
              //console.log(products.length)
            }
          }
          let selectedCCplanProduct = CCplanProduct


          // //console.log(selectedCCplanProduct.calculatedTax.price)
          // //console.log(selectedCCplanProduct.calculatedTax.tax)
          // //console.log(selectedCCplanProduct.calculatedTax.total)


          // //console.log("Delta")
          // //console.log(selectedCCplanProduct.calculatedTax.price-selectedBaseplanProduct.calculatedTax.price)
          // //console.log("EmployeeTax")
          // //console.log(selectedCCplanProduct.calculatedTax.planProductInfos.length>0?selectedCCplanProduct.calculatedTax.planProductInfos[0].taxRate:0)
          // //console.log(selectedCCplanProduct.calculatedTax.planProductInfos.length>0?selectedCCplanProduct.calculatedTax.planProductInfos[0].taxRatePercentage:0)

          let selectedcompanyplanproduct
          let selectedCompanyplanProduct

          if(selectedCompnayPlan){
          for(let planname in selectedCompnayPlan.productAddonss){

            //console.log(planname)
            //console.log(selectedCompnayPlan.productAddonss[planname])
            let products =  selectedCompnayPlan.productAddonss[planname]

            if(products.length ==0){

            }else if(products.length==1){
              selectedcompanyplanproduct = products[0]
              // selectedCompnayPlan= filtered_compnay_plans[0]

            }else{
              //console.log(products.length)
            }
          }
          selectedCompanyplanProduct = selectedcompanyplanproduct

          //console.log("CompanyTax")
          //console.log(selectedCompanyplanProduct.calculatedTax.planProductInfos.length>0?selectedCompanyplanProduct.calculatedTax.planProductInfos[0].taxRate:0)
          //console.log(selectedCompanyplanProduct.calculatedTax.planProductInfos.length>0?selectedCompanyplanProduct.calculatedTax.planProductInfos[0].taxRatePercentage:0)

        }
        else{
          selectedCompanyplanProduct={}
          selectedCompanyplanProduct.calculatedTax ={}
       selectedCompanyplanProduct.calculatedTax.planProductInfos=[]
        }


  let upgradeText;
  let upgradepaymentText;
          if(payroll){
            upgradeText = "Employee upgraded using payroll deduction"
            upgradepaymentText="using payroll deduction"
            //console.log("One subscription to parent/corp with base(company tax)+Delta(employee tax)")
          }
          else{
            upgradeText = "Employee upgraded using Direct payment"
            upgradepaymentText="using Direct payment"


          }
        let companyTax = selectedCompanyplanProduct.calculatedTax.planProductInfos.length>0?selectedCompanyplanProduct.calculatedTax.planProductInfos[0].taxRate:0
        let companyTaxPercentage=selectedCompanyplanProduct.calculatedTax.planProductInfos.length>0?selectedCompanyplanProduct.calculatedTax.planProductInfos[0].taxRatePercentage:0
        let baseplanPrice= selectedBaseplanProduct.calculatedTax.price
        let baseplanTaxorg = selectedBaseplanProduct.calculatedTax.tax
        let baseplanTax = baseplanPrice*companyTax
        let baseplanTotalorg =selectedBaseplanProduct.calculatedTax.total
        let baseplanTotal =baseplanPrice+baseplanTax
        let employeeTax = selectedCCplanProduct.calculatedTax.planProductInfos.length>0?selectedCCplanProduct.calculatedTax.planProductInfos[0].taxRate:0
        let employeeTaxPercentage =selectedCCplanProduct.calculatedTax.planProductInfos.length>0?selectedCCplanProduct.calculatedTax.planProductInfos[0].taxRatePercentage:0

        let deltaplanPrice =selectedCCplanProduct.calculatedTax.price-selectedBaseplanProduct.calculatedTax.price
        let deltaplanTax = adjustWith2DecimalsForUI(deltaplanPrice*(this.deltaCompanyTax?companyTax:employeeTax))
        // let deltaplanTax = deltaplanPrice*(this.deltaCompanyTax?companyTax:employeeTax)

        let deltaplanTotal =adjustWith2DecimalsForUI(deltaplanPrice+deltaplanTax)



        let combinedplanPrice = baseplanPrice+deltaplanPrice
        let combinedplanbasePrice= baseplanPrice
        let combinedplanDeltaprice= deltaplanPrice
        let combinedplanTax=  adjustWith2DecimalsForUI(baseplanTax+deltaplanTax)
        let combinedplanCompanyTax=baseplanTax
        let combinedplanEmployeeTax=adjustWith2DecimalsForUI(deltaplanTax)
        let combinedplanCompanyTaxPercentage= companyTaxPercentage
        let combinedplanemployeeTaxPercentage=this.deltaCompanyTax?companyTaxPercentage:employeeTaxPercentage
        let combinedplanemployeeTaxPercentageorg=employeeTaxPercentage
        let combinedplanTotal= adjustWith2DecimalsForUI(baseplanTotal+deltaplanTotal)

        let scenario=`Employee Upgrade from ${selectedBaseplanProduct.name} to ${selectedCCplanProduct.name}`
        let planName =`${CCplan.name}(${selectedCCplanProduct.name}) (${upgradeText})`
        let compnayShareStatement =`${CCplan.name}(${selectedCCplanProduct.name}) Contribution`
        let employeeShareStatement =`${CCplan.name}(${selectedCCplanProduct.name}) upgrade cost`
        let planDescription =`${scenario} On a total of ${combinedplanTotal}, company share ${baseplanTotal} and Employee- pays ${upgradepaymentText} ${deltaplanTotal} `
        let planDescription2 =`${scenario} On a total of ${combinedplanTotal}, company share ${baseplanPrice}(with tax:${companyTaxPercentage}) and Employee- pays ${upgradepaymentText} ${deltaplanPrice}(with tax:${employeeTaxPercentage}) `
        let type;

        if(payroll){
          type="Split with payroll deduction"
        }else{
          type="Split with direct pay"

        }
        let basePlanDetails= {
          planId: selectedBasePlan.id || 0, //0
          planName: selectedBasePlan.name || "NA", //NA
          planLevelId: selectedBasePlan.planLevel || 0, //0
          amount: baseplanPrice || 0, //0
          amountUI: `$${baseplanPrice}` || 0, //0
          tax: baseplanTax ,
          total: baseplanTotal,
          taxUI:  `$${baseplanTax}`, //companyTaxpercentage
          totalUI: `$${baseplanTotal}`,
          planLevelName: selectedBasePlan.groupName || "", //if it is Bundle
          planFrequencyID:selectedBasePlan.frqMonthly || "",
          planFusebillID:selectedBasePlan.fusebillId || "",
          products:[selectedBaseplanProduct],
          planLevel_parentId:selectedBasePlan.planLevel_parentId ||0,
          packageName:selectedBasePlan.packageName || "",
          packageId:selectedBasePlan.packageId || 0
        };
        let obj={
          companyTax,companyTaxPercentage,baseplanPrice,baseplanTaxorg,baseplanTax,baseplanTotalorg,baseplanTotal,employeeTax,employeeTaxPercentage,
          deltaplanPrice,deltaplanTax,deltaplanTotal,combinedplanPrice,combinedplanbasePrice,combinedplanDeltaprice,combinedplanTax,
          combinedplanCompanyTax,combinedplanEmployeeTax,combinedplanCompanyTaxPercentage,combinedplanemployeeTaxPercentage,combinedplanTotal,payroll,
          scenario,planName,compnayShareStatement,employeeShareStatement,planDescription,planDescription2,type,basePlanDetails,combinedplanemployeeTaxPercentageorg
        }

        //console.log(obj)
        modifiedCCplan.upgradeCalculation = obj

      }
        modifiedCCgroup.plans.push(modifiedCCplan)

      }
      modifiedCCPackage.groupsCC.push(modifiedCCgroup)


     }

     modifiedCCplanPackages.push(modifiedCCPackage)


    }

    this.modifiedBlocksCoveredByCompany =modifiedCCplanPackages

    //console.log(this.modifiedBlocksCoveredByCompany)
  }
  cobminedcommonfunction(cpPackages,ccPackages,epPackages){
    let commonPackages:any={};
    for(let cpPackage of cpPackages){
      let pckg=cpPackage;
      pckg.groups=pckg.groupsCP

      if(commonPackages && commonPackages[pckg.id]){
      commonPackages[pckg.id].groups.push(pckg.groupsCP)
      }else{
      commonPackages[pckg.id]=pckg;
      }

      }
      //console.log(commonPackages)

      for(let ccPackage of ccPackages){
      let pckg=ccPackage;
      //console.log(pckg)
      pckg.groups=pckg.groupsCC

      //console.log(pckg.groups)
      //console.log(pckg.groupsCC)

      if(commonPackages && commonPackages[pckg.id]){
        //console.log(commonPackages[pckg.id])
        commonPackages[pckg.id].groups=commonPackages[pckg.id].groups.concat(pckg.groupsCC)
      }else{
      commonPackages[pckg.id]=pckg;
      }

      }

      for(let epPackage of epPackages){
      let pckg=epPackage;
      pckg.groups=pckg.groupsEP

      if(commonPackages && commonPackages[pckg.id]){
        commonPackages[pckg.id].groups =commonPackages[pckg.id].groups.concat(pckg.groupsEP)
      }else{
      commonPackages[pckg.id]=pckg;
      }

      }



      return commonPackages

      // let allPackages=[]
      // for (let [key, value] of commonPackages){
      //   //console.log(key)
      //   allPackages.push(value);
      //   return allPackages
      // }

      // //console.log(allPackages);
   }


   public openplanoptions(elementcv, options,plan,product) {
    this.showoptions = true
    // alert("!")
    let plandetails = elementcv.attributes.data.value;

    let plandetailsobj = plandetails.split("##");

    let modifiedOptions = [];

    // this.plandetailsobjvalue = plandetailsobj;

    this.plandetailsobjvalue = plandetails;

    options.forEach((element) => {
      element.planOptionsValues.forEach((options) => {
        options.planOptionName = element.name;
        options.json = JSON.stringify(options);
      });

      modifiedOptions.push(element);
    });

    this.optionstitle = modifiedOptions;

    console.log(this.optionstitle)
    //console.log("isexeccp:" + plandetailsobj[19]);
    this.isExecutiveCP = plandetailsobj[19]
      ? parseInt(plandetailsobj[19]) == 1
        ? true
        : false
      : false;
    // alert("startrhetre")

    $('#showplanoptions-modal').show()

  }
  public planoptionselection(event, optionvalue, optionid, optionvalueid) {
    $(".optionselectionmethod-" + optionid)
      .not(this)
      .prop("checked", false);

    $("#planselectionvalue-" + optionvalueid + "-" + optionid).prop("checked", true);

    this.optionmessage = "";
  }

  public closeplanoptions() {}

  public chooseplan() {
    this.isDisabledplan = true;
  }


  public planCoverafeFunction() {
    this.paidEmployeeShare = 0;
    this.coveredEmployeeShare = 0;

    //console.log("plancoverage");

    let planDetailsArray = JSON.parse(sessionStorage.getItem("planDetailsArray") || "[]");
    //console.log(planDetailsArray);
    // var package_plans = this.convertpackagesToPlans(planDetailsArray);
    // var package_plans = this.convertpackagesToPlans2(this.packagesInBlocks);
    var package_plans = this.convertpackagesToPlans2(this.basepackages);


    //console.log(package_plans);
    let planSummary = JSON.parse(sessionStorage.getItem("plansummary") || "[]");
    //console.log(planSummary);
    var all_selected_plans = [];
    var payrollCCplans =[];
    var directpayCCplans=[];
    var employeeDealingPlans =[];
    var companyDealingPlans =[];
    var alloptinplans =[]
    var company_selected_plans = [];
    var employee_selected_plans = [];
    var company_paid_selected_plans = [];
    var company_covered_selected_plans = [];

    var selected_cc_plans = planSummary.filter(function (plan) {
      return plan.coveredByCompany == 1;
    });

    var selected_cp_plans = planSummary.filter(function (plan) {
      return plan.paidByCompany == 1;
    });

    var selected_ep_plans = planSummary.filter(function (plan) {
      return plan.paidByEmployee == 1;
    });


    // var selected_cc_plans = planSummary.forEach(element => {

    //   element.groups.forEach(group => {
    //     return group.categorization.coveredByCompany == 1;

    //   });

    // });


    // var selected_cp_plans = planSummary.forEach(element => {

    //   element.groups.forEach(group => {
    //     return group.categorization.paidByCompany == 1;

    //   });

    // });
    // var selected_ep_plans = planSummary.forEach(element => {

    //   element.groups.forEach(group => {
    //     return group.categorization.paidByEmployee == 1;

    //   });

    // });

    //console.log(selected_cc_plans);
    //console.log(selected_cp_plans);
    //console.log(selected_ep_plans);


    for (var cp = 0; cp < selected_cp_plans.length; cp++) {
      var current_cp_plan: any = selected_cp_plans[cp];

      current_cp_plan.amount = parseFloat(
        this._decimalPipe.transform(current_cp_plan.amount, "1.2-2")
      );

      current_cp_plan["amounts"] = {
        company: current_cp_plan.amount,
        employee: 0,
        total: current_cp_plan.amount,
      };
      current_cp_plan["categorization"] = {
        paidByCompany: true,
        coveredByCompany: false,
        paidByEmployee: false,
      };

      current_cp_plan["type"]="100% Corporate Paid"

      current_cp_plan["companyCoveredBasePlan"] = {
        planId: 0, //0
        planName: "NA", //NA
        planLevelId: 0, //0
        amount: 0, //0
        tax: 0,
        total: 0,
      };
      current_cp_plan["employeeAmount"] = current_cp_plan["amounts"].employee;
      current_cp_plan["employeeAmountUI"] = "$" + current_cp_plan["amounts"].employee;
      current_cp_plan["companyAmount"] = current_cp_plan["amounts"].company;
      current_cp_plan["companyAmountUI"] = "$" + current_cp_plan["amounts"].company;
      current_cp_plan["planLevelName"] = current_cp_plan.groupName || ""; //Here

      if(current_cp_plan.id==429 || current_cp_plan.packageId==8 || current_cp_plan.planLevel==16){
        alloptinplans.push(current_cp_plan)

      }
      else{
        all_selected_plans.push(current_cp_plan);
        company_selected_plans.push(current_cp_plan);
        company_paid_selected_plans.push(current_cp_plan);
      }




    }

    for (var cc = 0; cc < selected_cc_plans.length; cc++) {
      var current_cc_plan: any = selected_cc_plans[cc];

      current_cc_plan["amounts"] = {
        company: current_cc_plan.upgradeCalculation.baseplanPrice,
        employee: current_cc_plan.upgradeCalculation.deltaplanPrice,
        total: current_cc_plan.upgradeCalculation.combinedplanPrice,
      };



current_cc_plan["companyCoveredBasePlan"] = current_cc_plan.upgradeCalculation.basePlanDetails


          current_cc_plan["companyCoveredBasePlan"].companyTax=current_cc_plan.upgradeCalculation.baseplanTax;
          current_cc_plan["companyCoveredBasePlan"].companyTaxPercentage=current_cc_plan.upgradeCalculation.companyTaxPercentage;

          current_cc_plan["companyCoveredBasePlan"].employeeTax=0;
          current_cc_plan["companyCoveredBasePlan"].employeeTaxPercentage=current_cc_plan.upgradeCalculation.employeeTaxPercentage;
          current_cc_plan["companyCoveredBasePlan"].employeeTaxEffect=0;
          current_cc_plan["companyCoveredBasePlan"].employeeTaxPercentageEffect="0%";
          current_cc_plan["companyCoveredBasePlan"].specialTax=current_cc_plan["companyCoveredBasePlan"].companyTax+current_cc_plan["companyCoveredBasePlan"].employeeTaxEffect;
          current_cc_plan["companyCoveredBasePlan"].tax2=current_cc_plan["companyCoveredBasePlan"].companyTax

      ///
      //deleta plan things
      current_cc_plan["employeeDeductions"] = {
        amount: current_cc_plan.upgradeCalculation.deltaplanPrice, //0
        amountUI: `$${current_cc_plan.upgradeCalculation.deltaplanPrice}`, //0
        tax: `${current_cc_plan.upgradeCalculation.deltaplanTax}`,
        total: `${current_cc_plan.upgradeCalculation.deltaplanTotal}`,
        taxUI: `$${current_cc_plan.upgradeCalculation.deltaplanTax}`,
        totalUI: `$${current_cc_plan.upgradeCalculation.deltaplanTotal}`,
      };

      // current_cc_plan["employeeDeductions"].amountUI =
      //   "$" + current_cc_plan["employeeDeductions"].amount;
      // current_cc_plan["employeeDeductions"].taxUI = current_cc_plan[
      //   "companyCoveredBasePlan"
      // ].taxUI.replace(
      //   current_cc_plan["companyCoveredBasePlan"].tax,
      //   current_cc_plan["employeeDeductions"].tax
      // );
      // current_cc_plan["employeeDeductions"].totalUI =
      //   "$" + current_cc_plan["employeeDeductions"].total;




      current_cc_plan["categorization"] = {
        paidByCompany: false,
        coveredByCompany: true,
        paidByEmployee: false,
      };


      current_cc_plan["type"]=current_cc_plan.upgradeCalculation.type

      current_cc_plan["planGrandTotal"] = {
        amount: current_cc_plan.upgradeCalculation.combinedplanPrice, //0
        amountUI: `$${current_cc_plan.upgradeCalculation.combinedplanPrice}`, //0
        tax: current_cc_plan.upgradeCalculation.combinedplanTax,
        total: current_cc_plan.upgradeCalculation.combinedplanTotal,
        taxUI: `$${current_cc_plan.upgradeCalculation.combinedplanTax}`,
        totalUI: `$${current_cc_plan.upgradeCalculation.combinedplanTotal}`,
      };
      // planid,planname,planlevelid,planlevename,amount
      current_cc_plan.amount =  current_cc_plan["planGrandTotal"].amount
      current_cc_plan.amountUI =  current_cc_plan["planGrandTotal"].amount
      current_cc_plan.tax =  current_cc_plan["planGrandTotal"].tax
      current_cc_plan.taxUI =  current_cc_plan["planGrandTotal"].taxUI
      current_cc_plan.total =  current_cc_plan["planGrandTotal"].total
      current_cc_plan.totalUI =  current_cc_plan["planGrandTotal"].totalUI
      current_cc_plan.skuTotalPrice =  current_cc_plan["planGrandTotal"].total
      current_cc_plan.totalPrice =  current_cc_plan["planGrandTotal"].total




      //console.log(current_cc_plan);

      current_cc_plan["companyShareTotal"] = current_cc_plan["companyCoveredBasePlan"].total;
      current_cc_plan["employeeShareTotal"] = current_cc_plan["employeeDeductions"].total;

      current_cc_plan["companySharePlanAmountTotal"] = current_cc_plan["companyCoveredBasePlan"].amount;
      current_cc_plan["employeeSharePlanAmountTotal"] = current_cc_plan["employeeDeductions"].amount;

      current_cc_plan["companyShareTaxTotal"] = current_cc_plan["companyCoveredBasePlan"].tax;
      current_cc_plan["employeeShareTaxTotal"] = current_cc_plan["employeeDeductions"].tax;

      current_cc_plan["employeeAmount"] = current_cc_plan["amounts"].employee;
      current_cc_plan["employeeAmountUI"] = "$" + current_cc_plan["amounts"].employee;
      current_cc_plan["companyAmount"] = current_cc_plan["amounts"].company;
      current_cc_plan["companyAmountUI"] = "$" + current_cc_plan["amounts"].company;
      //console.log(current_cc_plan["amounts"].employee);
      //console.log(current_cc_plan["amounts"].company);
      //console.log(current_cc_plan["amounts"].total);
      this.coveredEmployeeShare += parseFloat(current_cc_plan["amounts"].employee);

      this.coveredEmployeeShare = parseFloat(
        this._decimalPipe.transform(this.coveredEmployeeShare, "1.2-2")
      );

      all_selected_plans.push(current_cc_plan);
      company_selected_plans.push(current_cc_plan);
      company_covered_selected_plans.push(current_cc_plan);

      if(current_cc_plan.upgradeCalculation.payroll){
        payrollCCplans.push(current_cc_plan)
      }else{
        directpayCCplans.push(current_cc_plan)
      }
      //console.log("payrollCCplans",payrollCCplans)
      //console.log("directpayCCplans",directpayCCplans)
    }


    for (var ep = 0; ep < selected_ep_plans.length; ep++) {
      var current_ep_plan: any = selected_ep_plans[ep];

      //console.log(current_ep_plan)

      current_ep_plan.amount = parseFloat(current_ep_plan.products[0].price);

      current_ep_plan["amounts"] = {
        company: 0,
        employee: current_ep_plan.total, //current_ep_plan.amount,(+tax)
        total: current_ep_plan.total, //current_ep_plan.amount,(+tax)
      };

      current_ep_plan["categorization"] = {
        paidByCompany: false,
        coveredByCompany: false,
        paidByEmployee: true,
      };

      current_ep_plan["type"]="Voluntary Opt-in"

      current_ep_plan["companyCoveredBasePlan"] = {
        planId: 0, //0
        planName: "NA", //NA
        planLevelId: 0, //0
        amount: 0, //0
        tax: 0,
        total: 0,
      };
      current_ep_plan["employeeAmount"] = current_ep_plan["amounts"].employee;
      current_ep_plan["employeeAmountUI"] = "$" + current_ep_plan["amounts"].employee;
      current_ep_plan["companyAmount"] = current_ep_plan["amounts"].company;
      current_ep_plan["companyAmountUI"] = "$" + current_ep_plan["amounts"].company;
      //  current_cp_plan["planLevelName"] = current_ep_plan.groupName || ""

        //console.log(current_ep_plan)

      //console.log(current_ep_plan["amounts"].employee);
      //console.log(this.paidEmployeeShare);
      // this.paidEmployeeShare = +current_ep_plan["amounts"].employee;
      this.paidEmployeeShare += parseFloat(current_ep_plan["amounts"].total);
      //console.log(this.paidEmployeeShare);
      // this.paidEmployeeShare = parseFloat(
      //   this._decimalPipe.transform(this.paidEmployeeShare, "1.2-2")
      // );

      //console.log(this.paidEmployeeShare);
      all_selected_plans.push(current_ep_plan);
      employee_selected_plans.push(current_ep_plan);
    }

    employeeDealingPlans = directpayCCplans.concat(employee_selected_plans)
    companyDealingPlans =company_paid_selected_plans.concat(payrollCCplans)


    //console.log("employeeDealingPlans",employeeDealingPlans)
    //console.log("companyDealingPlans",companyDealingPlans)

    this.alloptinplans = alloptinplans


    //console.log(this.coveredEmployeeShare);
    //console.log(this.paidEmployeeShare);


    sessionStorage.setItem("employeeshare",this.paidEmployeeShare)
    //console.log(this._decimalPipe.transform(this.coveredEmployeeShare, "1.2-2"));
    //console.log(this._decimalPipe.transform(this.paidEmployeeShare, "1.2-2"));

    this.totalEmployeeShare = this.coveredEmployeeShare + this.paidEmployeeShare;
    this.cartDisplayAmount = this.paidEmployeeShare;
    this.totalEmployeeShare = parseFloat(
      this._decimalPipe.transform(this.totalEmployeeShare, "1.2-2")
    );
    this.cartDisplayAmount = this._decimalPipe.transform(this.cartDisplayAmount, "1.2-2");

    //this.cartDisplayAmount = floatWith2Decimals(this.cartDisplayAmount);

    //console.log(this.totalEmployeeShare);



   /* if (employee_selected_plans.length > 0) {
      this.showPaymenthMethod = true;
      this.showPaymenthMethod1 = false;
      this.creditcardform = true;
      sessionStorage.setItem("paymentMethod", "CC");
      this.bankpaymentmethod = "CC";

    } else {


      this.showPaymenthMethod = false;
      this.showPaymenthMethod1 = true;
      this.creditcardform = false;
      sessionStorage.setItem("paymentMethod", "NONE");
    }*/
    if (employeeDealingPlans.length > 0) {
      this.showPaymenthMethod = true;
      this.showPaymenthMethod1 = false;
      this.creditcardform = true;
      sessionStorage.setItem("paymentMethod", "CC");
      this.bankpaymentmethod = "CC";

    } else {


      this.showPaymenthMethod = false;
      this.showPaymenthMethod1 = true;
      this.creditcardform = false;
      sessionStorage.setItem("paymentMethod", "NONE");
    }

    this.directpayCCplansarr = directpayCCplans
    this.payrollCCplansarr = payrollCCplans
    this.companyDealingPlans = companyDealingPlans
    this.employeeDealingPlansarr = employeeDealingPlans

    this.payrollCCplansarr = this.payrollCCplansarr.sort(function(a, b) {
      return (a.packageId - b.packageId);
    })
    this.companyDealingPlans = this.companyDealingPlans.sort(function(a, b) {
      return (a.packageId - b.packageId);
    })
this.companyDealingPlans = this.companyDealingPlans.sort(function(a, b) {
  return (a.packageId - b.packageId);
})
    //console.log(this.companyDealingPlans)
    //console.log(this.payrollCCplansarr)
    //console.log(this.employeeDealingPlansarr)
    sessionStorage.setItem("allSelectedPlans", JSON.stringify(all_selected_plans));
    sessionStorage.setItem("allSelectedOptPlans", JSON.stringify(alloptinplans));
    //console.log(all_selected_plans);
    //console.log(company_selected_plans);

    //console.log(company_paid_selected_plans);
    //console.log(company_covered_selected_plans);
    //console.log(employee_selected_plans);

    //company paid plans
    this.companySelectedPlans = company_paid_selected_plans;
    this.companyCoveredPlans = company_covered_selected_plans;
    this.EmployeeSelectedPlans = employee_selected_plans;



    this.allSelectedPlans=all_selected_plans;

    this.allSelectedPlans = this.allSelectedPlans.sort(function(a, b) {
      return (a.packageId - b.packageId);
  })

    this.allPlansAmountTotal= sumBy(this.allSelectedPlans, "amount");
    //     this.allPlansAmountTotal =  this._decimalPipe.transform(
    //   this.allPlansAmountTotal,
    //   "1.2-2"
    // );
    this.allPlansTotal= sumBy(this.allSelectedPlans, "total");
    // this.allPlansTotal =  this._decimalPipe.transform(
    //   this.allPlansTotal,
    //   "1.2-2"
    // );
    this.allPlansTotaltax= sumBy(this.allSelectedPlans, "tax");
    // this.allPlansTotaltax =  this._decimalPipe.transform(
    //   this.allPlansTotaltax,
    //   "1.2-2"
    // );

    this.allCPPlansAmountTotal= sumBy(this.companySelectedPlans, "amount");
    this.allCPTaxTotal= sumBy(this.companySelectedPlans, "tax");
    this.companyPaidTotal = sumBy(this.companySelectedPlans, "total");
    //console.log(this.companyPaidTotal);
    // this.companyPaidTotal =  this._decimalPipe.transform(
    //   this.companyPaidTotal,
    //   "1.2-2"
    // );
    //console.log(this.companyPaidTotal);
    // for(var i=0;i<this.companySelectedPlans.length;i++){
    //   this.companyPaidTotal += this.companySelectedPlans[i].total

    //   this.companyPaidTotal = parseFloat(this._decimalPipe.transform(this.companySelectedPlans[i].total, "1.2-2"))

    // }
    // for(var i=0;i<this.companyCoveredPlans.length;i++){
    //   this.companyCoveredTotal += this.companyCoveredPlans[i].total
    //   this.companyCoveredTotal = parseFloat(this._decimalPipe.transform(this.companyCoveredTotal, "1.2-2"))

    // }
    this.allCCPlansAmountTotal= sumBy(this.companyCoveredPlans, "amount");
    this.allCCTaxTotal= sumBy(this.companyCoveredPlans, "tax");
    this.companyCoveredTotal = sumBy(this.companyCoveredPlans, "total");
    //console.log(this.allCCPlansAmountTotal);
    //console.log(this.allCCTaxTotal);
    //console.log(this.companyCoveredTotal);
    this.companyCoveredCompanyShareTotal = sumBy(this.companyCoveredPlans, "companyShareTotal");
    this.companyCoveredCompanySharePlanAmountTotal = sumBy(this.companyCoveredPlans, "companySharePlanAmountTotal");
    this.companyCoveredCompanyShareTaxTotal = sumBy(this.companyCoveredPlans, "companyShareTaxTotal");
    this.companyCoveredEmployeeShareTotal = sumBy(this.companyCoveredPlans, "employeeShareTotal");
    this.companyCoveredEmployeeSharePlanAmountTotal= sumBy(this.companyCoveredPlans, "employeeSharePlanAmountTotal");
    this.companyCoveredEmployeeShareTaxTotal= sumBy(this.companyCoveredPlans, "employeeShareTaxTotal");

    this.payrollCCPlansAmountTotal= sumBy(payrollCCplans, "amount");
    this.payrollCCPlantaxTotal= sumBy(payrollCCplans, "tax");
    this.payrollCCPlangrandTotal= sumBy(payrollCCplans, "total");

    this.DirectCCpayPlanamountTotal= sumBy(directpayCCplans, "amount");
    this.DirectCCpayPlantaxTotal= sumBy(directpayCCplans, "tax");
    this.DirectCCpayPlangrandTotal= sumBy(directpayCCplans, "total");

    //The below includes Employee-voluntary-plans and company-covered-split with direct-pay-plans
    this.empDirectpayPlanamountTotal= sumBy(employeeDealingPlans, "amount");
    this.empDirectpayPlantaxTotal= sumBy(employeeDealingPlans, "tax");
    this.empDirectpayPlangrandTotal= sumBy(employeeDealingPlans, "total");

    //Company paid and company covered split with payroll
    this.companydealingplansTotal= sumBy(companyDealingPlans, "amount");
    this.companydealingplanstaxTotal= sumBy(companyDealingPlans, "tax");
    this.companydealingplansgrandTotal= sumBy(companyDealingPlans, "total");


    // for(var i=0;i<this.EmployeeSelectedPlans.length;i++){
    //   this.companyCoveredTotal += this.EmployeeSelectedPlans[i].total
    //   this.companyCoveredTotal = parseFloat(this._decimalPipe.transform(this.EmployeeSelectedPlans[i].total, "1.2-2"))

    // }
      //cp+cc(company)
      this.effectiveCompanyPlansAmountTotal= parseFloat(this.allCPPlansAmountTotal)+parseFloat(this.companyCoveredCompanySharePlanAmountTotal)
      this.effectiveCompanyPlansAmountTotal = this._decimalPipe.transform(
        this.effectiveCompanyPlansAmountTotal,
        "1.2-2"
      );
      this.effectiveCompanyTaxTotal= parseFloat(this.allCPTaxTotal)+ parseFloat(this.companyCoveredCompanyShareTaxTotal)
      this.effectiveCompanyTaxTotal = this._decimalPipe.transform(
        this.effectiveCompanyTaxTotal,
        "1.2-2"
      );
     this.effectiveCompanyTotalContibution = parseFloat(this.companyPaidTotal)+parseFloat(this.companyCoveredCompanyShareTotal)
     this.effectiveCompanyTotalContibution = this._decimalPipe.transform(
      this.effectiveCompanyTotalContibution,
      "1.2-2"
    );

    this.allEPPlansAmountTotal= sumBy(this.EmployeeSelectedPlans, "amount");
    this.allEPTaxTotal= sumBy(this.EmployeeSelectedPlans, "tax");
    this.paidEmployeedTotal = sumBy(this.EmployeeSelectedPlans, "total");
    //console.log(this.paidEmployeedTotal);
    // this.paidEmployeedTotal = this._decimalPipe.transform(
    //   this.paidEmployeedTotal,
    //   "1.2-2"
    // );
    // //console.log(this.companyPaidTotal)
    // //console.log(this.companyCoveredTotal)
    // //console.log(this.paidEmployeedTotal)

    this.effectiveEmployeeTotalContibution =
    parseFloat(this.companyCoveredEmployeeShareTotal) + parseFloat(this.paidEmployeedTotal);
    this.effectiveEmployeeTotalContibution = this._decimalPipe.transform(
      this.effectiveEmployeeTotalContibution,
      "1.2-2"
    );
    // this.effectiveEmployeeTotalContibution = this._decimalPipe.transform(
    //   this.effectiveEmployeeTotalContibution,
    //   "1.2-2"
    // );

    this.effectiveCompanyTotalContibution =parseFloat(
      this.companyCoveredCompanyShareTotal,
   )+parseFloat(
      this.companyPaidTotal,
    );

  this.effectiveCompanyTotalContibution = this._decimalPipe.transform(
    this.effectiveCompanyTotalContibution,
    "1.2-2"
  );




  //console.log(this.companyCoveredPlans)
        //payrollDeduction setting

        let payrollDeduction = sessionStorage.getItem("payrollDeduction")?sessionStorage.getItem("payrollDeduction"):"EMPLOYEE_CHOICE"

        if(this.companyCoveredPlans.length>0 && payrollDeduction =="EMPLOYEE_CHOICE"){



          // $("payrolldeduction-modal").show()
          // jQuery("#payrolldeduction-modal").modal("show");


        }




  }

  public calculateTaxforPlan(plan: any) {
    let plandetails;
    //console.log(plan)
    //console.log($(`#plancheck${plan.id}`))
    for (const cpPlan of plan) {
      //console.log(plan)
      for(const product1 in cpPlan.productAddonss){

        //console.log(cpPlan.productAddonss[product1][0].id)

       plandetails = $("#plancheck"+cpPlan.productAddonss[product1][0].id).attr("data");


        //console.log(plandetails)
        let plandetailsobj = plandetails.split("##");

        let obj = {
          // enrollmentDate:this.datePipe.transform(
          //   this.userForm.value.planenrollmentdate,
          //   'yyyy-MM-dd'
          // ),
          enrollmentDate:sessionStorage.getItem('enrollmentdate'),

          // "name":plandetailsobj[1]+"-"+plandetailsobj[2],
          name: plandetailsobj[14],
          details: plandetailsobj[0],
          packagename: plandetailsobj[0],
          groupName: plandetailsobj[1],
          amount: parseFloat(plandetailsobj[3].replace(/\,/g,'')),
          planCoverage: plandetailsobj[2],
          planPrice: parseFloat(plandetailsobj[3].replace(/\,/g,'')),
          amountUI: "$" + parseFloat(plandetailsobj[3].replace(/\,/g,'')),
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
          paidByCompany1: plandetailsobj[19],
          coveredByCompany1: plandetailsobj[20],
          paidByEmployee1: plandetailsobj[21],
          planLevel_parentId: plandetailsobj[12],
          disallowedPlanLevels: plandetailsobj[11],
        };

        ////console.log(obj)
        let gstprice = 0;
        let hstprice = 0;
        let pstprice = 0;
        let qstprice = 0;

        if (obj.gst > 0) {
          gstprice = obj.planPrice * obj.gst;
          obj["gstPrice"] = parseFloat(this._decimalPipe.transform(gstprice, "1.2-2"));
        } else {
          obj["gstPrice"] = 0;
        }

        if (obj.hst > 0) {
          hstprice = obj.planPrice * obj.hst;

          obj["hstPrice"] = parseFloat(this._decimalPipe.transform(hstprice, "1.2-2"));
        } else {
          obj["hstPrice"] = 0;
        }

        if (obj.pst > 0) {
          pstprice = obj.planPrice * obj.pst;
          obj["pstPrice"] = parseFloat(this._decimalPipe.transform(pstprice, "1.2-2"));
        } else {
          obj["pstPrice"] = 0;
        }

        if (obj.qst > 0) {
          qstprice = obj.planPrice * obj.qst;
          obj["qstPrice"] = parseFloat(this._decimalPipe.transform(qstprice, "1.2-2"));
        } else {
          obj["qstPrice"] = 0;
        }

        obj["taxUI"] = "";
        if (obj["gstCheck"]) {
          obj["taxUI"] += "<span>";
          if (obj["gstPrice"] == 0) {
            obj["taxUI"] += "-";
          } else {
            obj["taxUI"] += "$" + this._decimalPipe.transform(obj["gstPrice"], "1.2-2") + "&nbsp;(GST)";
          }
          obj["taxUI"] += "</span>";
        }

        if (obj["pstCheck"]) {
          obj["taxUI"] += "<span>";
          if (obj["pstPrice"] == 0) {
            obj["taxUI"] += "-";
          } else {
            obj["taxUI"] += "$" + this._decimalPipe.transform(obj["pstPrice"], "1.2-2") + "&nbsp;(PST)";
          }
          obj["taxUI"] += "</span>";
        }

        if (obj["qstCheck"]) {
          obj["taxUI"] += "<span>";
          if (obj["qstPrice"] == 0) {
            obj["taxUI"] += "-";
          } else {
            obj["taxUI"] += "$" + this._decimalPipe.transform(obj["qstPrice"], "1.2-2") + "&nbsp;(QST)";
          }
          obj["taxUI"] += "</span>";
        }

        if (obj["hstCheck"]) {
          obj["taxUI"] += "<span> ";
          if (obj["hstPrice"] == 0) {
            obj["taxUI"] += "-";
          } else {
            obj["taxUI"] += "$" + this._decimalPipe.transform(obj["hstPrice"], "1.2-2") + "&nbsp;(HST)";
          }
          obj["taxUI"] += "</span>";
        }

        if (!obj["hstCheck"] && !obj["gstCheck"] && !obj["pstCheck"] && !obj["qstCheck"]) {
          obj["taxUI"] += "<span>-";

          obj["taxUI"] += "</span>";
        }

        // ////console.log(object["taxUI"])

        obj["tax"] = parseFloat(
          this._decimalPipe.transform(gstprice + hstprice + pstprice + qstprice, "1.2-2")
        );

        //console.log(obj.planPrice);
        //console.log(gstprice);
        //console.log(hstprice);
        //console.log(pstprice);

        //console.log(qstprice);
        let pricecal = obj.planPrice + gstprice + hstprice + pstprice + qstprice;
        obj["totalPrice"] = pricecal;

        obj["totalUI"] = "$" + pricecal;

        obj["total"] = pricecal;
        //console.log(obj)
        return obj;


      }

    }


  }

  public convertpackagesToPlans2(packages) {
    //console.log("pacakges");
    //all_plans
    var plans = [];
    var cp_plans = [];
    var cc_plans = [];
    var ep_plans = [];

    packages.paidByCompany.forEach((pack, index) => {
      pack.groupsCP.forEach((group, index1) => {
        group.plans.forEach((plan, index2) => {
          if (plan) {

            plan["planLevel_parentId"] = group.parentId;
            plan["packageName"]=pack.name
            plan["groupName"]=group.name
            plan["groupId"]=group.id
            plan["groupparentId"] =group.parentId
            plans.push(plan);

            if (group.categorization.paidByCompany) {
              cp_plans.push(plan);
            }
            if (group.categorization.coveredByCompany) {
              cc_plans.push(plan);
            }
            if (group.categorization.paidByEmployee) {
              ep_plans.push(plan);
            }
          } else {
            //console.log("else");
          }
        });
      });
    });

    // for(var pkg=0;pkg<packages.length;pkg++){
    //   //console.log(packages[pkg].id)

    //   for(var grp=0;packages[pkg].groups.length;grp++){

    //     var group=packages[pkg].groups[grp]

    //     //console.log(group.name)
    //     //console.log(group.plans)

    //     for(var pl=0;group.plans.length;pl++){
    //         var plan=group.plans[pl];

    //         //console.log(plan)

    //         // return false

    //         if(plan){
    //           plan["planLevel_parentId"] = group.parentId
    //           plans.push(plan)
    //           if(group.categorization.paidByCompany){
    //             cp_plans.push(plan)
    //           }
    //           if(group.categorization.coveredByCompany){
    //             cc_plans.push(plan)
    //           }
    //           if(group.categorization.paidByEmployee){
    //             ep_plans.push(plan)
    //           }
    //         }
    //         else{
    //           //console.log("else")
    //         }

    //     }
    //   }

    // }

    //console.log(plans);
    //console.log(cp_plans);
    //console.log(cc_plans);
    //console.log(ep_plans);

    return [plans, cp_plans, cc_plans, ep_plans];
  }

  checkrequiredPlan(plan){


    let newplan:any=[];

        for(let product1 in plan.productAddonss){
          //console.log(product1)
          //console.log(plan.productAddonss[product1])
          let product = plan.productAddonss[product1].reduce(function (prev, current) {
            if (+current.id > +prev.id) {
              return current;
            } else {
              return prev;
            }
          });
          // newplan.productAddonss[product1]= []

          let coverage = product.planCoverage

          coverage = ["SINGLE","COUPLE","FAMILY"].includes(coverage)?coverage:null
          ////console.log(obj)
          let productobj = {

            id: product.id,
         productId: product.productId,
         name: product.name,


         planProductId: product.planProductId,
        //  price: product.price1 || product.price,
        //  tax: product.calculatedTax ? product.calculatedTax.tax : 0,
        //  total: product.calculatedTax ? product.calculatedTax.total : 0,
        price: adjustWith2DecimalsForUI(product.price1 || product.price) ,
        tax: adjustWith2DecimalsForUI(product.calculatedTax ? product.calculatedTax.tax : 0),
        total:adjustWith2DecimalsForUI(product.calculatedTax ? product.calculatedTax.total : 0),
        //  price: parseFloat(this._decimalPipe.transform(product.price1 || product.price, "1.2-2")) ,
        //  tax: parseFloat(this._decimalPipe.transform(product.calculatedTax ? product.calculatedTax.tax : 0, "1.2-2")),
        //  total:parseFloat(this._decimalPipe.transform(product.calculatedTax ? product.calculatedTax.total : 0, "1.2-2")),
         tax_details:

              product.bundledTaxes && product.bundledTaxes.length > 0

                ? product.bundledTaxes

                : product.taxesDataJSON,
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
         packageName: plan.packageName,

            planproductname: productobj.name,

            groupid: plan.planLevel,
         groupName: plan.groupName,
         id: plan.id,
         name: plan.name,
         planLevel: plan.planLevel?plan.planLevel:plan.groupId,
         planLevelParent: plan.groupparentId,
         fusebillPlanID: plan.fusebillId,
         planFrequencyID: plan.frqMonthly,
         isBundle: plan.isBundle,
         coverage:coverage,
         planCoverage: product.planCoverage,
         bundledProducts: [],
         products: [],
         upgradeCalculation:plan.upgradeCalculation,
         paidByCompany:"NA",//group.categorization.paidByCompany,
         coveredByCompany:"NA",//group.categorization.coveredByCompany,
          paidByEmployee:"NA" //group.categorization.paidByEmployee

          };
          obj1.products.push(productobj);
          newplan.push(obj1)

        }
    if(newplan.length>1){
      let reduced =  newplan.reduce(function (prev, current) {
          if (+current.products[0].total > +prev.products[0].total) {
            return current;
          } else {
            return prev;
          }
        });
        return reduced.products[0]
      }
      else{
        return newplan[0].products[0]
      }



      }

  setDateOfHire(){
   let dateOfBirth= this.userForm.get('dateofbirth').value;
   console.log(dateOfBirth);
   this.minDateHire=new Date(dateOfBirth)
  }

  TextToLowerCase(form:FormGroup,id:any){
   let value=form.get(id).value.toLowerCase();
   form.get(id).setValue(value);
   form.get(id).updateValueAndValidity();
  }




}



export function apt_suitecheck(
  control: AbstractControl
): { [key: string]: any } | null {
  var Regexp = /^[a-zA-Z0-9]{1,50}$/;
  if (control.value && !Regexp.test(control.value)) {
    return { aptexpression: true };
  }
  return null;
}

export function postalcodeValidator(control: FormControl): {
  [key: string]: any;
} {
  var postalRegexp = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/gm;
  if (control.value && !postalRegexp.test(control.value)) {
    return { invalidPostalCode: true };
  }
  return String;
}
export function diff_years(dt2: any) {
  let dt1 = new Date();
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24;
  return Math.abs(Math.round(diff / 365.25));
}


export function dateofbirthvalidation(
  control: AbstractControl
): { [key: string]: any } | null {
  let minDate = moment().subtract(100, "years").calendar();
  let maxDate = moment().subtract(16, "years").calendar();

  let minDatevalue = new Date(minDate);

  let maxDatevalue = new Date(maxDate);

  if (new Date(control.value) > maxDatevalue) {
    return { mindateofbirth: true };
  } else if (new Date(control.value) < minDatevalue) {
    return { maxdateofbirth: true };
  }

  return null;
}



export function creditcardvalidation(
  control: AbstractControl
): { [key: string]: any } | null {
  console.log("creditcardvalidation: " + control.value);
  var creditcardRegexp = /^[0-9]{13,19}$/;
  if (control.value && !creditcardRegexp.test(control.value)) {
    return { invalidcreditcarddetails: true };
  }
  return null;
}

export function validatehoursperweek(
  control: AbstractControl
): { [key: string]: any } | null {
  if (control.value && control.value < 20) {
    return { mininvalidhours: true };
  } else if (control.value && control.value >= 81) {
    return { maxinvalidhours: true };
  }
}




