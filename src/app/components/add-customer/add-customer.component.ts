
import { state } from '@angular/animations';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
// import { DecimalPipe, KeyValue } from '@angular/common';
import SignaturePad from 'signature_pad';
// import { Modal } from 'bootstrap';
import { DecimalPipe, KeyValue, formatNumber } from '@angular/common';
import { error } from 'jquery';
import { PhoneFormatPipe } from '../../pipes/phone-format.pipe';
import{CommonPatternsService} from '../../common-patterns.service'
declare var $: any;

@Component({
  //app-add-customer
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
  providers: [DecimalPipe, PhoneFormatPipe],
  // encapsulation: ViewEncapsulation.None
})
export class AddCustomerComponent implements OnChanges, OnInit {
  configprovinceres: any;
  currencySymbol: any;
  languageTokensArray: any;
  lang: any = {};
  configresults: any;
  configPlanEnrollmentDate: any;
  requireDentalHealthCoverage: any = true;
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
  childInfoAddDataArray: any = [];
  // childTableRowsLength: any;
  applicanthavingchildren: any;
  pdfvisibleadvisouredisclosure: boolean = true;
  Shared: any;
  applicantfirstname: any;
  countrydetails: any;
  selectedTab: any = 'tab1';
  planAmount: any = 0;
  specialpackages: any;
  tab1Img: boolean;
  minDate: any;
  maxDate: any;
  applicantChildrenname: any;
  completeapplicantinfo: string;
  marital_status: any;
  pdfvisibletermsandcodionsmodel: boolean = true;
  padAgrementLoad: boolean = true;
  withSignLoad: boolean = true;
  graducationdaycheck: boolean = false;
  plansnexttab: boolean;
  cartcheckvalue: boolean;
  allproducts: any;
  // private _decimalPipe: any;
  paymentfirstname: any;
  paymentemail: any;
  homeaddresscheckvalue: boolean = false;
  homeaddressEnrollmentVal: boolean;
  planssummarymain: any;
  planssummaryopt: any;
  studentplanssummarymain: any;
  studentplanssummarymain1: any[];
  finalenrollemntsummary: any[];
  paymentMethodSelectCC: boolean;
  bankDetailsNames: string;
  enrollmentBankDetailedVerify: boolean;
  bankDetailsError: string;
  bankDetailsVerifyStatus: boolean;
  bankverifyDetails: any;
  signaturePadClear: boolean = false;
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
  displayStudentId: boolean = false;
  hoursperweek: boolean = false;
  hourperweekvalue: boolean = false;
  displatGig: boolean = false;
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
  showBrokersList: boolean = false;
  formsList: any;
  forms: any = [];
  showForm: boolean = false;
  // phoneNoFormat: any;
  planobjdata: {
    packageId: any;
    packageName: any;
    planproductname: any;
    groupid: any;
    groupName: any;
    id: any;
    name: any;
    planLevel: any;
    planLevelParent: any;
    fusebillPlanID: any;
    planFrequencyID: any;
    isBundle: any;
    coverage: any;
    planCoverage: any;
    bundledProducts: any[];
    products: any[];
  };

  plansskumain: any[] = [];
  plandetailsobjvalue: any;
  optionstitle: any[];
  optionmessage: any;
  showoptions: boolean = false;
  disabledelement: string;
  fusebill_paymentMethod: any = 'CC';
  minDateHire: string;
  minDatechild: Date;
  maxDatechild: Date;
  isStudent: boolean = true;
  planssummary: any[] = [];
  terminateReasonsWithKeys: any;
  studentPlaceHolder: any;
  studentPlaceHolderln: any;
  role: string;
  allBrokers: any;
  gsPlans: boolean=false;
  eqPlans: boolean=false;
  showGreenShiled: boolean=false;
  gsRegistration: boolean=true;
  gsMembershipId: any;
  eqRegistration: boolean=true;
  eqCertificateId: any;
  showEquitable: boolean=false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private childInfoFormBuilder: FormBuilder,

