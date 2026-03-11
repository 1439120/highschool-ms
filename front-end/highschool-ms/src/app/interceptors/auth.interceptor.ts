import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const  token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiZ2l2ZW5fbmFtZSI6IlVzZXIxIiwibmJmIjoxNzczMjA5MjQwLCJleHAiOjE3NzM4MTQwNDAsImlhdCI6MTc3MzIwOTI0MCwiaXNzIjoiaHR0dHA6Ly9sb2NhbGhvc3Q6NTI0NiIsImF1ZCI6Imh0dHRwOi8vbG9jYWxob3N0OjUyNDYifQ.07P6sFbYYYS7gs_SSB6miGcfy_gAQT8_h361HKu-JuK7HpwIPYSbHnm7_w2sHmc7w-YckEC-FSzF1dn_YhegOQ";
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