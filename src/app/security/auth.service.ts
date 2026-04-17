import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ApiRoutes } from "@models/api.routes";
import { Student, StudentProfile, UserProfile } from "@models/app.models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export default class AuthorizeService{

    constructor(private httpClient: HttpClient, private router: Router){

    }

    // poke the server if it returns success then we are authenticated
    isAuthenticated(): Observable<boolean>{
        return new Observable(subscriber =>{
            this.httpClient.get<any>(ApiRoutes.student.alive).subscribe({
                next: response =>{
                    subscriber.next(true);
                    subscriber.complete()
                    return;
                },
                error: er =>{
                    subscriber.next(false);
                    subscriber.complete()
                    return;
                }
            })
        })
    }

    signOut(){
        this.httpClient.get<any>(ApiRoutes.identity.signout).subscribe({
            next: res =>{
                this.router.navigateByUrl(this.router.createUrlTree(['/']).toString())
            },
            error: er =>{
                
            }
        })
    }

   getProfile(): Observable<Student>{
        return new Observable(subscriber =>{
            this.httpClient.get<any>(ApiRoutes.student.profile).subscribe({
                next: response =>{
                    subscriber.next(response.value);
                    subscriber.complete()
                    return;
                },
                error: er =>{
                    throw "Cannot load dashboard at the moment. An error occured loading student dashboard"
                }
            })
        })
    }

   getAccount(): Observable<UserProfile>{
        return new Observable(subscriber =>{
            this.httpClient.get<any>(ApiRoutes.account.profile).subscribe({
                next: response =>{
                    subscriber.next(response.value);
                    subscriber.complete()
                    return;
                },
                error: er =>{
                    throw "Cannot load dashboard at the moment. An error occured loading student dashboard"
                }
            })
        })
    }

}