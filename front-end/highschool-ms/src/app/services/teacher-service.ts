import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5068';

  token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiZ2l2ZW5fbmFtZSI6IlVzZXIxIiwibmJmIjoxNzcwMzc1NDYyLCJleHAiOjE3NzA5ODAyNjIsImlhdCI6MTc3MDM3NTQ2MiwiaXNzIjoiaHR0dHA6Ly9sb2NhbGhvc3Q6NTI0NiIsImF1ZCI6Imh0dHRwOi8vbG9jYWxob3N0OjUyNDYifQ.Hg7o-FGOXA2aN6CTVP5_R-r7sgY4gmr_F4j96XRh53q7maaODqoBCNkbI1YcBrObmFxx4d6drg3IfJrHHpY21w";

  teachers = signal<User[]>([]);

  loadTeachers(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    this.http
      .get<User[]>(`${this.apiUrl}/api/users?Type=staff`, { headers })
      .subscribe({
        next: (data) => {
          console.log('Teachers loaded:', data);
          this.teachers.set(data);
        },
        error: (err) => {
          console.error('Failed to load teachers', err);
        }
      });
  }
}
