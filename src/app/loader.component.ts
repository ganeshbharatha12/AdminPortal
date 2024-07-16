import { Component } from "@angular/core";
import { LoaderService } from "./loader.service";
@Component({
  selector: "loader",
  template: `
    <div *ngIf="show" class="loaderMask">
    <img src='./../assets/img/loader.gif' style="width:60px;height:60px;">

    </div>
  `,
  styles: [
    `.loaderMask{
      position: fixed;
      height: 100vh;
      width: 100%;
      top:0;
      z-index: 1;
      background-color: rgba(100, 100, 100, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      z-index:9999}`
  ]
})
export class LoaderComponent {
  show: boolean;
  constructor(private _loaderService1: LoaderService) {}

  ngOnInit() {
    this._loaderService1.loadState.subscribe(res => {
      this.show = res;
    });
  }
}
