import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(number: any) {

    if(number=="") {

      return "";

    }

    else {

      number = number.replace(/\D/g, '');

      console.log(number)

      number = number.charAt(0) !== '+' ? "+"+number : ""+number;

    //   number = number.charAt(1) !== '1' ? "1"+number : ""+number;
    number = number.charAt(1) !== '1' ? number.charAt(0)+"1"+number.substring(1) : ""+number;


      const countryCodeStr = number.slice(0,2);

      const areaCodeStr = number.slice(2,5);

      const midSectionStr = number.slice(5,8);

      const lastSectionStr = number.slice(8);

      console.log('aaaa');

      return `${countryCodeStr} (${areaCodeStr})${midSectionStr}-${lastSectionStr}`;

    }

  }

}
