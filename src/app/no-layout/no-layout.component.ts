import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ApiRoutes } from '@models/api.routes';
import { Store } from '@ngrx/store';
import { dashboardServices } from '@store/actions/utility.actions';

@Component({
  selector: 'no-layout',
  standalone: false,
  templateUrl: './no-layout.component.html',
  styleUrl: './no-layout.component.css'
})
export class NoLayoutComponent implements OnInit {
  store = inject(Store)
  year = new Date().getFullYear()
  constructor(private httpClient: HttpClient){
  }

ngOnInit(): void {
  
    this.getLogos()
}
  private getLogos(){
    this.httpClient.get<any>(ApiRoutes.identity.schoolLogo,).subscribe({
        next: res =>{
            this.store.dispatch(dashboardServices.schoolLogo({ schoolLogo: res.value }))
        }
    })
  }
}
