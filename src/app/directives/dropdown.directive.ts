import { Directive, ElementRef, HostListener, Input, OnInit } from "@angular/core";

@Directive({
    selector: "[dropdown]",
    standalone: false
})
export class DropdownDirective implements OnInit{
    dropdown: boolean = false
    @Input("direction") direction: "right" | "left" = "left"

    constructor(private el: ElementRef){
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

    @HostListener("click") onClick(){
        if (!this.dropdown){
            this.parent.children[1].classList.remove("hidden")
        }else{
            this.parent.children[1].classList.add("hidden")
        }
        this.dropdown = !this.dropdown
    }

    closeDropdown(){
        if (this.dropdown){
            this.parent.children[1].classList.add("hidden")
            this.dropdown = !this.dropdown
        }
    }
}