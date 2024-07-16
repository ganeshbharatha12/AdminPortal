import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salestrackingcode'
})
export class SalestrackingcodePipe implements PipeTransform {

  transform(number: any) {

    if(number=="") {

      return "";

    }

    else {

      number = number.replace(/\D/g, '');

      console.log(number)


      const countryCodeStr = number.slice(0,3);

      const areaCodeStr = number.slice(3,6);

      const lastSectionStr = number.slice(6);

      return `${countryCodeStr}-${areaCodeStr}-${lastSectionStr}`;

    }

  }

}
