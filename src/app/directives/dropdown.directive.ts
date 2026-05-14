import { Directive, ElementRef, HostListener, Input, OnInit } from "@angular/core";

@Directive({
    selector: "[dropdown]",
    standalone: false
})
export class DropdownDirective implements OnInit {
    dropdown: boolean = false
    @Input("direction") direction: "right" | "left" = "left"
    @Input("disabled") disabled: boolean = false

    constructor(private el: ElementRef) {
        this.closeDropdown = this.closeDropdown.bind(this)
    }

    parent!: any

    ngOnInit(): void {
        this.parent = this.el.nativeElement.parentNode
    }

    @HostListener('document:click', ['$event']) onDocumentClick(event: MouseEvent) {
        if (this.dropdown && !this.parent.contains(event.target as Node)) {
            this.closeDropdown();
        }
    }

    @HostListener("click") onClick() {
        if (!this.disabled) {
            if (!this.dropdown) {
                this.parent.children[1].classList.remove("hidden")
                this.dropdown = !this.dropdown
            } else {
                if(!this.dropdown && !this.parent.children[1].classList.contains("hidden")){
                    this.parent.children[1].classList.add("hidden")
                }
            }
        }
    }

    closeDropdown() {
        if (this.dropdown) {
            this.parent.children[1].classList.add("hidden")
            this.dropdown = !this.dropdown
        }
    }
}