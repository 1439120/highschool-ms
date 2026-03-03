import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const  token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiZ2l2ZW5fbmFtZSI6IlVzZXIxIiwibmJmIjoxNzcyNTUyMTU4LCJleHAiOjE3NzMxNTY5NTgsImlhdCI6MTc3MjU1MjE1OCwiaXNzIjoiaHR0dHA6Ly9sb2NhbGhvc3Q6NTI0NiIsImF1ZCI6Imh0dHRwOi8vbG9jYWxob3N0OjUyNDYifQ.4AnnD0XFDi7Ng8IuqQ3pY3RAcuy0LPNPG9pqR07uaAQffLxClu43LrWm9eR8Lk5cxiJ8avu-Jk3T7yglbSh_mg";
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