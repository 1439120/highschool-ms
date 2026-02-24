import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const  token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiZ2l2ZW5fbmFtZSI6IlVzZXIxIiwibmJmIjoxNzcxODM2MDA0LCJleHAiOjE3NzI0NDA4MDQsImlhdCI6MTc3MTgzNjAwNCwiaXNzIjoiaHR0dHA6Ly9sb2NhbGhvc3Q6NTI0NiIsImF1ZCI6Imh0dHRwOi8vbG9jYWxob3N0OjUyNDYifQ.p-MWPa8gN3G_-OGvKkSHbwbhzLqDUd8CF_V5BH-Ys22shM-Ii2_Q14yuZzGVIwWVabGsauNP1vmXhW9dDDvGng";
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