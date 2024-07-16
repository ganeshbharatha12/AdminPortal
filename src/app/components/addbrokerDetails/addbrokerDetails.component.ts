import { Modal } from 'bootstrap';
import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ClipboardService } from 'ngx-clipboard'
import { ToastrService } from "ngx-toastr";
import { PhoneFormatPipe } from "../../pipes/phone-format.pipe";
import { salesTrackingFormater } from 'src/app/pipes/SalesTrackingcode-formar';
import { SalestrackingcodePipe } from 'src/app/pipes/salestrackingcode.pipe';
// import{seles}
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'app-addbrokerDetails',
  templateUrl: './addbrokerDetails.component.html',
  styleUrls: ['./addbrokerDetails.component.css'],
  providers: [DatePipe,PhoneFormatPipe,salesTrackingFormater,SalestrackingcodePipe],
})
export class AddbrokerDetailsComponent implements OnInit {
  adminName: any;
  todayDate:any;
  public id: string;
  showaddadmin = false;
  showformtype = false;
  showaddform = false;
  addlicenseform = true;
  showaddEOdetails =false;
  addEOform  = true
  isEditable = true;
  enableEditIndex =null;

  isEditableForm =true;
  enableEditIndexForm =null;

  isChecked: boolean = true;
  formTitle:any;
  formDescription:any;
  showFormsDetails =false;
  editFormType:any;
  editFormName:any;
  editFormDescription:any;
  editFormlink:any;
  editFormlogo:any;
  editFormdisplaylogo:any;
  editFormDisclousreAggrement:any;

