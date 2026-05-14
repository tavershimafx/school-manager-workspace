import { Directive, ElementRef, Input, OnInit } from "@angular/core";

//export type classes = "bg-success-500" | "bg-warning-500" | "bg-danger-600" | "bg-primary-600"

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
        this.el.nativeElement.children[0]?.classList.add(badgeDotColor(this.bClass))
    }
}


export function badgeBackground(status: string): string {
    //status = status.split(" ")[0] text-green-700
    status = status.toLowerCase()
    switch (status) {
        case "active":
        case "assigned":
        case "published":
        case "completed":
        case "paid":
            return "bg-green-100"
        case "pending":
        case "suspended":
        case "archived":
            return "bg-orange-100"
        case "expired":
        case "unassigned":
        case "deleted":
        case "failed":
        case "system":
            return "bg-red-50"
        case "taken":
        case "draft":
        case "partpayment":
            return "bg-blue-100";
        default:
            return "bg-slate-100";
    }
}

export function badgeColor(status: string): string {
    //status = status.split(" ")[0]
    status = status.toLowerCase()
    switch (status) {
        case "active":
        case "assigned":
        case "published":
        case "paid":
        case "completed":
            return "text-green-700"
        case "pending":
        case "suspended":
        case "archived":
            return "text-orange-700"
        case "expired":
        case "unassigned":
        case "deleted":
        case "failed":
        case "system":
            return "text-error"
        case "taken":
        case "draft":
        case "partpayment":
            return "text-primary";
        default:
            return "text-slate-600";
    }
}

export function badgeDotColor(status: string): string {
    //status = status.split(" ")[0]
    status = status.toLowerCase()
    switch (status) {
        case "active":
        case "assigned":
        case "published":
        case "paid":
        case "completed":
            return "bg-green-600"
        case "pending":
        case "suspended":
        case "archived":
        case "system":
            return "bg-orange-500"
        case "expired":
        case "unassigned":
        case "deleted":
        case "failed":
            return "bg-error"
        case "taken":
        case "draft":
        case "partpayment":
            return "bg-blue-600";
        default:
            return "bg-slate-400";
    }
}
