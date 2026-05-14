import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ApiRoutes } from "@models/api.routes";
import { TaskResult, UserProfile } from "@models/app.models";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
    providedIn: "root"
})
export default class AuthorizeService {

    constructor(private httpClient: HttpClient, private router: Router) {

    }

    login(f: any): Observable<any> {
        return this.httpClient.post<TaskResult<any>>(ApiRoutes.identity.login, f).pipe(map((v) => { return v.value }))
    }

    forgotPassword(f: any): Observable<any> {
        return this.httpClient.post<TaskResult<any>>(ApiRoutes.identity.forgotPassword, f).pipe(map((v) => { return v.value }))
    }

    validateCode(f: any): Observable<any> {
        return this.httpClient.post<TaskResult<any>>(ApiRoutes.identity.validateCode, f).pipe(map((v) => { return v.value }))
    }

    resetPassword(f: any): Observable<any> {
        return this.httpClient.post<TaskResult<any>>(ApiRoutes.identity.resetPassword, f).pipe(map((v) => { return v.value }))
    }

    // poke the server if it returns success then we are authenticated
    isAuthenticated(): Observable<boolean> {
        return this.httpClient.get<any>(ApiRoutes.account.alive).pipe(
            map((k: any) => { return true }),
            catchError(() => { return of(false) }))
    }

    signOut() {
        this.httpClient.get<any>(ApiRoutes.identity.signout).subscribe({
            next: (v) => {
                this.router.navigateByUrl(`/?returnUrl=${this.router.url}`)
            }
        })
    }

    getAccount(): Observable<UserProfile> {
        return this.httpClient.get<any>(ApiRoutes.account.profile).pipe(map((v) => { return v.value }),
            catchError(() => { throw "Cannot load dashboard at the moment." }))
    }
}