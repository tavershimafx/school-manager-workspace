import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { Pagination, SmartTableResult } from '@models/app.models';
import { generatePagination } from '@services/utilities';

@Component({
  selector: 'pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent  {
  
  sTable?: SmartTableResult<any>
  @Input() get smartTable(): SmartTableResult<any> | undefined{
    return this.sTable
  }

  set smartTable(table: SmartTableResult<any> | undefined){
    this.sTable = table
      this.pagination = generatePagination(this.sTable!)
  }

  @Output() changePage: EventEmitter<any> = new EventEmitter()
  pagination?: Pagination[]
  constructor(){
   
  }

  mPage(p:number){
    this.changePage?.emit(p)
  }
}
