import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'no-layout',
  standalone: false,
  templateUrl: './no-layout.component.html',
  styleUrl: './no-layout.component.css'
})
export class NoLayoutComponent implements OnInit {
  store = inject(Store)
  year = new Date().getFullYear()
  constructor(){
  }

ngOnInit(): void {
}

}
