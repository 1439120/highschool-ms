import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const  token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiZ2l2ZW5fbmFtZSI6IlVzZXIxIiwibmJmIjoxNzcwMzc1NDYyLCJleHAiOjE3NzA5ODAyNjIsImlhdCI6MTc3MDM3NTQ2MiwiaXNzIjoiaHR0dHA6Ly9sb2NhbGhvc3Q6NTI0NiIsImF1ZCI6Imh0dHRwOi8vbG9jYWxob3N0OjUyNDYifQ.Hg7o-FGOXA2aN6CTVP5_R-r7sgY4gmr_F4j96XRh53q7maaODqoBCNkbI1YcBrObmFxx4d6drg3IfJrHHpY21w";
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