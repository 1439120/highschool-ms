import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const  token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMDgzMTU1YS1lYzY1LTQ2NTgtOTMwNS1hZDFkN2U2NjdiMmQiLCJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiZ2l2ZW5fbmFtZSI6IlVzZXIxIiwibmJmIjoxNzgzMDc5MjIyLCJleHAiOjE3ODM2ODQwMjIsImlhdCI6MTc4MzA3OTIyMiwiaXNzIjoiaHR0dHA6Ly9sb2NhbGhvc3Q6NTI0NiIsImF1ZCI6Imh0dHRwOi8vbG9jYWxob3N0OjUyNDYifQ._VsI2IYS0BYOjaTE9cyn_n_O5kHPlbeukqVTD_jAdDABlO8KeIYAMZ9urlmo6FzlGvAxzmoQKWI6vgaTbU8mpA";
        // skip login
        if (req.url.includes('/auth/login')) {
            return next.handle(req);
        }
        
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });

        return next.handle(authReq);
    }
    
}