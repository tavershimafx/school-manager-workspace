import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { IKeyValue } from '@models/app.models';


@Component({
  selector: 'search-select',
  standalone: false,
  templateUrl: './search-select.component.html',
  styleUrl: './search-select.component.css',
})
export class SearchSelectComponent implements ControlValueAccessor {

  constructor(@Self() @Optional() public controlDir: NgControl) {
    if (this.controlDir) {
      // Manually link the value accessor to this class
      this.controlDir.valueAccessor = this;
    }
  }

  @Output() searchAll: EventEmitter<string> = new EventEmitter()
  /**
   * A defined css class to be applied to the checkbox
   */
  @Input("label") label?: string
  
  /**
   * A text boolean flag to show either the light or dark version. Defaults to false
   */
  @Input("light") light: boolean = false
  
  /**
   * A text boolean flag which determines to show a slimer control with py-2 instead of py-3. Defaults to false
   */
  @Input("small") small: boolean = false

  /**
   * The placeholder for the input
   */
  @Input() placeholder?: string

  searchString?: string
  searchableOptions: IKeyValue[] | null = []

  innerOptions: IKeyValue[] | null = []
  /**
   * The options for the control
   */
  @Input() get options(): IKeyValue[] | null{
    return this.innerOptions
  }

  set options(v: IKeyValue[] | null){
    this.innerOptions = v
    this.searchableOptions = v
  }

   /**
   * Determines if validation messages and symbols should be displayed
   */  
  svl: boolean = false
  @Input()  get showValidation(): boolean {
    return this.svl;
  };

  //set accessor including for validation
  set showValidation(v: boolean | undefined) {
    this.svl = v?? false
    if (this.svl === true) {
      this.showVal = !this.controlDir.valid
    }
  }
  
  showVal?: boolean | null = false


  @Input("disabled") disabled: boolean = false;

  // #region NgModel template definiton

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  onTouchedCallback: () => void = () => { };
  onChangeCallback: (_:any) => void = () => { };

  private innerValue:any;
  //get accessor
  get value(): any {
      return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
      if (v !== this.innerValue) {
          this.innerValue = v;
          this.onChangeCallback(v);
          
        if (this.svl) { this.showVal = !this.controlDir.valid }
        else { this.showVal = false }
      }
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
      if (value !== this.innerValue) {
          this.innerValue = value;
      }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
      this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  //#endregion

  selectItem(value: any) {
    this.value = value;
  }

  searchItems(val: any){
    if(this.innerOptions){
      this.searchableOptions = this.innerOptions?.filter(p => p.value.toLowerCase().includes(val.toLowerCase()) ||
      p.meta?.toLowerCase().includes(val.toLowerCase()))
    }
  }

  searchMore(){
    this.searchAll.emit(this.searchString)
  }
}
