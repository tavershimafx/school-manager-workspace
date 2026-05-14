import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'email-sent',
  standalone: false,
  templateUrl: './email-sent.component.html',
  styleUrl: './email-sent.component.css'
})
export class EmailSentComponent {

  t?: string | null
  constructor(route: ActivatedRoute){
    route.queryParamMap.subscribe({
      next: x =>{
        this.t = x.get("t")
      }
    })
  }

}
