import { Component, ElementRef, Input, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { getValidationMessages } from '@services/utilities';

@Component({
  selector: 'text-input',
  standalone: false,
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
})
export class TextInputComponent implements ControlValueAccessor {

  constructor(@Self() @Optional() public controlDir: NgControl) {
    if (this.controlDir) {
      // Manually link the value accessor to this class
      this.controlDir.valueAccessor = this;
    }
  }

  getErrors = getValidationMessages
  @ViewChild("fileInput", {static: false}) fileInput!: ElementRef

  /**
   * A flag which determines to use the smaller y padding or wider one. Defaults to false
   */
  @Input() small = true

  /**
   * A flag to determine if the clear input icon should be visible when the control
   * is dirty
   */
  @Input() showClear = false

  /**
   * A text boolean flag to show either the light or dark version. Defaults to false
   */
  @Input("light") light: boolean = false

  /**
   * A text label for the input
   */
  @Input("label") label?: string

  /**
   * The type of input control
   */
  @Input("type") type: "text" | "password" | "number" | "phone" | "email" | "file" | "date" | "datetime-local" = "text"

  /**
   * The placeholder for the input
   */
  @Input() placeholder?: string = ""


  @Input("disabled") disabled: boolean = false;

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
  

  /**
   * The input element
   */
  @ViewChild("inputEl", { static: false }) inputEl!: ElementRef

  // #region NgModel template definiton
  private innerValue: any;
  visibility = "visibility"

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  onTouchedCallback: () => void = () => { };
  onChangeCallback: (_:any) => void = () => { };


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
    if (value !== this.value && value && (value = value.toString().trim()) != "") {
      if (value && this.type == "date") {
        let d = new Date(value).toISOString().substring(0, 10);
        this.value = d;
        return
      }

      if (value && this.type == "datetime-local") {
        const date = new Date(value);
        const d = date.toISOString().slice(0, 16);
        this.value = d;
        return
      }
      
      this.value = value;
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

  showPassword(event: any) {
    if (this.inputEl.nativeElement.type == "password") {
      this.inputEl.nativeElement.type = "text";
      this.visibility = "visibility"
    } else {
      this.inputEl.nativeElement.type = "password";
      this.visibility = "visibility_off"
    }
  }

  clearInput() {
    this.value = undefined
  }
  

  openFile(){
    this.fileInput.nativeElement.click()
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.value = input.files[0];
    }
  }
}
