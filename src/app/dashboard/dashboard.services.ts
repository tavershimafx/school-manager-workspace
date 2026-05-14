import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { IKeyValue, TaskResult } from "@models/app.models"
import { map, Observable } from "rxjs"
import { ApiRoutes } from "@models/api.routes"


@Injectable({ providedIn: "root" })
export class DashboardServices {

    constructor(private httpClient: HttpClient) {

    }

    getTenantLogo(): Observable<any>{
        return this.httpClient.get<TaskResult<any>>(ApiRoutes.identity.tenantLogo,).pipe(map(x => x.value))
    }

    getDashboardLogo(): Observable<any>{
        return this.httpClient.get<TaskResult<any>>(ApiRoutes.identity.dashboardLogo,).pipe(map(x => x.value))
    }

    getEntityStatus(): Observable<IKeyValue[]> {
        return this.httpClient.get<TaskResult<IKeyValue[]>>(ApiRoutes.entityStatus).pipe(map(x => x.value))
    }

    getEntityTypes(): Observable<IKeyValue[]> {
        return this.httpClient.get<TaskResult<IKeyValue[]>>(ApiRoutes.entityTypes).pipe(map(x => x.value))
    }

}
