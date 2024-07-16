import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public corpData:string
  UserName: any;

constructor() { }



setCorpData(data){


this.corpData =data
}
setUserName(data){
  this.UserName=data;
}
getUserName(){
  return this.UserName;
}
getCorpData(){
return this.corpData
}


}
