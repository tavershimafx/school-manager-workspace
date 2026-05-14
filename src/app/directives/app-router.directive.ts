import { Directive, HostListener, inject, Input } from "@angular/core"
import { WorkspaceManager } from "@workspace/tab-manager";

@Directive({
    selector: "[appRouter]",
    standalone: false
})
export class AppRouterDirective {
    @Input() appRouter:string = ""
    @Input("disabled") disabled: boolean = false
    workspaceManager = inject(WorkspaceManager);

    constructor() {

    }

    @HostListener("click") onClick() {
        if(!this.disabled){
            this.workspaceManager.navigate(this.appRouter)
        }
    }

}