import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role: any;

  constructor() { }

  ngOnInit(): void {
    this.role=sessionStorage.getItem('role');

  }



}
