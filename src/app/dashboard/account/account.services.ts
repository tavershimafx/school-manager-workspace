import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { AccountRoutes } from "./account.constants"
import { IKeyValue, TaskResult } from "@models/app.models"
import { map, Observable } from "rxjs"
import {  } from "./account.models"


@Injectable({ providedIn: "root" })
export class AccountServices {

    constructor(private httpClient: HttpClient) {

    }

    updatePassword(data: any): Observable<any> {
        return this.httpClient.post<TaskResult<any>>(AccountRoutes.security.changePassword, data).pipe(map(x => x.value))
    }

}
