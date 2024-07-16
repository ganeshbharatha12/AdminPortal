import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
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
