import { Injectable } from "@angular/core";
import { Observable, Subject} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class SidebarService{
    sidebarOpen = false
    
    sidebar: Subject<boolean> = new Subject<boolean>()

    constructor(){
       
    }

    toggleSidebar(){
        this.sidebar.next(!this.sidebarOpen)
        this.sidebarOpen = !this.sidebarOpen
    }
}