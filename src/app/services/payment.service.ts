import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl = 'https://api.qezyplay.com/api/'
  constructor(private http: HttpClient) { }

  encryptdata(request){
    let url = `${this.baseUrl}channels/encryptFormData`;
    let data = {
    request : request
    }
    return this.http.get(url,{params:data})
  }
}
