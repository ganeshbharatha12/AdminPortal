import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ExcelService } from './../../services/excel.service';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonPatternsService } from 'src/app/common-patterns.service';

import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CellValue } from 'exceljs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  maxEmployeeCount: any;
  lengthofemployee: any;
  message:any;
  employeedata: Array<any> = [];
  employeedata2: Array<any> = [];
  excelempdata: Array<any> = [];
  employeelistData: Array<any> = [];
  finalemployeekeys: Array<any> = [];
   employeeList: Array<any> = [];
  deletedId: Array<any> = [];
  editemployeefrom = false;
  addemployeefrom = false;
  configureTierList: any;
  editEmployeeindex: any;
  editEmployeeId: any;
  editEmployeefirstname: any;
  editEmployeelastname: any;
  editEmployeephone: any;
  editEmployeeemail: any;
  editEmployeeDateofhire: any;
  editEmployeeDateofbirth: any;
  editEmployeeOccupation: any;
  editEmployeefamilyStatus: any;
  editEmployeesex: any;
  editEmployeeResidenetIn: any;
  editemployeeCountry: any;
  editEmployeeProvince: any;
  editEmployeeeAnnualIncome: any;
  editEmployeeetier: any;
  walletConfigforemployee: any;
  UId:any;
  minDate: any;
  maxDate: any;
  countryList:any;
  currencySymbol='$'
  tierConfigforemployee: any;
  tierConfigCheck: any;
  walletConfigCheck: any;
  configprovinceres: any;
  dateFormat= 'MM-DD-YYYY';
  selectedOption: any;
  provincelistid:any;
  configprovincereslist:any
  addEmployeeformList: FormGroup = new FormGroup({
    employeeId: new FormControl(''),
    employeeFirstName: new FormControl(''),
    employeeLastName: new FormControl(''),
    employeeEmail: new FormControl(''),
    employeeOccupation: new FormControl(''),
    employeeDateofhire: new FormControl(''),
    employeeDateofbirth: new FormControl(''),
    employeeGender: new FormControl(''),
    employeeCountry: new FormControl(''),
    employeeResidence: new FormControl(''),
    employeefamilyStatus: new FormControl(''),
    employeePhoneno: new FormControl(''),
    employeeTier: new FormControl(''),
    empployeeAnnualIncome: new FormControl(''),
  });
  @Output() gotoplansorwallet = new EventEmitter<{ title: string }>();
  @Output() showDataGraph = new EventEmitter<any>();
  @Input() employeeData: any;
  @Input() employeeWorkingProviance:any;

  bookTitle: string;
  @ViewChild('myFileInput') myFileInput: ElementRef;
  empCountryCanada: any='Canada';
  dropdownSettings: { };
  multiSelectProviance: any;
  isUId: any;
  presentMail: any;
  dateOfHire: any;


  constructor(
    private formBuilder: FormBuilder,
    private excelService: ExcelService,
    private http: HttpClient,
    private datePipe: DatePipe,
    public router: Router,
    private elementRef: ElementRef,
    private commonPatternsService:CommonPatternsService
  ) {
    this.minDate = moment().subtract(100, "years").calendar();
    this.maxDate = moment().subtract(16, "years").calendar();
    this.dateOfHire=moment().subtract(70,'years').calendar();

    this.minDate = new Date(this.minDate);
    this.dateOfHire= new Date(this.dateOfHire);

    this.maxDate = new Date(this.maxDate);
  }

  ngOnInit(): void {

    console.log('employeeWorkingProviance',this.employeeWorkingProviance);

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

    this.empCountryCanada="Canada";
    this.selectedOption =""
    // console.log(this.employeeData);
    this.employeeList = this.employeeData;
    // console.log(this.employeeList);
    let formData = JSON.parse(sessionStorage.getItem('formData') || '');
    this.tierConfigCheck = formData.tierConfig==true ? true : false
    this.walletConfigCheck = formData.walletConfig==true ? true : false
    // this.walletConfigforemployee = formData.walletConfig==true ? true : false
    this.maxEmployeeCount = formData.expectednoofEmployees;
    this.lengthofemployee = this.employeeList.length || ""
    // alert(this.employeeList)
    // alert(formData.tierConfig)
    // alert(typeof formData.tierConfig)
    this.addEmployeeformList = this.formBuilder.group({
      employeeId: [''],
      employeeFirstName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
          // Validators.pattern('^(?!\\s)[A-Za-z0-9\\s]+$')
        ],
      ],
      employeeLastName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
          // Validators.pattern('^(?!\\s)[A-Za-z0-9\\s]+$')

        ],
      ],
      employeeEmail: [
        '',
        [
          Validators.required,
          Validators.pattern(this.commonPatternsService.emailPattern),//pattern(/^(?!\\s)*[\sA-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,3}(?!\\s)*$/i),
         //          pattern('^(?!\\s)[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
        ],
      ],

      employeeOccupation: ['',Validators.pattern('^(?!\\s)[A-Za-z0-9\\s]+$')],
      employeeDateofhire: [''],
      employeeDateofbirth: [''],

      employeeGender: [null],
      employeeCountry: ['', [Validators.required]],
      employeeResidence: ['', [Validators.required]],
      employeefamilyStatus: [''],

      employeeTier: ['', [Validators.required]],
      empployeeAnnualIncome: ['', [Validators.required,Validators.pattern('^(?!\\s)[A-Za-z0-9\\s]+$')]],
    });

    if (formData.walletConfig == true) {
      this.walletConfigforemployee = true;

      this.emp['empployeeAnnualIncome'].setValidators([Validators.required]);

      this.emp['empployeeAnnualIncome'].updateValueAndValidity();
    } else {
      this.walletConfigforemployee = false;

      this.emp['empployeeAnnualIncome'].clearValidators();
      this.emp['empployeeAnnualIncome'].updateValueAndValidity();
    }

    if (formData.tierConfig == true) {
      // alert("1")
      this.tierConfigforemployee = true;

      this.emp['employeeTier'].setValidators([Validators.required]);

      this.emp['employeeTier'].updateValueAndValidity();
    } else {
      this.tierConfigforemployee = false;

      this.emp['employeeTier'].clearValidators();
      this.emp['employeeTier'].updateValueAndValidity();
    }

    this.formConfig();



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
            // this.statesInfo = response.data.states;
            // this.walletConfig = response.data.walletConfig;

            // this.allBrokers = response.data.allBrokers;

            // this.payrolldeduction = response.data.payRolldeductionUI
            this.countryList =response.data.countryList

            this.configprovinceres = response.data.states.sort(
              (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
            );

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

  public getprovincelist(event: any) {

    this.countryList.forEach((element: any) => {

      if(element.name==event.target.value){
        this.configprovincereslist = element.countryStates
      }
      this.configprovincereslist = this.configprovincereslist.sort(
        (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
      );
    })


  }

  public getprovincelistCanada(event: any) {

    this.countryList.forEach((element: any) => {

      if(element.name==event){
        this.configprovincereslist = element.countryStates
      }
      this.configprovincereslist = this.configprovincereslist.sort(
        (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
      );
    })


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





  public getprovincelist1(event: any) {

    this.countryList.forEach((element: any) => {

      if(element.name==event){
        this.configprovincereslist = element.countryStates
      }
      this.configprovincereslist = this.configprovincereslist.sort(
        (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
      );
    })


  }
  exportAsXLSX(): void {

    if(!this.tierConfigforemployee&&!this.walletConfigforemployee){
      this.employeedata = [
        {
          label: 'Employee ID',
          key: 'employeeId',
          mandatory: true,
          display: true,
        },
        {
          label: 'First Name',
          key: 'firstName',
          mandatory: true,
          display: true,
        },
        {
          label: 'Last Name',
          key: 'lastName',
          mandatory: true,
          display: true,
        },
        {
          label: 'Email',
          key: 'email',
          mandatory: true,
          display: true,
        },
        {
          label: 'Date of Hire',
          key: 'dateOfHire',
          mandatory: false,
          display: true,
        },
        {
          label: 'Country',
          key: 'country',
          mandatory: true,
          display: true,
        },
        {
          label: 'Province of Employment',
          key: 'provinceOfEmployment',
          mandatory: true,
          display: true,
        },
        {
          label: 'Job Title', //job title
          key: 'jobTitle',
          mandatory: true,
          display: true,
        },
        {
          label: 'Date of Birth',
          key: 'dateOfBirth',
          mandatory: false,
          display: true,
        },

        {
          label: 'Gender',
          key: 'gender',
          mandatory: true,
          display: true,
        },

        {
          label: 'Marital Status', //marital status
          key: 'maritalStatus',
          mandatory: false,
          display: true,
        }
      ];
      this.employeedata2 = [
        {
          label: 'Employee ID',
          header: 'Employee ID',
          key: 'employeeId',
          mandatory: true,
          display: true,
        },
        {
          label: 'First Name',
          header: 'First Name',
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
          label: 'Date of Hire',
          header: 'Date of Hire',
          key: 'dateOfHire',
          mandatory: false,
          display: true,
          style: { numFmt: 'mm-dd-yyyy' },
        },
        {
          label: 'Country',
          header: 'Country',
          key: 'country',
          mandatory: true,
          display: true,
        },
        {
          label: 'Province of Employment',
          header: 'Province of Employment',
          key: 'provinceOfEmployment',
          mandatory: true,
          display: true,
        },
        {
          label: 'Job Title', //job title
          header: 'Job Title',
          key: 'jobTitle',
          mandatory: true,
          display: true,
        },
        {
          label: 'Date of Birth',
          header: 'Date of Birth',
          key: 'dateOfBirth',
          mandatory: false,
          display: true,
          style: { numFmt: 'mm-dd-yyyy' },
        },

        {
          label: 'Gender',
          header: 'Gender',
          key: 'gender',
          mandatory: true,
          display: true,
        },

        {
          label: 'Marital Status', //marital status
          header: 'Marital Status',
          key: 'maritalStatus',
          mandatory: false,
          display: true,
        },
      ];
    } else {
      this.employeedata = [
        {
          label: 'Employee ID',
          key: 'employeeId',
          mandatory: true,
          display: true,
        },
        {
          label: 'First Name',
          key: 'firstName',
          mandatory: true,
          display: true,
        },
        {
          label: 'Last Name',
          key: 'lastName',
          mandatory: true,
          display: true,
        },
        {
          label: 'Email',
          key: 'email',
          mandatory: true,
          display: true,
        },
        {
          label: 'Date of Hire',
          key: 'dateOfHire',
          mandatory: false,
          display: true,
        },
        {
          label: 'Country',
          key: 'country',
          mandatory: true,
          display: true,
        },
        {
          label: 'Province of Employment',
          key: 'provinceOfEmployment',
          mandatory: true,
          display: true,
        },
        {
          label: 'Job Title', //job title
          key: 'jobTitle',
          mandatory: true,
          display: true,
        },
        {
          label: 'Date of Birth',
          key: 'dateOfBirth',
          mandatory: false,
          display: true,
        },

        {
          label: 'Gender',
          key: 'gender',
          mandatory: true,
          display: true,
        },

        {
          label: 'Marital Status', //marital status
          key: 'maritalStatus',
          mandatory: false,
          display: true,
        },
        {
          label: 'Annual Income',
          key: 'annualIncome',
          mandatory: false,
          display: true,
        },
        {
          label: 'Classification Tier',
          key: 'tier',
          mandatory: false,
          display: true,
        },
      ];
      this.employeedata2 = [
        {
          label: 'Employee ID',
          header: 'Employee ID',
          key: 'employeeId',
          mandatory: true,
          display: true,
        },
        {
          label: 'First Name',
          header: 'First Name',
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
          label: 'Date of Hire',
          header: 'Date of Hire',
          key: 'dateOfHire',
          mandatory: false,
          display: true,
          style: { numFmt: 'mm-dd-yyyy' },
        },
        {
          label: 'Country',
          header: 'Country',
          key: 'country',
          mandatory: true,
          display: true,
        },
        {
          label: 'Province of Employment',
          header: 'Province of Employment',
          key: 'provinceOfEmployment',
          mandatory: true,
          display: true,
        },
        {
          label: 'Job Title', //job title
          header: 'Job Title',
          key: 'jobTitle',
          mandatory: true,
          display: true,
        },
        {
          label: 'Date of Birth',
          header: 'Date of Birth',
          key: 'dateOfBirth',
          mandatory: false,
          display: true,
          style: { numFmt: 'mm-dd-yyyy' },
        },

        {
          label: 'Gender',
          header: 'Gender',
          key: 'gender',
          mandatory: true,
          display: true,
        },

        {
          label: 'Marital Status', //marital status
          header: 'Marital Status',
          key: 'maritalStatus',
          mandatory: false,
          display: true,
        },

        {
          label: 'Annual Income',
          header: 'Annual Income',
          key: 'annualIncome',
          mandatory: false,
          display: true,
        },
        {
          label: 'Classification Tier',
          header: 'Classification Tier',
          key: 'classificationTier',
          mandatory: false,
          display: true,
        },
      ];
    }

    var obj: any = {};
    for (let i = 0; i < this.employeedata.length; i++) {
      obj[this.employeedata[i].label] = '';
      this.excelempdata.push(obj);
    }

    var finalres = Object.values(
      this.excelempdata.reduce((c, e) => {
        if (!c[e.Gender]) c[e.Gender] = e;
        return c;
      }, {})
    );

    this.finalemployeekeys = finalres;
     let multiProviance=[];
     this.employeeWorkingProviance.map((proviance)=>{
      multiProviance.push(proviance.shortName);
     });
    console.log(this.finalemployeekeys);
    let formData = JSON.parse(sessionStorage.getItem('formData') || '');
    this.excelService.exportAsExcelFile2(
      this.finalemployeekeys,
      this.employeedata2,
      'EmployeeData',
      formData.tierConfig,
      formData.walletConfig,
      formData.expectednoofEmployees,
      multiProviance
    );
  }

  onFileChangeExcel(ev: any) {

    console.log(ev)

    this.editemployeefrom = false;
    this.addemployeefrom = false;
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
        let ExceldataemailError = false
        let ExceldataEmailErrorMessage = ''
        let ExceldataFirstNameError = false
        let ExceldataFirstNameErrorMessage = ''
        let ExceldataLastNameError = false
        let ExceldataLastNameErrorMessage = ''
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
              //   this.myFileInput.nativeElement.value = '';

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
                  if(value.length >= 3){

                  }
                  else{
                    ExceldataFirstNameError =true
                    ExceldataFirstNameErrorMessage = "First Name must be minimum of 3 characters, please check"
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
                      if(value.length >= 3){

                      }
                      else{
                        ExceldataLastNameError =true
                        ExceldataLastNameErrorMessage = "Last Name must be minimum of 3 characters, please check"
                        break;
                      }
                    }
                    else{
                      ExceldataError =true
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
                  var filter=this.commonPatternsService.emailTestPattern;
                  if (!filter.test(value)) {
                      // alert('Please /provide a valid email address');

                      ExceldataemailError =true
                  ExceldataEmailErrorMessage = "Some fields have invalid email, please check"
                  break;
                  }

                  }
                  else{
                    ExceldataError =true
                    ExceldataErrorMessage = "Email can't be empty"
                    break;
                  }


                break;
                case "Date of Hire":
                  if(value && value !=''){
                    value= moments(value).format(this.dateFormat)
                  }
                break;
                case "Date of Birth":
                  if(value && value !=''){
                    value= moments(value).format(this.dateFormat);
                   let today=moment(new Date());
                   let maxDAte=moment(today.subtract('16','years').calendar()).format(this.dateFormat);

                   if(moment(value).isAfter(maxDAte)){
                    ExceldataError = true;
                    ExceldataErrorMessage ="Age should not exceed 16 years";
                   }
                  }
                break;

                case "Country":
                  if(value && value !=''){


                  }
                  else{
                    ExceldataError =true
                    ExceldataErrorMessage = "Country can't be empty"
                    break;
                  }


                break;
                case "Province of Employment":

                if(value && value !=''){


                  }
                  else{
                    ExceldataError =true
                    ExceldataErrorMessage = "Province can't be empty"
                    break;
                  }
                  break;
                case "Classification Tier":
                // obj["classificationTier"] = this.gettierId(value)
                break;
                case "Job Title":
                  if(value && value !=''){

                    if(value.text && value.text.length){
                      value= value.text.charAt(0).toUpperCase() + value.text.slice(1)
                    }
                    else{
                      value= value.charAt(0).toUpperCase() + value.slice(1)
                    }
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
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.myFileInput.nativeElement.value = '';
          }


        });
          jsonData =[]
        }
        if(ExceldataemailError){

          Swal.fire({title:'Error',
          text:ExceldataEmailErrorMessage
        }).then((result) => {
            if (result.isConfirmed) {
              this.myFileInput.nativeElement.value = '';
            }

          });
          jsonData =[]
        }
        if(ExceldataFirstNameError){

          Swal.fire({title:'Error',
          text:ExceldataFirstNameErrorMessage
        }) .then((result) => {
            if (result.isConfirmed) {
              this.myFileInput.nativeElement.value = '';
            }


          });
          jsonData =[]
        }
        if(ExceldataLastNameError){

          Swal.fire({title:'Error',
          text:ExceldataLastNameErrorMessage
        }).then((result)=>{
          if(result.isConfirmed){
            this.myFileInput.nativeElement.value = '';
          }
        })
          jsonData =[]
        }
      } else {
        //tampered excel error
      }

      console.log(jsonData);

      let uploadEmployeeData = jsonData;

      console.log(uploadEmployeeData);

      uploadEmployeeData = uploadEmployeeData.map(function (obj: any) {
        obj['employeeId'] = obj['Employee ID'];
        obj['firstName'] = obj['First Name'];
        obj['lastName'] = obj['Last Name'];
        obj['email'] = obj['Email'];
        obj['jobTitle'] = obj['Job Title'];
        obj['dateOfBirth'] = obj['Date of Birth'];
        obj['dateOfHire'] = obj['Date of Hire'];
        obj['gender'] = obj['Gender'];
        // obj['residentIn'] = obj['Resident in'];
        obj['country'] = obj['Country'];
        obj['province'] = obj['Province of Employment'];
        obj['maritalStatus'] = obj['Marital Status'];
        obj['phoneNum'] = obj['Phone'];
        obj['annualIncome'] = obj['Annual Income'];
        // obj['annualIncome'] = obj['Annaul Income'];
        // obj['provienceName'] = obj['Provience Name'];
        obj['classificationTier'] = obj['Classification Tier'];


        if (typeof obj.employeeId == 'number') {
          obj.employeeId = obj.employeeId.toString();
        }
        if (typeof obj.phoneNum == 'number') {
          obj.phoneNum = obj.phoneNum.toString();
        }
        if (obj.phoneNum == '') {
          obj.phoneNum = '';
        }
        if (obj.annualIncome == '') {
          obj.annualIncome = 0;
        }
        if (obj.classificationTier == '' || obj.classificationTier == undefined || obj.classificationTier == "All") {
          obj.classificationTier = 0; //assign default tier id
        }

        // obj.dateofBirth =  new Date((obj.dateofBirth - (25567 + 1))*86400*1000);
        delete obj['Employee ID'];
        delete obj['First Name'];
        delete obj['Last Name'];
        delete obj['Email'];
        delete obj['Job Title'];
        delete obj['Date of Birth'];
        delete obj['Date of Hire'];
        delete obj['Gender'];
        //delete obj['Resident in'];
        delete obj['Country'];
        delete obj['Province of Employment'];
        delete obj['Marital Status'];
        delete obj['Phone'];
        delete obj['Annual Income'];
        delete obj['Provience Name'];
        delete obj['Classification Tier'];
        delete obj['Provience Id'];
        // Assign new key
        return obj;

      });

      // assign province-id
      //asign tier-id

      console.log(this.employeeList);

      if (this.employeeList.length > 0) {
        for (let i = 0; i < uploadEmployeeData.length; i++) {
          this.employeeList.push(uploadEmployeeData[i]);
        }
      } else {
        this.employeeList = uploadEmployeeData;
      }

      //original-employee-list

      //already-emp-cust-id?

      for (let i = 0; i < this.employeeList.length; i++) {
        if(this.employeeList[i] && this.employeeList[i]['uId']){

        }
        else{
          this.employeeList[i]['uId'] = 0
        }
        if(this.employeeList[i] && this.employeeList[i]['phoneNum']){

        }
        else{
          this.employeeList[i]['phoneNum'] = ""
        }
      }

      this.lengthofemployee = this.employeeList.length;

      if(this.maxEmployeeCount && this.maxEmployeeCount>0){

      }
      else{
        // this.maxEmployeeCount = this.employeeList.length;
        let formData = JSON.parse(sessionStorage.getItem('formData') || '');

        this.maxEmployeeCount = formData.expectednoofEmployees;
      }

      console.log(this.employeeList);
      if(this.employeeList.length>0){
        this.myFileInput.nativeElement.value = '';
      }
    };
   // reader.readAsBinaryString(file);
  }

   titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you       // Assign it back to the array       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);        }   // Directly return the joined string
    return splitStr.join(' ');
 }
}

  //  Get ProvinceID
  getprovinceId(value){

  }

  textChangeToLowerCase(formcontrolField:any){
    this.emp[formcontrolField].setValue( this.emp[formcontrolField].value.toLowerCase());
  }

  //Get TierID
  gettierId(value){

  }
  numberOnly(event: any): boolean {
  return this.commonPatternsService.numberOnly(event)
  }

  alphabatesOnly(event: any) {
    return this.commonPatternsService.alphabatesOnly(event);
  }




  alphaNumaricssWithHipen(event: any) {
    const charCode = event.which ? event.which : event.keyCode;

    if(event.currentTarget.value.length==0){
      if((charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122)||
      (charCode >= 48 && charCode <= 57)||
      charCode===45)
        return true;
        else return false;
    }
    else{
      if (
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122) ||
        (charCode >= 48 && charCode <= 57)||
        charCode === 32||charCode===45)
        return true;
      else return false;
    }
  }

  onPaste(e: any) { e.preventDefault()}

  alphaNumarics(event: any) {
    return this.commonPatternsService.alphaNumarics(event);
  }

  addemployee() {
    // alert("1")
    $('#addEmployee-modal').modal('show');

    this.editemployeefrom = false;
    this.addemployeefrom = true;
    this.addEmployeeformList.reset();
    var corporateId = sessionStorage.getItem('corporateId');
    var endPoint = '/api/ap/admin/corporate/' + corporateId + '/configureTiers';
    var accessToken = sessionStorage.getItem('accessToken');
    var GetTiers = '/api/ap/admin/corporate/' + corporateId + '/tiers';
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
            this.empCountryCanada='Canada';
            this.countryList.forEach((element: any) => {
              if(element.name==this.empCountryCanada){
                this.configprovincereslist = element.countryStates
              }
              this.configprovincereslist = this.configprovincereslist.sort(
                (a: any, b: any) => (a.shortName > b.shortName ? 1 : -1)
              );
            })
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
  addemployeeform() {
    this.addemployeefrom = false;
    // console.log(JSON.stringify(this.addEmployeeformList.value, null, 2))
  }
  editemployeeform() {
    this.editemployeefrom = false;
    // console.log(JSON.stringify(this.addEmployeeformList.value, null, 2))
  }
  get emp() {
    return this.addEmployeeformList.controls;
  }

  public provincelist(event) {


    this.configprovinceres.forEach((element) => {
      if (element.shortName == event.target.value) {

        this.provincelistid = element.id;

      }
    });



    // alert(this.postalvalue)
  }
  addemployeetolist() {
    console.log(this.addEmployeeformList.value.employeePhoneno);
    console.log(Number(this.addEmployeeformList.value.employeePhoneno));
    console.log(parseFloat(this.addEmployeeformList.value.employeePhoneno));

    console.log(this.addEmployeeformList.invalid);
    if (this.addEmployeeformList.invalid) {
      this.addEmployeeformList.markAllAsTouched();
      return;
    }

    let input = {
      employeeId: this.addEmployeeformList.value.employeeId?this.addEmployeeformList.value.employeeId.toString() : "",
      firstName: this.capitalize(
        this.addEmployeeformList.value.employeeFirstName
      ),
      lastName: this.capitalize(
        this.addEmployeeformList.value.employeeLastName
      ),
      email: this.addEmployeeformList.value.employeeEmail,
      jobTitle: this.capitalize(this.addEmployeeformList.value.employeeOccupation) || '',
      dateOfHire:
        this.datePipe.transform(
          this.addEmployeeformList.value.employeeDateofhire,
          'MM-dd-yyyy'
        ) || '',
      dateOfBirth:
        this.datePipe.transform(
          this.addEmployeeformList.value.employeeDateofbirth,
          'MM-dd-yyyy'
        ) || '',
      gender: this.addEmployeeformList.value.employeeGender || '',
      //residentIn: this.addEmployeeformList.value.employeeResidence || "",
      country:this.addEmployeeformList.value.employeeCountry || '',
      province: this.addEmployeeformList.value.employeeResidence || '',
      workingProvince: this.addEmployeeformList.value.employeeResidence || '',
      workingProvienceId:this.provincelistid || 0,
      maritalStatus: this.addEmployeeformList.value.employeefamilyStatus || '',
      phoneNum: this.addEmployeeformList.value.employeePhoneno || '',
      provinceId: this.provincelistid || 0,

      provinceName: this.addEmployeeformList.value.province || '',
      annualIncome:
        parseInt(this.addEmployeeformList.value.empployeeAnnualIncome) || 0,
        classificationTier: parseInt(this.addEmployeeformList.value.employeeTier) || 0, //tier with id 0 not found
        uId:0
      // fuseBillCustomerCreation: true,
    };


    let checkexecutive = this.employeeList.filter(
      (item: any) => item.firstName == item.email == input.email);

      // (item: any) => item.firstName == input.firstName || item.lastName == input.lastName || item.email == input.email);


      if(checkexecutive && checkexecutive.length){
        for(let i=0;i<checkexecutive.length;i++){

          // if(checkexecutive[i].firstName == input.firstName){
          //   Swal.fire({ title: 'Error', text: 'FirstName already exists'});
          //   return;
          // }
          // if(checkexecutive[i].lastName == input.lastName){
          //   Swal.fire({ title: 'Error', text: 'LastName already exists'});
          //   return;
          // }
          if(checkexecutive[i].email == input.email){
            Swal.fire({ title: 'Error', text: 'Email already exists'});
            return;
          }

        }
      }
      else{

        $('#addEmployee-modal').modal('hide');

        this.employeeList.push(input);
        this.addEmployeeformList.reset();
        this.addemployeefrom = false;
        this.lengthofemployee = this.employeeList.length;

            if(this.maxEmployeeCount && this.maxEmployeeCount>0){

              }
            else{
            let formData = JSON.parse(sessionStorage.getItem('formData') || '');
            this.maxEmployeeCount = formData.expectednoofEmployees;
              }
      }




    // for(let i=0;i<this.employeeList.length;i++){
    //   if(this.employeeList[i].firstName == input.firstName){
    //     Swal.fire({ title: 'Error', text: 'FirstName already exists'});
    //     return;
    //   }
    //   else if(this.employeeList[i].lastName == input.lastName){
    //     Swal.fire({ title: 'Error', text: 'LastName already exists' });
    //     return;
    //   }
    //   else if(this.employeeList[i].email == input.email){
    //     Swal.fire({ title: 'Error', text: 'Email already exists' });
    //     return;
    //   }
    //   else{
    //     this.employeeList.push(input);
    //     this.addEmployeeformList.reset();
    //     this.addemployeefrom = false;
    //     this.lengthofemployee = this.employeeList.length;


    // if(this.maxEmployeeCount && this.maxEmployeeCount>0){

    // }
    // else{
    //   // this.maxEmployeeCount = this.employeeList.length;
    //   let formData = JSON.parse(sessionStorage.getItem('formData') || '');

    //   this.maxEmployeeCount = formData.expectednoofEmployees;
    // }
    //   }


    // }
console.log(this.employeeList)

  }
  editemployeetolist() {
    if (this.addEmployeeformList.invalid) {
      this.addEmployeeformList.markAllAsTouched();
      return;
    }
    // if()
    let editEmailObj={
      firstName: this.capitalize(this.addEmployeeformList.value.employeeFirstName),
      customerId:this.UId,
      employeeId:parseInt(this.addEmployeeformList.value.employeeId?this.addEmployeeformList.value.employeeId.toString() : ""),
      newEmail:this.addEmployeeformList.value.employeeEmail,
      email:this.presentMail,
     }
     console.log("eddddddEmail",editEmailObj);
     if(editEmailObj.customerId!=0&&editEmailObj.newEmail!=editEmailObj.email){
     this.editEployeeAPI(editEmailObj);
    }

    let input = {
      employeeId: this.addEmployeeformList.value.employeeId?this.addEmployeeformList.value.employeeId.toString() : "",
      firstName: this.capitalize(
        this.addEmployeeformList.value.employeeFirstName
      ),
      lastName: this.capitalize(
        this.addEmployeeformList.value.employeeLastName
      ),
      email: this.addEmployeeformList.value.employeeEmail,
      jobTitle: this.capitalize(this.addEmployeeformList.value.employeeOccupation) || '',
      dateOfHire: this.addEmployeeformList.value.employeeDateofhire || '',
      dateOfBirth: this.addEmployeeformList.value.employeeDateofbirth || '',
      gender: this.addEmployeeformList.value.employeeGender || '',
      //residentIn: this.addEmployeeformList.value.employeeResidence || '',
      country: this.addEmployeeformList.value.employeeCountry || '',
      province: this.addEmployeeformList.value.employeeResidence || '',
      workingProvince: this.addEmployeeformList.value.employeeResidence || '',
      maritalStatus: this.addEmployeeformList.value.employeefamilyStatus || '',
      phoneNum: this.addEmployeeformList.value.employeePhoneno || '',
      provinceId: this.provincelistid || 0,
      workingProvienceId:this.provincelistid || 0,
      provinceName: this.addEmployeeformList.value.province || '',
      annualIncome:
      parseInt(this.addEmployeeformList.value.empployeeAnnualIncome) || 0,
      classificationTier: parseInt(this.addEmployeeformList.value.employeeTier) || 0,
      uId:this.UId
      // fuseBillCustomerCreation: true,
    };

    // this.employeeList.push(input)
    this.employeeList[this.editEmployeeindex] = input;
    this.addemployeefrom = false;
    this.editemployeefrom = false;
    this.addEmployeeformList.reset();
    this.lengthofemployee = this.employeeList.length;
    $('#editEmployee-modal').modal('hide');

    if(this.maxEmployeeCount && this.maxEmployeeCount>0){

    }
    else{
      // this.maxEmployeeCount = this.employeeList.length;
      let formData = JSON.parse(sessionStorage.getItem('formData') || '');

      this.maxEmployeeCount = formData.expectednoofEmployees;
    }
  }
  editEployeeAPI(Obj:any){
    console.log("saaasasasa",Obj);
    var corporateId = sessionStorage.getItem('corporateId');
    var endPoint = '/api/ap/admin/corporate/' + corporateId + '/updateEmail';

    var accessToken = sessionStorage.getItem('accessToken');
    this.http
      .post(environment.apiUrl + endPoint, Obj, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (response: any) => {
          if (response['status'] == 200) {
            Swal.fire({title:'INfo',text:response.data.message})
          } else {
            this.emp['employeeEmail'].setValue(Obj.email)
            this.emp['employeeEmail'].updateValueAndValidity();
            Swal.fire({title:'Error#'+ response.errorCode,text:response.message})
          }
        },
        (error) => {
          this.emp['employeeEmail'].setValue(Obj.email)
          this.emp['employeeEmail'].updateValueAndValidity();
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
            Swal.fire({ title: 'Error', text: error.error.error.message }).then((res)=>{
              if(res.isConfirmed){
                this.emp['employeeEmail'].setValue(Obj.email)
                this.emp['employeeEmail'].updateValueAndValidity();
              }
            });
          }
          // this.toastrService.error("Invalid Credentials", 'Error!');
        }
      );
  }
  deletemployee(admin,index: any) {
    this.myFileInput.nativeElement.value = '';
    // this.myFileInput.nativeElement.reset()


    this.addemployeefrom = false;
    this.editemployeefrom = false;


    if(admin.uId && admin.uId>0){

      Swal.fire({
        title:'Alert',
        text: 'Are you sure you want to delete this employee?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Proceed',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          // this.myFileInput.nativeElement.value = '';

          const Data = this.employeeList;
          const removed = Data.splice(index, 1); // Mutates fruits and returns array of removed items

          this.employeeList = Data;
          this.lengthofemployee = this.employeeList.length;
          if(this.maxEmployeeCount && this.maxEmployeeCount>0){

          }
          else{
            // this.maxEmployeeCount = this.employeeList.length;
            let formData = JSON.parse(sessionStorage.getItem('formData') || '');

            this.maxEmployeeCount = formData.expectednoofEmployees;
          }
          this.deletedId.push(admin.uId)
        }
      })
    }
    else{
      Swal.fire({
        title:'Alert',
        text: 'Are you sure you want to delete this employee?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Proceed',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const Data = this.employeeList;
          const removed = Data.splice(index, 1); // Mutates fruits and returns array of removed items

          this.employeeList = Data;
          this.lengthofemployee = this.employeeList.length;
          if(this.maxEmployeeCount && this.maxEmployeeCount>0){
          }
          else{
            // this.maxEmployeeCount = this.employeeList.length;
            let formData = JSON.parse(sessionStorage.getItem('formData') || '');

            this.maxEmployeeCount = formData.expectednoofEmployees;
          }

        }
      })
    }


  }

  editemployee(admin: any, index: any) {
    $('#editEmployee-modal').modal('show');

    console.log(admin)
    this.addemployeefrom = false;
    this.editemployeefrom = true;
    this.editEmployeeindex = index;
    this.editEmployeeId = admin.employeeId;
    this.editEmployeefirstname = admin.firstName;
    this.editEmployeelastname = admin.lastName;
    this.editEmployeephone = admin.phoneNum;
    this.editEmployeeemail = admin.email;
    this.presentMail=admin.email;
    this.editEmployeeDateofbirth =admin.dateOfBirth==""||admin.dateOfBirth==undefined?"":moment(admin.dateOfBirth).format("MM-DD-YYYY");
    this.editEmployeeDateofhire =admin.dateOfHire==""||admin.dateOfHire==undefined? "":moment(admin.dateOfHire).format("MM-DD-YYYY");
    this.editEmployeeOccupation = admin.jobTitle;
    this.editEmployeefamilyStatus = admin.maritalStatus??''!=""?this.commonPatternsService.textCaptalize(admin.maritalStatus):null;
    // this.isUId=admin.uId;

    this.editEmployeesex = admin.gender??''!=""?admin.gender:null;

    this.editemployeeCountry =admin.country??''!=""?admin.country:null;
    this.editEmployeeResidenetIn = admin.province??''!=""?admin.province:null;
    this.editEmployeeProvince = admin.provienceName??''!=""?admin.provienceName:null;
    this.editEmployeeeAnnualIncome = admin.annualIncome;
    this.editEmployeeetier = admin.classificationTier;
    this.UId =admin.uId;
    this.getprovincelist1(admin.country);
  }

  GetCorpDetails(CorpId: any) {

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

            } else {
              // Swal.fire('Invalid bank details');
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

  public submitEmployeeInfoInfo() {


    for(let i=0;i<this.employeeList.length;i++){

      if(this.employeeList[i].maritalStatus=="Single"){

        this.employeeList[i].maritalStatus="Single"
      }
      if(this.employeeList[i].maritalStatus=='Couple'){
        this.employeeList[i].maritalStatus="Couple"
      }
      if(this.employeeList[i].maritalStatus=='Family'){
        this.employeeList[i].maritalStatus="Family"
      }
    }


    let Obj={
      "employees":this.employeeList,
      "deletedIds":this.deletedId || []
    }
      var corporateId = sessionStorage.getItem('corporateId');
      var endPoint = '/api/ap/admin/corporate/' + corporateId + '/employeeNew';
      var accessToken = sessionStorage.getItem('accessToken');
      this.http
        .post(environment.apiUrl + endPoint, Obj, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response: any) => {
            if (response['status'] == 200) {



              if(response.failedEmployeesList && response.failedEmployeesList.length>0){

                    let array =[]

                for(let i=0;i<response.failedEmployeesList.length;i++){
                  let obj={
                    "mail":response.failedEmployeesList[i].mailId
                  }
                  array.push(response.failedEmployeesList[i].mailId)
                  this.message = response.failedEmployeesList[i].message


                }

                console.log(array)
                // var hh = "<br>"+array+"</br>";
                Swal.fire({title:'Error',html: ""+this.message+" :<br>"+array+"</br>",
              })
              }
              else{
                // this.showDataGraph.emit(this.employeeList);
                this.showDataGraph.emit(response.data);
                this.GetCorpDetails(corporateId)

              this.deletedId =[]

              this.employeeList = response.data



              if (this.employeeList.length > 0) {

              }
              }

            } else {
              Swal.fire({title:'Error#'+ response.errorCode,text:response.message})
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

  public gotoplansorwalletInfo() {
    this.gotoplansorwallet.emit();
  }
  public capitalize(str: any) {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }

  ngOndestroy() {
    this.elementRef.nativeElement.remove();
  }
  // alphabatesOnly(event: any): boolean {

  //   const charCode = event.which ? event.which : event.keyCode;

  //   if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)

  //     return true;

  //   else

  //     return false;

  // }
}
export function moments(date: string | undefined): moment.Moment {




  if (date)

  return moment((new Date(date)).toJSON())

  else

return moment();

  }
