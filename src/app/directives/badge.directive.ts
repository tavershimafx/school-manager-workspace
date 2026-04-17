import { Directive, ElementRef, Input, OnInit } from "@angular/core";

export type classes = "bg-success-500" | "bg-warning-500" | "bg-danger-600" | "bg-primary-600"

@Directive({
    selector: "[badge]",
    standalone: false
})
export class BadgeDirective implements OnInit{
    bClass : string = "Active"
    @Input() get badge(){
        return this.bClass
    }

    set badge(cls: string){
        this.bClass = cls
        this.setBg()
    }
    constructor(private el: ElementRef){
        
    }

    ngOnInit(): void {
        this.setBg()
    }

    private setBg(){
        // we have to remove the previous classes else won't work
        this.el.nativeElement.classList.add(badgeBackground(this.bClass))
        this.el.nativeElement.classList.add(badgeColor(this.bClass))
        this.el.nativeElement.children[0].classList.add(badgeColor(this.bClass))
    }
}


export function badgeBackground(status: string): string {
    //status = status.split(" ")[0]
    switch (status) {
        case "Active":
            return "bg-emerald-50"
        case "Pending":
        case "Suspended":
            return "bg-amber-50"
        case "Expired":
            return "bg-red-50"
        case "Taken":
            return "bg-primary-50";
        default:
            return "bg-primary-50";
    }
}

export function badgeColor(status: string): string {
    //status = status.split(" ")[0]
    switch (status) {
        case "Active":
            return "text-success-500"
        case "Pending":
        case "Suspended":
            return "text-warning-500"
        case "Expired":
            return "text-danger-600"
        case "Taken":
            return "text-primary-600";
        default:
            return "text-primary-600";
    }
}

export function badgeDotColor(status: string): string {
    //status = status.split(" ")[0]
    switch (status) {
        case "Active":
            return "bg-success-500"
        case "Pending":
        case "Suspended":
            return "bg-warning-500"
        case "Expired":
            return "bg-danger-600"
        case "Taken":
            return "bg-primary-600";
        default:
            return "bg-primary-600";
    }
}
