import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { IKeyValue } from '@models/app.models';


@Component({
  selector: 'tags-input',
  standalone: false,
  templateUrl: './tags-input.component.html',
  styleUrl: './tags-input.component.css',
})
export class TagsInputComponent implements ControlValueAccessor {

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

  newTag?: string

  searchString?: string
  searchableTags: IKeyValue[] | null = []

  innerTags: IKeyValue[] | null = []
  /**
   * The options for the control
   */
  @Input() get tags(): IKeyValue[] | null {
    return this.innerTags
  }

  set tags(v: IKeyValue[] | null) {
    this.innerTags = v
    this.searchableTags = v
  }

  /**
  * Determines if validation messages and symbols should be displayed
  */
  svl: boolean = false
  @Input() get showValidation(): boolean {
    return this.svl;
  };

  //set accessor including for validation
  set showValidation(v: boolean | undefined) {
    this.svl = v ?? false
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
  onChangeCallback: (_: any) => void = () => { };

  private innerValue: string | null = null;
  //get accessor
  get value(): string | null {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: string | null) {
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

  selectItem(key: any) {
    // if (this.value?.findIndex(p => p.key == key) == -1) {
    //   this.value.push(this.options?.find(p => p.key == key)!)
    // }
    const currentItems = this.value?.split(',') ?? [];
    if (currentItems.findIndex(p => p == key) == -1) {
      this.value = [...currentItems, key].join(',');
    }
  }

  removeItem(key: any) {
    // let i = this.value?.findIndex(p => p.key == key)
    // if (i != -1) {
    //   this.value?.splice(i!, 1)
    // }

    const items = this.value?.toString().split(',') ?? [];
    items.splice(key, 1);
    this.value = items.join(',');
  }

  searchItems(val: any) {
    if (this.innerTags) {
      this.searchableTags = this.innerTags?.filter(p => p.value.toLowerCase().includes(val.toLowerCase()) ||
        p.meta?.toLowerCase().includes(val.toLowerCase()))
    }
  }

  searchMore() {
    this.searchAll.emit(this.searchString)
  }

  addNewTag() {
    // if (this.value?.findIndex(p => p.key == this.newTag.key) == -1 && ) {
    //   this.value.push({ key: this.newTag.key, value: this.newTag.key })
    // }

    if (this.newTag?.trim() != "") {
      this.selectItem(this.newTag)
      this.newTag = ""
    }
  }

  addOnEnter(e: KeyboardEvent) {
    if ((e.ctrlKey && e.key == "Enter") || e.shiftKey && e.key == "Enter") {
      this.addNewTag()
    }
  }
}
