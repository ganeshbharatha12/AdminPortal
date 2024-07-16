import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payables',
  templateUrl: './payables.component.html',
  styleUrls: ['./payables.component.css']
})
export class PayablesComponent implements OnInit {
  selectedTab: string = 'tab1';
  constructor() { }

  ngOnInit(): void {
  }
  selectTab(tabName: string): void {
    this.selectedTab = tabName;
  }
  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
