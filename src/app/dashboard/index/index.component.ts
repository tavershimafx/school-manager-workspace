import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { selfRegisterTab } from '@workspace/tab-manager';
import { Store } from '@ngrx/store';
import { IAdminTab } from '@workspace/tab-context';

@Component({
  selector: 'dashboard-index',
  standalone: false,
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class DashboardIndexComponent implements IAdminTab, OnInit {
  name: string = "Dashboard"
  tabId: number
  data: any
  route: string

  private readonly store = inject(Store);
  constructor(private router: Router) {

    const nav = this.router.currentNavigation();
    this.route = nav?.extras.state?.['route'];
    this.tabId = nav?.extras.state?.['tabId'];

    selfRegisterTab(this);
  }

  ngOnInit(): void {

  }

  executeCommand(command: string, data: any): void {

  }

  loadTabContext(): void {

  }
}
