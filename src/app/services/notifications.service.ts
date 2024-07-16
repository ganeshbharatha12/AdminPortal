import { Injectable } from '@angular/core';
   
import { ToastrService } from 'ngx-toastr';
   
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
   
  constructor(private toastr: ToastrService) { }
   
  // showSuccess(message, title){
  //     this.toastr.success(message, title)
  // }
   
  showError(message:any){
      this.toastr.error(message)
  }
   
  // showInfo(message, title){
  //     this.toastr.info(message, title)
  // }
   
  showWarning(message:any){
      this.toastr.warning(message)
  }
   
}