
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public message:string
  public brokertype:string
constructor() { }



setMessage(data){


this.message =data
}
getMessage(){
return this.message
}


setBroker(data){


  this.brokertype =data
  }
  getBroker(){
  return this.brokertype
  }

}
