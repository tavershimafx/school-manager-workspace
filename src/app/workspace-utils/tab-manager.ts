import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Router } from "@angular/router";
import { IAdminTab, ITab, ITabContext, ITenantTab } from './tab-context';
import { DialogService } from '@services/dialog-service';
import { NewTabDialogModal } from '@modals/newtab-dialog/newtab-dialog.component';



@Injectable({
    providedIn: "root"
})
export class WorkspaceManager {
    activeTabContext?: ITabContext;
    tabs = signal<Map<number, ITabContext>>(new Map());

    private activeTab?: ITab;
    constructor(private router: Router, private dialogService: DialogService) {
        this.addAdminTab()
    }

    newTab(){
        this.dialogService.showDialog(NewTabDialogModal)?.subscribe({
            next: x =>{
                this.addAdminTab()
            }
        })
    }

    addTenantTab(tenantId: string, tenantName: string){
        let id = Math.floor(Math.random() * 1000000000)
        this.tabs().set(id, 
            { 
            tabId: id,
            tenantId: tenantId,
            tenantName: tenantName,
            data: {},
            route: "/dashboard",
            name: "Dashboard"
        } as ITenantTab)

        this.activeTabContext = this.tabs().get(id)
        this.navigate(this.activeTabContext!.route)
    }

    addAdminTab(){
        let id = Math.floor(Math.random() * 1000000000)
        this.tabs().set(id, 
            { 
            tabId: id,
            data: {},
            route: "/dashboard",
            name: "Dashboard"
        } as IAdminTab)

        this.activeTabContext = this.tabs().get(id)
        this.navigate(this.activeTabContext!.route)
    }

    gotoTab(tabId: number){
        this.activeTabContext = this.tabs().get(tabId)
        this.navigate(this.activeTabContext!.route)
    }

    closeTab(tabId: number){
        this.tabs().delete(tabId)
    }

    registerActiveComponent(component: ITab) {
        this.activeTab = component;
    }

    executeCommand(command: string, payload?: any) {
        this.activeTab?.executeCommand(command, payload);
    }

    navigate(route: string) {
        if(!this.activeTabContext){
            throw "Cannot load workspace environment"
        }

        this.activeTabContext!.route = route
        this.router.navigate([route], {
            state: {
                tabId: this.activeTabContext?.tabId,
                name: this.activeTabContext?.name,
                data: this.activeTabContext?.data,
                route: route,
            }
        });

    }
}


export function selfRegisterTab(component: ITab) {
    const workspace = inject(WorkspaceManager);
    //const destroyRef = inject(DestroyRef);

    workspace.registerActiveComponent(component);

    // destroyRef.onDestroy(() => {
    //     workspace.clearActiveComponent(component);
    // });
}