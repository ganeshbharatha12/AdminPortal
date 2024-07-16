import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  version: any;
  build:any;

  constructor() { }

  ngOnInit(): void {
    this.version=environment.version;
    this.build=environment.buildVersion;
  }
  scrollTop()
  {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
});

  }
}
