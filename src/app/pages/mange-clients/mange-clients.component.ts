import { LoaderService } from 'src/app/loader.service';
import { error } from 'jquery';
import { AppComponent } from './../../app.component';
import { CommonPatternsService } from 'src/app/common-patterns.service';
// import { AppComponent } from './../../app.component';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  MaxValidator,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ExcelService } from './../../services/excel.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from './../../layouts/header/header.component';
import { EnableDisableDirective } from './../../Directives/enable-disable.directive';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { PaymentService } from '../../services/payment.service';
import { ReportsComponent } from './../../components/reports/reports.component';
import { PhoneFormatPipe } from '../../pipes/phone-format.pipe';
// import { error } from 'jquery';

declare var $: any;
@Component({
  selector: 'app-mange-clients',
  templateUrl: './mange-clients.component.html',
  styleUrls: ['./mange-clients.component.css'],
  providers: [
    DatePipe,
    HeaderComponent,
    EnableDisableDirective,
    PhoneFormatPipe,
  ],
   encapsulation: ViewEncapsulation.Emulated
})
export class MangeClientsComponent implements OnInit {
  @ViewChild(ReportsComponent) reportsComponent: ReportsComponent;

  adminName: any;
  role: any;
  serviceCount: any = 0;
  basicTiersCount: any = 1;
  AnnualCount: any = 0;
  adminData: any;
  lengthofstatus: any;
  defaultColor: any;
  applicationStatus: any;
  paidByCompany: Array<any> = [];
  allBrokers: Array<any> = [];
  coveredByCompany: Array<any> = [];
  paidByEmployee: Array<any> = [];
  payrolldeduction: Array<any> = [];
  countryList: any;
  subdomainName: any;
  payrolldedcutionname: any;
  payrollOptions: any;
  planselectedId: any;
  planRequestBody: any;
  selectedWalletConfig: any;
  plancheckCoverage: any = false;
  plancheck2Coverage: any = false;
  plancheck3Coverage: any = false;
  block1coverage: any = true;
  block2coverage: any = true;
  block3coverage: any = true;

  employeeplancheck: any;
  empCount: any;
  elementid: any;
  block2execid: any;
  defaultAmount: any;
  checkmark = false;
  executiveid: any;
  selectionTiers: any;
  plansNewBlock1: any;
  tierConfigCheck: any;
  walletConfigCheck: any;
  customSelected = false;
  upgradeplanscheck: any;
  showtierbasicplans = false;
  showtieradvplans = false;

  basicInfo = true;
  showsearchbox: boolean = true;
  isActive1: boolean = true;
  plansInfo = false;
  showaddadmin = false;
  addadminform = true;
  wallettierInfo = false;
  wallettierInfoandtier = false;
  EmployeeInfo = false;
  datagraphInfo = false;
  showdeletebutton = false;
  showemptywalletConfig = false;

  uploadlogoafter = false;
  nowalletnotierInfo = false;
  upgradeplansselection = false;
  upgradeplansselectiontiers = false;
  employeeplanpurchase = false;
  employeeplanpurchasetiers = false;
  voidcheckuploadafter = false;
  showconfigurebutton = true;

  showvoidcheck = true;
  showimagelogo = true;
  willDownload = false;
  bankDetails = false;
  showstatus = false;
  walletData: any;
  tierWalletConfig: any;
  TierData: any;
  public postalvalue: any;
  public invalidpostalcodeprivince: boolean = false;
  statesInfo: any;
  plansres: any;
  planres2: any;
  plansBlock1: any;
  plansBlock1Tiers: any;
  packageIndex: any;
  imagedisplay: any;
  imagedisplayvoid: any;
  editindex: any;
  groupIndex: any;
  walletConfig: any;
  employeeplanpurchasetierscheck: any;
  upgradertierscheck: any;
  packageIndexblock2: any;
  groupIndexblock2: any;
  corporationclient: any;
  disabledColor: any;
  counter: any;
  selectedplansblock1: any;
  selectedplansblock2: any;
  selectedplansblock3: any;
  configureTierList: any;
  disallowedplans: any;
  disallowedplansTiers: any;
  voidcheckfile: any;
  uploadadminlogoimg: any;
  session: any;
  configprovinceres: any;
  configprovincereslist: any;
  enrollmentDates: any;
  provincialHealthcareUrl: any;
  provincialZipcodes: any;
  provincelistid: any;
  state_id: any;
  statename: any;
  corporateId: any;
  corporateClientId: any;
  maxEmployeeCount: any;
  lengthofemployee: any;
  editadminfirstname: any;
  editadminlastname: any;
  editadminphone: any;
  editadminemail: any;
  editadminrole: any;
  editEmployeeId: any;
  selectedPlansTierBlock1: any;
  selectedplansforTier: Array<any> = [];
  dummyAdminData: Array<any> = [];
  tierinfonames: Array<any> = [];
  addedEmployeelist: Array<any> = [];
  tierslist: Array<any> = [];
  finalTiersforGraph: Array<any> = [];
  TierlistforGrapsh: Array<any> = [];
  planssummarymain: Array<any> = [];
  planssummaryopt: Array<any> = [];
  planssummary: Array<any> = [];
  plansresblack2: Array<any> = [];
  plansresblack2Tiers: Array<any> = [];
  plansresblack2final: Array<any> = [];
  plansresblack3: Array<any> = [];
  Newplansresblack3: Array<any> = [];
  planssummary2: Array<any> = [];
  plansNewBlock2: Array<any> = [];
  selectedCoverage: Array<any> = [];
  Newplansresblack3Tiers: Array<any> = [];
  plansNewBlock2Tiers: Array<any> = [];
  plansNewBlock3Tiers: Array<any> = [];
  plansresblack3Tiers: Array<any> = [];
  finalblock2res: Array<any> = [];
  excelempdata: Array<any> = [];
  tierconfig: Array<any> = [];
  EmployeeAddData: Array<any> = [];
  finalemployeekeys: Array<any> = [];
  tierarray: Array<any> = [];
  corpDetails: Array<any> = [];
  SubDomains: Array<any> = [];
  CorpName: any;
  streetAddress: any;
  streetAddress2: any;
  country: any = '';
  city: any;
  province: any = '';
  postalCode: any;
  policyStartDate: any;
  setupWallet: any;
  setUplevelofCoverage: any;
  noOfEmployees: any;
  paymentInfo: any;
  waitTime: any;
  useCreditCard: any;
  invoicePayment: any;
  padPayment: any;
  minDate: any;
  maxDate: any;
  filterarray: Array<any> = [];
  packagePlanLevelTiers: any = {};
  displayPackage: Array<boolean> = [];
  selectedPlansInfoTierArray: Array<any> = [];
  selectedPlansInfoTierArrayBlock2: Array<any> = [];
  selectedPlansInfoTierArrayBlock3: Array<any> = [];
  selectedTiers: Array<any> = [];
  TiersArray: Array<any> = [];
  selectedPackagePlansInfoTier: any = {};
  selectedPackagePlansInfoTierBlock2: any = {};
  selectedPackagePlansInfoTierBlock3: any = {};
  selectedPackagePlansInfoTiername: any = {};
  selectedPackagePlansInfoTiernameBlock2: any = {};
  selectedPackagePlansInfoTiernameBlock3: any = {};
  selectedPackagePlansInfoTier2: any = {};
  selectedPackagesassignedTiers: any = {};
  selectedPackagesassignedTiers2: any = {};
  selectedPackagesassignedTiers21: any = {};
  selectedPackagesavailableTiers: any = {};
  selectedPackagesavailableTiers2: any = {};
  selectedPackagesavailableTiers21: any = {};
  selectedPackagesavailableTiers3: any = {};
  selectedPackagesassignedTiers3: any = {};

  selectedPackagePlansInfoTier2Block2: any = {};
  selectedPackagePlansInfoTier3Block3: any = {};
  selectedPackagesassignedTiersBlock2: any = {};
  selectedPackagesassignedTiersBlock3: any = {};
  selectedPackagesassignedTiers2Block2: any = {};
  selectedPackagesassignedTiers2Block21: any = {};
  selectedPackagesassignedTiers3Block3: any = {};
  selectedPackagesassignedTiers3Block31: any = {};
  selectedPackagesavailableTiersBlock2: any = {};
  selectedPackagesavailableTiersBlock3: any = {};
  selectedPackagesavailableTiers2Block2: any = {};
  selectedPackagesavailableTiers2Block21: any = {};
  selectedPackagesavailableTiers3Block3: any = {};
  selectedPackagesavailableTiers3Block31: any = {};
  seelctedplanLevelTierMapping: Array<any> = [];
  seelctedplanLevelTierMapping2: Array<any> = [];

  showinput = true;
  showinput1 = false;

  showinputBlock2 = true;
  showinput1Block2 = false;

  showinputBlock3 = true;
  showinput1Block3 = false;
  seelctedplanLevelTierMappingBlock2: Array<any> = [];
  seelctedplanLevelTierMapping2Block2: Array<any> = [];

  seelctedplanLevelTierMappingBlock3: Array<any> = [];
  seelctedplanLevelTierMapping3Block3: Array<any> = [];
  walletsymbol: any;
  chart: any;
  chart1: any;
  isActive!: boolean;
  showemptytierconfig: any;
  annualincomeCheck = false;
  lengthofServiceCheck = false;
  tiersLevelCheck = false;
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  public defaulttiers: Array<any> = [];
  public dynamicArray: Array<any> = [];
  public dynamicArrayService: Array<any> = [];
  public dynamicArrayAnnualIncome: Array<any> = [];
  dropdownList: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings = {};
  public employeeList: Array<any> = [];
  public newDynamic: any = {};
  adminStatuslist: Array<any> = [];
  dropDownSelect = false;

  clientregform: FormGroup = new FormGroup({
    brokerName: new FormControl(''),
    corporationName: new FormControl(''),
    PolicyStartDate: new FormControl(''),
    streetAddress: new FormControl(''),
    streetAddress2: new FormControl(''),
    apt_suite: new FormControl(),
    country: new FormControl(''),
    city: new FormControl(''),
    Province: new FormControl(''),
    multiSelectProviance: new FormControl(''),
    postalCode: new FormControl(''),
    waitingPeriod: new FormControl(''),
    waitingPeriodCustom: new FormControl(''),
    waitingPeriodinitialsignup: new FormControl(),
    paymentInfo: new FormControl(''),
    bankCode: new FormControl(''),
    BankTransit: new FormControl(''),
    accounNum: new FormControl(''),
    voidcheck: new FormControl(''),
    corporatelogo: new FormControl(''),
    walletConfig: new FormControl(''),
    tierConfig: new FormControl(''),
    expectednoofEmployees: new FormControl(''),
    ShowEmployer: new FormControl(''),
    autoSelectEmp: new FormControl(''),
  });
  adminform: FormGroup = new FormGroup({
    adminfirstname: new FormControl(''),
    adminlastname: new FormControl(''),
    adminphone: new FormControl(''),
    adminemail: new FormControl(''),
    role: new FormControl(''),
    roleName: new FormControl(''),
  });
  payrolldeductionoption: FormGroup = new FormGroup({
    payrolloption: new FormControl(''),
  });

  //ganesh
  tax=0.13;
  price={
    'EAP 2.0':5,
    'Mind & Body':15,
    'Complete Wellness':20
  }

  submitted = false;
  // submittedadmin = false;
  @ViewChild('lengthOfServicetrue')
  lengthOfServicetrue!: ElementRef<HTMLElement>;
  @ViewChild('lengthOfServicefalse')
  lengthOfServicefalse!: ElementRef<HTMLElement>;
  @ViewChild('annualIncometrue')
  annualIncometrue!: ElementRef<HTMLElement>;
  @ViewChild('annualIncomefalse')
  annualIncomefalse!: ElementRef<HTMLElement>;

  @ViewChild('nextpage')
  nextpage!: ElementRef<HTMLElement>;

  @ViewChild('nextpage')
  closemodel!: ElementRef<HTMLElement>;
  @ViewChild('upgradeplansfalse')
  upgradeplansfalse!: ElementRef<HTMLElement>;
  @ViewChild('upgradeplanstrue')
  upgradeplanstrue!: ElementRef<HTMLElement>;

  @ViewChild('upgradeplanstiersfalse')
  upgradeplanstiersfalse!: ElementRef<HTMLElement>;
  @ViewChild('upgradeplanstierstrue')
  upgradeplanstierstrue!: ElementRef<HTMLElement>;

  @ViewChild('employeepurchasefalse')
  employeepurchasefalse!: ElementRef<HTMLElement>;
  @ViewChild('employeepurchasetrue')
  employeepurchasetrue!: ElementRef<HTMLElement>;

  @ViewChild('employeepurchaseTiersfalse')
  employeepurchaseTiersfalse!: ElementRef<HTMLElement>;
  @ViewChild('employeepurchaseTierstrue')
  employeepurchaseTierstrue!: ElementRef<HTMLElement>;
  disabledelement: any;
  // @ViewChild(HeaderComponent) headerComponent : HeaderComponent | undefined;
  @ViewChild(HeaderComponent)
  headerComponent!: HeaderComponent;

  selectedOption: any;

  @ViewChild('myFileInput') myFileInput:ElementRef;

  @ViewChild('form') form: ElementRef;
  accessCode: any;
  encRequestRes: any;
  order_no: any = 'qaz234567';
  testAmount: any = '10';
  selectedAddress: any = {
    name: 'testing',
    address: 'test address',
    city: 'test city',
    pincode: '23456',
    state: 'state test',
    phone: '1234567890',
  };
  firstName: any;
  showOtherField: boolean = false;
  groupContactsData: any;
  existingPlans: any;
  coreplantemplateValue: any = null;
  emailAlreadyexist: boolean = false;
  domainExisting: boolean = false;
  postalCodeDisplay: any = 'Postal Code';
  provianceDispaly: any = 'Province';
  allCountrys: any;
  selectedCountry: string;
  multiSelectProviance: any = [];
  adminformOthers: any;
  aptSuite: any;
  isCountrySelected: boolean = false;
  multiSlectProviances: any;
  version: string;
  employeeWorkingProviance: any;
  balkPlans: any;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public app: AppComponent,
    public router: Router,
    public elementRef: ElementRef,
    private excelService: ExcelService,
    private datePipe: DatePipe,
    private toastrService: ToastrService,
    private ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private PaymentService:PaymentService,
    private phoneNoFormat: PhoneFormatPipe,
    private _LoaderService: LoaderService,
    private commonPatternsService:CommonPatternsService,

  ) {}

  ngOnInit(): void {
    this.selectedOption = '';
    this.accessCode = 'AVMM97HL24AS35MMSA';
    this.version=environment.version;

    this.adminData = [];
    sessionStorage.setItem('adminData', '');

    let adminsstatus = [
      { id: 1, name: 'Enter Address', checked: false, color: 'red' },
      { id: 2, name: 'Select Policy Start Date', checked: false, color: 'red' },
      {
        id: 3,
        name: 'Add Additional Administrator',
        checked: false,
        color: 'red',
      },
      {
        id: 4,
        name: 'Enter Waiting Period For New Employees',
        checked: false,
        color: 'red',
      },
      { id: 5, name: 'Select Payment Method', checked: false, color: 'red' },
      { id: 6, name: 'Add/Update Company logo', checked: false, color: 'red' },
      {
        id: 7,
        name: 'Enable Wallet - Enabled or Disabled',
        checked: false,
        color: 'red',
      },
      {
        id: 8,
        name: 'Enter Tiered Benefits - Enabled or Disabled',
        checked: false,
        color: 'red',
      },
      { id: 9, name: 'Select Benefit Plans', checked: false, color: 'red' },
      {
        id: 10,
        name: 'Add Employees and (Assign tiers if Tiers Selected)',
        checked: false,
        color: 'red',
      },
      { id: 11, name: 'Review Setup', checked: false, color: 'red' },
      {
        id: 12,
        name: 'Send Invite to all employees',
        checked: false,
        color: 'red',
      },
    ];

    this.adminStatuslist = adminsstatus;

    this.adminName = sessionStorage.getItem('adminName');

    this.role = sessionStorage.getItem('adminName');

    this.walletsymbol = '$';
    this.adminData = JSON.parse(sessionStorage.getItem('adminData') || '[]');
    console.log(this.adminData);
    sessionStorage.setItem('corporateId', '');
    sessionStorage.setItem('corporateClientId', '');

    // console.log(this.adminData)
    this.dropdownSettings = {
      singleSelection: false,
      // closeDropDownOnSelection: true,
      idField: 'id',
      textField: 'shortName',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect All',
      itemsShowLimit: 4,
      allowSearchFilter: true,
    };

    this.selectedItems = [
      { id: 114, name: 'All' },
      { id: 115, name: 'Employee' },
      { id: 116, name: 'Management' },
    ];

    // sessionStorage.setItem('corporateId', '74');
    this.defaultColor = 'black';

    this.clientregform = this.formBuilder.group({
      brokerName: [''],
      corporationName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(70),
          Validators.pattern('^(?:<[^>]*$|[^<]*>$|^[^<>]*$)')
        ],
      ],
      PolicyStartDate: ['',[Validators.required]],
      streetAddress: [''],
      streetAddress2: [''],
      apt_suite: [''],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      Province: ['', [Validators.required]],
      multiSelectProviance: ['', [Validators.required]],
      postalCode: [''],
      waitingPeriod: [''],
      waitingPeriodCustom:[''],
      waitingPeriodinitialsignup: ['',[Validators.required]],
      paymentInfo: [''],
      bankCode: [''],
      BankTransit: [''],
      accounNum: [''],
      voidcheck: [''],
      corporatelogo: [''],
      walletConfig: ['', [Validators.required]],
      tierConfig: ['', [Validators.required]],
      expectednoofEmployees: [''],
      ShowEmployer: ['false', [Validators.required]],
      autoSelectEmp: [false, [Validators.required]],
    });
    this.adminform = this.formBuilder.group({
      adminfirstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
          // Validators.pattern("^(?!\\s)[A-Za-z-'\\s]+$")
        ],
      ],
      adminlastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
          // Validators.pattern("^(?!\\s)[A-Za-z-'\\s]+$")
        ],
      ],
      adminphone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
          Validators.pattern(/^[^A-Za-z@#$%&*{}'";:<>?]+$/),
        ]),
      ],
      adminemail: [
        '',
        [
          Validators.required,
          Validators.//pattern( /^(?!\\s)*[\sA-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,3}(?!\\s)*$/i),
          pattern('^(?!\\s)[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),

        ],
      ],
      role: ['', [Validators.required]],
      roleName: [''],
    });

    this.payrolldeductionoption = this.formBuilder.group({
      payrolloption: ['', [Validators.required]],
    });

    this.formConfig();

    // this.dynamicArray.push(
    //   { sno: '1', tierName: 'All', walletAmount: '$1000' },
    // );
    this.dynamicArray.forEach((element: any) => {
      let obj = {
        id: element.sno,
        tierName: this.capitalize(element.tierName),
      };
      this.tierinfonames.push(obj);
    });
  }
  checkout() {
    let redirect_url = 'http%3A%2F%2Flocalhost%3A3008%2Fhandleresponse';
    let useremail = 'testemail@gmail.com';
    let request = `merchant_id=284414&order_id=${this.order_no}&currency=INR&amount=${this.testAmount}&redirect_url=${redirect_url}&cancel_url=${redirect_url}&language=EN&billing_name=${this.selectedAddress.name}&billing_address=${this.selectedAddress.address}&billing_city=${this.selectedAddress.city}&billing_state=MH&billing_zip=${this.selectedAddress.pincode}&billing_country=India&billing_tel=${this.selectedAddress.phone}&delivery_name=${this.selectedAddress.name}&delivery_address=${this.selectedAddress.address}&delivery_city=${this.selectedAddress.city}&delivery_state=${this.selectedAddress.state}&delivery_zip=${this.selectedAddress.pincode}&delivery_country=India&delivery_tel=${this.selectedAddress.phone}&billing_email=${useremail}`;
    this.encRequestRes = request;
    setTimeout(() => {
      this.form.nativeElement.submit();
    }, 1000);

    // this.PaymentService.encryptdata(request).subscribe(
    //   data => {
    //   console.log('---------------------', data['response'])
    //   this.encRequestRes = data['response'];
    //       setTimeout(()=>{
    //           this.form.nativeElement.submit();
    //       },1000)
    //   }, error => {
    //   console.log(error)
    //   }
    //   );
  }
  formConfig() {
    var endPoint = '/api/ap/admin/corporateSignup/formConfig';
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
            this.statesInfo = response.data.states;
            this.walletConfig = response.data.walletConfig;

            this.allBrokers = response.data.allBrokers;
            this.allBrokers = this.allBrokers.sort(
              (a: any, b: any) => (a.name > b.name ? 1 : -1)
            );

            this.payrolldeduction = response.data.payRolldeductionUI;

            this.countryList = response.data.allCountrys;
            console.log('this.countryList  :', this.countryList);
            this.groupContactsData = response.data.groupContactRoles;

            this.configprovinceres = response.data.states.sort(
              (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
            );
            // this.countryList =response.data.countryList;
            this.multiSlectProviances =response.data.countryList[0].countryStates;
            this.multiSlectProviances = this.multiSlectProviances.sort(
              (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
            );
            console.log(this.multiSlectProviances);
            response.data.countryList.forEach((element: any) => {
              if (element.countryStates =='1') {
               this.multiSlectProviances.push(element);

              }
            });
            this.enrollmentDates = response.data.planEnrollmentDatesFullMonth;

            console.log(this.allBrokers);
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
              } else {
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

  GetCorpDetails(CorpId: any) {
    if (CorpId == '' || CorpId == undefined) {
      this.clientregform.reset();
    } else {
      var endPoint = '/api/ap/admin/corporate/' + CorpId + '/details';
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
              console.log(response);

              this.corpDetails = response.data;

              sessionStorage.setItem(
                'corporateClientId',
                response.data.corporateClientId
              );
              sessionStorage.setItem('corporateId', CorpId);
              this.corpDetails = response.data;
              this.CorpName = response.data.corporationName;
              this.policyStartDate =
                this.datePipe.transform(
                  response.data.policyStartDate,
                  'MM-dd-yyyy'
                ) || '';
              this.domainExisting = response.data.domainExisting;
              this.streetAddress = response.data.streetAddressLine1;
              this.streetAddress2 = response.data.streetAddressLine2;
              this.country = response.data.country;

              this.city = response.data.city;
              this.postalCode = response.data.postalCode;
              this.waitTime = response.data.waitTime;
              this.useCreditCard = response.data.useCreditCard; //true
              this.padPayment = response.data.padPayment; //false
              this.invoicePayment = response.data.invoicePayment; //false
              this.imagedisplay = response.data.logo;
              this.setupWallet = response.data.setupWallet;
              this.setUplevelofCoverage = response.data.setUplevelofCoverage;
              this.adminData = response.data.groupAdmins;
              this.noOfEmployees = response.data.expectedNumberofEmployess;

              this.province = response.data.proviceShortName;
              this.paidByCompany = response.data.plans.paidByCompany;
              this.coveredByCompany = response.data.plans.coveredByCompany;
              this.paidByEmployee = response.data.plans.paidByEmployee;
              this.employeeList = response.data.employees;
              this.addedEmployeelist = response.data.employees;
              this.lengthofemployee = this.employeeList.length;

              this.countryList.forEach((element: any) => {
                if (element.countryId == this.country) {
                  this.configprovincereslist = element.countryStates;
                  this.configprovincereslist = this.configprovincereslist.sort(
                    (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
                  );

                }
              });
              // this.multiSlectProviances=;

              const dom: HTMLElement = this.elementRef.nativeElement;
              if (this.useCreditCard == true) {
                const element: any = dom.querySelector('#creditpaymentInfo');
                if(element!=null) element.click();
              } else if (this.padPayment == true) {
                const element: any = dom.querySelector('#padcreditpaymentInfo');
                if(element!=null) element.click();
              } else {
                const element: any = dom.querySelector('#invoicepaymentInfo');
                if(element!=null) element.click();
              }
              if (this.waitTime == 0) {
                // alert("Aa")
                const element: any = dom.querySelector('#nowaitingPeriod');
                if (element != null && element != undefined) element.click();
              } else if (this.waitTime == 3) {
                const element: any = dom.querySelector('#threemonths');
                if (element != null && element != undefined) element.click();
              } else if (this.waitTime == 6) {
                const element: any = dom.querySelector('#sixmonths');
                if (element != null && element != undefined) element.click();
              } else {
                const element: any = dom.querySelector('#customselection');
                if (element != null && element != undefined) element.click();
              }

              if (this.policyStartDate && this.policyStartDate.length > 0) {
                this.updateStatus(2);
              }
              if (this.province && this.province.length > 0) {
                this.updateStatus(1);
              }

              if (this.imagedisplay && this.imagedisplay.length > 0) {
                this.showimagelogo = false;
                this.uploadlogoafter = true;
              }

              if (this.adminData.length > 0) {
                sessionStorage.setItem(
                  'adminData',
                  JSON.stringify(this.adminData)
                );
                this.addadminform = false;
                this.showaddadmin = true;
                this.addadminform = false;
                // this.firstName=response.data.groupAdmins;
                for (let admin of this.adminData) {
                  admin['firstName'] = admin['firstName'] ?? '';
                  admin['lastName'] = admin['lastName'] ?? '';
                  admin['phoneNum'] = admin['phoneNum'] ?? '';
                  admin['email'] = admin['email'] ?? '';
                  admin['role'] = admin['role'] ?? '';
                  admin['roleName']=admin['roleName']??'';
                }
              }
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
                } else {
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
  }

  GetCorpDetails1(CorpId: any) {
    if (CorpId == '' || CorpId == undefined) {
      this.clientregform.reset();
    } else {
      var endPoint = '/api/ap/admin/corporate/' + CorpId + '/details';
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
              console.log(response);

              this.employeeList = response.data.employees;
              this.addedEmployeelist = response.data.employees;

              this.lengthofemployee = this.employeeList.length;
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
                } else {
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
  }

  ShowCorpDetails(name: any) {
    console.log(name);

    this.clientregform.reset();
    this.CorpName = name;
    this.addadminform = true;
    this.showaddadmin = false;
    this.adminData = '';
  }
  waitingPeriodChange(e:any){
    if(e.target.value=='Custom'){
      this.clientregform.get('waitingPeriodCustom').reset();
      this.customSelected=true;
      this.clientregform.get('waitingPeriodCustom').setValidators(Validators.required);
    }else{
      this.customSelected=false;
      this.clientregform.get('waitingPeriodCustom').reset();
      this.clientregform.get('waitingPeriodCustom').clearValidators();
    }
    this.clientregform.get('waitingPeriodCustom').updateValueAndValidity();
  }
  editCorpDetails() {
    // alert("1")
    // $("#fieldsetattr").removeattr
    $('#fieldsetattr').attr('disabled', false);
  }
  onItemSelectTiers(tier: any, planLevel: any) {
    console.log(planLevel);
    console.log(tier.id);

    console.log(tier);

    this.showinput = true;
    this.showinput1 = false;
    // planLevel.tiers.push(tier)   ///check already exit tiers
    // planLevel.tiersidArray.push(tier.id)  //check already exist tierid
    if (planLevel.tiersidArray.includes(tier.id)) {
      planLevel.coverage = ''; //default

      console.log('default');
    } else {
      console.log('second');
      planLevel.tiers.push(tier);
      planLevel.tiersidArray.push(tier.id);

      planLevel.tierid = tier.id;
      planLevel.tiername = this.capitalize(tier.name);
      planLevel.coverage = ''; //default
    }

    this.seelctedplanLevelTierMapping.push(planLevel);

    console.log(this.seelctedplanLevelTierMapping);

    //  1.disallowedplans

    // planLevel.disallowedPlanLevels

    //removing all in gold when selecting mind&body

    console.log(planLevel);
    this.unselectPlanLevelTier(
      planLevel.subGroupid,
      planLevel.parentid,
      tier.id,
      planLevel.packageindex,
      planLevel.groupindex,
      planLevel.subgroupindex
    );

    //removing mind & body when selecting all in gold
    if (planLevel.disallowedPlanLevels != null) {
      let disallowed_plans = planLevel.disallowedPlanLevels.split(','); //[1,14,24]
      const dom1: HTMLElement = this.elementRef.nativeElement;

      const disallowed_elements = dom1.querySelectorAll(
        '.plansscreen input.block1tiers'
      );

      for (let i = 0; i < disallowed_elements.length; i++) {
        let elem: any = disallowed_elements[i];
        //id/subgroupid,packageid,parentid,tierid

        if (!elem.attributes.data) {
          continue;
        }

        let plandetails = elem.attributes.data.value;

        let plandetailsobj = plandetails.split('##');

        // console.log('main', plandetailsobj);

        var currentpackageid = plandetailsobj[2];
        var currentparentid = plandetailsobj[3];
        var currentid = plandetailsobj[4];
        var currentpackagename = plandetailsobj[5];

        if (
          disallowed_plans.includes(currentparentid) ||
          disallowed_plans.includes(currentid)
        ) {
          let mappingtiers = this.seelctedplanLevelTierMapping;

          console.log(mappingtiers);

          for (let i = 0; i < mappingtiers.length; i++) {
            if (mappingtiers[i] && mappingtiers[i].subGroupid == currentid) {
              if (mappingtiers[i].tiersidArray.includes(tier.id)) {
                console.log(this.seelctedplanLevelTierMapping[i].tiers);

                this.plansBlock1Tiers[
                  this.seelctedplanLevelTierMapping[i].packageindex
                ]['groups'][this.seelctedplanLevelTierMapping[i].groupindex][
                  'subGroups'
                ][this.seelctedplanLevelTierMapping[i].subgroupindex].checked =
                  false;
                this.plansBlock1Tiers[
                  this.seelctedplanLevelTierMapping[i].packageindex
                ]['groups'][this.seelctedplanLevelTierMapping[i].groupindex][
                  'subGroups'
                ][this.seelctedplanLevelTierMapping[i].subgroupindex].tiers =
                  [];
                console.log(
                  this.selectedPackagePlansInfoTier[currentpackagename]
                );

                console.log(currentid);
                console.log(currentparentid);

                console.log(this.selectedPackagePlansInfoTier);
                let arr = this.selectedPackagePlansInfoTier[currentpackagename];
                let subGroupIdindex;
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i].subGroupid == currentid) {
                    subGroupIdindex = i;
                    break;
                  }
                }

                console.log(subGroupIdindex);

                if (subGroupIdindex > -1) {
                  console.log(subGroupIdindex);
                  this.selectedPackagePlansInfoTier[currentpackagename].splice(
                    subGroupIdindex,
                    1
                  );

                  console.log(this.selectedPackagesassignedTiers2);
                } else {
                  console.log('check1');
                }

                console.log(planLevel.packageId);
                console.log(planLevel.subGroupid);

                this.seelctedplanLevelTierMapping[i] = null;
                //1.remove this tierid from assignedTiers
                //2.Add this tierid to availbleTiers

                console.log(currentpackagename);

                console.log(currentpackageid);
                console.log(this.selectedPackagesassignedTiers2);

                // if(!this.selectedPackagesassignedTiers2[currentpackageid]){
                this.selectedPackagesassignedTiers2[currentpackageid][
                  currentid
                ] = this.selectedPackagesassignedTiers2[currentpackageid][
                  currentid
                ].filter((object) => {
                  console.log(object);
                  return object.id !== tier.id;
                });
                // }

                // let allselectedplans = this.selectedPackagesavailableTiers[currentpackagename]
              }
            }

            // sessionStorage.setItem('plansBlock1Tiers', JSON.stringify(this.plansBlock1Tiers));
          }
        }
      }
    }

    // planid,tierid,selectedplans
    // disallwoed plans --array---eachplan---selectedplans remove

    //  2.availbeltiers ,assigned tiers
    console.log(this.seelctedplanLevelTierMapping);
    console.log(this.selectedPackagePlansInfoTier);
    console.log(this.selectedPackagesassignedTiers2);

    this.seelctedplanLevelTierMapping =
      this.seelctedplanLevelTierMapping.filter((item: any) => item != null);

    console.log(this.seelctedplanLevelTierMapping);

    this.seelctedplanLevelTierMapping = [
      ...new Map(
        this.seelctedplanLevelTierMapping.map((item) => [
          item['subGroupName'],
          item,
        ])
      ).values(),
    ];

    this.seelctedplanLevelTierMapping2 = this.seelctedplanLevelTierMapping;

    if (!this.selectedPackagesavailableTiers[planLevel.packageId]) {
      this.selectedPackagesavailableTiers[planLevel.packageId] =
        this.configureTierList;
    }

    if (!this.selectedPackagesavailableTiers2[planLevel.packageId]) {
      this.selectedPackagesavailableTiers2[planLevel.packageId] = {};
      this.selectedPackagesavailableTiers2[planLevel.packageId][
        planLevel.subGroupid
      ] = this.configureTierList;
    } else {
      if (
        !this.selectedPackagesavailableTiers2[planLevel.packageId][
          planLevel.subGroupid
        ]
      ) {
        this.selectedPackagesavailableTiers2[planLevel.packageId][
          planLevel.subGroupid
        ] = this.configureTierList;
      }
    }

    // console.log(this.selectedPackagesavailableTiers[planLevel.packageName]);
    if (!this.selectedPackagesassignedTiers[planLevel.packageId]) {
      this.selectedPackagesassignedTiers[planLevel.packageId] = [];
    }

    if (!this.selectedPackagesassignedTiers2[planLevel.packageId]) {
      this.selectedPackagesassignedTiers2[planLevel.packageId] = {};
      this.selectedPackagesassignedTiers2[planLevel.packageId][
        planLevel.subGroupid
      ] = [];
    } else {
      if (
        !this.selectedPackagesassignedTiers2[planLevel.packageId][
          planLevel.subGroupid
        ]
      ) {
        this.selectedPackagesassignedTiers2[planLevel.packageId][
          planLevel.subGroupid
        ] = [];
      }
    }

    const exists =
      this.selectedPackagesassignedTiers[planLevel.packageId].findIndex(
        (item) => item.id === tier.id
      ) > -1;
    if (exists) {
      console.log('check');
    } else {
      this.selectedPackagesassignedTiers[planLevel.packageId].push(tier);

      let availablearray = this.selectedPackagesavailableTiers[
        planLevel.packageId
      ].filter((object) => {
        return object.id !== tier.id;
      });

      this.selectedPackagesavailableTiers[planLevel.packageId] = availablearray;
    }

    const exists2 =
      this.selectedPackagesassignedTiers2[planLevel.packageId][
        planLevel.subGroupid
      ].findIndex((item) => item.id === tier.id) > -1;
    if (exists2) {
      console.log('check2');
      let groups = Object.keys(
        this.selectedPackagesavailableTiers2[planLevel.packageId]
      );

      console.log(groups);

      for (let group of groups) {
        if (group == planLevel.subGroupid) {
          continue;
        }
        if (!this.selectedPackagesavailableTiers2[planLevel.packageId][group]) {
          console.log('assigningCOnfigTierlist');
          this.selectedPackagesavailableTiers2[planLevel.packageId][group] =
            this.configureTierList;

          console.log(this.configureTierList);
        } else {
          console.log('alrradyexist');
        }
        let availablearray2 = this.selectedPackagesavailableTiers2[
          planLevel.packageId
        ][group].filter((object) => {
          return object.id !== tier.id;
        });

        console.log(availablearray2);
        this.selectedPackagesavailableTiers2[planLevel.packageId][group] =
          availablearray2; //Here Close
      }
    } else {
      console.log('else check2');

      let assignedarry2 = [];
      assignedarry2 =
        this.selectedPackagesassignedTiers2[planLevel.packageId][
          planLevel.subGroupid
        ];
      assignedarry2.push(tier);

      this.selectedPackagesassignedTiers2[planLevel.packageId][
        planLevel.subGroupid
      ] = assignedarry2;
    }
    console.log(this.seelctedplanLevelTierMapping);
    console.log(this.selectedPackagesavailableTiers);
    console.log(this.selectedPackagesassignedTiers);

    console.log(this.seelctedplanLevelTierMapping2);
    console.log(this.selectedPackagesavailableTiers2);
    console.log(this.selectedPackagesassignedTiers2);

    // sessionStorage.setItem("seelctedplanLevelTierMapping",JSON.stringify(this.seelctedplanLevelTierMapping))
  }

  onItemSelectTiersBlock2(tier: any, planLevel: any) {
    // console.log(planLevel)

    // planLevel.tiers.push(tier)   ///check already exit tiers
    // planLevel.tiersidArray.push(tier.id)  //check already exist tierid

    this.showinputBlock2 = true;
    this.showinput1Block2 = false;

    console.log(this.seelctedplanLevelTierMappingBlock2);

    if (planLevel.tiersidArray.includes(tier.id)) {
      planLevel.coverage = ''; //default
    } else {
      planLevel.tiers.push(tier);
      planLevel.tiersidArray.push(tier.id);

      planLevel.tierid = tier.id;
      planLevel.tiername = this.capitalize(tier.name);
      planLevel.coverage = ''; //default
    }

    this.seelctedplanLevelTierMappingBlock2.push(planLevel);

    console.log(this.seelctedplanLevelTierMappingBlock2);

    //  1.disallowedplans

    // planLevel.disallowedPlanLevels

    //removing all in gold when selecting mind&body

    console.log(planLevel);
    this.unselectPlanLevelTierBlock2(
      planLevel.subGroupid,
      planLevel.parentid,
      tier.id
    );

    //removing mind & body when selecting all in gold
    if (planLevel.disallowedPlanLevels != null) {
      let disallowed_plans = planLevel.disallowedPlanLevels.split(','); //[1,10,14]
      const dom1: HTMLElement = this.elementRef.nativeElement;

      const disallowed_elements = dom1.querySelectorAll(
        '.plansscreen input.block2tiers'
      );

      for (let i = 0; i < disallowed_elements.length; i++) {
        let elem: any = disallowed_elements[i];
        //id/subgroupid,packageid,parentid,tierid

        if (!elem.attributes.data) {
          continue;
        }

        let plandetails = elem.attributes.data.value;

        let plandetailsobj = plandetails.split('##');

        // console.log('main', plandetailsobj);

        var currentpackageid = plandetailsobj[2];
        var currentparentid = plandetailsobj[3];
        var currentid = plandetailsobj[4];
        var currentpackagename = plandetailsobj[5];

        if (
          disallowed_plans.includes(currentparentid) ||
          disallowed_plans.includes(currentid)
        ) {
          let mappingtiers = this.seelctedplanLevelTierMappingBlock2;

          for (let i = 0; i < mappingtiers.length; i++) {
            if (mappingtiers[i] && mappingtiers[i].subGroupid == currentid) {
              if (mappingtiers[i].tiersidArray.includes(tier.id)) {
                // if (mappingtiers[i].tierid==tier.id) {
                //remove this plan from seelctedplanLevelTierMapping

                console.log(this.seelctedplanLevelTierMappingBlock2[i].tiers);

                //  const index = this.seelctedplanLevelTierMapping[i].tiers.findIndex((item) => item.id === tier.id);
                //  if (index !== -1) {
                //   this.seelctedplanLevelTierMapping[i].tiers.splice(index, 1);
                //    return this.seelctedplanLevelTierMapping[i].tiers;
                //  }

                this.plansresblack2Tiers[
                  this.seelctedplanLevelTierMappingBlock2[i].packageindex
                ]['groups'][
                  this.seelctedplanLevelTierMappingBlock2[i].groupindex
                ]['subGroups'][
                  this.seelctedplanLevelTierMappingBlock2[i].subgroupindex
                ].checked = false;
                this.plansresblack2Tiers[
                  this.seelctedplanLevelTierMappingBlock2[i].packageindex
                ]['groups'][
                  this.seelctedplanLevelTierMappingBlock2[i].groupindex
                ]['subGroups'][
                  this.seelctedplanLevelTierMappingBlock2[i].subgroupindex
                ].tiers = [];

                let arr =
                  this.selectedPackagePlansInfoTierBlock2[currentpackagename];
                let subGroupIdindex;
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i].subGroupid == currentid) {
                    subGroupIdindex = i;
                    break;
                  }
                }

                console.log(subGroupIdindex);

                if (subGroupIdindex > -1) {
                  console.log(subGroupIdindex);
                  this.selectedPackagePlansInfoTierBlock2[
                    currentpackagename
                  ].splice(subGroupIdindex, 1);

                  console.log(this.selectedPackagePlansInfoTierBlock2);
                } else {
                  console.log('check1');
                }
                this.seelctedplanLevelTierMappingBlock2[i] = null;
                //1.remove this tierid from assignedTiers
                //2.Add this tierid to availbleTiers

                this.selectedPackagesavailableTiers2Block2[currentpackageid][
                  currentid
                ] = this.selectedPackagesavailableTiers2Block2[
                  currentpackageid
                ][currentid].filter((object) => {
                  console.log(object);
                  return object.id !== tier.id;
                });

                // console.log(
                //   this.selectedPackagesavailableTiersBlock2[currentpackagename]
                // );
                // this.selectedPackagesavailableTiersBlock2[
                //   currentpackagename
                // ].push(tier);

                // let allselectedplans = this.selectedPackagesavailableTiers[currentpackagename]
              }
            }
          }
        }
      }
    }

    // planid,tierid,selectedplans
    // disallwoed plans --array---eachplan---selectedplans remove

    //  2.availbeltiers ,assigned tiers
    console.log(this.seelctedplanLevelTierMappingBlock2);

    this.seelctedplanLevelTierMappingBlock2 =
      this.seelctedplanLevelTierMappingBlock2.filter(
        (item: any) => item != null
      );

    console.log(this.seelctedplanLevelTierMappingBlock2);

    this.seelctedplanLevelTierMappingBlock2 = [
      ...new Map(
        this.seelctedplanLevelTierMappingBlock2.map((item) => [
          item['subGroupName'],
          item,
        ])
      ).values(),
    ];

    this.seelctedplanLevelTierMapping2Block2 =
      this.seelctedplanLevelTierMappingBlock2;
    // console.log(this.seelctedplanLevelTierMapping);

    // for(let i=0;i<this.seelctedplanLevelTierMapping.length;i++){
    //   const dom: HTMLElement = this.elementRef.nativeElement;
    //   const element: any = dom.querySelector("#plancheck" + this.seelctedplanLevelTierMapping[i].subGroupid);

    //     element.click()
    // }

    // this.plansBlock1[planLevel.packageindex]['groups'][planLevel.groupindex][
    //   'subGroups'
    // ][planLevel.subgroupindex].checked = true;

    if (!this.selectedPackagesavailableTiersBlock2[planLevel.packageId]) {
      this.selectedPackagesavailableTiersBlock2[planLevel.packageId] =
        this.configureTierList;
    }
    if (!this.selectedPackagesavailableTiers2Block2[planLevel.packageId]) {
      this.selectedPackagesavailableTiers2Block2[planLevel.packageId] = {};
      this.selectedPackagesavailableTiers2Block2[planLevel.packageId][
        planLevel.subGroupid
      ] = this.configureTierList;
    } else {
      if (
        !this.selectedPackagesavailableTiers2Block2[planLevel.packageId][
          planLevel.subGroupid
        ]
      ) {
        this.selectedPackagesavailableTiers2Block2[planLevel.packageId][
          planLevel.subGroupid
        ] = this.configureTierList;
      }
    }

    // console.log(this.selectedPackagesavailableTiers[planLevel.packageName]);
    if (!this.selectedPackagesassignedTiersBlock2[planLevel.packageId]) {
      this.selectedPackagesassignedTiersBlock2[planLevel.packageId] = [];
    }

    if (!this.selectedPackagesassignedTiers2Block2[planLevel.packageId]) {
      this.selectedPackagesassignedTiers2Block2[planLevel.packageId] = {};
      this.selectedPackagesassignedTiers2Block2[planLevel.packageId][
        planLevel.subGroupid
      ] = [];
    } else {
      if (
        !this.selectedPackagesassignedTiers2Block2[planLevel.packageId][
          planLevel.subGroupid
        ]
      ) {
        this.selectedPackagesassignedTiers2Block2[planLevel.packageId][
          planLevel.subGroupid
        ] = [];
      }
    }

    const exists =
      this.selectedPackagesassignedTiersBlock2[planLevel.packageId].findIndex(
        (item) => item.id === tier.id
      ) > -1;
    if (exists) {
      console.log('check');
    } else {
      // this.selectedPackagesassignedTiersBlock2[planLevel.packageId].push(tier);
      // let availablearray = this.selectedPackagesavailableTiersBlock2[
      //   planLevel.packageId
      // ].filter((object) => {
      //   return object.id !== tier.id;
      // });
      // this.selectedPackagesavailableTiersBlock2[planLevel.packageId] =
      //   availablearray;
    }

    const exists2 =
      this.selectedPackagesassignedTiers2Block2[planLevel.packageId][
        planLevel.subGroupid
      ].findIndex((item) => item.id === tier.id) > -1;
    if (exists2) {
      console.log('check2');
      let groups = Object.keys(
        this.selectedPackagesavailableTiers2Block2[planLevel.packageId]
      );

      console.log(groups);

      for (let group of groups) {
        if (group == planLevel.subGroupid) {
          continue;
        }
        if (
          !this.selectedPackagesavailableTiers2Block2[planLevel.packageId][
            group
          ]
        ) {
          console.log('assigningCOnfigTierlist');
          this.selectedPackagesavailableTiers2Block2[planLevel.packageId][
            group
          ] = this.configureTierList;
        } else {
          console.log('alrradyexist');
        }
        let availablearray2 = this.selectedPackagesavailableTiers2Block2[
          planLevel.packageId
        ][group].filter((object) => {
          return object.id !== tier.id;
        });
        this.selectedPackagesavailableTiers2Block2[planLevel.packageId][group] =
          availablearray2;
      }
    } else {
      console.log('else check2');

      let assignedarry2block2 = [];
      assignedarry2block2 =
        this.selectedPackagesassignedTiers2Block2[planLevel.packageId][
          planLevel.subGroupid
        ];
      assignedarry2block2.push(tier);

      this.selectedPackagesassignedTiers2Block2[planLevel.packageId][
        planLevel.subGroupid
      ] = assignedarry2block2;
    }
    console.log(this.seelctedplanLevelTierMappingBlock2);
    console.log(this.selectedPackagesavailableTiersBlock2);
    console.log(this.selectedPackagesassignedTiersBlock2);

    console.log(this.seelctedplanLevelTierMapping2Block2);
    console.log(this.selectedPackagesavailableTiers2Block2);
    console.log(this.selectedPackagesassignedTiers2Block2);

    // sessionStorage.setItem("seelctedplanLevelTierMapping",JSON.stringify(this.seelctedplanLevelTierMapping))
  }
  onItemSelectTiersBlock3(tier: any, planLevel: any) {
    console.log('123456789098765432345678', planLevel);

    // planLevel.tiers.push(tier)   ///check already exit tiers
    // planLevel.tiersidArray.push(tier.id)  //check already exist tierid

    this.showinputBlock3 = true;
    this.showinput1Block3 = false;

    if (planLevel.tiersidArray.includes(tier.id)) {
      planLevel.coverage = ''; //default
    } else {
      planLevel.tiers.push(tier);
      planLevel.tiersidArray.push(tier.id);

      planLevel.tierid = tier.id;
      planLevel.tiername = this.capitalize(tier.name);
      planLevel.coverage = ''; //default
    }

    this.seelctedplanLevelTierMappingBlock3.push(planLevel);

    console.log(this.seelctedplanLevelTierMappingBlock3);

    //  1.disallowedplans

    // planLevel.disallowedPlanLevels

    //removing all in gold when selecting mind&body

    console.log(planLevel);
    this.unselectPlanLevelTierBlock3(
      planLevel.subGroupid,
      planLevel.parentid,
      tier.id
    );

    //removing mind & body when selecting all in gold
    if (planLevel.disallowedPlanLevels != null) {
      let disallowed_plans = planLevel.disallowedPlanLevels.split(','); //[1,10,14]
      const dom1: HTMLElement = this.elementRef.nativeElement;

      const disallowed_elements = dom1.querySelectorAll(
        '.plansscreen input.block3tiers'
      );

      for (let i = 0; i < disallowed_elements.length; i++) {
        let elem: any = disallowed_elements[i];
        //id/subgroupid,packageid,parentid,tierid

        if (!elem.attributes.data) {
          continue;
        }

        let plandetails = elem.attributes.data.value;

        let plandetailsobj = plandetails.split('##');

        // console.log('main', plandetailsobj);

        var currentpackageid = plandetailsobj[2];
        var currentparentid = plandetailsobj[3];
        var currentid = plandetailsobj[4];
        var currentpackagename = plandetailsobj[5];

        if (
          disallowed_plans.includes(currentparentid) ||
          disallowed_plans.includes(currentid)
        ) {
          let mappingtiers = this.seelctedplanLevelTierMappingBlock3;

          for (let i = 0; i < mappingtiers.length; i++) {
            if (mappingtiers[i] && mappingtiers[i].subGroupid == currentid) {
              if (mappingtiers[i].tiersidArray.includes(tier.id)) {
                // if (mappingtiers[i].tierid==tier.id) {
                //remove this plan from seelctedplanLevelTierMapping

                console.log(this.seelctedplanLevelTierMappingBlock3[i].tiers);

                //  const index = this.seelctedplanLevelTierMapping[i].tiers.findIndex((item) => item.id === tier.id);
                //  if (index !== -1) {
                //   this.seelctedplanLevelTierMapping[i].tiers.splice(index, 1);
                //    return this.seelctedplanLevelTierMapping[i].tiers;
                //  }

                this.plansresblack3Tiers[
                  this.seelctedplanLevelTierMappingBlock3[i].packageindex
                ]['groups'][
                  this.seelctedplanLevelTierMappingBlock3[i].groupindex
                ]['subGroups'][
                  this.seelctedplanLevelTierMappingBlock3[i].subgroupindex
                ].checked = false;

                this.plansresblack3Tiers[
                  this.seelctedplanLevelTierMappingBlock3[i].packageindex
                ]['groups'][
                  this.seelctedplanLevelTierMappingBlock3[i].groupindex
                ]['subGroups'][
                  this.seelctedplanLevelTierMappingBlock3[i].subgroupindex
                ].tiers = [];
                let arr =
                  this.selectedPackagePlansInfoTierBlock3[currentpackagename];
                let subGroupIdindex;
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i].subGroupid == currentid) {
                    subGroupIdindex = i;
                    break;
                  }
                }

                console.log(subGroupIdindex);

                if (subGroupIdindex > -1) {
                  console.log(subGroupIdindex);
                  this.selectedPackagePlansInfoTierBlock3[
                    currentpackagename
                  ].splice(subGroupIdindex, 1);

                  console.log(this.selectedPackagePlansInfoTierBlock3);
                } else {
                  console.log('check1');
                }

                this.seelctedplanLevelTierMappingBlock3[i] = null;
                //1.remove this tierid from assignedTiers
                //2.Add this tierid to availbleTiers

                this.selectedPackagesavailableTiers3Block3[currentpackageid][
                  currentid
                ] = this.selectedPackagesavailableTiers3Block3[
                  currentpackageid
                ][currentid].filter((object) => {
                  console.log(object);
                  return object.id !== tier.id;
                });

                console.log(
                  this.selectedPackagesavailableTiersBlock3[currentpackagename]
                );
                this.selectedPackagesavailableTiersBlock3[
                  currentpackagename
                ].push(tier);

                // let allselectedplans = this.selectedPackagesavailableTiers[currentpackagename]
              }
            }
          }
        }
      }
    }

    // planid,tierid,selectedplans
    // disallwoed plans --array---eachplan---selectedplans remove

    //  2.availbeltiers ,assigned tiers
    console.log(this.seelctedplanLevelTierMappingBlock3);

    this.seelctedplanLevelTierMappingBlock3 =
      this.seelctedplanLevelTierMappingBlock3.filter(
        (item: any) => item != null
      );

    console.log(this.seelctedplanLevelTierMappingBlock3);

    this.seelctedplanLevelTierMappingBlock3 = [
      ...new Map(
        this.seelctedplanLevelTierMappingBlock3.map((item) => [
          item['subGroupName'],
          item,
        ])
      ).values(),
    ];

    this.seelctedplanLevelTierMapping3Block3 =
      this.seelctedplanLevelTierMappingBlock3;

    if (!this.selectedPackagesavailableTiersBlock3[planLevel.packageId]) {
      this.selectedPackagesavailableTiersBlock3[planLevel.packageId] =
        this.configureTierList;
    }
    if (!this.selectedPackagesavailableTiers3Block3[planLevel.packageId]) {
      this.selectedPackagesavailableTiers3Block3[planLevel.packageId] = {};
      this.selectedPackagesavailableTiers3Block3[planLevel.packageId][
        planLevel.subGroupid
      ] = this.configureTierList;
    } else {
      if (
        !this.selectedPackagesavailableTiers3Block3[planLevel.packageId][
          planLevel.subGroupid
        ]
      ) {
        this.selectedPackagesavailableTiers3Block3[planLevel.packageId][
          planLevel.subGroupid
        ] = this.configureTierList;
      }
    }

    // console.log(this.selectedPackagesavailableTiers[planLevel.packageName]);
    if (!this.selectedPackagesassignedTiersBlock3[planLevel.packageId]) {
      this.selectedPackagesassignedTiersBlock3[planLevel.packageId] = [];
    }
    if (!this.selectedPackagesassignedTiers3Block3[planLevel.packageId]) {
      this.selectedPackagesassignedTiers3Block3[planLevel.packageId] = {};
      this.selectedPackagesassignedTiers3Block3[planLevel.packageId][
        planLevel.subGroupid
      ] = [];
    } else {
      if (
        !this.selectedPackagesassignedTiers3Block3[planLevel.packageId][
          planLevel.subGroupid
        ]
      ) {
        this.selectedPackagesassignedTiers3Block3[planLevel.packageId][
          planLevel.subGroupid
        ] = [];
      }
    }

    const exists =
      this.selectedPackagesassignedTiersBlock3[planLevel.packageId].findIndex(
        (item) => item.id === tier.id
      ) > -1;
    if (exists) {
      console.log('check');
    } else {
      // this.selectedPackagesassignedTiersBlock3[planLevel.packageId].push(tier);
      // let availablearray = this.selectedPackagesavailableTiersBlock3[
      //   planLevel.packageId
      // ].filter((object) => {
      //   return object.id !== tier.id;
      // });
      // this.selectedPackagesavailableTiersBlock3[planLevel.packageId] =
      //   availablearray;
    }

    const exists2 =
      this.selectedPackagesassignedTiers3Block3[planLevel.packageId][
        planLevel.subGroupid
      ].findIndex((item) => item.id === tier.id) > -1;
    if (exists2) {
      console.log('check2');
      let groups = Object.keys(
        this.selectedPackagesavailableTiers3Block3[planLevel.packageId]
      );

      console.log(groups);

      for (let group of groups) {
        if (group == planLevel.subGroupid) {
          continue;
        }
        if (
          !this.selectedPackagesavailableTiers3Block3[planLevel.packageId][
            group
          ]
        ) {
          console.log('assigningCOnfigTierlist');
          this.selectedPackagesavailableTiers3Block3[planLevel.packageId][
            group
          ] = this.configureTierList;
        } else {
          console.log('alrradyexist');
        }
        let availablearray2 = this.selectedPackagesavailableTiers3Block3[
          planLevel.packageId
        ][group].filter((object) => {
          return object.id !== tier.id;
        });
        this.selectedPackagesavailableTiers3Block3[planLevel.packageId][group] =
          availablearray2;
      }
    } else {
      console.log('else check2');

      let assignedarry2block3 = [];
      assignedarry2block3 =
        this.selectedPackagesassignedTiers3Block3[planLevel.packageId][
          planLevel.subGroupid
        ];
      assignedarry2block3.push(tier);

      this.selectedPackagesassignedTiers3Block3[planLevel.packageId][
        planLevel.subGroupid
      ] = assignedarry2block3;
    }
    console.log(this.seelctedplanLevelTierMappingBlock3);
    console.log(this.selectedPackagesavailableTiersBlock3);
    console.log(this.selectedPackagesassignedTiersBlock3);

    console.log(this.seelctedplanLevelTierMapping3Block3);
    console.log(this.selectedPackagesavailableTiers3Block3);
    console.log(this.selectedPackagesassignedTiers3Block3);

    // sessionStorage.setItem("seelctedplanLevelTierMapping",JSON.stringify(this.seelctedplanLevelTierMapping))
  }

  showSlectedPlansTiers() {
    console.log(this.seelctedplanLevelTierMapping);
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements: any = dom.querySelectorAll('input.block1tiers');

    for (let element of elements) {
      // console.log(element);
      element.checked = false;
    }

    let slectedTierBlcok1 = [];
    for (let i = 0; i < this.seelctedplanLevelTierMapping.length; i++) {
      let selecplanLevel = this.seelctedplanLevelTierMapping[i];
      if (
        this.seelctedplanLevelTierMapping[i].subGroupName ==
          'Complete Executive Care' ||
        this.seelctedplanLevelTierMapping[i].subGroupName == 'Executive Health'
      ) {
        //default
        if (this.seelctedplanLevelTierMapping[i].coverage == '') {
          this.seelctedplanLevelTierMapping[i].coverage = '001';
        }
      }
      const dom: HTMLElement = this.elementRef.nativeElement;
      const element: any = dom.querySelector(
        '#plancheck' + selecplanLevel.subGroupid
      );

      element.checked = true;
      this.plansBlock1Tiers[selecplanLevel.packageindex]['groups'][
        selecplanLevel.groupindex
      ]['subGroups'][selecplanLevel.subgroupindex].checked = true;
      this.plansBlock1Tiers[selecplanLevel.packageindex]['groups'][
        selecplanLevel.groupindex
      ]['subGroups'][selecplanLevel.subgroupindex].tiers = selecplanLevel.tiers;

      let tiersarray = selecplanLevel.tiers;

      for (let j = 0; j < tiersarray.length; j++) {
        slectedTierBlcok1.push(tiersarray[j].name);
      }
    }
  }
  showSlectedPlansTiersBlock2() {
    console.log(this.seelctedplanLevelTierMappingBlock2);
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements: any = dom.querySelectorAll('input.block2tiers');

    for (let element of elements) {
      // console.log(element);
      element.checked = false;
    }

    let slectedTierBlcok1 = [];
    for (let i = 0; i < this.seelctedplanLevelTierMappingBlock2.length; i++) {
      let selecplanLevel = this.seelctedplanLevelTierMappingBlock2[i];

      if (
        this.seelctedplanLevelTierMappingBlock2[i].subGroupName ==
          'Complete Executive Care' ||
        this.seelctedplanLevelTierMappingBlock2[i].subGroupName ==
          'Executive Health'
      ) {
        //default
        if (this.seelctedplanLevelTierMappingBlock2[i].coverage == '') {
          this.seelctedplanLevelTierMappingBlock2[i].coverage = '001';
        }
      }

      const dom: HTMLElement = this.elementRef.nativeElement;
      const element: any = dom.querySelector(
        '#plancheck2' + selecplanLevel.subGroupid
      );

      element.checked = true;
      this.plansresblack2Tiers[selecplanLevel.packageindex]['groups'][
        selecplanLevel.groupindex
      ]['subGroups'][selecplanLevel.subgroupindex].checked = true;
      this.plansresblack2Tiers[selecplanLevel.packageindex]['groups'][
        selecplanLevel.groupindex
      ]['subGroups'][selecplanLevel.subgroupindex].tiers = selecplanLevel.tiers;

      let tiersarray = selecplanLevel.tiers;

      for (let j = 0; j < tiersarray.length; j++) {
        slectedTierBlcok1.push(tiersarray[j].name);
      }
    }
  }
  showSlectedPlansTiersBlock3() {
    console.log(this.seelctedplanLevelTierMappingBlock3);

    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements: any = dom.querySelectorAll('input.block3tiers');

    for (let element of elements) {
      console.log(element);
      element.checked = false;
    }

    let slectedTierBlcok1 = [];
    for (let i = 0; i < this.seelctedplanLevelTierMappingBlock3.length; i++) {
      let selecplanLevel = this.seelctedplanLevelTierMappingBlock3[i];
      if (
        this.seelctedplanLevelTierMappingBlock3[i].subGroupName ==
          'Complete Executive Care' ||
        this.seelctedplanLevelTierMappingBlock3[i].subGroupName ==
          'Executive Health'
      ) {
        //default
        if (this.seelctedplanLevelTierMappingBlock3[i].coverage == '') {
          this.seelctedplanLevelTierMappingBlock3[i].coverage = '001';
        }
      }
      const dom: HTMLElement = this.elementRef.nativeElement;
      const element: any = dom.querySelector(
        '#plancheck3' + selecplanLevel.subGroupid
      );

      element.checked = true;
      this.plansresblack3Tiers[selecplanLevel.packageindex]['groups'][
        selecplanLevel.groupindex
      ]['subGroups'][selecplanLevel.subgroupindex].checked = true;
      this.plansresblack3Tiers[selecplanLevel.packageindex]['groups'][
        selecplanLevel.groupindex
      ]['subGroups'][selecplanLevel.subgroupindex].tiers = selecplanLevel.tiers;

      let tiersarray = selecplanLevel.tiers;

      for (let j = 0; j < tiersarray.length; j++) {
        slectedTierBlcok1.push(tiersarray[j].name);
      }
    }
  }
  onItemremoveTiers(tier: any, planLevel: any) {
    // 1.remove tier from selected list ui
    // 2.Remove from assigned tiers
    // 3.Add to Availabel Tiers
    // 4.Remove from Selected Plans

    console.log(tier);
    console.log(planLevel);

    // this.selectedPackagesassignedTiers[planLevel.packageId] =
    //   this.selectedPackagesassignedTiers[planLevel.packageId].filter(
    //     (object) => {
    //       return object.id !== tier.id;
    //     }
    //   );

    console.log(this.selectedPackagesassignedTiers2);
    console.log(this.selectedPackagesavailableTiers2);

    if (!this.selectedPackagesassignedTiers2[planLevel.packageId]) {
      this.selectedPackagesassignedTiers2[planLevel.packageId] =
        this.selectedPackagesassignedTiers2[planLevel.packageId].filter(
          (object) => {
            return object.id !== tier.id;
          }
        );
    }

    let groups = Object.keys(
      this.selectedPackagesavailableTiers2[planLevel.packageId]
    );

    console.log(groups);

    for (let group of groups) {
      console.log(group);
      console.log(planLevel.subGroupid);
      if (group == planLevel.subGroupid) {
        continue;
      }
      if (!this.selectedPackagesavailableTiers2[planLevel.packageId][group]) {
        this.selectedPackagesavailableTiers2[planLevel.packageId][group] = [];
        console.log('CheckingassigningCOnfigTierlist');
      } else {
        console.log('alrradyexist');
      }
      // console.log(this.selectedPackagesassignedTiers2)
      let available2 = [];
      available2 =
        this.selectedPackagesavailableTiers2[planLevel.packageId][group];

      available2.push(tier);
      this.selectedPackagesavailableTiers2[planLevel.packageId][group] =
        available2;
    }

    this.showinput = false;
    this.showinput1 = true;

    console.log(this.selectedPackagesavailableTiers2);

    this.selectedPackagesavailableTiers21 =
      this.selectedPackagesavailableTiers2;
    this.selectedPackagesassignedTiers21 = this.selectedPackagesassignedTiers2;

    let mappingtiers = this.seelctedplanLevelTierMapping;

    for (let i = 0; i < mappingtiers.length; i++) {
      console.log(mappingtiers[i].subGroupid);
      console.log(planLevel.subGroupid);
      if (
        mappingtiers[i] &&
        mappingtiers[i].subGroupid == planLevel.subGroupid
      ) {
        for (let j = 0; j < mappingtiers[i].tiers.length; j++) {
          if (mappingtiers[i].tiers[j].id == tier.id) {
            mappingtiers[i].tiers[j] = null;
            // console.log("checkhere")
          }

          if (mappingtiers[i].tiersidArray.includes(tier.id)) {
            mappingtiers[i].tiersidArray.splice(i, 1);
          }
        }

        if (mappingtiers[i].tiers.length > 0) {
          mappingtiers[i].tiers = mappingtiers[i].tiers.filter(
            (item: any) => item != null
          );
        }
      }
    }

    this.seelctedplanLevelTierMapping = mappingtiers;

    this.seelctedplanLevelTierMapping =
      this.seelctedplanLevelTierMapping.filter((item: any) => item != null);

    console.log(this.seelctedplanLevelTierMapping);
  }

  checkhere() {
    setTimeout(() => {
      console.log(this.selectedPackagesavailableTiers21);
      console.log(this.selectedPackagesassignedTiers21);
    }, 1000);
  }
  onItemremoveTiersBlock2(tier: any, planLevel: any) {
    // 1.remove tier from seelcted list ui
    // 2.Remove from assigned tiers
    // 3.Add to Availabel Tiers
    // 4.Remove from Seelcted Plans

    if (!this.selectedPackagesassignedTiers2Block2[planLevel.packageId]) {
      this.selectedPackagesassignedTiers2Block2[planLevel.packageId] =
        this.selectedPackagesassignedTiers2Block2[planLevel.packageId].filter(
          (object) => {
            return object.id !== tier.id;
          }
        );
    }

    console.log(this.selectedPackagesassignedTiers2Block2);

    // this.selectedPackagesavailableTiersBlock2[planLevel.packageId].push(tier);

    let groups = Object.keys(
      this.selectedPackagesavailableTiers2Block2[planLevel.packageId]
    );

    console.log(groups);

    for (let group of groups) {
      console.log(group);
      console.log(planLevel.subGroupid);
      if (group == planLevel.subGroupid) {
        continue;
      }
      if (
        !this.selectedPackagesavailableTiers2Block2[planLevel.packageId][group]
      ) {
        this.selectedPackagesavailableTiers2Block2[planLevel.packageId][group] =
          [];
        console.log('CheckingassigningCOnfigTierlist');
      } else {
        console.log('alrradyexist');
      }
      // console.log(this.selectedPackagesassignedTiers2)
      let available2 = [];
      available2 =
        this.selectedPackagesavailableTiers2Block2[planLevel.packageId][group];

      available2.push(tier);
      this.selectedPackagesavailableTiers2Block2[planLevel.packageId][group] =
        available2;
    }

    this.showinputBlock2 = false;
    this.showinput1Block2 = true;

    console.log(this.selectedPackagesavailableTiers2Block2);

    this.selectedPackagesavailableTiers2Block21 =
      this.selectedPackagesavailableTiers2Block2;
    this.selectedPackagesassignedTiers2Block21 =
      this.selectedPackagesassignedTiers2Block2;

    let mappingtiers = this.seelctedplanLevelTierMappingBlock2;

    for (let i = 0; i < mappingtiers.length; i++) {
      console.log(mappingtiers[i].subGroupid);
      console.log(planLevel.subGroupid);
      if (
        mappingtiers[i] &&
        mappingtiers[i].subGroupid == planLevel.subGroupid
      ) {
        for (let j = 0; j < mappingtiers[i].tiers.length; j++) {
          if (mappingtiers[i].tiers[j].id == tier.id) {
            mappingtiers[i].tiers[j] = null;
            // console.log("checkhere")
          }
          if (mappingtiers[i].tiersidArray.includes(tier.id)) {
            mappingtiers[i].tiersidArray.splice(i, 1);
          }
        }

        if (mappingtiers[i].tiers.length > 0) {
          mappingtiers[i].tiers = mappingtiers[i].tiers.filter(
            (item: any) => item != null
          );
        }
      }
    }

    this.seelctedplanLevelTierMappingBlock2 = mappingtiers;

    this.seelctedplanLevelTierMappingBlock2 =
      this.seelctedplanLevelTierMappingBlock2.filter(
        (item: any) => item != null
      );

    console.log(this.seelctedplanLevelTierMappingBlock2);
  }
  onItemremoveTiersBlock3(tier: any, planLevel: any) {
    // 1.remove tier from seelcted list ui
    // 2.Remove from assigned tiers
    // 3.Add to Availabel Tiers
    // 4.Remove from Seelcted Plans

    if (!this.selectedPackagesassignedTiers3Block3[planLevel.packageId]) {
      this.selectedPackagesassignedTiers3Block3[planLevel.packageId] =
        this.selectedPackagesassignedTiers3Block3[planLevel.packageId].filter(
          (object) => {
            return object.id !== tier.id;
          }
        );
    }

    console.log(this.selectedPackagesassignedTiers3Block3);

    // this.selectedPackagesavailableTiersBlock3[planLevel.packageId].push(tier);

    let groups = Object.keys(
      this.selectedPackagesavailableTiers3Block3[planLevel.packageId]
    );

    console.log(groups);

    for (let group of groups) {
      console.log(group);
      console.log(planLevel.subGroupid);
      if (group == planLevel.subGroupid) {
        continue;
      }
      if (
        !this.selectedPackagesavailableTiers3Block3[planLevel.packageId][group]
      ) {
        this.selectedPackagesavailableTiers3Block3[planLevel.packageId][group] =
          [];
        console.log('CheckingassigningCOnfigTierlist');
      } else {
        console.log('alrradyexist');
      }
      // console.log(this.selectedPackagesassignedTiers2)
      let available2 = [];
      available2 =
        this.selectedPackagesavailableTiers3Block3[planLevel.packageId][group];

      available2.push(tier);
      this.selectedPackagesavailableTiers3Block3[planLevel.packageId][group] =
        available2;
    }

    this.showinputBlock3 = false;
    this.showinput1Block3 = true;

    console.log(this.selectedPackagesavailableTiers3Block3);

    this.selectedPackagesavailableTiers3Block31 =
      this.selectedPackagesavailableTiers3Block3;
    this.selectedPackagesassignedTiers3Block31 =
      this.selectedPackagesassignedTiers3Block3;

    let mappingtiers = this.seelctedplanLevelTierMappingBlock3;

    for (let i = 0; i < mappingtiers.length; i++) {
      console.log(mappingtiers[i].subGroupid);
      console.log(planLevel.subGroupid);
      if (
        mappingtiers[i] &&
        mappingtiers[i].subGroupid == planLevel.subGroupid
      ) {
        for (let j = 0; j < mappingtiers[i].tiers.length; j++) {
          if (mappingtiers[i].tiers[j].id == tier.id) {
            mappingtiers[i].tiers[j] = null;
            // console.log("checkhere")
          }
          if (mappingtiers[i].tiersidArray.includes(tier.id)) {
            mappingtiers[i].tiersidArray.splice(i, 1);
          }
        }

        if (mappingtiers[i].tiers.length > 0) {
          mappingtiers[i].tiers = mappingtiers[i].tiers.filter(
            (item: any) => item != null
          );
        }

        // if (mappingtiers[i].tiersidArray.includes(tier.id)) {
        //   // if (mappingtiers[i].tierid==tier.id) {
        //   //remove this plan from seelctedplanLevelTierMapping
        //   this.seelctedplanLevelTierMapping[i] = null;
        // }
      }
    }

    this.seelctedplanLevelTierMappingBlock3 = mappingtiers;

    // console.log(this.seelctedplanLevelTierMapping);
    this.seelctedplanLevelTierMappingBlock3 =
      this.seelctedplanLevelTierMappingBlock3.filter(
        (item: any) => item != null
      );

    // console.log(this.selectedPackagesavailableTiers);
    // console.log(this.selectedPackagesassignedTiers);
  }
  onItemSelect(
    item: any,
    packageid: number,
    parentId: number,
    subgroupid: number,
    packageindex: number,
    groupindex: number,
    subgroupindex: number
  ) {
    // console.log(item);
    // console.log(packageid);
    // console.log(parentId);
    // console.log(subgroupid);

    let Mainplanres = JSON.parse(sessionStorage.getItem('planResults'));

    Mainplanres[packageindex]['groups'][groupindex]['subGroups'][subgroupindex][
      'tiers'
    ].push(item);
    // Mainplanres[packageindex]['groups'][groupindex]['subGroups'][subgroupindex]['checked']=true;

    this.plansBlock1 = Mainplanres;
    // console.log(this.plansBlock1)

    sessionStorage.setItem('planResults', JSON.stringify(Mainplanres));
    // this.checkSelectedPlans()
  }

  onSelectAll(
    item: any,
    packageid: number,
    parentId: number,
    subgroupid: number,
    packageindex: number,
    groupindex: number,
    subgroupindex: number
  ) {
    let Mainplanres = JSON.parse(sessionStorage.getItem('planResults'));

    Mainplanres[packageindex]['groups'][groupindex]['subGroups'][subgroupindex][
      'tiers'
    ] = item;
    Mainplanres[packageindex]['groups'][groupindex]['subGroups'][subgroupindex][
      'checked'
    ] = true;

    this.plansBlock1 = Mainplanres;

    sessionStorage.setItem('planResults', JSON.stringify(Mainplanres));
  }
  onItemDeSelect(
    item: any,
    packageid: number,
    parentId: number,
    subgroupid: number,
    packageindex: number,
    groupindex: number,
    subgroupindex: number
  ) {
    let Mainplanres = JSON.parse(sessionStorage.getItem('planResults'));

    let array =
      Mainplanres[packageindex]['groups'][groupindex]['subGroups'][
        subgroupindex
      ]['tiers'];

    array = array.filter(function (obj) {
      return obj.id !== item.id;
    });

    Mainplanres[packageindex]['groups'][groupindex]['subGroups'][subgroupindex][
      'tiers'
    ] = array;
    // Mainplanres[packageindex]['groups'][groupindex]['subGroups'][subgroupindex]['checked'] = true
    this.plansBlock1 = Mainplanres;

    sessionStorage.setItem('planResults', JSON.stringify(Mainplanres));

    // this.checkSelectedPlans()
  }
  onDeSelectAll(
    item: any,
    packageid: number,
    parentId: number,
    subgroupid: number,
    packageindex: number,
    groupindex: number,
    subgroupindex: number
  ) {
    let Mainplanres = JSON.parse(sessionStorage.getItem('planResults'));

    Mainplanres[packageindex]['groups'][groupindex]['subGroups'][subgroupindex][
      'tiers'
    ] = [];
    // Mainplanres[packageindex]['groups'][groupindex]['subGroups'][subgroupindex]['checked']=true;

    this.plansBlock1 = Mainplanres;

    console.log(this.plansBlock1);

    sessionStorage.setItem('planResults', JSON.stringify(Mainplanres));

    // this.checkSelectedPlans()
  }

  multiSelectProvianceItemSelect(event: any) {
    //convert number into string?
    console.log(event);
    this.multiSelectProviance.push(event.id);
    console.log(this.multiSelectProviance);
  }
  multiSelectProvianceSelectAll(event: any) {
    console.log(event);
    this.multiSelectProviance = [];
    event.forEach((proviance: any) => {
      console.log(proviance)
      this.multiSelectProviance.push(proviance.id);

    });
    console.log(this.multiSelectProviance);
  }
  multiSelectProvianceItemDeSelect(event: any) {
    console.log(event);
    let indexOf = this.multiSelectProviance.indexOf(event.id);
    this.multiSelectProviance.splice(indexOf, 1);
    console.log(this.multiSelectProviance);
  }
  multiSelectProvianceItemDeSelectAll(event: any) {
    console.log(event);
    this.multiSelectProviance = [];
  }

  checkSelectedPlans() {
    this.planssummary = JSON.parse(sessionStorage.getItem('planResults'));

    this.selectedplansblock1 = JSON.parse(
      sessionStorage.getItem('summaryBlock1')
    );

    if (this.planssummary) {
      // [{"packageid":"2","parentId":"14","subGroupId":"21","orderId":"18","packagename":"Mental Health & Wellness","groupname":"Wellness","subGrpname":"Mind & Body","tiers":[],"packageindex":1,"groupindex":0,"subgroupindex":2}]

      this.planssummary.forEach((plandetails: any, index: number) => {
        plandetails.groups.forEach((groups: any, index1: number) => {
          this.selectedplansblock1.forEach((subgroup: any, index3: number) => {
            var allAvailble =
              this.planssummary[index]['groups'][index1]['subGroups'];

            allAvailble.forEach((element1: any, index2: any) => {
              if (element1 != null) {
                if (element1.id == subgroup.subGroupId) {
                  setTimeout(() => {
                    const dom: HTMLElement = this.elementRef.nativeElement;
                    const element: any = dom.querySelector(
                      '#plancheck' + element1.id
                    );

                    console.log(element);
                    element.click();
                  }, 100);
                }
              }
            });
          });
        });
      });
    }
  }

  closeModal(value: any) {
    value.active = false;
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  get f() {
    return this.adminform.controls;
  }
  async addadmin() {
    console.error(this.adminData);
    console.log(this.adminData);

    if (this.adminform.invalid) {
      console.log(this.adminform);
      return;
    }
    console.log(JSON.stringify(this.adminform.value, null, 2));

    let obj = {
      firstName: this.capitalize(this.adminform.value.adminfirstname),
      lastName: this.capitalize(this.adminform.value.adminlastname),
      phoneNum: this.adminform.value.adminphone,
      email: this.adminform.value.adminemail,
      role: this.adminform.value.role,
      roleName:''
    };
    if (obj.role == 'CORPORATE_OTHERS')
      obj['roleName'] = this.adminform.value.roleName;

    this.emailAlreadyexist = false;
    for (let admin of this.adminData) {
      if (admin['email'] == obj['email']) {
        await Swal.fire({
          title: 'Info',
          text: 'Email Already exist',
          showDenyButton: false,
          confirmButtonText: 'OK',
        }).then((res) => {
          if (res.isConfirmed) {
            return false;
          }
        });
        this.emailAlreadyexist = true;
        break;
      }
    }
    if (!this.emailAlreadyexist) {
      this.adminData.push(obj);
    }

    // this.adminData.push(obj);
    // this.adminData = JSON.parse(sessionStorage.getItem('adminData') || '[]');
    // this.adminData = this.dummyAdminData;
    this.adminform.reset();
    this.showaddadmin = true;
    this.addadminform = false;
    sessionStorage.setItem('adminData', JSON.stringify(this.adminData));

    // this.adminData= JSON.parse(sessionStorage.getItem("adminData") || "[]")

    $('#basicModal1').modal('hide');
    console.log(this.adminData);
  }
  editadminSubmit() {
    if (this.adminform.invalid) {
      console.log(this.adminform);
      return;
    }
    console.log(JSON.stringify(this.adminform.value, null, 2));

    let obj = {
      firstName: this.capitalize(this.adminform.value.adminfirstname),
      lastName: this.capitalize(this.adminform.value.adminlastname),
      phoneNum: this.adminform.value.adminphone,
      email: this.adminform.value.adminemail,
      role: this.adminform.value.role,
      roleName:'',
    };
    if (obj.role == 'CORPORATE_OTHERS')
      //CORPORATE_OTHERS
      obj['roleName'] = this.adminform.value.roleName;

    this.adminData[this.editindex] = obj;

    sessionStorage.setItem('adminData', JSON.stringify(this.adminData));
    this.adminData = JSON.parse(sessionStorage.getItem('adminData') || '[]');

    this.adminform.reset();
    this.showOtherField = false;
    this.adminform.get('roleName').clearValidators();
    this.adminform.updateValueAndValidity();
    this.showaddadmin = true;
    this.addadminform = false;
    $('#basicModaledit').modal('hide');
    // $('#basicModal1').modal('hide');
  }

  deleteadmin(index: any) {
    Swal.fire({
      title: 'Alert',
      text: 'Are you sure you want to delete this group contact?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // this.myFileInput.nativeElement.value = '';
        const Data = this.adminData;
        const removed = Data.splice(index, 1); // Mutates fruits and returns array of removed items

        sessionStorage.setItem('adminData', JSON.stringify(this.adminData));
        this.adminData = JSON.parse(
          sessionStorage.getItem('adminData') || '[]'
        );

        console.log(this.adminData);
        this.emailAlreadyexist = false;
        if (this.adminData.length == 0) {
          this.addadminform = true;
          this.showaddadmin = false;
        }
      }
    });
  }
  editadmin(admin: any, index: any) {
    // this.adminform.patchValue(admin);
    console.log(admin);
    this.editindex = index;
    this.editadminfirstname = admin.firstName;
    this.editadminlastname = admin.lastName;
    this.editadminphone = admin.phoneNum;
    this.editadminemail = admin.email;
    this.editadminrole = admin.role;
    if (this.editadminrole == 'CORPORATE_OTHERS') {
      this.showOtherField = true;
      // this.adminform.get('roleName').setValidators(Validators.required);
      this.adminform.get('roleName').updateValueAndValidity();
      this.adminformOthers = admin.roleName;
    } else {
      this.showOtherField = false;
      this.adminform.get('roleName').clearValidators();
      this.adminform.get('roleName').updateValueAndValidity();
    }
    this.emailAlreadyexist = false;
    setTimeout(() => {
      this.f['adminfirstname'].setValue(admin.firstName);
      this.f['adminlastname'].setValue(admin.lastName);
    }, 100);
  }

  changeToFirstlatterUpperCase(controlName: any) {
    let value = this.f[controlName].value;
    value =
      this.f[controlName].value[0].toUpperCase() +
      this.f[controlName].value.slice(1).toLowerCase();
    this.f[controlName].setValue(value);
  }

  hidegrpadmindetails() {
    this.showOtherField = false;
    this.adminform.get('roleName').clearValidators();
    this.adminform.updateValueAndValidity();
    this.editadminfirstname = '';
    this.editadminlastname = '';
    this.editadminphone = '';
    this.editadminemail = '';
    this.editadminrole = '';
    this.adminform.reset();
  }
  uploadadminlogoclear(event1: any) {
    this.showimagelogo = true;
    this.uploadlogoafter = false;
    this.imagedisplay = '';
    this.uploadadminlogoimg = '';
    sessionStorage.setItem('adminlogo', '');
    this.client['corporatelogo'].reset();
    // this.client['corporatelogo'].setValidators([Validators.required]);

    // this.client['corporatelogo'].updateValueAndValidity();
  }

  onPaste(e: any) {
    e.preventDefault();
  }
  uploadadminlogo(event1: any) {
    console.log('test');
    var fileExtension = '.' + event1.target.files[0].name.split('.').pop();

    // alert(event.target.files[0].name.replace(event.target.files[0].name,"void.pdf"))
    this.uploadadminlogoimg = event1.target.files[0];

    var allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      // 'application/pdf', want to Allow PDF uncomment this line
    ];
    // var allowedMimes = [
    //   'image/jpeg',
    //   'image/pjpeg',
    //   'image/png',
    // ];

    let error = false;

    let message = '';

    if (allowedMimes.includes(this.uploadadminlogoimg.type)) {
      if (this.uploadadminlogoimg.size <= 300 * 1024) {
        //300KB

        error = false;
        var reader = new FileReader();
        reader.readAsDataURL(event1.target.files[0]);

        reader.onload = (_event) => {
          this.showimagelogo = false;
          this.uploadlogoafter = true;
          this.imagedisplay = reader.result;
        };
        sessionStorage.setItem('adminlogo', this.uploadadminlogoimg);
      } else {
        error = true;
        message = 'File size is too large,maximum file size is 300kb';
        // alert(message);
        Swal.fire({title:'Info',text:message})
        this.uploadadminlogoimg="";
      }
    } else {
      error = true;

      message = 'Invalid file type. Only jpg, png image,pdf files are allowed.';
      // alert(message);
      Swal.fire({title:'Info',text:message});
      this.uploadadminlogoimg="";
    }
  }
  uploadadminlogo1(event1: any) {
    var fileExtension = '.' + event1.target.files[0].name.split('.').pop();

    // alert(event.target.files[0].name.replace(event.target.files[0].name,"void.pdf"))
    this.uploadadminlogoimg = event1.target.files[0];

    var allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
    ];

    let error = false;

    let message = '';

    if (allowedMimes.includes(this.uploadadminlogoimg.type)) {
      if (this.uploadadminlogoimg.size <= 300 * 1024) {
        //300KB

        error = false;
        var reader = new FileReader();
        reader.readAsDataURL(event1.target.files[0]);

        reader.onload = (_event) => {
          this.showimagelogo = false;
          this.imagedisplay = reader.result;
        };
        sessionStorage.setItem('adminlogo', this.uploadadminlogoimg);
      } else {
        error = true;
        message = 'File size is too large,maximum file size is 300kb';
        // alert(message);
        Swal.fire({title:'Info',text:message});
        this.uploadadminlogoimg="";
      }
    } else {
      error = true;

      message = 'Invalid file type. Only jpg, png image,pdf files are allowed.';
      // alert(message);
    Swal.fire({title:'Info',text:message});
    this.uploadadminlogoimg="";
    }
    // var reader = new FileReader();
    // reader.readAsDataURL(event1.target.files[0]);

    // reader.onload = (_event) => {
    //   this.showimagelogo = false;
    //   this.imagedisplay = reader.result;
    // };
    // sessionStorage.setItem('adminlogo', this.uploadadminlogoimg);
  }

  coreplantemplate(e) {
    const dom: HTMLElement = this.elementRef.nativeElement;
    this.coreplantemplateValue = e.target.value;
    let summaryBlock1 = JSON.parse(
      sessionStorage.getItem('summaryBlock1') || '[]'
    );

    for (let i = 0; i < summaryBlock1.length; i++) {
      const element: any = dom.querySelector(
        '#plancheck' + summaryBlock1[i].subGroupId
      );
      element.click();
    }

    this.plansNewBlock1 = JSON.parse(
      sessionStorage.getItem('planResults') || '[]'
    );

    this.plansBlock1 = JSON.parse(
      sessionStorage.getItem('planResults') || '[]'
    );

    if (e.target.value == 'starter') {
      const element: any = dom.querySelector('#plancheck' + 19);
      element.click();
      this.defaultAmount = '1000';
      // this.plansNewBlock1.forEach((element:any,index:number) => {

      // if(element.id !=2 && element.id !=8){

      //   const element2: any = dom.querySelector(".collapsed")

      //   if(element2){

      //   }else{
      //      const element1: any = dom.querySelector("#plancheckcollapseone" +element.id)
      //       element1.click()
      //   }

      // }
      // else{

      //   const element2: any = dom.querySelector(".collapsed")

      //   if(element2){
      //     const element1: any = dom.querySelector("#plancheckcollapseone" +element.id)
      //     element1.click()
      //   }else{

      //   }
      // }
      // });
    } else if (e.target.value == 'standard') {
      const element: any = dom.querySelector('#plancheck' + 3);
      element.click();
      const element1: any = dom.querySelector('#plancheck' + 21);
      element1.click();
      this.defaultAmount = '300';
      // this.plansNewBlock1.forEach((element:any,index:number) => {
      //   if(element.id !=1 && element.id !=2 && element.id !=8){
      //      const element1: any = dom.querySelector("#plancheckcollapseone" +element.id)
      //         element1.click()
      //   }
      //   else{
      //     // if(element.id !=2){
      //     //   element.groups.forEach((groups:any,index:number) => {

      //     //     if(groups.id !=1){

      //     //     const element1: any = dom.querySelector("#plancheckcollapseone" +groups.id)
      //     //     element1.click()
      //     //     }

      //     //   });

      //     // }

      //   }

      //         });
    } else if (e.target.value == 'executive') {
      setTimeout(() => {
        const element: any = dom.querySelector('#plancheck' + 9);
        element.click();
      }, 10);

      const element1: any = dom.querySelector('#plancheck' + 18);
      element1.click();
      this.defaultAmount = '2500';
      // this.plansNewBlock1.forEach((element:any,index:number) => {
      //   if(element.id !=1 && element.id !=5 && element.id !=8){
      //      const element1: any = dom.querySelector("#plancheckcollapseone" +element.id)
      //         element1.click()
      //   }
      //   else{
      //     // if(element.id !=5){
      //     //   element.groups.forEach((groups:any,index:number) => {

      //     //     if(groups.id !=6){

      //     //     const element1: any = dom.querySelector("#plancheckcollapseone" +groups.id)
      //     //     element1.click()
      //     //     }

      //     //   });

      //     // }

      //   }

      //         });
    } else if (e.target.value == 'custom') {
      this.defaultAmount = '';
    }
    0;
  }

  public replaceCharacter(string, index, replacement) {
    return string.slice(0, index) + replacement + string.slice(index + 1);
  }

  public getExecCoverage(Single, Couple, Family) {
    var coverage = '000';
    // var coverage='';
    if (Family) {
      coverage = this.replaceCharacter(coverage, 0, '1');
    }
    if (Couple) {
      coverage = this.replaceCharacter(coverage, 1, '1');
    }
    if (Single) {
      coverage = this.replaceCharacter(coverage, 2, '1');
    }

    return coverage;
  }
  executiveplansCoverage(e, packageIndex, grpIndex, subGrpIndex,subgroupid) {
    console.log(e);

    this._LoaderService.ShowLoader()


    setTimeout(() => {
      this._LoaderService.HideLoader()

    }, 1000);
    this.plansNewBlock2 = JSON.parse(
      sessionStorage.getItem('mainresults') || '[]'
    );
    let summaryBlock1 = JSON.parse(
      sessionStorage.getItem('summaryBlock1') || '[]'
    );

    let coverage =  this.getExecCoverage($('#executiveplanssingle' + subgroupid).prop('checked'),$('#executiveplanscouple' + subgroupid).prop('checked'),$('#executiveplansfamily' + subgroupid).prop('checked'));

    if(coverage=="000" || coverage==""){
      setTimeout(() => {
        $("#plancheck" + subgroupid).click()
      }, 100);

    }
    else{
      coverage = coverage
    }

    this.plansNewBlock2[packageIndex]['groups'][grpIndex]['subGroups'][
      subGrpIndex
    ]['coverage'] = coverage;
    summaryBlock1.forEach((element: any) => {
      if (
        element.packageindex == packageIndex &&
        element.groupindex == grpIndex &&
        element.subgroupindex == subGrpIndex
      ) {
        element['coverage'] = coverage;
        // element['coverage'] = e.target.value;
      }
    });
    sessionStorage.setItem('summaryBlock1', JSON.stringify(summaryBlock1));

    sessionStorage.setItem('mainresults', JSON.stringify(this.plansNewBlock2));


    let summaryBlock2 = JSON.parse(
      sessionStorage.getItem('summaryBlock2') || '[]'
    );

    if(summaryBlock2 && summaryBlock2.length>0){

      let index=this.getslectedplansblock2(subgroupid)
      if (index > -1) {
        // let coveragercheck = summaryBlock2[index].coverage

        if(coverage=="000" || coverage==""){
          summaryBlock2[index].coverage = "111"
        }
        else if(coverage=="001"){
          summaryBlock2[index].coverage = "110"
        }
        else if(coverage=="010"){
          summaryBlock2[index].coverage = "100"
        }
        else if(coverage=="011"){
          summaryBlock2[index].coverage = "100"
        }
        else if(coverage=="111"){
        summaryBlock2.splice(index, 1);
      }
      else if(coverage=="101"){
        summaryBlock2.splice(index, 1);
      }
        // summaryBlock2.splice(index, 1);
        sessionStorage.setItem('summaryBlock2', JSON.stringify(summaryBlock2));

      }

    }
    let summaryBlock3 = JSON.parse(
      sessionStorage.getItem('summaryBlock3') || '[]'
    );

    if(summaryBlock3 && summaryBlock3.length>0){
      let index=this.getslectedplansblock3(subgroupid)
      if (index > -1) {
        // let coveragercheck = summaryBlock2[index].coverage

        if(coverage=="000" || coverage==""){
          summaryBlock3[index].coverage = "111"
        }
        else if(coverage=="001"){
          summaryBlock3[index].coverage = "110"
        }
        else if(coverage=="010"){
          summaryBlock3[index].coverage = "100"
        }
        else if(coverage=="011"){
          summaryBlock3[index].coverage = "100"
        }
        else if(coverage=="111"){
          summaryBlock3.splice(index, 1);
      }
      else if(coverage=="101"){
        summaryBlock3.splice(index, 1);
      }
        // summaryBlock2.splice(index, 1);
        sessionStorage.setItem('summaryBlock3', JSON.stringify(summaryBlock3));

      }

    }

this.checkvalidationblock2()

this.checkvalidationblock3()

  }

  executiveplansCoverage2(e, packageIndex, grpIndex, subGrpIndex,subgroupid) {

    console.log(packageIndex)
    console.log(grpIndex)
    console.log(subGrpIndex)
    console.log(subgroupid)
    this._LoaderService.ShowLoader()


    setTimeout(() => {
      this._LoaderService.HideLoader()

    }, 1000);

    // [{"packageid":"5","parentId":"15","subGroupId":"18","orderId":"21","packagename":"Executive Benefits","groupname":"Exec","subGrpname":"Complete Executive Care","tiers":[],"packageindex":4,"groupindex":0,"subgroupindex":1}]
    this.Newplansresblack3 = JSON.parse(
      sessionStorage.getItem('block2result') || '[]'
    );
    this.selectedplansblock1 = JSON.parse(
      sessionStorage.getItem('summaryBlock2') || '[]'
    );
    setTimeout(() => {
      let coverage =  this.getExecCoverage($('#executiveplansblock2single' + subgroupid).prop('checked'),
      $('#executiveplansblock2couple' + subgroupid).prop('checked'),
      $('#executiveplansblock2family' + subgroupid).prop('checked'));

      // alert(coverage)
      if(coverage=="000" || coverage==""){
        setTimeout(() => {
          $("#plancheck2" + subgroupid).click()
        }, 100);


      }
      else{
        coverage = coverage
      }

      this.Newplansresblack3[packageIndex]['groups'][grpIndex]['subGroups'][
        subGrpIndex
      ]['coverage'] = coverage;
      this.selectedplansblock1.forEach((element: any) => {
        if (
          element.packageindex == packageIndex &&
          element.groupindex == grpIndex &&
          element.subgroupindex == subGrpIndex
        ) {


            element['coverage'] = coverage;


        }
      });

      let summaryBlock3 = JSON.parse(
        sessionStorage.getItem('summaryBlock3') || '[]'
      );

      // if(summaryBlock3 && summaryBlock3.length>0){
      //   let index=this.getslectedplansblock3(subgroupid)
      //   if (index > -1) {
      //     summaryBlock3.splice(index, 1);
      //     sessionStorage.setItem('summaryBlock3', JSON.stringify(summaryBlock3));

      //   }

      // }
      if(summaryBlock3 && summaryBlock3.length>0){
        let index=this.getslectedplansblock3(subgroupid)
        if (index > -1) {
          // let coveragercheck = summaryBlock2[index].coverage

          if(coverage=="000" || coverage==""){
            summaryBlock3[index].coverage = "111"
          }
          else if(coverage=="001"){
            summaryBlock3[index].coverage = "110"
          }
          else if(coverage=="010"){
            summaryBlock3[index].coverage = "100"
          }
          else if(coverage=="011"){
            summaryBlock3[index].coverage = "100"
          }
          else if(coverage=="111"){
            summaryBlock3.splice(index, 1);
        }
        else if(coverage=="101"){
          summaryBlock3.splice(index, 1);
        }
          // summaryBlock2.splice(index, 1);
          sessionStorage.setItem('summaryBlock3', JSON.stringify(summaryBlock3));

        }

      }

      sessionStorage.setItem(
        'summaryBlock2',
        JSON.stringify(this.selectedplansblock1)
      );

      sessionStorage.setItem(
        'block2result',
        JSON.stringify(this.Newplansresblack3)
      );

      setTimeout(() => {
        if (this.employeeplanpurchase == true) {
          // let el: HTMLElement = this.employeepurchasefalse.nativeElement;
          // el.click();
          setTimeout(() => {
            let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
            el1.click();
            // this.plansblock3();

          }, 10);
        }
      }, 1000);
    }, 1000);



  }
  executiveplansCoverage3(e, packageIndex, grpIndex, subGrpIndex,subgroupid) {
    // [{"packageid":"5","parentId":"15","subGroupId":"18","orderId":"21","packagename":"Executive Benefits","groupname":"Exec","subGrpname":"Complete Executive Care","tiers":[],"packageindex":4,"groupindex":0,"subgroupindex":1}]

    this._LoaderService.ShowLoader()


    setTimeout(() => {
      this._LoaderService.HideLoader()

    }, 1000);

    this.Newplansresblack3 = JSON.parse(
      sessionStorage.getItem('block3result') || '[]'
    );
    this.selectedplansblock1 = JSON.parse(
      sessionStorage.getItem('summaryBlock3') || '[]'
    );

    setTimeout(() => {
      let coverage =  this.getExecCoverage($('#executiveplansblock3single' + subgroupid).prop('checked'),$('#executiveplansblock3couple' + subgroupid).prop('checked'),$('#executiveplansblock3family' + subgroupid).prop('checked'));


      if(coverage=="000" || coverage==""){

        setTimeout(() => {
          $("#plancheck3" + subgroupid).click()
        }, 1000);


      }
      else{
        coverage = coverage
      }
      this.Newplansresblack3[packageIndex]['groups'][grpIndex]['subGroups'][
        subGrpIndex
      ]['coverage'] = coverage;
      this.selectedplansblock1.forEach((element: any) => {
        if (
          element.packageindex == packageIndex &&
          element.groupindex == grpIndex &&
          element.subgroupindex == subGrpIndex
        ) {
          element['coverage'] = coverage;
        }
      });

      sessionStorage.setItem(
        'summaryBlock3',
        JSON.stringify(this.selectedplansblock1)
      );

      sessionStorage.setItem(
        'block3result',
        JSON.stringify(this.Newplansresblack3)
      );
    }, 1000);

  }
  executiveplansCoverageTier1(
    e,
    packageIndex,
    grpIndex,
    subGrpIndex,
    subgroupid
  ) {
    // [{"packageid":"5","parentId":"15","subGroupId":"18","orderId":"21","packagename":"Executive Benefits","groupname":"Exec","subGrpname":"Complete Executive Care","tiers":[],"packageindex":4,"groupindex":0,"subgroupindex":1}]
    let mainPlanTier = JSON.parse(
      sessionStorage.getItem('plansBlock1Tiers') || '[]'
    );
    this.selectedplansblock1 = JSON.parse(
      sessionStorage.getItem('selectedTiersBlock1') || '[]'
    );
    // console.log(this.plansNewBlock2[packageIndex]['groups'][grpIndex]['subGroups'][subGrpIndex])
    let coverage = this.getExecCoverage(
      $('#executiveplansTiersingle' + subgroupid).prop('checked'),
      $('#executiveplansTiercouple' + subgroupid).prop('checked'),
      $('#executiveplansTierfamily' + subgroupid).prop('checked')
    );

    mainPlanTier[packageIndex]['groups'][grpIndex]['subGroups'][subGrpIndex][
      'coverage'
    ] = coverage;
    //  this.seelctedplanLevelTierMapping[packageIndex]['groups'][grpIndex]['subGroups'][subGrpIndex]['coverage'] = e.target.value

    this.selectedplansblock1.forEach((element: any) => {
      if (
        element.packageindex == packageIndex &&
        element.groupindex == grpIndex &&
        element.subgroupindex == subGrpIndex
      ) {
        element['coverage'] = coverage;
      }
    });

    sessionStorage.setItem(
      'selectedTiersBlock1',
      JSON.stringify(this.selectedplansblock1)
    );

    sessionStorage.setItem('plansBlock1Tiers', JSON.stringify(mainPlanTier));

    if (this.seelctedplanLevelTierMapping.length > 0) {
      for (let i = 0; i < this.seelctedplanLevelTierMapping.length; i++) {
        if (
          this.seelctedplanLevelTierMapping[i].packageindex == packageIndex &&
          this.seelctedplanLevelTierMapping[i].groupindex == grpIndex &&
          this.seelctedplanLevelTierMapping[i].subgroupindex == subGrpIndex
        ) {
          this.seelctedplanLevelTierMapping[i].coverage = coverage;
        }
      }
      console.log(this.seelctedplanLevelTierMapping);
    }
  }
  executiveplansCoverageTier2(
    e,
    packageIndex,
    grpIndex,
    subGrpIndex,
    subgroupid
  ) {
    // [{"packageid":"5","parentId":"15","subGroupId":"18","orderId":"21","packagename":"Executive Benefits","groupname":"Exec","subGrpname":"Complete Executive Care","tiers":[],"packageindex":4,"groupindex":0,"subgroupindex":1}]
    let mainPlanTier = JSON.parse(
      sessionStorage.getItem('block2resultTiers') || '[]'
    );
    this.selectedplansblock1 = JSON.parse(
      sessionStorage.getItem('selectedTiersBlock2') || '[]'
    );
    // console.log(this.plansNewBlock2[packageIndex]['groups'][grpIndex]['subGroups'][subGrpIndex])
    let coverage = this.getExecCoverage(
      $('#executiveplansblock2Tiersingle' + subgroupid).prop('checked'),
      $('#executiveplansblock2Tiercouple' + subgroupid).prop('checked'),
      $('#executiveplansblock2Tierfamily' + subgroupid).prop('checked')
    );

    mainPlanTier[packageIndex]['groups'][grpIndex]['subGroups'][subGrpIndex][
      'coverage'
    ] = coverage;

    this.selectedplansblock1.forEach((element: any) => {
      if (
        element.packageindex == packageIndex &&
        element.groupindex == grpIndex &&
        element.subgroupindex == subGrpIndex
      ) {
        element['coverage'] = coverage;
      }
    });

    sessionStorage.setItem(
      'selectedTiersBlock2',
      JSON.stringify(this.selectedplansblock1)
    );

    sessionStorage.setItem('block2resultTiers', JSON.stringify(mainPlanTier));
    if (this.seelctedplanLevelTierMappingBlock2.length > 0) {
      for (let i = 0; i < this.seelctedplanLevelTierMappingBlock2.length; i++) {
        if (
          this.seelctedplanLevelTierMappingBlock2[i].packageindex ==
            packageIndex &&
          this.seelctedplanLevelTierMappingBlock2[i].groupindex == grpIndex &&
          this.seelctedplanLevelTierMappingBlock2[i].subgroupindex ==
            subGrpIndex
        ) {
          this.seelctedplanLevelTierMappingBlock2[i].coverage = coverage;
        }
      }
      console.log(this.seelctedplanLevelTierMapping);
    }
  }
  executiveplansCoverageTier3(
    e,
    packageIndex,
    grpIndex,
    subGrpIndex,
    subgroupid
  ) {
    // [{"packageid":"5","parentId":"15","subGroupId":"18","orderId":"21","packagename":"Executive Benefits","groupname":"Exec","subGrpname":"Complete Executive Care","tiers":[],"packageindex":4,"groupindex":0,"subgroupindex":1}]
    let mainPlanTier = JSON.parse(
      sessionStorage.getItem('block3resultTiers') || '[]'
    );
    this.selectedplansblock1 = JSON.parse(
      sessionStorage.getItem('selectedTiersBlock3') || '[]'
    );
    // console.log(this.plansNewBlock2[packageIndex]['groups'][grpIndex]['subGroups'][subGrpIndex])
    let coverage = this.getExecCoverage(
      $('#executiveplansblock3Tiersingle' + subgroupid).prop('checked'),
      $('#executiveplansblock3Tiercouple' + subgroupid).prop('checked'),
      $('#executiveplansblock3Tierfamily' + subgroupid).prop('checked')
    );

    mainPlanTier[packageIndex]['groups'][grpIndex]['subGroups'][subGrpIndex][
      'coverage'
    ] = coverage;

    this.selectedplansblock1.forEach((element: any) => {
      if (
        element.packageindex == packageIndex &&
        element.groupindex == grpIndex &&
        element.subgroupindex == subGrpIndex
      ) {
        element['coverage'] = coverage;
      }
    });

    sessionStorage.setItem(
      'selectedTiersBlock3',
      JSON.stringify(this.selectedplansblock1)
    );

    sessionStorage.setItem('block3resultTiers', JSON.stringify(mainPlanTier));
    if (this.seelctedplanLevelTierMappingBlock3.length > 0) {
      for (let i = 0; i < this.seelctedplanLevelTierMappingBlock3.length; i++) {
        if (
          this.seelctedplanLevelTierMappingBlock3[i].packageindex ==
            packageIndex &&
          this.seelctedplanLevelTierMappingBlock3[i].groupindex == grpIndex &&
          this.seelctedplanLevelTierMappingBlock3[i].subgroupindex ==
            subGrpIndex
        ) {
          this.seelctedplanLevelTierMappingBlock3[i].coverage = coverage;
        }
      }
    }
  }
  onCheckboxChange1(
    e: any,
    allow_multiple: any,
    disallowedPlanLevels: any,
    packageid: any,
    subgroupid: any,
    pname: any,
    subgroupname: any,
    subgroup: any,
    ordering: any,
    parentid: any,
    parentname: any,
    packageindex: number,
    groupindex: number,
    subgroupindex: number
  ) {

    this._LoaderService.ShowLoader()


    setTimeout(() => {
      this._LoaderService.HideLoader()

    }, 5000);
    this.planselectedId = subgroupid;


    // let multiple = allow_multiple ? Boolean(allow_multiple.data[0]) : false;
    let multiple = allow_multiple ? true : false;

    if (e.target.checked) {
      this.unselectPlanLevel(e.target.id.replace('plancheck', ''), parentid);
    }

    console.log(disallowedPlanLevels);
    if (disallowedPlanLevels != null) {
      let disallowed_plans = disallowedPlanLevels.split(',');
      const dom1: HTMLElement = this.elementRef.nativeElement;

      const disallowed_elements = dom1.querySelectorAll(
        '.plansscreen input.block1'
      );

      for (let i = 0; i < disallowed_elements.length; i++) {
        console.log(disallowed_elements[i]);
        console.log(disallowed_elements[i]);
        let elem: any = disallowed_elements[i];
        // elementcv.checked=false

        if (!elem.attributes.data) {
          continue;
        }

        let plandetails = elem.attributes.data.value;

        let plandetailsobj = plandetails.split('##');

        // console.log('main', plandetailsobj);

        // console.log("disallowed_plans",disallowed_plans)

        if (e.target.checked) {
          if (!elem.disabled) {
            console.log('test');
            if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
              if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
                //  elem.checked=false

                // elem.disabled = true

                this.disabledelement =
                  'Already included in GroupBenefitz All-In';
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
                elem.previousElementSibling.style.opacity = 0.2;

                // this.elementid =  plandetailsobj[10]

                // eelem.parentElement.style.opacity = 0.2;

                ('Already included in GroupBenefitz All-In');
              }
            }
          }
          if (elem.checked) {
            // console.log(disallowed_plans)

            console.log(plandetailsobj);

            if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
              if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
                elem.checked = false;

                this.unselectplan(
                  elem,
                  pname,
                  parentname,
                  subgroupname,
                  packageindex,
                  groupindex,
                  subgroupindex,
                  plandetailsobj[10],
                  plandetailsobj[11],
                  plandetailsobj[12]
                );
                // eelem.previousElementSibling.style.opacity = 1;
              }
            } else {
              //console.log(disallowed_plans)
              //console.log(plandetailsobj)
              if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
                elem.checked = false;

                this.unselectplan(
                  elem,
                  pname,
                  parentname,
                  subgroupname,
                  packageindex,
                  groupindex,
                  subgroupindex,
                  plandetailsobj[10],
                  plandetailsobj[11],
                  plandetailsobj[12]
                );
                // eelem.previousElementSibling.style.opacity = 1;
                // elem.disabled =true
              }
            }
          }
        } else {
          console.log('here');
          if (
            elem.disabled ||
            elem.previousElementSibling.style.opacity == '0.2'
          ) {
            if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
              if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
                //  elem.checked=false
                elem.disabled = false;
                elem.previousElementSibling.style.opacity = 1;
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
                //  elem.checked=false
                elem.disabled = false;
                elem.previousElementSibling.style.opacity = 1;
              }
            }
          }
          if (elem.checked) {
            console.log('4');
            if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
              if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
                elem.checked = false;
                // eelem.previousElementSibling.style.opacity =1
                // elem.disabled =true
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
                elem.checked = false;
                // eelem.previousElementSibling.style.opacity =1
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

    console.log(classname);
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll('.' + classname);

    console.log(elements);

    // let plandetailsobj = plandetails.split('##');

    let element: any;
    let elementcv: any;

    if (!multiple) {
      if (e.target.checked) {
        // this.unselectplan(e.target)
        for (let i = 0; i < elements.length; i++) {
          let elem = elements[i];
          element = elem;
          let plandetails = element.attributes.data.value;
          let plandetailsobj = plandetails.split('##');

          if (element.checked) {

            console.log(e.target.id)
            console.log(element.id)

            if(e.target.id  ==element.id){
continue;
            }

            this.unselectplan(
              elem,
              pname,
              parentname,
              subgroupname,
              packageindex,
              groupindex,
              subgroupindex,
              plandetailsobj[9],
              plandetailsobj[10],
              plandetailsobj[11]
            );
            element.checked = false;
          }
        }

        e.checked = true;
        e.target.checked = true;
      } else {
      }
    } else {
    }
    setTimeout(() => {
      if (e.target.checked) {


        this.selectplan(
          e.target,
          pname,
          parentname,
          subgroupname,
          packageindex,
          groupindex,
          subgroupindex
        );

        this.executiveid = subgroupindex;

        console.log(this.executiveid);
      }
      else {
        console.log('indexx2 null');
        for (let i = 0; i < elements.length; i++) {
          let elem = elements[i];
          element = elem;
          let plandetails = element.attributes.data.value;
          let plandetailsobj = plandetails.split('##');

          console.log(plandetailsobj);

          this.unselectplan(
            elem,
            pname,
            parentname,
            subgroupname,
            packageindex,
            groupindex,
            subgroupindex,
            plandetailsobj[9],
            plandetailsobj[10],
            plandetailsobj[11]
          );
        }
        // this.unselectplan(e.target,pname,parentname,subgroupname,packageindex,groupindex,subgroupindex,null,null,null);
      }
    }, 10);
  }

  // async onCheckboxChange1(
  //   e: any,
  //   allow_multiple: any,
  //   disallowedPlanLevels: any,
  //   packageid: any,
  //   subgroupid: any,
  //   pname: any,
  //   subgroupname: any,
  //   subgroup: any,
  //   ordering: any,
  //   parentid: any,
  //   parentname: any,
  //   packageindex: number,
  //   groupindex: number,
  //   subgroupindex: number
  // ) {
  //   this.planselectedId = subgroupid;
  //   console.log("this.planselectedId: " + this.planselectedId + " *** subgroupid: " + subgroupid)

  //   // let multiple = allow_multiple ? Boolean(allow_multiple.data[0]) : false;
  //   let multiple = allow_multiple ? true : false;

  //   if (e.target.checked) {
  //     this.unselectPlanLevel(e.target.id.replace('plancheck', ''), parentid);
  //   }

  //   console.log(disallowedPlanLevels)
  //   if (disallowedPlanLevels != null) {
  //     let disallowed_plans = disallowedPlanLevels.split(',');
  //     const dom1: HTMLElement = this.elementRef.nativeElement;

  //     const disallowed_elements = dom1.querySelectorAll(
  //       '.plansscreen input.block1'
  //     );

  //     for (let i = 0; i < disallowed_elements.length; i++) {

  //       console.log(disallowed_elements[i]);
  //       console.log(disallowed_elements[i]);
  //       let elem: any = disallowed_elements[i];
  //       // elementcv.checked=false

  //       if (!elem.attributes.data) {
  //         continue;
  //       }

  //       let plandetails = elem.attributes.data.value;

  //       let plandetailsobj = plandetails.split('##');

  //       // console.log('main', plandetailsobj);

  //       // console.log("disallowed_plans",disallowed_plans)

  //       if (e.target.checked) {
  //         if (!elem.disabled) {
  //           console.log('test');
  //           if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
  //             if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
  //               //  elem.checked=false

  //               // elem.disabled = true

  //               this.disabledelement =
  //                 'Already included in GroupBenefitz All-In';
  //             }
  //           } else {
  //             if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {

  //               elem.previousElementSibling.style.opacity = 0.2;

  //               // this.elementid =  plandetailsobj[10]

  //               // eelem.parentElement.style.opacity = 0.2;

  //               ('Already included in GroupBenefitz All-In');
  //             }
  //           }
  //         }
  //         if (elem.checked) {
  //           // console.log(disallowed_plans)

  //           console.log("plandetailsobj: " + plandetailsobj);

  //           if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
  //             if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
  //               elem.checked = false;
  //               this.unselectplan(
  //                 elem,
  //                 pname,
  //                 parentname,
  //                 subgroupname,
  //                 packageindex,
  //                 groupindex,
  //                 subgroupindex,
  //                 plandetailsobj[10],
  //                 plandetailsobj[11],
  //                 plandetailsobj[12]
  //               );
  //               // eelem.previousElementSibling.style.opacity = 1;
  //             }
  //           } else {
  //             //console.log(disallowed_plans)
  //             //console.log(plandetailsobj)
  //             if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
  //               elem.checked = false;
  //               this.unselectplan(
  //                 elem,
  //                 pname,
  //                 parentname,
  //                 subgroupname,
  //                 packageindex,
  //                 groupindex,
  //                 subgroupindex,
  //                 plandetailsobj[10],
  //                 plandetailsobj[11],
  //                 plandetailsobj[12]
  //               );
  //               // elem.previousElementSibling.style.opacity = 1;
  //               // elem.disabled = true
  //             }
  //           }
  //         }
  //       } else {
  //         console.log('here');
  //         if (
  //           elem.disabled ||
  //           elem.previousElementSibling.style.opacity == '0.2'
  //         ) {
  //           if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
  //             if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
  //               //  elem.checked=false
  //               elem.disabled = false;
  //               elem.previousElementSibling.style.opacity = 1;
  //             }
  //           } else {
  //             if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
  //               //  elem.checked=false
  //               elem.disabled = false;
  //               elem.previousElementSibling.style.opacity = 1;
  //             }
  //           }
  //         }
  //         if (elem.checked) {
  //           console.log('4');
  //           if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
  //             if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
  //               elem.checked = false;
  //               // eelem.previousElementSibling.style.opacity =1
  //               // elem.disabled =true
  //             }
  //           } else {
  //             if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
  //               elem.checked = false;
  //               // eelem.previousElementSibling.style.opacity =1
  //               // elem.disabled =true
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }

  //   // ////console.log(e)
  //   let classname = e.target.className;
  //   classname = classname.split(' ').join('.');

  //   // console.log(classname);
  //   const dom: HTMLElement = this.elementRef.nativeElement;
  //   const elements = dom.querySelectorAll('.' + classname);

  //   // console.log(elements);

  //   // let plandetailsobj = plandetails.split('##');

  //   let element: any;
  //   let elementcv: any;

  //   if (!multiple) {
  //     if (e.target.checked) {
  //       // this.unselectplan(e.target)
  //       for (let i = 0; i < elements.length; i++) {
  //         let elem = elements[i];
  //         element = elem;
  //         let plandetails = element.attributes.data.value;
  //         let plandetailsobj = plandetails.split('##');

  //         if (element.checked) {
  //           this.unselectplan(
  //             elem,
  //             pname,
  //             parentname,
  //             subgroupname,
  //             packageindex,
  //             groupindex,
  //             subgroupindex,
  //             plandetailsobj[9],
  //             plandetailsobj[10],
  //             plandetailsobj[11]
  //           );
  //           element.checked = false;
  //         }
  //       }

  //       e.checked = true;
  //       e.target.checked = true;
  //     } else {
  //     }
  //   } else {
  //   }
  //   setTimeout(() => {
  //     if (e.target.checked) {
  //       this.selectplan(
  //         e.target,
  //         pname,
  //         parentname,
  //         subgroupname,
  //         packageindex,
  //         groupindex,
  //         subgroupindex,
  //         subgroupid
  //       );

  //       // this.executiveid = subgroupindex;

  //       if (subgroupid == 17 || subgroupid == 18) {
  //    if($("#executiveplanssingle" + subgroupid).prop("checked")){
  //        }
  //                     else{
  // $("#executiveplanssingle" + subgroupid).click();
  //                     }

  //       }
  //       // if (subgroupid == 18) {
  //       //   $("#executiveplanssingle" + subgroupid).click();
  //       // }
  //       console.log("this.executiveid: "+this.executiveid);

  // //  if (this.paidByCompany.length > 0) {
  // //                 for (let i = 0; i < this.paidByCompany.length; i++) {
  // //                   if (this.paidByCompany[i].coverage && this.paidByCompany[i].coverage.length) {
  // //                   }else{
  // //                    if (subgroupid == 17) {
  // //           $("#executiveplanssingle" + subgroupid).click();
  // //         }
  // //         if (subgroupid == 18) {
  // //           $("#executiveplanssingle" + subgroupid).click();
  // //         }
  // //                   }
  // //                 }
  // //               }

  //     } else {
  //       console.log('indexx2 null');
  //       for (let i = 0; i < elements.length; i++) {
  //         let elem = elements[i];
  //         element = elem;
  //         let plandetails = element.attributes.data.value;
  //         let plandetailsobj = plandetails.split('##');

  //         this.unselectplan(
  //           elem,
  //           pname,
  //           parentname,
  //           subgroupname,
  //           packageindex,
  //           groupindex,
  //           subgroupindex,
  //           plandetailsobj[9],
  //           plandetailsobj[10],
  //           plandetailsobj[11]
  //         );
  //       }
  //       // this.unselectplan(e.target,pname,parentname,subgroupname,packageindex,groupindex,subgroupindex,null,null,null);
  //     }
  //   }, 15);
  // }

  onCheckboxChange2(
    e: any,
    allow_multiple: any,
    disallowedPlanLevels: any,
    packageid: any,
    subgroupid: any,
    pname: any,
    subgroupname: any,
    subgroup: any,
    ordering: any,
    parentid: any,
    parentname: any,
    packageindex: number,
    groupindex: number,
    subgroupindex: number
  ) {
    this.block2execid = subgroupid;
    this._LoaderService.ShowLoader()


    setTimeout(() => {
      this._LoaderService.HideLoader()

    }, 2000);
    // let multiple = allow_multiple ? Boolean(allow_multiple.data[0]) : false;

    //  for(let i of block2filter){

    //    console.log(i)
    //    console.log(i.subGroupId)

    //    let element: any = dom2.querySelector('#plancheck2' + i.subGroupId);
    //    if (element.checked) {

    //      element.click()
    //      element.click()
    //    }
    //  }
    // let multiple = allow_multiple ? true : false;

    let multiple = true;
    if (e.target.checked) {
      this.unselectPlanLevel2(e.target.id.replace('plancheck2', ''), parentid);
    }

    else {
      //we are changg=ing fron select to unselect
      /* using for select checked plans in block2 */
      let block2 = JSON.parse(sessionStorage.getItem('summaryBlock2') || '[]');

      let block2filter = block2.filter(
        (item: any) => item.parentId == parentid
      );

      console.log(block2filter);
      const dom2: HTMLElement = this.elementRef.nativeElement;
      if (block2filter.length > 1) {
        let element1: any = dom2.querySelector('#plancheck2' + subgroupid);

        if (element1.checked) {
          console.log('checked');

          element1.checked = false;
          return;
        } else {
          if (block2) {

            let index = this.getslectedplansblock2(subgroupid);

            if (index > -1) {
              block2.splice(index, 1);
              let summaryBlock2 = JSON.parse(sessionStorage.getItem('summaryBlock2') || '[]');
              let mainresults = JSON.parse(
                sessionStorage.getItem('mainresults') || '{}'
              );


if(subgroupid==17 || subgroupid==18){


      mainresults[packageindex]['groups'][groupindex][
        'subGroups'
      ][subgroupindex]['checked'] = false;

      console.log(mainresults[packageindex]['groups'][groupindex][
        'subGroups'
      ][subgroupindex])
      console.log(mainresults[packageindex]['groups'][groupindex][
        'subGroups'
      ][subgroupindex]['name'])
      if (
        mainresults[packageindex]['groups'][groupindex][
          'subGroups'
        ][subgroupindex]['name'] == 'Executive Health'
      ) {


        $('#executiveplansblock2single' + subgroupid).prop(
          'checked',
          false
        );
        $('#executiveplansblock2couple' + subgroupid).prop(
          'checked',
          false
        );
        $('#executiveplansblock2family' + subgroupid).prop(
          'checked',
          false
        );
        $('#executiveplansblock2single' +subgroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock2couple' + subgroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock2family' + subgroupid).prop(
          'disabled',
          true
        );
        let summaryBlock1 = JSON.parse(
          sessionStorage.getItem('summaryBlock1') || '[]'
        );


        sessionStorage.setItem('block2result', JSON.stringify(this.plansresblack2));

      }

      if (
        mainresults[packageindex]['groups'][groupindex][
          'subGroups'
        ][subgroupindex]['name'] == 'Complete Executive Care'
      ) {
        // this.plansresblack2[obj.packageIndex]['groups'][obj.groupIndex][
        //   'subGroups'
        // ][obj.subgroupIndex]['coverage'] = 'default';

        $('#executiveplansblock2single' + subgroupid).prop(
          'checked',
          false
        );
        $('#executiveplansblock2couple' + subgroupid).prop(
          'checked',
          false
        );
        $('#executiveplansblock2family' + subgroupid).prop(
          'checked',
          false
        );
        $('#executiveplansblock2single' + subgroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock2couple' + subgroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock2family' + subgroupid).prop(
          'disabled',
          true
        );
        sessionStorage.setItem('block2result', JSON.stringify(this.plansresblack2));

      }



}



                  sessionStorage.setItem(
                    'mainresults',
                    JSON.stringify(mainresults)
                  );


                var newselectedplans: any = {};
                for (var i = 0; i < summaryBlock2.length; i++) {
                  newselectedplans[summaryBlock2[i].subGroupId] = i;
                }

                sessionStorage.setItem('selectedPlans', JSON.stringify(newselectedplans));

                this.planssummarymain = [];
                this.planssummaryopt = [];

                summaryBlock2.forEach((element: any) => {
                  if (element.packagename != 'Opt-in') {
                    this.planssummarymain.push(element);
                  } else {
                    this.planssummaryopt.push(element);
                  }
                });

                let selectedplansblock2 = JSON.parse(
                  sessionStorage.getItem('summaryBlock2') || '[]'
                );
                let selectedplansblock3 = JSON.parse(
                  sessionStorage.getItem('summaryBlock3') || '[]'
                );


                console.log(this.employeeplanpurchase)
                if (this.employeeplanpurchase == true) {

                  // console.log("1")
                  // let el: HTMLElement = this.employeepurchasefalse.nativeElement;
                  // el.click();
                  setTimeout(() => {
                    let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
                    el1.click();
                    setTimeout(() => {
                      const dom: HTMLElement = this.elementRef.nativeElement;
                      if (selectedplansblock3.length > 0) {
                        let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
                        el1.click();
                        this.employeeplanpurchase == true;
                        setTimeout(() => {
                          for (let i = 0; i < selectedplansblock3.length; i++) {
                            const element2: any = dom.querySelector(
                              '#plancheck3' + selectedplansblock3[i].subGroupId
                            );
                            // element2.checked = true;
                            // element2.click()
                            element2.prop('checked',true);
                          }
                        }, 1500);
                      }
                    }, 1000);
                  }, 100);
                }

                sessionStorage.setItem(
                  'summaryBlock2main',
                  JSON.stringify(this.planssummarymain)
                );
                sessionStorage.setItem(
                  'summaryBlock2opt',
                  JSON.stringify(this.planssummaryopt)
                );

                sessionStorage.setItem('summaryBlock2', JSON.stringify(summaryBlock2));


            } else {
              return;
            }
          }

          sessionStorage.setItem('summaryBlock2', JSON.stringify(block2));

          let selectedplansblock3 = JSON.parse(
            sessionStorage.getItem('summaryBlock3') || '[]'
          );


          console.log(this.employeeplanpurchase)
          if (this.employeeplanpurchase == true) {

            // let el: HTMLElement = this.employeepurchasefalse.nativeElement;
            // el.click();
            setTimeout(() => {
              let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
              el1.click();
              setTimeout(() => {
                const dom: HTMLElement = this.elementRef.nativeElement;
                if (selectedplansblock3.length > 0) {
                  let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
                  el1.click();
                  this.employeeplanpurchase == true;
                  setTimeout(() => {
                    for (let i = 0; i < selectedplansblock3.length; i++) {
                      const element2: any = dom.querySelector(
                        '#plancheck3' + selectedplansblock3[i].subGroupId
                      );
                      element2.prop('checked',true);
                      // element2.checked = true;
                    }
                  }, 1500);
                }
              }, 1000);
            }, 10);
          }
          return;
        }
      }
    }
    if (disallowedPlanLevels != null) {
      let disallowed_plans = disallowedPlanLevels.split(',');
      const dom1: HTMLElement = this.elementRef.nativeElement;
      const disallowed_elements = dom1.querySelectorAll(
        '.plansscreen2 input.block2'
      );

      // disallowed_elements.forEach((elem: any) => {

      for (let i = 0; i < disallowed_elements.length; i++) {
        let elem: any = disallowed_elements[i];
        // elementcv.checked=false

        if (!elem.attributes.data) {
          continue;
        }
        let plandetails = elem.attributes.data.value;

        let plandetailsobj = plandetails.split('##');

        console.log('main', plandetailsobj);

        if (e.target.checked) {
          if (!elem.disabled) {
            if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
              if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
                //  elem.checked=false
                // elem.disabled = true;
                elem.previousElementSibling.style.opacity = 0.2;
                this.disabledelement =
                  'Already included in GroupBenefitz All-In';
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
                //  elem.checked=false
                // elem.disabled = true;
                elem.previousElementSibling.style.opacity = 0.2;
                this.disabledelement =
                  'Already included in GroupBenefitz All-In';
              }
            }
          }
          if (elem.checked) {
            // console.log(disallowed_plans)
            console.log(plandetailsobj);

            if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
              if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
                elem.checked = false;

                this.unselectplanblock2(
                  elem,
                  pname,
                  parentname,
                  subgroupname,
                  packageindex,
                  groupindex,
                  subgroupindex,
                  plandetailsobj[10],
                  plandetailsobj[11],
                  plandetailsobj[12]
                );
                // this.unselectplanblock2(elem);
              }
            } else {
              //console.log(disallowed_plans)
              //console.log(plandetailsobj)
              if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
                elem.checked = false;
                this.unselectplanblock2(
                  elem,
                  pname,
                  parentname,
                  subgroupname,
                  packageindex,
                  groupindex,
                  subgroupindex,
                  plandetailsobj[10],
                  plandetailsobj[11],
                  plandetailsobj[12]
                );

                // this.unselectplanblock2(elem);
                // elem.disabled =true
              }
            }
          }
        } else {
          if (
            elem.disabled ||
            elem.previousElementSibling.style.opacity == '0.2'
          ) {
            if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
              if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
                //  elem.checked=false
                elem.disabled = false;
                elem.previousElementSibling.style.opacity = 1;
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
                //  elem.checked=false
                elem.disabled = false;
                elem.previousElementSibling.style.opacity = 1;
              }
            }
          }
          if (elem.checked) {
            if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
              if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
                elem.checked = false;
                // elem.disabled =true
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
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
          let plandetails = element.attributes.data.value;
          let plandetailsobj = plandetails.split('##');
          if (element.checked) {
            // this.unselectplanblock2(elem);
            if(e.target.id  ==element.id){
              continue;
                          }
            this.unselectplanblock2(
              elem,
              pname,
              parentname,
              subgroupname,
              packageindex,
              groupindex,
              subgroupindex,
              plandetailsobj[9],
              plandetailsobj[10],
              plandetailsobj[11]
            );

            element.checked = false;
          }
        }

        e.checked = true;
        e.target.checked = true;
      } else {
      }
    } else {
    }

    setTimeout(() => {
      if (e.target.checked) {
        // this.selectplanblock2(e.target);
        this.selectplanblock2(
          e.target,
          pname,
          parentname,
          subgroupname,
          packageindex,
          groupindex,
          subgroupindex
        );
      } else {
        for (let i = 0; i < elements.length; i++) {
          let elem = elements[i];
          element = elem;
          let plandetails = element.attributes.data.value;
          let plandetailsobj = plandetails.split('##');

          // this.unselectplanblock2(e.target);

          this.unselectplanblock2(
            elem,
            pname,
            parentname,
            subgroupname,
            packageindex,
            groupindex,
            subgroupindex,
            plandetailsobj[9],
            plandetailsobj[10],
            plandetailsobj[11]
          );
        }
      }
    }, 10);
  }

  onCheckboxChange3(
    e: any,
    allow_multiple: any,
    disallowedPlanLevels: any,
    packageid: any,
    subgroupid: any,
    pname: any,
    subgroupname: any,
    subgroup: any,
    ordering: any,
    parentid: any,
    parentname: any,
    packageindex: number,
    groupindex: number,
    subgroupindex: number
  ) {
    this._LoaderService.ShowLoader()


    setTimeout(() => {
      this._LoaderService.HideLoader()

    }, 2000);
    let multiple = true;
    // let multiple = allow_multiple ? Boolean(allow_multiple.data[0]) : false;
    if (e.target.checked) {
      this.unselectPlanLevel3(e.target.id.replace('plancheck3', ''), parentid);
    }
    else{
      //we are changg=ing fron select to unselect
      /* using for select checked plans in block3 */
      let block3 = JSON.parse(sessionStorage.getItem('summaryBlock3') || '[]');

      let block3filter = block3.filter(
        (item: any) => item.parentId == parentid
      );

      const dom2: HTMLElement = this.elementRef.nativeElement;
      if (block3filter.length > 1) {
        let element1: any = dom2.querySelector('#plancheck3' + subgroupid);

        if (element1.checked) {
          console.log('checked');

          element1.checked = false;
          return;
        } else {
          if (block3) {

            let index = this.getslectedplansblock3(subgroupid);

            if (index > -1) {
              block3.splice(index, 1);
              let summaryBlock3 = JSON.parse(sessionStorage.getItem('summaryBlock3') || '[]');



if(subgroupid==17 || subgroupid==18){


      this.plansresblack3[packageindex]['groups'][groupindex][
        'subGroups'
      ][subgroupindex]['checked'] = false;

      if (
        this.plansresblack3[packageindex]['groups'][groupindex][
          'subGroups'
        ][subgroupindex]['name'] == 'Executive Health'
      ) {


        $('#executiveplansblock3single' + subgroupid).prop(
          'checked',
          false
        );
        $('#executiveplansblock3couple' + subgroupid).prop(
          'checked',
          false
        );
        $('#executiveplansblock3family' + subgroupid).prop(
          'checked',
          false
        );
        $('#executiveplansblock3single' +subgroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock3couple' + subgroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock3family' + subgroupid).prop(
          'disabled',
          true
        );



      }

      if (
        this.plansresblack3[packageindex]['groups'][groupindex][
          'subGroups'
        ][subgroupindex]['name'] == 'Complete Executive Care'
      ) {


        $('#executiveplansblock3single' + subgroupid).prop(
          'checked',
          false
        );
        $('#executiveplansblock3couple' + subgroupid).prop(
          'checked',
          false
        );
        $('#executiveplansblock3family' + subgroupid).prop(
          'checked',
          false
        );
        $('#executiveplansblock3single' + subgroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock3couple' + subgroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock3family' + subgroupid).prop(
          'disabled',
          true
        );

      }



}




                var newselectedplans: any = {};
                for (var i = 0; i < summaryBlock3.length; i++) {
                  newselectedplans[summaryBlock3[i].subGroupId] = i;
                }

                sessionStorage.setItem('selectedPlans', JSON.stringify(newselectedplans));

                this.planssummarymain = [];
                this.planssummaryopt = [];

                summaryBlock3.forEach((element: any) => {
                  if (element.packagename != 'Opt-in') {
                    this.planssummarymain.push(element);
                  } else {
                    this.planssummaryopt.push(element);
                  }
                });


                let selectedplansblock3 = JSON.parse(
                  sessionStorage.getItem('summaryBlock3') || '[]'
                );



                sessionStorage.setItem(
                  'summaryBlock3main',
                  JSON.stringify(this.planssummarymain)
                );
                sessionStorage.setItem(
                  'summaryBlock3opt',
                  JSON.stringify(this.planssummaryopt)
                );

                sessionStorage.setItem('summaryBlock3', JSON.stringify(summaryBlock3));


            } else {
              return;
            }
          }

          sessionStorage.setItem('summaryBlock3', JSON.stringify(block3));

          let selectedplansblock3 = JSON.parse(
            sessionStorage.getItem('summaryBlock3') || '[]'
          );

          return;
        }
      }
  }
    if (disallowedPlanLevels != null) {
      let disallowed_plans = disallowedPlanLevels.split(',');
      const dom1: HTMLElement = this.elementRef.nativeElement;
      const disallowed_elements = dom1.querySelectorAll(
        ".plansscreen3 input[type='checkbox']"
      );

      // disallowed_elements.forEach((elem: any) => {

      for (let i = 0; i < disallowed_elements.length; i++) {
        let elem: any = disallowed_elements[i];
        // elementcv.checked=false

        let plandetails = elem.attributes.data.value;

        let plandetailsobj = plandetails.split('##');

        console.log('main', plandetailsobj);

        // console.log("disallowed_plans",disallowed_plans)

        if (e.target.checked) {
          if (!elem.disabled) {
            if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
              if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
                //  elem.checked=false
                // elem.disabled = true;
                elem.previousElementSibling.style.opacity = 0.2;
                this.disabledelement =
                  'Already included in GroupBenefitz All-In';
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
                //  elem.checked=false
                // elem.disabled = true;
                elem.previousElementSibling.style.opacity = 0.2;
                this.disabledelement =
                  'Already included in GroupBenefitz All-In';
              }
            }
          }
          if (elem.checked) {
            // console.log(disallowed_plans)
            console.log(plandetailsobj);

            if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
              if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
                elem.checked = false;
                this.unselectplanblock3(
                  elem,
                  pname,
                  parentname,
                  subgroupname,
                  packageindex,
                  groupindex,
                  subgroupindex,
                  plandetailsobj[10],
                  plandetailsobj[11],
                  plandetailsobj[12]
                );
              }
            } else {
              //console.log(disallowed_plans)
              //console.log(plandetailsobj)
              if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
                elem.checked = false;
                this.unselectplanblock3(
                  elem,
                  pname,
                  parentname,
                  subgroupname,
                  packageindex,
                  groupindex,
                  subgroupindex,
                  plandetailsobj[10],
                  plandetailsobj[11],
                  plandetailsobj[12]
                );
                // elem.disabled =true
              }
            }
          }
        } else {
          if (
            elem.disabled ||
            elem.previousElementSibling.style.opacity == '0.2'
          ) {
            if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
              if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
                //  elem.checked=false
                elem.disabled = false;
                elem.previousElementSibling.style.opacity = 1;
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
                //  elem.checked=false
                elem.disabled = false;
                elem.previousElementSibling.style.opacity = 1;
              }
            }
          }
          if (elem.checked) {
            if (plandetailsobj[3] == null || plandetailsobj[3] == '') {
              if (disallowed_plans.indexOf(plandetailsobj[4]) >= 0) {
                elem.checked = false;
                // elem.disabled =true
              }
            } else {
              if (disallowed_plans.indexOf(plandetailsobj[3]) >= 0) {
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
          let plandetails = element.attributes.data.value;
          let plandetailsobj = plandetails.split('##');
          if (element.checked) {
            // this.unselectplanblock2(elem);
            if(e.target.id  ==element.id){
              continue;
                          }
            this.unselectplanblock3(
              elem,
              pname,
              parentname,
              subgroupname,
              packageindex,
              groupindex,
              subgroupindex,
              plandetailsobj[9],
              plandetailsobj[10],
              plandetailsobj[11]
            );

            element.checked = false;
          }
        }

        e.checked = true;
        e.target.checked = true;
      } else {
      }
    } else {
    }
    setTimeout(() => {
      if (e.target.checked) {
        // this.selectplanblock2(e.target);
        this.selectplanblock3(
          e.target,
          pname,
          parentname,
          subgroupname,
          packageindex,
          groupindex,
          subgroupindex
        );
      } else {
        for (let i = 0; i < elements.length; i++) {
          let elem = elements[i];
          element = elem;
          let plandetails = element.attributes.data.value;
          let plandetailsobj = plandetails.split('##');

          // this.unselectplanblock2(e.target);

          this.unselectplanblock3(
            elem,
            pname,
            parentname,
            subgroupname,
            packageindex,
            groupindex,
            subgroupindex,
            plandetailsobj[9],
            plandetailsobj[10],
            plandetailsobj[11]
          );
        }
      }
    }, 10);
  }
  clean(obj) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName].length === 0
      ) {
        delete obj[propName];
      }
    }

    return obj;
  }

  onCheckboxChange1Tier(
    e: any,
    allow_multiple: any,
    disallowedPlanLevels: any,
    packageid: any,
    subgroupid: any,
    pname: any,
    subgroupname: any,
    subgroup: any,
    ordering: any,
    parentid: any,
    parentname: any,
    packageindex: number,
    groupindex: number,
    subgroupindex: number,
    backgroundColor: any
  ) {
    this.planselectedId = subgroupid;

    let obj = {
      packageId: packageid,
      subGroupid: subgroupid,
      subGroupName: subgroupname,
      packageName: pname,
      tiers: [],
      tiersidArray: [],
      disallowedPlanLevels: disallowedPlanLevels,
      packageindex: packageindex,
      groupindex: groupindex,
      subgroupindex: subgroupindex,
      parentid: parentid,
      backgroundColor: backgroundColor,
    };

    let selectedTiersBlock1 = JSON.parse(
      sessionStorage.getItem('selectedTiersBlock1') || '[]'
    );

    console.log(selectedTiersBlock1);
    if (e.target.checked) {
      this.plansBlock1Tiers[packageindex]['groups'][groupindex]['subGroups'][
        subgroupindex
      ].checked = true;
      this.selectedPlansInfoTierArray.push(obj);

      selectedTiersBlock1.push(obj);
      sessionStorage.setItem(
        'selectedTiersBlock1',
        JSON.stringify(selectedTiersBlock1)
      );

      if (!this.selectedPackagePlansInfoTier[pname]) {
        this.selectedPackagePlansInfoTier[pname] = [];
      }
      const exists =
        this.selectedPackagePlansInfoTier[pname].findIndex(
          (item) => item.subGroupid === subgroupid
        ) > -1;
      if (exists) {
        console.log('check');
      } else {
        console.log('check1');
        this.selectedPackagePlansInfoTier[pname].push(obj);

        this.selectedPackagePlansInfoTier = this.clean(
          this.selectedPackagePlansInfoTier
        );

        console.log(this.selectedPackagePlansInfoTier);
      }

      this.checkdisallowedPlans(subgroupid, parentid, packageid);


      if (
        this.plansBlock1Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['name'] == 'Executive Health'
      ) {
        this.plansBlock1Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['coverage'] = 'Exec';
        this.block1coverage = false;

        // $("#executiveplans" + obj.subGroupId).prop("checked", false);
        $('#executiveplansTiersingle' + obj.subGroupid).prop('disabled', false);
        $('#executiveplansTiercouple' + obj.subGroupid).prop('disabled', false);
        $('#executiveplansTierfamily' + obj.subGroupid).prop('disabled', false);
        $('#executiveplansTiersingle' + obj.subGroupid).click();
      }
      if (
        this.plansBlock1Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['name'] == 'Complete Executive Care'
      ) {
        this.plansBlock1Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['coverage'] = 'Exec';
        this.block1coverage = false;
        // $("#executiveplans" + obj.subGroupId).prop("checked", false);
        $('#executiveplansTiersingle' + obj.subGroupid).prop('disabled', false);
        $('#executiveplansTiercouple' + obj.subGroupid).prop('disabled', false);
        $('#executiveplansTierfamily' + obj.subGroupid).prop('disabled', false);
        $('#executiveplansTiersingle' + obj.subGroupid).click();
      }
    }


    else {
      if (
        this.plansBlock1Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['name'] == 'Executive Health'
      ) {
        this.plansBlock1Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['coverage'] = 'Exec';
        this.block1coverage = false;

        // $("#executiveplans" + obj.subGroupId).prop("checked", false);
        $('#executiveplansTiersingle' + obj.subGroupid).prop('disabled', true);
        $('#executiveplansTiercouple' + obj.subGroupid).prop('disabled', true);
        $('#executiveplansTierfamily' + obj.subGroupid).prop('disabled', true);

      }
      if (
        this.plansBlock1Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['name'] == 'Complete Executive Care'
      ) {
        this.plansBlock1Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['coverage'] = 'Exec';
        this.block1coverage = false;
        // $("#executiveplans" + obj.subGroupId).prop("checked", false);
        $('#executiveplansTiersingle' + obj.subGroupid).prop('disabled', true);
        $('#executiveplansTiercouple' + obj.subGroupid).prop('disabled', true);
        $('#executiveplansTierfamily' + obj.subGroupid).prop('disabled', true);

      }

      this.plansBlock1Tiers[packageindex]['groups'][groupindex]['subGroups'][
        subgroupindex
      ].checked = false;
      this.plansBlock1Tiers[packageindex]['groups'][groupindex]['subGroups'][
        subgroupindex
      ].coverage = '';  //default
      this.plansBlock1Tiers[packageindex]['groups'][groupindex]['subGroups'][
        subgroupindex
      ].tiers = [];

      console.log(this.selectedPackagesavailableTiers2);
      // this.selectedPackagesavailableTiers2[packageid]= this.configureTierList;

      console.log(this.selectedPackagesavailableTiers2);
      // this.selectedPackagesavailableTiers2[packageindex]['groups'][groupindex]['subGroups'][
      //   subgroupindex
      // ]= this.configureTierList;

      // Here to change
      const exists =
        this.selectedPackagePlansInfoTier[pname].findIndex(
          (item) => item.subGroupid === subgroupid
        ) > -1;

      // var index = this.selectedPackagePlansInfoTier[pname].findIndex(function(item){ return item.subGroupid === subgroupid})

      let arr = this.selectedPackagePlansInfoTier[pname];
      let subGroupIdindex;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].subGroupid == subgroupid) {
          subGroupIdindex = i;
          break;
        }
      }

      if (subGroupIdindex > -1) {
        this.selectedPackagePlansInfoTier[pname].splice(subGroupIdindex, 1);
      }
      var index1 = selectedTiersBlock1.findIndex(function (item) {
        return item.subGroupid === subgroupid;
      });

      console.log(this.selectedPackagePlansInfoTier);

      console.log(this.selectedPackagePlansInfoTier);
      console.log(this.seelctedplanLevelTierMapping);
      selectedTiersBlock1.splice(index1, 1);

      for (let i = 0; i < this.seelctedplanLevelTierMapping.length; i++) {
        if (this.seelctedplanLevelTierMapping[i].subGroupid == subgroupid) {
          this.seelctedplanLevelTierMapping.splice(i, 1);
        }
      }
      sessionStorage.setItem(
        'selectedTiersBlock1',
        JSON.stringify(selectedTiersBlock1)
      );

      console.log(this.selectedPackagesavailableTiers2);
      if (exists) {
        console.log(exists);
      } else {
        this.selectedPackagePlansInfoTier[pname].push(obj);
        //   this.TiersArray.push(obj)
        //  sessionStorage.setItem('selectedTiersBlock1', JSON.stringify(this.TiersArray));

        console.log(this.selectedPackagePlansInfoTier);

        console.log(this.seelctedplanLevelTierMapping);
      }
    }

    sessionStorage.setItem(
      'plansBlock1Tiers',
      JSON.stringify(this.plansBlock1Tiers)
    );
    if (this.upgradeplansselectiontiers == true) {
      let el: HTMLElement = this.upgradeplanstiersfalse.nativeElement;
      el.click();
      // setTimeout(() => {
      //   let el1: HTMLElement = this.upgradeplanstierstrue.nativeElement;
      //   el1.click();
      // }, 10);
    }
    if (this.employeeplanpurchasetiers == true) {
      let el: HTMLElement = this.employeepurchaseTiersfalse.nativeElement;
      el.click();
      // setTimeout(() => {
      //   let el1: HTMLElement = this.employeepurchaseTierstrue.nativeElement;
      //   el1.click();
      // }, 10);
    }

    // this.selectedPlansInfoTierArray.push(obj);

    // if (!this.selectedPackagePlansInfoTier[pname]) {
    //   this.selectedPackagePlansInfoTier[pname] = [];
    // }
    // const exists =
    //   this.selectedPackagePlansInfoTier[pname].findIndex(
    //     (item) => item.subGroupid === subgroupid
    //   ) > -1;
    // if (exists) {
    //   console.log('check');
    // } else {

    //   this.selectedPackagePlansInfoTier[pname].push(obj);

    //   console.log(this.selectedPackagePlansInfoTier)
    // }
  }
  onCheckboxChange2Tier(
    e: any,
    allow_multiple: any,
    disallowedPlanLevels: any,
    packageid: any,
    subgroupid: any,
    pname: any,
    subgroupname: any,
    subgroup: any,
    ordering: any,
    parentid: any,
    parentname: any,
    packageindex: number,
    groupindex: number,
    subgroupindex: number,
    backgroundColor: any
  ) {
    this.planselectedId = subgroupid;

    let obj = {
      packageId: packageid,
      subGroupid: subgroupid,
      subGroupName: subgroupname,
      packageName: pname,
      tiers: [],
      tiersidArray: [],
      disallowedPlanLevels: disallowedPlanLevels,
      packageindex: packageindex,
      groupindex: groupindex,
      subgroupindex: subgroupindex,
      parentid: parentid,
      backgroundColor: backgroundColor,
    };

    let selectedTiersBlock2 = JSON.parse(
      sessionStorage.getItem('selectedTiersBlock2') || '[]'
    );

    console.log(selectedTiersBlock2);

    // seelctedplanLevelTierMappingBlock2
    if (e.target.checked) {
      this.plansresblack2Tiers[packageindex]['groups'][groupindex]['subGroups'][
        subgroupindex
      ].checked = true;
      this.selectedPlansInfoTierArrayBlock2.push(obj);

      selectedTiersBlock2.push(obj);
      sessionStorage.setItem(
        'selectedTiersBlock2',
        JSON.stringify(selectedTiersBlock2)
      );

      if (!this.selectedPackagePlansInfoTierBlock2[pname]) {
        this.selectedPackagePlansInfoTierBlock2[pname] = [];
      }
      const exists =
        this.selectedPackagePlansInfoTierBlock2[pname].findIndex(
          (item) => item.subGroupid === subgroupid
        ) > -1;
      if (exists) {
        console.log('check');
      } else {
        console.log('check1');
        this.selectedPackagePlansInfoTierBlock2[pname].push(obj);

        this.selectedPackagePlansInfoTierBlock2 = this.clean(
          this.selectedPackagePlansInfoTierBlock2
        );
        console.log(this.selectedPackagePlansInfoTierBlock2);


      }

      if (
        this.plansresblack2Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['name'] == 'Executive Health'
      ) {
        console.log('test1');
        $('#executiveplansblock2Tiersingle' + obj.subGroupid).prop(
          'disabled',
          false
        );
        $('#executiveplansblock2Tiercouple' + obj.subGroupid).prop(
          'disabled',
          false
        );
        $('#executiveplansblock2Tierfamily' + obj.subGroupid).prop(
          'disabled',
          false
        );
        $('#executiveplansblock2Tiersingle' + obj.subGroupid).click();

        console.log(this.seelctedplanLevelTierMappingBlock2);
      }
      if (
        this.plansresblack2Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['name'] == 'Complete Executive Care'
      ) {
        $('#executiveplansblock2Tiersingle' + obj.subGroupid).prop(
          'disabled',
          false
        );
        $('#executiveplansblock2Tiercouple' + obj.subGroupid).prop(
          'disabled',
          false
        );
        $('#executiveplansblock2Tierfamily' + obj.subGroupid).prop(
          'disabled',
          false
        );
        $('#executiveplansblock2Tiersingle' + obj.subGroupid).click();
      }

      console.log(this.seelctedplanLevelTierMapping)

      console.log(this.selectedPackagesavailableTiers2Block2)
      // selectedPackagesavailableTiers2Block2[planLevel.packageId][planLevel.subGroupid]
      let mappingtiers = this.seelctedplanLevelTierMapping;

      console.log(mappingtiers);


      if(mappingtiers.length>0){
      for (let i = 0; i < mappingtiers.length; i++) {

        if (mappingtiers[i] && mappingtiers[i].subGroupid == obj.subGroupid) {
          if (mappingtiers[i].tiers && mappingtiers[i].tiers.length > 0) {

            for (let j = 0; j < mappingtiers[i].tiers.length; j++) {



              for (let k = 0; k < this.configureTierList.length; k++) {
                console.log(this.configureTierList[k].id);
                console.log(mappingtiers[i].tiers[j].id);

                if (this.configureTierList[k].id != mappingtiers[i].tiers[j].id) {


                console.log(this.selectedPackagesavailableTiers2Block2)
                console.log(obj.packageId)
                console.log(obj.subGroupid)

                if (!this.selectedPackagesavailableTiers2Block2[obj.packageId]) {

                  this.selectedPackagesavailableTiers2Block2[obj.packageId] = {};
                  this.selectedPackagesavailableTiers2Block2[obj.packageId][
                    obj.subGroupid
                  ] = this.configureTierList[k];
                }else {

                  if (
                    !this.selectedPackagesavailableTiers2Block2[obj.packageId][
                      obj.subGroupid
                    ]
                  ) {
                    let array =[]
                    array.push(this.configureTierList[k])
                    this.selectedPackagesavailableTiers2Block2[obj.packageId][
                      obj.subGroupid
                    ] = array;
                  }
                }

                }

              }


            }
          }
        }
        else{


          if (!this.selectedPackagesavailableTiers2Block2[obj.packageId]) {

            this.selectedPackagesavailableTiers2Block2[obj.packageId] = {};
            this.selectedPackagesavailableTiers2Block2[obj.packageId][
              obj.subGroupid
            ] = this.configureTierList;
          }else {

            if (
              !this.selectedPackagesavailableTiers2Block2[obj.packageId][
                obj.subGroupid
              ]
            ) {
              this.selectedPackagesavailableTiers2Block2[obj.packageId][
                obj.subGroupid
              ] = this.configureTierList;
            }
          }
        }
      }
    }

    else{

this.selectedPackagesavailableTiers2Block2[obj.packageId][
  obj.subGroupid
] = this.configureTierList;
    }


    }
    else {


      if (
        this.plansresblack2Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['name'] == 'Executive Health'
      ) {
        this.plansresblack2Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['coverage'] = 'Exec';
        this.block1coverage = false;

        // $("#executiveplans" + obj.subGroupId).prop("checked", false);
        $('#executiveplansblock2Tiersingle' + obj.subGroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock2Tiercouple' + obj.subGroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock2Tierfamily' + obj.subGroupid).prop(
          'disabled',
          true
        );

      }
      if (
        this.plansresblack2Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['name'] == 'Complete Executive Care'
      ) {
        this.plansresblack2Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['coverage'] = 'Exec';
        this.block1coverage = false;
        // $("#executiveplans" + obj.subGroupId).prop("checked", false);
        $('#executiveplansblock2Tiersingle' + obj.subGroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock2Tiercouple' + obj.subGroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock2Tierfamily' + obj.subGroupid).prop(
          'disabled',
          true
        );
      }
      this.plansresblack2Tiers[packageindex]['groups'][groupindex]['subGroups'][
        subgroupindex
      ].checked = false;
      this.plansresblack2Tiers[packageindex]['groups'][groupindex]['subGroups'][
        subgroupindex
      ].tiers = [];
      this.plansresblack2Tiers[packageindex]['groups'][groupindex]['subGroups'][
        subgroupindex
      ].coverage = ''; //default

      // Here to change





      if (this.selectedPackagesavailableTiers2Block2[packageindex]['groups']) {
        this.selectedPackagesavailableTiers2Block2[packageindex]['groups'][
          groupindex
        ]['subGroups'][subgroupindex] = this.configureTierList;

        this.selectedPackagesavailableTiers2Block2[packageid] =
          this.configureTierList;
      }




      const exists =
        this.selectedPackagePlansInfoTierBlock2[pname].findIndex(
          (item) => item.subGroupid === subgroupid
        ) > -1;

      // var index = this.selectedPackagePlansInfoTierBlock2[pname].findIndex(function(item){ return item.subGroupid === subgroupid})
      var index1 = selectedTiersBlock2.findIndex(function (item) {
        return item.subGroupid === subgroupid;
      });

      let arr = this.selectedPackagePlansInfoTierBlock2[pname];
      let subGroupIdindex;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].subGroupid == subgroupid) {
          subGroupIdindex = i;
          break;
        }
      }

      if (subGroupIdindex > -1) {
        this.selectedPackagePlansInfoTierBlock2[pname].splice(
          subGroupIdindex,
          1
        );
      }
      // this.selectedPackagePlansInfoTierBlock2[pname].splice(index,1)
      selectedTiersBlock2.splice(index1, 1);

      //  console.log(this.seelctedplanLevelTierMappingBlock2)
      for (let i = 0; i < this.seelctedplanLevelTierMappingBlock2.length; i++) {
        if (
          this.seelctedplanLevelTierMappingBlock2[i].subGroupid == subgroupid
        ) {
          this.seelctedplanLevelTierMappingBlock2.splice(i, 1);
        }
      }

      // console.log(selectedTiersBlock2)
      // console.log(this.selectedPackagePlansInfoTierBlock2)
      // console.log(this.seelctedplanLevelTierMappingBlock2)
      sessionStorage.setItem(
        'selectedTiersBlock2',
        JSON.stringify(selectedTiersBlock2)
      );
      if (exists) {
        console.log(exists);
      } else {
        this.selectedPackagePlansInfoTierBlock2[pname].push(obj);
        //   this.TiersArray.push(obj)
        //  sessionStorage.setItem('selectedTiersBlock1', JSON.stringify(this.TiersArray));

        //   console.log(this.selectedPackagePlansInfoTier)
      }
    }
    sessionStorage.setItem(
      'plansBlock2Tiers',
      JSON.stringify(this.plansresblack2Tiers)
    );

    if (this.employeeplanpurchasetiers == true) {
      let el: HTMLElement = this.employeepurchaseTiersfalse.nativeElement;
      el.click();
      // setTimeout(() => {
      //   let el1: HTMLElement = this.employeepurchaseTierstrue.nativeElement;
      //   el1.click();
      // }, 10);
    }
  }
  onCheckboxChange3Tier(
    e: any,
    allow_multiple: any,
    disallowedPlanLevels: any,
    packageid: any,
    subgroupid: any,
    pname: any,
    subgroupname: any,
    subgroup: any,
    ordering: any,
    parentid: any,
    parentname: any,
    packageindex: number,
    groupindex: number,
    subgroupindex: number,
    backgroundColor: any
  ) {
    this.planselectedId = subgroupid;

    let obj = {
      packageId: packageid,
      subGroupid: subgroupid,
      subGroupName: subgroupname,
      packageName: pname,
      tiers: [],
      tiersidArray: [],
      disallowedPlanLevels: disallowedPlanLevels,
      packageindex: packageindex,
      groupindex: groupindex,
      subgroupindex: subgroupindex,
      parentid: parentid,
      backgroundColor: backgroundColor,
    };

    let selectedTiersBlock3 = JSON.parse(
      sessionStorage.getItem('selectedTiersBlock3') || '[]'
    );

    let block3TiersRes = JSON.parse(
      sessionStorage.getItem('block3resultTiers') || '[]'
    );

    //  if(block3TiersRes.length>0){
    //   this.plansresblack3Tiers = JSON.parse(sessionStorage.getItem('block3resultTiers') || '[]');
    //  }
    //  else{
    //   this.plansresblack3Tiers = this.plansresblack3Tiers
    //  }
    if (e.target.checked) {
      console.log(this.plansresblack3Tiers);
      // this.plansresblack3Tiers = JSON.parse(sessionStorage.getItem('block3resultTiers') || '[]');
      this.plansresblack3Tiers[packageindex]['groups'][groupindex]['subGroups'][
        subgroupindex
      ].checked = true;
      this.selectedPlansInfoTierArrayBlock3.push(obj);

      selectedTiersBlock3.push(obj);
      sessionStorage.setItem(
        'selectedTiersBlock3',
        JSON.stringify(selectedTiersBlock3)
      );

      if (!this.selectedPackagePlansInfoTierBlock3[pname]) {
        this.selectedPackagePlansInfoTierBlock3[pname] = [];
      }
      const exists =
        this.selectedPackagePlansInfoTierBlock3[pname].findIndex(
          (item) => item.subGroupid === subgroupid
        ) > -1;
      if (exists) {
        console.log('check');
      } else {
        console.log('check1');
        this.selectedPackagePlansInfoTierBlock3[pname].push(obj);
        this.selectedPackagePlansInfoTierBlock3 = this.clean(
          this.selectedPackagePlansInfoTierBlock3
        );
      }

      if (
        this.plansresblack3Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['name'] == 'Executive Health'
      ) {
        // this.plansresblack3Tiers[obj.packageindex]['groups'][obj.groupindex]['subGroups'][
        //   obj.subgroupindex
        // ]['coverage'] = 'Exec';
        this.block1coverage = false;

        // $("#executiveplans" + obj.subGroupId).prop("checked", false);
        $('#executiveplansblock3Tiersingle' + obj.subGroupid).prop(
          'disabled',
          false
        );
        $('#executiveplansblock3Tiercouple' + obj.subGroupid).prop(
          'disabled',
          false
        );
        $('#executiveplansblock3Tierfamily' + obj.subGroupid).prop(
          'disabled',
          false
        );
        $('#executiveplansblock3Tiersingle' + obj.subGroupid).click();
      }
      if (
        this.plansresblack3Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['name'] == 'Complete Executive Care'
      ) {
        // this.plansresblack3Tiers[obj.packageindex]['groups'][obj.groupindex]['subGroups'][
        //   obj.subgroupindex
        // ]['coverage'] = 'Exec';
        this.block1coverage = false;
        // $("#executiveplans" + obj.subGroupId).prop("checked", false);
        $('#executiveplansblock3Tiersingle' + obj.subGroupid).prop(
          'disabled',
          false
        );
        $('#executiveplansblock3Tiercouple' + obj.subGroupid).prop(
          'disabled',
          false
        );
        $('#executiveplansblock3Tierfamily' + obj.subGroupid).prop(
          'disabled',
          false
        );
        $('#executiveplansblock3Tiersingle' + obj.subGroupid).click();
      }


if(this.seelctedplanLevelTierMappingBlock2.length>0){

      let mappingtiers = this.seelctedplanLevelTierMappingBlock2;

      console.log(mappingtiers);
      if(mappingtiers.length>0){
      for (let i = 0; i < mappingtiers.length; i++) {

        if (mappingtiers[i] && mappingtiers[i].subGroupid == obj.subGroupid) {
          if (mappingtiers[i].tiers && mappingtiers[i].tiers.length > 0) {

            for (let j = 0; j < mappingtiers[i].tiers.length; j++) {



              for (let k = 0; k < this.configureTierList.length; k++) {
                console.log(this.configureTierList[k].id);
                console.log(mappingtiers[i].tiers[j].id);

                if (this.configureTierList[k].id != mappingtiers[i].tiers[j].id) {

                if (!this.selectedPackagesavailableTiers3Block3[obj.packageId]) {

                  this.selectedPackagesavailableTiers3Block3[obj.packageId] = {};
                  this.selectedPackagesavailableTiers3Block3[obj.packageId][
                    obj.subGroupid
                  ] = this.configureTierList[k];
                }else {

                  if (
                    !this.selectedPackagesavailableTiers3Block3[obj.packageId][
                      obj.subGroupid
                    ]
                  ) {
                    let array =[]
                    array.push(this.configureTierList[k])
                    this.selectedPackagesavailableTiers3Block3[obj.packageId][
                      obj.subGroupid
                    ] = array;
                  }
                }

                }

              }


            }
          }
        }
        else{


          if (!this.selectedPackagesavailableTiers3Block3[obj.packageId]) {

            this.selectedPackagesavailableTiers3Block3[obj.packageId] = {};
            this.selectedPackagesavailableTiers3Block3[obj.packageId][
              obj.subGroupid
            ] = this.configureTierList;
          }else {

            if (
              !this.selectedPackagesavailableTiers3Block3[obj.packageId][
                obj.subGroupid
              ]
            ) {
              this.selectedPackagesavailableTiers3Block3[obj.packageId][
                obj.subGroupid
              ] = this.configureTierList;
            }
          }
        }
      }
    }

    else{

this.selectedPackagesavailableTiers3Block3[obj.packageId][
  obj.subGroupid
] = this.configureTierList;
    }
  }
  else{
    let mappingtiers = this.seelctedplanLevelTierMapping;

    console.log(mappingtiers);
    if(mappingtiers.length>0){
    for (let i = 0; i < mappingtiers.length; i++) {

      if (mappingtiers[i] && mappingtiers[i].subGroupid == obj.subGroupid) {
        if (mappingtiers[i].tiers && mappingtiers[i].tiers.length > 0) {

          for (let j = 0; j < mappingtiers[i].tiers.length; j++) {



            for (let k = 0; k < this.configureTierList.length; k++) {
              console.log(this.configureTierList[k].id);
              console.log(mappingtiers[i].tiers[j].id);

              if (this.configureTierList[k].id != mappingtiers[i].tiers[j].id) {

              if (!this.selectedPackagesavailableTiers3Block3[obj.packageId]) {

                this.selectedPackagesavailableTiers3Block3[obj.packageId] = {};
                this.selectedPackagesavailableTiers3Block3[obj.packageId][
                  obj.subGroupid
                ] = this.configureTierList[k];
              }else {

                if (
                  !this.selectedPackagesavailableTiers3Block3[obj.packageId][
                    obj.subGroupid
                  ]
                ) {
                  let array =[]
                  array.push(this.configureTierList[k])
                  this.selectedPackagesavailableTiers3Block3[obj.packageId][
                    obj.subGroupid
                  ] = array;
                }
              }

              }

            }


          }
        }
      }
      else{


        if (!this.selectedPackagesavailableTiers3Block3[obj.packageId]) {

          this.selectedPackagesavailableTiers3Block3[obj.packageId] = {};
          this.selectedPackagesavailableTiers3Block3[obj.packageId][
            obj.subGroupid
          ] = this.configureTierList;
        }else {

          if (
            !this.selectedPackagesavailableTiers3Block3[obj.packageId][
              obj.subGroupid
            ]
          ) {
            this.selectedPackagesavailableTiers3Block3[obj.packageId][
              obj.subGroupid
            ] = this.configureTierList;
          }
        }
      }
    }
  }

  else{

this.selectedPackagesavailableTiers3Block3[obj.packageId][
obj.subGroupid
] = this.configureTierList;
  }
  }

    } else {
      if (
        this.plansresblack3Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['name'] == 'Executive Health'
      ) {
        this.plansresblack3Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['coverage'] = 'Exec';
        this.block1coverage = false;

        // $("#executiveplans" + obj.subGroupId).prop("checked", false);
        $('#executiveplansblock3Tiersingle' + obj.subGroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock3Tiercouple' + obj.subGroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock3Tierfamily' + obj.subGroupid).prop(
          'disabled',
          true
        );

      }
      if (
        this.plansresblack3Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['name'] == 'Complete Executive Care'
      ) {
        this.plansresblack3Tiers[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]['coverage'] = 'Exec';
        this.block1coverage = false;
        // $("#executiveplans" + obj.subGroupId).prop("checked", false);
        $('#executiveplansblock3Tiersingle' + obj.subGroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock3Tiercouple' + obj.subGroupid).prop(
          'disabled',
          true
        );
        $('#executiveplansblock3Tierfamily' + obj.subGroupid).prop(
          'disabled',
          true
        );

      }
      this.plansresblack3Tiers[packageindex]['groups'][groupindex]['subGroups'][
        subgroupindex
      ].checked = false;
      this.plansresblack3Tiers[packageindex]['groups'][groupindex]['subGroups'][
        subgroupindex
      ].tiers = [];
      this.selectedPackagesavailableTiers3Block3[packageid] =
        this.configureTierList;
      // this.plansresblack3Tiers[packageindex]['groups'][groupindex]['subGroups'][
      //   subgroupindex
      // ].coverage = "default";

      // Here to change
      this.selectedPackagesavailableTiers3Block3[packageindex]['groups'][
        groupindex
      ]['subGroups'][subgroupindex] = this.configureTierList;

      const exists =
        this.selectedPackagePlansInfoTierBlock3[pname].findIndex(
          (item) => item.subGroupid === subgroupid
        ) > -1;

      // var index = this.selectedPackagePlansInfoTierBlock3[pname].findIndex(function(item){ return item.subGroupid === subgroupid})
      var index1 = selectedTiersBlock3.findIndex(function (item) {
        return item.subGroupid === subgroupid;
      });

      let arr = this.selectedPackagePlansInfoTierBlock3[pname];
      let subGroupIdindex;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].subGroupid == subgroupid) {
          subGroupIdindex = i;
          break;
        }
      }

      if (subGroupIdindex > -1) {
        this.selectedPackagePlansInfoTierBlock3[pname].splice(
          subGroupIdindex,
          1
        );
      }
      for (let i = 0; i < this.seelctedplanLevelTierMappingBlock3.length; i++) {
        if (
          this.seelctedplanLevelTierMappingBlock3[i].subGroupid == subgroupid
        ) {
          this.seelctedplanLevelTierMappingBlock3.splice(i, 1);
        }
      }
      // this.selectedPackagePlansInfoTierBlock3[pname].splice(index,1)
      selectedTiersBlock3.splice(index1, 1);

      sessionStorage.setItem(
        'selectedTiersBlock3',
        JSON.stringify(selectedTiersBlock3)
      );
      if (exists) {
        console.log(exists);
      } else {
        this.selectedPackagePlansInfoTierBlock3[pname].push(obj);
        //   this.TiersArray.push(obj)
        //  sessionStorage.setItem('selectedTiersBlock1', JSON.stringify(this.TiersArray));

        //   console.log(this.selectedPackagePlansInfoTier)
      }
    }
  }

  checkdisallowedPlansextension(
    curr_planLevel_id: number,
    curr_palnlevel_parentid: number,
    curr_packageid: number,

  ) {

    setTimeout(() => {
      let availabelTiers = JSON.parse(sessionStorage.getItem("avilableTiersBlock1"))
      console.log(availabelTiers)

        if (!availabelTiers[curr_packageid]) {
          availabelTiers[curr_packageid] = {};
          availabelTiers[curr_packageid][curr_planLevel_id] =
            this.configureTierList;
        } else {
          if (
            !availabelTiers[curr_packageid][curr_planLevel_id]
          ) {
            availabelTiers[curr_packageid][
              curr_planLevel_id
            ] = this.configureTierList;
          }
          else{
            availabelTiers[curr_packageid][
              curr_planLevel_id
            ] = this.configureTierList;
          }
        }

        const dom2: HTMLElement = this.elementRef.nativeElement;

        let pl = this.disallowedplansTiers;
        var all_pl: any = Object.keys(pl);

        console.log(pl);
        console.log(all_pl);


        let availableTiers2 =
        availabelTiers[curr_packageid][
          curr_planLevel_id
        ];
        for (var i = 0; i < all_pl.length; i++) {
          console.log(all_pl[i]);
          if (
            pl[all_pl[i]].includes(curr_planLevel_id.toString()) ||
            pl[all_pl[i]].includes(curr_palnlevel_parentid.toString())
          ) {
            console.log(all_pl[i]);
            // console.log(dom2.querySelector("#plancheck"+all_pl[i]))

            let mappingtiers = this.seelctedplanLevelTierMapping;

            console.log(mappingtiers);
            let subGroupIdindex;

            for (let i = 0; i < mappingtiers.length; i++) {

              if (mappingtiers[i] && mappingtiers[i].subGroupid == all_pl[i]) {
                if (mappingtiers[i].tiers && mappingtiers[i].tiers.length > 0) {

                  for (let j = 0; j < mappingtiers[i].tiers.length; j++) {

                    let arr = availableTiers2

                    for (let k = 0; k < arr.length; k++) {
                      console.log(arr[k].id);
                      console.log(mappingtiers[i].tiers[j].id);

                      if (arr[k].id == mappingtiers[i].tiers[j].id) {
                        subGroupIdindex = i;
                        break;
                      }
                    }

                    console.log(subGroupIdindex)


                    availableTiers2.splice(subGroupIdindex, 1);
                    console.log(JSON.parse(JSON.stringify(availableTiers2)));
                    console.log(availableTiers2.length);

                    if(!availableTiers2){
                      continue;
                    }
                     console.log(JSON.parse(JSON.stringify(availableTiers2)));
                console.log(availableTiers2.length);

                availabelTiers[curr_packageid][
                  curr_planLevel_id
                ] =JSON.parse(JSON.stringify(availableTiers2))

                console.log(availabelTiers)

                    this.selectedPackagesavailableTiers2 = availabelTiers;

                  }
                }
              }
            }




          }
        }
        let current_element: any = dom2.querySelector(
          '#plancheck' + curr_planLevel_id
        );
        current_element.checked = true;
    }, 1000);


  }
  checkdisallowedPlans(
    curr_planLevel_id: number,
    curr_palnlevel_parentid: number,
    curr_packageid: number
  ) {


    console.log(this.configureTierList);
    console.log(this.selectedPackagesavailableTiers2);
    console.log(
      this.selectedPackagesavailableTiers2[curr_packageid][curr_planLevel_id]
    );
    let availabelTiers =  this.selectedPackagesavailableTiers2

    sessionStorage.setItem("avilableTiersBlock1",JSON.stringify(this.selectedPackagesavailableTiers2))
    this.checkdisallowedPlansextension(curr_planLevel_id,curr_palnlevel_parentid,curr_packageid)

  }

  unselectPlanLevelTier(
    curr_planLevel_id: number,
    curr_palnlevel_parentid: number,
    curr_tier_id: number,
    packageindex: number,
    groupindex: number,
    subgroupindex: number
  ) {
    console.log(curr_planLevel_id);
    console.log(curr_palnlevel_parentid);
    const dom2: HTMLElement = this.elementRef.nativeElement;

    let pl = this.disallowedplans;
    var all_pl: any = Object.keys(pl);

    console.log(pl);

    for (var i = 0; i < all_pl.length; i++) {
      console.log(all_pl[i]);
      if (
        pl[all_pl[i]].includes(curr_planLevel_id.toString()) ||
        pl[all_pl[i]].includes(curr_palnlevel_parentid.toString())
      ) {
        // console.log(dom2.querySelector("#plancheck"+all_pl[i]))
        let element: any = dom2.querySelector('#plancheck' + all_pl[i]);

        let mappingtiers = this.seelctedplanLevelTierMapping;

        console.log(mappingtiers);

        for (let i = 0; i < mappingtiers.length; i++) {
          if (mappingtiers[i] && mappingtiers[i].subGroupid == all_pl[i]) {
            if (mappingtiers[i].tiersidArray.includes(curr_tier_id)) {
              // if (mappingtiers[i].tierid == curr_tier_id) {
              //remove this plan from seelctedplanLevelTierMapping

              console.log(mappingtiers);
              this.plansBlock1Tiers[mappingtiers[i].packageindex]['groups'][
                mappingtiers[i].groupindex
              ]['subGroups'][mappingtiers[i].subgroupindex].checked = false;
              this.plansBlock1Tiers[mappingtiers[i].packageindex]['groups'][
                mappingtiers[i].groupindex
              ]['subGroups'][mappingtiers[i].subgroupindex].tiers = [];
              this.seelctedplanLevelTierMapping[i] = null; ///here
            }
          }
        }
      }
    }
    sessionStorage.setItem(
      'plansBlock1Tiers',
      JSON.stringify(this.plansBlock1Tiers)
    );
    console.log(this.seelctedplanLevelTierMapping);
    let current_element: any = dom2.querySelector(
      '#plancheck' + curr_planLevel_id
    );
    current_element.checked = true;
  }


  unselectPlanLevelTierBlock2(
    curr_planLevel_id: number,
    curr_palnlevel_parentid: number,
    curr_tier_id: number
  ) {
    console.log(curr_planLevel_id);
    console.log(curr_palnlevel_parentid);
    const dom2: HTMLElement = this.elementRef.nativeElement;

    let pl = this.disallowedplans;
    var all_pl: any = Object.keys(pl);

    console.log(pl);

    for (var i = 0; i < all_pl.length; i++) {
      console.log(all_pl[i]);
      if (
        pl[all_pl[i]].includes(curr_planLevel_id.toString()) ||
        pl[all_pl[i]].includes(curr_palnlevel_parentid.toString())
      ) {
        // console.log(dom2.querySelector("#plancheck"+all_pl[i]))
        let element: any = dom2.querySelector('#plancheck2' + all_pl[i]);

        let mappingtiers = this.seelctedplanLevelTierMappingBlock2;

        for (let i = 0; i < mappingtiers.length; i++) {
          if (mappingtiers[i] && mappingtiers[i].subGroupid == all_pl[i]) {
            if (mappingtiers[i].tiersidArray.includes(curr_tier_id)) {
              // if (mappingtiers[i].tierid == curr_tier_id) {
              //remove this plan from seelctedplanLevelTierMapping

              this.plansresblack2Tiers[mappingtiers[i].packageindex]['groups'][
                mappingtiers[i].groupindex
              ]['subGroups'][mappingtiers[i].subgroupindex].checked = false;
              this.plansresblack2Tiers[mappingtiers[i].packageindex]['groups'][
                mappingtiers[i].groupindex
              ]['subGroups'][mappingtiers[i].subgroupindex].tiers = [];
              this.seelctedplanLevelTierMappingBlock2[i] = null;
            }
          }
        }
      }
    }

    sessionStorage.setItem(
      'block2resultTiers',
      JSON.stringify(this.plansresblack2Tiers)
    );
    let current_element: any = dom2.querySelector(
      '#plancheck2' + curr_planLevel_id
    );
    current_element.checked = true;
  }
  unselectPlanLevelTierBlock3(
    curr_planLevel_id: number,
    curr_palnlevel_parentid: number,
    curr_tier_id: number
  ) {
    console.log(curr_planLevel_id);
    console.log(curr_palnlevel_parentid);
    const dom2: HTMLElement = this.elementRef.nativeElement;

    let pl = this.disallowedplans;
    var all_pl: any = Object.keys(pl);

    console.log(pl);

    for (var i = 0; i < all_pl.length; i++) {
      console.log(all_pl[i]);
      if (
        pl[all_pl[i]].includes(curr_planLevel_id.toString()) ||
        pl[all_pl[i]].includes(curr_palnlevel_parentid.toString())
      ) {
        // console.log(dom2.querySelector("#plancheck"+all_pl[i]))
        let element: any = dom2.querySelector('#plancheck3' + all_pl[i]);

        let mappingtiers = this.seelctedplanLevelTierMappingBlock3;

        for (let i = 0; i < mappingtiers.length; i++) {
          if (mappingtiers[i] && mappingtiers[i].subGroupid == all_pl[i]) {
            if (mappingtiers[i].tiersidArray.includes(curr_tier_id)) {
              // if (mappingtiers[i].tierid == curr_tier_id) {
              //remove this plan from seelctedplanLevelTierMapping

              this.plansresblack3Tiers[mappingtiers[i].packageindex]['groups'][
                mappingtiers[i].groupindex
              ]['subGroups'][mappingtiers[i].subgroupindex].checked = false;
              this.plansresblack3Tiers[mappingtiers[i].packageindex]['groups'][
                mappingtiers[i].groupindex
              ]['subGroups'][mappingtiers[i].subgroupindex].tiers = [];
              this.seelctedplanLevelTierMappingBlock3[i] = null;
            }
          }
        }
      }
    }
    let current_element: any = dom2.querySelector(
      '#plancheck3' + curr_planLevel_id
    );
    current_element.checked = true;
  }
  unselectPlanLevel(
    curr_planLevel_id: number,
    curr_palnlevel_parentid: number
  ) {
    console.log(curr_planLevel_id);
    console.log(curr_palnlevel_parentid);
    const dom2: HTMLElement = this.elementRef.nativeElement;

    let pl = this.disallowedplans;
    var all_pl: any = Object.keys(pl);

    console.log(pl);

    for (var i = 0; i < all_pl.length; i++) {
      console.log(all_pl[i]);
      if (
        pl[all_pl[i]].includes(curr_planLevel_id.toString()) ||
        pl[all_pl[i]].includes(curr_palnlevel_parentid.toString())
      ) {
        // console.log(dom2.querySelector("#plancheck"+all_pl[i]))
        let element: any = dom2.querySelector('#plancheck' + all_pl[i]);
        if (element.checked) {
          element.click();

          // this.unselectplan(dom2.querySelector('#plancheck' + all_pl[i]));
          // element.checked = false;
        } else {
          console.log('not checked ignore' + all_pl[i]);
        }

        // dom2.querySelector("planscheck"+all_pl[i])
        // matched_pl.push(all_pl[i])
      }
    }
    let current_element: any = dom2.querySelector(
      '#plancheck' + curr_planLevel_id
    );
    current_element.checked = true;
  }

  //Select for drayed plans in block2

  unselectPlanLevel2(
    curr_planLevel_id: number,
    curr_palnlevel_parentid: number
  ) {
    console.log(curr_planLevel_id);
    console.log(curr_palnlevel_parentid);
    const dom2: HTMLElement = this.elementRef.nativeElement;

    let pl = this.disallowedplans;
    var all_pl: any = Object.keys(pl);

    console.log(pl);

    for (var i = 0; i < all_pl.length; i++) {
      console.log(all_pl[i]);
      if (
        pl[all_pl[i]].includes(curr_planLevel_id.toString()) ||
        pl[all_pl[i]].includes(curr_palnlevel_parentid.toString())
      ) {
        // console.log(dom2.querySelector("#plancheck"+all_pl[i]))
        let element: any = dom2.querySelector('#plancheck2' + all_pl[i]);

        console.log(element);
        if (element && element.checked) {
          element.click();

          // this.unselectplan(dom2.querySelector('#plancheck' + all_pl[i]));
          // element.checked = false;
        } else {
          console.log('not checked ignore' + all_pl[i]);
        }

        // dom2.querySelector("planscheck"+all_pl[i])
        // matched_pl.push(all_pl[i])
      }
    }
    let current_element: any = dom2.querySelector(
      '#plancheck2' + curr_planLevel_id
    );
    current_element.checked = true;
  }
  //Select for drayed plans in block3
  unselectPlanLevel3(
    curr_planLevel_id: number,
    curr_palnlevel_parentid: number
  ) {
    console.log(curr_planLevel_id);
    console.log(curr_palnlevel_parentid);
    const dom2: HTMLElement = this.elementRef.nativeElement;

    let pl = this.disallowedplans;
    var all_pl: any = Object.keys(pl);

    console.log(pl);

    for (var i = 0; i < all_pl.length; i++) {
      console.log(all_pl[i]);
      if (
        pl[all_pl[i]].includes(curr_planLevel_id.toString()) ||
        pl[all_pl[i]].includes(curr_palnlevel_parentid.toString())
      ) {
        // console.log(dom2.querySelector("#plancheck"+all_pl[i]))
        let element: any = dom2.querySelector('#plancheck3' + all_pl[i]);
        if (element && element.checked) {
          element.click();

          // this.unselectplan(dom2.querySelector('#plancheck' + all_pl[i]));
          // element.checked = false;
        } else {
          console.log('not checked ignore' + all_pl[i]);
        }

        // dom2.querySelector("planscheck"+all_pl[i])
        // matched_pl.push(all_pl[i])
      }
    }
    let current_element: any = dom2.querySelector(
      '#plancheck3' + curr_planLevel_id
    );
    current_element.checked = true;
  }

  public selectplan(
    elementcv: any,
    packname: any,
    grpname: any,
    subgrpname: any,
    packageindex: number,
    groupindex: number,
    subgroupindex: number
  ) {


    this.tierconfig = [
      { id: 1, name: 'Employeee' },
      { id: 2, name: 'Employeee' },
    ];

    // console.log(elementcv)

    console.log(packname);

    console.log(grpname);

    console.log(subgrpname);
    let plandetails = elementcv.attributes.data.value;

    let plandetailsobj = plandetails.split('##');

    let obj = {
      packageid: plandetailsobj[2],
      parentId: plandetailsobj[3],
      subGroupId: plandetailsobj[4],
      orderId: plandetailsobj[8],
      packagename: packname,
      groupname: grpname,
      subGrpname: subgrpname,
      tiers: [],
      packageindex: packageindex,
      groupindex: groupindex,
      subgroupindex: subgroupindex,
      coverage:''
    };

    console.log(obj);

    this.addtosummaryBlock1(obj);
  }

  public addtosummaryBlock1(obj: any) {
    let summaryBlock1 = JSON.parse(
      sessionStorage.getItem('summaryBlock1') || '[]'
    );
    let summaryBlock2 = JSON.parse(
      sessionStorage.getItem('summaryBlock2') || '[]'
    );

    let selectedBlock1 = JSON.parse(
      sessionStorage.getItem('selectedBlock1') || '[]'
    );

    this.addtoslectplans(obj.subGroupId, summaryBlock1.length);
    summaryBlock1.push(obj);


    this.planssummarymain = [];
    this.planssummaryopt = [];

    summaryBlock1.forEach((element: any) => {
      if (element.packagename != 'Opt-in') {
        this.planssummarymain.push(element);
      } else {
        this.planssummaryopt.push(element);
      }

      if (!this.packagePlanLevelTiers[element.packagename]) {
        this.packagePlanLevelTiers[element.packagename] = [];
      }
      const exists =
        this.packagePlanLevelTiers[element.packagename].findIndex(
          (item) => item.subGroupId === element.subGroupId
        ) > -1;
      if (exists) {
        console.log('check');
      } else {
        this.packagePlanLevelTiers[element.packagename].push(element);
      }
    });
    sessionStorage.setItem(
      'packagePlanLevelTiers',
      JSON.stringify(this.packagePlanLevelTiers)
    );

    if (selectedBlock1[obj.packageid]) {
      if (selectedBlock1[obj.packageid][obj.parentId]) {
        console.log(selectedBlock1[obj.packageid][obj.parentId]);
      } else {
        // console.log('firstelse');
        selectedBlock1[obj.packageid][obj.parentId] = [];
      }
    } else {
      // console.log('secondelse');
      selectedBlock1[obj.packageid] = {};
      selectedBlock1[obj.packageid][obj.parentId] = [];
    }

    //now push
    var selectedPlanLevel = { id: obj.subGroupId, order: obj.orderId };
    selectedBlock1[obj.packageid][obj.parentId].push(selectedPlanLevel);

    let subGroupIdindex;
    console.log(summaryBlock2);
    if (summaryBlock2 && summaryBlock2.length > 0) {
      console.log('1');
      for (let i = 0; i < summaryBlock2.length; i++) {
        if (summaryBlock2[i].subGroupId == obj.subGroupId) {
          console.log('3');
          subGroupIdindex = i;
          console.log(subGroupIdindex);
          break;
        }
      }
      console.log(subGroupIdindex);
      if (subGroupIdindex > -1) {
        console.log(subGroupIdindex);
        summaryBlock2.splice(subGroupIdindex, 1);
      } else {
        console.log('check1');
      }
    }
    console.log(summaryBlock2)
    console.log(JSON.stringify(summaryBlock2))

    setTimeout(() => {

      sessionStorage.setItem('summaryBlock2', JSON.stringify(summaryBlock2));

    }, 10);

    let selectedplansblock2;
    let selectedplansblock3;
    setTimeout(() => {

    selectedplansblock2 = JSON.parse(
        sessionStorage.getItem('summaryBlock2') || '[]'
      );
    }, 20);

    setTimeout(() => {

     selectedplansblock3 = JSON.parse(
        sessionStorage.getItem('summaryBlock3') || '[]'
      );

      }, 30);







    sessionStorage.setItem(
      'summaryBlock1main',
      JSON.stringify(this.planssummarymain)
    );
    sessionStorage.setItem(
      'summaryBlock1opt',
      JSON.stringify(this.planssummaryopt)
    );

    sessionStorage.setItem('summaryBlock1', JSON.stringify(summaryBlock1));
    // sessionStorage.setItem('summaryBlock2', '[]');

    this.plansNewBlock1 = JSON.parse(
      sessionStorage.getItem('planResults') || '[]'
    );

    var res = JSON.parse(sessionStorage.getItem('planResults') || '[]');

    this.selectedplansblock1 = JSON.parse(
      sessionStorage.getItem('summaryBlock1') || '[]'
    );

    this.plansBlock1[obj.packageindex]['groups'][obj.groupindex]['subGroups'][
      obj.subgroupindex
    ]['checked'] = true;

    if (
      this.plansBlock1[obj.packageindex]['groups'][obj.groupindex]['subGroups'][
        obj.subgroupindex
      ]['name'] == 'Executive Health'
    ) {
      this.plansBlock1[obj.packageindex]['groups'][obj.groupindex]['subGroups'][
        obj.subgroupindex
      ]['coverage'] = 'Exec';
      this.block1coverage = false;
      console.log(obj.subGroupId);
      // $("#executiveplans" + obj.subGroupId).prop("checked", false);
      $('#executiveplanssingle' + obj.subGroupId).prop('disabled', false);
      $('#executiveplanscouple' + obj.subGroupId).prop('disabled', false);
      $('#executiveplansfamily' + obj.subGroupId).prop('disabled', false);
      $('#executiveplanssingle' + obj.subGroupId).click();
    }
    if (
      this.plansBlock1[obj.packageindex]['groups'][obj.groupindex]['subGroups'][
        obj.subgroupindex
      ]['name'] == 'Complete Executive Care'
    ) {
      this.plansBlock1[obj.packageindex]['groups'][obj.groupindex]['subGroups'][
        obj.subgroupindex
      ]['coverage'] = 'Exec';
      this.block1coverage = false;
      // $("#executiveplans" + obj.subGroupId).prop("checked", false);
      $('#executiveplanssingle' + obj.subGroupId).prop('disabled', false);
      $('#executiveplanscouple' + obj.subGroupId).prop('disabled', false);
      $('#executiveplansfamily' + obj.subGroupId).prop('disabled', false);
      $('#executiveplanssingle' + obj.subGroupId).click();
    }

    this.plansNewBlock1.map((packagelevel: any, index: any) => {
      packagelevel.groups.map((groups: any, index1: any) => {
        this.selectedplansblock1.map((selectplan: any) => {
          if (
            packagelevel.id == selectplan.packageid &&
            packagelevel.groups.id == selectplan.parentid
          ) {
            var allAvailble =
              this.plansNewBlock1[index]['groups'][index1]['subGroups'];

            allAvailble.map((element1: any, index2: any) => {
              if (element1 != null) {
                if (element1.disallowedPlanLevels) {
                  if (element1.id == selectplan.subGroupId) {
                    res.map((res1: any, index4: any) => {
                      res1.groups.map((groups1: any, index5: any) => {
                        // console.log(groups1)
                        groups1.subGroups.forEach(
                          (subgrp: any, index6: any) => {
                            console.log(element1.disallowedPlanLevels);
                            if (
                              element1.disallowedPlanLevels.indexOf(
                                groups1.id
                              ) > -1
                            ) {
                              this.plansBlock1[index4]['groups'][index5][
                                'subGroups'
                              ][index6]['tiers'] = [];
                              this.plansBlock1[index4]['groups'][index5][
                                'subGroups'
                              ][index6]['checked'] = false;

                              res[index4]['groups'][index5]['subGroups'][
                                index6
                              ] = null;
                            }
                          }
                        );
                      });
                    });
                  }
                }
              }
            });
          }
        });
      });
    });

    //  this.plansNewBlock1[obj.packageindex]['groups'][obj.groupindex]['subGroups'][obj.subgroupindex]['tiers'] = []
    // this.plansNewBlock1[obj.packageindex]['groups'][obj.groupindex]['subGroups'][obj.subgroupindex]['checked'] = false

    // sessionStorage.setItem('planResults', JSON.stringify(this.plansNewBlock1));


    sessionStorage.setItem('planResults', JSON.stringify(this.plansBlock1));

    sessionStorage.setItem('mainresults', JSON.stringify(res));

    this.checkvalidationblock2()
    this.checkvalidationblock3()
    //  this.plansBlock1 = res
  }


  public checkvalidationblock2(){



  setTimeout(() => {
    let selectedplansblock2 = JSON.parse(
      sessionStorage.getItem('summaryBlock2') || '[]'
    );


    console.log(selectedplansblock2)
if (this.upgradeplansselection == true) {
  // let el: HTMLElement = this.upgradeplansfalse.nativeElement;
  // el.click();
  setTimeout(() => {
    let el1: HTMLElement = this.upgradeplanstrue.nativeElement;
    el1.click();
    setTimeout(() => {
      const dom: HTMLElement = this.elementRef.nativeElement;
      if (selectedplansblock2.length > 0) {

        this.upgradeplansselection == true;
        setTimeout(() => {
          for (let i = 0; i < selectedplansblock2.length; i++) {
            const element1: any = dom.querySelector(
              '#plancheck2' + selectedplansblock2[i].subGroupId
            );
            // element1.checked = true;
            $("#plancheck2" + selectedplansblock2[i].subGroupId).prop("checked", true);
            let plancheck2Coverage =  this.getExecutiveCoveragesFromCode(selectedplansblock2[i].coverage)

            setTimeout(() => {
              if (
                plancheck2Coverage
              ) {
                if (plancheck2Coverage.single) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock2single' +
                      selectedplansblock2[i].subGroupId
                  );
                  // element2.checked = true;

                  $("#executiveplansblock2single" + selectedplansblock2[i].subGroupId).prop("checked", true);

                } if (plancheck2Coverage.couple) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock2couple' +
                      selectedplansblock2[i].subGroupId
                  );
                  // element2.checked = true;

                  $("#executiveplansblock2couple" + selectedplansblock2[i].subGroupId).prop("checked", true);

                } if (plancheck2Coverage.family) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock2family' +
                      selectedplansblock2[i].subGroupId
                  );
                  // element2.checked = true;

                  $("#executiveplansblock2family" + selectedplansblock2[i].subGroupId).prop("checked", true);

                }
              }
            }, 1000);


          }

        }, 1000);
      }
    }, 1000);
  }, 10);

}
  }, 1000);



}

public checkvalidationblock3(){
  let selectedplansblock3 = JSON.parse(
    sessionStorage.getItem('summaryBlock3') || '[]'
  );
  setTimeout(() => {
    if (selectedplansblock3.length > 0) {

      this.employeeplanpurchase =true

    if (this.employeeplanpurchase == true) {
      // let el: HTMLElement = this.employeepurchasefalse.nativeElement;
      // el.click();
      setTimeout(() => {
        let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
        el1.click();
        setTimeout(() => {
          const dom: HTMLElement = this.elementRef.nativeElement;
          if (selectedplansblock3.length > 0) {
            let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
            el1.click();
            this.employeeplanpurchase == true;
            setTimeout(() => {
              for (let i = 0; i < selectedplansblock3.length; i++) {
                const element2: any = dom.querySelector(
                  '#plancheck3' + selectedplansblock3[i].subGroupId
                );
                $("#plancheck3" + selectedplansblock3[i].subGroupId).prop("checked", true);

                // element2.checked = true;
                let plancheck3Coverage =  this.getExecutiveCoveragesFromCode(selectedplansblock3[i].coverage)

                setTimeout(() => {
                  if (
                    plancheck3Coverage
                  ) {
                    if (plancheck3Coverage.single) {
                      const element2: any = dom.querySelector(
                        '#executiveplansblock3single' +
                          selectedplansblock3[i].subGroupId
                      );
                      $("#executiveplansblock3single" + selectedplansblock3[i].subGroupId).prop("checked", true);

                      // element2.checked = true;
                    } if (plancheck3Coverage.couple) {
                      const element2: any = dom.querySelector(
                        '#executiveplansblock3couple' +
                          selectedplansblock3[i].subGroupId
                      );
                      $("#executiveplansblock3couple" + selectedplansblock3[i].subGroupId).prop("checked", true);

                      // element2.checked = true;
                    } if (plancheck3Coverage.family) {
                      const element2: any = dom.querySelector(
                        '#executiveplansblock3family' +
                          selectedplansblock3[i].subGroupId
                      );
                      $("#executiveplansblock3family" + selectedplansblock3[i].subGroupId).prop("checked", true);

                      // element2.checked = true;
                    }
                  }
                }, 1000);

              }
            }, 1500);
          }
        }, 1000);
      }, 100);
    }
    else{
    }
    }
    }, 3000);
}
  public addtoslectplans(planid: number, plansumamryindex: number) {
    let selectedPlans = JSON.parse(
      sessionStorage.getItem('selectedPlans') || '{}'
    );
    //console.log(selectedPlans)
    selectedPlans[planid] = plansumamryindex;

    sessionStorage.setItem('selectedPlans', JSON.stringify(selectedPlans));
  }

  public unselectplan(
    elementcv: any,
    packname: any,
    grpname: any,
    subgrpname: any,
    packageindex: number,
    groupindex: number,
    subgroupindex: number,
    packageIndex: number,
    groupIndex: number,
    subgroupIndex: number
  ) {
    console.log(elementcv);

    let plandetails = elementcv.attributes.data.value;

    let plandetailsobj = plandetails.split('##');

    console.log(plandetailsobj);

    // let obj = {
    //   packageid: plandetailsobj[2],
    //   parentId: plandetailsobj[3],
    //   subGroupId: plandetailsobj[4],
    //   orderId: plandetailsobj[8],
    // };

    let obj = {
      packageid: plandetailsobj[2],
      parentId: plandetailsobj[3],
      subGroupId: plandetailsobj[4],
      orderId: plandetailsobj[8],
      packagename: packname,
      groupname: grpname,
      subGrpname: subgrpname,
      tiers: [],
      packageindex: packageindex,
      groupindex: groupindex,
      subgroupindex: subgroupindex,
      packageIndex: packageIndex,
      groupIndex: groupIndex,
      subgroupIndex: subgroupIndex,
    };

    console.log(obj);
    if (plandetailsobj[1] != null || plandetailsobj[1] != 'null') {
      if (plandetailsobj[1].includes(plandetailsobj[2])) {
      }
    }

    this.removesummaryBlock1(obj);
  }


  public removesummaryBlock1(obj: any) {


    console.log(obj);
    let Mainplanres = JSON.parse(sessionStorage.getItem('planResults'));

    let summaryBlock1 = JSON.parse(
      sessionStorage.getItem('summaryBlock1') || '[]'
    );
    let selectedBlock1 = JSON.parse(
      sessionStorage.getItem('selectedBlock1') || '[]'
    );
console.log(obj.subGroupId)
    if (summaryBlock1 && summaryBlock1.length>0) {
      let index = this.getslectedplansblock1(obj.subGroupId);
      let index1 = this.getslectedblockplans(obj);

      console.log(index)

      if (index > -1) {
        console.log(obj);

        console.log(index)
        summaryBlock1.splice(index, 1);



        console.log(obj.packageIndex);
        console.log(obj.groupIndex);
        console.log(obj.subgroupIndex);

        if (obj.packageIndex && obj.groupIndex && obj.subgroupIndex) {
          //  if(!this.plansBlock1[obj.packageIndex]['groups'][obj.groupIndex] || this.plansBlock1[obj.packageIndex]['groups'][obj.groupIndex]['subGroups']){

          //  }
          //  else{
          this.plansBlock1[obj.packageIndex]['groups'][obj.groupIndex][
            'subGroups'
          ][obj.subgroupIndex]['tiers'] = [];
          this.plansBlock1[obj.packageIndex]['groups'][obj.groupIndex][
            'subGroups'
          ][obj.subgroupIndex]['checked'] = false;

          if (
            this.plansBlock1[obj.packageIndex]['groups'][obj.groupIndex][
              'subGroups'
            ][obj.subgroupIndex]['name'] == 'Executive Health'
          ) {
            console.log('Executive Health');
            this.plansBlock1[obj.packageIndex]['groups'][obj.groupIndex][
              'subGroups'
            ][obj.subgroupIndex]['coverage'] = '';  //default
            sessionStorage.setItem('mainresults', JSON.stringify(this.plansBlock1));
            this.block1coverage = true;

            // element.checked =false
            $('#executiveplanssingle' + obj.subGroupId).prop('checked', false);
            $('#executiveplanscouple' + obj.subGroupId).prop('checked', false);
            $('#executiveplansfamily' + obj.subGroupId).prop('checked', false);
            $('#executiveplanssingle' + obj.subGroupId).prop('disabled', true);
            $('#executiveplanscouple' + obj.subGroupId).prop('disabled', true);
            $('#executiveplansfamily' + obj.subGroupId).prop('disabled', true);
          }

          if (
            this.plansBlock1[obj.packageIndex]['groups'][obj.groupIndex][
              'subGroups'
            ][obj.subgroupIndex]['name'] == 'Complete Executive Care'
          ) {
            console.log('Complete Executive Care');
            this.plansBlock1[obj.packageIndex]['groups'][obj.groupIndex][
              'subGroups'
            ][obj.subgroupIndex]['coverage'] = ''; //default
            sessionStorage.setItem('mainresults', JSON.stringify(this.plansBlock1));

            this.block1coverage = true;

            // element.checked =false
            $('#executiveplanssingle' + obj.subGroupId).prop('checked', false);
            $('#executiveplanscouple' + obj.subGroupId).prop('checked', false);
            $('#executiveplansfamily' + obj.subGroupId).prop('checked', false);
            $('#executiveplanssingle' + obj.subGroupId).prop('disabled', true);
            $('#executiveplanscouple' + obj.subGroupId).prop('disabled', true);
            $('#executiveplansfamily' + obj.subGroupId).prop('disabled', true);
          }
        }

        sessionStorage.setItem('planResults', JSON.stringify(this.plansBlock1));
         this.checkvalidationblock2()

        this.checkvalidationblock3()
      } else {
        return;
      }

      // if(index >-1){

      //   alert(index)
      //   selectedBlock1.splice(index,1)

      // }
      // else{
      //   return
      // }

      var newselectedplans: any = {};
      for (var i = 0; i < summaryBlock1.length; i++) {
        newselectedplans[summaryBlock1[i].subGroupId] = i;
      }

      sessionStorage.setItem('selectedPlans', JSON.stringify(newselectedplans));

      this.planssummarymain = [];
      this.planssummaryopt = [];

      summaryBlock1.forEach((element: any) => {
        if (element.packagename != 'Opt-in') {
          this.planssummarymain.push(element);
        } else {
          this.planssummaryopt.push(element);
        }
      });

      let selectedplansblock2 = JSON.parse(
        sessionStorage.getItem('summaryBlock2') || '[]'
      );
      let selectedplansblock3 = JSON.parse(
        sessionStorage.getItem('summaryBlock3') || '[]'
      );


      console.log(selectedplansblock2)
      // if (this.upgradeplansselection == true) {
      //   let el: HTMLElement = this.upgradeplansfalse.nativeElement;
      //   el.click();
      //   setTimeout(() => {
      //     let el1: HTMLElement = this.upgradeplanstrue.nativeElement;
      //     el1.click();
      //     setTimeout(() => {
      //       const dom: HTMLElement = this.elementRef.nativeElement;
      //       if (selectedplansblock2.length > 0) {
      //         let el1: HTMLElement = this.upgradeplanstrue.nativeElement;
      //         el1.click();
      //         this.upgradeplansselection == true;
      //         setTimeout(() => {
      //           for (let i = 0; i < selectedplansblock2.length; i++) {
      //             const element1: any = dom.querySelector(
      //               '#plancheck2' + selectedplansblock2[i].subGroupId
      //             );
      //             $("#plancheck2" + selectedplansblock2[i].subGroupId).prop("checked", true);

      //             let plancheck2Coverage =  this.getExecutiveCoveragesFromCode(selectedplansblock2[i].coverage)


      //             // console.log("rakess"+JSON.parse(plancheck2Coverage))
      //             console.log("rakess"+JSON.stringify(plancheck2Coverage))


      //             setTimeout(() => {
      //               if (
      //                 plancheck2Coverage
      //               ) {
      //                 if (plancheck2Coverage.single) {
      //                   const element2: any = dom.querySelector(
      //                     '#executiveplansblock2single' +
      //                       selectedplansblock2[i].subGroupId
      //                   );
      //                   // element2.checked = true;

      //                   $("#executiveplansblock2single" + selectedplansblock2[i].subGroupId).prop("checked", true);

      //                 } if (plancheck2Coverage.couple) {
      //                   const element2: any = dom.querySelector(
      //                     '#executiveplansblock2couple' +
      //                       selectedplansblock2[i].subGroupId
      //                   );
      //                   // element2.checked = true;

      //                   $("#executiveplansblock2couple" + selectedplansblock2[i].subGroupId).prop("checked", true);

      //                 } if (plancheck2Coverage.family) {
      //                   const element2: any = dom.querySelector(
      //                     '#executiveplansblock2family' +
      //                       selectedplansblock2[i].subGroupId
      //                   );
      //                   // element2.checked = true;

      //                   $("#executiveplansblock2family" + selectedplansblock2[i].subGroupId).prop("checked", true);

      //                 }
      //               }
      //             }, 1000);
      //           }
      //         }, 1000);
      //       }
      //     }, 1000);
      //   }, 400);
      // }


      // // alert(this.employeeplanpurchase)
      // if (this.employeeplanpurchase == true) {
      //   let el: HTMLElement = this.employeepurchasefalse.nativeElement;
      //   el.click();
      //   setTimeout(() => {
      //     let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
      //     el1.click();
      //     setTimeout(() => {
      //       const dom: HTMLElement = this.elementRef.nativeElement;
      //       if (selectedplansblock3.length > 0) {
      //         let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
      //         el1.click();
      //         this.employeeplanpurchase == true;
      //         setTimeout(() => {
      //           for (let i = 0; i < selectedplansblock3.length; i++) {
      //             const element2: any = dom.querySelector(
      //               '#plancheck3' + selectedplansblock3[i].subGroupId
      //             );
      //             $("#plancheck3" + selectedplansblock3[i].subGroupId).prop("checked", true);

      //             // element2.checked = true;
      //             let plancheck3Coverage =  this.getExecutiveCoveragesFromCode(selectedplansblock3[i].coverage)

      //             setTimeout(() => {
      //               if (
      //                 plancheck3Coverage
      //               ) {
      //                 if (plancheck3Coverage.single) {
      //                   const element2: any = dom.querySelector(
      //                     '#executiveplansblock3single' +
      //                       selectedplansblock3[i].subGroupId
      //                   );
      //                   $("#executiveplansblock3single" + selectedplansblock3[i].subGroupId).prop("checked", true);

      //                   // element2.checked = true;
      //                 } if (plancheck3Coverage.couple) {
      //                   const element2: any = dom.querySelector(
      //                     '#executiveplansblock3couple' +
      //                       selectedplansblock3[i].subGroupId
      //                   );
      //                   $("#executiveplansblock3couple" + selectedplansblock3[i].subGroupId).prop("checked", true);

      //                   // element2.checked = true;
      //                 } if (plancheck3Coverage.family) {
      //                   const element2: any = dom.querySelector(
      //                     '#executiveplansblock3family' +
      //                       selectedplansblock3[i].subGroupId
      //                   );
      //                   $("#executiveplansblock3family" + selectedplansblock3[i].subGroupId).prop("checked", true);

      //                   // element2.checked = true;
      //                 }
      //               }
      //             }, 1000);
      //           }
      //         }, 1500);
      //       }
      //     }, 1000);
      //   }, 3000);
      // }

      // let el: HTMLElement = this.upgradeplansfalse.nativeElement;
      // el.click();
      // let el1: HTMLElement = this.employeepurchasefalse.nativeElement;
      // el1.click();

      sessionStorage.setItem(
        'summaryBlock1main',
        JSON.stringify(this.planssummarymain)
      );
      sessionStorage.setItem(
        'summaryBlock1opt',
        JSON.stringify(this.planssummaryopt)
      );

      sessionStorage.setItem('summaryBlock1', JSON.stringify(summaryBlock1));
    }

    this.plansNewBlock1 = JSON.parse(
      sessionStorage.getItem('planResults') || '[]'
    );

    var res = JSON.parse(sessionStorage.getItem('planResults') || '[]');


   console.log(this.selectedplansblock1)

    this.plansNewBlock1.map((packagelevel: any, index: any) => {
      packagelevel.groups.map((groups: any, index1: any) => {
        this.selectedplansblock1.map((selectplan: any) => {
          if (
            packagelevel.id == selectplan.packageid &&
            packagelevel.groups.id == selectplan.parentid
          ) {
            var allAvailble =
              this.plansNewBlock1[index]['groups'][index1]['subGroups'];

            allAvailble.map((element1: any, index2: any) => {
              if (element1 != null) {

                console.log(element1.disallowedPlanLevels)
                if (element1.disallowedPlanLevels) {
                  console.log(element1.id)
                  console.log(obj.subGroupId)
                  if (element1.id == obj.subGroupId) {

                    console.log(element1.id)
                    console.log(obj.subGroupId)
                    res.map((res1: any, index4: any) => {
                      res1.groups.map((groups1: any, index5: any) => {
                        // console.log(groups1)
                        groups1.subGroups.forEach(
                          (subgrp: any, index6: any) => {
                            console.log(subgrp);
                            if (
                              element1.disallowedPlanLevels.indexOf(
                                groups1.id
                              ) > -1
                            ) {
                              this.plansBlock1[index4]['groups'][index5][
                                'subGroups'
                              ][index6]['tiers'] = [];
                              this.plansBlock1[index4]['groups'][index5][
                                'subGroups'
                              ][index6]['checked'] = false;

                              res[index4]['groups'][index5]['subGroups'][
                                index6
                              ] = subgrp;
                            }
                          }
                        );
                      });
                    });
                    sessionStorage.setItem('mainresults', JSON.stringify(res));

                  }
                }
              }
            });
          }
        });
      });
    });

    //        this.selectedplansblock1 = JSON.parse(sessionStorage.getItem("summaryBlock1") || "{}")

    // this.plansNewBlock2.forEach((packagelevel:any,index:any) => {

    // packagelevel.groups.forEach((groups:any,index1:any) => {
    // this.selectedplansblock1.forEach((selectplan:any) => {
    // if(packagelevel.id==selectplan.packageid && packagelevel.groups.id==selectplan.parentid){

    //  var allAvailble = this.plansNewBlock2[index]["groups"][index1]["subGroups"]

    // console.log(allAvailble)

    //  allAvailble.forEach((element1:any,index2:any) => {

    //    if(element1 !=null){

    //        if(element1.disallowedPlanLevels){

    //          console.log(element1)
    //            if(element1.id==selectplan.subGroupId){
    //          res.forEach((res1:any,index4:any) => {

    //            res1.groups.forEach((groups1:any,index5:any) => {
    //              console.log(groups1)
    //              groups1.subGroups.forEach((subgrp:any,index6:any) => {

    //                if(groups1.id==15){
    //               res[index4]["groups"][index5]["subGroups"][index6]=null
    //                }
    //               })

    //            })

    //          });

    //        }

    //        }

    //  }

    //  })

    // }

    // })
    // });

    // });
    // console.log(res)
  }


  public removeslectplans(planid: number, plansumamryindex: number) {
    let selectedPlans = JSON.parse(
      sessionStorage.getItem('selectedPlans') || '{}'
    );
    //console.log(selectedPlans)
    delete selectedPlans[planid];

    for (const planid in selectedPlans) {
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

  public selectplanblock3(
    elementcv: any,
    packname: any,
    grpname: any,
    subgrpname: any,
    packageindex: number,
    groupindex: number,
    subgroupindex: number
  ) {
    let plandetails = elementcv.attributes.data.value;

    let plandetailsobj = plandetails.split('##');

    let obj = {
      packageid: plandetailsobj[2],
      parentId: plandetailsobj[3],
      subGroupId: plandetailsobj[4],
      orderId: plandetailsobj[8],
      packagename: packname,
      groupname: grpname,
      subGrpname: subgrpname,
      tiers: [],
      packageindex: packageindex,
      groupindex: groupindex,
      subgroupindex: subgroupindex,
    };
    console.log(obj);

    this.addtosummaryBlock3(obj);
  }

  public addtosummaryBlock3(obj: any) {
    console.log(obj);
    let summaryBlock3 = JSON.parse(
      sessionStorage.getItem('summaryBlock3') || '[]'
    );

    let selectedBlock3 = JSON.parse(
      sessionStorage.getItem('selectedBlock3') || '{}'
    );

    this.addtoslectplansblock3(obj.subGroupId, summaryBlock3.length);
    summaryBlock3.push(obj);

    this.planssummarymain = [];
    this.planssummaryopt = [];

    summaryBlock3.forEach((element: any) => {
      if (element.packagename != 'Opt-in') {
        this.planssummarymain.push(element);
      } else {
        this.planssummaryopt.push(element);
      }
    });

    if (selectedBlock3[obj.packageid]) {
      if (selectedBlock3[obj.packageid][obj.parentId]) {
        // console.log(selectedBlock3[obj.packageid][obj.parentId])
      } else {
        // console.log("firstelse")
        selectedBlock3[obj.packageid][obj.parentId] = [];
      }
    } else {
      // console.log("secondelse")
      selectedBlock3[obj.packageid] = {};
      selectedBlock3[obj.packageid][obj.parentId] = [];
    }

    //now push
    var selectedPlanLevel = { id: obj.subGroupId, order: obj.orderId };
    selectedBlock3[obj.packageid][obj.parentId].push(selectedPlanLevel);

    // sessionStorage.setItem('selectedBlock3', JSON.stringify(selectedBlock3));
    sessionStorage.setItem(
      'summaryBlock3main',
      JSON.stringify(this.planssummarymain)
    );
    sessionStorage.setItem(
      'summaryBlock3opt',
      JSON.stringify(this.planssummaryopt)
    );

    sessionStorage.setItem('summaryBlock3', JSON.stringify(summaryBlock3));

    console.log(obj.packageindex);
    console.log(obj.groupindex);
    console.log(obj.subgroupindex);

    if (
      !this.plansresblack3[obj.packageindex] ||
      this.plansresblack3[obj.packageindex]['groups'] ||
      this.plansresblack3[obj.packageindex]['groups'][obj.groupindex] ||
      this.plansresblack3[obj.packageindex]['groups'][obj.groupindex][
        'subGroups'
      ]
    ) {
      console.log(
        this.plansresblack3[obj.packageindex]['groups'][obj.groupindex][
          'subGroups'
        ][obj.subgroupindex]
      );

      this.plansresblack3[obj.packageindex]['groups'][obj.groupindex][
        'subGroups'
      ][obj.subgroupindex]['checked'] = true;
    }

    if (
      this.plansresblack3[obj.packageindex]['groups'][obj.groupindex][
        'subGroups'
      ][obj.subgroupindex]['name'] == 'Executive Health'
    ) {
      $('#executiveplansblock3single' + obj.subGroupId).prop('disabled', false);
      $('#executiveplansblock3couple' + obj.subGroupId).prop('disabled', false);
      $('#executiveplansblock3family' + obj.subGroupId).prop('disabled', false);
      $('#executiveplansblock3single' + obj.subGroupId).click();
      $('#executiveplansblock3couple' + obj.subGroupId).click();
      $('#executiveplansblock3family' + obj.subGroupId).click();
    }
    if (
      this.plansresblack3[obj.packageindex]['groups'][obj.groupindex][
        'subGroups'
      ][obj.subgroupindex]['name'] == 'Complete Executive Care'
    ) {
      $('#executiveplansblock3single' + obj.subGroupId).prop('disabled', false);
      $('#executiveplansblock3couple' + obj.subGroupId).prop('disabled', false);
      $('#executiveplansblock3family' + obj.subGroupId).prop('disabled', false);
      $('#executiveplansblock3single' + obj.subGroupId).click();
      $('#executiveplansblock3couple' + obj.subGroupId).click();
      $('#executiveplansblock3family' + obj.subGroupId).click();
    }

    sessionStorage.setItem('block3result', JSON.stringify(this.plansresblack3));
  }


  public addtoslectplansblock3(planid: number, plansumamryindex: number) {
    let selectedPlans = JSON.parse(
      sessionStorage.getItem('selectedPlans') || '{}'
    );
    //console.log(selectedPlans)
    selectedPlans[planid] = plansumamryindex;

    sessionStorage.setItem('selectedPlans', JSON.stringify(selectedPlans));
  }

  public unselectplanblock3(
    elementcv: any,
    packname: any,
    grpname: any,
    subgrpname: any,
    packageindex: number,
    groupindex: number,
    subgroupindex: number,
    packageIndex: number,
    groupIndex: number,
    subgroupIndex: number
  ) {

    let plandetails = elementcv.attributes.data.value;

    let plandetailsobj = plandetails.split('##');

    // console.log(plandetailsobj)
    let obj = {
      packageid: plandetailsobj[2],
      parentId: plandetailsobj[3],
      subGroupId: plandetailsobj[4],
      orderId: plandetailsobj[8],
      packagename: packname,
      groupname: grpname,
      subGrpname: subgrpname,
      tiers: [],
      packageindex: packageindex,
      groupindex: groupindex,
      subgroupindex: subgroupindex,
      packageIndex: packageindex, //packageIndex,
      groupIndex: groupindex, //groupIndex,
      subgroupIndex: subgroupindex //subgroupIndex,
    };

    if (obj.parentId == '15') {
      this.block3coverage = true;
    }
    if (plandetailsobj[1] != null || plandetailsobj[1] != 'null') {
      if (plandetailsobj[1].includes(plandetailsobj[2])) {
      }
    }

    this.removesummaryBlock3(obj);
  }

  public removesummaryBlock3(obj: any) {
    // console.log("remove")

    // console.log(obj)

    let summaryBlock3 = JSON.parse(
      sessionStorage.getItem('summaryBlock3') || '[]'
    );
    let selectedBlock3 = JSON.parse(
      sessionStorage.getItem('selectedBlock3') || '{}'
    );
    // console.log(summaryBlock2)

    if (selectedBlock3[obj.packageid]) {
      if (selectedBlock3[obj.packageid][obj.parentId]) {
        delete selectedBlock3[obj.packageid][obj.parentId];

        // console.log(selectedBlock3[obj.packageid][obj.parentId])
      } else {
        // console.log("firstelse")
        selectedBlock3[obj.packageid][obj.parentId] = [];
      }
    } else {
      // console.log("secondelse")
      selectedBlock3[obj.packageid] = {};
      selectedBlock3[obj.packageid][obj.parentId] = [];
    }

    // var selectedPlanLevel={"id":obj.subGroupId, "order":obj.orderId}
    // selectedBlock1[obj.packageid][obj.parentId].push(selectedPlanLevel)

    // selectedBlock1.splice(obj.parentId)

    // console.log(selectedBlock2)

    // sessionStorage.setItem('selectedBlock2', JSON.stringify(selectedBlock3));
    if (summaryBlock3) {
      let index = this.getslectedplansblock3(obj.subGroupId);

      if (index > -1) {
        summaryBlock3.splice(index, 1);



        // if (
        //   !this.plansresblack3[obj.packageindex] ||
        //   this.plansresblack3[obj.packageindex]['groups'] ||
        //   this.plansresblack3[obj.packageindex]['groups'][obj.groupindex] ||
        //   this.plansresblack3[obj.packageindex]['groups'][obj.groupindex][
        //     'subGroups'
        //   ]
        // ) {

          console.log(
            this.plansresblack3[obj.packageindex]['groups'][obj.groupindex][
              'subGroups'
            ][obj.subgroupindex]
          );

          // this.plansresblack3[obj.packageindex]['groups'][obj.groupindex]['subGroups'][
          //   obj.subgroupindex
          // ]['checked'] = false;
          console.log(obj)

          if ( this.plansresblack3[obj.packageIndex]['groups'][obj.groupIndex][
            'subGroups'
          ][obj.subgroupIndex]) {
            this.plansresblack3[obj.packageIndex]['groups'][obj.groupIndex][
              'subGroups'
            ][obj.subgroupIndex]['tiers'] = [];
            this.plansresblack3[obj.packageIndex]['groups'][obj.groupIndex][
              'subGroups'
            ][obj.subgroupIndex]['checked'] = false;


            if (
              this.plansresblack3[obj.packageIndex]['groups'][obj.groupIndex][
                'subGroups'
              ][obj.subgroupIndex]['name'] == 'Executive Health'
            )
            {



              $('#executiveplansblock3single' + obj.subGroupId).prop(
                'checked',
                false
              );
              $('#executiveplansblock3couple' + obj.subGroupId).prop(
                'checked',
                false
              );
              $('#executiveplansblock3family' + obj.subGroupId).prop(
                'checked',
                false
              );
              $('#executiveplansblock3single' + obj.subGroupId).prop(
                'disabled',
                true
              );
              $('#executiveplansblock3couple' + obj.subGroupId).prop(
                'disabled',
                true
              );
              $('#executiveplansblock3family' + obj.subGroupId).prop(
                'disabled',
                true
              );
            }

            if (
              this.plansresblack3[obj.packageIndex]['groups'][obj.groupIndex][
                'subGroups'
              ][obj.subgroupIndex]['name'] == 'Complete Executive Care'
            ) {


              $('#executiveplansblock3single' + obj.subGroupId).prop(
                'checked',
                false
              );
              $('#executiveplansblock3couple' + obj.subGroupId).prop(
                'checked',
                false
              );
              $('#executiveplansblock3family' + obj.subGroupId).prop(
                'checked',
                false
              );
              $('#executiveplansblock3single' + obj.subGroupId).prop(
                'disabled',
                true
              );
              $('#executiveplansblock3couple' + obj.subGroupId).prop(
                'disabled',
                true
              );
              $('#executiveplansblock3family' + obj.subGroupId).prop(
                'disabled',
                true
              );
            }
          }
        // }
      } else {
        return;
      }

      var newselectedplans: any = {};
      for (var i = 0; i < summaryBlock3.length; i++) {
        newselectedplans[summaryBlock3[i].subGroupId] = i;
      }

      sessionStorage.setItem('selectedPlans', JSON.stringify(newselectedplans));

      this.planssummarymain = [];
      this.planssummaryopt = [];

      summaryBlock3.forEach((element: any) => {
        if (element.packagename != 'Opt-in') {
          this.planssummarymain.push(element);
        } else {
          this.planssummaryopt.push(element);
        }
      });

      // let el1: HTMLElement = this.employeepurchasefalse.nativeElement;
      // el1.click();

      sessionStorage.setItem(
        'summaryBlock3main',
        JSON.stringify(this.planssummarymain)
      );
      sessionStorage.setItem(
        'summaryBlock3opt',
        JSON.stringify(this.planssummaryopt)
      );

      sessionStorage.setItem('summaryBlock3', JSON.stringify(summaryBlock3));
    }
  }


  public selectplanblock2(
    elementcv: any,
    packname: any,
    grpname: any,
    subgrpname: any,
    packageindex: number,
    groupindex: number,
    subgroupindex: number
  ) {
    let plandetails = elementcv.attributes.data.value;

    let plandetailsobj = plandetails.split('##');

    // console.log(plandetailsobj)

    let obj = {
      packageid: plandetailsobj[2],
      parentId: plandetailsobj[3],
      subGroupId: plandetailsobj[4],
      orderId: plandetailsobj[8],
      packagename: packname,
      groupname: grpname,
      subGrpname: subgrpname,
      tiers: [],
      packageindex: packageindex,
      groupindex: groupindex,
      subgroupindex: subgroupindex,
      coverage:''
    };

    // console.log(obj)

    this.addtosummaryBlock2(obj);
  }

  public addtosummaryBlock2(obj: any) {
    let summaryBlock2 = JSON.parse(
      sessionStorage.getItem('summaryBlock2') || '[]'
    );
    let summaryBlock3 = JSON.parse(
      sessionStorage.getItem('summaryBlock3') || '[]'
    );
    let selectedBlock2 = JSON.parse(
      sessionStorage.getItem('selectedBlock2') || '{}'
    );

    let mainresults = JSON.parse(
      sessionStorage.getItem('mainresults') || '{}'
    );

    this.addtoslectplansblock2(obj.subGroupId, summaryBlock2.length);
    summaryBlock2.push(obj);

    this.planssummarymain = [];
    this.planssummaryopt = [];

    summaryBlock2.forEach((element: any) => {
      if (element.packagename != 'Opt-in') {
        this.planssummarymain.push(element);
      } else {
        this.planssummaryopt.push(element);
      }

      if (!this.packagePlanLevelTiers[element.packagename]) {
        this.packagePlanLevelTiers[element.packagename] = [];
      }
      const exists =
        this.packagePlanLevelTiers[element.packagename].findIndex(
          (item) => item.subGroupId === element.subGroupId
        ) > -1;
      if (exists) {
        console.log('check');
      } else {
        this.packagePlanLevelTiers[element.packagename].push(element);
      }
    });

    if (selectedBlock2[obj.packageid]) {
      if (selectedBlock2[obj.packageid][obj.parentId]) {
        // console.log(selectedBlock2[obj.packageid][obj.parentId])
      } else {
        // console.log("firstelse")
        selectedBlock2[obj.packageid][obj.parentId] = [];
      }
    } else {
      // console.log("secondelse")
      selectedBlock2[obj.packageid] = {};
      selectedBlock2[obj.packageid][obj.parentId] = [];
    }

    //now push
    var selectedPlanLevel = { id: obj.subGroupId, order: obj.orderId };
    selectedBlock2[obj.packageid][obj.parentId].push(selectedPlanLevel);

    let subGroupIdindex;

    if (summaryBlock3 && summaryBlock3.length > 0) {
      for (let i = 0; i < summaryBlock3.length; i++) {
        if (summaryBlock3[i].subGroupId == obj.subGroupId) {
          subGroupIdindex = i;

          break;
        }
      }

      if (subGroupIdindex > -1) {
        summaryBlock3.splice(subGroupIdindex, 1);
      } else {
        console.log('check1');
      }
    }

    let selectedplansblock3;
    setTimeout(() => {
      sessionStorage.setItem('summaryBlock3', JSON.stringify(summaryBlock3));

    }, 50);
    setTimeout(() => {
       selectedplansblock3 = JSON.parse(
        sessionStorage.getItem('summaryBlock3') || '[]'
      );
    }, 100);




    // let el: HTMLElement = this.employeepurchasefalse.nativeElement;
    // el.click();

    // sessionStorage.setItem('selectedBlock2', JSON.stringify(selectedBlock2));
    sessionStorage.setItem(
      'summaryBlock2main',
      JSON.stringify(this.planssummarymain)
    );
    sessionStorage.setItem(
      'summaryBlock2opt',
      JSON.stringify(this.planssummaryopt)
    );

    sessionStorage.setItem('summaryBlock2', JSON.stringify(summaryBlock2));



    this.selectedplansblock1 = JSON.parse(
      sessionStorage.getItem('summaryBlock2') || '[]'
    );
// this.plansresblack2--mainresults
    mainresults[obj.packageindex]['groups'][obj.groupindex][
      'subGroups'
    ][obj.subgroupindex]['checked'] = true;

    if (
      mainresults[obj.packageindex]['groups'][obj.groupindex][
        'subGroups'
      ][obj.subgroupindex]['name'] == 'Executive Health'
    ) {
      $('#executiveplansblock2single' + obj.subGroupId).prop('disabled', false);
      $('#executiveplansblock2couple' + obj.subGroupId).prop('disabled', false);
      $('#executiveplansblock2family' + obj.subGroupId).prop('disabled', false);

      $('#executiveplansblock2single' + obj.subGroupId).click()
      $('#executiveplansblock2couple' + obj.subGroupId).click()
      $('#executiveplansblock2family' + obj.subGroupId).click()
    }
    if (
      mainresults[obj.packageindex]['groups'][obj.groupindex][
        'subGroups'
      ][obj.subgroupindex]['name'] == 'Complete Executive Care'
    ) {
      $('#executiveplansblock2single' + obj.subGroupId).prop('disabled', false);
      $('#executiveplansblock2couple' + obj.subGroupId).prop('disabled', false);
      $('#executiveplansblock2family' + obj.subGroupId).prop('disabled', false);
      $('#executiveplansblock2single' + obj.subGroupId).click()
      $('#executiveplansblock2couple' + obj.subGroupId).click()
      $('#executiveplansblock2family' + obj.subGroupId).click()
    }

     if (this.employeeplanpurchase == true) {
      // let el: HTMLElement = this.employeepurchasefalse.nativeElement;
      // el.click();
      setTimeout(() => {
        let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
        el1.click();
        setTimeout(() => {
          const dom: HTMLElement = this.elementRef.nativeElement;

          if (selectedplansblock3.length > 0) {
            let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
            el1.click();
            this.employeeplanpurchase == true;
            setTimeout(() => {
              for (let i = 0; i < selectedplansblock3.length; i++) {
                const element2: any = dom.querySelector(
                  '#plancheck3' + selectedplansblock3[i].subGroupId
                );
                // element2.checked = true;
                $("#plancheck3" + selectedplansblock3[i].subGroupId).prop("checked", true);

              }
            }, 1500);
          }
        }, 1000);
      }, 100);
    }

    sessionStorage.setItem('mainresults', JSON.stringify(mainresults));

    this.plansNewBlock2 = JSON.parse(
      sessionStorage.getItem('block2result') || '[]'
    );

    var res = JSON.parse(sessionStorage.getItem('block2result') || '[]');

    this.plansNewBlock2.map((packagelevel: any, index: any) => {

if(!packagelevel){

}
else{
      packagelevel.groups.map((groups: any, index1: any) => {
        this.selectedplansblock1.map((selectplan: any) => {
          if (
            packagelevel.id == selectplan.packageid &&
            packagelevel.groups.id == selectplan.parentid
          ) {

            if (
              !this.plansNewBlock2[index] ||
              !this.plansNewBlock2[index]['groups'] ||
              !this.plansNewBlock2[index]['groups'][index1] ||
              !this.plansNewBlock2[index]['groups'][index1]['subGroups']
            ) {
            }
            else{

              console.log("!")
            var allAvailble =
              this.plansNewBlock2[index]['groups'][index1]['subGroups'];

              console.log(allAvailble)

            allAvailble.map((element1: any, index2: any) => {
              if (element1 != null) {
                if (element1.disallowedPlanLevels) {
                  if (element1.id == selectplan.subGroupId) {

                    console.log("check here data")
                    res.map((res1: any, index4: any) => {

                      if(!res[index4]||!res[index4]['groups'][index]){

                      }
                      else{
                      res1.groups.map((groups1: any, index5: any) => {
                        console.log(groups1)
                        groups1.subGroups.forEach(
                          (subgrp: any, index6: any) => {
                            console.log(element1.disallowedPlanLevels);
                            if (
                              element1.disallowedPlanLevels.indexOf(
                                groups1.id
                              ) > -1
                            ) {

                              if (
                                !this.plansresblack2[index4] ||
                                !this.plansresblack2[index4]['groups'] ||
                                !this.plansresblack2[index4]['groups'][index5] ||
                                !this.plansresblack2[index4]['groups'][index5]['subGroups']
                              ) {
                              }
                              else{
                                console.log(this.plansresblack2)
                                // this.plansresblack2[index4]['groups'][index5][
                                //   'subGroups'
                                // ][index6]['tiers'] = [];
                                // this.plansresblack2[index4]['groups'][index5][
                                //   'subGroups'
                                // ][index6]['checked'] = false;

                                res[index4]['groups'][index5]['subGroups'][
                                  index6
                                ] = null;
                              }


                            }
                          }
                        );
                      });
                    }
                    });
                  }
                }
              }
            });
          }
          }
        });
      });
    }

    });
    // this.plansNewBlock2.forEach((packagelevel: any, index: any) => {
    //   packagelevel.groups.forEach((groups: any, index1: any) => {
    //     this.selectedplansblock1.forEach((selectplan: any) => {
    //       if (
    //         packagelevel.id == selectplan.packageid &&
    //         packagelevel.groups.id == selectplan.parentid
    //       ) {

    //         if (
    //           !this.plansNewBlock2[index]['groups'] || !this.plansNewBlock2[index]['groups'][index1] || !this.plansNewBlock2[index]['groups'][index1]['subGroups']

    //         ) {
    //         }

    //         else{
    //           var allAvailble = this.plansNewBlock2[index]['groups'][index1]['subGroups'];

    //         console.log(allAvailble);

    //         // allAvailble.forEach((element1: any, index2: any) => {
    //         //   if (element1 != null) {
    //         //     if (element1.disallowedPlanLevels) {
    //         //       if (element1.id == selectplan.subGroupId) {
    //         //         res.forEach((res1: any, index4: any) => {

    //         //           if( res1.groups !=null){

    //         //           res1.groups.forEach((groups1: any, index5: any) => {
    //         //             console.log(groups1)

    //         //             groups1.subGroups.forEach(
    //         //               (subgrp: any, index6: any) => {
    //         //                 console.log(element1.disallowedPlanLevels);
    //         //                 if (
    //         //                   element1.disallowedPlanLevels.indexOf(
    //         //                     groups1.id
    //         //                   ) > 0
    //         //                 ) {
    //         //                   res[index4]['groups'][index5]['subGroups'][
    //         //                     index6
    //         //                   ] = null;
    //         //                 }
    //         //               }
    //         //             );

    //         //           });
    //         //         }
    //         //         });
    //         //       }
    //         //     }
    //         //   }
    //         // });
    //         }

    //       }
    //     });
    //   });
    // });
    console.log(res)
  sessionStorage.setItem('block2result', JSON.stringify(res));
  }

  public addtoslectplansblock2(planid: number, plansumamryindex: number) {
    let selectedPlans = JSON.parse(
      sessionStorage.getItem('selectedPlans') || '{}'
    );
    //console.log(selectedPlans)
    selectedPlans[planid] = plansumamryindex;

    sessionStorage.setItem('selectedPlans', JSON.stringify(selectedPlans));
  }

  public unselectplanblock2(
    elementcv: any,
    packname: any,
    grpname: any,
    subgrpname: any,
    packageindex: number,
    groupindex: number,
    subgroupindex: number,
    packageIndex: number,
    groupIndex: number,
    subgroupIndex: number
  ) {
    let plandetails = elementcv.attributes.data.value;

    let plandetailsobj = plandetails.split('##');

    // console.log(plandetailsobj)

    let obj = {
      packageid: plandetailsobj[2],
      parentId: plandetailsobj[3],
      subGroupId: plandetailsobj[4],
      orderId: plandetailsobj[8],
      packagename: packname,
      groupname: grpname,
      subGrpname: subgrpname,
      tiers: [],
      packageindex: packageindex,
      groupindex: groupindex,
      subgroupindex: subgroupindex,
      packageIndex: packageIndex,
      groupIndex: groupIndex,
      subgroupIndex: subgroupIndex,
    };

    // if(obj.parentId =='15'){
    //   this.block2coverage =true
    // }

    if (plandetailsobj[1] != null || plandetailsobj[1] != 'null') {
      if (plandetailsobj[1].includes(plandetailsobj[2])) {
      }
    }

    this.removesummaryBlock2(obj);
  }


  public removesummaryBlock2(obj: any) {
    console.log(obj);

    let summaryBlock2 = JSON.parse(
      sessionStorage.getItem('summaryBlock2') || '[]'
    );
    let selectedBlock2 = JSON.parse(
      sessionStorage.getItem('selectedBlock2') || '{}'
    );
    let mainresults = JSON.parse(
      sessionStorage.getItem('mainresults') || '{}'
    );
    // console.log(summaryBlock2)

    // if (selectedBlock2[obj.packageid]) {
    //   if (selectedBlock2[obj.packageid][obj.parentId]) {
    //     delete selectedBlock2[obj.packageid][obj.parentId];

    //     // console.log(selectedBlock2[obj.packageid][obj.parentId])
    //   } else {
    //     // console.log("firstelse")
    //     selectedBlock2[obj.packageid][obj.parentId] = [];
    //   }
    // }

    // else {
    //   // console.log("secondelse")
    //   selectedBlock2[obj.packageid] = {};
    //   selectedBlock2[obj.packageid][obj.parentId] = [];
    // }

    if (summaryBlock2 && summaryBlock2.length>0) {

      console.log("TestHere")
      let index = this.getslectedplansblock2(obj.subGroupId);

      console.log(index)

      if (index > -1) {
        console.log(obj);
        summaryBlock2.splice(index, 1);

        // if (!this.packagePlanLevelTiers[obj.packagename]) {
        //   this.packagePlanLevelTiers[obj.packagename] = [];
        // }

        // this.packagePlanLevelTiers[obj.packagename].splice(obj, 1);

        // sessionStorage.setItem(
        //   'packagePlanLevelTiers',
        //   JSON.stringify(this.packagePlanLevelTiers) || '[]'
        // );


        console.log(obj.packageIndex);
        console.log(obj.groupIndex);
        console.log(this.plansresblack2);

        // this.plansresblack2 = JSON.parse(sessionStorage.getItem('block2result') || '[]');

        if (obj.packageIndex && obj.groupIndex && obj.subgroupIndex) {
          mainresults[obj.packageIndex]['groups'][obj.groupIndex][
            'subGroups'
          ][obj.subgroupIndex]['tiers'] = [];
          mainresults[obj.packageIndex]['groups'][obj.groupIndex][
            'subGroups'
          ][obj.subgroupIndex]['checked'] = false;

          if (
            mainresults[obj.packageIndex]['groups'][obj.groupIndex][
              'subGroups'
            ][obj.subgroupIndex]['name'] == 'Executive Health'
          ) {




            $('#executiveplansblock2single' + obj.subGroupId).prop(
              'checked',
              false
            );
            $('#executiveplansblock2couple' + obj.subGroupId).prop(
              'checked',
              false
            );
            $('#executiveplansblock2family' + obj.subGroupId).prop(
              'checked',
              false
            );
            $('#executiveplansblock2single' + obj.subGroupId).prop(
              'disabled',
              true
            );
            $('#executiveplansblock2couple' + obj.subGroupId).prop(
              'disabled',
              true
            );
            $('#executiveplansblock2family' + obj.subGroupId).prop(
              'disabled',
              true
            );
            let summaryBlock1 = JSON.parse(
              sessionStorage.getItem('summaryBlock1') || '[]'
            );


            sessionStorage.setItem('block2result', JSON.stringify(this.plansresblack2));

          }

          if (
            mainresults[obj.packageIndex]['groups'][obj.groupIndex][
              'subGroups'
            ][obj.subgroupIndex]['name'] == 'Complete Executive Care'
          ) {
            // this.plansresblack2[obj.packageIndex]['groups'][obj.groupIndex][
            //   'subGroups'
            // ][obj.subgroupIndex]['coverage'] = 'default';




            $('#executiveplansblock2single' + obj.subGroupId).prop(
              'checked',
              false
            );
            $('#executiveplansblock2couple' + obj.subGroupId).prop(
              'checked',
              false
            );
            $('#executiveplansblock2family' + obj.subGroupId).prop(
              'checked',
              false
            );
            $('#executiveplansblock2single' + obj.subGroupId).prop(
              'disabled',
              true
            );
            $('#executiveplansblock2couple' + obj.subGroupId).prop(
              'disabled',
              true
            );
            $('#executiveplansblock2family' + obj.subGroupId).prop(
              'disabled',
              true
            );
            sessionStorage.setItem('block2result', JSON.stringify(this.plansresblack2));

          }
        }

        sessionStorage.setItem(
          'mainresults',
          JSON.stringify(mainresults)
        );
      } else {
        return;
      }

      var newselectedplans: any = {};
      for (var i = 0; i < summaryBlock2.length; i++) {
        newselectedplans[summaryBlock2[i].subGroupId] = i;
      }

      sessionStorage.setItem('selectedPlans', JSON.stringify(newselectedplans));

      this.planssummarymain = [];
      this.planssummaryopt = [];

      summaryBlock2.forEach((element: any) => {
        if (element.packagename != 'Opt-in') {
          this.planssummarymain.push(element);
        } else {
          this.planssummaryopt.push(element);
        }
      });

      let selectedplansblock2 = JSON.parse(
        sessionStorage.getItem('summaryBlock2') || '[]'
      );
      let selectedplansblock3 = JSON.parse(
        sessionStorage.getItem('summaryBlock3') || '[]'
      );


      console.log(this.employeeplanpurchase)
      if (this.employeeplanpurchase == true) {

        // console.log("1")
        // let el: HTMLElement = this.employeepurchasefalse.nativeElement;
        // el.click();
        setTimeout(() => {
          let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
          el1.click();
          setTimeout(() => {
            const dom: HTMLElement = this.elementRef.nativeElement;
            if (selectedplansblock3.length > 0) {
              let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
              el1.click();
              this.employeeplanpurchase == true;
              setTimeout(() => {
                for (let i = 0; i < selectedplansblock3.length; i++) {
                  const element2: any = dom.querySelector(
                    '#plancheck3' + selectedplansblock3[i].subGroupId
                  );
                  // element2.checked = true;
                  // element2.click()
                  element2.prop('checked',true);
                }
              }, 1500);
            }
          }, 1000);
        }, 100);
      }

      sessionStorage.setItem(
        'summaryBlock2main',
        JSON.stringify(this.planssummarymain)
      );
      sessionStorage.setItem(
        'summaryBlock2opt',
        JSON.stringify(this.planssummaryopt)
      );

      sessionStorage.setItem('summaryBlock2', JSON.stringify(summaryBlock2));
    }
    this.plansNewBlock2 = JSON.parse(
      sessionStorage.getItem('block2result') || '[]'
    );

    var res = JSON.parse(sessionStorage.getItem('planResults') || '[]');

    this.plansNewBlock2.map((packagelevel: any, index: any) => {
      if(!packagelevel){

      }
      else{
      packagelevel.groups.map((groups: any, index1: any) => {
        this.selectedplansblock1.map((selectplan: any) => {
          if (
            packagelevel.id == selectplan.packageid &&
            packagelevel.groups.id == selectplan.parentid
          ) {


            if (
              !this.plansNewBlock2[index] ||
              !this.plansNewBlock2[index]['groups'] ||
              !this.plansNewBlock2[index]['groups'][index1] ||
              !this.plansNewBlock2[index]['groups'][index1]['subGroups']
            ) {
            }
            else{
            var allAvailble =
              this.plansNewBlock2[index]['groups'][index1]['subGroups'];

            allAvailble.map((element1: any, index2: any) => {
              if (element1 != null) {

                console.log(element1.disallowedPlanLevels)
                if (element1.disallowedPlanLevels) {
                  console.log(element1.id)
                  console.log(obj.subGroupId)
                  if (element1.id == obj.subGroupId) {

                    console.log(element1.id)
                    console.log(obj.subGroupId)
                    res.map((res1: any, index4: any) => {
                      if(!res[index4]||!res[index4]['groups'][index]){

                      }else{
                      res1.groups.map((groups1: any, index5: any) => {
                        // console.log(groups1)
                        groups1.subGroups.forEach(
                          (subgrp: any, index6: any) => {
                            console.log(subgrp);
                            if (
                              element1.disallowedPlanLevels.indexOf(
                                groups1.id
                              ) > -1
                            ) {
                              if (
                                !this.plansresblack2[index4] ||
                                !this.plansresblack2[index4]['groups'] ||
                                !this.plansresblack2[index4]['groups'][index5] ||
                                !this.plansresblack2[index4]['groups'][index5]['subGroups']
                              ) {
                              }
                              else{
                              // this.plansresblack2[index4]['groups'][index5][
                              //   'subGroups'
                              // ][index6]['tiers'] = [];
                              // this.plansresblack2[index4]['groups'][index5][
                              //   'subGroups'
                              // ][index6]['checked'] = false;

                              res[index4]['groups'][index5]['subGroups'][
                                index6
                              ] = subgrp;
                            }
                            }
                          }
                        );
                      });
                    }
                    });
                    sessionStorage.setItem('block2result', JSON.stringify(this.plansresblack2));

                  }
                }
              }
            });
          }
          }
        });
      });
    }
    });
  }

  public getslectedplansblock1(planid: number) {
    //console.log(planid)
    // let selectedPlans = JSON.parse(
    //   sessionStorage.getItem('selectedPlans') || '{}'
    // );
    // // console.log(selectedPlans)
    // return selectedPlans[planid];


    console.log(planid)
    let summaryBlock1 = JSON.parse(
      sessionStorage.getItem('summaryBlock1') || '{}'
    );
    let subGroupIdindex;
    for (let i = 0; i < summaryBlock1.length; i++) {
      console.log(summaryBlock1[i].subGroupId)
      console.log(planid)
      if (summaryBlock1[i].subGroupId == planid) {
        subGroupIdindex = i;
        break;
      }
    }

    return subGroupIdindex;
  }

  public getslectedplansblock2(planid: number) {
    //console.log(planid)
    // let selectedPlans = JSON.parse(
    //   sessionStorage.getItem('selectedPlans') || '{}'
    // );
    // // console.log(selectedPlans)
    // return selectedPlans[planid];


    console.log(planid)
    let summaryBlock2 = JSON.parse(
      sessionStorage.getItem('summaryBlock2') || '{}'
    );
    let subGroupIdindex;
    for (let i = 0; i < summaryBlock2.length; i++) {
      console.log(summaryBlock2[i].subGroupId)
      console.log(planid)
      if (summaryBlock2[i].subGroupId == planid) {
        subGroupIdindex = i;
        break;
      }
    }

    return subGroupIdindex;
  }
  public getslectedplansblock3(planid: number) {
    //console.log(planid)
    // let selectedPlans = JSON.parse(
    //   sessionStorage.getItem('selectedPlans') || '{}'
    // );
    // // console.log(selectedPlans)
    // return selectedPlans[planid];


    console.log(planid)
    let summaryBlock3 = JSON.parse(
      sessionStorage.getItem('summaryBlock3') || '{}'
    );
    let subGroupIdindex;
    for (let i = 0; i < summaryBlock3.length; i++) {
      console.log(summaryBlock3[i].subGroupId)
      console.log(planid)
      if (summaryBlock3[i].subGroupId == planid) {
        subGroupIdindex = i;
        break;
      }
    }

    return subGroupIdindex;
  }
  public getslectedblockplans(obj: any) {
    //console.log(planid)
    let selectedPlans = JSON.parse(
      sessionStorage.getItem('selectedBlock1') || '{}'
    );

    if (selectedPlans[obj.packageid]) {
      if (selectedPlans[obj.packageid][obj.parentId]) {
        var res = selectedPlans[obj.packageid][obj.parentId];

        res.forEach((element: any, index: any) => {
          if ((element.id = obj.subGroupId && element.order == obj.orderId)) {
            return selectedPlans[index];
          }
        });
      } else {
        // console.log("firstelse")
        selectedPlans[obj.packageid][obj.parentId] = [];
      }
    }
  }

  checkPaymentInfo(e: any) {
    if (e.target.value == 'pad') {
      this.bankDetails = false;
    } else {
      this.bankDetails = false;
    }
  }

  public provincelist(event: any) {
    // alert(event.target.value)

    this.configprovinceres.forEach((element: any) => {
      if (element.shortName == event.target.value) {
        this.provincialHealthcareUrl = element.provincialHealthcareUrl;
        this.provincialZipcodes = element.zipcodes.split(',');
        this.provincelistid = element.id;
        this.state_id = parseInt(element.fusebillId);
        this.statename = element.name;
      }
    });

    if (this.clientregform.value.postalCode) {
      if (
        this.provincialZipcodes.indexOf(
          this.clientregform.value.postalCode[0]
        ) == -1
      ) {
        this.invalidpostalcodeprivince = true;

        this.client['postalCode'].markAsTouched();
        this.client['postalCode'].updateValueAndValidity();
      } else {
        this.invalidpostalcodeprivince = false;
        // console.log("test1")
      }

      if (this.clientregform.value.postalCode.length == 0) {
        this.invalidpostalcodeprivince = false;
        // console.log("test11")
      }
    }
  }
  public getprovincelist(event: any) {
    if (event.target.value.toLowerCase() == 'canada') {
      this.postalCodeDisplay = 'Postal Code';
      this.provianceDispaly = 'Province';
      this.selectedCountry = 'Canada';
      this.clientregform.get('postalCode').setValidators([postalcodeValidator]);
      this.clientregform.get('postalCode').updateValueAndValidity();
      this.clientregform
        .get('multiSelectProviance')
        .setValidators([Validators.required]);
      this.clientregform.get('multiSelectProviance').updateValueAndValidity();
      this.isCountrySelected = true;
    } else {
      this.postalCodeDisplay = 'Zip Code';
      this.provianceDispaly = 'State';
      this.selectedCountry = 'USA';
      this.clientregform.get('postalCode').reset();
      this.clientregform.get('postalCode').clearValidators();
      this.clientregform.get('postalCode').updateValueAndValidity();
      this.invalidpostalcodeprivince = false;
      this.clientregform.get('multiSelectProviance').clearValidators();
      this.clientregform.get('multiSelectProviance').updateValueAndValidity();
      this.multiSelectProviance = [];
      this.isCountrySelected = true;
    }

    this.countryList.forEach((element: any) => {
      if (element.name == event.target.value) {
        this.configprovincereslist = element.countryStates;
        this.configprovincereslist = this.configprovincereslist.sort(
          (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
        );
      }
    });
  }
  public getprovincelist1(event: any) {
    // alert("!")

    this.countryList.forEach((element: any) => {
      if (element.name == event) {
        this.configprovincereslist = element.countryStates;
        this.configprovincereslist = this.configprovincereslist.sort(
          (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
        );
      }
    });
  }
  changeTextToUppercase(field: any, event: any) {
    if (this.selectedCountry == 'USA') {
      return false;
    } else {
      console.log(field);
      const obj = {};
      // obj[field] = this.clientregform.controls[field].value.toUpperCase();
      // this.clientregform.patchValue(obj);

      this.postalvalue = event.target.value;

      console.log(this.postalvalue);

      if (this.provincialZipcodes.indexOf(this.postalvalue[0]) == -1) {
        // console.log("r")
        this.invalidpostalcodeprivince = true;
        this.client['postalCode'].markAsTouched();
      } else {
        this.invalidpostalcodeprivince = false;
      }

      if (this.postalvalue.length == 0) {
        this.invalidpostalcodeprivince = false;
      }

      console.log(this.invalidpostalcodeprivince);

      //  postalcodeValidator1(this.invalidpostalcodeprivince )
    }
  }

  addRow() {
    this.basicTiersCount++;
    this.dynamicArray.push({
      sno: '',
      tierName: this.capitalize(''),
      walletAmount: '$',
    });
    // console.log('New row added successfully', 'New Row')
  }
  deleteRowBlock1(index: number, dynamic: any) {
    this.defaulttiers = [];
    if (this.dynamicArray.length == 1) {
      Swal.fire({
        title: 'Warning',
        text: "Can't delete the row when there is only one row",
      });
      return false;
    } else {
      if (dynamic.id && dynamic.id > 0) {
        this.defaulttiers.push(dynamic.id);
        let requestBody = {
          default: this.defaulttiers,
          lengthOfService: [],
          annualIncome: [],
        };

        var corporateId = sessionStorage.getItem('corporateId');

        var DeleteTiers =
          '/api/ap/admin/corporate/' + corporateId + '/deleteTiers';
        var accessToken = sessionStorage.getItem('accessToken');
        this.http
          .post(environment.apiUrl + DeleteTiers, requestBody, {
            headers: {
              Authorization: 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            },
          })
          .subscribe(
            (response: any) => {
              if (response.status == '200') {
                Swal.fire({
                  title: 'Success',
                  text: response.message,
                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: 'Ok',
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.configuretiers();
                  }
                });
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
                  } else {
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
      } else {
        this.dynamicArray.splice(index, 1);
      }
    }
  }
  deleteRowBlock2(index: number, dynamic: any) {
    this.defaulttiers = [];
    if (this.dynamicArray.length == 1) {
      Swal.fire({
        title: 'Warning',
        text: "Can't delete the row when there is only one row",
      });
      return false;
    } else {
      if (dynamic.id && dynamic.id > 0) {
        this.defaulttiers.push(dynamic.id);
        let requestBody = {
          default: this.defaulttiers,
          lengthOfService: [],
          annualIncome: [],
        };

        var corporateId = sessionStorage.getItem('corporateId');

        var DeleteTiers =
          '/api/ap/admin/corporate/' + corporateId + '/deleteTiers';
        var accessToken = sessionStorage.getItem('accessToken');
        this.http
          .post(environment.apiUrl + DeleteTiers, requestBody, {
            headers: {
              Authorization: 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            },
          })
          .subscribe(
            (response: any) => {
              if (response.status == '200') {
                Swal.fire({
                  title: 'Success',
                  text: response.message,
                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: 'Ok',
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.configuretiers();
                  }
                });
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
                  } else {
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
      } else {
        this.dynamicArray.splice(index, 1);
      }
    }
  }
  deleteRowBlock3(index: number, dynamic: any) {
    this.defaulttiers = [];
    if (this.dynamicArray.length == 1) {
      Swal.fire({
        title: 'Warning',
        text: "Can't delete the row when there is only one row",
      });
      return false;
    } else {
      if (dynamic.id && dynamic.id > 0) {
        this.defaulttiers.push(dynamic.id);
        let requestBody = {
          default: this.defaulttiers,
          lengthOfService: [],
          annualIncome: [],
        };

        var corporateId = sessionStorage.getItem('corporateId');

        var DeleteTiers =
          '/api/ap/admin/corporate/' + corporateId + '/deleteTiers';
        var accessToken = sessionStorage.getItem('accessToken');
        this.http
          .post(environment.apiUrl + DeleteTiers, requestBody, {
            headers: {
              Authorization: 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            },
          })
          .subscribe(
            (response: any) => {
              if (response.status == '200') {
                Swal.fire({
                  title: 'Success',
                  text: response.message,
                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: 'Ok',
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.configuretiers();
                  }
                });
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
                  } else {
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
      } else {
        this.dynamicArray.splice(index, 1);
      }
    }
  }
  deleteRow(index: number) {
    return false;
    if (this.dynamicArray.length == 1) {
      Swal.fire({
        title: 'Warning',
        text: "Can't delete the row when there is only one row",
      });
      return false;
    } else {
      // if(dynamic.id  && dynamic.id>0){

      this.defaulttiers.push(1119);
      let requestBody = {
        default: this.defaulttiers,
        lengthOfService: [],
        annualIncome: [],
      };

      var corporateId = sessionStorage.getItem('corporateId');

      var DeleteTiers =
        '/api/ap/admin/corporate/' + corporateId + '/deleteTiers';
      var accessToken = sessionStorage.getItem('accessToken');
      this.http
        .post(environment.apiUrl + DeleteTiers, requestBody, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response: any) => {
            if (response.status == '200') {
              Swal.fire({
                title: 'Success',
                text: response.message,
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.configuretiers();
                }
              });
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
                } else {
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

      // }

      // else{
      //   // this.dynamicArray.splice(index, 1);

      // }
    }
  }
  addRowService() {
    this.serviceCount++;
    this.dynamicArrayService.push({
      sno: '',
      tierName: '',
      from: '',
      to: '',
      period: '',
      walletAmount: '$',
    });
    // console.log('New row added successfully', 'New Row')
  }
  deleteRowService(index: number) {
    this.dynamicArrayService.splice(index, 1);
    // this.serviceCount--
  }
  deleteRowServiceBlock1(index: number, dynamic: any) {
    // console.log(this.dynamicArray)

    this.defaulttiers = [];

    if (dynamic.id && dynamic.id > 0) {
      console.log(dynamic.id);

      this.defaulttiers.push(dynamic.id);
      let requestBody = {
        default: [],
        lengthOfService: this.defaulttiers,
        annualIncome: [],
      };

      var corporateId = sessionStorage.getItem('corporateId');

      var DeleteTiers =
        '/api/ap/admin/corporate/' + corporateId + '/deleteTiers';
      var accessToken = sessionStorage.getItem('accessToken');
      this.http
        .post(environment.apiUrl + DeleteTiers, requestBody, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response: any) => {
            if (response.status == '200') {
              Swal.fire({
                title: 'Success',
                text: response.message,
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.configuretiers();
                }
              });
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
                } else {
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
    } else {
      this.dynamicArrayService.splice(index, 1);
    }
  }
  deleteRowServiceBlock2(index: number, dynamic: any) {
    // console.log(this.dynamicArray)

    this.defaulttiers = [];

    if (dynamic.id && dynamic.id > 0) {
      console.log(dynamic.id);

      this.defaulttiers.push(dynamic.id);
      let requestBody = {
        default: [],
        lengthOfService: this.defaulttiers,
        annualIncome: [],
      };

      var corporateId = sessionStorage.getItem('corporateId');

      var DeleteTiers =
        '/api/ap/admin/corporate/' + corporateId + '/deleteTiers';
      var accessToken = sessionStorage.getItem('accessToken');
      this.http
        .post(environment.apiUrl + DeleteTiers, requestBody, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response: any) => {
            if (response.status == '200') {
              Swal.fire({
                title: 'Success',
                text: response.message,
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.configuretiers();
                }
              });
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
                } else {
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
    } else {
      this.dynamicArrayService.splice(index, 1);
    }
  }
  deleteRowServiceBlock3(index: number, dynamic: any) {
    // console.log(this.dynamicArray)

    this.defaulttiers = [];

    if (dynamic.id && dynamic.id > 0) {
      console.log(dynamic.id);

      this.defaulttiers.push(dynamic.id);
      let requestBody = {
        default: [],
        lengthOfService: this.defaulttiers,
        annualIncome: [],
      };

      var corporateId = sessionStorage.getItem('corporateId');

      var DeleteTiers =
        '/api/ap/admin/corporate/' + corporateId + '/deleteTiers';
      var accessToken = sessionStorage.getItem('accessToken');
      this.http
        .post(environment.apiUrl + DeleteTiers, requestBody, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response: any) => {
            if (response.status == '200') {
              Swal.fire({
                title: 'Success',
                text: response.message,
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.configuretiers();
                }
              });
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
                } else {
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
    } else {
      this.dynamicArrayService.splice(index, 1);
    }
  }
  addRowAnnual() {
    this.AnnualCount++;
    this.dynamicArrayAnnualIncome.push({
      sno: '',
      tierName: '',
      percentage: '',
      from: '',
      to: '',
      walletAmount: '$',
    });
    // console.log('New row added successfully', 'New Row')
  }
  deleteRowAnnual(index: number) {
    this.dynamicArrayAnnualIncome.splice(index, 1);
  }

  deleteRowAnnualBlock1(index: number, dynamic: any) {
    this.defaulttiers = [];
    if (dynamic.id && dynamic.id > 0) {
      this.defaulttiers.push(dynamic.id);
      let requestBody = {
        default: [],
        lengthOfService: [],
        annualIncome: this.defaulttiers,
      };

      var corporateId = sessionStorage.getItem('corporateId');

      var DeleteTiers =
        '/api/ap/admin/corporate/' + corporateId + '/deleteTiers';
      var accessToken = sessionStorage.getItem('accessToken');
      this.http
        .post(environment.apiUrl + DeleteTiers, requestBody, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response: any) => {
            if (response.status == '200') {
              Swal.fire({
                title: 'Success',
                text: response.message,
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.configuretiers();
                }
              });
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
                } else {
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
    } else {
      this.dynamicArrayAnnualIncome.splice(index, 1);
    }
  }
  deleteRowAnnualBlock2(index: number, dynamic: any) {
    this.defaulttiers = [];
    if (dynamic.id && dynamic.id > 0) {
      this.defaulttiers.push(dynamic.id);
      let requestBody = {
        default: [],
        lengthOfService: [],
        annualIncome: this.defaulttiers,
      };

      var corporateId = sessionStorage.getItem('corporateId');

      var DeleteTiers =
        '/api/ap/admin/corporate/' + corporateId + '/deleteTiers';
      var accessToken = sessionStorage.getItem('accessToken');
      this.http
        .post(environment.apiUrl + DeleteTiers, requestBody, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response: any) => {
            if (response.status == '200') {
              Swal.fire({
                title: 'Success',
                text: response.message,
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.configuretiers();
                }
              });
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
                } else {
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
    } else {
      this.dynamicArrayAnnualIncome.splice(index, 1);
    }
  }
  deleteRowAnnualBlock3(index: number, dynamic: any) {
    this.defaulttiers = [];
    if (dynamic.id && dynamic.id > 0) {
      this.defaulttiers.push(dynamic.id);
      let requestBody = {
        default: [],
        lengthOfService: [],
        annualIncome: this.defaulttiers,
      };

      var corporateId = sessionStorage.getItem('corporateId');

      var DeleteTiers =
        '/api/ap/admin/corporate/' + corporateId + '/deleteTiers';
      var accessToken = sessionStorage.getItem('accessToken');
      this.http
        .post(environment.apiUrl + DeleteTiers, requestBody, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response: any) => {
            if (response.status == '200') {
              Swal.fire({
                title: 'Success',
                text: response.message,
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.configuretiers();
                }
              });
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
                } else {
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
    } else {
      this.dynamicArrayAnnualIncome.splice(index, 1);
    }
  }
  public ngAfterViewInit(): void {
    // this.createChartGauge();
  }

  get client() {
    return this.clientregform.controls;
  }

  assignAllplanLvelwithdisallowed(plans: any) {
    this.disallowedplans = {};

    plans.forEach((packagelevel: any, index: number) => {
      packagelevel.groups.forEach((groups: any, index1: number) => {
        groups.subGroups.forEach((planlevel: any, index2: number) => {
          console.log(planlevel.id);
          console.log(planlevel.disallowedPlanLevels);

          if (planlevel.disallowedPlanLevels) {
            this.disallowedplans[planlevel.id] =
              planlevel.disallowedPlanLevels.split(',');
          }
        });
      });
    });
  }
  assignAllplanLvelwithdisallowedTiers(plans: any) {
    this.disallowedplansTiers = {};

    plans.forEach((packagelevel: any, index: number) => {
      packagelevel.groups.forEach((groups: any, index1: number) => {
        groups.subGroups.forEach((planlevel: any, index2: number) => {
          console.log(planlevel.id);
          console.log(planlevel.disallowedPlanLevels);

          if (planlevel.disallowedPlanLevels) {
            this.disallowedplansTiers[planlevel.id] =
              planlevel.disallowedPlanLevels.split(',');
          }
        });
      });
    });
  }
  public capitalize(str: any) {
    // if (str) {
    //   return str.charAt(0).toUpperCase() + str.slice(1);
    // }

    if (str) {
      return str.replace(/(?:^|\s)\S/g, function (match) {
        return match.toUpperCase();
      });
    }
  }

  public dummyData() {
    this.showtierbasicplans = true;
    if (this.clientregform.value.tierConfig == true) {
      this.showemptytierconfig = true;
    } else {
      this.showemptytierconfig = false;
    }
    if (this.clientregform.value.walletConfig == false) {
      this.showemptywalletConfig = false;
    } else {
      this.showemptywalletConfig = true;
    }

    // this.headerComponent.headerDetails('login');
    this.basicInfo = false;
    this.plansInfo = true;

    this.plansBlock1 = [
      {
        description: 'Health & Dental Insurance',
        id: 1,
        logo: null,
        name: 'Health & Dental Insurance',
        published: true,
        ordering: 1,
        allowMultiple: false,
        applyFilters: true,
        optIn: false,
        groups: [
          {
            id: 1,
            name: 'Classic',
            subGroups: [
              {
                backgroundColor: '#b08d57',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 3,
                level: 2,
                name: 'Classic Bronze',
                ordering: 4,
                parentId: 1,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
              {
                backgroundColor: '#aaa9ad',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 4,
                level: 2,
                name: 'Classic Silver',
                ordering: 5,
                parentId: 1,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
              {
                backgroundColor: '#d4af37',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 5,
                level: 2,
                name: 'Classic Gold',
                ordering: 6,
                parentId: 1,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: 4,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
            ],
          },
          {
            id: 6,
            name: 'All-In',
            subGroups: [
              {
                backgroundColor: '#b08d57',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: '1,10,14',
                id: 7,
                level: 2,
                name: 'All-In Bronze',
                ordering: 8,
                parentId: 6,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
              {
                backgroundColor: '#aaa9ad',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: '1,10,14',
                id: 8,
                level: 2,
                name: 'All-In Silver',
                ordering: 9,
                parentId: 6,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
              {
                backgroundColor: '#d4af37',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: '1,10,14',
                id: 9,
                level: 2,
                name: 'All-In Gold',
                ordering: 10,
                parentId: 6,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
            ],
          },
        ],
      },
      {
        description: 'Opt-in plans',
        id: 8,
        logo: null,
        name: 'Opt-in',
        published: true,
        ordering: 2,
        allowMultiple: true,
        applyFilters: true,
        optIn: true,
        groups: [
          {
            id: 16,
            name: 'Opt-In',
            subGroups: [
              {
                backgroundColor: '#4e2a84',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 16,
                level: null,
                name: 'Opt-In',
                ordering: 1,
                parentId: null,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'name',
                plans: [
                  {
                    code: null,
                    corporatePlan: false,
                    cost: 0,
                    description:
                      'YES! I would like to activate PocketPills Digital Pharmacy to get the 10% coinsurance enhancement available in most GroupBenefitz Platform health plans including free shipping. Please share my information with PocketPills to activate my account.',
                    frqMonthly: null,
                    frqYearly: null,
                    fusebillId: null,
                    id: 429,
                    insuranceCompanyId: null,
                    isMonthlyCost: null,
                    logo: null,
                    maxAge: null,
                    minAge: null,
                    name: 'PocketPills Digital Pharmacy - Activate My Account',
                    ordering: 1,
                    packageId: 8,
                    planCoverage: null,
                    planLevel: 16,
                    published: {
                      type: 'Buffer',
                      data: [1],
                    },
                    package_id: 8,
                    plan_level: 16,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        description: 'Mental Health & Wellness',
        id: 2,
        logo: null,
        name: 'Mental Health & Wellbeing',
        published: true,
        ordering: 3,
        allowMultiple: false,
        applyFilters: true,
        optIn: false,
        groups: [
          {
            id: 14,
            name: 'Wellness',
            subGroups: [
              {
                backgroundColor: '#694586',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 19,
                level: 2,
                name: 'EAP 2.0',
                ordering: 18,
                parentId: 14,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'name',
              },
              {
                backgroundColor: '#694586',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 21,
                level: 2,
                name: 'Mind & Body',
                ordering: 19,
                parentId: 14,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'name',
              },
              {
                backgroundColor: '#694586',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 20,
                level: 2,
                name: 'Complete Wellness',
                ordering: 21,
                parentId: 14,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'name',
              },
            ],
          },
        ],
      },
      {
        description: 'Catastrophic Medication Insurance',
        id: 3,
        logo: null,
        name: 'Catastrophic Medication Insurance',
        published: true,
        ordering: 4,
        allowMultiple: false,
        applyFilters: true,
        optIn: false,
        groups: [
          {
            id: 24,
            name: 'Medication',
            subGroups: [
              {
                backgroundColor: '#423894',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 10,
                level: 2,
                name: 'High-Cost Drugs',
                ordering: 12,
                parentId: 24,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'name',
              },
            ],
          },
        ],
      },
      {
        description: 'Accident & Serious Illness Disability Insurance',
        id: 4,
        logo: null,
        name: 'Accident & Serious Illness Disability Insurance',
        published: true,
        ordering: 5,
        allowMultiple: false,
        applyFilters: true,
        optIn: false,
        groups: [
          {
            id: 11,
            name: 'Protect',
            subGroups: [
              {
                backgroundColor: '#354a9f',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 12,
                level: 2,
                name: 'Protect 100',
                ordering: 14,
                parentId: 11,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'name',
              },
              {
                backgroundColor: '#354a9f',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 13,
                level: 2,
                name: 'Protect 200',
                ordering: 15,
                parentId: 11,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'name',
              },
            ],
          },
        ],
      },
      {
        description:
          'Executive Benefits- Executive Health, Complete Executive Care',
        id: 5,
        logo: null,
        name: 'Executive Benefits',
        published: true,
        ordering: 6,
        allowMultiple: false,
        applyFilters: false,
        optIn: false,
        groups: [
          {
            id: 15,
            name: 'Executive',
            subGroups: [
              {
                backgroundColor: '#5e152e',
                childMaxAge: 24,
                description: null,
                disallowedPlanLevels: null,
                id: 17,
                level: 2,
                name: 'Executive Health',
                ordering: 23,
                parentId: 15,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
              {
                backgroundColor: '#5e152e',
                childMaxAge: 24,
                description: null,
                disallowedPlanLevels: null,
                id: 18,
                level: 2,
                name: 'Complete Executive Care',
                ordering: 24,
                parentId: 15,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
            ],
          },
        ],
      },
    ];

    this.plansBlock1Tiers = [
      {
        description: 'Health & Dental Insurance',
        id: 1,
        logo: null,
        name: 'Health & Dental Insurance',
        published: true,
        ordering: 1,
        allowMultiple: false,
        applyFilters: true,
        optIn: false,
        groups: [
          {
            id: 1,
            name: 'Classic',
            subGroups: [
              {
                backgroundColor: '#b08d57',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 3,
                level: 2,
                name: 'Classic Bronze',
                ordering: 4,
                parentId: 1,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
              {
                backgroundColor: '#aaa9ad',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 4,
                level: 2,
                name: 'Classic Silver',
                ordering: 5,
                parentId: 1,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
              {
                backgroundColor: '#d4af37',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 5,
                level: 2,
                name: 'Classic Gold',
                ordering: 6,
                parentId: 1,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: 4,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
            ],
          },
          {
            id: 6,
            name: 'All-In',
            subGroups: [
              {
                backgroundColor: '#b08d57',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: '1,10,14',
                id: 7,
                level: 2,
                name: 'All-In Bronze',
                ordering: 8,
                parentId: 6,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
              {
                backgroundColor: '#aaa9ad',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: '1,10,14',
                id: 8,
                level: 2,
                name: 'All-In Silver',
                ordering: 9,
                parentId: 6,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
              {
                backgroundColor: '#d4af37',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: '1,10,14',
                id: 9,
                level: 2,
                name: 'All-In Gold',
                ordering: 10,
                parentId: 6,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
            ],
          },
        ],
      },
      {
        description: 'Opt-in plans',
        id: 8,
        logo: null,
        name: 'Opt-in',
        published: true,
        ordering: 2,
        allowMultiple: true,
        applyFilters: true,
        optIn: true,
        groups: [
          {
            id: 16,
            name: 'Opt-In',
            subGroups: [
              {
                backgroundColor: '#4e2a84',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 16,
                level: null,
                name: 'Opt-In',
                ordering: 1,
                parentId: null,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'name',
                plans: [
                  {
                    code: null,
                    corporatePlan: false,
                    cost: 0,
                    description:
                      'YES! I would like to activate PocketPills Digital Pharmacy to get the 10% coinsurance enhancement available in most GroupBenefitz Platform health plans including free shipping. Please share my information with PocketPills to activate my account.',
                    frqMonthly: null,
                    frqYearly: null,
                    fusebillId: null,
                    id: 429,
                    insuranceCompanyId: null,
                    isMonthlyCost: null,
                    logo: null,
                    maxAge: null,
                    minAge: null,
                    name: 'PocketPills Digital Pharmacy - Activate My Account',
                    ordering: 1,
                    packageId: 8,
                    planCoverage: null,
                    planLevel: 16,
                    published: {
                      type: 'Buffer',
                      data: [1],
                    },
                    package_id: 8,
                    plan_level: 16,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        description: 'Mental Health & Wellness',
        id: 2,
        logo: null,
        name: 'Mental Health & Wellbeing',
        published: true,
        ordering: 3,
        allowMultiple: false,
        applyFilters: true,
        optIn: false,
        groups: [
          {
            id: 14,
            name: 'Wellness',
            subGroups: [
              {
                backgroundColor: '#694586',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 19,
                level: 2,
                name: 'EAP 2.0',
                ordering: 18,
                parentId: 14,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'name',
              },
              {
                backgroundColor: '#694586',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 21,
                level: 2,
                name: 'Mind & Body',
                ordering: 19,
                parentId: 14,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'name',
              },
              {
                backgroundColor: '#694586',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 20,
                level: 2,
                name: 'Complete Wellness',
                ordering: 21,
                parentId: 14,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'name',
              },
            ],
          },
        ],
      },
      {
        description: 'Catastrophic Medication Insurance',
        id: 3,
        logo: null,
        name: 'Catastrophic Medication Insurance',
        published: true,
        ordering: 4,
        allowMultiple: false,
        applyFilters: true,
        optIn: false,
        groups: [
          {
            id: 24,
            name: 'Medication',
            subGroups: [
              {
                backgroundColor: '#423894',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 10,
                level: 2,
                name: 'High-Cost Drugs',
                ordering: 12,
                parentId: 24,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'name',
              },
            ],
          },
        ],
      },
      {
        description: 'Accident & Serious Illness Disability Insurance',
        id: 4,
        logo: null,
        name: 'Accident & Serious Illness Disability Insurance',
        published: true,
        ordering: 5,
        allowMultiple: false,
        applyFilters: true,
        optIn: false,
        groups: [
          {
            id: 11,
            name: 'Protect',
            subGroups: [
              {
                backgroundColor: '#354a9f',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 12,
                level: 2,
                name: 'Protect 100',
                ordering: 14,
                parentId: 11,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'name',
              },
              {
                backgroundColor: '#354a9f',
                childMaxAge: 21,
                description: null,
                disallowedPlanLevels: null,
                id: 13,
                level: 2,
                name: 'Protect 200',
                ordering: 15,
                parentId: 11,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'name',
              },
            ],
          },
        ],
      },
      {
        description:
          'Executive Benefits- Executive Health, Complete Executive Care',
        id: 5,
        logo: null,
        name: 'Executive Benefits',
        published: true,
        ordering: 6,
        allowMultiple: false,
        applyFilters: false,
        optIn: false,
        groups: [
          {
            id: 15,
            name: 'Executive',
            subGroups: [
              {
                backgroundColor: '#5e152e',
                childMaxAge: 24,
                description: null,
                disallowedPlanLevels: null,
                id: 17,
                level: 2,
                name: 'Executive Health',
                ordering: 23,
                parentId: 15,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
              {
                backgroundColor: '#5e152e',
                childMaxAge: 24,
                description: null,
                disallowedPlanLevels: null,
                id: 18,
                level: 2,
                name: 'Complete Executive Care',
                ordering: 24,
                parentId: 15,
                published: {
                  type: 'Buffer',
                  data: [1],
                },
                requirePlanLevel: null,
                textColor: '#FFFFFF',
                tooltipTitle: 'plan_coverage',
              },
            ],
          },
        ],
      },
    ];

    this.plansBlock1.forEach((planlevel: any) => {
      planlevel.groups.forEach((groups: any) => {
        groups.subGroups.forEach((subgroup: any) => {
          subgroup.tiers = [];
          subgroup.checked = false;
          subgroup.coverage = ''; //default
        });
      });
    });
    this.plansBlock1Tiers.forEach((planlevel: any) => {
      this.selectedPackagePlansInfoTier[planlevel.id] = [];
      this.selectedPackagePlansInfoTiername[planlevel.id] = planlevel.name;
      this.selectedPackagePlansInfoTierBlock2[planlevel.id] = [];
      this.selectedPackagePlansInfoTiernameBlock2[planlevel.id] =
        planlevel.name;
      this.selectedPackagePlansInfoTierBlock3[planlevel.id] = [];
      this.selectedPackagePlansInfoTiernameBlock3[planlevel.id] =
        planlevel.name;

      this.selectedPackagesavailableTiers2[planlevel.id] = {};
      this.selectedPackagesassignedTiers2[planlevel.id] = {};
      this.selectedPackagesavailableTiers2Block2[planlevel.id] = {};
      this.selectedPackagesassignedTiers2Block2[planlevel.id] = {};

      this.selectedPackagesavailableTiers3[planlevel.id] = {};
      this.selectedPackagesassignedTiers3[planlevel.id] = {};
      this.selectedPackagesavailableTiers3Block3[planlevel.id] = {};
      this.selectedPackagesassignedTiers3Block3[planlevel.id] = {};
      planlevel.groups.forEach((groups: any) => {
        groups.subGroups.forEach((subgroup: any) => {
          this.selectedPackagesavailableTiers2[planlevel.id][subgroup.id] =
            null;
          this.selectedPackagesassignedTiers2[planlevel.id][subgroup.id] = [];
          this.selectedPackagesavailableTiers2Block2[planlevel.id][
            subgroup.id
          ] = null;
          this.selectedPackagesassignedTiers2Block2[planlevel.id][subgroup.id] =
            [];

          this.selectedPackagesavailableTiers3[planlevel.id][subgroup.id] =
            null;
          this.selectedPackagesassignedTiers3[planlevel.id][subgroup.id] = [];
          this.selectedPackagesavailableTiers3Block3[planlevel.id][
            subgroup.id
          ] = null;
          this.selectedPackagesassignedTiers3Block3[planlevel.id][subgroup.id] =
            [];
          subgroup.tiers = [];
          subgroup.checked = false;
          subgroup.coverage = ''; //default
        });
      });
    });

    sessionStorage.setItem('planResults', JSON.stringify(this.plansBlock1));
    sessionStorage.setItem(
      'plansBlock1Tiers',
      JSON.stringify(this.plansBlock1Tiers)
    );
    this.assignAllplanLvelwithdisallowed(this.plansBlock1);
    const dom: HTMLElement = this.elementRef.nativeElement;
    const element: any = dom.querySelector('#plancheck' + 16);
    element.click();

    setTimeout(() => {
      this.plansBlock1.forEach((element: any, index: number) => {
        if (element.id != 1) {
          const element1: any = dom.querySelector(
            '#plancheckcollapseone' + element.id
          );
          element1.click();
        } else {
          element.groups.forEach((groups: any, index1: number) => {
            const element1: any = dom.querySelector(
              '#plancheckcollapseone' + groups.id
            );
            console.log(element1);
          });
        }
      });
    }, 10);
  }

  checkCorporationExist(){
    let corporation=this.client['corporationName'].value;
    let accessToken=sessionStorage.getItem('accessToken');
    //localhost:3002/api/ap/admin/corporate/checkCorporateName'
    let endPoint=`/api/ap/admin/corporate/checkCorporateName`;
    let inputData={
      'name':corporation
    }
    this.http.post(environment.apiUrl + endPoint,inputData, {headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    }}).subscribe((response:any)=>{
      if(response.status=='200'){//new corporate
       return false;
      }
      else {//Already exist
        Swal.fire({title:'Info',text:response.message}).then((result)=>{
          if(result.isConfirmed){
            this.client['corporationName'].setValue('');
          }
        });
      }
    },(error)=>{
      Swal.fire({title:'Error',text:error.message??error.error.message})
    })
  }

  public submitbasicInfo() {
    const submitbasicInfoEnableDisable = document.getElementById("basicformSubmit1stScreen") as HTMLButtonElement;
    if (submitbasicInfoEnableDisable) {
      submitbasicInfoEnableDisable.disabled = true;
      this._LoaderService.ShowLoader();
    console.log(this.clientregform);
    let customSelectedError = false;
    this.clientregform
      .get('waitingPeriod')
      .setValue(this.clientregform.get('waitingPeriod').value ?? '');
    // if (
    //   this.customSelected &&
    //   this.clientregform.get('waitingPeriod').value == ''
    // ) {
    //   customSelectedError = true;
    // }

    // if (this.clientregform.invalid || (this.clientregform.get('waitingPeriod').value === '' && this.customSelected)) {
      if (this.clientregform.invalid) {

      console.log(JSON.stringify(this.clientregform.value, null, 2));
      this.clientregform.markAllAsTouched();
      this.scrollToFirstInvalidControl1();
      this.scrollToFirstInvalidControl1();
      setTimeout(() => {
        submitbasicInfoEnableDisable.disabled = false;
        this._LoaderService.HideLoader();
      }, 500);

    } else {
      // console.log("ok")

      var accessToken = sessionStorage.getItem('accessToken');
      var customerValidation = '/api/ap/admin/v2/corporate/customer/validation';

       sessionStorage.setItem('summaryBlock1', '[]');
      sessionStorage.setItem('walletConfig', '{}');
      sessionStorage.setItem('selectedPlans', '{}');
      sessionStorage.setItem('summaryBlock1main', '[]');
      sessionStorage.setItem('summaryBlock1opt', '[]');
      // sessionStorage.setItem('selectedBlock1', '{}');
      sessionStorage.setItem('summaryBlock2', '[]');

      sessionStorage.setItem('summaryBlock2main', '[]');
      sessionStorage.setItem('summaryBlock2opt', '[]');
      // sessionStorage.setItem('selectedBlock2', '{}');

      sessionStorage.setItem('summaryBlock3', '[]');

      sessionStorage.setItem('summaryBlock3main', '[]');
      sessionStorage.setItem('summaryBlock3opt', '[]');
      sessionStorage.setItem('selectedBlock3', '{}');
      sessionStorage.setItem(
        'requireEmployeeName',
        this.clientregform.value.ShowEmployer
      );

      // sessionStorage.setItem('planResults', JSON.stringify(this.plansBlock1));

      this.maxEmployeeCount = this.clientregform.value.expectednoofEmployees;
      var voidfileExtension = '';
      let voidcheckDetails = '';
      let logoDetails = '';

      if (this.bankDetails) {
        voidfileExtension = '.' + this.voidcheckfile.name.split('.').pop();
        (voidcheckDetails = this.voidcheckfile),
          'void_cheque_' + Date.now() + voidfileExtension.toLowerCase();
      } else {
        voidcheckDetails = '';
      }

      if (this.uploadadminlogoimg) {
        (logoDetails = this.uploadadminlogoimg),
          'Admin_logo' +
            Date.now() +
            '.' +
            this.uploadadminlogoimg.name.split('.').pop().toLowerCase();
      } else {
        logoDetails = '';
      }

      this.session = sessionStorage.getItem('session');

      var padinfo: any;
      var creditCardinfo;
      var invoicemonthy;
      if (this.clientregform.value.paymentInfo == 'pad') {
        padinfo = 'true';
      } else if (this.clientregform.value.paymentInfo == 'creditcard') {
        creditCardinfo = 'true';
      } else {
        invoicemonthy = 'true';
      }

      var formdata = new FormData();
      let shoeemp=this.clientregform.value.ShowEmployer=='true'?true:false;

      // formdata.append('corporationName',
      //   this.capitalize(this.clientregform.value.corporationName)
      // );
      formdata.append('corporationName',(this.clientregform.value.corporationName));
      formdata.append(
        'requireEmployeeName',
        this.clientregform.value.ShowEmployer
      );
// this.clientregform.value.ShowEmployer
      formdata.append('brokerType', 'CORPORATE');
      formdata.append(
        'workingProvinces',
        JSON.stringify(this.multiSelectProviance)
      );
      formdata.append('cpPlanAutoSelection',this.clientregform.value.autoSelectEmp);

      formdata.append(
        'policyStartDate',
        this.datePipe.transform(
          this.clientregform.value.PolicyStartDate,
          'yyyy-MM-dd'
        ) || '0000-00-00'
      );

      formdata.append('logo', logoDetails);

      formdata.append('fuseBillCustomerCreation', 'true');

      formdata.append('voidCheck', voidcheckDetails);

      formdata.append('gropupAdmin', JSON.stringify(this.adminData));
      let waitingPeriod;
      if(this.customSelected&&this.clientregform.value.waitingPeriod=='Custom'){
        waitingPeriod=this.clientregform.value.waitingPeriodCustom||0;

      }else{
        waitingPeriod=this.clientregform.value.waitingPeriod || 0;
      }
      formdata.append(
        'waitingPeriod',
        waitingPeriod|| 0
      );
      // formdata.append(
      //   'waitingPeriod',
      //   this.clientregform.value.waitingPeriod || 0
      // );
      formdata.append(
        'corporateEmployeesInitialSignupWaittime',
        this.clientregform.value.waitingPeriodinitialsignup
      );

      formdata.append('useCreditCard', creditCardinfo ? 'true' : 'false');

      formdata.append('invoicePayment', invoicemonthy ? 'true' : 'false');

      formdata.append('padPayment', padinfo ? 'true' : 'false');

      formdata.append('session', this.session);

      formdata.append('setupWallet', this.clientregform.value.walletConfig);

      formdata.append(
        'setUplevelofCoverage',
        this.clientregform.value.tierConfig
      );

      formdata.append(
        'exptNumofEmp',
        this.clientregform.value.expectednoofEmployees || 0
      );

      formdata.append(
        'streetAddressLine1',
        this.capitalize(this.clientregform.value.streetAddress) || ''
      );

      formdata.append(
        'streetAddressLine2',
        this.capitalize(this.clientregform.value.streetAddress2) || ''
      );
      formdata.append('apt', this.clientregform.value.apt_suite || '');

      formdata.append('city', this.capitalize(this.clientregform.value.city));

      formdata.append('province', this.clientregform.value.Province);

      formdata.append('provinceId', this.provincelistid);

      formdata.append('state', this.clientregform.value.Province);

      formdata.append('stateId', this.state_id);

      formdata.append('country', this.clientregform.value.country);

      formdata.append('countryId', '1');
      formdata.append('fbcountryId', '124');
      formdata.append('parentId', this.clientregform.value.brokerName || 0);

      formdata.append('postalCode', this.clientregform.value.postalCode);
      formdata.append(
        'corporateClientId',
        sessionStorage.getItem('corporateClientId') ||
          environment.corporateClientId
      ); //fusebillid
      formdata.append(
        'corporateId',
        sessionStorage.getItem('corporateId') || '0'
      ); //corporateid

      this.clientregform.value['logo'] = logoDetails;
      sessionStorage.setItem(
        'formData',
        JSON.stringify(this.clientregform.value)
      );

      var requestOptions: any = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
        headers: { Authorization: 'Bearer ' + accessToken },
      };

      // console.log(requestOptions)

      fetch(environment.apiUrl + customerValidation, requestOptions)
        .then((response) => response.text())

        .then(
          (response: any) => {
            // console.log(response);
            response = JSON.parse(response);

            if (response['status'] == 200) {

              // let intialselectedplansblock1 = JSON.parse(
              //   sessionStorage.getItem('summaryBlock1') || '[]'
              // );
              // let intialselectedplansblock2 = JSON.parse(
              //   sessionStorage.getItem('summaryBlock2') || '[]'
              // );
              // let intialselectedplansblock3 = JSON.parse(
              //   sessionStorage.getItem('summaryBlock3') || '[]'
              // );

              // setTimeout(() => {
              //   const dom: HTMLElement = this.elementRef.nativeElement;
              //   if (intialselectedplansblock1.length > 0) {
              //     for (let i = 0; i < intialselectedplansblock1.length; i++) {
              //       const element: any = dom.querySelector(
              //         '#plancheck' + intialselectedplansblock1[i].subGroupId
              //       );
              //       element.checked = true;

              //       // this.plancheckCoverage = selectedplansblock1[i].coverage

              //       this.plancheckCoverage = this.getExecutiveCoveragesFromCode(
              //         intialselectedplansblock1[i].coverage
              //       );

              //       if (this.plancheckCoverage) {
              //         console.log(this.plancheckCoverage);
              //         if (this.plancheckCoverage.single) {
              //           const element2: any = dom.querySelector(
              //             '#executiveplanssingle' + intialselectedplansblock1[i].subGroupId
              //           );
              //           element2.checked = true;
              //         }
              //         if (this.plancheckCoverage.couple) {
              //           const element2: any = dom.querySelector(
              //             '#executiveplanscouple' + intialselectedplansblock1[i].subGroupId
              //           );
              //           element2.checked = true;
              //         }
              //         if (this.plancheckCoverage.family) {
              //           const element2: any = dom.querySelector(
              //             '#executiveplansfamily' + intialselectedplansblock1[i].subGroupId
              //           );
              //           element2.checked = true;
              //         }
              //       }
              //     }
              //   }
              //   if (intialselectedplansblock2.length > 0) {
              //     console.log('intialselectedplansblock3',intialselectedplansblock2);
              //     let el1: HTMLElement = this.upgradeplanstrue.nativeElement;
              //     el1.click();
              //     this.upgradeplansselection == true;
              //     setTimeout(() => {
              //       for (let i = 0; i < intialselectedplansblock2.length; i++) {
              //         const element1: any = dom.querySelector(
              //           '#plancheck2' + intialselectedplansblock2[i].subGroupId
              //         );
              //         element1.checked = true;
              //         // this.plancheck2Coverage = selectedplansblock2[i].coverage
              //         this.plancheck2Coverage = this.getExecutiveCoveragesFromCode(
              //           intialselectedplansblock2[i].coverage
              //         );

              //         if (this.plancheck2Coverage) {
              //           console.log(this.plancheckCoverage);
              //           if (this.plancheck2Coverage.single) {
              //             const element2: any = dom.querySelector(
              //               '#executiveplansblock2single' +
              //               intialselectedplansblock2[i].subGroupId
              //             );
              //             element2.checked = true;
              //           }
              //           if (this.plancheck2Coverage.couple) {
              //             const element2: any = dom.querySelector(
              //               '#executiveplansblock2couple' +
              //               intialselectedplansblock2[i].subGroupId
              //             );
              //             element2.checked = true;
              //           }
              //           if (this.plancheck2Coverage.family) {
              //             const element2: any = dom.querySelector(
              //               '#executiveplansblock2family' +
              //               intialselectedplansblock2[i].subGroupId
              //             );
              //             element2.checked = true;
              //           }
              //         }
              //       }
              //     }, 1000);
              //   } else {
              //     if (this.upgradeplansselection == true) {
              //       let el: HTMLElement = this.upgradeplansfalse.nativeElement;
              //       el.click();
              //       setTimeout(() => {
              //         let el1: HTMLElement = this.upgradeplanstrue.nativeElement;
              //         el1.click();
              //       }, 10);
              //     }
              //   }
              //   setTimeout(() => {
              //     if (intialselectedplansblock3.length > 0) {
              //       let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
              //       el1.click();
              //       this.employeeplanpurchase == true;
              //       setTimeout(() => {
              //         for (let i = 0; i < intialselectedplansblock3.length; i++) {
              //           const element2: any = dom.querySelector(
              //             '#plancheck3' + intialselectedplansblock3[i].subGroupId
              //           );
              //           if (element2) {
              //             element2.checked = true;
              //           }

              //           setTimeout(() => {
              //             this.plancheck3Coverage =
              //               this.getExecutiveCoveragesFromCode(
              //                 intialselectedplansblock3[i].coverage
              //               );
              //             if (this.plancheck3Coverage) {
              //               // console.log(this.plancheckCoverage)
              //               if (this.plancheck3Coverage.single) {
              //                 const element3: any = dom.querySelector(
              //                   '#executiveplansblock3single' +
              //                   intialselectedplansblock3[i].subGroupId
              //                 );
              //                 element3.checked = true;
              //               }
              //               if (this.plancheck3Coverage.couple) {
              //                 const element3: any = dom.querySelector(
              //                   '#executiveplansblock3couple' +
              //                   intialselectedplansblock3[i].subGroupId
              //                 );
              //                 element3.checked = true;
              //               }
              //               if (this.plancheck3Coverage.family) {
              //                 const element3: any = dom.querySelector(
              //                   '#executiveplansblock3family' +
              //                   intialselectedplansblock3[i].subGroupId
              //                 );
              //                 element3.checked = true;
              //               }
              //             }
              //           }, 100);
              //         }
              //       }, 2000);
              //     } else {
              //       if (this.employeeplanpurchase == true) {
              //         let el: HTMLElement = this.employeepurchasefalse.nativeElement;
              //         el.click();
              //         setTimeout(() => {
              //           let el1: HTMLElement =
              //             this.employeepurchasetrue.nativeElement;
              //           el1.click();
              //         }, 10);
              //       }
              //     }
              //   }, 500);
              // }, 1000);

              this.coreplantemplateValue = null;
              this.plansBlock1 = response.plans.packages;

              this.balkPlans=response.plans.packages;

              this.plansBlock1Tiers = response.plans.packages;

              this.plansBlock1.forEach((planlevel: any) => {
                planlevel.groups.forEach((groups: any) => {
                  groups.subGroups.forEach((subgroup: any) => {
                    subgroup.tiers = [];
                    subgroup.checked = false;
                  });
                });
              });
              this.plansBlock1Tiers.forEach((planlevel: any) => {
                this.selectedPackagePlansInfoTier[planlevel.id] = [];
                this.selectedPackagePlansInfoTiername[planlevel.id] =
                  planlevel.name;
                this.selectedPackagePlansInfoTierBlock2[planlevel.id] = [];
                this.selectedPackagePlansInfoTiernameBlock2[planlevel.id] =
                  planlevel.name;
                this.selectedPackagePlansInfoTierBlock3[planlevel.id] = [];
                this.selectedPackagePlansInfoTiernameBlock3[planlevel.id] =
                  planlevel.name;

                this.selectedPackagesavailableTiers2[planlevel.id] = {};
                this.selectedPackagesassignedTiers2[planlevel.id] = {};
                this.selectedPackagesavailableTiers2Block2[planlevel.id] = {};
                this.selectedPackagesassignedTiers2Block2[planlevel.id] = {};

                this.selectedPackagesavailableTiers3[planlevel.id] = {};
                this.selectedPackagesassignedTiers3[planlevel.id] = {};
                this.selectedPackagesavailableTiers3Block3[planlevel.id] = {};
                this.selectedPackagesassignedTiers3Block3[planlevel.id] = {};
                planlevel.groups.forEach((groups: any) => {
                  groups.subGroups.forEach((subgroup: any) => {
                    this.selectedPackagesavailableTiers2[planlevel.id][
                      subgroup.id
                    ] = null;
                    this.selectedPackagesassignedTiers2[planlevel.id][
                      subgroup.id
                    ] = [];
                    this.selectedPackagesavailableTiers2Block2[planlevel.id][
                      subgroup.id
                    ] = null;
                    this.selectedPackagesassignedTiers2Block2[planlevel.id][
                      subgroup.id
                    ] = [];

                    this.selectedPackagesavailableTiers3[planlevel.id][
                      subgroup.id
                    ] = null;
                    this.selectedPackagesassignedTiers3[planlevel.id][
                      subgroup.id
                    ] = [];
                    this.selectedPackagesavailableTiers3Block3[planlevel.id][
                      subgroup.id
                    ] = null;
                    this.selectedPackagesassignedTiers3Block3[planlevel.id][
                      subgroup.id
                    ] = [];
                    subgroup.tiers = [];
                    subgroup.checked = false;
                    subgroup.coverage = ''; //default
                  });
                });
              });

              this.executeBlocks()
            .then((message) => console.log(message))
            .catch((error) => console.error("An error occurred:", error));
              // setTimeout(() => {
              //   const dom: HTMLElement = this.elementRef.nativeElement;

              //   if (this.paidByCompany.length > 0) {
              //     for (let i = 0; i < this.paidByCompany.length; i++) {
              //       const element: any = dom.querySelector(
              //         '#plancheck' + this.paidByCompany[i].planLevelId
              //       );
              //       element.click();
              //     }
              //   }

              //   setTimeout(() => {
              //     if (this.coveredByCompany.length > 0) {
              //       let el1: HTMLElement = this.upgradeplanstrue.nativeElement;
              //       el1.click();
              //       this.upgradeplansselection == true;
              //       setTimeout(() => {
              //         for (let i = 0; i < this.coveredByCompany.length; i++) {
              //           const element: any = dom.querySelector(
              //             '#plancheck2' + this.coveredByCompany[i].planLevelId
              //           );
              //           element.click();
              //         }
              //       }, 1000);
              //     }
              //     setTimeout(() => {
              //       if (this.paidByEmployee.length > 0) {
              //         let el1: HTMLElement =
              //           this.employeepurchasetrue.nativeElement;
              //         el1.click();
              //         this.employeeplanpurchase == true;
              //         setTimeout(() => {
              //           for (let i = 0; i < this.paidByEmployee.length; i++) {
              //             const element: any = dom.querySelector(
              //               '#plancheck3' + this.paidByEmployee[i].planLevelId
              //             );
              //             element.click();
              //           }
              //         }, 1000);
              //       }
              //     }, 2000);
              //   }, 1500);
              // }, 1000);

              sessionStorage.setItem(
                'planResults',
                JSON.stringify(this.plansBlock1)
              );
              sessionStorage.setItem(
                'plansBlock1Tiers',
                JSON.stringify(this.plansBlock1Tiers)
              );

              setTimeout(() => {
                $('#executiveplanssingle17').prop('disabled', true);
                $('#executiveplanscouple17').prop('disabled', true);
                $('#executiveplansfamily17').prop('disabled', true);
                $('#executiveplanssingle18').prop('disabled', true);
                $('#executiveplanscouple18').prop('disabled', true);
                $('#executiveplansfamily18').prop('disabled', true);

                $('#executiveplansTiersingle17').prop('disabled', true);
                $('#executiveplansTiercouple17').prop('disabled', true);
                $('#executiveplansTierfamily17').prop('disabled', true);
                $('#executiveplansTiersingle18').prop('disabled', true);
                $('#executiveplansTiercouple18').prop('disabled', true);
                $('#executiveplansTierfamily18').prop('disabled', true);

                $('#executiveplansblock2single17').prop('disabled', true);
                $('#executiveplansblock2couple17').prop('disabled', true);
                $('#executiveplansblock2family17').prop('disabled', true);
                $('#executiveplansblock2single18').prop('disabled', true);
                $('#executiveplansblock2couple18').prop('disabled', true);
                $('#executiveplansblock2family18').prop('disabled', true);
              }, 1000);

              // if(this.existingPlans.length>0){
              //   for()
              // }

              this.updateAllStatus();

              this.assignAllplanLvelwithdisallowed(this.plansBlock1);
              this.headerComponent.headerDetails('login');
              this.headerComponent.applicationStatus(this.lengthofstatus);
              // this.plansBlock1 =response.plans.packages
              this.corporateId = response.data.corporateId;
              this.corporateClientId = response.data.fuseBillId;
              this.assignAllplanLvelwithdisallowedTiers(this.plansBlock1Tiers);
              sessionStorage.setItem('corporateId', this.corporateId);
              sessionStorage.setItem(
                'corporateClientId',
                this.corporateClientId
              );
              sessionStorage.setItem(
                'corporateClientName',
                response.data.corporateName
              );
              sessionStorage.setItem(
                'mainresults',
                JSON.stringify(this.plansBlock1)
              );
              sessionStorage.setItem(
                'planResults',
                JSON.stringify(this.plansBlock1)
              );

              this.basicInfo = false;
              this.plansInfo = true;
              const dom: HTMLElement = this.elementRef.nativeElement;

              this.headerComponent.headerDetails('login');

              if (this.clientregform.value.tierConfig == true) {
                this.showtierbasicplans = false;
                this.showtieradvplans = true;
                this.showtierbasicplans = false;
                this.showtieradvplans = true;
                this.showconfigurebutton = true;
              } else {
                this.showtierbasicplans = true;
                this.showtieradvplans = false;
                this.showtierbasicplans = true;
                this.showtieradvplans = false;
                this.showconfigurebutton = false;
              }
              if (this.clientregform.value.tierConfig == true) {
                this.showemptytierconfig = true;
              } else {
                this.showemptytierconfig = false;
              }
              if (this.clientregform.value.walletConfig == false) {
                this.showemptywalletConfig = false;
              } else {
                this.showemptywalletConfig = true;
              }
              // setTimeout(() => {
              //   // const element: any = dom.querySelector('#plancheck' + 16);
              //   // element.click();
              //   let el1: HTMLElement = this.upgradeplansfalse.nativeElement;
              //   el1.click();
              //   this.upgradeplansselection == false;
              //   let el2: HTMLElement = this.employeepurchasefalse.nativeElement;
              //   el2.click();
              //   this.employeeplanpurchase == false;
              // }, 1000);
              let selectedplansblock1 = JSON.parse(
                sessionStorage.getItem('summaryBlock1') || '[]'
              );
              let selectedplansblock2 = JSON.parse(
                sessionStorage.getItem('summaryBlock2') || '[]'
              );
              let selectedplansblock3 = JSON.parse(
                sessionStorage.getItem('summaryBlock3') || '[]'
              );
              // setTimeout(() => {
              //   const dom: HTMLElement = this.elementRef.nativeElement;
              //   if(selectedplansblock1.length>0){
              //   for(let i=0;i<selectedplansblock1.length;i++){
              //     const element: any = dom.querySelector("#plancheck" + selectedplansblock1[i].subGroupId);
              //     element.checked =true
              //     this.plancheckCoverage = selectedplansblock1[i].coverage

              //   }
              // }
              //   if(selectedplansblock2.length>0){
              //     let el1: HTMLElement = this.upgradeplanstrue.nativeElement;
              //     el1.click();
              //     this.upgradeplansselection == true
              //     setTimeout(() => {
              //     for(let i=0;i<selectedplansblock2.length;i++){
              //       const element1: any = dom.querySelector("#plancheck2" + selectedplansblock2[i].subGroupId);
              //       element1.checked =true
              //       this.plancheck2Coverage = selectedplansblock2[i].coverage
              //     }
              //   },1000)
              //   }
              //   if(selectedplansblock3.length>0){
              //     let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
              //     el1.click();
              //     this.employeeplanpurchase == true
              //     setTimeout(() => {
              //     for(let i=0;i<selectedplansblock3.length;i++){
              //       const element2: any = dom.querySelector("#plancheck3" + selectedplansblock3[i].subGroupId);
              //       element2.checked =true
              //       this.plancheck3Coverage = selectedplansblock3[i].coverage
              //     }
              //   },1500)
              //   }
              // }, 1000);
              sessionStorage.setItem('selectedTiersBlock1', '[]');
              sessionStorage.setItem('selectedTiersBlock2', '[]');
              sessionStorage.setItem('selectedTiersBlock3', '[]');
              this.selectedPackagePlansInfoTier = {};
              this.selectedPackagePlansInfoTierBlock2 = {};
              this.selectedPackagePlansInfoTierBlock3 = {};
              this.selectedPackagePlansInfoTier2 = {};
              this.selectedPackagePlansInfoTier2Block2 = {};
              this.selectedPackagePlansInfoTier3Block3 = {};

              this.seelctedplanLevelTierMapping = [];
              this.seelctedplanLevelTierMappingBlock2 = [];
              this.seelctedplanLevelTierMappingBlock3 = [];

            // }
          }else if (response['status'] == 202) {
              // Swal.fire('Error',response.message);
              Swal.fire({ title: 'Error', text: response.message });
            } else {
              Swal.fire({ title: 'Error', text: response.message ||response.error||response.error.error});
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
                text: error.error.error.message||error.error||error.error.message||error.message,
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Proceed',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  sessionStorage.clear();
                  this.router.navigate(['/login']);
                } else {
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
        this.scrollToFirstInvalidControl1();
        setTimeout(() => {
          submitbasicInfoEnableDisable.disabled = false;
          this._LoaderService.HideLoader();
        }, 1000);

      // .catch((error) => console.log('error', error));
    }

    // if (this.clientregform.invalid) {
    //   return;
    // }      this.scrollToFirstInvalidControl1();
      setTimeout(() => {
        submitbasicInfoEnableDisable.disabled = false;
        this._LoaderService.HideLoader();
      }, 5000);

  }
  }
  executeBlocks() {
    return new Promise((resolve, reject) => {
      // First block of code
      console.log("Executing block 1");

      for(let i=0;i<this.paidByCompany.length;i++){
        setTimeout(() => {
          const element: any = $("#plancheck" + this.paidByCompany[i].planLevelId);
       if(element!=null)
        element.click()
          console.log(`Block 1 - Task ${i + 1} completed`);
          console.log(i)
          console.log(this.paidByCompany.length-1)
          if (i === this.paidByCompany.length-1) {
            // Second block of code

            console.log("Executing block 2");


            setTimeout(() => {
              if(this.coveredByCompany.length>0){
                console.log("cehckheree")
                let el1: HTMLElement = this.upgradeplanstrue.nativeElement;
               if(el1!=null) el1.click();
                this.upgradeplansselection == true;

                for(let j=0;j<this.coveredByCompany.length;j++){
                  setTimeout(() => {
                    const element: any = $("#plancheck2" + this.coveredByCompany[j].planLevelId);
                    if(element!=null) element.click();
                    console.log(`Block 2 - Task ${j + 1} completed`);
                    if (j === this.coveredByCompany.length-1) {
                      // Third block of code
                      console.log("Executing block 3");

                    setTimeout(() => {
                      if(this.paidByEmployee.length>0){
                              let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
                              if(el1!=null) el1.click();
                              this.employeeplanpurchase == true
                              for(let k=0;k<this.paidByEmployee.length;k++){
                                setTimeout(() => {
                                  const element: any = $("#plancheck3" + this.paidByEmployee[k].planLevelId);
                                  element.click()
                                  console.log(`Block 3 - Task ${k + 1} completed`);
                                  if (k === this.paidByEmployee.length-1) {
                                    resolve("All blocks executed successfully");
                                  }
                                }, 1500);
                              }
                      }
                    }, 1000);

                    }
                  }, 1000);
                }
              }
              if(this.coveredByCompany.length==0 && this.paidByEmployee.length>0){
                let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
                if(el1!=null) el1.click();
                this.employeeplanpurchase == true
                for(let k=0;k<this.paidByEmployee.length;k++){
                  setTimeout(() => {
                    const element: any = $("#plancheck3" + this.paidByEmployee[k].planLevelId);
                    element.click()
                    console.log(`Block 3 - Task ${k + 1} completed`);
                    if (k === this.paidByEmployee.length-1) {
                      resolve("All blocks executed successfully");
                    }
                  }, 1500);
                }
        }
            }, 2000);





          }
        }, 1000);
      }
    });
  }
  scrollToFirstInvalidControl1() {
    const firstInvalidControl: HTMLElement =
      this.elementRef.nativeElement.querySelector(
        'form .ng-invalid' || 'form .ng-untouched'
      );

    // console.log(firstInvalidControl)
    window.scroll({
      top: this.getTopOffset(firstInvalidControl),
      left: 0,
      behavior: 'smooth',
    });
  }
  getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 300;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }
  public submitplansInfo() {

    let palnRes = sessionStorage.getItem('planResults') || '[]';

    let Block1 = sessionStorage.getItem('summaryBlock1') || '[]';

    // return false;

    this.corporationclient = this.clientregform.value.corporationName;
    // let formData = JSON.parse(sessionStorage.getItem('formData') || '');

    // return false
    var corporateId = sessionStorage.getItem('corporateId');

    var accessToken = sessionStorage.getItem('accessToken');
    var endPoint = '/api/ap/admin/corporate/' + corporateId + '/planSelections';

    let paidByCompany: {
      planLevelId: any;
      tierId: number;
      parentPlanLevelId: number;
    }[] = [];
    let coveredByCompany: {
      planLevelId: any;
      tierId: number;
      parentPlanLevelId: number;
    }[] = [];
    let paidByEmployees: {
      planLevelId: any;
      tierId: number;
      parentPlanLevelId: number;
    }[] = [];

    // let TierlistforGrapsh: { planLevelName: any; tierId: number }[] = [];

    // let summaryBlock1 = JSON.parse(
    //   sessionStorage.getItem('summaryBlock1') || '[]'
    // );
    // let summaryBlock2 = JSON.parse(
    //   sessionStorage.getItem('summaryBlock2') || '[]'
    // );
    // let requireEmployeeName = JSON.parse(
    //   sessionStorage.getItem('requireEmployeeName')
    // );
    // let summaryBlock3 = JSON.parse(
    //   sessionStorage.getItem('summaryBlock3') || '[]'
    // );
    // let summaryBlock1=[];
    // let summaryBlock2=[];
    // let summaryBlock3=[];


    let summaryBlock1 = JSON.parse(
      sessionStorage.getItem('summaryBlock1') || '[]'
    );
    let summaryBlock2 = JSON.parse(
      sessionStorage.getItem('summaryBlock2') || '[]'
    );

    let summaryBlock3 = JSON.parse(
      sessionStorage.getItem('summaryBlock3') || '[]'
    );

  //   summaryBlock1 = summaryBlock1A.filter((item, index, self) =>
  // index === self.findIndex((t) => (
  //   t.planLevelId === item.planLevelId
  // ))
  // );
  // summaryBlock2 = summaryBlock2A.filter((item, index, self) =>
  // index === self.findIndex((t) => (
  //   t.planLevelId === item.planLevelId
  // ))
  // );
//   summaryBlock3 = summaryBlock3A.filter((item, index, self) =>
//   index === self.findIndex((t) => (
//     t.planLevelId === item.planLevelId
//   ))
// );



    let summaryTiersBlock3 = JSON.parse(
      sessionStorage.getItem('selectedTiersBlock3') || '[]'
    );
    let formData = JSON.parse(sessionStorage.getItem('formData') || '');

    this.tierConfigCheck = formData.tierConfig == true ? true : false;
    this.walletConfigCheck = formData.walletConfig == true ? true : false;

    if (formData.tierConfig == false) {
      this.upgradertierscheck = this.upgradeplansselection;
      this.employeeplanpurchasetierscheck = this.employeeplanpurchase;
      summaryBlock1.forEach((element: any) => {
        let obj = {
          planLevelId: parseInt(element.subGroupId),
          tierId: 0,
          coverage: element.coverage ? element.coverage : '',
          parentPlanLevelId: parseInt(element.parentId ?? '0'),
        };
        paidByCompany.push(obj);
      });
      summaryBlock2.forEach((element: any) => {
        let obj = {
          planLevelId: parseInt(element.subGroupId),
          tierId: 0,
          coverage: element.coverage ? element.coverage : '',
          parentPlanLevelId: parseInt(element.parentId ?? '0'),
        };
        coveredByCompany.push(obj);
      });
      summaryBlock3.forEach((element: any) => {
        let obj = {
          planLevelId: parseInt(element.subGroupId),
          tierId: 0,
          coverage: element.coverage ? element.coverage : '',
          parentPlanLevelId: parseInt(element.parentId ?? '0'),
        };
        paidByEmployees.push(obj);
      });
    } else {
      this.upgradertierscheck = this.upgradeplansselectiontiers;
      this.employeeplanpurchasetierscheck = this.employeeplanpurchasetiers;
      this.seelctedplanLevelTierMapping.forEach((element: any) => {
        element.tiers.forEach((tiers: any) => {
          let obj = {
            planLevelId: parseInt(element.subGroupid),
            tierId: parseInt(tiers.id),
            coverage: element.coverage,
            parentPlanLevelId: parseInt(element.parentId ?? '0'),
          };
          paidByCompany.push(obj);
        });
      });
      this.seelctedplanLevelTierMapping.forEach((element: any) => {
        let array = [];
        element.tiers.forEach((tiers: any) => {
          let obj: any = {
            planLevelName: element.subGroupName,
            tierId: tiers.name,
          };
          this.TierlistforGrapsh.push(obj);
        });
      });
      this.seelctedplanLevelTierMappingBlock2.forEach((element: any) => {
        element.tiers.forEach((tiers: any) => {
          let obj = {
            planLevelId: parseInt(element.subGroupid),
            tierId: parseInt(tiers.id),
            coverage: element.coverage,
            parentPlanLevelId: parseInt(element.parentId ?? '0'),
          };
          coveredByCompany.push(obj);
        });
      });
      this.seelctedplanLevelTierMappingBlock3.forEach((element: any) => {
        element.tiers.forEach((tiers: any) => {
          let obj = {
            planLevelId: parseInt(element.subGroupid),
            tierId: parseInt(tiers.id),
            coverage: element.coverage,
            parentPlanLevelId: parseInt(element.parentId ?? '0'),
          };
          paidByEmployees.push(obj);
        });
      });
    }

    // console.log(typeof  formData.tierConfig)
    // console.log(formData.walletConfig)
    this.planRequestBody = {
      configuration: {
        tier: formData.tierConfig == true ? true : false,
        wallet: formData.walletConfig == true ? true : false,
      },
      paidByCompany: paidByCompany,
      // "upgradedPlans": [{"planLevelId": 0, "tierId": 0}],
      // "employeePurchasePlans": [{"planLevelId": 0,"tierId": 0}],
      coveredByCompany: coveredByCompany.length > 0 ? coveredByCompany : [],
      paidByEmployee: paidByEmployees.length > 0 ? paidByEmployees : [],
      enableCoveredByCompany: this.upgradeplansselection
        ? true
        : false || this.upgradeplansselectiontiers
        ? true
        : false,
      enablePaidByEmployee: this.employeeplanpurchase
        ? true
        : false || this.employeeplanpurchasetiers
        ? true
        : false,
      corporateTieredPlanLevelIds: [],
      defaultTier: 0,
      // payRollDeduction:this.payrollOptions || '',
      payRollDeduction: 'YES',
      requireEmployeeName: JSON.parse(
        sessionStorage.getItem('requireEmployeeName')
      ),
    };

    console.log(coveredByCompany);
    console.log(coveredByCompany.length);

    // this.submitplansSections()
    if (coveredByCompany.length > 1) {
      // $('#payrolldeduction-modal').modal('show');
      // this.payrolldeductionoption.reset();
      this.submitplansSections();
    } else {
      this.payrollOptions = '';
      // this.payrolldeduction=
      this.submitplansSections();
    }
  }

  public payrolldeductionConfirm() {
    console.log(this.payrolldeductionoption.value.payrolloption);
    this.payrollOptions = this.payrolldeductionoption.value.payrolloption;

    this.planRequestBody['payRollDeduction'] =
      this.payrolldeductionoption.value.payrolloption;
    $('#payrolldeduction-modal').modal('hide');
    this.planRequestBody['requireEmployeeName'] = sessionStorage.getItem(
      'requireEmployeeName'
    );
    this.submitplansSections();
  }
  public payrolldeductionCancel() {
    this.payrollOptions = '';
    this.planRequestBody['payRollDeduction'] = '';

    this.submitplansSections();

    //   console.log(this.planRequestBody.coveredByCompany)
    //   this.planRequestBody.coveredByCompany.forEach((element: any) => {
    //     let obj = {
    //       planLevelId: parseInt(element.subGroupId),
    //       tierId: 0,
    //       coverage: element.coverage ? element.coverage : '',
    //     };
    // if(obj.planLevelId ==17 || obj.planLevelId ==18){

    //   if(obj.coverage=="" || obj.coverage == "000"){
    //     alert("test")
    //   }
    // }
    // else{
    //   this.submitplansSections()
    // }

    //   });
  }

  submitplansSections() {
    var accessToken = sessionStorage.getItem('accessToken');
    var corporateId = sessionStorage.getItem('corporateId');


    let requireEmployeeName = JSON.parse(
      sessionStorage.getItem('requireEmployeeName')
    );
    var endPoint = '/api/ap/admin/corporate/' + corporateId + '/planSelections';
    let formData = JSON.parse(sessionStorage.getItem('formData') || '');

    this.http
      .post(environment.apiUrl + endPoint, this.planRequestBody, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (response: any) => {
          if (response['status'] == 200) {
            // this.employeeWorkingProviance=response.data.working_provinces;
            this.employeeWorkingProviance = response.data.working_provinces.sort(
              (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
            );
            this.updateAllStatus();
            this.EmployeeAddData = response.data.employeeKeys;
            this.headerComponent.applicationStatus(7);

            if (
              formData.tierConfig == false &&
              formData.walletConfig == false
            ) {
              this.basicInfo = false;
              this.plansInfo = false;
              this.wallettierInfo = false;
              this.nowalletnotierInfo = false;
              this.EmployeeInfo = true;
              this.walletData = 'No';
              this.TierData = 'No';
              this.GetCorpDetails1(corporateId);
            } else if (
              formData.tierConfig == false &&
              formData.walletConfig == true
            ) {
              this.basicInfo = false;
              this.plansInfo = false;
              this.wallettierInfo = true;
              this.nowalletnotierInfo = false;
              this.walletData = 'Selected';
              this.TierData = 'No';
              this.GetCorpDetails1(corporateId);
            } else if (
              formData.tierConfig == true &&
              formData.walletConfig == true
            ) {
              this.basicInfo = false;
              this.plansInfo = false;
              this.wallettierInfo = true;
              this.nowalletnotierInfo = false;
              this.walletData = 'Selected';
              this.TierData = 'Selected';
              this.GetCorpDetails1(corporateId);
            } else if (
              formData.tierConfig == true &&
              formData.walletConfig == false
            ) {
              this.basicInfo = false;
              this.plansInfo = false;
              this.wallettierInfo = false;
              this.nowalletnotierInfo = false;
              this.EmployeeInfo = true;
              this.walletData = 'No';
              this.TierData = 'Selected';
              this.GetCorpDetails1(corporateId);
            }

            this.wallettierInfoandtier = false;
          } else {
            Swal.fire({ title: 'Error', text: response.message });

            // this.toastrService.error('Error', response.message);
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
              } else {
                sessionStorage.clear();
                this.router.navigate(['/login']);
              }
            });
          } else {
            // Swal.fire(error.error.error.message)
            console.log(error);
            Swal.fire({ title: 'Error', text: error.error.message });
          }
          // this.toastrService.error("Invalid Credentials", 'Error!');
        }
      );
    // }
  }
  public submitTierInfo() {
    var corporateId = sessionStorage.getItem('corporateId');

    let annualIncome = [];

    for (let i = 0; i < this.dynamicArray.length; i++) {
      this.dynamicArray[i].tierName = this.capitalize(
        this.dynamicArray[i].tierName
      );

      if (this.dynamicArray[i].walletAmount.length > 2) {
        this.dynamicArray[i].walletAmount = parseInt(
          this.dynamicArray[i].walletAmount.replace(/\$/g, '')
        );
      } else {
        this.dynamicArray[i].walletAmount = 0;
      }
    }
    for (let i = 0; i < this.dynamicArrayService.length; i++) {
      if (this.dynamicArrayService[i].walletAmount.length > 2) {
        this.dynamicArrayService[i].walletAmount = parseInt(
          this.dynamicArrayService[i].walletAmount.replace(/\$/g, '') || ''
        );
      } else {
        this.dynamicArrayService[i].walletAmount = 0;
      }

      this.dynamicArrayService[i].from = parseInt(
        this.dynamicArrayService[i].from
      );
      this.dynamicArrayService[i].to = parseInt(this.dynamicArrayService[i].to);
    }

    for (let i = 0; i < this.dynamicArrayAnnualIncome.length; i++) {
      if (this.dynamicArrayAnnualIncome[i].walletAmount.length > 2) {
        this.dynamicArrayAnnualIncome[i].walletAmount = parseInt(
          this.dynamicArrayAnnualIncome[i].walletAmount.replace(/\$/g, '') || ''
        );
      } else {
        this.dynamicArrayAnnualIncome[i].walletAmount = 0;
      }

      this.dynamicArrayAnnualIncome[i].from = parseInt(
        this.dynamicArrayAnnualIncome[i].from
      );

      this.dynamicArrayAnnualIncome[i].to = parseInt(
        this.dynamicArrayAnnualIncome[i].to
      );

      this.dynamicArrayAnnualIncome[i].percentage = parseInt(
        this.dynamicArrayAnnualIncome[i].percentage
      );
    }

    console.log(this.dynamicArray);

    var ConfigureTiers =
      '/api/ap/admin/corporate/' + corporateId + '/configureTiers';
    var GetTiers = '/api/ap/admin/corporate/' + corporateId + '/tiers';
    var accessToken = sessionStorage.getItem('accessToken');
    let requestBody = {
      corporateId: corporateId,
      enableLengthOfService: this.lengthofServiceCheck,
      enableAnnualIncome: this.annualincomeCheck,
      default: this.dynamicArray,
      lengthOfService: this.lengthofServiceCheck
        ? this.dynamicArrayService
        : [],
      annualIncome: this.annualincomeCheck ? this.dynamicArrayAnnualIncome : [],
    };

    // this.dynamicArray.forEach((element: any) => {
    //   let obj = {
    //     id: element.sno,
    //     tierName: element.tierName,
    //   };
    //   this.tierinfonames.push(obj);
    // });
    // this.dynamicArrayService.forEach((element: any) => {
    //   let obj = {
    //     id: element.sno,
    //     tierName: element.tierName,
    //   };
    //   this.tierinfonames.push(obj);
    // });
    // this.dynamicArrayAnnualIncome.forEach((element: any) => {
    //   let obj = {
    //     id: element.sno,
    //     tierName: element.tierName,
    //   };
    //   this.tierinfonames.push(obj);
    // });
    // this.tierinfonames = [
    //   ...new Map(
    //     this.tierinfonames.map((item) => [item.tierName, item])
    //   ).values(),
    // ];

    //  console.log(this.tierinfonames)

    //  this.tierinfonames.filter((item, index) => this.tierinfonames.indexOf(item) === index);
    let el: HTMLElement = this.nextpage.nativeElement;
    el.click();

    this.http
      .post(environment.apiUrl + ConfigureTiers, requestBody, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (response: any) => {
          if (this.annualincomeCheck == true) {
            for (let i = 0; i < this.dynamicArrayAnnualIncome.length; i++) {
              let obj = {
                Tier: this.capitalize(
                  this.dynamicArrayAnnualIncome[i].tierName
                ),
                walletAmount: this.dynamicArrayAnnualIncome[i].walletAmount,
              };

              this.finalTiersforGraph.push(obj);
            }
          } else if (this.lengthofServiceCheck == true) {
            for (let i = 0; i < this.dynamicArrayService.length; i++) {
              let obj = {
                Tier: this.capitalize(this.dynamicArrayService[i].tierName),
                walletAmount: this.dynamicArrayService[i].walletAmount,
              };

              this.finalTiersforGraph.push(obj);
            }
          } else {
            for (let i = 0; i < this.dynamicArray.length; i++) {
              let obj = {
                Tier: this.capitalize(this.dynamicArray[i].tierName),
                walletAmount: this.dynamicArray[i].walletAmount,
              };

              this.finalTiersforGraph.push(obj);
            }
          }

          this.http
            .get(environment.apiUrl + GetTiers, {
              headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
              },
            })
            .subscribe(
              (response: any) => {
                if (response['status'] == 200) {
                  this.configureTierList = response.data;
                } else {
                  Swal.fire({ title: 'Error', text: response.message });
                }
              },
              (error) => {
                console.log(error);
                Swal.fire({ title: 'Error', text: error.error.error.message });
              }
            );
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
              } else {
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

  annualIncome(e: any) {
    // console.log(e.target.value)

    if (e.target.value == 'true') {
      this.annualincomeCheck = true;
      // this.addRowAnnual()
    } else {
      this.annualincomeCheck = false;
    }
  }

  lengthOfService(e: any) {
    // console.log(e.target.value)

    if (e.target.value == 'true') {
      this.lengthofServiceCheck = true;
      // this.addRowService()

      // let el: HTMLElement = this.myDiv.nativeElement;
      // el.click();
    } else {
      this.lengthofServiceCheck = false;
    }
  }
  tierslevel(e: any) {
    // console.log(e.target.value)

    if (e.target.value == 'true') {
      this.tiersLevelCheck = true;
    } else {
      this.tiersLevelCheck = false;
    }
  }

  upgradeplans(e: any) {

    setTimeout(() => {
      if (e.target.value == 'true') {

        let block1res = JSON.parse(
          sessionStorage.getItem('summaryBlock1') || '[]'
        );
          console.log(block1res)
        if (block1res.length > 0) {
          this.upgradeplansselection = true;
          this.plansblock2();
          this.plansresblack3 = [];
        }
        else {
          Swal.fire({
            title: 'Info',
            text: 'Please select one core plan from above',
          });

          this.upgradeplansselection = false;
          let el: HTMLElement = this.upgradeplansfalse.nativeElement;
          el.click();
        }
        if (this.employeeplanpurchase == true) {
  this.employeeplanpurchase =true
          // let el: HTMLElement = this.employeepurchasefalse.nativeElement;
          // el.click();
          setTimeout(() => {
            let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
            el1.click();
          }, 100);
        }
      }
      else {

        this.upgradeplansselection = false;
        sessionStorage.setItem('summaryBlock2', '[]');
        if (this.employeeplanpurchase == true) {
          // let el: HTMLElement = this.employeepurchasefalse.nativeElement;
          // el.click();
          setTimeout(() => {
            let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
            el1.click();
          }, 100);
        }
      }
    }, 1000);

  }

  upgradeplansTiers(e: any) {
    if (e.target.value == 'true') {
      let block1res = JSON.parse(
        sessionStorage.getItem('selectedTiersBlock1') || '[]'
      );
      let block2filter = block1res.filter(
        (item: any) => item.parentid == 1 || item.parentid == 6
      );

      console.log(block2filter);

      if (block1res.length > 0) {
        let el: HTMLElement = this.employeepurchaseTiersfalse.nativeElement;
        el.click();

        this.upgradeplansselectiontiers = true;
        this.plansblock2tiers();
      } else {
        Swal.fire({
          title: 'Info',
          text: 'Please select one core plan from above',
        });

        this.upgradeplansselectiontiers = false;
        let el: HTMLElement = this.upgradeplanstiersfalse.nativeElement;
        el.click();
      }
    } else {
      this.upgradeplansselectiontiers = false;
    }
  }

  public getpackageGroupId(packageId: any, Groupid: any) {
    // console.log("packageid"+packageId)

    this.planres2.forEach((element: any, index: any) => {
      if (element.id == packageId) {
        // console.log("packageidcheck"+element.id)
        // console.log("packageid"+packageId)
        this.packageIndex = index;
      }

      element.groups.forEach((element1: any, index1: any) => {
        if (element.id == packageId && element1.id == Groupid) {
          // console.log("groupidcheck"+element1.id)
          // console.log("groupid"+Groupid)
          this.groupIndex = index1;
        }
      });
    });
  }
  public getpackageGroupIdblock2(packageId: any, Groupid: any) {
    let results = JSON.parse(sessionStorage.getItem('block2result') || '[]');

    results.forEach((element: any, index: any) => {
      if (element.id == packageId) {
        // console.log("packageidcheck"+element.id)
        // console.log("packageid"+packageId)
        this.packageIndexblock2 = index;
      }

      element.groups.forEach((element1: any, index1: any) => {
        if (element.id == packageId && element1.id == Groupid) {
          // console.log("groupidcheck"+element1.id)
          // console.log("groupid"+Groupid)
          this.groupIndexblock2 = index1;
          // alert(this.groupIndex)
        }
      });
    });
  }

  public plansblock2() {
    this.plansNewBlock2 = [];

    this.plansNewBlock2 = JSON.parse(
      sessionStorage.getItem('mainresults') || '[]'
    );

    this.selectedplansblock1 = JSON.parse(
      sessionStorage.getItem('summaryBlock1') || '[]'
    );

    this.plansNewBlock2.forEach((packagelevel: any, index: any) => {
      if (!packagelevel) {
      } else {
        packagelevel.groups.forEach((groups: any, index1: any) => {
          this.selectedplansblock1.forEach((selectplan: any) => {
            if (
              packagelevel.id == selectplan.packageid &&
              packagelevel.groups.id == selectplan.parentid
            ) {
              if (
                !this.plansNewBlock2[index] ||
                !this.plansNewBlock2[index]['groups'] ||
                !this.plansNewBlock2[index]['groups'][index1] ||
                !this.plansNewBlock2[index]['groups'][index1]['subGroups']
              ) {
              } else {
                var allAvailble =
                  this.plansNewBlock2[index]['groups'][index1]['subGroups'];

                console.log(allAvailble);

                if (
                  this.plansNewBlock2[index].id == selectplan.packageid &&
                  this.plansNewBlock2[index]['groups'][index1].id !=
                    selectplan.parentId
                ) {
                  console.log('ignore');

                  this.plansNewBlock2[index]['groups'][index1] = null;
                  // this.plansNewBlock2[index] = null;
                } else {
                  console.log('oktoselect');
                  console.log(allAvailble);
                  allAvailble.forEach((element1: any, index2: any) => {
                    if (element1 != null) {
                      // if(element1.)
                      if (element1.parentId != '15') {
                        if (element1.ordering > selectplan.orderId) {
                        } else {
                          this.plansNewBlock2[index]['groups'][index1][
                            'subGroups'
                          ][index2] = null;

                          this.plansNewBlock2.forEach(
                            (elementres: any, index5: any) => {
                              if (!elementres || !elementres.groups) {
                              } else {
                                elementres.groups.forEach(
                                  (group: any, index6: any) => {
                                    console.log(group);
                                    if (
                                      !this.plansNewBlock2[index5] ||
                                      !this.plansNewBlock2[index5]['groups'] ||
                                      !this.plansNewBlock2[index5]['groups'][
                                        index6
                                      ] ||
                                      !this.plansNewBlock2[index5]['groups'][
                                        index6
                                      ]['subGroups']
                                    ) {
                                    } else {
                                      group.subGroups.forEach(
                                        (subgroups: any, index7: any) => {
                                          let validSubgroups = group[
                                            'subGroups'
                                          ].filter((v: any) => v !== null);

                                          console.log(validSubgroups);
                                          if (validSubgroups.length > 0) {
                                          } else {
                                            // this.plansNewBlock2[index5][
                                            //   'groups'
                                            // ][index6] = null;

                                            this.plansNewBlock2[index5] = null;
                                            // this.plansNewBlock2.splice(index5,1)
                                          }
                                        }
                                      );
                                    }

                                    let validgroups = elementres.groups.filter(
                                      (v: any) => v !== null
                                    );

                                    console.log(validgroups);
                                    if (validgroups.length > 0) {
                                    } else {
                                      this.plansNewBlock2[index5] = null;
                                      ////////show subGroups here
                                    }
                                    //
                                  }
                                );
                              }
                            }
                          );
                        }
                      } else {
                        console.log(element1.ordering); //23  24   Default===single and Family
                        console.log(selectplan.orderId); //23  23
                        if (element1.ordering > selectplan.orderId) {
                          console.log('ifstate');
                        } else {
                          console.log('coverage' + selectplan.coverage);

                          this.upgradeplanscheck =
                            this.getExecutiveCoveragesFromCode(
                              selectplan.coverage
                            );
                          // {single:true,couple:true,fam:false}

                          if (this.upgradeplanscheck.single) {
                            console.log(element1.id);
                            console.log(selectplan.subGroupId);
                            if (element1.id >= selectplan.subGroupId) {
                              this.plansNewBlock2[index]['groups'][index1][
                                'subGroups'
                              ][index2]['coverage'] = '001';
                            } else {
                              this.plansNewBlock2[index]['groups'][index1][
                                'subGroups'
                              ][index2] = null;
                            }
                          }
                          if (this.upgradeplanscheck.couple) {
                            if (element1.id >= selectplan.subGroupId) {
                              this.plansNewBlock2[index]['groups'][index1][
                                'subGroups'
                              ][index2]['coverage'] = '010';
                            } else {
                              this.plansNewBlock2[index]['groups'][index1][
                                'subGroups'
                              ][index2] = null;
                            }
                          }
                          if (
                            this.upgradeplanscheck.single &&
                            this.upgradeplanscheck.couple
                          ) {
                            if (element1.id >= selectplan.subGroupId) {
                              this.plansNewBlock2[index]['groups'][index1][
                                'subGroups'
                              ][index2]['coverage'] = '011';
                            } else {
                              this.plansNewBlock2[index]['groups'][index1][
                                'subGroups'
                              ][index2] = null;
                            }
                          }
                          if (this.upgradeplanscheck.family) {
                            this.plansNewBlock2[index]['groups'][index1][
                              'subGroups'
                            ][index2] = null;
                          }

                          this.plansNewBlock2.forEach(
                            (elementres: any, index5: any) => {
                              if (!elementres || !elementres.groups) {
                              } else {
                                elementres.groups.forEach(
                                  (group: any, index6: any) => {
                                    console.log(group);
                                    if (
                                      !this.plansNewBlock2[index5] ||
                                      !this.plansNewBlock2[index5]['groups'] ||
                                      !this.plansNewBlock2[index5]['groups'][
                                        index6
                                      ] ||
                                      !this.plansNewBlock2[index5]['groups'][
                                        index6
                                      ]['subGroups']
                                    ) {
                                    } else {
                                      group.subGroups.forEach(
                                        (subgroups: any, index7: any) => {
                                          let validSubgroups = group[
                                            'subGroups'
                                          ].filter((v: any) => v !== null);

                                          console.log(validSubgroups);
                                          if (validSubgroups.length > 0) {
                                          } else {
                                            // this.plansNewBlock2[index5][
                                            //   'groups'
                                            // ][index6] = null;

                                            this.plansNewBlock2[index5] = null;
                                            // this.plansNewBlock2.splice(index5,1)
                                          }
                                        }
                                      );
                                    }

                                    let validgroups = elementres.groups.filter(
                                      (v: any) => v !== null
                                    );

                                    console.log(validgroups);
                                    if (validgroups.length > 0) {
                                    } else {
                                      this.plansNewBlock2[index5] = null;
                                      ////////show subGroups here
                                    }
                                    //
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    }
                  });
                }
              }
            }
          });
        });
      }
    });

    console.log(this.plansNewBlock2);

    this.plansresblack2 = this.plansNewBlock2;

    sessionStorage.setItem('block2result', JSON.stringify(this.plansresblack2));

    setTimeout(() => {
      let selectedplansblock2 = JSON.parse(
        sessionStorage.getItem('summaryBlock2') || '[]'
      );
      setTimeout(() => {
        const dom: HTMLElement = this.elementRef.nativeElement;
        if (selectedplansblock2.length > 0) {
          for (let i = 0; i < selectedplansblock2.length; i++) {
            if (selectedplansblock2[i].subGroupId != 4) {
              // this.selectInBlock2()
            }
          }
        } else {
          // this.selectInBlock2()
        }
      }, 1000);
    }, 1000);

    // setTimeout(() => {
    //   $("#executiveplansblock2single17").prop("disabled", true);
    //   $("#executiveplansblock2couple17").prop("disabled", true);
    //   $("#executiveplansblock2family17").prop("disabled", true);
    //   $("#executiveplansblock2single18").prop("disabled", true);
    //   $("#executiveplansblock2couple18").prop("disabled", true);
    //   $("#executiveplansblock2family18").prop("disabled", true);

    // }, 1000);
  }

  public selectInBlock2() {
    const dom: HTMLElement = this.elementRef.nativeElement;
    const element: any = dom.querySelector('#plancheck2' + 4);

    if (element) {
      element.click();
    }
  }

  public plansblock2tiers() {
    this.plansNewBlock2Tiers = [];

    // this.plansNewBlock2Tiers = this.plansBlock1Tiers
    this.plansNewBlock2Tiers = JSON.parse(
      sessionStorage.getItem('plansBlock1Tiers') || '[]'
    );
    // this.plansNewBlock2Tiers = this.plansBlock1Tiers

    // this.selectedplansblock1 = JSON.parse(
    //   sessionStorage.getItem('selectedTiersBlock1') || '[]'
    // );

    this.selectedplansblock1 = this.seelctedplanLevelTierMapping;

    console.log(this.selectedplansblock1);

    this.plansNewBlock2Tiers.forEach((packagelevel: any, index: any) => {
      if (!packagelevel) {
      } else {
        packagelevel.groups.forEach((groups: any, index1: any) => {
          this.selectedplansblock1.forEach((selectplan: any) => {
            if (
              packagelevel.id == selectplan.packageId &&
              packagelevel.groups.id == selectplan.parentId
            ) {
              if (
                !this.plansNewBlock2Tiers[index] ||
                !this.plansNewBlock2Tiers[index]['groups'] ||
                !this.plansNewBlock2Tiers[index]['groups'][index1] ||
                !this.plansNewBlock2Tiers[index]['groups'][index1]['subGroups']
              ) {
              } else {
                var allAvailble =
                  this.plansNewBlock2Tiers[index]['groups'][index1][
                    'subGroups'
                  ];

                if (
                  this.plansNewBlock2Tiers[index].id == selectplan.packageId &&
                  this.plansNewBlock2Tiers[index]['groups'][index1].id !=
                    selectplan.parentid
                ) {
                  // console.log("ignore")

                  this.plansNewBlock2Tiers[index]['groups'][index1] = null;
                } else {
                  //  console.log("oktoselect")
                  console.log(allAvailble);
                  allAvailble.forEach((element1: any, index2: any) => {
                    if (element1 != null) {
                      this.plansNewBlock2Tiers[index]['groups'][index1][
                        'subGroups'
                      ][index2].tiers = []; //here tiersmake empty Array
                      this.plansNewBlock2Tiers[index]['groups'][index1][
                        'subGroups'
                      ][index2].checked = false; //here tiersmake empty Array
                      // if(element1.)

                      if (element1.parentId != 15) {
                        if (element1.id == selectplan.subGroupid) {
                          // this.plansNewBlock2Tiers[index]['groups'][index1][
                          //   'subGroups'
                          // ][index2] = null;    ///Here Plan Selection

                          selectplan.tiers.forEach(
                            (tiers: any, index7: any) => {
                              if (tiers.name == 'All') {
                                this.plansNewBlock2Tiers[index]['groups'][
                                  index1
                                ]['subGroups'][index2] = null;
                              } else {
                                // console.log(availbleTierBlock2)
                              }
                            }
                          );

                          this.plansNewBlock2Tiers.forEach(
                            (elementres: any, index5: any) => {
                              if (!elementres || !elementres.groups) {
                              } else {
                                elementres.groups.forEach(
                                  (group: any, index6: any) => {
                                    if (
                                      !this.plansNewBlock2Tiers[index5] ||
                                      !this.plansNewBlock2Tiers[index5][
                                        'groups'
                                      ] ||
                                      !this.plansNewBlock2Tiers[index5][
                                        'groups'
                                      ][index6] ||
                                      !this.plansNewBlock2Tiers[index5][
                                        'groups'
                                      ][index6]['subGroups']
                                    ) {
                                    } else {
                                      console.log(group);
                                      group.subGroups.forEach(
                                        (subgroups: any, index7: any) => {
                                          let validSubgroups = group[
                                            'subGroups'
                                          ].filter((v: any) => v !== null);

                                          console.log(validSubgroups);
                                          if (validSubgroups.length > 0) {
                                          } else {
                                            this.plansNewBlock2Tiers[index5][
                                              'groups'
                                            ][index6] = null;
                                            // this.plansNewBlock2.splice(index5,1)
                                          }
                                        }
                                      );
                                    }

                                    let validgroups = elementres.groups.filter(
                                      (v: any) => v !== null
                                    );

                                    console.log(validgroups);
                                    if (validgroups.length > 0) {
                                    } else {
                                      this.plansNewBlock2Tiers[index5] = null;
                                      ////////show subGroups here
                                    }
                                    //
                                  }
                                );
                              }
                            }
                          );
                        } else {
                        }
                      } else {
                        if (element1.id == selectplan.subGroupid) {
                          if (selectplan.coverage == 'Single') {
                            // if (element1.id >= selectplan.subGroupId) {
                            //   this.plansNewBlock2Tiers[index]['groups'][index1][
                            //     'subGroups'
                            //   ][index2]['coverage']="Couple"
                            // }
                            // else{
                            //   this.plansNewBlock2Tiers[index]['groups'][index1][
                            //     'subGroups'
                            //   ][index2] = null;
                            // }
                          } else if (selectplan.coverage == 'Couple') {
                            // if (element1.id >= selectplan.subGroupId) {
                            //   this.plansNewBlock2Tiers[index]['groups'][index1][
                            //     'subGroups'
                            //   ][index2]['coverage']="Family"
                            // }
                            // else{
                            //   this.plansNewBlock2Tiers[index]['groups'][index1][
                            //     'subGroups'
                            //   ][index2] = null;
                            // }
                          } else {
                            this.plansNewBlock2Tiers[index]['groups'][index1][
                              'subGroups'
                            ][index2] = null;
                          }
                          this.plansNewBlock2Tiers.forEach(
                            (elementres: any, index5: any) => {
                              if (!elementres || !elementres.groups) {
                              } else {
                                elementres.groups.forEach(
                                  (group: any, index6: any) => {
                                    if (
                                      !this.plansNewBlock2Tiers[index5] ||
                                      !this.plansNewBlock2Tiers[index5][
                                        'groups'
                                      ] ||
                                      !this.plansNewBlock2Tiers[index5][
                                        'groups'
                                      ][index6] ||
                                      !this.plansNewBlock2Tiers[index5][
                                        'groups'
                                      ][index6]['subGroups']
                                    ) {
                                    } else {
                                      console.log(group);
                                      group.subGroups.forEach(
                                        (subgroups: any, index7: any) => {
                                          let validSubgroups = group[
                                            'subGroups'
                                          ].filter((v: any) => v !== null);

                                          console.log(validSubgroups);
                                          if (validSubgroups.length > 0) {
                                          } else {
                                            this.plansNewBlock2Tiers[index5][
                                              'groups'
                                            ][index6] = null;
                                            // this.plansNewBlock2.splice(index5,1)
                                          }
                                        }
                                      );
                                    }

                                    let validgroups = elementres.groups.filter(
                                      (v: any) => v !== null
                                    );

                                    console.log(validgroups);
                                    if (validgroups.length > 0) {
                                    } else {
                                      this.plansNewBlock2Tiers[index5] = null;
                                      ////////show subGroups here
                                    }
                                    //
                                  }
                                );
                              }
                            }
                          );
                        } else {
                          // console.log("coverage"+selectplan.coverage)
                          // if(selectplan.coverage=="Single"){
                          //   if (element1.id >= selectplan.subGroupId) {
                          //     this.plansNewBlock2Tiers[index]['groups'][index1][
                          //       'subGroups'
                          //     ][index2]['coverage']="Couple"
                          //   }
                          //   else{
                          //     this.plansNewBlock2Tiers[index]['groups'][index1][
                          //       'subGroups'
                          //     ][index2] = null;
                          //   }
                          // }
                          // else if(selectplan.coverage=="Couple"){
                          //   if (element1.id >= selectplan.subGroupId) {
                          //     this.plansNewBlock2Tiers[index]['groups'][index1][
                          //       'subGroups'
                          //     ][index2]['coverage']="Family"
                          //   }
                          //   else{
                          //     this.plansNewBlock2Tiers[index]['groups'][index1][
                          //       'subGroups'
                          //     ][index2] = null;
                          //   }
                          // }
                          // else{
                          //   this.plansNewBlock2Tiers[index]['groups'][index1][
                          //     'subGroups'
                          //   ][index2] = null;
                          // }
                        }
                      }
                    }
                  });
                }
              }
            }
          });
        });
      }
    });

    console.log(this.plansNewBlock2Tiers);

    this.plansresblack2Tiers = this.plansNewBlock2Tiers;

    sessionStorage.setItem(
      'block2resultTiers',
      JSON.stringify(this.plansresblack2Tiers)
    );

    setTimeout(() => {
      sessionStorage.setItem('selectedTiersBlock2', '[]');
      const dom: HTMLElement = this.elementRef.nativeElement;

      this.plansresblack2Tiers.forEach((packagelevel: any, index: any) => {
        if (!packagelevel) {
        } else {
          packagelevel.groups.forEach((groups: any, index1: any) => {
            if (
              !this.plansresblack2Tiers[index] ||
              !this.plansresblack2Tiers[index]['groups']
            ) {
            } else {
              if (
                !this.plansresblack2Tiers[index]['groups'][index1] ||
                !this.plansresblack2Tiers[index]['groups'][index1]['subGroups']
              ) {
              } else {
                groups.subGroups.forEach((subGroups: any, index2: any) => {
                  if (
                    !this.plansresblack2Tiers[index]['groups'][index1] ||
                    !this.plansresblack2Tiers[index]['groups'][index1][
                      'subGroups'
                    ][index2]
                  ) {
                  } else {
                    // const element: any = dom.querySelector("#plancheck2" +  this.plansresblack2Tiers[index]['groups'][index1]['subGroups'][index2].id);
                    // console.log(element)
                    //    element.click()    ///Here plans Selectedt Auto
                  }
                });
              }
            }
          });
        }
      });
    }, 1000);
  }

  planpurchase(e: any) {

    if (e.target.value == 'true') {
      let checkCoverage=true;

      this.employeeplanpurchase = true;

      if (this.upgradeplansselection == true) {
        let block1res = JSON.parse(
          sessionStorage.getItem('summaryBlock2') || '[]'
        );


          console.log(block1res)
          sessionStorage.setItem('summaryBlock2',JSON.stringify(block1res))
          if (JSON.parse(sessionStorage.getItem('summaryBlock1'))) {

            this.employeeplanpurchase = true;

              this.plansblock3();
        }
        else {
          // Swal.fire('Info','Please select one plan from above');
          Swal.fire({ title: 'Info', text: 'Please select one plan from above' });

          this.employeeplanpurchase = false;
          let el: HTMLElement = this.employeepurchasefalse.nativeElement;
          el.click();
        }
      }
      else{
        let  summaryBlock1 = JSON.parse(sessionStorage.getItem('summaryBlock1'))??[];
        if (summaryBlock1&&summaryBlock1.length>0) {

          this.employeeplanpurchase = true;

            this.plansblock3();
      }
      else {
        // Swal.fire('Info','Please select one plan from above');
        Swal.fire({ title: 'Info', text: 'Please select one plan from above' });

        this.employeeplanpurchase = false;
        let el: HTMLElement = this.employeepurchasefalse.nativeElement;
        el.click();
      }
      }

      let selectedplansblock3 = JSON.parse(
        sessionStorage.getItem('summaryBlock3') || '[]'
      );

      setTimeout(() => {
        for (let i = 0; i < selectedplansblock3.length; i++) {

          $("#plancheck3" + selectedplansblock3[i].subGroupId).prop("checked", true);

          // element2.checked = true;
          // this.plancheck3Coverage = selectedplansblock3[i].coverage;
          this.plancheck3Coverage =  this.getExecutiveCoveragesFromCode(selectedplansblock3[i].coverage)


          if (
            this.plancheck3Coverage
          ) {
            if (this.plancheck3Coverage.single) {

              $("#executiveplansblock3single" + selectedplansblock3[i].subGroupId).prop("checked", true);

              // element2.checked = true;
            } if (this.plancheck3Coverage.couple) {

              $("#executiveplansblock3couple" + selectedplansblock3[i].subGroupId).prop("checked", true);

              // element2.checked = true;
            } if (this.plancheck3Coverage.family) {

              $("#executiveplansblock3family" + selectedplansblock3[i].subGroupId).prop("checked", true);

              // element2.checked = true;
            }
          }
        }
      }, 3000);



    }
    else {


      this.employeeplanpurchase = false;
      // sessionStorage.setItem('summaryBlock3', '[]');
    }
  }
  planpurchaseTiers(e: any) {
    if (e.target.value == 'true') {
      if (
        JSON.parse(sessionStorage.getItem('selectedTiersBlock1') || '[]')
          .length > 0
      ) {
        this.employeeplanpurchasetiers = true;
        this.plansblock3Tiers();
      } else {
        // Swal.fire('Info','Please select one plan from above');
        Swal.fire({ title: 'Info', text: 'Please select one plan from above' });

        this.employeeplanpurchasetiers = false;
        let el: HTMLElement = this.employeepurchasefalse.nativeElement;
        el.click();
      }
    } else {
      this.employeeplanpurchasetiers = false;
      sessionStorage.setItem('selectedTiersBlock3', '[]');
    }
  }
  public plansblock3() {
    this.Newplansresblack3 = [];

    if (this.upgradeplansselection == true) {
      this.Newplansresblack3 = JSON.parse(
        sessionStorage.getItem('block2result') || '[]'
      );

      // this.Newplansresblack3 = this.plansresblack2Tiers;
      this.selectedplansblock1 = JSON.parse(
        sessionStorage.getItem('summaryBlock2') || '[]'
      );
    } else {
      this.Newplansresblack3 = JSON.parse(
        sessionStorage.getItem('mainresults') || '[]'
      );
      // this.Newplansresblack3 = this.plansBlock1Tiers;
      this.selectedplansblock1 = JSON.parse(
        sessionStorage.getItem('summaryBlock1') || '[]'
      );
    }

    this.Newplansresblack3.forEach((packagelevel: any, index: any) => {
      var grpcount = 0;

      if (!packagelevel) {
      } else {
        packagelevel.groups.forEach((groups: any, index1: any) => {
          this.selectedplansblock1.forEach((selectplan: any) => {
            if (
              packagelevel.id == selectplan.packageid &&
              packagelevel.groups.id == selectplan.parentid
            ) {
              if (
                !this.Newplansresblack3[index] ||
                !this.Newplansresblack3[index]['groups']
              ) {
              } else {
                if (
                  !this.Newplansresblack3[index]['groups'][index1] ||
                  !this.Newplansresblack3[index]['groups'][index1]['subGroups']
                ) {
                } else {
                  var allAvailble =
                    this.Newplansresblack3[index]['groups'][index1][
                      'subGroups'
                    ];

                  var sgcount = 0;

                  allAvailble.forEach((element1: any, index2: any) => {
                    if (element1 != null) {
                      //removeif
                      console.log('6');
                      if (element1.parentId != '15') {
                        if (element1.ordering > selectplan.orderId) {
                        } else {
                          this.Newplansresblack3[index]['groups'][index1][
                            'subGroups'
                          ][index2] = null;

                          this.Newplansresblack3.forEach(
                            (elementres: any, index5: any) => {
                              if (!elementres || !elementres.groups) {
                              } else {
                                elementres.groups.forEach(
                                  (group: any, index6: any) => {
                                    // console.log(group)
                                    if (
                                      !this.Newplansresblack3[index5] ||
                                      !this.Newplansresblack3[index5][
                                        'groups'
                                      ] ||
                                      !this.Newplansresblack3[index5]['groups'][
                                        index6
                                      ] ||
                                      !this.Newplansresblack3[index5]['groups'][
                                        index6
                                      ]['subGroups']
                                    ) {
                                    } else {
                                      group.subGroups.forEach(
                                        (subgroups: any, index7: any) => {
                                          let validSubgroups = group[
                                            'subGroups'
                                          ].filter((v: any) => v !== null);

                                          console.log(validSubgroups);
                                          if (validSubgroups.length > 0) {
                                          } else {
                                            this.Newplansresblack3[index5][
                                              'groups'
                                            ][index6] = null;
                                            // this.plansNewBlock2.splice(index5,1)
                                          }
                                        }
                                      );
                                    }

                                    let validgroups = elementres.groups.filter(
                                      (v: any) => v !== null
                                    );

                                    console.log(validgroups);
                                    if (validgroups.length > 0) {
                                    } else {
                                      this.Newplansresblack3[index5] = null;
                                      ////////show subGroups here
                                    }
                                    //
                                  }
                                );
                              }
                            }
                          );
                          sgcount++;
                        }
                      } else {
                        console.log(element1.ordering); //23  24   Default===single and Family
                        console.log(selectplan.orderId); //23  23
                        if (element1.ordering > selectplan.orderId) {
                          console.log('ifstate');
                        } else {
                          console.log('coverage' + selectplan.coverage);

                          this.employeeplancheck =
                            this.getExecutiveCoveragesFromCode(
                              selectplan.coverage
                            );
                          if (this.employeeplancheck.single) {
                            if (element1.id >= selectplan.subGroupId) {
                              this.Newplansresblack3[index]['groups'][index1][
                                'subGroups'
                              ][index2]['coverage'] = '001';
                            } else {
                              this.Newplansresblack3[index]['groups'][index1][
                                'subGroups'
                              ][index2] = null;
                            }
                          }
                          if (this.employeeplancheck.couple) {
                            if (element1.id >= selectplan.subGroupId) {
                              this.Newplansresblack3[index]['groups'][index1][
                                'subGroups'
                              ][index2]['coverage'] = '010';
                            } else {
                              this.Newplansresblack3[index]['groups'][index1][
                                'subGroups'
                              ][index2] = null;
                            }
                          }
                          if (this.employeeplancheck.family) {
                            this.Newplansresblack3[index]['groups'][index1][
                              'subGroups'
                            ][index2] = null;
                          }

                          this.Newplansresblack3.forEach(
                            (elementres: any, index5: any) => {
                              if (!elementres || !elementres.groups) {
                              } else {
                                elementres.groups.forEach(
                                  (group: any, index6: any) => {
                                    // console.log(group)
                                    if (
                                      !this.Newplansresblack3[index5] ||
                                      !this.Newplansresblack3[index5][
                                        'groups'
                                      ] ||
                                      !this.Newplansresblack3[index5]['groups'][
                                        index6
                                      ] ||
                                      !this.Newplansresblack3[index5]['groups'][
                                        index6
                                      ]['subGroups']
                                    ) {
                                    } else {
                                      group.subGroups.forEach(
                                        (subgroups: any, index7: any) => {
                                          let validSubgroups = group[
                                            'subGroups'
                                          ].filter((v: any) => v !== null);

                                          console.log(validSubgroups);
                                          if (validSubgroups.length > 0) {
                                          } else {
                                            this.Newplansresblack3[index5][
                                              'groups'
                                            ][index6] = null;
                                            // this.plansNewBlock2.splice(index5,1)
                                          }
                                        }
                                      );
                                    }

                                    let validgroups = elementres.groups.filter(
                                      (v: any) => v !== null
                                    );

                                    console.log(validgroups);
                                    if (validgroups.length > 0) {
                                    } else {
                                      this.Newplansresblack3[index5] = null;
                                      ////////show subGroups here
                                    }
                                    //
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    }
                  });
                }
              }
            }
          });
        });
      }
    });

    console.log(this.plansresblack3);
    this.plansresblack3 = this.Newplansresblack3.filter((v: any) => v !== null);

    // console.log(this.plansresblack3)
    sessionStorage.setItem('block3result', JSON.stringify(this.plansresblack3));
  }
  public plansblock3Tiers() {
    this.plansNewBlock3Tiers = [];

    if (this.upgradeplansselectiontiers == true) {
      this.plansNewBlock3Tiers = JSON.parse(
        sessionStorage.getItem('block2resultTiers') || '[]'
      );

      // this.selectedplansblock1 = JSON.parse(
      //   sessionStorage.getItem('selectedTiersBlock2') || '[]'
      // );
      this.selectedplansblock1 = this.seelctedplanLevelTierMappingBlock2;
    } else {
      this.plansNewBlock3Tiers = JSON.parse(
        sessionStorage.getItem('plansBlock1Tiers') || '[]'
      );
      // this.selectedplansblock1 = JSON.parse(
      //   sessionStorage.getItem('selectedTiersBlock2') || '[]'
      // );
      this.selectedplansblock1 = this.seelctedplanLevelTierMappingBlock2;
    }

    console.log(this.selectedplansblock1);

    this.plansNewBlock3Tiers.forEach((packagelevel: any, index: any) => {
      if (!packagelevel) {
      } else {
        packagelevel.groups.forEach((groups: any, index1: any) => {
          this.selectedplansblock1.forEach((selectplan: any) => {
            if (
              packagelevel.id == selectplan.packageId &&
              packagelevel.groups.id == selectplan.parentId
            ) {
              if (
                !this.plansNewBlock3Tiers[index] ||
                !this.plansNewBlock3Tiers[index]['groups'] ||
                !this.plansNewBlock3Tiers[index]['groups'][index1] ||
                !this.plansNewBlock3Tiers[index]['groups'][index1]['subGroups']
              ) {
              } else {
                var allAvailble =
                  this.plansNewBlock3Tiers[index]['groups'][index1][
                    'subGroups'
                  ];

                if (
                  this.plansNewBlock3Tiers[index].id == selectplan.packageId &&
                  this.plansNewBlock3Tiers[index]['groups'][index1].id !=
                    selectplan.parentid
                ) {
                  // console.log("ignore")

                  this.plansNewBlock3Tiers[index]['groups'][index1] = null;
                } else {
                  //  console.log("oktoselect")
                  console.log(allAvailble);
                  allAvailble.forEach((element1: any, index2: any) => {
                    if (element1 != null) {
                      this.plansNewBlock3Tiers[index]['groups'][index1][
                        'subGroups'
                      ][index2].tiers = []; //here tiersmake empty Array
                      this.plansNewBlock3Tiers[index]['groups'][index1][
                        'subGroups'
                      ][index2].checked = false;
                      // if(element1.)

                      if (element1.parentId != 15) {
                        if (element1.id == selectplan.subGroupid) {
                          // this.plansNewBlock2Tiers[index]['groups'][index1][
                          //   'subGroups'
                          // ][index2] = null;    ///Here Plas Selection

                          selectplan.tiers.forEach(
                            (tiers: any, index7: any) => {
                              if (tiers.name == 'All') {
                                this.plansNewBlock3Tiers[index]['groups'][
                                  index1
                                ]['subGroups'][index2] = null;
                              }
                            }
                          );

                          this.plansNewBlock3Tiers.forEach(
                            (elementres: any, index5: any) => {
                              if (!elementres || !elementres.groups) {
                              } else {
                                elementres.groups.forEach(
                                  (group: any, index6: any) => {
                                    if (
                                      !this.plansNewBlock3Tiers[index5] ||
                                      !this.plansNewBlock3Tiers[index5][
                                        'groups'
                                      ] ||
                                      !this.plansNewBlock3Tiers[index5][
                                        'groups'
                                      ][index6] ||
                                      !this.plansNewBlock3Tiers[index5][
                                        'groups'
                                      ][index6]['subGroups']
                                    ) {
                                    } else {
                                      console.log(group);
                                      group.subGroups.forEach(
                                        (subgroups: any, index7: any) => {
                                          let validSubgroups = group[
                                            'subGroups'
                                          ].filter((v: any) => v !== null);

                                          console.log(validSubgroups);
                                          if (validSubgroups.length > 0) {
                                          } else {
                                            this.plansNewBlock3Tiers[index5][
                                              'groups'
                                            ][index6] = null;
                                            // this.plansNewBlock2.splice(index5,1)
                                          }
                                        }
                                      );
                                    }

                                    let validgroups = elementres.groups.filter(
                                      (v: any) => v !== null
                                    );

                                    console.log(validgroups);
                                    if (validgroups.length > 0) {
                                    } else {
                                      this.plansNewBlock3Tiers[index5] = null;
                                      ////////show subGroups here
                                    }
                                    //
                                  }
                                );
                              }
                            }
                          );
                        } else {
                        }
                      } else {
                        if (element1.id == selectplan.subGroupid) {
                          if (selectplan.coverage == 'Single') {
                            // if (element1.id >= selectplan.subGroupId) {
                            //   this.plansNewBlock2Tiers[index]['groups'][index1][
                            //     'subGroups'
                            //   ][index2]['coverage']="Couple"
                            // }
                            // else{
                            //   this.plansNewBlock2Tiers[index]['groups'][index1][
                            //     'subGroups'
                            //   ][index2] = null;
                            // }
                          } else if (selectplan.coverage == 'Couple') {
                            // if (element1.id >= selectplan.subGroupId) {
                            //   this.plansNewBlock2Tiers[index]['groups'][index1][
                            //     'subGroups'
                            //   ][index2]['coverage']="Family"
                            // }
                            // else{
                            //   this.plansNewBlock2Tiers[index]['groups'][index1][
                            //     'subGroups'
                            //   ][index2] = null;
                            // }
                          } else {
                            this.plansNewBlock3Tiers[index]['groups'][index1][
                              'subGroups'
                            ][index2] = null;
                          }
                          this.plansNewBlock3Tiers.forEach(
                            (elementres: any, index5: any) => {
                              if (!elementres || !elementres.groups) {
                              } else {
                                elementres.groups.forEach(
                                  (group: any, index6: any) => {
                                    if (
                                      !this.plansNewBlock3Tiers[index5] ||
                                      !this.plansNewBlock3Tiers[index5][
                                        'groups'
                                      ] ||
                                      !this.plansNewBlock3Tiers[index5][
                                        'groups'
                                      ][index6] ||
                                      !this.plansNewBlock3Tiers[index5][
                                        'groups'
                                      ][index6]['subGroups']
                                    ) {
                                    } else {
                                      console.log(group);
                                      group.subGroups.forEach(
                                        (subgroups: any, index7: any) => {
                                          let validSubgroups = group[
                                            'subGroups'
                                          ].filter((v: any) => v !== null);

                                          console.log(validSubgroups);
                                          if (validSubgroups.length > 0) {
                                          } else {
                                            this.plansNewBlock3Tiers[index5][
                                              'groups'
                                            ][index6] = null;
                                            // this.plansNewBlock2.splice(index5,1)
                                          }
                                        }
                                      );
                                    }

                                    let validgroups = elementres.groups.filter(
                                      (v: any) => v !== null
                                    );

                                    console.log(validgroups);
                                    if (validgroups.length > 0) {
                                    } else {
                                      this.plansNewBlock3Tiers[index5] = null;
                                      ////////show subGroups here
                                    }
                                    //
                                  }
                                );
                              }
                            }
                          );
                        } else {
                          // console.log("coverage"+selectplan.coverage)
                          // if(selectplan.coverage=="Single"){
                          //   if (element1.id >= selectplan.subGroupId) {
                          //     this.plansNewBlock2Tiers[index]['groups'][index1][
                          //       'subGroups'
                          //     ][index2]['coverage']="Couple"
                          //   }
                          //   else{
                          //     this.plansNewBlock2Tiers[index]['groups'][index1][
                          //       'subGroups'
                          //     ][index2] = null;
                          //   }
                          // }
                          // else if(selectplan.coverage=="Couple"){
                          //   if (element1.id >= selectplan.subGroupId) {
                          //     this.plansNewBlock2Tiers[index]['groups'][index1][
                          //       'subGroups'
                          //     ][index2]['coverage']="Family"
                          //   }
                          //   else{
                          //     this.plansNewBlock2Tiers[index]['groups'][index1][
                          //       'subGroups'
                          //     ][index2] = null;
                          //   }
                          // }
                          // else{
                          //   this.plansNewBlock2Tiers[index]['groups'][index1][
                          //     'subGroups'
                          //   ][index2] = null;
                          // }
                        }
                      }
                    }
                  });
                }
              }
            }
          });
        });
      }
    });

    console.log(this.plansNewBlock3Tiers);

    this.plansresblack3Tiers = this.plansNewBlock3Tiers;
    sessionStorage.setItem(
      'block3resultTiers',
      JSON.stringify(this.plansresblack3Tiers)
    );

    setTimeout(() => {
      const dom: HTMLElement = this.elementRef.nativeElement;

      this.plansresblack3Tiers.forEach((packagelevel: any, index: any) => {
        if (!packagelevel) {
        } else {
          packagelevel.groups.forEach((groups: any, index1: any) => {
            if (
              !this.plansresblack3Tiers[index] ||
              !this.plansresblack3Tiers[index]['groups']
            ) {
            } else {
              if (
                !this.plansresblack3Tiers[index]['groups'][index1] ||
                !this.plansresblack3Tiers[index]['groups'][index1]['subGroups']
              ) {
              } else {
                groups.subGroups.forEach((subGroups: any, index2: any) => {
                  if (
                    !this.plansresblack3Tiers[index]['groups'][index1] ||
                    !this.plansresblack3Tiers[index]['groups'][index1][
                      'subGroups'
                    ][index2]
                  ) {
                  } else {
                    // const element: any = dom.querySelector("#plancheck3" +  this.plansresblack3Tiers[index]['groups'][index1]['subGroups'][index2].id);
                    // this block is for automatic Check
                    //  element.click()
                  }
                });
              }
            }
          });
        }
      });
    }, 1000);
  }

  gotonotiernwalletInfo() {
    this.nowalletnotierInfo = false;
    this.EmployeeInfo = false;
    this.plansInfo = true;
  }
  gotoEmployeeDetails() {
    // this.basicInfo =false;
    // this.plansInfo =false;
    // this.wallettierInfo =false;
    // this.wallettierInfoandtier =false;
    this.nowalletnotierInfo = false;
    this.EmployeeInfo = true;
  }
  public configuretiers() {
    var corporateId = sessionStorage.getItem('corporateId');

    var GetTiers = '/api/ap/admin/corporate/' + corporateId + '/tiers';
    var accessToken = sessionStorage.getItem('accessToken');
    this.http
      .get(environment.apiUrl + GetTiers, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (response: any) => {
          if (response['status'] == 200) {
            this.dynamicArray = [];
            this.dynamicArrayService = [];
            this.dynamicArrayAnnualIncome = [];
            this.configureTierList = response.data;

            for (let i = 0; i < this.configureTierList.length; i++) {
              if (this.configureTierList[i].tierType == 'DEFAULT') {
                let obj = {
                  sno: i + 1,
                  tierName: this.configureTierList[i].name,
                  walletAmount: '$' + this.configureTierList[i].spendingLimit,
                  id: this.configureTierList[i].id,
                };

                this.dynamicArray.push(obj);

                console.log(this.dynamicArray);
              }
            }

            for (let j = 0; j < this.configureTierList.length; j++) {
              if (this.configureTierList[j].tierType == 'LENGTH_OF_SERVICE') {
                let el1: HTMLElement = this.lengthOfServicetrue.nativeElement;
                el1.click();
                let obj = {
                  sno: j + 1,
                  tierName: this.configureTierList[j].name,
                  from: this.configureTierList[j].fromLength,
                  to: this.configureTierList[j].toLength,
                  period: '',
                  walletAmount: '$' + this.configureTierList[j].spendingLimit,
                  id: this.configureTierList[j].id,
                };

                this.dynamicArrayService.push(obj);
              }
            }

            for (let k = 0; k < this.configureTierList.length; k++) {
              if (this.configureTierList[k].tierType == 'ANNUAL_INCOME') {
                let el1: HTMLElement = this.annualIncometrue.nativeElement;
                el1.click();
                let obj = {
                  sno: k + 1,
                  tierName: this.configureTierList[k].name,
                  percentage: this.configureTierList[k].incomePercentage,
                  from: this.configureTierList[k].fromLength,
                  to: this.configureTierList[k].toLength,
                  period: '',
                  walletAmount: '$' + this.configureTierList[k].spendingLimit,
                  id: this.configureTierList[k].id,
                };

                this.dynamicArrayAnnualIncome.push(obj);
              }
            }
          } else {
            // Swal.fire('Info',response.message)
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
              } else {
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

    this.selectedplansforTier = JSON.parse(
      sessionStorage.getItem('summaryBlock1') || '[]'
    );
  }
  public gotobasicInfo() {
    // sessionStorage.setItem("header","Home")
    this.customSelected = false;
    this.basicInfo = true;
    this.plansInfo = false;
    this.showstatus = false;
    this.showsearchbox = true;
    this.headerComponent.headerDetails('Home');
    let formData = JSON.parse(sessionStorage.getItem('formData') || '');

    // this.waitTime = formData.expectednoofEmployees;

    this.CorpName = formData.corporationName;
    this.policyStartDate =
      this.datePipe.transform(formData.PolicyStartDate, 'MM-dd-yyyy') || '';
    this.streetAddress = formData.streetAddress;
    this.streetAddress2 = formData.streetAddress2;
    this.country = formData.country;
    this.city = formData.city;
    this.province = formData.Province;
    this.postalCode = formData.postalCode;
    this.waitTime = formData.waitingPeriod;
    this.paymentInfo = formData.paymentInfo;
    this.setupWallet = formData.walletConfig;
    this.setUplevelofCoverage = formData.tierConfig;
    this.noOfEmployees = formData.expectednoofEmployees;
    // this.imagedisplay = this.uploadadminlogoimg
    const dom: HTMLElement = this.elementRef.nativeElement;

    setTimeout(() => {
      if (this.waitTime == 0) {
        const element: any = dom.querySelector('#nowaitingPeriod');
        if (element != null && element != undefined) element.click();
      } else if (this.waitTime == 3) {
        const element: any = dom.querySelector('#threemonths');
        if (element != null && element != undefined) element.click();
      } else if (this.waitTime == 6) {
        const element: any = dom.querySelector('#sixmonths');
        if (element != null && element != undefined) element.click();
      } else {
        const element: any = dom.querySelector('#customselection');
        console.log(element);
        if (element != null || element != undefined) element.click();
      }

      var reader = new FileReader();
      reader.readAsDataURL(this.uploadadminlogoimg);

      reader.onload = (_event) => {
        this.showimagelogo = false;
        this.uploadlogoafter = true;
        this.imagedisplay = reader.result;
      };
    }, 1000);
    let adminData;
    if (sessionStorage.getItem('adminData')) {
      adminData = JSON.parse(sessionStorage.getItem('adminData'));
      this.adminData = adminData;
      this.addadminform = false;
      this.showaddadmin = true;
    }

    // if (adminData) {

    // }
  }

  public gotoplansInfo() {
    this.basicInfo = false;
    this.plansInfo = true;
    this.wallettierInfo = false;
    this.wallettierInfoandtier = false;

    this.planssummary = JSON.parse(sessionStorage.getItem('planResults'));

    this.selectedplansblock1 = JSON.parse(
      sessionStorage.getItem('summaryBlock1')
    );

    if (this.planssummary) {
      // [{"packageid":"2","parentId":"14","subGroupId":"21","orderId":"18","packagename":"Mental Health & Wellness","groupname":"Wellness","subGrpname":"Mind & Body","tiers":[],"packageindex":1,"groupindex":0,"subgroupindex":2}]
      // this.planssummary.forEach((plandetails:any,index:number) => {
      //   plandetails.groups.forEach((groups:any,index1:number) => {
      //     this.selectedplansblock1.forEach((subgroup:any,index3:number) => {
      //       var allAvailble = this.planssummary[index]['groups'][index1]['subGroups'];
      //       allAvailble.forEach((element1: any, index2: any) => {
      //         if (element1 != null) {
      //           if (element1.id == subgroup.subGroupId) {
      //             setTimeout(() => {
      //               const dom: HTMLElement = this.elementRef.nativeElement;
      //               const element: any = dom.querySelector("#plancheck" + element1.id);
      //               console.log(element)
      //                 element.click()
      //             },100)
      //           }
      //         }
      //         });
      //   });
      //   });
      // });
    }
  }

  public submitwallettierInfo() {
    // this.basicInfo = false;
    // this.plansInfo = false;
    // this.wallettierInfo = false;
    // this.wallettierInfoandtier = false;
    // this.EmployeeInfo = true;
  }

  public gotoEmployeeInfo() {
    this.basicInfo = false;
    this.plansInfo = false;
    this.wallettierInfo = false;
    this.EmployeeInfo = true;
    this.datagraphInfo = false;
  }
  public submitdatagraphInfo() {
    this.basicInfo = true;
    this.plansInfo = false;
    this.wallettierInfo = false;
    this.EmployeeInfo = false;
    this.datagraphInfo = false;
  }
  invitationbroker(id: any) {
    var corporateId = sessionStorage.getItem('corporateId');
    var accessToken = sessionStorage.getItem('accessToken');
    var GetBrokers = `/api/ap/admin/corporate/${id}/invitation`;

    //https://testadminapi.groupbenefitz.aitestpro.com/api/ap/admin/corporate/1660/invitation
    this.http
      .get(environment.apiUrl + GetBrokers, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe((response: any) => {
        if (response['status'] == 200 || response['statusCode'] == 200) {
          Swal.fire({ title: 'Info', text: response.message }).then((result)=>{
            if(result.isConfirmed){
              let accessTokensession = sessionStorage.getItem('accessToken');
                var keyToPreserve = ['adminName', 'role', 'loginname','accessToken','accessToken'];

                // Get all keys from sessionStorage
                var keys = Object.keys(sessionStorage);

                // Iterate through the keys and remove them from sessionStorage, except the one to preserve
                keys.forEach(function (key) {
                  // if (key !== keyToPreserve) {
                  if (!keyToPreserve.includes(key)) {
                    sessionStorage.removeItem(key);
                  }
                });
                sessionStorage.setItem('accessToken', accessTokensession);
                window.location.reload();
                this.basicInfo = true;
                this.plansInfo = false;
                this.wallettierInfo = false;
                this.EmployeeInfo = false;
                this.datagraphInfo = false;
            }
          });
        } else {
          Swal.fire({ title: 'Error', text: response.message });
        }
      }),
      (error) => {
        Swal.fire({ title: 'Error', text: error.error.error.message });
      };
  }

  submitformlink() {
    let GroupContacts = JSON.parse(sessionStorage.getItem('adminData') || '[]');
    var corporateId = sessionStorage.getItem('corporateId');

    if (this.domainExisting) {
      this.invitationbroker(corporateId);
    } else {
      if (GroupContacts.length > 0) {
        $('#subdomains-modal').modal('show');
        var accessToken = sessionStorage.getItem('accessToken');
        var subdomains =
          '/api/ap/admin/corporate/' + corporateId + '/subDomains';

        this.http
          .get(environment.apiUrl + subdomains, {
            headers: {
              Authorization: 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            },
          })
          .subscribe(
            (response: any) => {
              if (response['status'] == 200) {
                this.SubDomains = response.data;
                this.SubDomains = this.SubDomains;
              } else {
                // Swal.fire('Error',response.message)
                Swal.fire({ title: 'Error', text: response.message||response.error });
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
                  } else {
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
      } else {
        this.adminform.reset();
        $('#groupAmdins-modal').modal('show');
      }
    }
  }

  addGroupadmin() {
    this.emailAlreadyexist = false;
    $('#groupAmdins-modal').modal('hide');
    console.log(this.adminData);
    if (this.adminform.invalid) {
      console.log(this.adminform);
      return;
    }
    console.log(JSON.stringify(this.adminform.value, null, 2));

    let obj = {
      firstName: this.capitalize(this.adminform.value.adminfirstname),
      lastName: this.capitalize(this.adminform.value.adminlastname),
      phoneNum: this.adminform.value.adminphone,
      email: this.adminform.value.adminemail,
      role: this.adminform.value.role,
      roleName:this.adminform.value.roleName
    };

    this.adminData.push(obj);
    console.log('adminData', this.adminData);

    // this.adminData = JSON.parse(sessionStorage.getItem('adminData') || '[]');
    // this.adminData = this.dummyAdminData;
    this.adminform.reset();
    this.showaddadmin = true;
    this.addadminform = false;
    sessionStorage.setItem('adminData', JSON.stringify(this.adminData));

    // this.adminData= JSON.parse(sessionStorage.getItem("adminData") || "[]")

    console.log(this.adminData);

    this.updateStatus(3);

    $('#subdomains-modal').modal('show');
    var corporateId = sessionStorage.getItem('corporateId');
    var accessToken = sessionStorage.getItem('accessToken');
    var subdomains = '/api/ap/admin/corporate/' + corporateId + '/subDomains';

    this.http
      .get(environment.apiUrl + subdomains, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (response: any) => {
          if (response['status'] == 200) {
            this.SubDomains = response.data;
          } else {
            // Swal.fire('Error',response.message)
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
              } else {
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

  subDomainConfirm() {
    if (this.subdomainName && this.subdomainName.length > 0) {
      var corporateId = sessionStorage.getItem('corporateId');
      var endPoint = '/api/ap/admin/corporate/' + corporateId + '/employee';
      var accessToken = sessionStorage.getItem('accessToken');
      var SubmitAdminInfo =
        '/api/ap/admin/v2/corporate/' +
        corporateId +
        '/signupConfirmationDuplicate';

      let accessTokensession = sessionStorage.getItem('accessToken');

      let GroupContacts = JSON.parse(
        sessionStorage.getItem('adminData') || '[]'
      );
      // let
      let dublicateGroupContacts= GroupContacts.map((groupContact)=>{
        if(groupContact.roleName==null||groupContact.roleName==undefined){
          groupContact.roleName='';
        }
        return groupContact
      });
      GroupContacts=dublicateGroupContacts;

      let obj = {
        groupadmins: GroupContacts,
        domainName: this.subdomainName,
      };

      if (GroupContacts.length > 0) {
        this.http
          .post(environment.apiUrl + SubmitAdminInfo, obj, {
            headers: {
              Authorization: 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            },
          })
          .subscribe(
            (response: any) => {
              if (response['status'] == 200) {
                $('#subdomains-modal').modal('hide');
                // Swal.fire('Success','successfully sent to admin');

                if (response.warning && response.warning.length > 0) {
                  Swal.fire({
                    title: 'Warning',
                    text: response.warning,
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'Ok',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      var role = sessionStorage.getItem('role');

                      sessionStorage.clear();
                      sessionStorage.setItem('accessToken', accessTokensession);
                      sessionStorage.setItem('role', role);
                      window.location.reload();
                      this.basicInfo = true;
                      this.plansInfo = false;
                      this.wallettierInfo = false;
                      this.EmployeeInfo = false;
                      this.datagraphInfo = false;
                    }
                  });
                } else {
                  Swal.fire({
                    title: 'Success',
                    text: 'Successfully sent to admin',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'Ok',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      var keyToPreserve = ['adminName', 'role', 'loginname','accessToken'];

                      // Get all keys from sessionStorage
                      var keys = Object.keys(sessionStorage);

                      // Iterate through the keys and remove them from sessionStorage, except the one to preserve
                      keys.forEach(function (key) {
                        // if (key !== keyToPreserve) {
                        if (!keyToPreserve.includes(key)) {
                          sessionStorage.removeItem(key);
                        }
                      });
                      sessionStorage.setItem('accessToken', accessTokensession);
                      window.location.reload();
                      this.basicInfo = true;
                      this.plansInfo = false;
                      this.wallettierInfo = false;
                      this.EmployeeInfo = false;
                      this.datagraphInfo = false;
                    }
                  });
                }
              } else {
                //  this.submitformlink()
                // Swal.fire('Error',response.message)
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
                  } else {
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
      } else {
        // Swal.fire('Please add one Group Contact');
      }
    } else {
      Swal.fire({
        title: 'Info',
        text: 'Please select subdomain for your portal',
      });
    }
  }
  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  gotoPlansorWallet() {
    this._LoaderService.ShowLoader()


    setTimeout(() => {
      this._LoaderService.HideLoader()

    }, 2000);

    let formData = JSON.parse(sessionStorage.getItem('formData') || '');

    if (formData.walletConfig == true) {
      this.basicInfo = false;
      this.plansInfo = false;
      this.wallettierInfo = true;
      this.EmployeeInfo = false;
      this.datagraphInfo = false;
      this.nowalletnotierInfo = false;




    }

    else {
      this.basicInfo = false;
      this.plansInfo = true;
      this.wallettierInfo = false;
      this.EmployeeInfo = false;
      this.datagraphInfo = false;
      this.nowalletnotierInfo = false;


      if (formData.tierConfig == false) {
        let selectedplansblock1 = JSON.parse(
          sessionStorage.getItem('summaryBlock1') || '[]'
        );
        let selectedplansblock2 = JSON.parse(
          sessionStorage.getItem('summaryBlock2') || '[]'
        );
        let selectedplansblock3 = JSON.parse(
          sessionStorage.getItem('summaryBlock3') || '[]'
        );

        this.executeBlocks1(selectedplansblock1,selectedplansblock2,selectedplansblock3)
        .then((message) => console.log(message))
        .catch((error) => console.error("An error occurred:", error));

        // setTimeout(() => {
        //   const dom: HTMLElement = this.elementRef.nativeElement;
        //   if (selectedplansblock1.length > 0) {
        //     // for (let i = 0; i < selectedplansblock1.length; i++) {
        //     //   const element: any = dom.querySelector(
        //     //     '#plancheck' + selectedplansblock1[i].subGroupId
        //     //   );
        //     //   element.click()
        //     //   setTimeout(() => {
        //     //     element.click()
        //     //   }, 10);
        //     //   // element.checked = true;
        //     //   // this.plancheckCoverage = selectedplansblock1[i].coverage;
        //     //   this.plancheckCoverage =  this.getExecutiveCoveragesFromCode(selectedplansblock1[i].coverage)

        //     //   if (this.plancheckCoverage) {
        //     //     console.log(this.plancheckCoverage);
        //     //     if (this.plancheckCoverage.single) {
        //     //       const element2: any = dom.querySelector(
        //     //         '#executiveplanssingle' + selectedplansblock1[i].subGroupId
        //     //       );
        //     //       element2.checked = true;
        //     //     } if (this.plancheckCoverage.couple) {
        //     //       const element2: any = dom.querySelector(
        //     //         '#executiveplanscouple' + selectedplansblock1[i].subGroupId
        //     //       );
        //     //       element2.checked = true;
        //     //     } if (this.plancheckCoverage.family) {
        //     //       const element2: any = dom.querySelector(
        //     //         '#executiveplansfamily' + selectedplansblock1[i].subGroupId
        //     //       );
        //     //       element2.checked = true;
        //     //     }
        //     //   }
        //     // }
        //     for (let i = 0; i < selectedplansblock1.length; i++) {
        //       const element: any = dom.querySelector(
        //         '#plancheck' + selectedplansblock1[i].subGroupId
        //       );
        //       $("#plancheck" + selectedplansblock1[i].subGroupId).prop("checked", true);


        //       // element.checked = true;
        //       // this.plancheckCoverage = selectedplansblock1[i].coverage;
        //       this.plancheckCoverage =  this.getExecutiveCoveragesFromCode(selectedplansblock1[i].coverage)

        //       if (this.plancheckCoverage) {
        //         console.log(this.plancheckCoverage);
        //         if (this.plancheckCoverage.single) {
        //           const element2: any = dom.querySelector(
        //             '#executiveplanssingle' + selectedplansblock1[i].subGroupId
        //           );
        //           $("#executiveplanssingle" + selectedplansblock1[i].subGroupId).prop("checked", true);

        //           // element2.checked = true;
        //         } if (this.plancheckCoverage.couple) {
        //           const element2: any = dom.querySelector(
        //             '#executiveplanscouple' + selectedplansblock1[i].subGroupId
        //           );
        //           $("#executiveplanscouple" + selectedplansblock1[i].subGroupId).prop("checked", true);

        //           // element2.checked = true;
        //         } if (this.plancheckCoverage.family) {
        //           const element2: any = dom.querySelector(
        //             '#executiveplansfamily' + selectedplansblock1[i].subGroupId
        //           );
        //           $("#executiveplansfamily" + selectedplansblock1[i].subGroupId).prop("checked", true);

        //           // element2.checked = true;
        //         }
        //       }
        //     }
        //   }
        //   if (selectedplansblock2.length > 0) {


        //     let el1: HTMLElement = this.upgradeplanstrue.nativeElement;
        //     el1.click();
        //     this.upgradeplansselection == true;

        //     setTimeout(() => {
        //       for (let i = 0; i < selectedplansblock2.length; i++) {
        //         const element1: any = dom.querySelector(
        //           '#plancheck2' + selectedplansblock2[i].subGroupId
        //         );
        //         $("#plancheck2" + selectedplansblock2[i].subGroupId).prop("checked", true);
        //         // element1.checked = true;
        //         this.plancheck2Coverage =  this.getExecutiveCoveragesFromCode(selectedplansblock2[i].coverage)

        //         if (
        //           this.plancheck2Coverage
        //         ) {
        //           console.log(this.plancheckCoverage);
        //           if (this.plancheck2Coverage.single) {
        //             const element2: any = dom.querySelector(
        //               '#executiveplansblock2single' +
        //                 selectedplansblock2[i].subGroupId
        //             );
        //             // element2.checked = true;
        //             $("#executiveplansblock2single" + selectedplansblock2[i].subGroupId).prop("checked", true);

        //           } if (this.plancheck2Coverage.couple) {
        //             const element2: any = dom.querySelector(
        //               '#executiveplansblock2couple' +
        //                 selectedplansblock2[i].subGroupId
        //             );
        //             // element2.checked = true;
        //             $("#executiveplansblock2couple" + selectedplansblock2[i].subGroupId).prop("checked", true);

        //           } if (this.plancheck2Coverage.family) {
        //             const element2: any = dom.querySelector(
        //               '#executiveplansblock2family' +
        //                 selectedplansblock2[i].subGroupId
        //             );
        //             // element2.checked = true;
        //             $("#executiveplansblock2family" + selectedplansblock2[i].subGroupId).prop("checked", true);

        //           }
        //         }
        //       }
        //     }, 2000);


        //                 }

        //   else{
        //     if (this.upgradeplansselection == true) {
        //       let el: HTMLElement = this.upgradeplansfalse.nativeElement;
        //       el.click();
        //       setTimeout(() => {
        //         let el1: HTMLElement = this.upgradeplanstrue.nativeElement;
        //         el1.click();

        //       }, 10);
        //     }
        //   }


        //   setTimeout(() => {
        //     if (selectedplansblock3.length > 0) {
        //       let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
        //       el1.click();
        //       this.employeeplanpurchase == true;
        //        setTimeout(() => {

        //         for (let i = 0; i < selectedplansblock3.length; i++) {
        //           const element2: any = dom.querySelector(
        //             '#plancheck3' + selectedplansblock3[i].subGroupId
        //           );
        //           $("#plancheck3" + selectedplansblock3[i].subGroupId).prop("checked", true);

        //           this.plancheck3Coverage =  this.getExecutiveCoveragesFromCode(selectedplansblock3[i].coverage)


        //           if (
        //             this.plancheck3Coverage
        //           ) {
        //             if (this.plancheck3Coverage.single) {
        //               const element2: any = dom.querySelector(
        //                 '#executiveplansblock3single' +
        //                   selectedplansblock3[i].subGroupId
        //               );
        //               $("#executiveplansblock3single" + selectedplansblock3[i].subGroupId).prop("checked", true);

        //               // element2.checked = true;
        //             } if (this.plancheck3Coverage.couple) {
        //               const element2: any = dom.querySelector(
        //                 '#executiveplansblock3couple' +
        //                   selectedplansblock3[i].subGroupId
        //               );
        //               $("#executiveplansblock3couple" + selectedplansblock3[i].subGroupId).prop("checked", true);

        //               // element2.checked = true;
        //             } if (this.plancheck3Coverage.family) {
        //               const element2: any = dom.querySelector(
        //                 '#executiveplansblock3family' +
        //                   selectedplansblock3[i].subGroupId
        //               );
        //               $("#executiveplansblock3family" + selectedplansblock3[i].subGroupId).prop("checked", true);

        //               // element2.checked = true;
        //             }
        //           }
        //         }
        //        }, 1500);
        //     }
        //     else{
        //       if (this.employeeplanpurchase == true) {
        //         let el: HTMLElement = this.employeepurchasefalse.nativeElement;
        //         el.click();
        //         setTimeout(() => {
        //           let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
        //           el1.click();
        //         }, 100);
        //       }
        //     }
        //   }, 3000);

        // }, 1000);
      }
       else {
        let selectedplansblock1 = this.seelctedplanLevelTierMapping || [];
        let selectedplansblock2 = this.seelctedplanLevelTierMappingBlock2 || [];
        let selectedplansblock3 = this.seelctedplanLevelTierMappingBlock3 || [];

        console.log(selectedplansblock1);
        console.log(selectedplansblock2);
        console.log(selectedplansblock3);

        setTimeout(() => {
          const dom: HTMLElement = this.elementRef.nativeElement;

          console.log(selectedplansblock1);
          if (selectedplansblock1.length > 0) {
            for (let i = 0; i < selectedplansblock1.length; i++) {
              const element: any = dom.querySelector(
                '#plancheck' + selectedplansblock1[i].subGroupid
              );
              element.checked = true;
              this.plancheckCoverage =  this.getExecutiveCoveragesFromCode(selectedplansblock1[i].coverage)

              // this.plancheckCoverage = selectedplansblock1[i].coverage;
              if (this.plancheckCoverage) {
                if (this.plancheckCoverage.single) {
                  const element2: any = dom.querySelector(
                    '#executiveplansTiersingle' +
                      selectedplansblock1[i].subGroupid
                  );
                  element2.checked = true;
                } if (this.plancheckCoverage.couple) {
                  const element2: any = dom.querySelector(
                    '#executiveplansTiercouple' +
                      selectedplansblock1[i].subGroupid
                  );
                  element2.checked = true;
                } if (this.plancheckCoverage.family) {
                  const element2: any = dom.querySelector(
                    '#executiveplansTierfamily' +
                      selectedplansblock1[i].subGroupid
                  );
                  element2.checked = true;
                }
              }
              this.plansBlock1Tiers[selectedplansblock1[i].packageindex][
                'groups'
              ][selectedplansblock1[i].groupindex]['subGroups'][
                selectedplansblock1[i].subgroupindex
              ].tiers = selectedplansblock1[i].tiers;
            }
          }
          if (selectedplansblock2.length > 0) {
            console.log(selectedplansblock2);
            let el1: HTMLElement = this.upgradeplanstierstrue.nativeElement;
            el1.click();
            this.upgradeplansselectiontiers == true;
            setTimeout(() => {
              for (let i = 0; i < selectedplansblock2.length; i++) {
                const element1: any = dom.querySelector(
                  '#plancheck2' + selectedplansblock2[i].subGroupid
                );
                element1.checked = true;

                this.plancheck2Coverage =  this.getExecutiveCoveragesFromCode(selectedplansblock2[i].coverage)

                if (
                  this.plancheck2Coverage
                ) {
                  console.log(this.plancheck2Coverage);
                  if (this.plancheck2Coverage.single) {
                    const element2: any = dom.querySelector(
                      '#executiveplansblock2Tiersingle' +
                        selectedplansblock2[i].subGroupid
                    );
                    element2.checked = true;
                  } else if (this.plancheck2Coverage.couple) {
                    const element2: any = dom.querySelector(
                      '#executiveplansblock2Tiercouple' +
                        selectedplansblock2[i].subGroupid
                    );
                    element2.checked = true;
                  } else if (this.plancheck2Coverage.family) {
                    const element2: any = dom.querySelector(
                      '#executiveplansblock2Tierfamily' +
                        selectedplansblock2[i].subGroupid
                    );
                    element2.checked = true;
                  }
                }
                this.plansresblack2Tiers[selectedplansblock2[i].packageindex][
                  'groups'
                ][selectedplansblock2[i].groupindex]['subGroups'][
                  selectedplansblock2[i].subgroupindex
                ].tiers = selectedplansblock2[i].tiers;
              }
            }, 1000);
          }
          if (selectedplansblock3.length > 0) {
            let el1: HTMLElement = this.employeepurchaseTierstrue.nativeElement;
            el1.click();
            this.employeeplanpurchasetiers == true;
            setTimeout(() => {
              for (let i = 0; i < selectedplansblock3.length; i++) {
                const element2: any = dom.querySelector(
                  '#plancheck3' + selectedplansblock3[i].subGroupid
                );
                element2.checked = true;
                // this.plancheck3Coverage = selectedplansblock3[i].coverage;
                this.plancheck3Coverage =  this.getExecutiveCoveragesFromCode(selectedplansblock3[i].coverage)

                if (
                  this.plancheck3Coverage
                ) {
                  if (this.plancheck3Coverage.single) {
                    const element2: any = dom.querySelector(
                      '#executiveplansblock3Tiersingle' +
                        selectedplansblock3[i].subGroupid
                    );
                    element2.checked = true;
                  } else if (this.plancheck3Coverage.couple) {
                    const element2: any = dom.querySelector(
                      '#executiveplansblock3Tiercouple' +
                        selectedplansblock3[i].subGroupid
                    );
                    element2.checked = true;
                  } else if (this.plancheck3Coverage.family) {
                    const element2: any = dom.querySelector(
                      '#executiveplansblock3Tierfamily' +
                        selectedplansblock3[i].subGroupid
                    );
                    element2.checked = true;
                  }
                }
                this.plansresblack3Tiers[selectedplansblock3[i].packageindex][
                  'groups'
                ][selectedplansblock3[i].groupindex]['subGroups'][
                  selectedplansblock3[i].subgroupindex
                ].tiers = selectedplansblock3[i].tiers;
              }
            }, 1500);
          }
        }, 1000);
      }

      setTimeout(() => {

        let block1res = JSON.parse(
          sessionStorage.getItem('summaryBlock1') || '[]');



        for(let i=0;i<block1res.length;i++){
          if(block1res[i].subGroupId == 17){

            $('#executiveplanssingle17').prop('disabled', false);
            $('#executiveplanscouple17').prop('disabled', false);
            $('#executiveplansfamily17').prop('disabled', false);
          }
          else{

            $('#executiveplanssingle17').prop('disabled', true);
            $('#executiveplanscouple17').prop('disabled', true);
            $('#executiveplansfamily17').prop('disabled', true);
          }
          if(block1res[i].subGroupId == 18){
            $('#executiveplanssingle18').prop('disabled', false);
            $('#executiveplanscouple18').prop('disabled', false);
            $('#executiveplansfamily18').prop('disabled', false);
          }
          else{
            $('#executiveplanssingle18').prop('disabled', true);
            $('#executiveplanscouple18').prop('disabled', true);
            $('#executiveplansfamily18').prop('disabled', true);
          }
          // if(block1res[i].subGroupId == 17 && block1res[i].subGroupId == 18 ){

          // }
          // else{
          //   $('#executiveplanssingle17').prop('disabled', true);
          //   $('#executiveplanscouple17').prop('disabled', true);
          //   $('#executiveplansfamily17').prop('disabled', true);
          //   $('#executiveplanssingle18').prop('disabled', true);
          //   $('#executiveplanscouple18').prop('disabled', true);
          //   $('#executiveplansfamily18').prop('disabled', true);
          // }
        }

      }, 100);

    }
  }

  executeBlocks1(selectedplansblock1,selectedplansblock2,selectedplansblock3) {
    return new Promise((resolve, reject) => {
      // First block of code
      console.log("Executing block 1");

      for(let i=0;i<selectedplansblock1.length;i++){
        setTimeout(() => {
          $("#plancheck" + selectedplansblock1[i].subGroupId).prop("checked", true);
          this.plancheckCoverage =  this.getExecutiveCoveragesFromCode(selectedplansblock1[i].coverage)

          if (this.plancheckCoverage) {
            console.log(this.plancheckCoverage);
            if (this.plancheckCoverage.single) {

              $("#executiveplanssingle" + selectedplansblock1[i].subGroupId).prop("checked", true);

              // element2.checked = true;
            } if (this.plancheckCoverage.couple) {

              $("#executiveplanscouple" + selectedplansblock1[i].subGroupId).prop("checked", true);

              // element2.checked = true;
            } if (this.plancheckCoverage.family) {

              $("#executiveplansfamily" + selectedplansblock1[i].subGroupId).prop("checked", true);

              // element2.checked = true;
            }
          }

          if (i === selectedplansblock1.length-1) {
            // Second block of code

            console.log("Executing block 2");


            setTimeout(() => {
              if(selectedplansblock2.length>0){
                let el1: HTMLElement = this.upgradeplanstrue.nativeElement;
            el1.click();
            this.upgradeplansselection == true;

                for(let j=0;j<selectedplansblock2.length;j++){
                  setTimeout(() => {
                    $("#plancheck2" + selectedplansblock2[j].subGroupId).prop("checked", true);
                    // element1.checked = true;
                    this.plancheck2Coverage =  this.getExecutiveCoveragesFromCode(selectedplansblock2[j].coverage)

                    if (
                      this.plancheck2Coverage
                    ) {
                      console.log(this.plancheckCoverage);
                      if (this.plancheck2Coverage.single) {
                        $("#executiveplansblock2single" + selectedplansblock2[j].subGroupId).prop("checked", true);

                      } if (this.plancheck2Coverage.couple) {
                        $("#executiveplansblock2couple" + selectedplansblock2[j].subGroupId).prop("checked", true);

                      } if (this.plancheck2Coverage.family) {
                        $("#executiveplansblock2family" + selectedplansblock2[j].subGroupId).prop("checked", true);

                      }
                    }
                    console.log(`Block 2 - Task ${j + 1} completed`);
                    if (j === selectedplansblock2.length-1) {
                      // Third block of code
                      console.log("Executing block 3");

                    setTimeout(() => {
                      if(selectedplansblock3.length>0){
                              let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
                              if(el1!=null) el1.click();
                              this.employeeplanpurchase == true
                              for(let k=0;k<selectedplansblock3.length;k++){
                                setTimeout(() => {
                                  $("#plancheck3" + selectedplansblock3[k].subGroupId).prop("checked", true);

                                  this.plancheck3Coverage =  this.getExecutiveCoveragesFromCode(selectedplansblock3[k].coverage)


                                  if (
                                    this.plancheck3Coverage
                                  ) {
                                    if (this.plancheck3Coverage.single) {

                                      $("#executiveplansblock3single" + selectedplansblock3[k].subGroupId).prop("checked", true);

                                      // element2.checked = true;
                                    } if (this.plancheck3Coverage.couple) {

                                      $("#executiveplansblock3couple" + selectedplansblock3[k].subGroupId).prop("checked", true);

                                      // element2.checked = true;
                                    } if (this.plancheck3Coverage.family) {

                                      $("#executiveplansblock3family" + selectedplansblock3[k].subGroupId).prop("checked", true);

                                      // element2.checked = true;
                                    }
                                  }
                                  console.log(`Block 3 - Task ${k + 1} completed`);
                                  if (k === selectedplansblock3.length-1) {
                                    resolve("All blocks executed successfully");
                                  }
                                }, 1500);
                              }
                      }
                    }, 1000);

                    }
                  }, 1000);
                }
              }
              if(selectedplansblock2.length==0 && selectedplansblock3.length>0){
                let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
                if(el1!=null) el1.click();
                this.employeeplanpurchase == true
                for(let k=0;k<selectedplansblock3.length;k++){
                  setTimeout(() => {
                    $("#plancheck3" + selectedplansblock3[k].subGroupId).prop("checked", true);

                    this.plancheck3Coverage =  this.getExecutiveCoveragesFromCode(selectedplansblock3[k].coverage)


                    if (
                      this.plancheck3Coverage
                    ) {
                      if (this.plancheck3Coverage.single) {

                        $("#executiveplansblock3single" + selectedplansblock3[k].subGroupId).prop("checked", true);

                        // element2.checked = true;
                      } if (this.plancheck3Coverage.couple) {

                        $("#executiveplansblock3couple" + selectedplansblock3[k].subGroupId).prop("checked", true);

                        // element2.checked = true;
                      } if (this.plancheck3Coverage.family) {

                        $("#executiveplansblock3family" + selectedplansblock3[k].subGroupId).prop("checked", true);

                        // element2.checked = true;
                      }
                    }
                    console.log(`Block 3 - Task ${k + 1} completed`);
                    if (k === selectedplansblock3.length-1) {
                      resolve("All blocks executed successfully");
                    }
                  }, 1500);
                }
        }
            }, 1000);





          }
        }, 1000);
      }
    });
  }

  showdatagrpah(employeelist) {
    console.log(employeelist);

    // alert(this.applicationStatus)

    this.addedEmployeelist = employeelist;

    this.employeeList = employeelist;
    this.basicInfo = false;
    this.plansInfo = false;
    this.wallettierInfo = false;
    this.EmployeeInfo = false;
    this.datagraphInfo = true;
    this.nowalletnotierInfo = false;
    this.updateAllStatus();
  }

  updateStatus(id: number) {
    let i = this.adminStatuslist.findIndex((status) => status.id == id);

    if (id == 1) {
      //address -- province
      if (
        this.clientregform.value.streetAddress &&
        this.clientregform.value.country &&
        this.clientregform.value.city &&
        this.clientregform.value.Province &&
        this.clientregform.value.postalCode
      ) {
        if (this.adminStatuslist[i].id == 1) {
          this.adminStatuslist[i].checked = true;
          //statusChangeCounter++;
          //this.add()
        }
      } else {
        if (this.adminStatuslist[i].id == 1) {
          this.adminStatuslist[i].checked = false;
          //statusChangeCounter++;
          //this.add()
        }
      }
    }

    if (id == 2) {
      console.log('poclist date changed---update!?');
      //policy start date
      if (this.clientregform.value.PolicyStartDate) {
        if (this.adminStatuslist[i].id == 2) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 2) {
          this.adminStatuslist[i].checked = false;
        }
      }
    }

    if (id == 3) {
      if (this.adminData.length > 0) {
        if (this.adminStatuslist[i].id == 3) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 3) {
          this.adminStatuslist[i].checked = false;
        }
      }
    }

    if (id == 4) {
      if (this.clientregform.value.waitingPeriod) {
        if (this.adminStatuslist[i].id == 4) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 4) {
          this.adminStatuslist[i].checked = false;
        }
      }
    }
    if (id == 5) {
      if (this.clientregform.value.paymentInfo) {
        if (this.adminStatuslist[i].id == 5) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 5) {
          this.adminStatuslist[i].checked = false;
        }
      }
    }

    if (id == 6) {
      if (this.clientregform.value.corporatelogo) {
        if (this.adminStatuslist[i].id == 6) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 6) {
          this.adminStatuslist[i].checked = false;
        }
      }
    }

    if (id == 7) {
      if (this.clientregform.value.walletConfig) {
        if (this.adminStatuslist[i].id == 7) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 7) {
          this.adminStatuslist[i].checked = true;
        }
      }
    }

    if (id == 8) {
      if (this.clientregform.value.tierConfig) {
        if (this.adminStatuslist[i].id == 8) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 8) {
          this.adminStatuslist[i].checked = true;
        }
      }
    }

    if (id == 9) {
      if (this.paidByCompany.length > 0) {
        if (this.adminStatuslist[i].id == 9) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 9) {
          this.adminStatuslist[i].checked = false;
        }
      }
    }

    if (id == 10) {
      if (this.employeeList.length > 0) {
        if (this.adminStatuslist[i].id == 10) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 10) {
          this.adminStatuslist[i].checked = false;
        }
      }
    }

    //last after all status
    this.add();
  }
  updateAllStatus() {
    console.log(this.adminData);
    for (let i = 0; i < this.adminStatuslist.length; i++) {
      if (
        this.clientregform.value.streetAddress &&
        this.clientregform.value.country &&
        this.clientregform.value.city &&
        this.clientregform.value.Province &&
        this.clientregform.value.postalCode
      ) {
        if (this.adminStatuslist[i].id == 1) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 1) {
          this.adminStatuslist[i].checked = false;
        }
      }
      if (this.clientregform.value.PolicyStartDate) {
        if (this.adminStatuslist[i].id == 2) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 2) {
          this.adminStatuslist[i].checked = false;
        }
      }

      if (this.adminData.length > 0) {
        if (this.adminStatuslist[i].id == 3) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 3) {
          this.adminStatuslist[i].checked = false;
        }
      }
      if (this.clientregform.value.waitingPeriod) {
        if (this.adminStatuslist[i].id == 4) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 4) {
          this.adminStatuslist[i].checked = false;
        }
      }

      if (this.clientregform.value.paymentInfo) {
        if (this.adminStatuslist[i].id == 5) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 5) {
          this.adminStatuslist[i].checked = false;
        }
      }
      if (this.clientregform.value.corporatelogo) {
        if (this.adminStatuslist[i].id == 6) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 6) {
          this.adminStatuslist[i].checked = false;
        }
      }

      if (this.clientregform.value.walletConfig) {
        if (this.adminStatuslist[i].id == 7) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 7) {
          this.adminStatuslist[i].checked = true;
        }
      }

      if (this.clientregform.value.tierConfig) {
        if (this.adminStatuslist[i].id == 8) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 8) {
          this.adminStatuslist[i].checked = true;
        }
      }

      console.log(this.paidByCompany);
      if (this.paidByCompany.length > 0) {
        if (this.adminStatuslist[i].id == 9) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 9) {
          this.adminStatuslist[i].checked = false;
        }
      }
      if (this.employeeList.length > 0) {
        if (this.adminStatuslist[i].id == 10) {
          this.adminStatuslist[i].checked = true;
        }
      } else {
        if (this.adminStatuslist[i].id == 10) {
          this.adminStatuslist[i].checked = false;
        }
      }
    }

    this.add();

    //this.add()
  }

  public add() {
    //re-order them by color --- red // black
    let redStatus = this.adminStatuslist.filter(
      (status) => status.color == 'red'
    );
    let blackStatus = this.adminStatuslist.filter(
      (status) => status.color == 'black'
    );
    this.adminStatuslist = redStatus.concat(blackStatus);

    var t = this.adminStatuslist.filter((opt) => opt.checked).map((opt) => opt);
    console.log(t);
    this.lengthofstatus = t.length;
    this.applicationStatus = this.lengthofstatus;
    this.headerComponent.applicationStatus(this.lengthofstatus);
  }
  showemployeepage(event) {
    console.log(event);
    this.selectedWalletConfig = event.payForService;
    this.basicInfo = false;
    this.plansInfo = false;
    this.wallettierInfo = false;
    this.EmployeeInfo = true;
    this.datagraphInfo = false;
    this.nowalletnotierInfo = false;
  }

  public getExecutiveCoveragesFromCode(code: string) {
    let coverage;

    if (code) {
      coverage = { single: false, couple: false, family: false };
      if (code[0] == '1') {
        coverage.family = true;
      }
      if (code[1] == '1') {
        coverage.couple = true;
      }
      if (code[2] == '1') {
        coverage.single = true;
      }
    } else {
      coverage = null;
    }

    return coverage;
  }
  gotoplanspagefromwallet() {
    let formData = JSON.parse(sessionStorage.getItem('formData') || '');

    this.basicInfo = false;
    this.plansInfo = true;
    this.wallettierInfo = false;
    this.EmployeeInfo = false;
    this.datagraphInfo = false;
    this.nowalletnotierInfo = false;

    if (formData.tierConfig == false) {
      let selectedplansblock1 = JSON.parse(
        sessionStorage.getItem('summaryBlock1') || '[]'
      );
      let selectedplansblock2 = JSON.parse(
        sessionStorage.getItem('summaryBlock2') || '[]'
      );
      let selectedplansblock3 = JSON.parse(
        sessionStorage.getItem('summaryBlock3') || '[]'
      );

      setTimeout(() => {
        const dom: HTMLElement = this.elementRef.nativeElement;
        if (selectedplansblock1.length > 0) {
          for (let i = 0; i < selectedplansblock1.length; i++) {
            const element: any = dom.querySelector(
              '#plancheck' + selectedplansblock1[i].subGroupId
            );
            // element.checked = true;
            element.click();

            setTimeout(() => {
              element.click();
            }, 10);
            // this.plancheckCoverage = selectedplansblock1[i].coverage;

            this.plancheckCoverage = this.getExecutiveCoveragesFromCode(
              selectedplansblock1[i].coverage
            );

            // {single: true, couple: true, family: false}
            if (this.plancheckCoverage) {
              // console.log(this.plancheckCoverage['single']);

              console.log(this.plancheckCoverage.single);
              if (this.plancheckCoverage.single) {
                const element2: any = dom.querySelector(
                  '#executiveplanssingle' + selectedplansblock1[i].subGroupId
                );
                element2.checked = true;
              }
              if (this.plancheckCoverage.couple) {
                const element2: any = dom.querySelector(
                  '#executiveplanscouple' + selectedplansblock1[i].subGroupId
                );
                element2.checked = true;
              }
              if (this.plancheckCoverage.family) {
                const element2: any = dom.querySelector(
                  '#executiveplansfamily' + selectedplansblock1[i].subGroupId
                );
                element2.checked = true;
              }
            }
          }
        }
        if (selectedplansblock2.length > 0) {
          let el1: HTMLElement = this.upgradeplanstrue.nativeElement;
          el1.click();
          this.upgradeplansselection == true;
          setTimeout(() => {
            for (let i = 0; i < selectedplansblock2.length; i++) {
              const element1: any = dom.querySelector(
                '#plancheck2' + selectedplansblock2[i].subGroupId
              );
              element1.checked = true;
              // this.plancheck2Coverage = selectedplansblock2[i].coverage;
              this.plancheck2Coverage = this.getExecutiveCoveragesFromCode(
                selectedplansblock2[i].coverage
              );

              if (this.plancheck2Coverage) {
                if (this.plancheck2Coverage.single) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock2single' +
                      selectedplansblock2[i].subGroupId
                  );
                  element2.checked = true;
                }
                if (this.plancheck2Coverage.couple) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock2couple' +
                      selectedplansblock2[i].subGroupId
                  );
                  element2.checked = true;
                } else if (this.plancheck2Coverage.family) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock2family' +
                      selectedplansblock2[i].subGroupId
                  );
                  element2.checked = true;
                }
              }
            }
          }, 1000);
        } else {
          if (this.upgradeplansselection == true) {
            // let el: HTMLElement = this.upgradeplansfalse.nativeElement;
            // el.click();
            setTimeout(() => {
              let el1: HTMLElement = this.upgradeplanstrue.nativeElement;
              el1.click();
            }, 10);
          }
        }
        if (selectedplansblock3.length > 0) {
          let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
          el1.click();
          this.employeeplanpurchase == true;
          setTimeout(() => {
            for (let i = 0; i < selectedplansblock3.length; i++) {
              const element2: any = dom.querySelector(
                '#plancheck3' + selectedplansblock3[i].subGroupId
              );
              element2.checked = true;
              this.plancheck3Coverage = this.getExecutiveCoveragesFromCode(
                selectedplansblock3[i].coverage
              );

              // this.plancheck3Coverage = selectedplansblock3[i].coverage;

              if (this.plancheck3Coverage) {
                if (this.plancheck3Coverage.single) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock3single' +
                      selectedplansblock3[i].subGroupId
                  );
                  element2.checked = true;
                }
                if (this.plancheck3Coverage.couple) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock3couple' +
                      selectedplansblock3[i].subGroupId
                  );
                  element2.checked = true;
                }
                if (this.plancheck3Coverage.family) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock3family' +
                      selectedplansblock3[i].subGroupId
                  );
                  element2.checked = true;
                }
              }
            }
          }, 1500);
        } else {
          if (this.employeeplanpurchase == true) {
            // let el: HTMLElement = this.employeepurchasefalse.nativeElement;
            // el.click();
            setTimeout(() => {
              let el1: HTMLElement = this.employeepurchasetrue.nativeElement;
              el1.click();
            }, 10);
          }
        }
      }, 1000);
    } else {
      let selectedplansblock1 = this.seelctedplanLevelTierMapping || [];
      let selectedplansblock2 = this.seelctedplanLevelTierMappingBlock2 || [];
      let selectedplansblock3 = this.seelctedplanLevelTierMappingBlock3 || [];

      setTimeout(() => {
        const dom: HTMLElement = this.elementRef.nativeElement;

        console.log(selectedplansblock1);
        if (selectedplansblock1.length > 0) {
          for (let i = 0; i < selectedplansblock1.length; i++) {
            const element: any = dom.querySelector(
              '#plancheck' + selectedplansblock1[i].subGroupid
            );
            element.checked = true;
            this.plancheckCoverage = this.getExecutiveCoveragesFromCode(
              selectedplansblock1[i].coverage
            );

            // this.plancheckCoverage = selectedplansblock1[i].coverage;
            if (this.plancheckCoverage) {
              if (this.plancheckCoverage.single) {
                const element2: any = dom.querySelector(
                  '#executiveplansTiersingle' +
                    selectedplansblock1[i].subGroupid
                );
                element2.checked = true;
              }
              if (this.plancheckCoverage.couple) {
                const element2: any = dom.querySelector(
                  '#executiveplansTiercouple' +
                    selectedplansblock1[i].subGroupid
                );
                element2.checked = true;
              }
              if (this.plancheckCoverage.family) {
                const element2: any = dom.querySelector(
                  '#executiveplansTierfamily' +
                    selectedplansblock1[i].subGroupid
                );
                element2.checked = true;
              }
            }
            this.plansBlock1Tiers[selectedplansblock1[i].packageindex][
              'groups'
            ][selectedplansblock1[i].groupindex]['subGroups'][
              selectedplansblock1[i].subgroupindex
            ].tiers = selectedplansblock1[i].tiers;
          }
        }
        if (selectedplansblock2.length > 0) {
          console.log(selectedplansblock2);
          let el1: HTMLElement = this.upgradeplanstierstrue.nativeElement;
          el1.click();
          this.upgradeplansselectiontiers == true;
          setTimeout(() => {
            for (let i = 0; i < selectedplansblock2.length; i++) {
              const element1: any = dom.querySelector(
                '#plancheck2' + selectedplansblock2[i].subGroupid
              );
              element1.checked = true;

              this.plancheck2Coverage = this.getExecutiveCoveragesFromCode(
                selectedplansblock2[i].coverage
              );

              if (this.plancheck2Coverage) {
                console.log(this.plancheck2Coverage);
                if (this.plancheck2Coverage.single) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock2Tiersingle' +
                      selectedplansblock2[i].subGroupid
                  );
                  element2.checked = true;
                } else if (this.plancheck2Coverage.couple) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock2Tiercouple' +
                      selectedplansblock2[i].subGroupid
                  );
                  element2.checked = true;
                } else if (this.plancheck2Coverage.family) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock2Tierfamily' +
                      selectedplansblock2[i].subGroupid
                  );
                  element2.checked = true;
                }
              }
              this.plansresblack2Tiers[selectedplansblock2[i].packageindex][
                'groups'
              ][selectedplansblock2[i].groupindex]['subGroups'][
                selectedplansblock2[i].subgroupindex
              ].tiers = selectedplansblock2[i].tiers;
            }
          }, 1000);
        }
        if (selectedplansblock3.length > 0) {
          let el1: HTMLElement = this.employeepurchaseTierstrue.nativeElement;
          el1.click();
          this.employeeplanpurchasetiers == true;
          setTimeout(() => {
            for (let i = 0; i < selectedplansblock3.length; i++) {
              const element2: any = dom.querySelector(
                '#plancheck3' + selectedplansblock3[i].subGroupid
              );
              element2.checked = true;
              // this.plancheck3Coverage = selectedplansblock3[i].coverage;
              this.plancheck3Coverage = this.getExecutiveCoveragesFromCode(
                selectedplansblock3[i].coverage
              );

              if (this.plancheck3Coverage) {
                if (this.plancheck3Coverage.single) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock3Tiersingle' +
                      selectedplansblock3[i].subGroupid
                  );
                  element2.checked = true;
                } else if (this.plancheck3Coverage.couple) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock3Tiercouple' +
                      selectedplansblock3[i].subGroupid
                  );
                  element2.checked = true;
                } else if (this.plancheck3Coverage.family) {
                  const element2: any = dom.querySelector(
                    '#executiveplansblock3Tierfamily' +
                      selectedplansblock3[i].subGroupid
                  );
                  element2.checked = true;
                }
              }
              this.plansresblack3Tiers[selectedplansblock3[i].packageindex][
                'groups'
              ][selectedplansblock3[i].groupindex]['subGroups'][
                selectedplansblock3[i].subgroupindex
              ].tiers = selectedplansblock3[i].tiers;
            }
          }, 1500);
        }
      }, 1000);
    }
  }
  phonenumbercheck(event) {
    // console.log(event)
    this.formatPhoneNumber(event.target.value);
  }
  formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  }

  phoneFormat(event: any) {
    const inputValue = this.adminform.get('adminphone').value;

    this.adminform
      .get('adminphone')
      .setValue(this.phoneNoFormat.transform(inputValue), { emitEvent: false });
  }
  alphabatesOnly(event: any) {
    const charCode = event.which ? event.which : event.keyCode;

    if (event.currentTarget.value.length == 0) {
      if (
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122) ||
        (charCode >= 192 && charCode <= 255) ||
        charCode == 46 ||
        charCode == 45 ||
        charCode == 39 ||
        charCode == 95
      )
        return true;
      else return false;
    } else {
      if (
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122) ||
        (charCode >= 192 && charCode <= 255) ||
        charCode === 32 ||
        charCode == 46 ||
        charCode == 45 ||
        charCode == 39 ||
        charCode == 95
      )
        return true;
      else return false;
    }
  }

  alphaNumarics(event: any) {
    const charCode = event.which ? event.which : event.keyCode;

    if (event.currentTarget.value.length === 0) {
      if (
        (charCode >= 48 && charCode <= 57) || // Numbers
        (charCode >= 65 && charCode <= 90) || // Uppercase letters
        (charCode >= 97 && charCode <= 122) || // Lowercase letters
        (charCode >= 192 && charCode <= 255) ||
        charCode === 46 ||
        charCode === 45 ||
        charCode === 39 ||
        charCode === 95
      )
        return true;
      else return false;
    } else {
      if (
        (charCode >= 48 && charCode <= 57) || // Numbers
        (charCode >= 65 && charCode <= 90) || // Uppercase letters
        (charCode >= 97 && charCode <= 122) || // Lowercase letters
        (charCode >= 192 && charCode <= 255) ||
        charCode === 32 ||
        charCode === 46 ||
        charCode == 47 ||
        charCode === 45 ||
        charCode === 39 ||
        charCode === 95
      )
        return true;
      else return false;
    }
  }
  textChangeToLowerCase(formcontrolField: any) {
    this.f[formcontrolField].setValue(
      this.f[formcontrolField].value.toLowerCase()
    );
    console.log('qwertytrty     ', this.f[formcontrolField].value);
  }
  changeAdminRole(event: any) {
    if (event.target.value == 'CORPORATE_OTHERS') {
      this.showOtherField = true;
      // this.adminform.get('roleName').setValidators(Validators.required);
      this.adminform.get('roleName').updateValueAndValidity();
    } else {
      this.showOtherField = false;
      this.adminform.get('roleName').clearValidators();
      this.adminform.get('roleName').updateValueAndValidity();
    }
  }

  
  exportAsExcel(){

    let employeedata = [

      {
        label: 'First Name',
        header:'First Name',
        key: 'firstName',
        mandatory: true,
        display: true,
      },
      {
        label: 'Last Name',
        header: 'Last Name',
        key: 'lastName',
        mandatory: true,
        display: true,
      },
      {
        label: 'Email',
        header: 'Email',
        key: 'email',
        mandatory: true,
        display: true,
      },
      {
        label :'Phone Number',
        header : 'Phone Number',
        key :'phoneNumber',
        dispaly :true,
        mandatory :true,
      }
    ];
    var obj: any = {};
    let excelempdata=[];
    for (let i = 0; i < employeedata.length; i++) {
      obj[employeedata[i].label] = '';
      excelempdata.push(obj);
    }
      var finalres = Object.values(
      excelempdata.reduce((c, e) => {
        if (!c[e.Email]) c[e.Email] = e;
        return c;
      }, {})
    );
    let finalemployeekeys = finalres;
    this.excelService.exportAsExcelFilePlans(finalemployeekeys,employeedata,'Employee Details');



  }

  onFileChangeExcel(ev: any) {

    console.log(ev)
    let workBook: any = null;
    let jsonData = [];
    const reader = new FileReader();

    const file = ev.target.files[0];
    reader.readAsArrayBuffer(file)
    reader.onload = async (event) => {
      const data = reader.result;
      const wb = await this.excelService.readDataFromExcel(data);
      const employeeSheet = wb.getWorksheet(this.excelService.EXCEL_SHEETNAME);
      console.log(employeeSheet);
      // read first row as data keys
      if (employeeSheet) {
        let firstRow = employeeSheet.getRow(1);
        console.log(firstRow)
        if (!firstRow.cellCount) return;
        let keys = firstRow.values;
        console.log(keys)
        let ExceldataError = false
        let ExceldataErrorMessage = ''
        employeeSheet.eachRow((row, rowNumber) => {
          if (rowNumber == 1) return;
          let values = row.values;
          let obj = {};
          //@ts-ignore
          //@ts-ignore
          for (let i = 1; i < keys.length; i++) {
            if(ExceldataError){
              break;
            }
            if(keys[i]){
              let value=values[i]
              // if(value==""){
                this.myFileInput.nativeElement.value = '';

              // }
              switch(keys[i]){
                case "First Name":
                  if(value && value !=''){

                    if(value.text && value.text.length){
                      value= value.text.charAt(0).toUpperCase() + value.text.slice(1)
                    }
                    else{
                      value= value.charAt(0).toUpperCase() + value.slice(1)
                    }
                  if(value.length <= 3){
                    ExceldataError=true;
                    ExceldataErrorMessage="First Name must be minimum of 3 characters, please check"
                    break;
                  }
                  }
                  else{
                    console.log(value)
                    ExceldataError =true
                    ExceldataErrorMessage = "First Name can't be empty"
                    break;
                  }
                  break;
                  case "Last Name":
                    if(value && value !=''){
                      if(value.text && value.text.length){
                        value= value.text.charAt(0).toUpperCase() + value.text.slice(1)
                      }
                      else{
                        value= value.charAt(0).toUpperCase() + value.slice(1)
                      }
                      if(value.length <= 3){
                        ExceldataError=true;
                        ExceldataErrorMessage="Last Name must be minimum of 3 characters, please check";
                        break;
                      }
                    }
                    else{
                      ExceldataError =true;
                      ExceldataErrorMessage = "Last Name can't be empty"
                      break;
                    }
                    break;

                case "Email":
                  if(value && value !=''){
                    // value=value.text
                  if(value.text && value.text.length){
                    value= value.text.charAt(0).toLowerCase() + value.text.slice(1)
                  }
                  else{
                    value= value.charAt(0).toLowerCase() + value.slice(1)
                  }
                  // var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  var filter=this.commonPatternsService.emailTestPattern;
                  if (!filter.test(value)) {
                      // ExceldataemailError =true;
                      ExceldataError=true;
                      ExceldataErrorMessage="Some fields have invalid email, please check"
                  break;
                  }

                  }
                  else{
                    ExceldataError =true;
                    ExceldataErrorMessage ="Email can't be empty."
                    break;
                  }
                break;
              }
              obj[keys[i]] = value;
            }

          }

          jsonData.push(obj);
        });
        if(ExceldataError){

          Swal.fire({title:'Error'
          ,text:ExceldataErrorMessage
        }).then((result) => {
          if (result.isConfirmed) {
            this.myFileInput.nativeElement.value = '';
          }
        });
          jsonData =[]
        }
      } else {
        //tampered excel error
      }

      console.log(jsonData);

      let uploadEmployeeData = jsonData;

      console.log(uploadEmployeeData);
    };
   // reader.readAsBinaryString(file);
  }



  dateFormat(dateFormat: any): any {
    throw new Error('Method not implemented.');
  }

  updateTotal(index:any,event:any){
     let val=event.target.value;
     let unnitPrice;
     if(index==0)
     unnitPrice=5
    else if(index==1)
    unnitPrice=10;
  else if(index==2)
  unnitPrice=15;
    
    let subTotal=val*unnitPrice;
    let tax=subTotal*0.13;
    let total=subTotal+tax;
    document.getElementById('tax_'+index).innerHTML="$"+tax.toFixed(2);
    document.getElementById('total_'+index).innerHTML="$"+total.toFixed(2);
    document.getElementById('subtotal_'+index).innerHTML="$"+subTotal.toFixed(2); 
  }
}

export function postalcodeValidator(control: AbstractControl) {
  var postalRegexp = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/gm;
  if (control.value && !postalRegexp.test(control.value)) {
    return { invalidPostalCode: true };
  }
  return null;
}

// export function postalcodeValidator1(value) {

//   if(value==true){
//     return { invalidpostalcodeprivince: true };
//   }else{
//     return { invalidpostalcodeprivince: false };
//   }

// }
