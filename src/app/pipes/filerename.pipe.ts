import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filerename'
})
export class FilerenamePipe implements PipeTransform {

  transform(value:any): any {
    return value.replace(".xlsx","");
  }

}
