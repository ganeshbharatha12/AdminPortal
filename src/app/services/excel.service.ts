import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import * as excel from 'exceljs';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const dateFormat = 'MM-DD-YYYY';
const EXCEL_SHEETNAME = 'Employees';
@Injectable()
export class ExcelService {
  tierConfig: any;
  walletConfig: any;
  EXCEL_SHEETNAME: string = EXCEL_SHEETNAME;

  constructor() {}

  public exportAsExcelFile(
    json: any[],
    excelFileName: string,
    tierConfig: any,
    walletConfig: any
  ): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    //console.log(json)
    const max_width = json.reduce(
      (w, r) =>
        Math.max(
          w,
          Object.keys(r).reduce((a, b) => (a.length > b.length ? a : b)).length
        ),
      10
    );
    console.log(`max_width:${max_width}`);
    let no_of_cols = Object.keys(json[0]).length;
    let wsColsPropArray = [];
    for (let i = 0; i < no_of_cols; i++) {
      wsColsPropArray.push({ wch: max_width + 1 });
    }
    worksheet['!cols'] = wsColsPropArray;
    worksheet;
    let colNameRefs = Object.keys(worksheet);
    let today = moment().format('MM-DD-YYYY');
    for (const col of colNameRefs) {
      if (col == '!ref' || col == '!cols') continue;
      if (worksheet[col]['v'] != '') {
        //A1: {t: 's', v: 'Employee ID'}
        let thisColVal = worksheet[col]['v'];
        console.log(thisColVal);
        if (thisColVal.includes('Date')) {
          //get next one ie A2 and assign type as date
          worksheet[col[0] + '2']['t'] = 'd';
          worksheet[col[0] + '2']['v'] = today;
        }

        if (thisColVal.includes('Income')) {
          //get next one ie A2 and assign type as date
          worksheet[col[0] + '2']['t'] = 'n';
          worksheet[col[0] + '2']['v'] = 0;
        }

        if (thisColVal.includes('Gender')) {
          //get next one ie A2 and assign type as date
          worksheet[col[0] + '2']['t'] = 's';
          worksheet[col[0] + '2']['v'] =
            'Male / Female / Non-Binary / Undisclosed';
          //worksheet[col[0]+'2']['c']='Allowed values: Male / Female / Non-Binary / Undisclosed'
        }

        if (thisColVal.includes('Family')) {
          //get next one ie A2 and assign type as date
          worksheet[col[0] + '2']['t'] = 's';
          worksheet[col[0] + '2']['v'] = 'SINGLE / COUPLE / FAMILY';
          //worksheet[col[0]+'2']['c']='Allowed values: SINGLE / COUPLE / FAMILY'
          worksheet[col[0] + '2']['f'] =
            'MATCH(("' + col[0] + '"2",{"SINGLE","COUPLE","FAMILY"},0))';
          worksheet[col[0] + '2']['F'] = col[0] + '2:' + col[0] + '100';
        }
      }
    }
    //[ { wch: max_width+2 } ];
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName, tierConfig, walletConfig);
  }

  public async exportAsExcelFile2(
    json: any[],
    empHeaders: any[],
    excelFileName: string,
    tierConfig: any,
    walletConfig: any,
    noofemployess:any,
    multiProviance:any
  ): Promise<void> {
    console.log('multiProviance',multiProviance)
    if (tierConfig == true) {
      this.tierConfig = 'YES';
    } else {
      this.tierConfig = 'NO';
    }
    if (walletConfig == true) {
      this.walletConfig = 'YES';
    } else {
      this.walletConfig = 'NO';
    }
    let showProviance=[ ];
    if(multiProviance.length>0){
      let final ='';
      for (let i of multiProviance) {
        final += ',' + i;
      }
      final = '"' + final.substring(1) + '"';
      showProviance.push(final);
    }else{
      showProviance=['"AB,QC,ON,NB,BC,SK,NS,PEI,NL,NU,YT,MB,NT"'];
    }

    excelFileName =
      excelFileName +
      this.tierConfig +
      '-Tier' +
      '&' +
      this.walletConfig +
      '-Wallet' +
      EXCEL_EXTENSION;
    const wb = await this.createNewExcelFile();

    const headers = Object.keys(json[0]);
    await this.fillHeader(wb, 1, headers, empHeaders);
    const dummyData = [];
    for (let i = 0; i < headers.length; i++) {
      if (i == 1) {
        dummyData.push('');
      } else if (i == 2) {
        dummyData.push('');
      } else dummyData.push('');
    }

    console.log(noofemployess)
    console.log(typeof noofemployess) //8
    let dummydataRows = parseInt(noofemployess); //no.of emplyees

    console.log(typeof dummydataRows)   //7
    for (let j = 2; j < dummydataRows + 2; j++)
      await this.fillData(wb, j, dummyData); //2 as 1st row is headers

    let currentWS = wb.getWorksheet(EXCEL_SHEETNAME);
    console.log(currentWS);
    // //@ts-ignore
    // currentWS.dataValidations.model['B2:B' + (dummydataRows)] = {
    //   allowBlank: false,
    // };
    // //@ts-ignore
    // currentWS.dataValidations.model['C2:C' + (dummydataRows)] = {
    //   allowBlank: false,
    // };
    //@ts-ignore
    currentWS.dataValidations.model['I2:I9999'] = {
      //H --> Date of Birth
      allowBlank: true,
      type: 'date',
      operator: 'between',
      formulae: [new Date(1923, 4, 27), new Date(2013, 4, 27)],
      showInputMessage: true,
      promptTitle: 'Date of Birth ',
      prompt: 'Format (MM-DD-YYYY)',
      showErrorMessage: true,
      errorStyle: 'error',
      errorTitle: 'Date of Birth -Error ',
      error: '(1923-2013 with given format MM-DD-YYYY allowed)',
    };
    //@ts-ignore
    currentWS.dataValidations.model['E2:E9999'] = {
      //E --> Date of Hire
      allowBlank: true,
      promptTitle: 'Date of Hire ',
      prompt: 'Format (MM-DD-YYYY)',
      error: '(1940-2024 with given format MM-DD-YYYY allowed)',
      errorTitle: 'Date of Hire -Error',
      operator: 'between',
      formulae: [new Date(1940, 4, 27), new Date(2025, 4, 27)],
      // formulae: [new Date(1940, 4, 27), new Date(new Date().getFullYear() + 1, new Date().getMonth()+1, new Date().getDate())],
      showErrorMessage: true,
      errorStyle: 'error',
      type: 'date',
      showInputMessage: true

    };
    //@ts-ignore
    currentWS.dataValidations.model['J2:J9999'] = {
      //I --> Gender
      allowBlank: true,
      error: 'Please use the drop down to select a valid value',
      errorTitle: 'Invalid Selection',
      formulae: ['"Male,Female,Non-Binary,Undisclosed"'],
      showErrorMessage: true,
      type: 'list',
    };
 //@ts-ignore
 currentWS.dataValidations.model['F2:F9999'] = {
  //F --> Province
  allowBlank: true,
  error: 'Please use the drop down to select a valid Country',
  errorTitle: 'Invalid Selection',
  formulae: ['"Canada"'],
  showErrorMessage: true,
  type: 'list',
};
    //@ts-ignore
    currentWS.dataValidations.model['G2:G9999'] = {
      //F --> Province
      allowBlank: true,
      error: 'Please use the drop down to select a valid Province value',
      errorTitle: 'Invalid Selection',
      formulae:showProviance,//['"AB,QC,ON,NB,BC,SK,NS,PEI,NL,NU,YT,MB,NT"'],
      showErrorMessage: true,
      type: 'list',
    };

    //@ts-ignore
    currentWS.dataValidations.model['K2:K9999'] = {
      //J --> Marital/family status
      allowBlank: true,
      error: 'Please use the drop down to select a valid value',
      errorTitle: 'Invalid Selection',
      formulae: ['"Single,Couple,Family"'],
      showErrorMessage: true,
      type: 'list',
    };

    //@ts-ignore
    currentWS.dataValidations.model['M2:M9999'] = {
      //M --> Tier
      allowBlank: true,
      error: 'Please use the drop down to select a valid value',
      errorTitle: 'Invalid Selection',
      formulae: ['"All"'], //this must be from api --> tiersList=tierNamesArray[].toString() --> formulae:['"+'tiersList'+"']
      showErrorMessage: true,
      type: 'list',
    };

    await this.saveExcel(wb, excelFileName);
  }

  public async exportAsExcelFilePlans(
    json: any[],
    empHeaders: any[],
    excelFileName: string,

  ): Promise<void> {

    excelFileName ="UploadExcel";
    const wb = await this.createNewExcelFile();

    const headers = Object.keys(json[0]);
    await this.fillHeader(wb, 1, headers, empHeaders);
    const dummyData = [];
    for (let i = 0; i < headers.length; i++) {
      if (i == 1) {
        dummyData.push('');
      } else if (i == 2) {
        dummyData.push('');
      } else dummyData.push('');
    }
    // let dummydataRows=2;
    // for (let j = 2; j < dummydataRows + 2; j++)
    // await this.fillData(wb, j, dummyData);

    let currentWS = wb.getWorksheet(EXCEL_SHEETNAME);
    console.log(currentWS);
    // //@ts-ignore
    // currentWS.dataValidations.model['B2:B' + (dummydataRows)] = {
    //   allowBlank: false,
    // };
    // //@ts-ignore
    // currentWS.dataValidations.model['C2:C' + (dummydataRows)] = {
    //   allowBlank: false,
    // };
    //@ts-ignore
    // currentWS.dataValidations.model['I2:I9999'] = {
    //   //H --> Date of Birth
    //   allowBlank: true,
    //   type: 'date',
    //   operator: 'between',
    //   formulae: [new Date(1923, 4, 27), new Date(2013, 4, 27)],
    //   showInputMessage: true,
    //   promptTitle: 'Date of Birth ',
    //   prompt: 'Format (MM-DD-YYYY)',
    //   showErrorMessage: true,
    //   errorStyle: 'error',
    //   errorTitle: 'Date of Birth -Error ',
    //   error: '(1923-2013 with given format MM-DD-YYYY allowed)',
    // };



    await this.saveExcel(wb, excelFileName);
  }

  private saveAsExcelFile(
    buffer: any,
    fileName: string,
    tierConfig: any,
    walletConfig: any
  ): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });

    // FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    // EmployeeData_export_Mon Mar 20 2023 18_45_03 GMT+0530 (India Standard Time)

    if (tierConfig == 'true') {
      this.tierConfig = 'YES';
    } else {
      this.tierConfig = 'NO';
    }
    if (walletConfig == 'true') {
      this.walletConfig = 'YES';
    } else {
      this.walletConfig = 'NO';
    }

    FileSaver.saveAs(
      data,
      fileName +
        this.tierConfig +
        '-Tier' +
        '&' +
        this.walletConfig +
        '-Wallet' +
        EXCEL_EXTENSION
    );
  }

  public async createNewExcelFile() {
    const workbook = new excel.Workbook();
    workbook.creator = 'GroupBenefitz';
    workbook.lastModifiedBy = 'Admin';
    workbook.created = moment(new Date(), dateFormat).toDate();

    workbook.addWorksheet(EXCEL_SHEETNAME); //'Employees'
    const ws = workbook.getWorksheet(EXCEL_SHEETNAME);

    return workbook;
  }

  public async readDataFromExcel(data: any) {
    const workbook = new excel.Workbook();
    await workbook.xlsx.load(data);
    return workbook;
  }

  async fillHeader(
    wb: excel.Workbook,
    rowNumber: number,
    headerValues: any,
    mainHeaders: any
  ) {
    if (mainHeaders && mainHeaders.length > 0) {
      let ws = wb.getWorksheet(EXCEL_SHEETNAME);
      ws.columns = mainHeaders;
      let row = ws.getRow(rowNumber);
      let cellNumber = 1;
      let cell;
      for (let header of mainHeaders) {
        cell = row.getCell(cellNumber);
        cell.style = this.styles('headerStyle');
        cellNumber++;
      }
    } else {
      let sheet = wb.worksheets[0]; //wb.getWorksheet(1); //or 1 //first
      let row = sheet.getRow(rowNumber);
      let cellNumber = 1;
      let cell;
      for (let header of headerValues) {
        cell = row.getCell(cellNumber);
        cell.value = header;
        cell.style = this.styles('headerStyle');
        cellNumber++;
      }
    }
  }

  async fillData(wb: excel.Workbook, rowNumber: number, dataValues: any) {
    let sheet = wb.worksheets[0]; //wb.getWorksheet(0); //or 1 //first
    let row = sheet.getRow(rowNumber);
    let cellNumber = 1;
    let cell;
    console.log(`dataValues: ${dataValues.length}`);
    let optionalCellnos = [1, 7, 8, 9, 10, 11, 12, 13];
    for (let data of dataValues) {
      cell = row.getCell(cellNumber);
      cell.value = data;
      if (optionalCellnos.includes(cellNumber)) {
        cell.style = this.styles('optionalDataStyle');
        if(cellNumber ==8){
          cell.style.numFmt='yyyy-mm-dd'
        }
      }
      cellNumber++;
    }
  }

  async saveExcel(wb: excel.Workbook, filename: string) {
    try {
      // wb.write(fos);
      this.autoWidth(wb.worksheets[0]);

      //Generate & Save Excel File
      wb.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], {
          type: EXCEL_TYPE,
        });
        FileSaver.saveAs(blob, filename);
      });

      return true;
      // fos.flush();
    } catch (error) {
      // TODO Auto-generated catch block
      console.log(error);
      return false;
    }
  }

  private styles(celltype: any) {
    const font = { color: { argb: 'FFFFFF' }, bold: true };

    const alignment = { vertical: 'middle', horizontal: 'center' }; //direct property of cell.. not a style property
    const border = {
      top: { style: 'double', color: { argb: 'FF00FF00' } },
      left: { style: 'double', color: { argb: 'FF00FF00' } },
      bottom: { style: 'double', color: { argb: 'FF00FF00' } },
      right: { style: 'double', color: { argb: 'FF00FF00' } },
    }; //direct property of cell.. not a style property
    //{ name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    const font1 = {
      name: 'Arial',
      size: 12,
      color: {
        argb: 'FFFFFF00',
      },
    };
    const fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {
        argb: 'FCA041',
      },
    };

    let style: any = {};

    switch (celltype) {
      case 'headerStyle':
        style.font = font;
        style.fill = fill;
        style.fill.fgColor = { argb: 'FF9900' };

        break;

      case 'optionalDataStyle':
        style.font = font;
        style.font.bold = false;
        style.font.color = {argb :'000000'}
        style.fill = fill;
        style.fill.fgColor = { argb: 'D9D9D9' };

        break;

      default:
        style.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF' },
        };
    }
    // style.font = font;
    return style;
  }

  /**
   * Autofit columns by width
   *
   * @param worksheet {ExcelJS.Worksheet}
   * @param minimalWidth
   */
  autoWidth = (worksheet: any, minimalWidth = 10) => {
    worksheet.columns.forEach((column: any) => {
      let maxColumnLength = 0;
      column.eachCell({ includeEmpty: true }, (cell: any) => {
        maxColumnLength = Math.max(
          maxColumnLength,
          minimalWidth,
          cell.value ? cell.value.toString().length : 0
        );
      });
      column.width = maxColumnLength + 2;
    });
  };
}
