import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonPatternsService {

  constructor() { }

   emailPattern='^(?!\\s)[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
   emailTestPattern=/^(?!\\s)[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$/
    // emailTestPattern=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
    const charCode = event.which ? event.which : event.keyCode;

    if ((charCode > 31 && (charCode < 48 || charCode > 57))||charCode!=45) {
      return false;
    }
    return true;
  }

  textCaptalize(str:string){
    if(str==""||str==undefined){
      return str
    }
  else{
    return  str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
  }
  }




}
