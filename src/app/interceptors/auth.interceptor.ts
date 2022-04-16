import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AlertService } from "../services/alert.service";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private router: Router,
        private alert: AlertService
    ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenticated()) {
            req = req.clone({
                setParams: {
                    auth: this.auth.token
                }
            })
        }
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.auth.logout();
                    this.router.navigate(['/']);
                    this.alert.danger("You have to login again")
                }
            return throwError(error);
        }))
    }

}