  addlicenseformtable = false;
  addlicenseformData: Array<any> = [];
  addeofromDetails:any;
  planLevels:any=[];
  addformDetails: Array<any> = [];
  fromplansarry: Array<any> = [];
  finalSummaryData: Array<any> = [];
  finalSummaryDataEOinsurance: Array<any> = [];
  finalSummaryDatalicense: Array<any> = [];
  brokerCommissions: Array<any> = [];
  finalSummaryDataForm:Array<any> = [];
  finalSummaryBrookerData:any;
  finalSummaryBrookerDataName:any;
  finalSummaryBrookerDataid:any;
  finalSumamryBrokerType:any;
  finalSumamryBrokersalesTrackingCode:any;
  finalSummaryBrookerDataBrokerType:any;
  editindex: any;
  showimagelogo = true;
  showdisclosureaggrement = true;
  showparentlogocondition = false;
  showparentformlogocondition = false;
  showparentdisclosurecondition = false;
  showsales_tracking_code = false;
  showsalestrackinCodeAuto = false;
  imagedisplaypdf: any;
  editbrokerlicensenumber: any;
  brokerlicensedetails: any;
  editbrokerlicensecoverage: any;
  editbrokerlicensestate: any;
  editbrokerlicenseexpirydate: any;
  editbrokerlicenseexpiryremainder: any;
  editbrokerlicenseshortName:any;
  configprovinceres: any;
  shortNameValue:any
  enrollmentDates: any;
  imagedisplay: any;
  provincialHealthcareUrl: any;
  provincialZipcodes: any;
  SignupFormData: Array<any> = [];
  licensesInfo: Array<any> = [];
  brokersalesCodes: Array<any> = [];
  // saleTrackingCodearr:Array<any> = [];
  EOinsurenceInfo: any;
  provincelistid: any;
  insurancestate_id: any;
  insurancestatename: any;
  provinceshortName: any;
  fusebillId:any;
  licenseData: any;
  state_id: any;
  statename: any;
  public postalvalue: any;
  brokerData: Array<any> = [];
  allBrokers: Array<any> = [];
  licenseCoverage: Array<any> = [];
  brokerType: Array<any> = [];
  formType: Array<any> = [];
  uploaddisclousreAggrement: any;
  productsArray: Array<any> = [];
  advisorGroupContact: Array<any> = [];
  productsArrayList: Array<any> = [];
  uploadlogo: any;
  uploadFormlogo: any;
  showBusinessnumber: boolean = false;
  stc_generation:any;
  brokerTypeName:any;
  customForm: boolean = false;
  minDate = new Date();
  public invalidpostalcodeprivince: boolean = false;
  adminData: any;
  addadminform = true;
  role=sessionStorage.getItem('role');
  brokerregform: FormGroup = new FormGroup({
    ParentbrokerName: new FormControl(''),
    brokerName: new FormControl(''),
    brokerType: new FormControl(''),
    businessnumber: new FormControl(''),
    streetAddress: new FormControl(''),
    streetAddress2: new FormControl(''),
    primaryPhone: new FormControl(''),
    secondaryPhone: new FormControl(''),
    primaryEmail: new FormControl(''),
    secondaryEmail: new FormControl(''),
    thirdEmail: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    Province: new FormControl(''),
    postalCode: new FormControl(''),
    InsuranceName: new FormControl(''),
    policyNumber: new FormControl(''),
    certificateName: new FormControl(''),
    Insuranceexpiry: new FormControl(''),
    stc_generation: new FormControl(''),
    user_generated_stc: new FormControl(''),
    sales_tracking_code: new FormControl(''),
    parentlogo: new FormControl(''),
    parentdisclosure: new FormControl(''),
    logo: new FormControl(''),
    disclosureAgreement: new FormControl(''),
    signupForm: new FormControl(''),

    formName: new FormControl(''),
    formDescription: new FormControl(''),
    formLink: new FormControl(''),
  });
  adminform: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNum: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    OtherRole:new FormControl(''),
  });
  licenseform: FormGroup = new FormGroup({
    licenseNumber: new FormControl(''),
    licenseCoverage1: new FormControl(''),
    state: new FormControl(''),
    expiryDate: new FormControl(''),
    remainder_days: new FormControl(''),
  });
  eoform: FormGroup = new FormGroup({
    EOInsurense: new FormControl(''),
    policy: new FormControl(''),
    EOCertificate: new FormControl(''),
    EOIexpiryDate: new FormControl('')
   });
  formCreation: FormGroup = new FormGroup({
    Signupformtype: new FormControl(''),
    formName: new FormControl(''),
    formDescription: new FormControl(''),
    formlink: new FormControl(''),
    formapplylogo: new FormControl(''),
    formlogo: new FormControl(''),
    formplanLevels: new FormControl(''),
    formdisclosureAgreement: new FormControl(''),
  });
  @ViewChild('formlogoyes')
  formlogoyes!: ElementRef<HTMLElement>;
  @ViewChild('formlogono')
  formlogono!: ElementRef<HTMLElement>;
  ShowOthers: boolean=false;
  prevSTC: any;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public elementRef: ElementRef,
    private _clipboardService: ClipboardService,
    private toastrService: ToastrService,
    private phoneNoFormat: PhoneFormatPipe,
    private salesTrackingFormaterFormatter:SalestrackingcodePipe,
  ) {}
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  ngOnInit() {

    this.todayDate=new Date()
    this.adminData = [];
    this.adminName = sessionStorage.getItem('adminName');
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      groupBy: "name",
    };
    this.brokerregform = this.formBuilder.group({
      ParentbrokerName: [''],
      brokersName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      brokerType: ['', [Validators.required]],
      businessnumber: ['', [Validators.required]],
      streetAddress: [''],
      streetAddress2: [''],
      primaryPhone: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      secondaryPhone: [
        '',
        [
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      primaryEmail: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?!\\s)[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
          emailCheck
        ],
      ],
      secondaryEmail: [
        '',
        [
          Validators.pattern('^(?!\\s)[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        ],
      ],
      thirdemail: [
        '',
        [
          Validators.pattern('^(?!\\s)[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        ],
      ],
      country: ['canada'],
      city: ['',[Validators.required]],
      Province: ['', [Validators.required]],
      postalCode: ['', Validators.compose([Validators.required, postalcodeValidator])],
      InsuranceName: [''],
      policyNumber: [''],
      certificateName: [''],
      Insuranceexpiry: [''],
      stc_generation:[''],
      user_generated_stc:[''],
      sales_tracking_code:['', Validators.compose([Validators.required,Validators.minLength(12),Validators.maxLength(12)])],
      parentlogo: ['', [Validators.required]],
      parentdisclosure: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      disclosureAgreement: ['', [Validators.required]],
      signupForm: ['', [Validators.required]],

    });
    this.adminform = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      phoneNum: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?!\\s)[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        ],
      ],
      role: [null, [Validators.required]],
      OtherRole:['']
    });

    this.eoform = this.formBuilder.group({
      EOInsurense: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      policy: ['', [Validators.required]],
      EOCertificate: ['', [Validators.required]],
      EOIexpiryDate: ['', [Validators.required]],
     });

    this.licenseform = this.formBuilder.group({
      licenseNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      licenseCoverage1: ['', [Validators.required]],
      state: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      remainder_days: ['30', Validators.required],
    });

    this.formCreation = this.formBuilder.group({
      Signupformtype: ['', [Validators.required]],
      formName: ['', [Validators.required]],
      formDescription: ['', [Validators.required]],
      formlink: [''],
      formapplylogo: ['', [Validators.required]],
      formlogo: [''],
      formplanLevels: ['', [Validators.required]],
      formdisclosureAgreement: ['']

    });

    this.id = this.route.snapshot.paramMap.get('id');

    // this.productsArray =[{"id":"3","name":"Classic Bronze"},{"id":"4","name":"Classic Silver"},{"id":"7","name":"All-In Bronze"},{"id":"8","name":"All-In Silver"}]



    this.formConfig();
    this.brokersalesCodes.push({
      brokerId: '',
      percentage: '',
    });
    if(this.role=='ADMINISTRATOR'){
      this.broker['user_generated_stc'].setValidators([Validators.required]);
    }else{
      this.broker['user_generated_stc'].clearValidators();
      this.broker['user_generated_stc'].setValue(false);
      this.broker['user_generated_stc'].updateValueAndValidity();

      this.broker['sales_tracking_code'].clearValidators();
      this.broker['sales_tracking_code'].updateValueAndValidity();

    }
  }
  get broker() {
    return this.brokerregform.controls;
  }
  ngAfterViewInit(){
    console.log("23456yhjkjkkkkkkkkkkkkkkkkk");
    this.licenseform.get('licenseCoverage1').setValue('');
    this.licenseform.get('licenseCoverage1').updateValueAndValidity();
    this.licenseform.get('state').setValue('');
    this.licenseform.get('state').updateValueAndValidity();
    this.formCreation.get('Signupformtype').setValue('');
    this.formCreation.get('Signupformtype').updateValueAndValidity();

  }
  get grpcontact() {
    return this.adminform.controls;
  }
  validateEmail(email:string){
      var result='';
      var splitEmail
      //check for @
      if(email.indexOf('@')>-1){
      splitEmail=email.split('@');
      if(splitEmail[0].length<=64){
        ///[A-Za-z0-9]/i.test(event.key)
        if(/[A-Za-z0-9]/i.test(splitEmail[0])){

        }
        else{

        }
      }
      else{
        result="Recipient name Exceeds 64 characters";
        return result;
      }
      }
      else{
        result="Ampersand not Found";
        return result;
      }

  }

  get f() {
    return this.licenseform.controls;
  }
  get eo() {
    return this.eoform.controls;
  }
  get form() {
    return this.formCreation.controls;
  }

  checkbrokertype(brokerType){

    this.brokerTypeName =brokerType
    console.log(brokerType)
    if(brokerType=="BROKERAGE"){
        this.showBusinessnumber =true
        this.broker['businessnumber'].setValidators([Validators.required]);

        this.broker['businessnumber'].updateValueAndValidity();

        this.stc_generation = "false"
    }
    else{
      this.showBusinessnumber =false

      this.stc_generation = "true"

      this.broker['businessnumber'].clearValidators();
      this.broker['businessnumber'].reset();
      this.broker['businessnumber'].updateValueAndValidity();
    }

  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

    // /^\d{2}[./-]\d{2}[./-]\d{4}$/
  }

  alphaNumarics(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if(event.currentTarget.value.length==0){//for first latter not allow space
      if((charCode >= 65 && charCode <= 90) ||
       (charCode >= 97 && charCode <= 122)||
       (charCode >= 48 && charCode <= 57)){
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
        (charCode >= 48 && charCode <= 57) ||
        charCode === 32
      )
        return true;
      else return false;
     }

  }

  addadmin() {


    if (this.adminform.invalid) {
      console.log(this.adminform);
      return;
    }
    console.log(JSON.stringify(this.adminform.value, null, 2));

    let obj = {
      firstName: this.capitalize(this.adminform.value.firstName),
      lastName: this.capitalize(this.adminform.value.lastName),
      phoneNum: this.adminform.value.phoneNum,
      email: this.adminform.value.email,
      role: this.adminform.value.role,
    };
    if(obj.role=='ADVISOR_OTHERS')
    obj['OtherRole']=this.adminform.value.OtherRole;

    this.adminData.push(obj);

    this.adminform.reset();
    this.showaddadmin = true;
    this.addadminform = false;
    this.ShowOthers=false;


    $('#basicModaladdgrpcontact').modal('hide');

  }
  deleteadmin(index: any) {

    Swal.fire({
      title:'Alert',
      text: 'Are you sure you want to delete this Group Contact?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const Data = this.adminData;
        const removed = Data.splice(index, 1);

        if (this.adminData.length==0) {
          this.addadminform = true;
          this.showaddadmin = false;
        }
        else{
          this.addadminform = false;
      this.showaddadmin = true;
        }

      }
    })

  }


  deleteEO(index: any) {

    Swal.fire({
      title:'Alert',
      text: 'Are you sure you want to delete this EO?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.EOinsurenceInfo = ""
        this.eoform.reset()

        if (this.EOinsurenceInfo.length==0) {
          this.addEOform = true;
          this.showaddEOdetails = false;
        }
        else{
          this.addEOform = false;
      this.showaddEOdetails = true;
        }

      }
    })

  }

  editadmin(admin: any, index: any) {

    console.log(this.adminform)
    console.log(admin);
    this.ShowOthers=admin.role=="ADVISOR_OTHERS"?true:false;
    this.adminform.patchValue(admin)

    console.log(this.adminform)
    this.editindex = index;

  }
  editEO() {

    this.EOinsurenceInfo.EOIexpiryDate=moment(this.EOinsurenceInfo.EOIexpiryDate).format('MM-DD-YYYY')

console.log(this.EOinsurenceInfo)
    this.eoform.patchValue(this.EOinsurenceInfo)


  }

  checkEmailValidation(e:any){
    console.log('asasassasasa');
    let val=e.currentTarget.value;
    let notAlloewdSecvence=['"','#','$','%' ,'(', ')' ,'.' ,',', ':' ,';', '<' ,'>','@', '[' ,']'];
    if(e.key==val.charAt(val.length-1)){
      if(notAlloewdSecvence.includes(val.charAt(val.length-1))){
        return false;
  }
    }

    else{
      if(val.length!=0){

      }else{

      }
      return true;
    }
 }

  editEOSubmit(){
    if (this.eoform.invalid) {
      console.log(this.eoform);
      return;
    }
    console.log(JSON.stringify(this.eoform.value, null, 2));



    this.EOinsurenceInfo = this.eoform.value;

    this.eoform.reset();
    this.showaddEOdetails = true;
    this.addEOform = false;
    $('#basicModaleoedit').modal('hide');
    // $('#basicModal1').modal('hide');
  }
  editadminSubmit() {
    if (this.adminform.invalid) {
      console.log(this.adminform);
      return;
    }
    console.log(JSON.stringify(this.adminform.value, null, 2));

    // let obj = {
    //   adminfirstname: this.capitalize(this.adminform.value.adminfirstname),
    //   lastName: this.capitalize(this.adminform.value.adminlastname),
    //   phoneNum: this.adminform.value.adminphone,
    //   email: this.adminform.value.adminemail,
    //   role: this.adminform.value.role,
    // };

    this.adminData[this.editindex] = this.adminform.value;

    this.adminform.reset();
    this.showaddadmin = true;
    this.addadminform = false;
    $('#basicModaleditgroupcontact').modal('hide');
    // $('#basicModal1').modal('hide');
  }
  hidegrpadmindetails() {
    this.adminform.reset();
    this.ShowOthers=false;

  }
  addlicense() {
    if (this.licenseform.invalid) {
      console.log(this.licenseform.value);
      return;
    }
    console.log(JSON.stringify(this.licenseform.value, null, 2));

    let obj = {
      provinces_id: this.insurancestate_id,
      provinces_name: this.insurancestatename,
      state_fusebill_id:this.fusebillId,
      expiry_date:
        this.datePipe.transform(
          this.licenseform.value.expiryDate,
          'MM-dd-yyyy'
        ) || '',
      reminder_email: parseInt(this.licenseform.value.remainder_days),
      license_num: this.licenseform.value.licenseNumber,
      license_coverage: this.licenseform.value.licenseCoverage1,
      provinceshortName: this.licenseform.value.state
    };
    let licenceExist=false;
    for(let broker of this.addlicenseformData){
      if(broker.license_num==obj.license_num){
        licenceExist=true;
        break;
      }else{
        licenceExist=false;
      }
    }
    if(licenceExist){
      Swal.fire({title:'Info',text:"License Number already exist"});
    }else{
      this.addlicenseformData.push(obj);
      console.log(this.addlicenseformData)
      this.insurancestate_id =""
      this.insurancestatename=""
      this.fusebillId=""
    // // this.adminData = JSON.parse(sessionStorage.getItem('adminData') || '[]');
    this.licenseform.reset();
    this.addlicenseformtable = true;
    this.addlicenseform = false;
    sessionStorage.setItem('addlicenseformData',JSON.stringify(this.addlicenseformData));
      $('#basicModal1').modal('hide');
    }



  }

  addEOformDetails() {
    if (this.eoform.invalid) {
      console.log(this.eoform.value);
      return;
    }
    console.log(JSON.stringify(this.eoform.value, null, 2));

    let obj = {
      EOInsurense: this.capitalize(this.eoform.value.EOInsurense),
      EOCertificate: this.eoform.value.EOCertificate,
      policy: this.eoform.value.policy,
      EOIexpiryDate:
        this.datePipe.transform(
          this.eoform.value.EOIexpiryDate,
          'yyyy-MM-dd'
        ) || '',
    };
    this.EOinsurenceInfo = obj;

    this.addEOform = false;
  this.showaddEOdetails =true;

    $('#basicModal1').modal('hide');
  }

  addnewlicense(){
    this.licenseform.reset();
    this.licenseform.get('licenseCoverage1').setValue('');
    this.licenseform.get('licenseCoverage1').updateValueAndValidity();
    this.licenseform.get('state').setValue('');
    this.licenseform.get('state').updateValueAndValidity();
  }
  editadvisorlicenseDetails(e,i,broker){

    console.log(broker)

    this.brokerlicensedetails = broker
    this.editindex = i;
    this.editbrokerlicensenumber = broker.license_num;
    this.editbrokerlicensecoverage = broker.license_coverage;
    this.editbrokerlicensestate = broker.provinces_name;
    this.editbrokerlicenseexpirydate = this.datePipe.transform(broker.expiry_date, "MM-dd-yyyy") || "";
    this.editbrokerlicenseexpiryremainder = broker.reminder_email;
    this.editbrokerlicenseshortName = broker.provinceshortName


    console.log(this.editbrokerlicenseexpirydate)
    // this.isEditable =false;
    // this.enableEditIndex = i;
    // console.log(i, e);
    // this.addlicenseformData = JSON.parse(sessionStorage.getItem('addlicenseformData'))

  }


  editadvisorformDetails(e,i,form){
    // this.isEditableForm =false;
    // this.enableEditIndexForm = i;
    // console.log(i, e);
    // this.addformDetails = JSON.parse(sessionStorage.getItem('addformDetails'))

    console.log(form)
    this.editindex = i;
    this.planLevels=[];
    this.editFormType = form.formType;
    this.editFormName = form.name;
    this.editFormDescription = form.description;
    this.editFormlink = "";
    this.editFormlogo = form.logo;
    this.editFormdisplaylogo = form.logodisplay;
    this.editFormDisclousreAggrement = "";
    // this.planLevels = form.planLevels;
    this.productsArrayList.map((product)=>{
      if(form.planLevels.includes(product.id)){
        this.planLevels.push(product.name)
      }


    })

    console.log(form)

    if(form.planLevels && form.planLevels.length&&this.editFormType=='CUSTOM'){

      this.customForm =true;
      this.selectedItems =  this.planLevels;
      this.form['formplanLevels'].setValidators([Validators.required]);;

      this.form['formplanLevels'].updateValueAndValidity();
    }
    else{
      this.customForm =false
      this.form['formplanLevels'].clearValidators();

      this.form['formplanLevels'].updateValueAndValidity();
    }

    console.log(form.logo.name)
    if(form.logo.name && form.logo.name.length){

      this.showparentformlogocondition =true
      let el: HTMLElement = this.formlogono.nativeElement;
      el.click();
    }
    else{

      this.showparentformlogocondition =false
      let el: HTMLElement = this.formlogoyes.nativeElement;
      el.click();
    }


  }
  saveLicense(license:any,index:number){
    this.licenseform.markAllAsTouched();

    console.log(license)
    console.log(index)


    let obj = {
      provinces_id: this.insurancestate_id,
      provinces_name: this.insurancestatename,
      state_fusebill_id:this.fusebillId,
      expiry_date:
        this.datePipe.transform(
          license.expiry_date,
          'yyyy-MM-dd'
        ) || '',
      reminder_email: parseInt(license.reminder_email),
      license_num: license.license_num,
      license_coverage: license.license_coverage,
      provinceshortName: license.provinceshortName
    };


    this.addlicenseformData[index] = obj;
    // this.addlicenseformData.push(obj);
    this.isEditable =true;
    this.enableEditIndex =null
    sessionStorage.setItem(
      'addlicenseformData',
      JSON.stringify(this.addlicenseformData)
    );
    console.log(this.addlicenseformData)
  }
  cancellicneseEdit(e,i){
    this.isEditable =true;
    this.enableEditIndex = null;
    this.addlicenseformData = JSON.parse(sessionStorage.getItem('addlicenseformData'))
  }

  cancelFormEdit(e,i){
    this.isEditableForm =true;
    this.enableEditIndexForm = null;
    this.addformDetails = JSON.parse(sessionStorage.getItem('addformDetails'))
    console.log(this.addformDetails)
  }

  saveForm(form:any,index:number){

    console.log(form)
    console.log(index)


    let obj = {
      formType: form.formType,
      name: this.capitalize(form.name),
      description: this.capitalize(form.description),
      link: "",
      planLevels: form.planLevels || "",
      logo: form.logo || "",
      singleSku: true,
      productType: "GIG"
      // formDisclosureAgreement: this.licenseform.value.formdisclosureAgreement || "",
    };


    this.addformDetails[index] = obj;
    // this.addlicenseformData.push(obj);
    this.isEditableForm =true;
    this.enableEditIndexForm =null

    console.log(this.addformDetails)
    sessionStorage.setItem(
      'addformDetails',
      JSON.stringify(this.addformDetails)
    );
  }
  deletelicense(license:any,i:number){

    Swal.fire({
      title:'Alert',
      text: 'Are you sure you want to delete this License?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.addlicenseformData.splice(i, 1);

        if (this.addlicenseformData.length==0) {
                this.addlicenseform =true;
                  this.addlicenseformtable  =false;
        }
        else{
          this.addlicenseform =false;
          this.addlicenseformtable  =true;
        }
        sessionStorage.setItem(
          'addlicenseformData',
          JSON.stringify(this.addlicenseformData)
        );
      }
    })
  }

  deleteForm(license:any,i:number){

    Swal.fire({
      title:'Alert',
      text: 'Are you sure you want to delete this form?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.addformDetails.splice(i, 1);

        if (this.addformDetails.length==0) {
                this.showaddform =true;
                  this.showFormsDetails  =false;
        }
        else{
          this.showaddform =false;
          this.showFormsDetails =true;
        }

        sessionStorage.setItem(
          'addformDetails',
          JSON.stringify(this.addformDetails)
        );
      }
    })
  }


  public noofbrokersales(event) {
    ////console.log(this.oldvaluenumber)

    let count = event.target.value;

    // if (count < this.oldvaluenumber) {
    //   this.brokersalesCodes.removeAt(count);
    //   this.oldvaluenumber--;
    // } else {
    //   this.brokersalesCodes.push(this.initChildDetails());
    //   this.oldvaluenumber++;
    // }
    this.addRow()
  }
  addRow() {
    // this.basicTiersCount++;
    this.brokersalesCodes.push({
      brokerId: '',
      percentage: '',
    });
  }
  deleteRow(index: number, dynamic: any) {

    if (this.brokersalesCodes.length == 1) {
      Swal.fire({
        title: 'Warning',
        text: "Can't delete the row when there is only one row",
      });
      return false;
    } else {

        this.brokersalesCodes.splice(index, 1);

    }
  }
  addform() {
    if (this.formCreation.invalid) {
      console.log(this.formCreation.value);
      return;
    }
    console.log(JSON.stringify(this.formCreation.value, null, 2));



    if(this.formCreation.value.formplanLevels && this.formCreation.value.formplanLevels.length>0){
      let formplansData = this.formCreation.value.formplanLevels

      for(let i=0;i<formplansData.length;i++){
        this.fromplansarry.push(formplansData[i].id)
      }
    }
    let logoDetails = '';
    if (this.uploadFormlogo) {
      (logoDetails = this.uploadFormlogo),
        'form_logo' +
          Date.now() +
          '.' +
          this.uploadFormlogo.name.split('.').pop().toLowerCase();
    } else {
      logoDetails = '';
    }


    let image;

    console.log(this.uploadFormlogo)

    if(this.uploadFormlogo){
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadFormlogo);

    reader.onload = (_event) => {

      image = reader.result
    };
  }
    setTimeout(() => {
      let obj = {
        formType: this.formCreation.value.Signupformtype,
        name: this.capitalize(this.formCreation.value.formName),
        description: this.capitalize(this.formCreation.value.formDescription),
        link: "",
        planLevels: this.fromplansarry  || "",
        logo: logoDetails || "",
        logodisplay:image
        // formDisclosureAgreement: this.licenseform.value.formdisclosureAgreement || "",
      };

      console.log(obj)

      this.addformDetails.push(obj);
      console.log(this.addformDetails)
      // // this.adminData = JSON.parse(sessionStorage.getItem('adminData') || '[]');

      this.formCreation.reset();
      this.showFormsDetails = true;
      this.showaddform = false;

      this.fromplansarry =[]
      this.customForm =false
      $('#addFormDetails').modal('hide');
      sessionStorage.setItem(
        'addformDetails',
        JSON.stringify(this.addformDetails)
      );


      this.uploadFormlogo = ""
    }, 100);


  }

  deletebrokerlicense(index: any) {
    const Data = this.addlicenseformData;
    const removed = Data.splice(index, 1); // Mutates fruits and returns array of removed items

    sessionStorage.setItem(
      'addlicenseformData',
      JSON.stringify(this.addlicenseformData)
    );
    this.addlicenseformData = JSON.parse(
      sessionStorage.getItem('addlicenseformData') || '[]'
    );

    if (this.addlicenseformData.length == 0) {
      this.addlicenseform = true;
      this.addlicenseformtable = false;
    }
  }
  deleteform(form:any,index: any) {



    Swal.fire({
      title:'Alert',
      text: 'Are you sure you want to delete Form '+form.name+'',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const Data = this.addformDetails;
        const removed = Data.splice(index, 1); // Mutates fruits and returns array of removed items

        sessionStorage.setItem(
          'addformDetails',
          JSON.stringify(this.addformDetails)
        );
        this.addformDetails = JSON.parse(
          sessionStorage.getItem('addformDetails') || '[]'
        );

        if (this.addformDetails.length == 0) {
          this.showaddform = true;
          this.showFormsDetails = false;
        }

      }
    })

  }

  editbrokerlicense(broker: any, index: any) {
    console.log(broker);
    this.editindex = index;
    this.editbrokerlicensenumber = broker.license_num;
    this.editbrokerlicensecoverage = broker.license_coverage;
    this.editbrokerlicensestate = broker.provinces_name;
    this.editbrokerlicenseexpirydate = broker.expiry_date;
    this.editbrokerlicenseexpiryremainder = broker.reminder_email;
    this.editbrokerlicenseshortName = broker.provinceshortName

    console.log(this.editbrokerlicenseexpirydate)
  }

  editform(form: any, index: any) {

    this.editindex = index;
    this.editFormType = form.formType;
    this.editFormName = form.name;
    this.editFormDescription = form.description;
    this.editFormlink = "";
    this.editFormlogo = "";
    this.editFormDisclousreAggrement = "";
  }

  editbrokerlicenseSubmit() {
    if (this.licenseform.invalid) {
      console.log(this.licenseform);
      return;
    }
    console.log(JSON.stringify(this.licenseform.value, null, 2));
    this.getprovinceshortName(this.licenseform.value.state)

    let obj = {
      provinces_id: this.insurancestate_id ||this.brokerlicensedetails.provinces_id,
      provinces_name: this.insurancestatename || this.brokerlicensedetails.provinces_name ,
      state_fusebill_id:this.fusebillId || this.brokerlicensedetails.state_fusebill_id,
      expiry_date:
        this.datePipe.transform(
          this.licenseform.value.expiryDate,
          'yyyy-MM-dd'
        ) || '',
      reminder_email: parseInt(this.licenseform.value.remainder_days),
      license_num: this.licenseform.value.licenseNumber,
      license_coverage: this.licenseform.value.licenseCoverage1,
      provinceshortName:this.shortNameValue
    };


    console.log(obj)


    this.addlicenseformData[this.editindex] = obj;

    sessionStorage.setItem(
      'addlicenseformData',
      JSON.stringify(this.addlicenseformData)
    );
    this.addlicenseformData = JSON.parse(
      sessionStorage.getItem('addlicenseformData') || '[]'
    );

    this.licenseform.reset();
    this.addlicenseform = false;
    this.addlicenseformtable = true;
    $('#basicModaledit').modal('hide');
    // $('#basicModal1').modal('hide');
  }

  editFormSubmit() {
    if (this.formCreation.invalid) {
      console.log(this.formCreation.value);
      return;
    }
    console.log(JSON.stringify(this.formCreation.value, null, 2));
    if(this.formCreation.value.formplanLevels && this.formCreation.value.formplanLevels.length>0){
      let formplansData = this.formCreation.value.formplanLevels

      for(let i=0;i<formplansData.length;i++){
        this.fromplansarry.push(formplansData[i].id)
      }
    }
    let logoDetails = '';
    if (this.uploadFormlogo) {
      (logoDetails = this.uploadFormlogo),
        'form_logo' +
          Date.now() +
          '.' +
          this.uploadFormlogo.name.split('.').pop().toLowerCase();
    } else {
      logoDetails = '';
    }


    let image;

    if(this.uploadFormlogo){
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadFormlogo);

    reader.onload = (_event) => {

      image = reader.result
      this.editFormlogo =image
    };
  }


    setTimeout(() => {
      let obj = {
        formType: this.formCreation.value.Signupformtype,
        name: this.capitalize(this.formCreation.value.formName),
        description: this.capitalize(this.formCreation.value.formDescription),
        link: "",
        planLevels: this.formCreation.value.formplanLevels,
        logo: logoDetails || this.editFormlogo || "",
        logodisplay:image || this.editFormdisplaylogo ||""
      };
      console.log(obj)
      console.log(this.editindex)
      console.log(this.addformDetails)
      this.addformDetails[this.editindex] = obj;
      // // this.adminData = JSON.parse(sessionStorage.getItem('adminData') || '[]');

      this.formCreation.reset();
      this.showFormsDetails = true;
      this.showaddform = false;
      this.insurancestate_id =""
        this.insurancestatename=""
        this.fusebillId=""
      sessionStorage.setItem(
        'addformDetails',
        JSON.stringify(this.addformDetails)
      );
      $('#basicModalFormedit').modal('hide');
    }, 100);

  }
  hideaddlicenseform() {
    this.licenseform.reset();
  }

  phoneFormat(id: any) {
    const inputValue = this.brokerregform.get(id).value;

    this.brokerregform.get(id).
    setValue(this.phoneNoFormat.transform(inputValue), { emitEvent: false });
  }
  phoneFormatDynamic(id:any,form:any){
    const inputValue = this.grpcontact[id].value;

    this.grpcontact[id].
    setValue(this.phoneNoFormat.transform(inputValue), { emitEvent: false });
  }

  textChangeToLowerCase(id:any){
    let val=this.broker[id].value.toLowerCase();
    this.broker[id].setValue(val);
    this.brokerregform.get(id).updateValueAndValidity();
  }

  phoneFormatForGroupCont(form:FormGroup,id: any) {
    const inputValue = form.get(id).value;
    //this.adminform.controls
    form.get(id).
    setValue(this.phoneNoFormat.transform(inputValue), { emitEvent: false });
  }


  addextraform(){
    this.showparentformlogocondition = false
    this.customForm = false;
    this.formCreation.get('Signupformtype').setValue('');
    this.formCreation.get('Signupformtype').updateValueAndValidity();
    this.form['formplanLevels'].clearValidators();

      this.form['formplanLevels'].updateValueAndValidity();

    this.formCreation.reset();
    $('#addFormDetails').modal('show');
    // this.showaddform = true;
  }
  uploadadminlogo(event1: any) {
    var fileExtension = '.' + event1.target.files[0].name.split('.').pop();

    // alert(event.target.files[0].name.replace(event.target.files[0].name,"void.pdf"))
    this.uploadlogo = event1.target.files[0];

    var allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'application/pdf',
    ];

    let error = false;

    let message = '';

    if (allowedMimes.includes(this.uploadlogo.type)) {
      if (this.uploadlogo.size <= 300 * 1024) {
        //300KB

        error = false;
        var reader = new FileReader();
        reader.readAsDataURL(event1.target.files[0]);

        reader.onload = (_event) => {
          this.showimagelogo = false;

          this.imagedisplay = reader.result;
        };
      } else {
        error = true;
        message = 'File size is too large,maximum file size is 300kb';
        // alert(message);
      }
    } else {
      error = true;
      message = 'Invalid file type. Only jpg, png image,pdf files are allowed.';
      // alert(message);
    }
    if(error){
      Swal.fire({
        title:'Error',
        text:message,
      }).then((res)=>{
        if(res.isConfirmed){
          this.broker['logo'].setValue(null);
        }
      })
    }
  }
  uploadadminFormlogo(event1: any) {
    console.log('test');

    console.log(event1)
    var fileExtension = '.' + event1.target.files[0].name.split('.').pop();

    // alert(event.target.files[0].name.replace(event.target.files[0].name,"void.pdf"))
    this.uploadFormlogo = event1.target.files[0];

    var allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'application/pdf',
    ];

    let error = false;

    let message = '';

    if (allowedMimes.includes(this.uploadFormlogo.type)) {
      if (this.uploadFormlogo.size <= 300 * 1024) {
        //300KB

        error = false;
        var reader = new FileReader();
        reader.readAsDataURL(event1.target.files[0]);

        reader.onload = (_event) => {
          // this.showimagelogo = false;
this.editFormdisplaylogo = reader.result;
          // this.imagedisplay = reader.result;
        };
      } else {
        error = true;
        message = 'File size is too large,maximum file size is 300kb';
        // alert(message);
      }
    } else {
      error = true;
      message = 'Invalid file type. Only jpg, png image,pdf files are allowed.';
      // alert(message);
    }
    if(error){
      Swal.fire({
        title:'Error',
        text:message,
      }).then((res)=>{
        if(res.isConfirmed){
          this.form['formlogo'].setValue(null);
        }
      })
    }
  }
  uploadadmindisclosure(event1: any) {
    console.log('test');
    var fileExtension = '.' + event1.target.files[0].name.split('.').pop();

    // alert(event.target.files[0].name.replace(event.target.files[0].name,"void.pdf"))
    this.uploaddisclousreAggrement = event1.target.files[0];

    var allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'application/pdf',
    ];

    let error = false;

    let message = '';

    if (allowedMimes.includes(this.uploaddisclousreAggrement.type)) {
      if (this.uploaddisclousreAggrement.size <= 300 * 1024) {
        //300KB

        error = false;
        var reader = new FileReader();
        reader.readAsDataURL(event1.target.files[0]);

        reader.onload = (_event) => {
          this.showdisclosureaggrement = false;

          this.imagedisplaypdf = reader.result;
          console.log(this.imagedisplaypdf)
        };
      } else {
        error = true;
        message = 'File size is too large,maximum file size is 300kb';
        alert(message);
      }
    } else {
      error = true;

      message = 'Invalid file type. Only jpg, png image,pdf files are allowed.';
      alert(message);
    }
  }


  getimage(event){

    console.log(event)
    var reader = new FileReader();
    reader.readAsDataURL(event);

    reader.onload = (_event) => {

      console.log(reader.result)
      // this.showimagelogo = false;

      // this.imagedisplay = reader.result;
    };
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
            // this.allBrokers = response.data.allBrokers;
            this.allBrokers = response.data.allBrokers.sort(
              (a: any, b: any) => (a.name > b.name ? 1 : -1)
            );
            this.prevSTC=response.data.prevSTC;
            let statesOfCanada=response.data.states.filter((country)=>{
              if(country.countryId==1)
              return country;
            });
            response.data.states=statesOfCanada;
            this.configprovinceres = response.data.states.sort(
              (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
            );
            this.licenseCoverage = response.data.licenseCoverage;
            this.brokerType = response.data.brokerType;
            this.formType = response.data.formType;
            this.productsArray = response.data.packages
            this.advisorGroupContact = response.data.advisorGroupContact


            for(let i=0;i<this.productsArray.length;i++){

              for(let j=0;j<this.productsArray[i].planGroups.length;j++){

                this.productsArrayList.push(this.productsArray[i].planGroups[j])
              }




            }

            console.log(this.productsArrayList)
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

  getbrokername(){
    let obj = {
      "id": 0,
      "brokerType": this.brokerregform.value.brokerType,
      "name": this.brokerregform.value.brokersName,
      "salesTrackingCode": "New"
  }

  this.allBrokers.filter(
    (object) => {
      if(object.id !== 0){
        this.allBrokers.push(obj)
      }
    }
  );
// for(let i=0;i<this.allBrokers.length;i++){
//   if(this.allBrokers[i].id !=0){
//     this.allBrokers.push(obj)
//   }
//  }
  }

  onItemSelect(){

  }
  onItemDeSelect(){

  }
  public provincelist(event: any) {
    // alert(event.target.value)
            if(event.target.value=='QC'){
              $('#QCproviance').show();

              return false;
            }
    this.configprovinceres.forEach((element: any) => {
      if (element.shortName == event.target.value) {
        this.provincialHealthcareUrl = element.provincialHealthcareUrl;
        this.provincialZipcodes = element.zipcodes.split(',');
        this.provincelistid = element.id;
        this.state_id = parseInt(element.id);
        this.statename = element.name;
      }
    });

    if (this.brokerregform.value.postalCode) {
      if (
        this.provincialZipcodes.indexOf(
          this.brokerregform.value.postalCode[0]
        ) == -1
      ) {
        this.invalidpostalcodeprivince = true;

        this.broker['postalCode'].markAsTouched();
        this.broker['postalCode'].updateValueAndValidity();
      } else {
        this.invalidpostalcodeprivince = false;
        // console.log("test1")
      }

      if (this.brokerregform.value.postalCode.length == 0) {
        this.invalidpostalcodeprivince = false;
        // console.log("test11")
      }
    }
  }

  firstLetterNotSpace(event:any){
    const charCode = event.which ? event.which : event.keyCode;
    if(event.currentTarget.value.length==0){//for first latter not allow space
      if(charCode === 32){
    return false;
      }
    else{
      return true;
    }
     }
  }
  public insuranceprovincelist(event: any) {

    this.configprovinceres.forEach((element: any) => {
      if (element.shortName == event.target.value) {
        this.provincialHealthcareUrl = element.provincialHealthcareUrl;
        this.provincialZipcodes = element.zipcodes.split(',');
        this.provincelistid = element.id;
        this.insurancestate_id = parseInt(element.id);
        this.insurancestatename = element.name;
        this.fusebillId =parseInt(element.fusebillId)
        // this.provinceshortName = element.shortName
      }
    });
  }
  public getprovinceshortName(event: any) {

    this.configprovinceres.forEach((element: any) => {

      // console.log(element.shortName)
      // console.log(event)
      if (element.shortName == event) {

        this.shortNameValue =  element.shortName
      }
    });
  }
  changeTextToUppercase(field: any, event: any) {
    console.log(field);
    const obj = {};

    this.postalvalue = event.target.value;

    if (this.provincialZipcodes.indexOf(this.postalvalue[0]) == -1) {
      // console.log("r")
      this.invalidpostalcodeprivince = true;
      this.broker['postalCode'].markAsTouched();
    } else {
      this.invalidpostalcodeprivince = false;
    }

    if (this.postalvalue.length == 0) {
      this.invalidpostalcodeprivince = false;
    }

    console.log(this.invalidpostalcodeprivince);

    //  postalcodeValidator1(this.invalidpostalcodeprivince )
  }

  public signupFormCheck(event) {
    if (event.target.value == 'true') {
      this.showaddform = true;
      // $('#addFormDetails').modal('show');
    } else {
      // this.showformtype = false;
      this.showaddform = false;
      this.showFormsDetails=false;
      this.addformDetails=[];
      // $('#addFormDetails').modal('hide');
    }
  }

  public checkParentlogo(event) {
    if (event.target.value == 'true') {
      this.showparentlogocondition = false;
      this.broker['logo'].clearValidators();

      this.broker['logo'].updateValueAndValidity();

      this.uploadlogo =""
      this.imagedisplay =""
      this.showimagelogo =true
    } else {
      this.showparentlogocondition = true;
      this.broker['logo'].setValidators([Validators.required]);

      this.broker['logo'].updateValueAndValidity();
      this.imagedisplay =""
    }
  }
  public checkParentFormlogo(event) {
    if (event.target.value == 'true') {
      this.showparentformlogocondition = false;

      this.uploadFormlogo =""
      // this.imagedisplay =""
      // this.showimagelogo =true
    } else {
      this.showparentformlogocondition = true;
      // this.imagedisplay =""
    }
  }
  public checkParentdisclosure(event) {
    if (event.target.value == 'true') {

      let obj={
        "name":this.brokerregform.value.brokersName+"(Self)",
        "brokerType":this.brokerregform.value.brokerType,
        "salesTrackingCode":"New",
        "salesTrackingCodeWithStatement":0,
        "id":0
      }
      // for(let broker of this.allBrokers){
      //   if(broker)
      // }
      this.allBrokers.push(obj);

      this.showparentdisclosurecondition = false;
      this.broker['disclosureAgreement'].clearValidators();

      this.broker['disclosureAgreement'].updateValueAndValidity();
      this.uploaddisclousreAggrement =""
    } else {

      this.showparentdisclosurecondition = true;
      this.broker['disclosureAgreement'].setValidators([Validators.required]);

      this.broker['disclosureAgreement'].updateValueAndValidity();
    }
  }
  public checkSalesTrackingCode(event) {
    if (event.target.value == 'true') {

         let obj={
        "name":this.brokerregform.value.brokersName+"(Self)",
        "brokerType":this.brokerregform.value.brokerType,
        "salesTrackingCode":"New",
        "salesTrackingCodeWithStatement":0,
        "id":0
      }
      this.allBrokers.push(obj);

      this.showsalestrackinCodeAuto = true;
     if(this.role=='ADMINISTRATOR'){
      this.broker['user_generated_stc'].setValidators([Validators.required]);
      this.broker['user_generated_stc'].updateValueAndValidity();
      this.broker['user_generated_stc'].reset();
     }

      // if(this.brokerregform.value.brokersName && this.brokerregform.value.brokerType){

      //   let obj = {
      //     "id": 0,
      //     "brokerType": this.brokerregform.value.brokerType,
      //     "name": this.brokerregform.value.brokersName,
      //     "salesTrackingCode": "New"
      // }

      // this.allBrokers.filter(
      //   (object) => {
      //     if(object.id !== 0){
      //       this.allBrokers.push(obj)
      //     }
      //   }
      // );

      // }




    }

    else {

      this.broker['user_generated_stc'].clearValidators();
      this.broker['user_generated_stc'].updateValueAndValidity();

      this.broker['sales_tracking_code'].clearValidators();
      this.broker['sales_tracking_code'].updateValueAndValidity();
      this.showsalestrackinCodeAuto = false;
      this.showsales_tracking_code =false;
      // this.brokerregform.value.user_generated_stc = false


    }
  }


  public checkSalesTrackingCodeAuto(event) {
    if (event.target.value == 'false') {
      this.showsales_tracking_code = false;
      this.broker['sales_tracking_code'].clearValidators();
      this.broker['sales_tracking_code'].updateValueAndValidity();
      this.broker['sales_tracking_code'].reset()
    } else {
      this.showsales_tracking_code = true;


      this.broker['sales_tracking_code'].setValidators([Validators.required,Validators.minLength(12),Validators.maxLength(12)]);
      this.broker['sales_tracking_code'].updateValueAndValidity();
    }
  }



  public selectFormname(event: any) {
    console.log(event.target.value);

    if (event.target.value == 'REGULAR' || event.target.value == 'EXECUTIVE') {
      // this.showaddform = true;
      this.customForm =false
      this.form['formplanLevels'].clearValidators();

      this.form['formplanLevels'].updateValueAndValidity();


    } else {
      this.customForm =true
      this.form['formplanLevels'].setValidators([Validators.required]);;

      this.form['formplanLevels'].updateValueAndValidity();
    }

    for(let i=0;i<this.formType.length;i++){

      if(this.formType[i].label==event.target.value){

        this.formTitle = this.formType[i].title
        this.formDescription = this.formType[i].description
      }
    }

  }

  public getBrokerlistData(event: any) {
    console.log(event.target.value);

    // alert(this.brokerregform.value.ParentbrokerName);
  }

  groupContactChange(event:any){
    if(event.target.value=='ADVISOR_OTHERS'){
      this.ShowOthers=true;
      this.adminform.get('OtherRole').setValidators(Validators.required);
    }
    else{
      this.ShowOthers=false;
      this.adminform.get('OtherRole').clearValidators();
    }
    this.adminform.get('OtherRole').updateValueAndValidity();
  }

  public getBrokerlistSalesData(event: any) {
    console.log(event.target.value);

    // alert(this.brokerregform.value.ParentbrokerName);
  }
  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  copy(text: string){

     this._clipboardService.copy(text)
     this.toastrService.success("link copied");

  }
  copylink(){
    this.toastrService.success("link copied to Clipboard");
   }
  public submitbasicInfo() {

    // $('#sumamryModel').modal('show');


  //   this.finalSummaryBrookerData = {
  //     "status": "200",
  //     "message": "Broker registration successful",
  //     "date": "2023-06-20T08:08:20.219Z",
  //     "data": {
  //         "form": [
  //             {
  //                 "id": 1222,
  //                 "alias": "/rakeshtest5",
  //                 "brokerId": 1031,
  //                 "salesTrackingCodeId": 131,
  //                 "description": "Health re",
  //                 "formType": "REGULAR",
  //                 "isDemoForm": false,
  //                 "keywords": "Group Benefitz,insurance,signup",
  //                 "link": "/CxYHNLsc0429",
  //                 "name": "Health",
  //                 "published": true,
  //                 "requireDentalHealthCoverage": true,
  //                 "requireSpouseEmail": false,
  //                 "title": "Group Benefitz - Insurance signup",
  //                 "useCreditCardPaymentMethod": true,
  //                 "usePadPaymentMethod": true,
  //                 "warnRequiredDependantMedicalExam": false
  //             }
  //         ],
  //         "broker": {
  //             "id": 1031,
  //             "brokerType": "ADVISOR",
  //             "contactId": 5460,
  //             "description": "Rakesh marka",
  //             "discoverable": true,
  //             "link": "app/resources/images/broker/ibLogo.png",
  //             "logo": "app/resources/images/broker/ibLogo.png",
  //             "name": "RakeshTest5",
  //             "parentId": 2,
  //             "published": true,
  //             "salesTrackingType": " ",
  //             "settingsAllowGroupBenefitsWallet": 0,
  //             "settingsAllowInvoicePaymentMethod": 0,
  //             "settingsEnableTieredHealthBenefits": 0,
  //             "settingsRolloverEmployeeLimitNextYear": 0,
  //             "useCreditCardPaymentMethod": true,
  //             "useInvoicePaymentMethod": false,
  //             "usePadPaymentMethod": true,
  //             "userId": 429
  //         },
  //         "information": {
  //             "parent": {
  //                 "name": "Rakesh marka",
  //                 "id": 2
  //             },
  //             "licenses": [
  //                 {
  //                     "provinces_id": 12,
  //                     "provinces_name": "Ontario",
  //                     "state_fusebill_id": 9,
  //                     "expiry_date": "2023-06-22",
  //                     "reminder_email": 30,
  //                     "license_num": "1234",
  //                     "license_coverage": "ACCIDENT_AND_SICKNESS",
  //                     "provinceshortName": "ON"
  //                 }
  //             ],
  //             "EOinsurence": {
  //                 "EOInsurense": "test",
  //                 "EOCertificate": "test1",
  //                 "policy": "123",
  //                 "EOIexpiryDate": "2023-06-30"
  //             },
  //             "useParentLogo": "true"
  //         }
  //     }
  // }
    // this.finalSummaryData = [
    //   {
    //      "form":[
    //         {
    //            "id":1196,
    //            "alias":"/kelly",
    //            "brokerId":969,
    //            "description":"Groupbenefitz signup Form all cards",
    //            "formType":"REGULAR",
    //            "isDemoForm":false,
    //            "keywords":"Group Benefitz,insurance,signup",
    //            "link":"/GZ79Fyc41684",
    //            "name":"Health Benefits Application Form",
    //            "published":true,
    //            "requireDentalHealthCoverage":true,
    //            "requireSpouseEmail":false,
    //            "title":"Group Benefitz - Insurance signup",
    //            "useCreditCardPaymentMethod":true,
    //            "usePadPaymentMethod":true,
    //            "warnRequiredDependantMedicalExam":false
    //         },
    //         {
    //            "id":1197,
    //            "alias":"/kelly_exec",
    //            "brokerId":969,
    //            "description":"Groupbenefitz signup Form Executive cards",
    //            "formType":"EXECUTIVE",
    //            "isDemoForm":false,
    //            "keywords":"Group Benefitz,insurance,signup",
    //            "link":"/5N8Y96C01684",
    //            "name":"Executive Benefits Enrollment Form",
    //            "published":true,
    //            "requireDentalHealthCoverage":false,
    //            "requireSpouseEmail":true,
    //            "title":"Group Benefitz - Insurance signup",
    //            "useCreditCardPaymentMethod":true,
    //            "usePadPaymentMethod":true,
    //            "warnRequiredDependantMedicalExam":true
    //         }
    //      ],
    //      "broker":{
    //         "id":969,
    //         "brokerType":"ADVISOR",
    //         "contactId":5396,
    //         "description":"Gavin Mosley",
    //         "discoverable":true,
    //         "link":"app/resources/images/broker/GroupBenefitz0.png",
    //         "logo":"app/resources/images/broker/GroupBenefitz.png",
    //         "name":"Kelly Waxman",
    //         "parentId":7,
    //         "published":true,
    //         "salesTrackingCode":"",
    //         "salesTrackingType":" ",
    //         "settingsAllowGroupBenefitsWallet":0,
    //         "settingsAllowInvoicePaymentMethod":0,
    //         "settingsEnableTieredHealthBenefits":0,
    //         "settingsRolloverEmployeeLimitNextYear":0,
    //         "useCreditCardPaymentMethod":true,
    //         "useInvoicePaymentMethod":false,
    //         "usePadPaymentMethod":true,
    //         "userId":1684
    //      },
    //      "information":{
    //         "parent":{
    //            "name":"Gavin Mosley",
    //            "id":7
    //         },
    //         "licenses":[
    //            {
    //               "provinces_id":12,
    //               "provinces_name":"Ontario",
    //               "state_fusebill_id":9,
    //               "expiry_date":"2025-02-25",
    //               "reminder_email":30,
    //               "license_num":"41120M",
    //               "license_coverage":"LIFE_ACCIDENT_AND_SICKNESS",
    //               "provinceshortName":"ON"
    //            }
    //         ],
    //         "EOinsurence":{
    //            "EOInsurense":"Swiss Re Corporate Solutions America Insurance Corporation – Canadian Branch",
    //            "EOCertificate":"MLA09106",
    //            "policy":"WLE4ON011854904",
    //            "EOIexpiryDate":"2024-07-01"
    //         }
    //      }
    //   }
    // ]
    console.log(this.brokerregform.value);
    console.log(this.brokersalesCodes)
    if (this.brokerregform.invalid) {
      console.log(this.brokerregform.value);

      const invalid = [];
        const controls = this.brokerregform.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
     console.log(invalid)

      this.brokerregform.markAllAsTouched();
      this.licenseform.markAllAsTouched();
      this.formCreation.markAllAsTouched();
      this.scrollToFirstInvalidControl1();
    }


    else {


      let license = {
        provinces_id: this.insurancestate_id,
        provinces_name: this.insurancestatename,
        expiry_date:
          this.datePipe.transform(
            this.licenseform.value.expiryDate,
            'yyyy-MM-dd'
          ) || '',
        reminder_email: parseInt(this.licenseform.value.remainder),
        license_num: this.licenseform.value.licenseNumber,
        license_coverage: this.licenseform.value.licenseCoverage1,
      };
      this.licensesInfo.push(license);
      let data: any = {
        formType: this.brokerregform.value.Signupformtype,
        name: this.brokerregform.value.formName,
        description: this.brokerregform.value.formDescription,
        link: this.brokerregform.value.formLink,
        planLevels: '',
      };

      console.log(data)
      this.SignupFormData.push(data);

      let disclousreDetails = '';
      let parentlogo =''
      if (this.uploaddisclousreAggrement) {
        (disclousreDetails = this.uploaddisclousreAggrement),
          'Admin_logo' +
            Date.now() +
            '.' +
            this.uploaddisclousreAggrement.name.split('.').pop().toLowerCase();
      } else {
        disclousreDetails = '';
      }


      if (this.uploadlogo) {
        (parentlogo = this.uploadlogo),
          'Admin_logo' +
            Date.now() +
            '.' +
            this.uploadlogo.name.split('.').pop().toLowerCase();
      } else {
        parentlogo = '';
      }

let saleTrackingCode :any=[
  {"brokerId": 1, "percentage": 50},
  {"brokerId": 2, "percentage": 50}
]


let saleTrackingCodearr=[]
for(let i=0;i<this.brokersalesCodes.length;i++){

  let obj={
    "brokerId" :parseInt(this.brokersalesCodes[i].brokerId) || "",
    "percentage" :parseInt(this.brokersalesCodes[i].percentage) || "",

  }
  saleTrackingCodearr.push(obj)
}


console.log(saleTrackingCodearr)


for(let i=0;i<saleTrackingCodearr.length;i++){


  if(saleTrackingCodearr[i].brokerid=="" || saleTrackingCodearr[i].percentage ==""){
    saleTrackingCodearr =[]
  }

}


// if(this.brokerregform.value.stc_generation =="true"){
// console.log("1")

// }
// else{
//   console.log("2")
//   this.brokerregform.value.user_generated_stc = "false"
// }
let FormDetails:any = this.addformDetails

      var formdata = new FormData();
      let licenses=sessionStorage.getItem('addlicenseformData');
      if(licenses==null)
      licenses='';
    for(let i=0;i<FormDetails.length;i++){

      formdata.append('formLogo'+[i+1]+'',FormDetails[i].logo)
    }


      formdata.append('parent_name', this.brokerregform.value.ParentbrokerName);
      formdata.append('postal_code', this.brokerregform.value.postalCode || "");
      formdata.append('sales_tracking_code', this.brokerregform.value.sales_tracking_code?.replaceAll('-',"") || "");
      formdata.append(
        'secondary_phone',
        this.brokerregform.value.secondaryPhone || "");
      formdata.append("business_number", this.brokerregform.value.businessnumber || "");
      formdata.append('country_id', '1');
      formdata.append('apt', '');
      formdata.append('state_id', this.state_id);
      formdata.append('province_id', this.state_id);
      formdata.append('city', this.capitalize(this.brokerregform.value.city) || "");
      formdata.append('logo', parentlogo);
      formdata.append(
        'name',
        this.capitalize(this.brokerregform.value.brokersName)
      );
      formdata.append(
        'EOinsurence',
        JSON.stringify(this.EOinsurenceInfo) || ''
      );
      formdata.append('useParentsLogo', this.brokerregform.value.parentlogo);
      formdata.append('parent_id', this.brokerregform.value.ParentbrokerName);
      formdata.append('province', this.brokerregform.value.Province || "");
      formdata.append('state', this.brokerregform.value.Province || "");
      formdata.append(
        'secondary_email',
        this.brokerregform.value.secondaryEmail || ""
      );
      formdata.append("sales_tracking_code_shares", JSON.stringify(saleTrackingCodearr))  //JSON.stringify(saleTrackingCodearr)
      formdata.append('licenses', licenses);
      formdata.append('brokerType', this.brokerTypeName);
      formdata.append(
        'street_address_line1',
        this.capitalize(this.brokerregform.value.streetAddress) || ""
      );
      formdata.append(
        'country',
        this.capitalize(this.brokerregform.value.country) || ""
      );
      formdata.append(
        'street_address_line2',
        this.capitalize(this.brokerregform.value.streetAddress2) || ""
      );
      formdata.append('createSignupForm', this.brokerregform.value.signupForm);
      formdata.append('phone_number', this.brokerregform.value.primaryPhone || "");
      formdata.append(
        'email',
        this.brokerregform.value.primaryEmail || ""
      );
      formdata.append('disclosureAgreement', disclousreDetails);
      formdata.append('formDetails', JSON.stringify(this.addformDetails) || "");
      formdata.append('stc_generation', this.brokerregform.value.stc_generation);  //advisor---true,reaming:false
      formdata.append('user_generated_stc', this.brokerregform.value.user_generated_stc || "false");  //advisor---true,reaming:false
      formdata.append('groupContacts', JSON.stringify(this.adminData));
      // formdata.append("formDisclosureAgreement1", "");

      var form = new FormData();

      var accessToken = sessionStorage.getItem('accessToken');
      // var brokerRegistartion = '/api/ap/broker/registrationNew1';
      var brokerRegistartion = '/api/ap/v2/broker/registration/withGroupContact';

      var requestOptions: any = {
        method: 'POST',

        body: formdata,

        redirect: 'follow',
        headers: { Authorization: 'Bearer ' + accessToken },
      };

      // console.log(requestOptions)

      fetch(environment.apiUrl + brokerRegistartion, requestOptions)
        .then((response) => response.text())

        .then((response: any) => {
          // console.log(response);
          response = JSON.parse(response);

          if (response['status'] == 200) {
            $('#sumamryModel').modal('show');
            this.finalSummaryDataForm = response.data.form
            this.finalSummaryBrookerDataName = response.data.broker.name
            this.finalSummaryBrookerDataid = response.data.broker.id
            this.finalSumamryBrokerType = response.data.broker.brokerType
            this.finalSumamryBrokersalesTrackingCode = response.data.broker.salesTrackingCode

            this.finalSummaryBrookerDataBrokerType = response.data.broker.name;

            response.data.information.EOinsurence.EOIexpiryDate=moment(response.data.information.EOinsurence.EOIexpiryDate).format('MM-DD-YYYY');

            this.finalSummaryDataEOinsurance.push(response.data.information.EOinsurence);
            // this.finalSummaryDataEOinsurance=response.data.information.EOinsurence;

            this.finalSummaryDatalicense= response.data.information.licenses
            this.brokerCommissions= response.data.information.brokerCommissions

            this.brokerregform.reset();
            this.licenseform.reset();
            this.formCreation.reset();

            sessionStorage.setItem("addlicenseformData",'')
            sessionStorage.setItem("addformDetails",'')
          }
          else{
        Swal.fire({ title: 'Error', text: response.message });
          }
        });
    }
  }
  copyInputMessage(inputElement){

    console.log(inputElement)
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
  viewfulldetailsofBroker(id){
    $('#sumamryModel').modal('hide');
    this.router.navigate(['/manageAdvisors/editAdvisor/'+this.finalSummaryBrookerDataid]);
    // alert(id)
  }
  closesummarydetails(){
    window.location.reload();
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

  salesTrackingFormater(){
    const inputValue =this.broker['sales_tracking_code'].value;

    this.broker['sales_tracking_code'].
    setValue(this.salesTrackingFormaterFormatter.transform(inputValue), { emitEvent: false });
  }
  public capitalize(str: any) {
    // if (str) {
    //   return str.charAt(0).toUpperCase() + str.slice(1);
    // }
    if(str==null)return '';
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

  }
  const str2 = arr.join(" ");
  return str2
  }

  closePopup(id: any) {
    $(`#${id}`).hide();
  }

   isNumberKey(evt) {
// alert("s")
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }
}
export function postalcodeValidator(control: AbstractControl) {
  var postalRegexp = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/gm;
  if (control.value && !postalRegexp.test(control.value)) {
    return { invalidPostalCode: true };
  }
  return null;
}

export function emailCheck(control: AbstractControl) {
  const disallowedCharacters = ".";
  console.log('control',control.value);
  let notAlloewdSecvence=['"','#','$','%' ,'(', ')' ,'.' ,',', ':' ,';', '<' ,'>','@', '[' ,']'];

   let uniqueValu=[...new Set(control.value.split(''))];


  const regexPattern = new RegExp(`[${disallowedCharacters}]{2,}`);
  if(regexPattern.test(control.value)){
   return {invalidEmail :true}
  }
  return null;
}
