import { Component, inject, Injectable } from "@angular/core";
import { DialogModel } from "@models/app.models";
import { Store } from "@ngrx/store";
import { Observable, Subscriber} from "rxjs";
import { DashboardActions } from "../dashboard/store/dashboard.actions";

@Injectable({
    providedIn: "root"
})
export class DialogService{
    dialog: Observable<any>
    private subscriber?: Subscriber<any>
    private onClose?: Observable<any>
    private onCloseSubscriber?: Subscriber<any>

    store = inject(Store)
    
    notifyObservable: Observable<any>
    private notifySubscriber?: Subscriber<any>
    constructor(){
        this.dialog = new Observable(sub =>{
            this.subscriber = sub
        })

        this.notifyObservable = new Observable(sub =>{
            this.notifySubscriber = sub
        })
    }

    /**
     * Opens a component as a modal dialog.
     * Calling the method with null closes the opened dialog
     * Calling the method with an object other than a typeof of @class Component sends the value
     * to the caller
     * @param valueOrElement The component to lauch
     * @returns 
     */
    showDialog(valueOrElement: any): Observable<any> | undefined{
        if (typeof(valueOrElement) == typeof(Component)){
            this.onClose = new Observable(sub =>{
                this.onCloseSubscriber = sub
            })
        }
        else{
            // the assumption here is 
            // if we did not get a component then the method received either null
            // or an object to be sent back to the caller
            // null means the close button was clicked so just close
            // an object means the process completed so we should send the data back to
            // the caller and close the dialog
            // In addition, we also need to close the observable
            this.subscriber?.next(null)
            setTimeout(() => {
                this.onCloseSubscriber?.next(valueOrElement)
                this.onCloseSubscriber?.complete()
                this.onCloseSubscriber?.unsubscribe()
            }, 50);
        }

        this.subscriber?.next(valueOrElement)
        return this.onClose;
    }

    showValueDialog(element: any, value: any): Observable<any> | undefined{
        if (typeof(element) == typeof(Component)){
            this.onClose = new Observable(sub =>{
                this.onCloseSubscriber = sub
            })
        }
        else{
            // the assumption here is 
            // if we did not get a component then the method received either null
            // or an object to be sent back to the caller
            // null means the close button was clicked so just close
            // an object means the process completed so we should send the data back to
            // the caller and close the dialog
            // In addition, we also need to close the observable
            this.subscriber?.next(null)
            setTimeout(() => {
                this.onCloseSubscriber?.next(element)
                this.onCloseSubscriber?.complete()
                this.onCloseSubscriber?.unsubscribe()
            }, 50);
        }

        let model: DialogModel = new DialogModel()
        model.dialogType = element
        model.data = value 
        this.subscriber?.next(model)
        return this.onClose;
    }

    closeDialog(data: any){
        if (this.onCloseSubscriber != undefined){
            this.onCloseSubscriber?.next(data)
            this.onCloseSubscriber?.complete()
        }

        this.subscriber?.next(null)
    }

    toggleAsyncMode(showLoading: boolean = true){
        this.store.dispatch(DashboardActions.loading({ loading: showLoading }))
    }

    showNotification(subject: string, message: string, accent: "danger" | "success" | "warning"){
        this.notifySubscriber?.next({subject: subject, message: message, accent: accent})
    }
}
