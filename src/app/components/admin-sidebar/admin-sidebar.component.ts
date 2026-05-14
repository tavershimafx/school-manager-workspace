import { Component, Input } from '@angular/core';
import { NavigationItem } from '@models/app.models';

@Component({
  selector: 'admin-sidebar',
  standalone: false,
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent  {
  
  @Input() items?: Array<NavigationItem> = []

  constructor(){
   
  }
}
