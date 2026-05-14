import { Component, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  standalone: false,
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent  {
  
  @Input() small = false

  constructor(){
   
  }
}
