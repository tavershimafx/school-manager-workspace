import { Component, Input } from '@angular/core';

@Component({
  selector: 'most-base-modal',
  standalone: false,
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.css']
})
export class BaseModalDialogComponent {
  @Input("size") size: string = "md"
}