    private toastrService: ToastrService,
    private enrollmentFormBuilder: FormBuilder,
    private greenShildBuilder:FormBuilder,
    private bankPayFormBuilder: FormBuilder,
    private creditCardFormBuilder: FormBuilder,
    private router: Router,
    private _decimalPipe: DecimalPipe,
    // private phoneNoFormat1: PhoneNoFormatPipe,
    // private studentService: StudentService,
    // private Shared: SharedService,
    // private _decimalPipe: DecimalPipe,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private el: ElementRef,
    private phoneNoFormat: PhoneFormatPipe
  ) {
    this.minDate = moment().subtract(100, 'years').calendar();
    this.maxDate = moment().subtract(16, 'years').calendar();
  }
  signaturePadCC: any = SignaturePad;
  padAggsignaturePadCC: any = SignaturePad;
  @ViewChild('dependentWithSpecialNeeds') dependentWithSpecialNeeds: any;
  @ViewChild(' PADpafaggrementModal') PADpafaggrementModalpopup: any;
  @ViewChild('PADpafaggrementModalSign') PADpafaggrementModalpopupSign: any;
  @ViewChild('signaturePadagreementModal') signaturePadagreementModalPopup: any;
  @ViewChild('postSecondaryStudent') postSecondaryStudentVal: any;
  @ViewChild('signaturePadCanvas') signaturePadCanvasEl?: ElementRef;
  @ViewChild('padAgreementSignaturePadCanvas')
  padAgreementSignaturePadCanvasEl?: ElementRef;
  @ViewChild('dependentChildInfo') dependentChildInfo?: ElementRef;
  @ViewChild('QCproviance') QCproviance: any;
  @ViewChild('checkuhipstatusModal') checkuhipstatusModal: any;
  @ViewChild('checkphcpstatusModal') checkphcpstatusModal: any;
  // @ViewChild('childInfoModal') childInfoModal: any;
  @ViewChild('advisoranddisclousreModal') advisoranddisclousreModal: any;
  @ViewChild('termsAndConditionsModal') termsAndConditionsModal: any;
  @Input() valuFormChaild: any;
  // @ViewChild('signaturePadCanvas') signaturePadCanvasEl?: ElementRef;
  // @ViewChild('padAgreementSignaturePadCanvas') padAgreementSignaturePadCanvasEl?: ElementRef;

  ngOnInit(): void {
    this.role=sessionStorage.getItem('role');
    this.minDate = moment().subtract(100, 'years').calendar();
    this.maxDate = moment().subtract(16, 'years').calendar();
    this.minDate = new Date(this.minDate);

    this.maxDate = new Date(this.maxDate);

    this.minDateHire = moment().subtract(60, 'years').calendar();

    this.minDatechild = new Date(this.minDateHire);
    this.maxDatechild = new Date();
    this.getFormConfig();
    this.userFormGroup();
    this.childInfoValidators();
    this.enrolmentFormValidator();
    this.bankPayFormValidator();
    this.greenShiledFormValidations();
    this.EquitableFormValidations();
    // this.memberInfoFormGropu();

    // alert('aaaaaaaaaa')
  }

  ngOnChanges() {
    console.log('enter to ng on change');
    this.userForm.reset();
    // this.memberInfo.reset();
    this.enrollmentForm.reset();
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit()');
    this.userForm.reset();
    // this.memberInfo.reset();
    this.enrollmentForm.reset();

  }
  ngDocheck() {
    console.log('enter to ng onDo');
    this.userForm.reset();
    // this.memberInfo.reset();
    this.enrollmentForm.reset();
  }

  getFormConfig() {
    // let formLink = environment.app.formLink
    var accessToken = sessionStorage.getItem('accessToken');
    var endPoint = '/api/ap/customer/formConfig_2';

    let lang = 'en';
    this.http
      .get(environment.apiUrl + endPoint, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (result: any) => {
          // this.isLoaded =true
          if (result.status == '200') {

            let states;
            states=result.data.states.filter((country)=>{
              return country.countryId==1
            });
            result.data.states=states;
            this.configprovinceres = result.data.states.sort((a: any, b: any) =>
              a.shortName > b.shortName ? 1 : -1
            );
            // this.provincelist
            this.currencySymbol = result.data.countries[0].currencySymbol;
            this.terminateReasonsWithKeys=result.data.terminateReasonsWithKeys;
            sessionStorage.setItem('terminateReasonsWithKeys',JSON.stringify(this.terminateReasonsWithKeys));
            // this.currencySymbol ="$"
            this.allBrokers=result.data.allBrokers;
            console.log('result: ' + JSON.stringify(result));
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
            this.studentPlaceHolder=this.lang.name_as_shown_on_provincial_health_card;
            this.studentPlaceHolderln=this.lang.name_as_shown_on_provincial_health_card;

            this.configresults = result.data;

            sessionStorage.setItem(
              'provincelist',
              result.data.broker_licensed_provinces
            );
            sessionStorage.setItem(
              'countrydetails',
              JSON.stringify(result.data.countries)
            );

            console.log('this.lang: ' + JSON.stringify(this.lang));
            sessionStorage.setItem('langTokens', JSON.stringify(this.lang));
            this.configPlanEnrollmentDate =
              result.data.validations.customer.planEnrollmentDatesFullMonth;

            this.brokerTermsConditions =
              result.data?.links?.brokerTermsConditions;
            this.disclosureAgreement_dynamicData =
              result.data?.links?.disclosureAgreement;
            this.disclosureAgreement = this.disclosureAgreement_dynamicData;
            console.log('lang token: ' + sessionStorage.getItem('lanToken'));
            if (sessionStorage.getItem('lanToken') == 'en') {
              this.term_and_conditions = this.brokerTermsConditions;
            } else {
              this.term_and_conditions = this.brokerTermsConditions;
            }
            this.formid = result.data.form?.id;
          } else {
            Swal.fire({
              title: '<strong>HTML <u>example</u></strong>',
              // icon: 'warning',
              html: `<div class="custom-content">${
                result.message ? result.message : result.error
              }</div>`,
              showCloseButton: true,
              showCancelButton: false,
              focusConfirm: false,
              confirmButtonText: 'OK',
              confirmButtonAriaLabel: 'Thumbs up, great!',
              cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
              cancelButtonAriaLabel: 'Thumbs down',
            });
          }
        },
        (error) => {
          if (error.value) {
            this.router.navigate(['error']);
          } else {
          }
        }
      );
  }
  userForm: FormGroup = new FormGroup({
    planEnrollmentDate: new FormControl(''),
    studentId: new FormControl(''),
    givenname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    phonenumber: new FormControl(''),
    apt_suite: new FormControl(''),
    streetaddress: new FormControl(''),
    streetaddressline2: new FormControl(''),
    city: new FormControl(''),
    province: new FormControl(''),
    postalcode: new FormControl(''),
    dateofbirth: new FormControl(''),
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
    workinghours: new FormControl(''),
    hoursperweek: new FormControl(''),
    fusbillId: new FormControl(''),
    formrname: new FormControl(''),
    brokername: new FormControl(''),
    // memberType: new FormControl(''),
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
      studentId: ['', [Validators.required]],
      givenname: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          // Validators.pattern('^(?!\\s)[A-Za-z\\s]+$'),
        ]),
      ],
      lastname: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern('^(?!\\s)[A-Za-z\\s]+$'),
        ]),
      ],
      // email: ["", Validators.compose([Validators.required, emailValidator, Validators.pattern('^(?!\\s)[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern
            ('^(?!\\s)[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
          ,
        ]),
      ],

      // phonenumber: ["", Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern(/^[^A-Za-z@#$%&*{}'";:<>?]+$/)]),],
      phonenumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ]),
      ],
      apt_suite: ['', Validators.compose([apt_suitecheck])],
      streetaddress: ['', Validators.compose([Validators.required])],
      streetaddressline2: [
        '',
        // [Validators.pattern('^(?!\\s)[A-Za-z0-9\\s]+$')],
      ],
      city: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern('^(?!\\s)[A-Za-z\\s]+$'),
        ]),
      ],
      province: ['', Validators.required],
      postalcode: [
        '',
        Validators.compose([Validators.required, postalcodeValidator]),
      ],
      dateofbirth: [
        '',
        Validators.compose([Validators.required, dateofbirthvalidation]),
      ],
      gender: ['', Validators.required],
      foreignStudent: ['', Validators.required],
      parentalinsurance: ['', Validators.required],
      havingspouse: ['', Validators.required],

      uhipprovincialhealth: [''],
      provincialhealth: [''],

      spousefirstname: [''],
      spouselastname: [''],
      spousegender: [''],
      spousedateofbirth: ['04-01-2000'],
      spousehealthcard: [''],

      Spousenameofthecarrier: [''],
      spousecob: [''],

      Dependentchildren: ['', Validators.required],
      enrolledunversity: [''],
      childdsiablility: [''],
      graducationday: [''],
      noofchildren: [''],
      termsandconditions: [''],
      disclouseradvisor: [''],
      recaptchaReactivePerInfo: [''],
      childrenDetails: this.fb.array([this.initChildDetails()]),
      workinghours: ['', Validators.compose([Validators.required])],
      // hoursperweek:[''],
      hoursperweek: [
        '40',
        Validators.compose([Validators.required, validatehoursperweek]),
      ],
      fusbillId: [''],
      formrname: ['', Validators.compose([Validators.required])],
      brokername: ['', Validators.compose([Validators.required])],
      // memberType: ['', Validators.compose([Validators.required])],
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
  greenShiledForm:FormGroup=new FormGroup({
    showGreenShieldProv: new FormControl(),
    greenShiledNumber:new FormControl()
  });
  greenShiledFormValidations(){
    this.greenShiledForm=this.greenShildBuilder.group({
      showGreenShieldProv:['',Validators.required],
      greenShiledNumber:['']
    })
  }

 EquitableForm:FormGroup=new FormGroup({
  EquitableFormProv: new FormControl(),
  EquitableNumber:new FormControl()
  });
  EquitableFormValidations(){
    this.EquitableForm=this.greenShildBuilder.group({
      EquitableFormProv:[''],
      EquitableNumber:['']
    })
  }


  enrolmentFormValidator() {
    this.enrollmentForm = this.enrollmentFormBuilder.group({
      enrollmentSummaryEmail: [''],
      homeAddressSameasBillingAddress: [''],
      enrollmentSummaryApartSuite: [
        '',
        Validators.compose([apt_suitecheck, Validators.maxLength(50)]),
      ],
      enrollmentSummaryStreetAddress: [
        '',
        Validators.compose([Validators.required]),
      ],
      enrollmentSummaryStreetAddressLane2: [''],
      enrollmentSummaryCity: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      enrollmentSummaryProvince: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      enrollmentSummaryPostalCode: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      recaptchaReactive: [''],

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
      enrollmentSummaryCardHolderFirstName: [''], //['', Validators.compose([Validators.required, Validators.pattern("^(?!\\s)[A-Za-z\\s]+$")])],
      enrollmentSummaryCardHolderLastName: [''], //['', Validators.compose([Validators.required, Validators.pattern("^(?!\\s)[A-Za-z\\s]+$")])],
      enrollmentSummaryCardNumnber: [''], // ["", Validators.compose([Validators.required, creditcardvalidation]),],
      enrollmentSummaryExpirymonth: [''], // ['', [Validators.required]],
      enrollmentSummaryExpiryyear: [''], // ['', [Validators.required]],
      // enrollmentSummaryCVV: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(4)])],
      enrollmentSummaryCVV: [''],
    });
  }
  bankPayForm: FormGroup = new FormGroup({
    enrollmentSummaryBankNumber: new FormControl(''),
    enrollmentSummaryTransitNumber: new FormControl(''),
    enrollmentSummaryAccontNumber: new FormControl(''),
    enrollmentBankTextdescription: new FormControl(''),
    reviewAndSignThePadAgreementBtn: new FormControl(''),
    enrollmentSummaryvoidCheckUpload: new FormControl(''),
  });

  bankPayFormValidator() {
    this.bankPayForm = this.bankPayFormBuilder.group({
      enrollmentSummaryBankNumber: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      enrollmentSummaryTransitNumber: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      enrollmentSummaryAccontNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(12),
        ],
      ],
      enrollmentBankTextdescription: ['', [Validators.required]],
      enrollmentSummaryvoidCheckUpload: ['', [Validators.required]],
      // reviewAndSignThePadAgreementBtn:['',[Validators.required]],
      reviewAndSignThePadAgreementBtn: [''],
    });
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
      childInfoFirstName: [
        '',
        Validators.compose([
          Validators.required,
          ,
          // Validators.pattern('^(?!\\s)[A-Za-z\\s]+$'),
          Validators.minLength(1),
        ]),
      ],
      childInfoLastName: [
        '',
        Validators.compose([
          Validators.required,
          ,
          // Validators.pattern('^(?!\\s)[A-Za-z\\s]+$'),
          Validators.minLength(1),
        ]),
      ],
      childInfoGender: ['', [Validators.required]],
      childInfoDOB: ['', [Validators.required]],
      childdisablility: [''],
      childInfoCarrierName: [''],
      childPostGraduate: [''],
      childInfoGraduationday: [''],
      DependentchildInsurence: ['', Validators.required],
    });
  }

  initChildDetails() {
    return (this.childFormGroup = this.childInfoFormBuilder.group({
      childInfoFirstName: [''],
      childInfoLastName: [''],
      childInfoGender: [''],
      childInfoDOB: [''],
      childdisablility: [''],
      childInfoCarrierName: [''],
      childPostGraduate: [''],
      childInfoGraduationday: [''],
      DependentchildInsurence: [''],
    }));
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

  numberOnly(event: any): boolean {
    //we have numeric 48 to 57 it return true when enter number

    const charCode = event.which ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      //if(charCode>48&&charCode<57)
      return false;
    } else return true;
  }


  phoneFormat(event: any) {
    const inputValue = this.userForm.get('phonenumber').value;

    this.userForm
      .get('phonenumber')
      .setValue(this.phoneNoFormat.transform(inputValue), { emitEvent: false });
  }
  termsandconditionsLoaded(event: any) {
    console.log('termsandconditionsLoaded here');
    this.pdfvisibletermsandconditions = false;
  }

  enrollmentFormSubmit(value1: any) {
    // Retrieve the data from sessionStorage and parse it into an object
    let inputData: any = sessionStorage.getItem('Data');
    let validationInputData = typeof inputData != 'object' ? JSON.parse(inputData) : inputData;
    inputData = JSON.parse(inputData);
    if (this.isStudent) {
      validationInputData['plans'] = JSON.parse(sessionStorage.getItem('studentsPlansArray'));
    } else {
      validationInputData['plans'] = JSON.parse(sessionStorage.getItem('plansummarymain'));
    }






    validationInputData['fusebill_paymentMethod'] = this.fusebill_paymentMethod;
    let enrollmentSummaryProvinceval: string =
      this.enrollmentFormControl['enrollmentSummaryProvince'].value;
    //this.paymentMethodSelectCC it means credit card
    if (this.paymentMethodSelectCC) {
      // validationInputData['marital_status'] = this.marital_status;
      validationInputData.signature =
        sessionStorage.getItem('signatureCC') ?? '';
    } else {
    }

    let provincelist = sessionStorage.getItem('provincelist') || '';
    if (provincelist.includes(inputData.province_id)) {
    } else {
      if (this.configresults.assign_default_form == true) {
        inputData.formId = this.configresults.default_form.id;
        inputData.brokershipTransfered = true;
        inputData.originalFormId = this.configresults.form.id;
      } else {
      }
    }

    var fusebillCustomerAddressId = sessionStorage.getItem(
      'fusebillCustomerAddressId'
    );
    if (fusebillCustomerAddressId && fusebillCustomerAddressId.length > 0) {
      inputData['fusebillCustomerAddressId'] =
        sessionStorage.getItem('fusebillCustomerAddressId') || null;
    }
    var fusebillCustomerId = sessionStorage.getItem('fusebillCustomerId');
    if (fusebillCustomerId && fusebillCustomerId.length > 0) {
      inputData.fusebillCustomerId =
        sessionStorage.getItem('fusebillCustomerId') || null;
    }
    var fusebillCustomerBillingAddressId = sessionStorage.getItem(
      'fusebillCustomerBillingAddressId'
    );
    if (
      fusebillCustomerBillingAddressId &&
      fusebillCustomerBillingAddressId.length > 0
    ) {
      inputData.fusebillCustomerBillingAddressId =
        sessionStorage.getItem('fusebillCustomerBillingAddressId') || null;
    }
    var customerId = sessionStorage.getItem('customerId');

    if (customerId && customerId.length > 0) {
      inputData.customerId = sessionStorage.getItem('customerId') || null;
    }

    let statesData: any = this.configprovinceres.filter(
      (item: { shortName: any }) => {
        return (
          item.shortName ===
          (enrollmentSummaryProvinceval == ''
            ? validationInputData.province
            : this.enrollmentFormControl['enrollmentSummaryProvince'].value)
        );
      }
    );

    if (
      typeof validationInputData === 'object' &&
      validationInputData !== null
    ) {
      validationInputData['marital_status'] =
        this.marital_status !== '' ? this.marital_status : '';
      validationInputData['billing_sameas_homeAddress'] = this
        .homeaddressEnrollmentVal
        ? true
        : false; //this.enrollmentFormControl['homeAddressSameasBillingAddress'].value == 'true' ? true : false;
      if (!validationInputData['billing_sameas_homeAddress']) {
        validationInputData['billing_address'] = {
          line1:
            this.enrollmentFormControl['enrollmentSummaryStreetAddress']
              .value == undefined
              ? ''
              : this.enrollmentFormControl['enrollmentSummaryStreetAddress']
                  .value,
          line2:
            this.enrollmentFormControl['enrollmentSummaryStreetAddressLane2']
              .value == undefined
              ? ''
              : this.enrollmentFormControl[
                  'enrollmentSummaryStreetAddressLane2'
                ].value,
          city:
            this.enrollmentFormControl['enrollmentSummaryCity'].value ==
            undefined
              ? ''
              : this.enrollmentFormControl['enrollmentSummaryCity'].value,
          state: statesData.length != 0 ? statesData[0].name : '',
          state_id: statesData.length != 0 ? statesData[0].id : '',
          country: 'Canada',
          country_id: 124,
          apt:
            this.enrollmentFormControl['enrollmentSummaryApartSuite'].value ==
            undefined
              ? ''
              : this.enrollmentFormControl['enrollmentSummaryApartSuite'].value,
        };
      } else {
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
      console.error('Data in sessionStorage is not a valid JSON object.');
    }
    console.log('validationInputData: ' + JSON.stringify(validationInputData));
    let formValid = true;

    if (this.homeaddressEnrollmentVal) {
      this.enrollmentForm
        .get('homeAddressSameasBillingAddress')
        ?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryApartSuite')?.clearValidators();
      this.enrollmentForm
        .get('enrollmentSummaryStreetAddress')
        ?.clearValidators();
      this.enrollmentForm
        .get('enrollmentSummaryStreetAddressLane2')
        ?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryCity')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryProvince')?.clearValidators();
      this.enrollmentForm.get('enrollmentSummaryPostalCode')?.clearValidators();
      for(let control of Object.keys(this.enrollmentForm.controls)){
        this.enrollmentForm.get(control).clearValidators();
        this.enrollmentForm.get(control).updateValueAndValidity();
      }
    }

     if(this.enrollmentForm.valid){
      // var endPoint = '/api/ap/customer/registration';
      var endPoint = '/api/ap/v2/customer/registration/withBackdate';

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


       validationInputData["planAllAmount"] = amount
      validationInputData["taxAllAmount"] =tax
      validationInputData["totalAllAmount"] = total
      validationInputData["totalAmount"] = total;

      validationInputData["gsRegistration"] = this.gsRegistration;
      validationInputData["gsPlans"] = this.gsPlans;
      validationInputData["gsMembershipId"] = this.gsMembershipId;
      validationInputData["eqRegistration"] = this.eqRegistration;
      validationInputData["eqPlans"] = this.eqPlans;
      validationInputData["eqCertificateId"] = this.eqCertificateId;

    console.log('validationInputData',JSON.stringify(validationInputData));
      // return false;
      this.http
        .post(environment.apiUrl + endPoint, validationInputData, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (result: any) => {
            if (result.status == '200') {

              Swal.fire({
                title: "Info",
                // html: error.error.message ? error.error.message : error.error.error,
                html:result.message ,
                // icon: "warning",
                width: "30%",
                showCancelButton: true,
                confirmButtonText: "View Member",
                cancelButtonText:'Add Another Member'
              }).then((result) => {
                if (result.value) {
                  this.router.navigate(['/manageMembers']);
                  console.log("result.value: " + result.value);
                }else{
                  window.location.reload();
                }
              })
            }else{
              Swal.fire({title:'Info',text:result.message||result.data.error||result.error||result.error.error})
            }
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              // html: error.error.message ? error.error.message : error.error.error,
              html: `<div class="custom-content">${
                error.error.message ? error.error.message : error.error.error
              }</div>`,
              // icon: "warning",
              width: '30%',
              showCancelButton: false,
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.value) {
                console.log('result.value: ' + result.value);
              }
            });
          }
        );
    } else {
    }
  }
  public bankformsubmitdetails() {
    var formData: any = new FormData();

    let personalInfo = JSON.parse(sessionStorage.getItem('Data') ?? '');

    let inputData = {
      customerId: parseInt(sessionStorage.getItem('normalcustomerid') ?? ''),
      bankCode: this.bankPayForm.get('enrollmentSummaryBankNumber')?.value,
      branchCode: this.bankPayForm.get('enrollmentSummaryTransitNumber')?.value,
      accountNumber: this.bankPayForm.get('enrollmentSummaryAccontNumber')
        ?.value,

      amount: this._decimalPipe
        .transform(sessionStorage.getItem('totalAmount') ?? '', '1.2-2')
        ?.replace(/,/g, ''),
      totalAmount: this._decimalPipe
        ?.transform(sessionStorage.getItem('totalAmount') ?? '', '1.2-2')
        ?.replace(/,/g, ''),

      totalAmountUI: sessionStorage.getItem('totalAmountUI'),
      enrollmentDate: sessionStorage.getItem('enrollmentdate'),
      customerName: personalInfo.firstName + ' ' + personalInfo.lastName,
    };

    console.log(inputData);

    var encBank = btoa(JSON.stringify(inputData));
    formData.append('session', encBank);
    formData.append('timestamp', new Date().getTime());
    formData.append('files', this.bankfile);

    //console.log(this.bankfile)

    sessionStorage.setItem('session', encBank);

    this.router.navigate(['/signupcomplete']);

    return false;
  }
  public areYouInternationalStudent(value: any) {
    if (value == 'yes') {
      this.userForm.get('provincialhealth')?.reset();
      this.userForm.get('provincialhealth')?.clearValidators();
      this.userForm.get('provincialhealth')?.updateValueAndValidity();
      this.userForm.get('uhipprovincialhealth')?.reset();
      this.userForm.get('uhipprovincialhealth')?.clearValidators();
      this.userForm
        .get('uhipprovincialhealth')
        ?.setValidators([Validators.required]);

      this.checkstudenthealthcardstatus = true;
      this.checkstudenthealthcardstatus_UHIP = false;
      this.checkhealthcardstatus = false;
    } else {
      this.userForm.get('provincialhealth')?.reset();
      this.userForm.get('provincialhealth')?.clearValidators();
      this.userForm
        .get('provincialhealth')
        ?.setValidators([Validators.required]);
      this.userForm.get('uhipprovincialhealth')?.reset();
      this.userForm.get('uhipprovincialhealth')?.clearValidators();
      this.userForm.get('uhipprovincialhealth')?.updateValueAndValidity();
      this.checkstudenthealthcardstatus = false;
      this.checkstudenthealthcardstatus_UHIP = true;

      this.checkhealthcardstatusuhip = false;
    }
  }

  public spouseinfo(event: any) {
    if (event.target.value == 'true') {
      this.spouseinformation = true;
      this.userForm.get('spousefirstname')?.reset();
      this.userForm.get('spousefirstname')?.clearValidators();
      this.userForm
        .get('spousefirstname')
        ?.setValidators(
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            // Validators.pattern('^(?!\\s)[A-Za-z\\s]+$'),
          ])
        );
      this.userForm.get('spouselastname')?.reset();
      this.userForm.get('spouselastname')?.clearValidators();
      this.userForm
        .get('spouselastname')
        ?.setValidators(
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            // Validators.pattern('^(?!\\s)[A-Za-z\\s]+$'),
          ])
        );
      this.userForm.get('spousegender')?.reset();
      this.userForm.get('spousegender')?.clearValidators();
      this.userForm.get('spousegender')?.setValidators([Validators.required]);

      // this.userForm.get('spousedateofbirth')?.reset();
      this.userForm.get('spousedateofbirth')?.clearValidators();
      this.userForm
        .get('spousedateofbirth')
        ?.setValidators(
          Validators.compose([Validators.required, dateofbirthvalidation])
        );

      this.userForm.get('spousehealthcard')?.reset();
      this.userForm.get('spousehealthcard')?.clearValidators();
      this.userForm
        .get('spousehealthcard')
        ?.setValidators([Validators.required]);
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
    console.log('havingchildrenDependentInsurence: ' + childrenVal);
    if (childrenVal == 'true') {
      this.dependentchildInsurenceval = true;
      this.childFormGroup
        .get('childInfoCarrierName')
        ?.setValidators([Validators.required]);
    } else {
      this.childFormGroup.get('childInfoCarrierName')?.reset();
      this.childFormGroup.get('childInfoCarrierName')?.clearValidators();
      this.childFormGroup.get('childInfoCarrierName')?.updateValueAndValidity();
      this.dependentchildInsurenceval = false;
    }
  }

  public enrolledunversity(event: any) {
    console.log('enrolledUnv: ' + event.target.checked);
    if (event.target.checked == true) {
      this.graducationdaycheck = true;
      this.childFormGroup
        .get('childInfoGraduationday')
        ?.setValidators([Validators.required]);
    } else {
      this.childFormGroup.get('childInfoGraduationday')?.reset();
      this.childFormGroup.get('childInfoGraduationday')?.clearValidators();
      this.childFormGroup
        .get('childInfoGraduationday')
        ?.updateValueAndValidity();
      this.graducationdaycheck = false;
    }
  }
  closePopup(id: any) {
    $(`#${id}`).hide();
  }
  closeFormPopup(id:any,form:FormGroup){
    this.closePopup(id);
    form.reset();
  }

  provincelist12345(event: any) {
    // alert(event.target.value)
    if (event.target.value == 'QC') {
      $('#QCproviance').show();
    }
    this.configprovinceres.forEach((element: any) => {
      if (element.shortName == event.target.value) {
        this.provincialHealthcareUrl = element.provincialHealthcareUrl;
        console.log('this.provincialHealthcareUrl',this.provincialHealthcareUrl)
        this.provincialZipcodes = element.zipcodes.split(',');
        this.provincelistid = element.id;
        this.state_id = parseInt(element.fusebillId);
        this.statename = element.name;
      }
    });

    // //console.log(this.userForm.get('postalcode').value)
    if (this.userForm.get('postalcode')?.value) {
      if (
        this.provincialZipcodes.indexOf(
          this.userForm.get('postalcode')?.value[0]
        ) == -1
      ) {
        this.invalidpostalcodeprivince = true;
        this.userForm.get('postalcode')?.markAsTouched();
      } else {
        this.invalidpostalcodeprivince = false;
      }

      if (this.userForm.get('postalcode')?.value.length == 0) {
        this.invalidpostalcodeprivince = false;
      }
    }
    // alert(this.postalvalue)
  }

  // provincelist12345(event:any){
  //   alert('121212');
  // }

  public havingchildren(event: any) {
    console.log('havingchildren: ');
    if (event.target.value == 'true') {
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
    console.log('value >' + value.target.value);
    if (value.target.value == 'false') {
      this.parentalhelathinsuranecheck = false;
    } else {
      this.parentalhelathinsuranecheck = true;
    }
  }

  public avisordisclosure() {
    ///need to check
    if (this.Shared.getlangdiscloure()) {
      if (sessionStorage.getItem('lanToken') == 'en') {
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
    return false;
    this.showSignAndAgreeOrAgree = false;
    this.PADpafaggrementModalShow();
    this.generatePADaggrement = '';
    //     if(sessionStorage.getItem("fileurl") && sessionStorage.getItem("filename") && sessionStorage.getItem("signature")){
    // this.showmodelsign()
    //     }
    //     else{

    let Data = JSON.parse(sessionStorage?.getItem('Data') || '');
    this.agreestatus = false;
    this.signaturestatus = true;
    // if(this.bankdetailsverify == true){

    //   this.bankdetailsverify =true
    // }

    // this.Shared.getMessage()
    if (this.Shared.getMessage()) {
      this.isFileUploaded = false;
    } else {
      this.isFileUploaded = true;
    }

    // alert(this.bankdetailsverify)
    console.log(
      'homeAddressSameasBillingAddress ' +
        this.enrollmentForm.get('homeAddressSameasBillingAddress')?.valid
    );
    if (this.enrollmentForm.get('homeAddressSameasBillingAddress')?.valid) {
      let addressobject = {
        address1:
          this.enrollmentForm.get('enrollmentSummaryStreetAddress')?.value ||
          Data.street_address_line1 ||
          sessionStorage.getItem('addressline1') ||
          '',
        address2:
          this.enrollmentForm.get('enrollmentSummaryStreetAddressLane2')
            ?.value ||
          Data.street_address_line2 ||
          '',
        apt:
          this.enrollmentForm.get('enrollmentSummaryApartSuite')?.value ||
          Data.apt ||
          '',
        city:
          this.enrollmentForm.get('enrollmentSummaryCity')?.value ||
          Data.city ||
          sessionStorage.getItem('billingaddresscity') ||
          '',
        province:
          this.enrollmentForm.get('enrollmentSummaryProvince')?.value ||
          Data.province ||
          this.bankPayForm.get('enrollmentSummaryProvince')?.value ||
          '',
        postalCode:
          this.enrollmentForm.get('enrollmentSummaryPostalCode')?.value ||
          Data.postal_code ||
          sessionStorage.getItem('enrollmentSummaryPostalCode') ||
          '',
        phone: Data.phone_number,
        email: Data.email,
      };
      console.log(
        'addressobject: ' + JSON.stringify('addressobject: ' + addressobject)
      );

      let bankAddress = this.bankverifyDetails.address;
      let bankAdressArr = bankAddress.split(',');
      let bankCity = bankAdressArr[bankAdressArr.length - 2].replace(' ', '');
      let provincePostal = bankAdressArr[bankAdressArr.length - 1];
      let provincePostalArr = provincePostal.split(' ');
      let bankProvince = provincePostalArr[provincePostalArr.length - 3];
      let bankPostalCode =
        provincePostalArr[provincePostalArr.length - 2] +
        ' ' +
        provincePostalArr[provincePostalArr.length - 1];

      let bankobject = {
        name: this.bankverifyDetails.bank.name,
        address: this.bankverifyDetails.bank.address.split(',')[0],
        city: bankAdressArr[bankAdressArr.length - 2].replace(' ', ''),
        province: provincePostalArr[provincePostalArr.length - 3],
        postalCode:
          provincePostalArr[provincePostalArr.length - 2] +
          ' ' +
          provincePostalArr[provincePostalArr.length - 1],
      };
      console.log('bankobject: ' + bankobject);

      let inputData1 = {
        bankCode: this.bankPayForm.get('enrollmentSummaryBankNumber')?.value,
        branchCode: this.bankPayForm.get('enrollmentSummaryTransitNumber')
          ?.value,
        accountNumber: this.bankPayForm.get('enrollmentSummaryAccontNumber')
          ?.value,
      };
      console.log('inputData1: ' + inputData1);

      var fileExtension = '.' + this.bankfile.name.split('.').pop();

      var encBank = btoa(JSON.stringify(inputData1));
      var formData: any = new FormData();
      formData.append('firstName', Data.firstName);
      formData.append('lastName', Data.lastName);
      formData.append('address', JSON.stringify(addressobject));
      formData.append('bank', JSON.stringify(bankobject));
      formData.append(
        'files',
        this.bankfile,
        'void_cheque_' + Date.now() + fileExtension.toLowerCase()
      );
      // formData.append("files", this.bankfile.name,"void.pdf");
      formData.append('session', encBank) || '';
      formData.append('timestamp', new Date().getTime());

      // let padAggrement: string = `${environment.app.grp}api/students/generatePAD`;
      let padAggrement: string = '';

      //this.studentService.padaddgrementdetails(formData).
      this.http.post(padAggrement, formData, {}).subscribe((result: any) => {
        if (result.status == '200') {
          this.generatePADaggrement = result.data.url;
          console.log('generatePADaggrement: ' + this.generatePADaggrement);
          this.generatePADaggrement =
            'https://testapi.groupbenefitz.aitestpro.com/app/server/PAD_Agreement_l_1700036759458.pdf';
          // jQuery("#PADpafaggrement-modal").modal("show");
          sessionStorage.setItem('fileurl', result.data.url);
          sessionStorage.setItem('filename', result.data.filename);
        } else {
          Swal.fire({
            title: 'Error',
            text: result.message ? result.message : result.error,
            width: '30%',
            showCancelButton: false,
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.value) {
            } else {
              // this.router.navigate(['pages/signup-form']);
            }
          });
        }
      });
    } else {
      this.bankPayForm.markAsTouched();
      this.bankPayForm.get('enrollmentSummaryBankNumber')?.markAsTouched();
      this.bankPayForm.get('enrollmentSummaryTransitNumber')?.markAsTouched();
      this.bankPayForm.get('enrollmentSummaryAccontNumber')?.markAsTouched();
      this.bankPayForm.get('enrollmentSummaryvoidCheckUpload')?.markAsTouched();
      // this.bankPayForm.get("checkbankdetails").markAsTouched();
      this.enrollmentForm.get('enrollmentSummaryApartSuite')?.markAsTouched();
      this.enrollmentForm
        .get('enrollmentSummaryStreetAddress')
        ?.markAsTouched();
      this.enrollmentForm.get('enrollmentSummaryCity')?.markAsTouched();
      this.enrollmentForm.get('enrollmentSummaryProvince')?.markAsTouched();
      this.enrollmentForm.get('enrollmentSummaryPostalCode')?.markAsTouched();

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
    console.log('PADpafaggrementModalClose working this function');
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
      console.log('sign touched');
      this.signaturemessagecc = false;
    } else {
      console.log('sign not toched');
    }
    this.signaturePadClear = true;
    this.signaturemessagecc = false;

    const base64Data = this.signaturePadCC.toDataURL();
    this.signatureImgcc = base64Data;
    sessionStorage.setItem('signatureCC', this.signatureImgcc);
  }

  postSecondaryShow() {
    $('#postSecondaryStudent').show();
  }

  public padLoaded(event: any) {}
  public voidcheckupload(event: any) {
    var fileExtension = '.' + event.target.files[0].name.split('.').pop();

    // event.target.files[0].name ="void_cheque_"+Date.now()+fileExtension

    // "void_cheque_"+Date.now()+fileExt
    //console.log(event)
    this.isFileUploaded = true;
    this.imagedisplay = null;
    // alert(event.target.files[0].name.replace(event.target.files[0].name,"void.pdf"))
    this.bankfile = event.target.files[0];
    // this.bankfile.name = (this.bankfile.name,"void_cheque_"+Date.now()+fileExtension)
    // alert(fileExtension.toLowerCase())
    this.Shared.setMessage(this.bankfile);
    var allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'application/pdf',
    ];

    let error = false;

    let message = '';

    if (allowedMimes.includes(this.bankfile.type)) {
      if (this.bankfile.size <= 300 * 1024) {
        //300KB

        error = false;
      } else {
        error = true;
        message = 'File size is too large,maximum file size is 300kb';
      }
    } else {
      error = true;

      message = 'Invalid file type. Only jpg, png image,pdf files are allowed.';
    }

    if (error) {
      Swal.fire({
        title: 'Error',
        html: message,
        width: '50%',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.value) {
          this.bankPayForm.get('enrollmentSummaryvoidCheckUpload')?.reset();
          this.isFileUploaded = true;
        } else {
        }
      });
    } else {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      if (event.target.files[0].type == 'application/pdf') {
        // alert("1")
        this.pdfview = true;
        this.normalview = false;
      } else {
        this.pdfview = false;
        this.normalview = true;
      }

      reader.onload = (_event) => {
        this.imagedisplay = reader.result;
        console.log('imgedisplay :', this.imagedisplay);
      };

      // let id = parseInt(sessionStorage.getItem("normalcustomerid"));
    }

    // sessionStorage.setItem("files", event.target.files[0]);
    // localStorage.setItem("files", JSON.stringify(event.target.files[0]));

    // sessionStorage.setItem("voidCheque",this.bankfile)
  }

  public spousehealthcard(event: any) {
    // alert("spousehealthcard")
    if (event.target.value == 'true') {
      this.spousehealthcardinfo = true;
      this.userForm.get('Spousenameofthecarrier')?.reset();
      this.userForm.get('Spousenameofthecarrier')?.clearValidators();
      this.userForm
        .get('Spousenameofthecarrier')
        ?.setValidators(
          Validators.compose([
            Validators.required,
            // Validators.pattern('^(?!\\s)[A-Za-z0-9\\s]+$'),
          ])
        );

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
    this.childInfoModalAddAndUpdateButton = 'Add';
    this.dependentchildInsurenceval = false;
    this.childFormGroup
      .get('childInfoFirstName')
      ?.setValidators(
        Validators.compose([
          Validators.required,
          // Validators.pattern('^(?!\\s)[A-Za-z\\s]+$'),
          Validators.minLength(1),
        ])
      );
    this.childFormGroup
      .get('childInfoLastName')
      ?.setValidators(
        Validators.compose([
          Validators.required,
          // Validators.pattern('^(?!\\s)[A-Za-z\\s]+$'),
          Validators.minLength(1),
        ])
      );

    // this.childFormGroup.get('childInfoGender')?.clearValidators();

    this.childFormGroup.get('DependentchildInsurence')?.clearValidators();
    this.childFormGroup
      .get('DependentchildInsurence')
      ?.setValidators(Validators.required);

    // const model=new Modal(this.childInfoModal.nativeElement);
    // model.show();
    $('#childInfoModal').show();
  }

  advisourediscloserLoaded(event: any) {
    this.pdfvisibleadvisouredisclosure = false;
  }

  public termandconditions() {
    console.log('termscondition***********************');
    if (this.Shared.getlangterms()) {
      if (sessionStorage.getItem('lanToken') == 'en') {
        this.term_and_conditions = this.brokerTermsConditions;
      } else {
        this.term_and_conditions = this.brokerTermsConditions;
      }
      console.log('url print: ' + this.term_and_conditions);
    } else {
    }
    // document.getElementById('termsAndConditionsModal')?.show();
    // const model=new Modal(this.termsAndConditionsModal.nativeElement);
    // model.show();
  }

  changeTextToUppercase(field: any) {
    console.log('studentId field: ' + field);
    this.userForm
      .get(field)
      ?.setValue(this.userForm.controls[field].value.toUpperCase());
  }

  changeTextToUppercasePostalCode(field: any, event: any) {
    this.userForm
      .get(field)
      ?.setValue(this.userForm.controls[field].value.toUpperCase());

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
    this.enrollmentForm
      .get(field)
      ?.setValue(this.enrollmentForm.controls[field].value.toUpperCase());
    this.postalvalue = event.target.value;
    console.log('postalvalue12212: ' + this.postalvalue);
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
    console.log(
      'userForm validations1233 ' + JSON.stringify(this.userForm.value)
    );
    // console.log("userForm validations " + JSON.stringify(this.userForm));

    // this.userFormControl
    // if(this.userForm.valid){
    // console.log(this.userForm);

    let userFormDetails = this.userForm.value;
    let childInfo = this.childInfoAddDataArray;

    let childInfoArray = [];

    for (let childData of childInfo) {
      let childObject: any = {
        first_name: childData.childInfoFirstName,
        last_name: childData.childInfoLastName,
        firstName: childData.childInfoFirstName,
        lastName: childData.childInfoLastName,
        gender: childData.childInfoGender,
        date_of_birth: moment(childData.childInfoDOB).format('YYYY-MM-DD'),
        dob: moment(childData.childInfoDOB).format('YYYY-MM-DD'),
        is_child_having_healthcard:
          childData.DependentchildInsurence == 'true' ? true : false,
        child_carrier_name: childData.childInfoCarrierName,
        enrolledInUniversity:
          childData.childPostGraduate == 'true' ? true : false,
        isDisabled: childData.childdisablility == 'true' ? true : false,
        graduationDay: childData.childInfoGraduationday,
      };
      childInfoArray.push(childObject);
    }

    console.log(
      'userFormDetails.havingspouse: ' + userFormDetails.havingspouse
    );
    let spouseInfo = {};
    if (userFormDetails.havingspouse) {
      spouseInfo = {
        first_name: userFormDetails.spousefirstname,
        last_name: userFormDetails.spouselastname,
        firstName: userFormDetails.spousefirstname,
        lastName: userFormDetails.spouselastname,
        // email:userFormDetails.spouseemail || "",
        email: '',
        date_of_birth: moment(userFormDetails.spousedateofbirth).format(
          'YYYY-MM-DD'
        ),
        dob: moment(userFormDetails.spousedateofbirth).format('YYYY-MM-DD'),
        gender: userFormDetails.spousegender,
        is_spouse_having_healthcard:
          userFormDetails.havingspouse == 'true' ? true : false,
        spouse_carrier_name: userFormDetails.Spousenameofthecarrier,
        cobCoverage: userFormDetails.spousecob,
      };
    } else {
      spouseInfo = {};
    }

    let statesData = this.configprovinceres.filter(
      (item: { shortName: any }) => {
        return item.shortName === userFormDetails.province;
      }
    );
    let statesId: any;
    let statesName: any;
    if (statesData.length > 0) {
      statesId = statesData[0].id;
      statesName = statesData[0].name;
    } else {
      statesId = '';
      statesName = '';
    }

    // console.log("configprovinceres: "+JSON.stringify(this.configprovinceres))
    console.log('state id: ' + statesData);
    console.log('state id: ' + JSON.stringify(statesData)); //STUDENT
    // this.isStudent=userFormDetails.memberType.toLowerCase()=='student'?true:false;
    let personalInfoData = {
      isStudent:this.isStudent, //userFormDetails.memberType == 'STUDENT' ? true : false,
      brokerId: parseInt(userFormDetails.brokername),
      recaptchaCheck: false,
      g_recaptcha_response: 'test',
      planEnrollmentDate: moment(
        userFormDetails.planEnrollmentDate,
        'MMM-DD-YYYY'
      ).format('YYYY-MM-DD'), //userFormDetails.planEnrollmentDate,
      enrollmentDate: moment(
        userFormDetails.planEnrollmentDate,
        'MMM-DD-YYYY'
      ).format('YYYY-MM-DD'), //userFormDetails.planEnrollmentDate,
      EnrollmentDate: moment(
        userFormDetails.planEnrollmentDate,
        'MMM-DD-YYYY'
      ).format('YYYY-MM-DD'), //userFormDetails.planEnrollmentDate,

      first_name: userFormDetails.givenname,
      firstName: userFormDetails.givenname,
      last_name: userFormDetails.lastname,
      lastName: userFormDetails.lastname,
      email: userFormDetails.email,
      phone_number: userFormDetails.phonenumber,
      street_address_line1: userFormDetails.streetaddress,
      street_address_line2:
        userFormDetails.streetaddressline2 == undefined
          ? ''
          : userFormDetails.streetaddressline2,
      city: userFormDetails.city,
      province: userFormDetails.province,
      province_id: statesId,
      country: 'Canada',
      country_id: 124,
      postal_code: userFormDetails.postalcode,
      date_of_birth: moment(userFormDetails.dateofbirth).format('YYYY-MM-DD'),
      dob: moment(userFormDetails.dateofbirth).format('YYYY-MM-DD'),
      gender: userFormDetails.gender,
      universityName: 'AUSU' || '',
      enrolmentProgramName: '',
      date_of_hiring: moment(
        userFormDetails.planEnrollmentDate,
        'DD-MMM-YYYY'
      ).format('YYYY-MM-DD'), //userFormDetails.planEnrollmentDate,
      working_20hours: true,
      weeklyHours: 0,
      hours_per_week: 40, //userFormDetails.hoursperweek==undefiend?''userFormDetails.hoursperweek:
      foreignStudent: userFormDetails.foreignStudent == 'true' ? true : false,
      isUHIP: userFormDetails.uhipprovincialhealth == 'true' ? true : false,
      coveredParentalHealthInsurance:
        userFormDetails.parentalinsurance == 'true' ? true : false,
      provincial_health_coverage:
        userFormDetails.provincialhealth == 'true' ? true : false,
      work_visa: '',
      having_spouse: userFormDetails.havingspouse == 'true' ? true : false,
      spouse_details:userFormDetails.havingspouse == 'false'?{}: spouseInfo,
      having_dependent_children:
        userFormDetails.Dependentchildren == 'true' ? true : false,
      no_of_children:
        userFormDetails.Dependentchildren == 'true'
          ? this.noOfChildrenChangedValue
          : 0,
      children_details: childInfoArray.length > 0 ? childInfoArray : '',
      signature: 'digiSign',
      fusebillCustomer: true,
      formId: parseInt(userFormDetails.formrname), //this.formid,
      termsandconditions: '', //userFormDetails.termsandconditions,
      disclouseradvisor: true,
      state: statesName,
      state_id: statesId,
      currency: 'CAD',
      currencySymbol: '$',
      apt:
        userFormDetails.apt_suite == undefined ? '' : userFormDetails.apt_suite,
      studentId: userFormDetails.studentId,
      beneficiaries_details: [],
      employeeKey: '',
      employeeGeneric: true,
    };

    // personalInfoData = {
    //   isStudent: true,
    //   brokerId: 1309,
    //   recaptchaCheck: false,
    //   g_recaptcha_response: 'test',
    //   planEnrollmentDate: '2024-03-01',
    //   enrollmentDate: '2024-03-01',
    //   EnrollmentDate: '2024-03-01',
    //   first_name: 'ganesh',
    //   firstName: 'ganesh',
    //   last_name: 'ganeee',
    //   lastName: 'ganeee',
    //   email: 'dsdsddd1qsc@aitestpro.com',
    //   phone_number: '+1 (234)567-8900',
    //   street_address_line1: 'asasa',
    //   street_address_line2: '',
    //   city: 'kanata',
    //   province: 'ON',
    //   province_id: 12,
    //   country: 'Canada',
    //   country_id: 124,
    //   postal_code: 'K2K3E7',
    //   date_of_birth: '2008-01-04',
    //   dob: '2008-01-04',
    //   gender: 'Female',
    //   universityName: 'AUSU',
    //   enrolmentProgramName: '',
    //   date_of_hiring: '2024-03-01',
    //   working_20hours: true,
    //   weeklyHours: 0,
    //   hours_per_week: 40,
    //   foreignStudent: false,
    //   isUHIP: false,
    //   coveredParentalHealthInsurance: false,
    //   provincial_health_coverage: true,
    //   work_visa: '',
    //   having_spouse: false,
    //   spouse_details: {
    //     first_name: null,
    //     last_name: null,
    //     firstName: null,
    //     lastName: null,
    //     email: '',
    //     date_of_birth: 'Invalid date',
    //     dob: 'Invalid date',
    //     gender: null,
    //     is_spouse_having_healthcard: false,
    //     spouse_carrier_name: null,
    //     cobCoverage: null,
    //   },
    //   having_dependent_children: false,
    //   no_of_children: 0,
    //   children_details: '',
    //   signature: 'digiSign',
    //   fusebillCustomer: true,
    //   formId: 2146,
    //   termsandconditions: '',
    //   disclouseradvisor: true,
    //   state: 'Ontario',
    //   state_id: 12,
    //   currency: 'CAD',
    //   currencySymbol: '$',
    //   apt: '',
    //   studentId: '12121',
    //   beneficiaries_details: [],
    //   employeeKey: '',
    //   employeeGeneric: true,
    // };

    console.log('personalInfoData: ' + JSON.stringify(personalInfoData));

    this.applicantfirstname = userFormDetails.givenname;
    //API calling https://testapi.groupbenefitz.aitestpro.com/api/students/validation
    let dependent_info = true;
    if (this.userForm.get('Dependentchildren')?.value === 'true') {
      if (this.childTableRowsLength > 0) dependent_info = true;
      else dependent_info = false;
    } else {
      dependent_info = true;
    }

    if (
      this.userForm.valid &&
      !this.invalidpostalcodeprivince &&!this.checkhealthcardstatus&&
      dependent_info
    ) {
      //https://testadminapi.groupbenefitz.aitestpro.com/api/ap/customer/plans
      let validationdata: string = `${environment.apiUrl}/api/ap/customer/plans`;
      var accessToken = sessionStorage.getItem('accessToken');
      //this.studentService.validation(personalInfoData)

      this.http
        .post(validationdata, personalInfoData, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (result: any) => {
            console.log('json result: ' + JSON.stringify(result));
            if (result.status == '200') {
              let countrydetails = sessionStorage.getItem('countrydetails');
              let provincelist = sessionStorage.getItem('provincelist');
              // sessionStorage.clear();
              // this.isStudent=personalInfoData['isStudent'];
              this.specialpackages = result.data.packages;
              this.countrydetails = result.data.countries;
              this.selectedTab = 'tab2';
              this.planAmount = 0;
              this.tab1Img = true;

              console.log('is student', this.isStudent);
              // this.toastrService.success("Selection of Health Plan is must", "");
              // sessionStorage.removeItem("studentsPlansArray");
              // sessionStorage.setItem("plansummary", "[]");
              // sessionStorage.setItem("selectedPlans", "{}");
              // sessionStorage.setItem("plansummarymain", "[]");
              // sessionStorage.setItem("plansummaryopt", "[]");
              // sessionStorage.setItem("totalAmount", "0");
              // sessionStorage.setItem("totalAmountUI", "0");

              // sessionStorage.setItem("plansummary", "[]");
              // sessionStorage.setItem("selectedPlans", "{}");
              // sessionStorage.setItem("plansummarymain", "[]");
              // sessionStorage.setItem("plansummaryopt", "[]");
              // sessionStorage.setItem("studentsPlansArray", "[]");
              // sessionStorage.setItem("allproducts", "[]");
              let removeItems = [
                'plansummary',
                'selectedPlans',
                'plansummarymain',
                'plansummaryopt',
                'studentsPlansArray',
                'allproducts',
                'totalAmount',
                'totalAmountUI',
                'planDetailsArray',
              ];
              let sessionStorageKeys = Object.keys(sessionStorage);

              sessionStorageKeys.forEach((key) => {
                if (removeItems.includes(key)) {
                  sessionStorage.removeItem(key);
                }
              });

              sessionStorage.setItem('Data', JSON.stringify(personalInfoData));
              sessionStorage.setItem('countrydetails', countrydetails ?? '');
              sessionStorage.setItem('provincelist', provincelist ?? '');
              sessionStorage.setItem('stateid', result.data.province.id);
              sessionStorage.setItem(
                'maritalStatus',
                result.data.customer.maritalStatus
              );
              sessionStorage.setItem(
                'planDetailsArray',
                JSON.stringify(this.specialpackages)
              );
              sessionStorage.setItem(
                'enrollmentdate',
                personalInfoData.planEnrollmentDate
              );
              // sessionStorage.setItem("completeapplicantinfo", this.completeapplicantinfo);
              this.marital_status = result.data.customer.maritalStatus;
              const elements =
                this.elementRef.nativeElement.getElementsByClassName(
                  'imgdisplay1'
                );
              for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'block';
                elements[i].style.display = 'inline';
              }
              // this.applicantSpousename = personalInfoData['spouse_details']['first_name'] || "";
              let childarry: any = [];
              this.childInfoAddDataArray.forEach((element: any) => {
                childarry.push(element.childInfoFirstName);
              });
              this.applicantChildrenname = childarry.toString() || '';
              console.log("userFormDetails",userFormDetails)
              if (
                userFormDetails.havingspouse=='true' &&
                userFormDetails.Dependentchildren == 'true'
              ) {
                this.completeapplicantinfo =
                  this.lang.based_on_the_information_you_spouse+" "
                 +   userFormDetails.spousefirstname.charAt(0).toUpperCase() +
                 userFormDetails.spousefirstname.slice(1)+" " +this.lang.and_your_dependent_s_ +" "+ this.applicantChildrenname.charAt(0).toUpperCase() +
                 this.applicantChildrenname.slice(1) +
                  " " +
                  this.lang.are_eligible_to_apply_for_the_following_plans;
              }

              // return false;
              else if (userFormDetails.havingspouse=='true') {
                this.completeapplicantinfo =
                  this.lang.based_on_the_information_you_spouse +" "+
                  userFormDetails.spousefirstname.charAt(0).toUpperCase() +
                  userFormDetails.spousefirstname.slice(1) +
                 " " +
                  this.lang.are_eligible_to_apply_for_the_following_plans;
              } else if (userFormDetails.Dependentchildren == 'true') {
                this.completeapplicantinfo =
                  this.lang.based_on_the_information_you_dependants +
                  " " +
                  this.applicantChildrenname.charAt(0).toUpperCase() +
                  this.applicantChildrenname.slice(1) +
                  " " +
                  this.lang.are_eligible_to_apply_for_the_following_plans;
              } else {
                this.completeapplicantinfo = this.lang.info_eligibility_plans;
              }
              console.log('this.completeapplicantinfo',this.completeapplicantinfo);
              this.completeapplicantinfo = this.completeapplicantinfo.replace(
                'you',
                this.applicantfirstname.charAt(0).toUpperCase() +  this.applicantfirstname.slice(1),
              );
              this.completeapplicantinfo = this.completeapplicantinfo.replace(/your/g,'his');

            } else {
              Swal.fire({
                title: 'Error',
                text: result.message ? result.message : result.error,
                showCancelButton: false,
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result.value) {
                } else {
                }
              });
            }
          },
          (error) => {
            console.log('error', error);
            if (
              error.error.errorCode == 'GBS_CV_0009_A' ||
              error.error.errorCode == 'GBS_CV_0010'
            ) {
              //"GBS_CV_0010"
              console.log('error', error); //409
              Swal.fire({
                title: 'Error',
                // html: error.error.message ? error.error.message : error.error.error,
                html: `<div class="custom-content">${
                  error.error.message ? error.error.message : error.error.error
                }</div>`,
                // icon: "warning",
                // width: "30%",
                showCancelButton: true,
                confirmButtonText: 'Visit Portal',

                // text:'codes',
              }).then((result) => {
                if (result.value) {
                  let link =
                    error.error.customerportalLink != undefined ||
                    error.error.customerportalLink != null ||
                    error.error.customerportalLink != ''
                      ? error.error.customerportalLink
                      : error.error.data.customerportalLink;

                  window.open(link);
                  // let url=this.location['origin']
                  // this.router.navigate([url+'/portal/']);
                  // this.router.navigate(['/portal/']);
                  if (
                    error.error.message.includes('incomplete') ||
                    error.error.message.includes(
                      'The email address already exists'
                    )
                  ) {
                    let formLink = sessionStorage.getItem('formlink');
                    // sessionStorage.clear();

                    // this.router.navigate([formLink]);
                    // window.location.reload();
                  }
                } else {
                }
              });
            } else {
              console.log('error', error); //409
              Swal.fire({
                title: 'Error',
                // html: error.error.message ? error.error.message : error.error.error,
                html: `<div class="custom-content">${
                  error.error.error.message
                    ? error.error.error.message
                    : error.error.error.error
                }</div>`,
                // icon: "warning",
                width: '30%',
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
                    error.error.message.includes('incomplete') ||
                    error.error.message.includes(
                      'The email address already exists'
                    )
                  ) {
                    let formLink = sessionStorage.getItem('formlink');
                    // sessionStorage.clear();

                    // this.router.navigate([formLink]);
                    // window.location.reload();
                  }
                } else {
                }
              });
            }
          }
        );
    } else {
      this.scrollToFirstInvalidControl1();
      const invalid = [];
      const controls = this.userForm.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
              invalid.push(name);
          }
      }
   console.log(invalid)

    }
  }

  checkEmailValidation(e:any){
    console.log('asasassasasa');
    let val=e.currentTarget.value;
    let notAlloewdSecvence=['"' ,'(', ')' ,'.' ,',', ':' ,';', '<' ,'>','@', '[' ,']'];
    if(e.key==val.charAt(val.length-1)){
      if(notAlloewdSecvence.includes(val.charAt(val.length-1))){
        return false;
  }
    }

    else{
      return true;
    }
 }

  private scrollToFirstInvalidControl1() {
    const firstInvalidControl: HTMLElement =
      this.el.nativeElement.querySelector(
        'form .ng-invalid' || 'form .ng-untouched'
      );
    // //console.log(firstInvalidControl);
    window.scroll({
      top: this.getTopOffset(firstInvalidControl),
      left: 0,
      behavior: 'smooth',
    });
  }
  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 300;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }

  public uhipprovincialhealth(value: any) {
    console.log('value: ' + value);
    if (value.target.value == 'true') {
      //const modal = new Modal(this.checkphcpstatusModal.nativeElement);//checkuhipstatusModal
      //modal.show();

      this.checkhealthcardstatusuhip = false;
    } else {

      $('#checkuhipstatusModalStudent').show();
      this.checkhealthcardstatusuhip = true;
    }
  }

  selectTab(tabName: string): void {
    this.selectedTab = tabName;

    this.planssummary = JSON.parse(sessionStorage.getItem("plansummarymain"));
     //console.log(this.planssummary);



    if (tabName == 'tab1') {
      const elements =
        this.elementRef.nativeElement.getElementsByClassName('imgdisplay1');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
        // elements[i].style.display = 'inline';
      }
      const elements1 =
        this.elementRef.nativeElement.getElementsByClassName('imgdisplay2');
      for (let i = 0; i < elements1.length; i++) {
        elements1[i].style.display = 'none';
        // elements1[i].style.display = 'inline';
      }
    }

    if (tabName == 'tab2') {
      // this.cartcheckvalue=false;
      if(this.isStudent){
      const elements =
        this.elementRef.nativeElement.getElementsByClassName('imgdisplay2');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
        // elements[i].style.display = 'inline';
      }
      sessionStorage.removeItem('studentsPlansArray');
      // this.planAmount = 0;
      sessionStorage.removeItem('totalAmount');

      sessionStorage.setItem('totalAmount', this.planAmount);
      setTimeout(() => {
        let selectedstudentPlans = JSON.parse(
          sessionStorage.getItem('allproducts') ?? '[]'
        );
        // selectedstudentPlans.forEach((element: any) => {
        //   document.getElementById("plancheck" + element.id)?.click();
        //   // $('#plancheck'+element.id).click();
        // });
        sessionStorage.setItem('allproducts', '');
      }, 100);
    }
    else{
      // return false;
      this.planssummary = JSON.parse(sessionStorage.getItem("plansummary"));
    let obj = {};
    if (this.planssummary) {

      this.planssummary.forEach((element,index) => {
        setTimeout(() => {
          const dom: HTMLElement = this.elementRef.nativeElement;
          const plan: any = dom.querySelector("#plancheck" + element.id);
          console.log(element)
          if (element.options && element.options.length > 1) {
            element.products.forEach((products,index) => {
              console.log("plans",products.id);
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
              $("#plancheck" + products.id).click();//prop("checked", true)
            })




            // $("#plancheck" + element.id).prop("checked", true);
          }

        }, 100);


      });


    }

    }
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
    const elements =
      this.elementRef.nativeElement.getElementsByClassName('ProvinceClass');
    for (let i = 0; i < elements.length; i++) {
      elements.value = '';
    }
  }
  public childrenPopupClose() {
    this.childFormGroup.reset();
    // this.childFormGroup.get('childInfoGender')?.setValue('');
    // this.creditCardForm.get('enrollmentSummaryExpirymonth')?.setValue('01');
    this.childFormGroup.clearValidators();
    this.childFormGroup.updateValueAndValidity();
    // this.childFormGroup.get('childInfoGender')?.setValue('Select');
    this.graducationdaycheck = false;
  }

  public onCheckboxChangestudent(
    e: any,
    plan: any,
    planname: any,
    planid: any,
    productname: any,
    product: any,
    index: any
  ) {
    this.plansnexttab = false;
    let plansproductarray: any = [];
    let allproductsarray: { name: any }[] = [];
    let plansproductarray1 = [];
    let allproductsarray1 = [];

    if (e.target.checked) {
      if (productname == 'Health Plan') {
        this.cartcheckvalue = true;
      }
      if (sessionStorage.getItem('studentsPlansArray')) {
        plansproductarray = JSON.parse(
          sessionStorage.getItem('studentsPlansArray') ?? '[]'
        );
      } else {
        plansproductarray = [];
      }
      if (sessionStorage.getItem('allproducts')) {
        allproductsarray = JSON.parse(
          sessionStorage.getItem('allproducts') ?? '[]'
        );
      } else {
        allproductsarray = [];
      }
      if (plansproductarray.length == 0) {
        let productobj = {
          id: product.id,
          productId: product.productId,
          name: product.name,
          planProductId: product.planProductId,
          price: product.price1 || product.price,
          tax: product.calculatedTax.toString()
            ? product.calculatedTax.tax.toString()
            : '0',
          total: product.calculatedTax.toString()
            ? product.calculatedTax.total.toString()
            : '0',
          tax_details:
            product.bundledTaxes && product.bundledTaxes.length > 0
              ? product.bundledTaxes
              : product.taxesDataJSON,
          calculatedTax: product.calculatedTax,
          bundledProducts: product.bundledProducts,
          planCoverage: product.planCoverage,
        };
        let obj: any = {
          packageId: plan.packageId,
          packageName: '',
          planproductname: productobj.name,
          groupid: plan.planLevel,
          groupName: '',
          id: planid,
          name: planname,
          planLevel: plan.planLevel,
          fusebillPlanID: parseInt(plan.fusebillId),
          planFrequencyID: parseInt(plan.frqMonthly),
          isBundle: plan.isBundle,
          bundledProducts: [],
          products: [],
        };
        obj.products.push(productobj);
        allproductsarray.push(productobj);
        plansproductarray.push(obj);
        sessionStorage.setItem(
          'studentsPlansArray',
          JSON.stringify(plansproductarray)
        );
        sessionStorage.setItem('allproducts', JSON.stringify(allproductsarray));
      } else {
        let index: any = this.getindexofplan(product.name);
        if (index != 'false') {
          const checkbox = document.getElementById(
            'plancheck' + plansproductarray[index].products[0].id
          ) as HTMLInputElement | null;
          if (checkbox != null) {
            checkbox.checked = false;
          }

          let productobj = {
            id: product.id,
            productId: product.productId,
            name: product.name,
            planProductId: product.planProductId,
            price: product.price1 || product.price,
            tax: product.calculatedTax.toString()
              ? product.calculatedTax.taxtoString()
              : 0,
            total: product.calculatedTax.toString()
              ? product.calculatedTax.total.toString()
              : 0,
            tax_details:
              product.bundledTaxes && product.bundledTaxes.length > 0
                ? product.bundledTaxes
                : product.taxesDataJSON,
            calculatedTax: product.calculatedTax,
            bundledProducts: product.bundledProducts,
            planCoverage: product.planCoverage,
          };
          let obj: any = {
            packageId: plan.packageId,
            packageName: '',

            planproductname: productobj.name,

            groupid: plan.planLevel,
            groupName: '',
            id: planid,
            name: planname,
            planLevel: plan.planLevel,
            fusebillPlanID: parseInt(plan.fusebillId),
            planFrequencyID: parseInt(plan.frqMonthly),
            isBundle: plan.isBundle,
            bundledProducts: [],
            products: [],
          };

          for (let k = 0; k < allproductsarray.length; k++) {
            if (
              allproductsarray[k].name ==
              plansproductarray[index].planproductname
            ) {
              allproductsarray.splice(k, 1);
            }
          }

          plansproductarray.splice(index, 1);
          obj.products.push(productobj);
          allproductsarray.push(productobj);
          plansproductarray.push(obj);
          sessionStorage.setItem(
            'studentsPlansArray',
            JSON.stringify(plansproductarray)
          );
          sessionStorage.setItem(
            'allproducts',
            JSON.stringify(allproductsarray)
          );
        } else {
          console.log('product not exist');

          let productobj = {
            id: product.id,
            productId: product.productId,
            name: product.name,
            planProductId: product.planProductId,
            price: product.price1 || product.price,
            tax: product.calculatedTax.toString()
              ? product.calculatedTax.tax.toString()
              : 0,
            total: product.calculatedTax.toString()
              ? product.calculatedTax.total.toString()
              : 0,
            tax_details:
              product.bundledTaxes && product.bundledTaxes.length > 0
                ? product.bundledTaxes
                : product.taxesDataJSON,
            calculatedTax: product.calculatedTax,
            bundledProducts: product.bundledProducts,
            planCoverage: product.planCoverage,
          };
          let obj: any = {
            packageId: plan.packageId,
            packageName: '',

            planproductname: productobj.name,

            groupid: plan.planLevel,
            groupName: '',
            id: planid,
            name: planname,
            planLevel: plan.planLevel,
            fusebillPlanID: parseInt(plan.fusebillId),
            planFrequencyID: parseInt(plan.frqMonthly),
            isBundle: plan.isBundle,
            bundledProducts: [],
            products: [],
          };
          obj.products.push(productobj);
          allproductsarray.push(productobj);
          plansproductarray.push(obj);
          sessionStorage.setItem(
            'studentsPlansArray',
            JSON.stringify(plansproductarray)
          );
          sessionStorage.setItem(
            'allproducts',
            JSON.stringify(allproductsarray)
          );
        }
      }
    } else {
      if (planname.includes('Health Benefits')) {
        // this.AddOnsChecked=false;

        let selectedstudentPlans = JSON.parse(
          sessionStorage.getItem('allproducts') ?? '[]'
        );

        selectedstudentPlans.forEach((element: any) => {
          document.getElementById('plancheck' + element.id)?.click();
          // $('#plancheck'+element.id).click();
        });

        sessionStorage.setItem('studentsPlansArray', '[]');
        sessionStorage.setItem('allproducts', '[]');
      }

      if (sessionStorage.getItem('studentsPlansArray')) {
        plansproductarray = JSON.parse(
          sessionStorage.getItem('studentsPlansArray') ?? '[]'
        );
      } else {
        plansproductarray = [];
      }
      if (sessionStorage.getItem('allproducts')) {
        allproductsarray = JSON.parse(
          sessionStorage.getItem('allproducts') ?? '[]'
        );
      } else {
        allproductsarray = [];
      }
      let studentPlansremove = JSON.parse(
        sessionStorage.getItem('studentsPlansArray') ?? '[]'
      );
      let studentAllProductArrayremove = JSON.parse(
        sessionStorage.getItem('allproducts') ?? '[]'
      );
      for (let i = 0; i < studentPlansremove.length; i++) {
        if (studentPlansremove[i].name === planname) {
          for (let j = 0; j < studentPlansremove[i].products.length; j++) {
            console.log(studentPlansremove[i].products[j].name);

            console.log(product.name);
            if (studentPlansremove[i].products[j].name === product.name) {
              studentPlansremove.splice(i, 1);
              for (let k = 0; k < studentAllProductArrayremove.length; k++) {
                if (studentAllProductArrayremove[k].id == product.id) {
                  studentAllProductArrayremove.splice(k, 1);

                  // studentPlansremove.splice(i,1);
                }
              }
              sessionStorage.setItem(
                'studentsPlansArray',
                JSON.stringify(studentPlansremove)
              );
              console.log('here');
              sessionStorage.setItem(
                'allproducts',
                JSON.stringify(studentAllProductArrayremove)
              );
            }

            break;
          }
        }
      }

      for (let i = 0; i < studentAllProductArrayremove.length; i++) {
        if (studentAllProductArrayremove[i].name === product.name) {
          studentAllProductArrayremove.splice(i, 1);

          sessionStorage.setItem(
            'allproducts',
            JSON.stringify(studentAllProductArrayremove)
          );
        }
      }
    }
    setTimeout(() => {
      console.log('setTimeout');

      this.allproducts = JSON.parse(
        sessionStorage.getItem('allproducts') ?? '[]'
      );

      var total = this.allproducts.reduce(
        (acc: any, calculatedTax: { total: any }) => {
          return acc +parseFloat(calculatedTax.total);
        },
        0
      );
      console.log(total);
      this.planAmount = this._decimalPipe
        ?.transform(total, '1.2-2')
        ?.replace(/,/g, '');
      sessionStorage.setItem('totalAmount', this.planAmount);

      this.cartcheckvalue = this.planAmount > 0 ? true : false;
      if (this.allproducts.length > 0) {
        for (let i = 0; i < this.allproducts.length; i++) {
          if (this.allproducts[i].name == 'Health Plan') {
            this.cartcheckvalue = false;
            //  if (this.paymenttab == 1) {
            //  } else {

            //       this.paymenttab = 0

            //     }
            break;
          } else {
            this.cartcheckvalue = true;
          }
        }
      } else {
        this.cartcheckvalue = true;

        // this.paymenttab = 1
      }
    }, 100);
  }

  public getindexofplan(name: any) {
    let plansproductarray = JSON.parse(
      sessionStorage.getItem('studentsPlansArray') ?? '[]'
    );
    for (let i = 0; i < plansproductarray.length; i++) {
      console.log(plansproductarray[i].products);
      console.log(name);
      if (plansproductarray[i].products[0].name == name) {
        console.log('Rakesh');
        return i;
      }
    }
    return 'false';
  }

  toggleItem(item: any): void {
    item.expanded = !item.expanded;
  }
  toggleItem1(item: any): void {
    item.expanded = !item.expanded;
  }
  toggleItem2(item: any): void {
    item.expanded = !item.expanded;
  }
  toggleItem3(item: any): void {
    item.expanded = !item.expanded;
  }
  public provincialhealth(event: any) {
    console.log('provincialhealth: ' + event);
    if (event.target.value == 'true') {
      console.log('true yes');
      this.checkhealthcardstatus = false;
    } else {
      if(!this.isStudent){
        console.log('gig')
        $('#checkuhipstatusModal').modal('show');
        $('#checkuhipstatusModalStudent').modal('hide');
      }
    else{
      console.log('Student')
      $('#checkuhipstatusModal').modal('hide');
      $('#checkuhipstatusModalStudent').modal('show');
    }

      console.log('false no');
      //const modal = new Modal(this.checkuhipstatusModal.nativeElement);
      //modal.show();
      this.checkhealthcardstatus = true;
    }
  }

  pipeFunction = (
    a: KeyValue<string, [string]>,
    b: KeyValue<string, [string]>
  ): number => {
    return 0;
  };

  public paymentpage(tabId: number) {
    this.paymentfirstname = this.userFormControl?.['givenname'].value;
    this.paymentfirstname = this.userFormControl?.['lastname'].value;
    this.paymentemail = this.userFormControl?.['email'].value.toLowerCase();

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
    let endPoint = `/api/ap/customer/validatePlans`;
    let url = `${environment.apiUrl}${endPoint}`;
    let data;
    var accessToken = sessionStorage.getItem('accessToken');
    if (this.isStudent) {
      data = {
        plans: JSON.parse(sessionStorage.getItem('studentsPlansArray')),
      };
    } else {
      data = { plans: JSON.parse(sessionStorage.getItem('plansummarymain')) };
    }

    this.http
      .post(url, data, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (Response: any) => {
          if (Response.status == '200') {
            this.homeaddresscheckvalue = false;
            this.homeaddressEnrollmentVal = false;
            this.planssummarymain =
              JSON.parse(sessionStorage.getItem('plansummarymain') ?? '[]') ||
              '';
            this.planssummaryopt = JSON.parse(
              sessionStorage.getItem('plansummaryopt') ?? '[]'
            );

            let healthplan = [];
            let healthplanvol = [];
            this.studentplanssummarymain =
              JSON.parse(
                sessionStorage.getItem('plansummarymain') ?? '[]'
              ).sort((a: { id: any }, b: { id: any }) => a.id - b.id) || '';

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
            if(this.isStudent)
            this.planssummarymain =JSON.parse(sessionStorage.getItem('studentsPlansArray'))
          else
          this.planssummarymain =JSON.parse(sessionStorage.getItem('plansummarymain'))
            this.planssummarymain =  this.planssummarymain.sort((a, b) => a.packageId - b.packageId) || "";
            this.finalenrollemntsummary = this.planssummarymain
            this.studentplanssummarymain1 = combinedArray;
            setTimeout(() => {
              if(this.isStudent){
                this.allproducts = JSON.parse(
                  sessionStorage.getItem('allproducts') ?? '[]'
                );
                var total = 0;
                for (let i = 0; i < this.allproducts.length; i++) {
                  total += this.allproducts[i].calculatedTax.total;
                }
                console.log(total);
                this.planAmount = this._decimalPipe
                  ?.transform(total, '1.2-2')
                  ?.replace(/,/g, '');
                sessionStorage.setItem('totalAmount', this.planAmount);
                this.cartcheckvalue = this.planAmount > 0 ? true : false;
              }else{
                this.allproducts = JSON.parse(
                  sessionStorage.getItem('plansummarymain') ?? '[]'
                );
                var total = 0;
                for (let i = 0; i < this.allproducts.length; i++) {
                  total +=parseFloat( this.allproducts[i].total);
                }
                console.log(total);
                this.planAmount = this._decimalPipe
                  ?.transform(total, '1.2-2')
                  ?.replace(/,/g, '');
                sessionStorage.setItem('totalAmount', this.planAmount);
                this.cartcheckvalue = this.planAmount > 0 ? true : false;
              }

              // alert(this.planAmount)
            }, 1000);
            this.gsPlans=Response.data.gsPlans;
            this.eqPlans=Response.data.eqPlans;
            //iS replated to greenShield plans
            if(this.gsPlans){
              this.showGreenShiled=false;
              this.greenShiledForm.reset();
              $('#gsPlans').show();

            }else if(this.eqPlans){
              this.showEquitable=false;
              this.EquitableForm.reset();
              $('#eqPlans').show();
            }else{
              this.gsRegistration=false;
              this.gsPlans=false;
              this.gsMembershipId='';
              this.eqRegistration=false;
              this.eqPlans=false
              this.eqCertificateId='';
              this.selectedTab = 'tab3';
            }


            setTimeout(() => {
              this.signaturePadCC = new SignaturePad(
                this.signaturePadCanvasEl?.nativeElement
              );
              this.padAggsignaturePadCC = new SignaturePad(
                this.padAgreementSignaturePadCanvasEl?.nativeElement
              );
            }, 1000);

            this.enrollmentForm.reset();
            // this.creditCardForm.reset();
            this.enrollmentForm
              .get('enrollmentSummaryExpirymonth')
              ?.setValue('');
            this.enrollmentForm
              .get('enrollmentSummaryExpiryyear')
              ?.setValue('');
            this.bankPayForm.reset();
            this.paymentMethodSelectCC = true;
            this.enrollmentBankDetailedVerify = false;
            this.bankDetailsNames = '';
            const elements =
              this.elementRef.nativeElement.getElementsByClassName(
                'imgdisplay2'
              );
            for (let i = 0; i < elements.length; i++) {
              elements[i].style.display = 'block';
              elements[i].style.display = 'inline';
            }
            sessionStorage.setItem('paymentMethod', 'CC');
            console.log('***********tab3: ' + this.studentplanssummarymain1);
          } else {
            Swal.fire({title:'Info',text:Response.data.message})
          }
        },
        (error) => {
          if (error.value) {
            Swal.fire({ title: 'error', text: error.error });
            // this.router.navigate(["error"]);
          } else {
            Swal.fire({ title: 'error', text: error.error });
          }
        }
      );

    //  $("#planSelectionInfo").css("display", "block");
    // $('#personalinfocheck').css("dispaly","none");
  }
  changeShowGreenShieldProv(event:any){
    if(event.target.value=='true'){
        this.showGreenShiled=true;
        this.greenShiledForm.get('greenShiledNumber').setValidators([Validators.required]);
    }else{
      this.showGreenShiled=false;
      this.greenShiledForm.get('greenShiledNumber').clearValidators();
    }
    this.greenShiledForm.get('greenShiledNumber').updateValueAndValidity();
  }
  saveGsPlans(id:any){
  this.greenShiledForm.markAllAsTouched();
  if(this.greenShiledForm.valid){
    this.gsRegistration=this.greenShiledForm.get('showGreenShieldProv').value=='false'?true:false;
    this.gsPlans=true;
    this.gsMembershipId=this.greenShiledForm.get('greenShiledNumber').value||"";
    this.eqRegistration=false;
    this.eqPlans=false
    this.eqCertificateId="";

    this.selectedTab = 'tab3';
    this.closePopup(id);
  }
  else{
    return false;
  }

  }
  changeShowEquitableProv(event:any){
    if(event.target.value=='true'){
        this.showEquitable=true;
        this.EquitableForm.get('EquitableNumber').setValidators([Validators.required]);
    }else{
      this.showEquitable=false;
      this.EquitableForm.get('EquitableNumber').clearValidators();
    }
    this.EquitableForm.get('EquitableNumber').updateValueAndValidity();
  }
  saveeqPlans(id:any){
    this.EquitableForm.markAllAsTouched();
    if(this.EquitableForm.valid){
      this.gsRegistration=false;
      this.gsPlans=false;
      this.gsMembershipId='';
      this.eqRegistration=this.EquitableForm.get('EquitableFormProv').value=='false'?true:false;
      this.eqPlans=true
      this.eqCertificateId=this.EquitableForm.get('EquitableNumber').value||"";

      this.selectedTab = 'tab3';
      this.closePopup(id);
    }
    else{
      return false;
    }

    }
  closeAddMemberPopup() {
    this.bankPayForm.reset();
    this.enrollmentForm.reset();
    this.userForm.reset();
    this.displayStudentId = false;
    this.displatGig = false;
    this.showBrokersList = false;
    this.forms = [];
    this.showForm = false;
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
  closeAddChildrenPopup() {
    $('#childInfoModal').hide();
    this.childFormGroup.reset();
  }
  childInfoAddData() {

    console.log('Button name: ' + this.childInfoModalAddAndUpdateButton);
    if (this.childInfoModalAddAndUpdateButton == 'Add') {
      //  this.childInfoAddDataArray=this.childFormGroup.value;
      let childObj = this.childFormGroup.value;
      console.log('>><<', childObj);
      childObj['childInfoDOB'] = moment(childObj.childInfoDOB).format(
        'MM-DD-YYYY'
      );
      childObj['childInfoGraduationday'] = childObj.childPostGraduate
        ? moment(childObj['childInfoGraduationday']).format('MM-DD-YYYY')
        : childObj.childPostGraduate;
      // this.childInfoAddDataArray.push(this.childFormGroup.value);
      console.log('?>>?', childObj);
      this.childInfoAddDataArray.push(childObj);
      this.noOfChildrenChangedValue = this.childInfoAddDataArray.length;
      this.userForm.get('noofchildren').setValue(this.noOfChildrenChangedValue);
      this.childTableRowsLength = this.childInfoAddDataArray.length;
      console.log(
        'childInfo123: ' + JSON.stringify(this.childInfoAddDataArray)
      );
      this.graducationdaycheck = false;
    } else if (this.childInfoModalAddAndUpdateButton == 'Update') {
      let childObj = this.childFormGroup.value;
      childObj['childInfoDOB'] = moment(childObj.childInfoDOB).format(
        'MM-DD-YYYY'
      );
      childObj['childInfoGraduationday'] = childObj.childPostGraduate
        ? moment(childObj['childInfoGraduationday']).format('MM-DD-YYYY')
        : childObj.childPostGraduate;

      this.childInfoAddDataArray[this.childTableEditRowIndex] = childObj; //this.childFormGroup.value;

      this.childInfoModalAddAndUpdateButton = 'Add';
      console.log(
        'this.childInfoAddDataArray: ' +
          JSON.stringify(this.childInfoAddDataArray)
      );
      this.childInfoAddDataArray[''];
      this.dependentchildInsurenceval = false;
      this.graducationdaycheck = false;

      this.childFormGroup.clearValidators();
    }
    this.childFormGroup.reset();
    this.clearChildFormValidations();
    this.closeAddChildrenPopup();
  }
  clearChildFormValidations(){
    let controls=['childdisablility','childInfoCarrierName','childPostGraduate','childInfoGraduationday'];
    for(let control of controls){
      this.childFormGroup.get(control)?.clearValidators();
      this.childFormGroup.updateValueAndValidity();
      this.childFormGroup.get(control)?.reset();
    }
  }

  childInforTableEdit(index: any) {

    this.childInfoModalAddAndUpdateButton = 'Update';
    this.childTableEditRowIndex = index;
    let dataObject = this.childInfoAddDataArray[index];
    this.setVlidationsForChild(dataObject);
    if (
      dataObject.childInfoGraduationday != '' &&
      dataObject.childPostGraduate
    ) {
      this.graducationdaycheck = true;
    } else {
      this.graducationdaycheck = false;
    }
    if (
      dataObject.childInfoCarrierName != '' &&
      dataObject.DependentchildInsurence == 'true'
    ) {
      this.dependentchildInsurenceval = true;
    } else {
      this.dependentchildInsurenceval = false;
    }

    console.log('Child data: ' + dataObject + ' index: ' + index);
    console.log('Child data123: ' + JSON.stringify(dataObject));
    // this.childInfoControl['childInfoFirstName.=dataObject.childInfoFirstName;
    // const model=new Modal(this.childInfoModal.nativeElement);
    // model.show();
    $('#childInfoModal').show();
    this.childFormGroup.patchValue(dataObject);
  }
  setVlidationsForChild(data:any){

    let controls=['childInfoFirstName','childInfoLastName','childInfoGender','childInfoDOB',
  'DependentchildInsurence'];
  this.childFormGroup.get('childInfoFirstName').setValidators([Validators.required]);
  this.childFormGroup.get('childInfoLastName').setValidators([Validators.required]);
  this.childFormGroup.get('childInfoGender').setValidators([Validators.required]);
  this.childFormGroup.get('childInfoDOB').setValidators([Validators.required]);
  this.childFormGroup.get('DependentchildInsurence').setValidators([Validators.required]);
  if(data?.DependentchildInsurence=='true')
    this.childFormGroup.get('childInfoCarrierName').setValidators([Validators.required]);

  for (const name of Object.keys(this.childFormGroup.controls)) {
    this.childFormGroup.get(name).updateValueAndValidity();
  }
    // this.childFormGroup = this.childInfoFormBuilder.group({
    //   childInfoFirstName: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    //   childInfoLastName: ['', Validators.compose([Validators.required,Validators.minLength(1)])],
    //   childInfoGender: ["",[Validators.required]],
    //   childInfoDOB: ['', [Validators.required]],
    //   childdisablility: [''],
    //   childInfoCarrierName: [''],
    //   childPostGraduate: [''],
    //   childInfoGraduationday: [''],
    //   DependentchildInsurence: ['',Validators.required]
    // })
  }
  deleteChildrenSwal(index: any) {
    Swal.fire({
      title: 'Info',
      text: 'Are you sure you want to delete?',
      showCancelButton: true,
      confirmButtonColor: '#10104d',
      cancelButtonColor: '#10104d',
      confirmButtonText: 'Yes',
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
    if (this.childInfoAddDataArray.length == 1)
      document.getElementById('Dependentchildrenno')?.click();

    this.childInfoAddDataArray.splice(index, 1);
    this.noOfChildrenChangedValue = this.childInfoAddDataArray.length;
    this.userForm.get('noofchildren').setValue(this.noOfChildrenChangedValue);
    this.childTableRowsLength = this.childInfoAddDataArray.length;
    // if(this.childTableRowsLength==0){
    //   this.childTableRowsLength=1;
    // }

    console.log('table length: ' + this.childTableRowsLength);
  }
  public provinceEnrollmentlist(event: any) {
    // alert(event.target.value)
    if (event.target.value == 'QC') {
      // jQuery("#provinceinfo-modal").modal("show");
      // //const modal = new Modal(this.QCproviance.nativeElement);
      // //modal.show();
      $('#QCproviance').show();
    }
    this.configprovinceres.forEach((element: any) => {
      if (element.shortName == event.target.value) {
        this.provincialHealthcareUrl = element.provincialHealthcareUrl;
        console.log('asasas',this.provincialHealthcareUrl)
        this.provincialZipcodes = element.zipcodes.split(',');
        this.provincelistid = element.id;
        this.state_id = parseInt(element.fusebillId);
        this.statename = element.name;
      }
    });

    // //console.log(this.userForm.get('postalcode').value)
    if (this.enrollmentForm.get('enrollmentSummaryPostalCode')?.value) {
      if (
        this.provincialZipcodes.indexOf(
          this.enrollmentForm.get('enrollmentSummaryPostalCode')?.value[0]
        ) == -1
      ) {
        this.invalidenrollmentpostalcodeprovince = true;
        this.enrollmentForm.get('enrollmentSummaryPostalCode')?.markAsTouched();
      } else {
        this.invalidenrollmentpostalcodeprovince = false;
      }

      if (
        this.enrollmentForm.get('enrollmentSummaryPostalCode')?.value.length ==
        0
      ) {
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
      this.fusebill_paymentMethod = 'CC';
      sessionStorage.setItem('paymentMethod', 'CC');
      this.paymentMethodSelectCC = true;
      this.enrollmentBankDetailedVerify = false;
      // this.voidCheckUploaded=false;

      this.bankPayForm.reset();
      this.enrollmentForm.get('enrollmentSummaryBankNumber')?.reset();
      this.enrollmentForm.get('enrollmentSummaryBankNumber')?.clearValidators();
      this.enrollmentForm
        .get('enrollmentSummaryBankNumber')
        ?.updateValueAndValidity();

      this.enrollmentForm.get('enrollmentSummaryTransitNumber')?.reset();
      this.enrollmentForm
        .get('enrollmentSummaryTransitNumber')
        ?.clearValidators();
      this.enrollmentForm
        .get('enrollmentSummaryTransitNumber')
        ?.updateValueAndValidity();

      this.enrollmentForm.get('enrollmentSummaryAccontNumber')?.reset();
      this.enrollmentForm
        .get('enrollmentSummaryAccontNumber')
        ?.clearValidators();
      this.enrollmentForm
        .get('enrollmentSummaryAccontNumber')
        ?.updateValueAndValidity();

      this.enrollmentForm.get('enrollmentBankTextdescription')?.reset();
      this.enrollmentForm
        .get('enrollmentBankTextdescription')
        ?.clearValidators();
      this.enrollmentForm
        .get('enrollmentBankTextdescription')
        ?.updateValueAndValidity();

      // this.signaturePad= new SignaturePad(this.signaturePadCanvas?.nativeElement);
      // this.ngAfterViewInit();
      // this.creditCard();
      const elements = this.elementRef.nativeElement.getElementsByClassName(
        'paymentMethodSelectCC'
      );
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'block';
      }
    } else {
      // this.creditCardForm.reset();
      this.fusebill_paymentMethod = 'PAD';
      this.enrollmentForm.get('enrollmentSummaryCardHolderFirstName')?.reset();
      this.enrollmentForm.get('enrollmentSummaryCardHolderLastName')?.reset();
      this.enrollmentForm.get('enrollmentSummaryCardNumnber')?.reset();
      this.enrollmentForm.get('enrollmentSummaryCVV')?.reset();
      this.enrollmentForm.get('enrollmentSummaryExpiryyear')?.reset();
      this.enrollmentForm.get('enrollmentSummaryExpirymonth')?.reset();

      this.enrollmentForm.get('enrollmentSummaryExpirymonth')?.setValue('');
      this.enrollmentForm.get('enrollmentSummaryExpiryyear')?.setValue('');
      this.paymentMethodSelectCC = false;
      this.bankDetailsNames = '';
      sessionStorage.setItem('paymentMethod', 'PAD');
      const elements = this.elementRef.nativeElement.getElementsByClassName(
        'paymentMethodSelectCC'
      );
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
      }
      this.clearSignature();
    }
    this.signaturemessagecc = false;
  }

  homeaddressEnrollment(event: any) {
    console.log(' event.target.value: ' + event.target.checked);
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
      this.enrollmentForm
        .get('enrollmentSummaryStreetAddressLane2')
        ?.clearValidators();

      this.enrollmentForm.get('enrollmentSummaryStreetAddress')?.reset();
      this.enrollmentForm
        .get('enrollmentSummaryStreetAddress')
        ?.clearValidators();

      this.enrollmentForm.updateValueAndValidity();
    } else {
      console.log('The homeaddressEnrollmentVal is not checked.');
      this.enrollmentForm
        .get('enrollmentSummaryApartSuite')
        ?.setValidators(
          Validators.compose([apt_suitecheck, Validators.maxLength(50)])
        );
      this.enrollmentForm
        .get('enrollmentSummaryStreetAddress')
        ?.setValidators(
          Validators.compose([Validators.required, Validators.maxLength(50)])
        );
      this.enrollmentForm
        .get('enrollmentSummaryCity')
        ?.setValidators(
          Validators.compose([Validators.required, Validators.maxLength(50)])
        );
      this.enrollmentForm
        .get('enrollmentSummaryProvince')
        ?.setValidators(Validators.compose([Validators.required]));
      this.enrollmentForm
        .get('enrollmentSummaryPostalCode')
        ?.setValidators(
          Validators.compose([Validators.required, Validators.maxLength(50)])
        );

      // this.enrollmentForm.get('recaptchaReactive')?.setValidators(Validators.compose([Validators.required]));
      this.enrollmentForm.updateValueAndValidity();
    }
    this.enrollmentForm.reset();
  }

  bankDetailsVerify() {
    return false;
    console.log('bankDetailsVerify');
    let inputData = {
      bankCode: this.bankPayForm.get('enrollmentSummaryBankNumber')?.value,
      branchCode: this.bankPayForm.get('enrollmentSummaryTransitNumber')?.value,
    };
    // let getbanknamesvalues: string = `${environment.app.grp}api/students/bank/verify`;

    let getbanknamesvalues: string = '';
    // this.studentService.getbanknames(inputData)
    this.http.post(getbanknamesvalues, inputData, {}).subscribe(
      (result: any) => {
        console.log('bank details verify: ' + result);
        if (result.status == '200') {
          this.bankDetailsVerifyStatus = false;
          this.bankDetailsError = '';
          //data saved into this bankverifyDetails variable
          this.bankverifyDetails = result.data;
          this.bankDetailsNames =
            result.data.bank.name +
            '\n' +
            result.data.address.split(',').join('\n');
          console.log('this.bankDetailsNames: ' + this.bankDetailsNames);
          this.enrollmentBankDetailedVerify = true;
        } else {
          this.bankDetailsClear();
          this.bankDetailsVerifyStatus = true;
          this.bankDetailsError = result.message;
        }
      },
      (error) => {
        console.log('bank details getting error: ' + JSON.stringify(error));
      }
    );
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
    this.bankDetailsNames = '';
    this.bankPayForm.get('enrollmentSummaryBankNumber')?.reset();
    this.bankPayForm.get('enrollmentSummaryTransitNumber')?.reset();
    this.bankPayForm.get('enrollmentSummaryAccontNumber')?.reset();
    this.bankPayForm.get('enrollmentBankTextarea')?.reset();
    this.bankPayForm.get('enrollmentSummaryvoidCheckUpload')?.reset();
    this.bankDetailsError = '';
  }

  memberTypeChange(broker: any) {
    console.log('enter to function');
    this.checkstudenthealthcardstatus = false;    //for student
    this.checkstudenthealthcardstatus_UHIP = false;
    if (broker.toLowerCase() == 'student_association') {
      this.showBrokersList = true;
      this.displayStudentId = true;
      this.displatGig = false;
      this.isStudent = true;
      this.checkhealthcardstatus=false;
      // this.getBrokerDetails(event.target.value);
      // this.userForm.get('provincialhealth')?.setValidators([Validators.required]);
      this.userForm.get('uhipprovincialhealth').setValidators(Validators.required);
      this.userForm.get('parentalinsurance').setValidators([Validators.required]);
      this.userForm.get('studentId').setValidators([Validators.required]);
      this.userForm.get('workinghours').clearValidators();
      this.userForm.get('hoursperweek').clearValidators();

      this.userForm.get('workinghours').updateValueAndValidity();
      this.userForm.get('hoursperweek').updateValueAndValidity();
      this.userForm.get('studentId').updateValueAndValidity();
      this.userForm.get('parentalinsurance').updateValueAndValidity();
      this.userForm.get('provincialhealth').updateValueAndValidity();
      this.userForm.get('uhipprovincialhealth').updateValueAndValidity();

      this.userForm.updateValueAndValidity();
      this.studentPlaceHolder=this.lang.student_fn;
      this.studentPlaceHolderln=this.lang.student_ln;
    } else{
      this.studentPlaceHolder=this.lang.name_as_shown_on_provincial_health_card;
      this.studentPlaceHolderln=this.lang.name_as_shown_on_provincial_health_card;
      this.showBrokersList = true;
      this.displatGig = true;
      this.displayStudentId = false;
      // this.showForm = false;
      this.isStudent = false;
      this.checkhealthcardstatus=false;
      // this.getBrokerDetails(event.target.value);
      this.userForm.get('uhipprovincialhealth').clearValidators();
      this.userForm.get('parentalinsurance').clearValidators();
      this.userForm.get('foreignStudent').clearValidators();
      this.userForm.get('studentId').clearValidators();

      this.userForm.get('foreignStudent')?.updateValueAndValidity();
      this.userForm.get('studentId')?.updateValueAndValidity();
      this.userForm.get('uhipprovincialhealth')?.updateValueAndValidity();
      this.userForm.get('parentalinsurance')?.updateValueAndValidity();
      this.userForm.get('provincialhealth').setValidators([Validators.required]);
      this.userForm.get('workinghours').setValidators(Validators.required);
      this.userForm
        .get('hoursperweek')
        .setValidators([Validators.required, validatehoursperweek]);
      this.userForm.get('hoursperweek').setValue('40');
      this.userForm.get('hoursperweek').updateValueAndValidity();
      this.userForm.get('provincialhealth').updateValueAndValidity();

    // } else {
    //   this.userForm.get('memberType').setValue(null);
    //   this.displayStudentId = false;
    //   this.displatGig = false;
    //   this.showBrokersList = false;
    //   this.forms = [];
    //   this.showForm = false;
    //   this.userForm.get('workinghours').clearValidators();
    //   this.userForm.get('hoursperweek').clearValidators();
    }
  }
  getBrokerDetails(memnerType: any) {
    let endPoint = `/api/ap/customers/broker/list?type=${memnerType.toUpperCase()}`;
    let url = `${environment.apiUrl}${endPoint}`;
    var accessToken = sessionStorage.getItem('accessToken');
    this.http
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (Response: any) => {
          if (Response.status == '200') {
            console.log(JSON.stringify(Response));
            //items.sort((a, b) => a.value - b.value);
            this.brokers = (Response.data.allBrokers);
            this.brokers.sort((a, b) => {
              let fa = a.name.toLowerCase(),
                  fb = b.name.toLowerCase();

              if (fa < fb) {
                  return -1;
              }
              if (fa > fb) {
                  return 1;
              }
              return 0;
          });
            console.log(this.brokers)
            console.log('broker details', JSON.stringify(this.brokers));
            this.userForm.get('brokername').setValue(null);
            this.userForm.get('brokername').updateValueAndValidity();
          } else {
            Swal.fire({title:'Info',text:Response.data.message})
          }
        },
        (error) => {
          if (error.value) {
            Swal.fire({ title: 'error', text: error.error });
            // this.router.navigate(["error"]);
          } else {
            Swal.fire({ title: 'error', text: error.error });
          }
        }
      );
  }
  public hoursperweekvalue(event) {
    let value = event.target.value;

    // hoursperweekfun1(value)
  }

  public workinghours(value) {
    if (value == 'true') {
      this.hoursperweek = false;
      this.hourperweekvalue = true;
    } else {
      this.hoursperweek = true;
      this.hourperweekvalue = false;
    }
  }

  //https://testadminapi.groupbenefitz.aitestpro.com/api/ap/11111111111/details
  // https://testapi.groupbenefitz.aitestpro.com/api/ap/12531466/details
  checkFusBillId() {
    console.log('enter to checkFusBillId');
    let fusbillId = this.userForm.get('fusbillId').value;
    let formLink = environment.apiUrl;
    var accessToken = sessionStorage.getItem('accessToken');
    let Url: string = `${environment.apiUrl}/api/ap/${fusbillId}/details`;
    let lang = 'en';
    this.http
      .get(Url, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (responce: any) => {
          // this.isLoaded =true
          //             hideOnOverlayClick: false,
          // hideOnContentClick: false,
          // closeClick: false,
          if (responce.status == '200') {
            console.log(JSON.stringify(responce));
            Swal.fire({
              title: 'User Exists in Stax and Not in BMS',
              text: 'Are you sure you want to import the data?',
              showCancelButton: true,
              cancelButtonText: 'No',
              confirmButtonText: 'Yes',
            }).then((result) => {
              if (result.isConfirmed) {
                this.patchUserDetails(responce.data);
              } else {
              }
            });
          } else {
            // if(responce.status!='201'){
            Swal.fire({
              title: 'User Not Exists in Stax and Not in BMS',
              // icon: 'warning',
              html: `<div class="custom-content">${
                responce.message ? responce.message : responce.error
              }</div>`,
              confirmButtonText: 'OK',
            });
            // }
          }
        },
        (error) => {
          if (error.value) {
            this.router.navigate(['error']);
          } else {
          }
        }
      );
  }

  patchUserDetails(data: any) {
    this.firstName = data.customerData.firstName;
    this.lastName = data.customerData.lastName;
    this.primaryEmail = data.customerData.primaryEmail;

    this.primaryPhone = data.customerData?.primaryPhone;
    this.country = data.customerAddress?.billingAddress?.country;
    this.line1 = data.customerAddress?.billingAddress?.line1;
    this.line2 = data.customerAddress?.billingAddress?.line2;
    this.city = data.customerAddress?.billingAddress?.city;
    //  this.state=data.customerAddress.billingAddress.state;
    this.postalZip = data.customerAddress?.billingAddress?.postalZip;
    this.postalZip = data.customerAddress?.billingAddress?.postalZip;
    this.configprovinceres.filter((proviance) => {
      if (
        proviance.name.toLowerCase() ==
        data.customerAddress?.billingAddress?.state.toLowerCase()
      ) {
        this.state = proviance.shortName;
      }
    });
    console.log(this.state);

    this.userForm.markAsTouched();
  }

  getForms(id: any) {
    this.showForm = true;
    if(id==null){
      this.userForm.get('brokername').setValue(null);
      this.userForm.get('brokername').updateValueAndValidity();
    }
     this.userForm.get('formrname').setValue(null);
     this.userForm.get('formrname').updateValueAndValidity();
    this.forms = this.allBrokers.filter((broker) => {
      if (broker.id == id) {
        return broker;
      }
    });
    this.forms[0].signupForms.sort((a, b) => {
      let fa = a.formType.toLowerCase(),
          fb = b.formType.toLowerCase();

      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
  });
  console.log('forms', this.forms);
  this.memberTypeChange(this.forms[0].brokerType);

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
    product,
    pckage,
    group
  ) {
    let multiple = allowMultiple ? Boolean(allowMultiple.data[0]) : false;

    console.log(disallowedPlanLevels);

    if (disallowedPlanLevels != null) {
      console.log(disallowedPlanLevels);
      let disallowed_plans = disallowedPlanLevels.split(',');
      const dom1: HTMLElement = this.elementRef.nativeElement;
      const disallowed_elements = dom1.querySelectorAll(
        ".plansscreen input[type='checkbox']"
      );

      // disallowed_elements.forEach((elem: any) => {

      for (let i = 0; i < disallowed_elements.length; i++) {
        let elem: any = disallowed_elements[i];
        // elementcv.checked=false

        let plandetails = elem.attributes.data.value;

        let plandetailsobj = plandetails.split('##');

        console.log('main', plandetailsobj);

        if (e.target.checked) {
          if (!elem.disabled) {
            if (plandetailsobj[12] == null || plandetailsobj[12] == '') {
              if (disallowed_plans.indexOf(plandetailsobj[13]) >= 0) {
                //  elem.checked=false
                elem.disabled = true;

                this.disabledelement =
                  'Already included in GroupBenefitz All-In';
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[12]) >= 0) {
                //  elem.checked=false
                elem.disabled = true;
                this.disabledelement =
                  'Already included in GroupBenefitz All-In';
              }
            }
          }
          if (elem.checked) {
            //console.log(disallowed_plans)
            //console.log(plandetailsobj)

            if (plandetailsobj[12] == null || plandetailsobj[12] == '') {
              if (disallowed_plans.indexOf(plandetailsobj[13]) >= 0) {
                elem.checked = false;
                this.unselectplan(elem);
              }
            } else {
              //console.log(disallowed_plans)
              //console.log(plandetailsobj)
              if (disallowed_plans.indexOf(plandetailsobj[12]) >= 0) {
                elem.checked = false;
                this.unselectplan(elem);
                // elem.disabled =true
              }
            }
          }
        } else {
          if (elem.disabled) {
            if (plandetailsobj[12] == null || plandetailsobj[12] == '') {
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
            if (plandetailsobj[12] == null || plandetailsobj[12] == '') {
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

    // ////console.log(e)
    let classname = e.target.className;
    classname = classname.split(' ').join('.');

    // ////console.log(classname)
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll('.' + classname);

    // ////console.log(elements);

    let element: any;
    let elementcv: any;

    if (!multiple) {
      if (e.target.checked) {
        for (let i = 0; i < elements.length; i++) {
          let elem = elements[i];
          element = elem;

          if (element.checked) {
            this.unselectplan(elem);
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
        this.selectplan(e.target, options, plan, product, pckage, group);
      } else {
        this.unselectplan(e.target);
      }
    }, 10);
  }

  public selectplan(
    elementcv: any,
    options: any,
    plan: any,
    product: any,
    pckage: any,
    group: any
  ) {
    console.log(plan);
    console.log(product);
    let plandetails = elementcv.attributes.data.value;

    let plandetailsobj = plandetails.split('##');
    if (options && options.length > 0) {
      let coverage = product.planCoverage;

      coverage = ['SINGLE', 'COUPLE', 'FAMILY'].includes(coverage)
        ? coverage
        : null;
      //console.log(obj)
      let productobj = {
        id: product.id,
        productId: product.productId,
        name: product.name,
        planProductId: product.planProductId,
        price: this._decimalPipe
          .transform(product.price1 || product.price, '1.2-2')
          .replace(/,/g, ''),
        tax: this._decimalPipe
          .transform(
            product.calculatedTax ? product.calculatedTax.tax : 0,
            '1.2-2'
          )
          .replace(/,/g, ''),
        total: this._decimalPipe
          .transform(
            product.calculatedTax ? product.calculatedTax.total : 0,
            '1.2-2'
          )
          .replace(/,/g, ''),
        tax_details:
          product.bundledTaxes && product.bundledTaxes.length > 0
            ? product.bundledTaxes
            : product.taxesDataJSON,
        calculatedTax: product.calculatedTax,
        bundledProducts: product.bundledProducts,
        planCoverage: product.planCoverage,
        planLevel: product.planlevel ? product.planlevel.id : '',
        planLevelParent: product.planlevel ? product.planlevel.parentId : '',
        description: product.description,
        coverage: coverage,
      };

      let obj1 = {
        packageId: plan.packageId,
        packageName: pckage.name,

        planproductname: productobj.name,

        groupid: plan.planLevel,
        groupName: group.name,
        id: plan.id,
        name: plan.name,
        planLevel: plan.planLevel ? plan.planLevel : group.id,
        planLevelParent: group.parentId,
        fusebillPlanID: parseInt(plan.fusebillId),
        planFrequencyID: parseInt(plan.frqMonthly),
        isBundle: plan.isBundle,
        coverage: coverage,
        planCoverage: product.planCoverage,
        bundledProducts: [],
        products: [],
      };
      obj1.products.push(productobj);
      this.planobjdata = obj1;

      this.openplanoptions(elementcv, options, plan, product);
    } else {
      let obj = {
        isBundle: plan.isBundle,
        enrollmentDate: moment(
          this.userForm.get('planEnrollmentDate')?.value,
          'DD-MMM-YYYY'
        ).format('YYYY-MM-DD'),
        // "name":plandetailsobj[1]+"-"+plandetailsobj[2],
        name: plandetailsobj[14],
        details: plandetailsobj[0],
        packagename: plandetailsobj[0],
        groupName: plandetailsobj[1],
        amount: parseFloat(product.calculatedTax.price),
        planCoverage: plandetailsobj[2],
        planPrice: parseFloat(product.calculatedTax.price),
        amountUI:
          '$' +
          this._decimalPipe.transform(product.calculatedTax.price, '1.2-2'),
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
        options: [],
        //  "disallowedPlanLevels":plandetailsobj[11]
      };
      if (plandetailsobj[11] != null || plandetailsobj[11] != 'null') {
        if (plandetailsobj[11].includes(plandetailsobj[12])) {
        }
      }

      let coverage = product.planCoverage;

      coverage = ['SINGLE', 'COUPLE', 'FAMILY'].includes(coverage)
        ? coverage
        : null;
      //console.log(obj)
      let productobj = {
        id: product.id,
        productId: product.productId,
        name: product.name,
        planProductId: product.planProductId,
        price: this._decimalPipe
          .transform(product.price1 || product.price, '1.2-2')
          .replace(/,/g, ''),
        tax: this._decimalPipe
          .transform(
            product.calculatedTax ? product.calculatedTax.tax : 0,
            '1.2-2'
          )
          .replace(/,/g, ''),
        total: this._decimalPipe
          .transform(
            product.calculatedTax ? product.calculatedTax.total : 0,
            '1.2-2'
          )
          .replace(/,/g, ''),
        tax_details:
          product.bundledTaxes && product.bundledTaxes.length > 0
            ? product.bundledTaxes
            : product.taxesDataJSON,
        calculatedTax: product.calculatedTax,
        bundledProducts: product.bundledProducts,
        planCoverage: product.planCoverage,
        planLevel: product.planlevel ? product.planlevel.id : '',
        planLevelParent: product.planlevel ? product.planlevel.parentId : '',
        description: product.description,
        coverage: coverage,
      };

      let obj1 = {
        packageId: plan.packageId,
        packageName: pckage.name,

        planproductname: productobj.name,

        groupid: plan.planLevel,
        groupName: group.name,
        id: plan.id,
        name: plan.name,
        planLevel: plan.planLevel ? plan.planLevel : group.id,
        planLevelParent: group.parentId,
        fusebillPlanID: parseInt(plan.fusebillId),
        planFrequencyID: parseInt(plan.frqMonthly),
        isBundle: plan.isBundle,
        coverage: coverage,
        planCoverage: product.planCoverage,
        bundledProducts: [],
        products: [],
      };
      obj1.products.push(productobj);
      console.log(obj1);

      this.addtoplansummary(obj, obj1);
    }
  }

  public unselectplan(elementcv: any) {
    let plandetails = elementcv.attributes.data.value;

    let plandetailsobj = plandetails.split('##');
    let obj = {
      enrollmentDate: moment(
        this.userForm.get('planEnrollmentDate')?.value,
        'DD-MMM-YYYY'
      ).format('YYYY-MM-DD'),
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
      options: [],
      //  "disallowedPlanLevels":plandetailsobj[11]
    };
    if (plandetailsobj[11] != null || plandetailsobj[11] != 'null') {
      if (plandetailsobj[11].includes(plandetailsobj[12])) {
      }
    }

    this.removeplansummary(obj);
  }

  public addtoplansummary(obj: any, obj1: any) {
    let planSummary = JSON.parse(sessionStorage.getItem('plansummary') || '[]');

    console.log(obj1);
    //console.log(planSummary)
    //console.log("addroplansummaryplans")
    //console.log(planSummary.length)
    //console.log(obj.id)
    console.log('obj', obj);

    this.addtoslectplans(obj.id, planSummary.length);
    planSummary.push(obj);

    let gstprice = 0;
    let hstprice = 0;
    let pstprice = 0;
    let qstprice = 0;

    if (obj.gst > 0) {
      gstprice = obj.planPrice * obj.gst;
      obj['gstPrice'] = parseFloat(
        this._decimalPipe.transform(gstprice, '1.2-2')
      );
    } else {
      obj['gstPrice'] = 0;
    }

    if (obj.hst > 0) {
      hstprice = obj.planPrice * obj.hst;

      obj['hstPrice'] = parseFloat(
        this._decimalPipe.transform(hstprice, '1.2-2')
      );
    } else {
      obj['hstPrice'] = 0;
    }

    if (obj.pst > 0) {
      pstprice = obj.planPrice * obj.pst;
      obj['pstPrice'] = parseFloat(
        this._decimalPipe.transform(pstprice, '1.2-2')
      );
    } else {
      obj['pstPrice'] = 0;
    }

    if (obj.qst > 0) {
      qstprice = obj.planPrice * obj.qst;
      obj['qstPrice'] = parseFloat(
        this._decimalPipe.transform(qstprice, '1.2-2')
      );
    } else {
      obj['qstPrice'] = 0;
    }

    obj['taxUI'] = '';
    if (obj['gstCheck']) {
      obj['taxUI'] += '<span>';
      if (obj['gstPrice'] == 0) {
        obj['taxUI'] += '-';
      } else {
        obj['taxUI'] +=
          '$' +
          this._decimalPipe.transform(obj['gstPrice'], '1.2-2') +
          '&nbsp;(GST)';
      }
      obj['taxUI'] += '</span>';
    }

    if (obj['pstCheck']) {
      obj['taxUI'] += '<span>';
      if (obj['pstPrice'] == 0) {
        obj['taxUI'] += '-';
      } else {
        obj['taxUI'] +=
          '$' +
          this._decimalPipe.transform(obj['pstPrice'], '1.2-2') +
          '&nbsp;(PST)';
      }
      obj['taxUI'] += '</span>';
    }

    if (obj['qstCheck']) {
      obj['taxUI'] += '<span>';
      if (obj['qstPrice'] == 0) {
        obj['taxUI'] += '-';
      } else {
        obj['taxUI'] +=
          '$' +
          this._decimalPipe.transform(obj['qstPrice'], '1.2-2') +
          '&nbsp;(QST)';
      }
      obj['taxUI'] += '</span>';
    }

    if (obj['hstCheck']) {
      obj['taxUI'] += '<span> ';
      if (obj['hstPrice'] == 0) {
        obj['taxUI'] += '-';
      } else {
        obj['taxUI'] +=
          '$' +
          this._decimalPipe.transform(obj['hstPrice'], '1.2-2') +
          '&nbsp;(HST)';
      }
      obj['taxUI'] += '</span>';
    }

    if (
      !obj['hstCheck'] &&
      !obj['gstCheck'] &&
      !obj['pstCheck'] &&
      !obj['qstCheck']
    ) {
      obj['taxUI'] += '<span>-';

      obj['taxUI'] += '</span>';
    }

    // //console.log(object["taxUI"])

    obj['tax'] = parseFloat(
      this._decimalPipe.transform(
        obj1.products.reduce((acc, calculatedTax) => {
          return acc + calculatedTax.tax;
        }, 0),
        '1.2-2'
      )
    );

    // obj["products"] =obj1
    obj['coverage'] = obj1.coverage;
    obj['planCoverage'] = obj1.planCoverage;
    obj['planLevelParent'] = obj1.planLevelParent;
    obj['planproductname'] = obj1.planproductname;

    obj['products'] = obj1.products;

    console.log(obj.planPrice);
    console.log(gstprice);
    console.log(hstprice);
    console.log(pstprice);

    console.log(qstprice);
    let pricecal = obj1.products.reduce((acc, calculatedTax) => {
      return acc + calculatedTax.total;
    }, 0);
    obj['totalPrice'] = pricecal;

    obj['totalUI'] = '$' + this._decimalPipe.transform(pricecal, '1.2-2');

    obj['total'] = this._decimalPipe.transform(pricecal, '1.2-2');

    console.log(obj1);

    obj['skuTotalPrice'] = obj1.products.reduce((acc, calculatedTax) => {
      return acc + calculatedTax.total;
    }, 0);

    let updatedSum = this.addtosum(obj.totalPrice);
    this.planssummarymain = [];
    this.planssummaryopt = [];

    planSummary.forEach((element: any) => {
      if (element.packagename != 'Opt-in') {
        this.planssummarymain.push(element);
      } else {
        this.planssummaryopt.push(element);
      }
    });

    console.log(obj1);

    this.plansskumain.push(obj1);

    sessionStorage.setItem('plansskumain', JSON.stringify(this.plansskumain));
    sessionStorage.setItem(
      'plansummarymain',
      JSON.stringify(this.planssummarymain)
    );
    sessionStorage.setItem(
      'plansummaryopt',
      JSON.stringify(this.planssummaryopt)
    );

    sessionStorage.setItem('plansummary', JSON.stringify(planSummary));

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
        JSON.parse(sessionStorage.getItem('plansummarymain')) || '';

      var total = 0;
      for (let i = 0; i < this.planssummarymain.length; i++) {
        total += parseFloat(this.planssummarymain[i].skuTotalPrice);
      }

      console.log(total);

      this.planAmount = this._decimalPipe
        .transform(total, '1.2-2')
        .replace(/,/g, '');
      sessionStorage.setItem('totalAmount', this.planAmount);

      if (this.planAmount > 0) {
        this.cartcheckvalue = false;
      } else {
        this.cartcheckvalue = true;
      }
    }, 100);
  }

  public removeplansummary(obj: any) {
    let planSummary = JSON.parse(sessionStorage.getItem('plansummary'));

    //  //console.log("Beforeremoving")
    //console.log(planSummary)
    //console.log("removeingobject")
    //console.log(obj)

    // //console.log(obj.name)

    if (planSummary) {
      //console.log("removeinplanid"+obj.id)
      let index = this.getslectedplans(obj.id);
      //console.log(index)

      if (index > -1) {
        planSummary.splice(index, 1);
        //console.log("afterremove")
        //console.log(planSummary)
      } else {
        return;
      }

      // //console.log(planSummary)
      // //console.log(planSummary.length)
      //console.log("beforeremoveplans")
      let selectedPlans = JSON.parse(sessionStorage.getItem('selectedPlans'));
      var newselectedplans = {};
      for (var i = 0; i < planSummary.length; i++) {
        newselectedplans[planSummary[i].id] = i;
      }

      //console.log("newselectedPlans")
      //console.log(newselectedplans)
      sessionStorage.setItem('selectedPlans', JSON.stringify(newselectedplans));
      // this.removeslectplans(obj.id,planSummary.length)

      let gstprice = 0;
      let hstprice = 0;
      let pstprice = 0;
      let qstprice = 0;

      if (obj.gst > 0) {
        gstprice = obj.planPrice * obj.gst;
        obj['gstPrice'] = parseFloat(
          this._decimalPipe.transform(gstprice, '1.2-2')
        );
      } else {
        obj['gstPrice'] = 0;
      }

      if (obj.hst > 0) {
        hstprice = obj.planPrice * obj.hst;

        obj['hstPrice'] = parseFloat(
          this._decimalPipe.transform(hstprice, '1.2-2')
        );
      } else {
        obj['hstPrice'] = 0;
      }

      if (obj.pst > 0) {
        pstprice = obj.planPrice * obj.pst;
        obj['pstPrice'] = parseFloat(
          this._decimalPipe.transform(pstprice, '1.2-2')
        );
      } else {
        obj['pstPrice'] = 0;
      }
      if (obj.qst > 0) {
        qstprice = obj.planPrice * obj.qst;
        obj['qstPrice'] = parseFloat(
          this._decimalPipe.transform(qstprice, '1.2-2')
        );
      } else {
        obj['qstPrice'] = 0;
      }

      obj['taxUI'] = '';
      if (obj['gstCheck']) {
        obj['taxUI'] += '<span>';
        if (obj['gstPrice'] == 0) {
          obj['taxUI'] += '-';
        } else {
          obj['taxUI'] +=
            '$' +
            this._decimalPipe.transform(obj['gstPrice'], '1.2-2') +
            '&nbsp;(GST)';
        }
        obj['taxUI'] += '</span>';
      }

      if (obj['pstCheck']) {
        obj['taxUI'] += '<span>';
        if (obj['pstPrice'] == 0) {
          obj['taxUI'] += '-';
        } else {
          obj['taxUI'] +=
            '$' +
            this._decimalPipe.transform(obj['pstPrice'], '1.2-2') +
            '&nbsp;(PST)';
        }
        obj['taxUI'] += '</span>';
      }

      if (obj['qstCheck']) {
        obj['taxUI'] += '<span>';
        if (obj['qstPrice'] == 0) {
          obj['taxUI'] += '-';
        } else {
          obj['taxUI'] +=
            '$' +
            this._decimalPipe.transform(obj['qstPrice'], '1.2-2') +
            '&nbsp;(QST)';
        }
        obj['taxUI'] += '</span>';
      }

      if (obj['hstCheck']) {
        obj['taxUI'] += '<span> ';
        if (obj['hstPrice'] == 0) {
          obj['taxUI'] += '-';
        } else {
          obj['taxUI'] +=
            '$' +
            this._decimalPipe.transform(obj['hstPrice'], '1.2-2') +
            '&nbsp;(HST)';
        }
        obj['taxUI'] += '</span>';
      }

      if (
        !obj['hstCheck'] &&
        !obj['gstCheck'] &&
        !obj['pstCheck'] &&
        !obj['qstCheck']
      ) {
        obj['taxUI'] += '<span>-';

        obj['taxUI'] += '</span>';
      }

      // //console.log(object["taxUI"])

      obj['tax'] = parseFloat(
        this._decimalPipe.transform(
          gstprice + hstprice + pstprice + qstprice,
          '1.2-2'
        )
      );
      (obj['totalPrice'] =
        obj.planPrice + gstprice + hstprice + pstprice + qstprice),
        (obj['totalUI'] =
          '$' +
          this._decimalPipe.transform(
            obj.planPrice + gstprice + hstprice + pstprice + qstprice,
            '1.2-2'
          ));

      obj['total'] = parseFloat(
        this._decimalPipe.transform(
          obj.planPrice + gstprice + hstprice + pstprice + qstprice,
          '1.2-2'
        )
      );

      let updatedSum = this.removetosum(obj.totalPrice);
      this.planssummarymain = [];
      this.planssummaryopt = [];

      planSummary.forEach((element: any) => {
        if (element.packagename != 'Opt-in') {
          this.planssummarymain.push(element);
        } else {
          this.planssummaryopt.push(element);
        }
      });

      sessionStorage.setItem(
        'plansummarymain',
        JSON.stringify(this.planssummarymain)
      );
      sessionStorage.setItem(
        'plansummaryopt',
        JSON.stringify(this.planssummaryopt)
      );

      sessionStorage.setItem('plansummary', JSON.stringify(planSummary));

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
        JSON.parse(sessionStorage.getItem('plansummarymain')) || '';

      var total = 0;
      for (let i = 0; i < this.planssummarymain.length; i++) {
        total += parseFloat(this.planssummarymain[i].skuTotalPrice);
      }

      console.log(total);

      this.planAmount = this._decimalPipe
        .transform(total, '1.2-2')
        .replace(/,/g, '');
      sessionStorage.setItem('totalAmount', this.planAmount);
    }, 100);
  }

  public addtoslectplans(planid: number, plansumamryindex: number) {
    //console.log("beforeaddtoplans")
    //console.log(planid)
    //console.log(plansumamryindex)
    let selectedPlans = JSON.parse(
      sessionStorage.getItem('selectedPlans') || '{}'
    );
    //console.log(selectedPlans)
    selectedPlans[planid] = plansumamryindex;
    //console.log("afteraddtoplans")
    //console.log(selectedPlans)
    sessionStorage.setItem('selectedPlans', JSON.stringify(selectedPlans));
  }
  public removeslectplans(planid: number, plansumamryindex: number) {
    //console.log("beforeremoveplans")
    let selectedPlans = JSON.parse(sessionStorage.getItem('selectedPlans'));

    //console.log(selectedPlans)
    delete selectedPlans[planid];

    for (const planid in selectedPlans) {
      //console.log(planid)
      //console.log(selectedPlans[planid])

      if (selectedPlans[planid] != 0) {
        selectedPlans[planid] = selectedPlans[planid] - 1;
        if (selectedPlans[planid]) {
        }
      }
    }
    //console.log("adjustedselectedPlans")
    //console.log(selectedPlans)
    sessionStorage.setItem('selectedPlans', JSON.stringify(selectedPlans));
  }

  public getslectedplans(planid: number) {
    //console.log(planid)
    let selectedPlans = JSON.parse(
      sessionStorage.getItem('selectedPlans') || '{}'
    );
    //console.log(selectedPlans)
    return selectedPlans[planid];
  }
  public addtosum(amount: any) {
    console.log('addtosum' + amount);

    // amount = Math.round((amount + Number.EPSILON) * 100) / 100;

    let selectedPlansAmount = parseFloat(
      sessionStorage.getItem('totalAmount') || '0.00'
    );

    selectedPlansAmount = selectedPlansAmount + parseFloat(amount);

    console.log('selectedPlansAmount' + selectedPlansAmount);
    sessionStorage.setItem(
      'totalAmount',
      this._decimalPipe
        .transform(selectedPlansAmount, '1.2-2')
        .replace(/,/g, '')
    );

    sessionStorage.setItem(
      'totalAmountUI',
      '$' +
        this._decimalPipe
          .transform(selectedPlansAmount, '1.2-2')
          .replace(/,/g, '')
    );

    this.planAmount = this._decimalPipe
      .transform(selectedPlansAmount, '1.2-2')
      .replace(/,/g, '');

    return selectedPlansAmount;
  }

  public removetosum(amount: number) {
    let selectedPlansAmount = parseFloat(
      sessionStorage.getItem('totalAmount').replace(/,/g, '')
    );

    selectedPlansAmount = selectedPlansAmount - amount;
    sessionStorage.setItem(
      'totalAmount',
      this._decimalPipe
        .transform(selectedPlansAmount, '1.2-2')
        .replace(/,/g, '')
    );
    sessionStorage.setItem(
      'totalAmountUI',
      '$' +
        this._decimalPipe
          .transform(selectedPlansAmount, '1.2-2')
          .replace(/,/g, '')
    );

    this.planAmount = this._decimalPipe
      .transform(selectedPlansAmount, '1.2-2')
      .replace(/,/g, '');
    return selectedPlansAmount;
  }

  public openplanoptions(elementcv, options, plan, product) {
    let plandetails = elementcv.attributes.data.value;

    let plandetailsobj = plandetails.split('##');

    let modifiedOptions = [];

    // this.plandetailsobjvalue = plandetailsobj;
    console.log(plandetails);
    console.log(product.id);

    this.plandetailsobjvalue = plandetails;

    options.forEach((element) => {
      element.planOptionsValues.forEach((options) => {
        options.planOptionName = element.name;
        options.json = JSON.stringify(options);
      });

      modifiedOptions.push(element);
    });

    this.optionstitle = modifiedOptions;
    this.showoptions = true;
    // alert("startrhetre")
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

    this.optionmessage = '';
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

    $('#showplanoptions-modal').modal('hide');

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
      enrollmentDate: moment(
        this.userForm.get('planEnrollmentDate')?.value,
        'DD-MMM-YYYY'
      ).format('YYYY-MM-DD'),
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
    $('#showplanoptions-modal').modal('hide');
    let plandetailsobj = $('#plandetailsobj').val().split('##');

    console.log(plandetailsobj[19]);
    // console.log(plandetailsobj[20])

    $('#plancheck' + plandetailsobj[19]).prop('checked', false);

    let optionumber = $('#optionumber').val();

    $('#showplanoptions-modal').modal('hide');

    for (let i = 1; i <= optionumber; i++) {
      $('.optionselectionmethod-' + i + ':checked').prop('checked', false);
    }
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
  let minDate = moment().subtract(100, 'years').calendar();
  let maxDate = moment().subtract(16, 'years').calendar();

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
  console.log('creditcardvalidation: ' + control.value);
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
