import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { IKeyValue } from '@models/app.models';

@Component({
  selector: 'search-utility',
  standalone: false,
  templateUrl: './search-utility.component.html',
  styleUrl: './search-utility.component.css',
})
export class SearchUtilityComponent  {
  
  @Input() size?: string
  @Input() filterValues?: IKeyValue[]
  @Input() pageOptions?: IKeyValue[] = [
    { key: "50", value: "50"},
    { key: "70", value: "70"},
    { key: "100", value: "100"},
    { key: "200", value: "200"},
  ]
  
   //@Input() searchOptions: IKeyValue[] | null = []
  private ops: IKeyValue[] | null = []
  @Input() set searchOptions(val){
    this.ops = val
    this.option = this.ops?.[0]?.key
  }
  
  get searchOptions():IKeyValue[] | null{
    return this.ops
  }

  @Input() placeholder?: string
  
  @Input() search: string = ""
  @Output() searchChange: EventEmitter<any> = new EventEmitter()

  @Output() sort: EventEmitter<any> = new EventEmitter()
  @Output() searchAll: EventEmitter<any> = new EventEmitter()

  query?: string
  from?: Date
  to?: Date
  msize: number = 100
  option?: string

  constructor(){
   
  }

  sq(){
    this.searchAll.emit({
      query: this.query,
      startDate: this.from,
      endDate: this.to,
      pageSize: this.msize,
      option: this.option
      })
  }

  fireSort(key: string){
    this.sort.emit(key)
  }

  fireChange(event: any){
    this.query = event
    this.fire()
  }

  fireTo(event: any){
    this.to = event
    this.fire()
  }

  fireFrom(event: any){
    this.from = event
    this.fire()
  }

  fire(){
    this.searchChange.emit({
      query: this.query,
      startDate: this.from,
      endDate: this.to,
      pageSize: this.msize,
      option: this.option
      })
  }
}
