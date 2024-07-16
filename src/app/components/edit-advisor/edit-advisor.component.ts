import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import * as moment from "moment";
import { PhoneFormatPipe } from "../../pipes/phone-format.pipe";

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
declare var $: any;

@Component({
  selector: 'app-edit-advisor',
  templateUrl: './edit-advisor.component.html',
  styleUrls: ['./edit-advisor.component.css'],
  providers: [DatePipe,PhoneFormatPipe],
 // providers: [DatePipe,PhoneFormatPipe,salesTrackingFormater,SalestrackingcodePipe],
})
export class EditAdvisorComponent implements OnInit {
  adminName:any;
  public id: string;
  streetAddressline1:any;
            streetAddressline2:any;
            primaryPhone:any;
            secondaryPhone:any;
            primaryEmail:any;
            secondaryEmail:any;
            country:any;
            city:any;
            state:any;
            postalCode:any;
  showaddadmin = true;
  showformtype = false;
  showaddform = false;
  addlicenseform = true;
  isEditable =true;
  enableEditIndex =null;
  todayDate:any;
  planLevels:any;
  uploadFormlogo:any;
  isEditableForm = true;
  enableEditIndexForm = null;
  editbrokerEOinfo:any;
  editEOinsurerName:any;
  editEOpolicy:any;
  editEOcertificate:any;
  editEOExpiryDate:any;
  isEditableEO =true;
  enableEditIndexEO =null;
  showFormsDetails =true;
  shortNameValue:any;
  editFormType:any;
  editFormDetails:any;
  editFormName:any;
  brokerinfobrokerType:any;
  parentBrokerId:any;
  brokerinfoName:any;
  brokerid:any;
  editFormDescription:any;
  editFormlink:any;
  editFormlogo:any;
  brokerlicensedetails:any
  editFormDisclousreAggrement:any;
  showparentdisclosurecondition = false;
  addlicenseformtable = false;
  addlicenseformData: Array<any> = [];
  addformDetails: Array<any> = [];
  productsArrayList: Array<any> = [];
  fromplansarry: Array<any> = [];
  editindex: any;
  groupContactId:any;
  showimagelogo = true;
  showdisclosureaggrement = true;
  showparentlogocondition = false;
  imagedisplaypdf: any;
  editbrokerlicensenumber: any;
  editbrokerlicensecoverage: any;
  editbrokerlicensestate: any;
  editbrokerlicenseexpirydate: any;
  editbrokerlicenseexpiryremainder: any;
  configprovinceres: any;
  enrollmentDates: any;
  imagedisplay: any;
  provincialHealthcareUrl: any;
  provincialZipcodes: any;
  SignupFormData: Array<any> = [];
  licensesInfo: Array<any> = [];
  EOinsurenceInfo: any;
  provincelistid: any;
  insurancestate_id: any;
  insurancestatename: any;
  licenseData: any;
  state_id: any;
  statename: any;
  serverUrl:any;
  public postalvalue: any;
  brokerData: Array<any> = [];
  allBrokers: Array<any> = [];
  licenseCoverage: Array<any> = [];
  brokerType: Array<any> = [];
  formType: Array<any> = [];
  uploaddisclousreAggrement: any;
  productsArray: Array<any> = [];
  advisorGroupContact: Array<any> = [];
  uploadlogo: any;
  showBusinessnumber: boolean = false;
  customForm: boolean = false;
  public invalidpostalcodeprivince: boolean = false;
  formTitle:any;
  formDescription:any
  showlicenseForm =false;
  showEOForm =false;
  brokerLicensedStatesAndProvinces: Array<any> = [];
  brokerEOinformation: Array<any> = [];
  brokerFormData: Array<any> = [];
  brokerAdmins: Array<any> = [];
  globalbrokerFormData: Array<any> = [];
  brokerContactInfo: Array<any> = [];
  adminData: any;
  addadminform = false;
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
    thirdemail: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    Province: new FormControl(''),
    postalCode: new FormControl(''),
    InsuranceName: new FormControl(''),
    policyNumber: new FormControl(''),
    certificateName: new FormControl(''),
    Insuranceexpiry: new FormControl(''),
    salesTrackingCode: new FormControl(''),
    salesTrackingDescription: new FormControl(''),
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
    roleName:new FormControl(''),
  });
  licenseform: FormGroup = new FormGroup({
    licenseNumber: new FormControl(''),
    licenseCoverage: new FormControl(''),
    state: new FormControl(''),
    expiryDate: new FormControl(''),
    remainder_days: new FormControl(''),
  });
  eoform: FormGroup = new FormGroup({
    insurerName: new FormControl(''),
    policyNumber: new FormControl(''),
    certificateNumber: new FormControl(''),
    expiryDate: new FormControl('')
   });


  formCreation: FormGroup = new FormGroup({
    Signupformtype: new FormControl(''),
    formName: new FormControl(''),
    formDescription: new FormControl(''),
    formlink: new FormControl(''),
    formlogo: new FormControl(''),
    formplanLevels: new FormControl(''),
    formdisclosureAgreement: new FormControl(''),
  });
  ShowOthers: boolean=false;
  prevSTC: any;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private _clipboardService: ClipboardService,
    private toastrService: ToastrService,
    private phoneNoFormat: PhoneFormatPipe,
  ) {}
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  ngOnInit() {


    this.adminData =[]
    this.serverUrl =environment.apiUrl
    this.todayDate=new Date()
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
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
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
      businessnumber: [''],
      streetAddress: ['', [Validators.required]],
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
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      Province: ['', [Validators.required]],
      postalCode: ['', [Validators.required,Validators.compose([postalcodeValidator])]],
      InsuranceName: [''],
      policyNumber: [''],
      certificateName: [''],
      Insuranceexpiry: [''],
      salesTrackingCode: [''],
      salesTrackingDescription: [''],
      parentlogo: [''],
      parentdisclosure: [''],
      logo: [''],
      disclosureAgreement: [''],
      signupForm: [''],
    });
    this.adminform = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
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
      role: ['', [Validators.required]],
      roleName:['']
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
      licenseCoverage: ['', [Validators.required]],
      state: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      remainder_days: ['', [Validators.required]],
    });
    this.eoform = this.formBuilder.group({
      insurerName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      policyNumber: ['', [Validators.required]],
      certificateNumber: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
    });



    this.formCreation = this.formBuilder.group({
      Signupformtype: ['', [Validators.required]],
      formName: ['', [Validators.required]],
      formDescription: ['', [Validators.required]],
      formlink: [''],
      formlogo: [''],
      formplanLevels: ['', [Validators.required]],

    });

    this.id = this.route.snapshot.paramMap.get('id');

    this.productsArray =[{"id":"3","name":"Classic Bronze"},{"id":"4","name":"Classic Silver"},{"id":"7","name":"All-In Bronze"},{"id":"8","name":"All-In Silver"}]



    this.formConfig();
    this.getBrokerDetails()
  }

  getBrokerDetails(){
    this.brokerEOinformation =[]
    console.log(this.route.snapshot.params['id'])
        // let broker= broker.id
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

            let licenseData = response.data.brokerLicensedStatesAndProvinces

            for(let i=0;i<licenseData.length;i++){

              licenseData[i].expiryDate =  this.datePipe.transform(
          licenseData[i].expiryDate,
          'dd-MM-yyyy'
        )
            }

            if(licenseData.length==0){
           this.showlicenseForm = true
            }
            else{
              this.showlicenseForm = false
            }

            let licenseEO = response.data.brokerEoInsurance

            const isObjectEmpty = (objectName) => {
              return Object.keys(objectName).length === 0
            }


            if(isObjectEmpty(licenseEO)==true){
              this.showEOForm = true
               }
               else{
                 this.showEOForm = false
               }


              licenseEO['expiryDate']= this.datePipe.transform(
                response.data.brokerEoInsurance.expiryDate,
                'dd-MM-yyyy'

              )


            this.brokerEOinformation.push(licenseEO)



            this.brokerLicensedStatesAndProvinces = licenseData

            this.brokerFormData = response.data.signupForms??[];
            console.log("formsData", this.brokerFormData)

            if(this.brokerFormData && this.brokerFormData.length>0){
              this.showFormsDetails =true;
              this.showaddform =false;
            }
            else{
              this.showFormsDetails =false
              this.showaddform =true;
            }

              this.parentBrokerId  = response.data.parentId
            this.globalbrokerFormData = response.data.signupForms??[]

            // this.adminData = response.data.brokerAdmins;
            this.adminData = response.data.brokerAdminsOld;

            if(this.adminData.length>0){
              this.addadminform = false
              this.showaddadmin =true
            }
            else{
              this.addadminform =true
              this.showaddadmin =false
            }


            this.brokerContactInfo.push(response.data.contactInfo?response.data.contactInfo:'')

            this.streetAddressline1 = this.brokerContactInfo[0].line1
            this.streetAddressline2 = this.brokerContactInfo[0].line2
            this.primaryPhone = this.brokerContactInfo[0].primaryPhone
            this.secondaryPhone = this.brokerContactInfo[0].secondaryPhone
            this.primaryEmail = this.brokerContactInfo[0].primaryEmail
            this.secondaryEmail = this.brokerContactInfo[0].secondaryEmail
            this.country = this.brokerContactInfo[0].country
            this.city = this.brokerContactInfo[0].city
            this.state = this.brokerContactInfo[0].state
            this.postalCode = this.brokerContactInfo[0].postalCode
            this.brokerinfobrokerType = response.data.brokerType

            this.brokerinfoName = response.data.name

            this.brokerid = response.data.id

            console.log(this.brokerLicensedStatesAndProvinces)

            } else {
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
              // Swal.fire(error.error.error.message)
              Swal.fire({ title: 'Error', text: error.error.error.message });
            }
            // this.toastrService.error("Invalid Credentials", 'Error!');
          }
        );
      }

      groupContactChange(event:any){
        if(event.target.value=='ADVISOR_OTHERS'){
          this.ShowOthers=true;
          this.adminform.get('roleName').setValidators(Validators.required);
        }
        else{
          this.ShowOthers=false;
          this.adminform.get('roleName').clearValidators();
        }
        this.adminform.get('roleName').updateValueAndValidity();
      }

  get broker() {
    return this.brokerregform.controls;
  }
  get f() {
    return this.licenseform.controls;
  }
  get form() {
    return this.formCreation.controls;
  }
  get eo() {
    return this.eoform.controls;
  }
  get grpcontact() {
    return this.adminform.controls;
  }
  addadmin() {
    if(this.ShowOthers){
      this.grpcontact['roleName'].markAsTouched();
    }
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
      id:this.brokerid,
      roleName:'' //this.adminform.value.role=='ADVISOR_OTHERS'?this.adminform.value.roleName:"",

    };
    if(obj.role=='ADVISOR_OTHERS')
    obj['roleName']=this.adminform.value.roleName;

    this.adminData.push(obj);

    this.adminform.reset();
    this.showaddadmin = true;
    this.addadminform = false;

    // if(obj.role=='ADVISOR_OTHERS')
    // obj['roleName']=this.adminform.value.roleName;
    // this.adminData.push(obj);

    this.adminform.reset();
    this.showaddadmin = true;
    this.addadminform = false;
    this.ShowOthers=false;

    $('#basicModaladdgrpcontact').modal('hide');



    var addBrokerDetails = '/api/ap/broker/'+ this.brokerid+'/groupContact';
    var accessToken = sessionStorage.getItem('accessToken');

    this.http
    .post(environment.apiUrl + addBrokerDetails,obj,{
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    })
    .subscribe(
      (response: any) => {
        if (response['status'] == 200 || response['statusCode'] == 200) {

this.getBrokerDetails()
        } else {
          Swal.fire({title:'Error',text:response.message})
        }
      },
      (error) => {
        if (
          error.status == 400 ||
          error.status == 401 ||
          error.status == 402 ||
          error.status == 403
        )
        {
          Swal.fire({
            title: 'Error',
            text: error.error.error.message,
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'Ok',
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
      })



  }
  deleteadmin(admin,index: any) {

    Swal.fire({
      title:'Alert',
      text: 'Are you sure you want to delete this Group Contact?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // const Data = this.adminData;
        // const removed = Data.splice(index, 1);


        var deletebroker = '/api/ap/broker/'+ this.brokerid+'/groupContact/'+ admin.userId+'';
        var accessToken = sessionStorage.getItem('accessToken');

        this.http
        .delete(environment.apiUrl + deletebroker,{
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response: any) => {
            if (response['status'] == 200 || response['statusCode'] == 200) {

    this.getBrokerDetails()
            } else {
              Swal.fire({title:'Error',text:response.message})
            }
          },
          (error) => {
            if (
              error.status == 400 ||
              error.status == 401 ||
              error.status == 402 ||
              error.status == 403
            )
            {
              Swal.fire({
                title: 'Error',
                text: error.error.error.message,
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'Ok',
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
          })

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

  editadmin(admin: any, index: any) {

    console.log(this.adminform)
    console.log(admin)
    this.ShowOthers=admin.role=="ADVISOR_OTHERS"?true:false;
    this.adminform.patchValue(admin)

    console.log(this.adminform)
    this.editindex = index;
    this.groupContactId = admin.userId
  }
  editadminSubmit(admin) {
    if(this.ShowOthers){
      this.grpcontact['roleName'].markAsTouched();
    }
    if (this.adminform.invalid) {
      console.log(this.adminform);
      return;
    }
    console.log(JSON.stringify(this.adminform.value, null, 2));

let obj=JSON.stringify(this.adminform.value, null, 2)
    this.adminData[this.editindex] = this.adminform.value;

    console.log(obj)

    this.adminform.reset();
    this.showaddadmin = true;
    this.addadminform = false;
    $('#basicModaleditgroupcontact').modal('hide');
    var editbroker = '/api/ap/broker/'+ this.brokerid+'/groupContact/'+ this.groupContactId+'';
    var accessToken = sessionStorage.getItem('accessToken');

    this.http
    .put(environment.apiUrl + editbroker, obj,{
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    })
    .subscribe(
      (response: any) => {
        if (response['status'] == 200 || response['statusCode'] == 200) {

this.getBrokerDetails()
        } else {
          Swal.fire({title:'Error',text:response.message})
        }
      },
      (error) => {
        if (
          error.status == 400 ||
          error.status == 401 ||
          error.status == 402 ||
          error.status == 403
        )
        {
          Swal.fire({
            title: 'Error',
            text: error.error.error.message,
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'Ok',
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
      })
    // $('#basicModal1').modal('hide');
  }
  hidegrpadmindetails() {
    this.adminform.reset();
  }
  saveLicense(license:any,index:number){


    console.log(this.brokerLicensedStatesAndProvinces[index])

//     console.log(license)


    var accessToken = sessionStorage.getItem('accessToken');
    var saveAdvisorlicense = '/api/ap/broker/'+ license.brokerId+'/license/'+license.id+'';


    let licenseData = this.brokerLicensedStatesAndProvinces[index]

    console.log(this.insurancestate_id)
    console.log(this.insurancestatename)
    console.log(this.brokerLicensedStatesAndProvinces[index].expiryDate)
    console.log(this.datePipe.transform(this.brokerLicensedStatesAndProvinces[index].expiryDate,'yyyy-MM-dd'))
    // console.log(this.datePipe.transform(date,"yyyy-MM-dd")); //output : 2018-02-13

    let Data=
      {
        "provinces_id": this.insurancestate_id || this.brokerLicensedStatesAndProvinces[index].stateId,
        "provinces_name": this.insurancestatename || this.brokerLicensedStatesAndProvinces[index].stateFullDetails.name,
        "expiry_date": this.datePipe.transform(this.brokerLicensedStatesAndProvinces[index].expiryDate,'yyyy-MM-dd') || '',
        "reminder_email": parseInt(licenseData.reminderEmail),
        "license_num": licenseData.licenseNumber,
        "license_coverage": licenseData.licenseCoverage
      }


      console.log(Data)
    this.http
    .put(environment.apiUrl + saveAdvisorlicense,Data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    })
    .subscribe(
      (response: any) => {
        if (response['status'] == 200 || response['statusCode'] == 200) {
    this.isEditable =true;
this.enableEditIndex =null
this.insurancestate_id =null
this.insurancestatename =null
this.getBrokerDetails()
        } else {
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
            confirmButtonText: 'Ok',
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

  phoneFormatForGroupCont(form:FormGroup,id: any) {
    const inputValue = form.get(id).value;
    //this.adminform.controls
    form.get(id).
    setValue(this.phoneNoFormat.transform(inputValue), { emitEvent: false });
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
  editLicenseSubmit(){

    if (this.licenseform.invalid) {
      console.log(this.licenseform);
      return;
    }

    this.getprovinceshortName(this.licenseform.value.state)

    var accessToken = sessionStorage.getItem('accessToken');
    var saveAdvisorlicense = '/api/ap/broker/'+ this.brokerlicensedetails.brokerId+'/license/'+this.brokerlicensedetails.id+'';


    // var datePipe = new DatePipe("en-US");
    // this.licenseform.value.expiryDate = datePipe.transform(this.licenseform.value.expiryDate, 'yyyy-MM-dd');



    // console.log(this.licenseform.value.expiryDate)
    // let expiryDate;
    // if(this.licenseform.value.expiryDate.includes("T")){
    //   expiryDate = this.datePipe.transform(
    //     this.licenseform.value.expiryDate,
    //     'yyyy-MM-dd'
    //   ) || ''
    // }else{

    //   let myDate = this.licenseform.value.expiryDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    //   expiryDate = this.datePipe.transform(myDate, 'yyyy-MM-dd', 'es-ES');
    // }

    let Data=
      {
        "provinces_id": this.insurancestate_id || this.brokerlicensedetails.stateId,
        "provinces_name": this.insurancestatename || this.brokerlicensedetails.stateFullDetails.name,
        "expiry_date":  moment(this.licenseform.value.expiryDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
        "reminder_email": parseInt(this.licenseform.value.remainder_days),
        "license_num": this.licenseform.value.licenseNumber,
        "license_coverage": this.licenseform.value.licenseCoverage,
        "provinceshortName":this.shortNameValue
      }


      console.log(Data)
    this.http
    .put(environment.apiUrl + saveAdvisorlicense,Data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    })
    .subscribe(
      (response: any) => {
        if (response['status'] == 200 || response['statusCode'] == 200) {
    this.isEditable =true;
this.enableEditIndex =null
this.insurancestate_id =''
this.insurancestatename =''

// this.brokerContactInfo =[]
this.getBrokerDetails()
$('#basicModaledit').modal('hide');
        } else {
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
            confirmButtonText: 'Ok',
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
  editeoinfosumbit(){
    if (this.eoform.invalid) {
      this.eoform.markAllAsTouched();
      console.log(this.eoform);
      return;
    }
    console.log(this.eoform)


    var accessToken = sessionStorage.getItem('accessToken');
    var updateLicenseEO = '/api/ap/broker/'+ this.editbrokerEOinfo.brokerId+'/updateLicenceEO';



    let data={
      "certificateNumber":this.eoform.value.certificateNumber,
      "expiryDate":moment(this.eoform.value.expiryDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
      "insurerName":this.capitalize(this.eoform.value.insurerName),
      "policyNumber":this.eoform.value.policyNumber
    }
    this.http
    .put(environment.apiUrl + updateLicenseEO, data,{
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    })
    .subscribe(
      (response: any) => {
        if (response['status'] == 200 || response['statusCode'] == 200) {
          this.getBrokerDetails()
          $('#basicModaleditEO').modal('hide');
        } else {
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
            confirmButtonText: 'Ok',
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

  saveEOInfo(broker:any,index:number){



    var accessToken = sessionStorage.getItem('accessToken');
    var updateLicenseEO = '/api/ap/broker/'+ broker.brokerId+'/updateLicenceEO';

    let EOData =this.brokerEOinformation[index]
    let data={
      "certificateNumber":EOData.certificateNumber,
      "expiryDate":this.datePipe.transform(
        EOData.expiryDate,
        'yyyy-MM-dd'
      ) || '',
      "insurerName":this.capitalize(EOData.insurerName),
      "policyNumber":EOData.policyNumber
    }

    console.log(data)

    this.http
        .put(environment.apiUrl + updateLicenseEO, data,{
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response: any) => {
            if (response['status'] == 200 || response['statusCode'] == 200) {
              this.isEditableEO = true;
              this.enableEditIndexEO =null
        this.getBrokerDetails()
            } else {
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
                confirmButtonText: 'Ok',
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
  ngAfterViewInit() {
    // this.message = 'all done loading :)'
  }
  editadvisorlicenseDetails(e,i,broker){
    // this.isEditable =false;
    // this.enableEditIndex = i;
    // console.log(i, e);

console.log(broker)
    this.brokerlicensedetails = broker
    // this.editindex = i;
    this.editbrokerlicensenumber = broker.licenseNumber;
    this.editbrokerlicensecoverage = broker.licenseCoverage;
    this.editbrokerlicensestate = broker.stateFullDetails.shortName;
    // this.editbrokerlicenseexpirydate = this.datePipe.transform(broker.expiryDate, "MM-dd-yyyy") || "";
    this.editbrokerlicenseexpirydate =broker.expiryDate
    this.editbrokerlicenseexpiryremainder = broker.reminderEmail;
    // this.editbrokerlicenseshortName = broker.provinceshortName

    this.cdr.detectChanges();

  }
  editadvisorEODetails(e,i,broker){

    console.log(broker)

    this.editindex = i;

    this.editbrokerEOinfo  =broker
    this.editEOinsurerName = broker.insurerName;
    this.editEOpolicy = broker.policyNumber;
    this.editEOcertificate = broker.certificateNumber;
    this.editEOExpiryDate = broker.expiryDate;





  }


  editadvisorformDetails(e,i,form){
    // this.isEditableForm =false;
    // this.enableEditIndexForm = i;
    // console.log(i, e);
    // this.addformDetails = JSON.parse(sessionStorage.getItem('addformDetails'))


    this.editFormDetails =form

    console.log(form)
    this.editindex = i;
    this.editFormType = form.formType;
    this.editFormName = form.name;
    this.editFormDescription = form.description;
    this.editFormlink = "";
    this.editFormlogo = form.logo;
    this.editFormDisclousreAggrement = "";
    this.planLevels = form.planLevels

    if(form.signupFormPlanLevels){

      if(form.name=='CUSTOME'){

        this.customForm =true
        this.selectedItems = form.planLevels
      this.form['formplanLevels'].setValidators([Validators.required]);;

      this.form['formplanLevels'].updateValueAndValidity();
      }
      else{
        this.customForm =false
      this.form['formplanLevels'].clearValidators();

      this.form['formplanLevels'].updateValueAndValidity();
      }


    }
    else{

      this.customForm =false
      this.form['formplanLevels'].clearValidators();

      this.form['formplanLevels'].updateValueAndValidity();
    }

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

        var accessToken = sessionStorage.getItem('accessToken');
        var deleteBrokerlicens = '/api/ap/broker/'+ license.brokerId+'/license/'+license.id+'';

        this.http
        .delete(environment.apiUrl + deleteBrokerlicens, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response: any) => {
            if (response['status'] == 200 || response['statusCode'] == 200) {

          this.getBrokerDetails()
            } else {
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
                confirmButtonText: 'Ok',
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
    })


  }

  deleteEO(license:any,index:number){

    Swal.fire({
      title:'Alert',
      text: 'Are you sure you want to delete this E&O?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {


        var accessToken = sessionStorage.getItem('accessToken');
        var deleteBrokerlicenseEO = '/api/ap/broker/'+ license.brokerId+'/EOI';

        this.http
        .delete(environment.apiUrl + deleteBrokerlicenseEO, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response: any) => {
            if (response['status'] == 200 || response['statusCode'] == 200) {

            this.getBrokerDetails()
            this.eoform.reset()
            } else {
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
                confirmButtonText: 'Ok',
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
    })


  }

  deleteForm(from:any,i:number){


    // console.log(from)
    Swal.fire({
      title:'Alert',
      text: 'Are you sure you want to delete this form?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // this.brokerFormData.splice(i, 1);
        var accessToken = sessionStorage.getItem('accessToken');
        var deleteBrokerForm = '/api/ap/broker/form/'+from.id+'';

        this.http
        .delete(environment.apiUrl + deleteBrokerForm, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response: any) => {
            if (response['status'] == 200 || response['statusCode'] == 200) {

            this.getBrokerDetails()

            } else {
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
                confirmButtonText: 'Ok',
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
        if (this.brokerFormData.length==0) {
                this.showaddform =true;
                  this.showFormsDetails  =false;
        }
        else{
          this.showaddform =false;
          this.showFormsDetails =true;
        }
      }
    })
  }
  saveForm(form:any,index:number){

    console.log(form)
    console.log(index)


    let obj = {
      formType: form.formType,
      name: form.name,
      description:form.description,
      link: "",
      planLevels: form.planLevels || "",
      logo: form.logo || "",
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

  cancellicneseEdit(e,i){
    this.isEditable =true;
    this.enableEditIndex = null;
    this.getBrokerDetails()

  }
  cancelEOEdit(e,i){
    this.isEditableEO =true;
    this.enableEditIndexEO = null;
    this.getBrokerDetails()

  }
  cancelFormEdit(e,i){
    this.isEditableForm =true;
    this.enableEditIndexForm = null;

    console.log(this.globalbrokerFormData)
    this.brokerFormData = this.globalbrokerFormData
    console.log(this.brokerFormData)
  }

  // brokertype(brokerType){

  //   if(brokerType=="Brokerage"){
  //       this.showBusinessnumber =true
  //   }
  //   else{
  //     this.showBusinessnumber =false
  //   }

  // }
  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  copy(text: string){


    this._clipboardService.copy(text)
 }
 copylink(){
  this.toastrService.success("link copied to Clipboard");
 }
  brokertype(brokerType){
    // alert(brokerType)

    if(brokerType=="BROKERAGE"){
        this.showBusinessnumber =true

        this.broker['businessnumber'].setValidators([Validators.required]);

        this.broker['businessnumber'].updateValueAndValidity();

        // this.stc_generation = "false"
    }
    else{
      this.showBusinessnumber =false

      // this.stc_generation = "true"

      this.broker['businessnumber'].clearValidators();

      this.broker['businessnumber'].updateValueAndValidity();
    }

  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  addnewlicense(){
    this.licenseform.reset();
    this.licenseform.get('licenseCoverage').setValue('');
    this.licenseform.get('licenseCoverage').updateValueAndValidity();
    this.licenseform.get('state').setValue('');
    this.licenseform.get('state').updateValueAndValidity();
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
      expiry_date:moment(this.licenseform.value.expiryDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
      reminder_email: parseInt(this.licenseform.value.remainder_days),
      license_num: this.licenseform.value.licenseNumber,
      license_coverage: this.licenseform.value.licenseCoverage,
    };

    var accessToken = sessionStorage.getItem('accessToken');
    var addlcienseinfo = '/api/ap/broker/'+ this.brokerid+'/brokerStateLicense';

    this.http
    .post(environment.apiUrl + addlcienseinfo, obj,{
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    })
    .subscribe(
      (response: any) => {
        if (response['status'] == 200 || response['statusCode'] == 200) {

        this.getBrokerDetails()
        this.addlicenseformData.push(obj);
        this.licenseform.reset();
        $('#basicModal1').modal('hide');
        } else {
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
            confirmButtonText: 'Ok',
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

  addeo(){
    if (this.eoform.invalid) {
      console.log(this.eoform);
      return;
    }
    console.log(this.eoform)


    var accessToken = sessionStorage.getItem('accessToken');
    var updateLicenseEO = '/api/ap/broker/'+ this.brokerid +'/updateLicenceEO';



    let data={
      "certificateNumber":this.eoform.value.certificateNumber,
      "expiryDate":moment(this.eoform.value.expiryDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
      "insurerName":this.capitalize(this.eoform.value.insurerName),
      "policyNumber":this.eoform.value.policyNumber
    }
    this.http
    .put(environment.apiUrl + updateLicenseEO, data,{
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    })
    .subscribe(
      (response: any) => {
        if (response['status'] == 200 || response['statusCode'] == 200) {
          this.getBrokerDetails()
          this.eoform.reset()

        } else {
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
            confirmButtonText: 'Ok',
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
  addform() {
    if (this.formCreation.invalid) {
      console.log(this.formCreation.value);
      return;
    }
    console.log(JSON.stringify(this.formCreation.value, null, 2));

let formDetails=[]

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

  var form = new FormData();
  var form1 = new FormData();
      let obj = {
        formType: this.formCreation.value.Signupformtype,
        name: this.capitalize(this.formCreation.value.formName),
        description: this.capitalize(this.formCreation.value.formDescription),
        link: "",
        planLevelsisName: false,
        planLevels: this.fromplansarry || [],
        logo: logoDetails || "",
      };

      form1.append("formType", this.formCreation.value.Signupformtype),
      form1.append("name", this.capitalize(this.formCreation.value.formName)),
      form1.append("description", this.capitalize(this.formCreation.value.formDescription)),
      form1.append("link", ''),
      form1.append('formDetails', JSON.stringify(this.fromplansarry) || "");

formDetails.push(obj)
// let finalobj={
//   broker_name: this.brokerinfoName,
//   sales_tracking_code: "",
//   formDetails:formDetails
// }


console.log(formDetails)
    form.append("formDetails", JSON.stringify(formDetails));
    form.append("broker_name", this.brokerinfoName);
    form.append("sales_tracking_code", '');
    form.append("logo", logoDetails || "");


      var accessToken = sessionStorage.getItem('accessToken');
      var addlcienseinfo = '/api/ap/v2/broker/'+ this.brokerid+'/createFormWithLogo';

      var requestOptions: any = {
        method: 'POST',

        body: form,

        redirect: 'follow',
        headers: { Authorization: 'Bearer ' + accessToken },
      };

      // console.log(requestOptions)

      fetch(environment.apiUrl + addlcienseinfo, requestOptions)
        .then((response) => response.text())

        .then((response: any) => {
          response = JSON.parse(response);
          if (response['status'] == 200 || response['statusCode'] == 200) {

          this.getBrokerDetails()
          this.addformDetails.push(obj);
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
          $('#basicModal1').modal('hide');
          } else {
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
              confirmButtonText: 'Ok',
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

    let obj = {
      provinces_id: this.insurancestate_id,
      provinces_name: this.insurancestatename,
      expiry_date:
        this.datePipe.transform(
          this.licenseform.value.expiryDate,
          'yyyy-MM-dd'
        ) || '',
      reminder_email: parseInt(this.licenseform.value.remainder_days),
      license_num: this.licenseform.value.licenseNumber,
      license_coverage: this.licenseform.value.licenseCoverage,
    };
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
 this.editFormlogo = reader.result;
          // this.imagedisplay = reader.result;
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
  editFormSubmit() {
    if (this.formCreation.invalid) {
      console.log(this.formCreation.value);
      return;
    }
    // console.log(JSON.stringify(this.formCreation.value, null, 2));

    var accessToken = sessionStorage.getItem('accessToken');


    var saveAdvisorForm = '/api/ap/broker/'+ this.editFormDetails.brokerId+'/form/'+this.editFormDetails.id+'/modify';


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
  if(this.formCreation.value.formplanLevels && this.formCreation.value.formplanLevels.length>0){
    let formplansData = this.formCreation.value.formplanLevels

    for(let i=0;i<formplansData.length;i++){
      this.fromplansarry.push(formplansData[i].id)
    }
  }
    let obj = {
      formType: this.formCreation.value.Signupformtype,
      name: this.capitalize(this.formCreation.value.formName),
      description:this.capitalize(this.formCreation.value.formDescription),
      link: "",
      planLevels: this.fromplansarry,
      logo: logoDetails|| "",
      formDisclosureAgreement:  "",
    };


    console.log(obj)

    var form = new FormData();
    form.append("newType", this.formCreation.value.Signupformtype);
    form.append("name", this.capitalize(this.formCreation.value.formName));
    form.append("description", this.capitalize(this.formCreation.value.formDescription));
    form.append("nameOrId", "false");
    form.append("planlevel", JSON.stringify(this.fromplansarry) || "[]");
    form.append("logo", logoDetails || "");


    var requestOptions: any = {
      method: 'POST',

      body: form,

      redirect: 'follow',
      headers: { Authorization: 'Bearer ' + accessToken },
    };

    console.log(requestOptions)

    fetch(environment.apiUrl + saveAdvisorForm, requestOptions)
      .then((response) => response.text())

      .then((response: any) => {
        this.getBrokerDetails()
        this.addformDetails[this.editindex] = obj;

        this.formCreation.reset();
        this.showFormsDetails = true;
        this.showaddform = false;
        sessionStorage.setItem(
          'addformDetails',
          JSON.stringify(this.addformDetails)
        );
        $('#basicModalFormedit').modal('hide');


      })


  }
  hideaddlicenseform() {
    this.licenseform.reset();
  }
  addextraform(){
    this.customForm = false
    this.form['formplanLevels'].clearValidators();

      this.form['formplanLevels'].updateValueAndValidity();

    this.formCreation.reset();
    // $('#addFormDetails').modal('show');
    // this.formCreation.reset();
    // this.showaddform = true;
  }
  uploadadminlogo(event1: any) {
    console.log('test');
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
        alert(message);
      }
    } else {
      error = true;

      message = 'Invalid file type. Only jpg, png image,pdf files are allowed.';
      alert(message);
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
            this.allBrokers = response.data.allBrokers;
            this.configprovinceres = response.data.states.sort(
              (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
            );
            this.prevSTC=response.data.prevSTC;
            this.licenseCoverage = response.data.licenseCoverage;
            this.brokerType = response.data.brokerType;
            this.formType = response.data.formType;
            this.productsArray = response.data.packages
            this.advisorGroupContact =response.data.advisorGroupContact


            for(let i=0;i<this.productsArray.length;i++){

              for(let j=0;j<this.productsArray[i].planGroups.length;j++){

                this.productsArrayList.push(this.productsArray[i].planGroups[j])
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
              showCancelButton: false,
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.isConfirmed) {
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
  public provincelist(event: any) {
    // alert(event.target.value)

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
  public insuranceprovincelist(event: any) {
    // alert(event.target.value)

    this.configprovinceres.forEach((element: any) => {
      if (element.shortName == event.target.value) {
        this.provincialHealthcareUrl = element.provincialHealthcareUrl;
        this.provincialZipcodes = element.zipcodes.split(',');
        this.provincelistid = element.id;
        this.insurancestate_id = parseInt(element.id);
        this.insurancestatename = element.name;
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
    console.log(event);

    if (event.target.value == 'true') {
      this.showaddform = true;
    } else {
      // this.showformtype = false;
      this.showaddform = false;
    }
  }
  public checkParentlogo(event) {
    if (event.target.value == 'true') {
      this.showparentlogocondition = false;
    } else {
      this.showparentlogocondition = true;
    }
  }
  public checkParentdisclosure(event) {
    if (event.target.value == 'true') {
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




  gotoadvsiorpage(){
    this.router.navigate(['/manageAdvisors']);
  }
  public submitbasicInfo() {
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
    }

    else {

      let obj={
  apt: "",
  city: this.capitalize(this.brokerregform.value.city),
  country: this.capitalize(this.brokerregform.value.country),
  line1: this.capitalize(this.brokerregform.value.streetAddress),
  line2: this.capitalize(this.brokerregform.value.streetAddress2),
  postalCode: this.brokerregform.value.postalCode,
  primaryEmail: this.brokerregform.value.primaryEmail,
  primaryPhone: this.brokerregform.value.primaryPhone,
  secondaryEmail: this.brokerregform.value.secondaryEmail || "",
  secondaryPhone: this.brokerregform.value.secondaryPhone || "",
  state: this.brokerregform.value.Province
      }

      var updatebasicConatctInfo = '/api/ap/broker/'+ this.brokerid+'/updateContactInfo';
      var accessToken = sessionStorage.getItem('accessToken');
      this.http
      .put(environment.apiUrl + updatebasicConatctInfo,obj, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (response: any) => {
          if (response['status'] == 200 || response['statusCode'] == 200) {
            this.router.navigate(['/manageAdvisors']);
          } else {
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
              confirmButtonText: 'Ok',
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
  }
  public capitalize(str: any) {
    // if (str) {
    //   return str.charAt(0).toUpperCase() + str.slice(1);
    // }
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

  }
  const str2 = arr.join(" ");
  return str2
  }
}
export function postalcodeValidator(control: AbstractControl) {
  var postalRegexp = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/gm;
  if (control.value && !postalRegexp.test(control.value)) {
    return { invalidPostalCode: true };
  }
  return null;
}
