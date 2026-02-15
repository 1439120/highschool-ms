import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5068';

  token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiZ2l2ZW5fbmFtZSI6IlVzZXIxIiwibmJmIjoxNzcwMzc1NDYyLCJleHAiOjE3NzA5ODAyNjIsImlhdCI6MTc3MDM3NTQ2MiwiaXNzIjoiaHR0dHA6Ly9sb2NhbGhvc3Q6NTI0NiIsImF1ZCI6Imh0dHRwOi8vbG9jYWxob3N0OjUyNDYifQ.Hg7o-FGOXA2aN6CTVP5_R-r7sgY4gmr_F4j96XRh53q7maaODqoBCNkbI1YcBrObmFxx4d6drg3IfJrHHpY21w";

  teachers = signal<User[]>([]);
  students = signal<User[]>([]);
  currentUser = signal<User | null>(null);

  private get authHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  loadTeachers(): void {
    this.http
      .get<User[]>(`${this.apiUrl}/api/users?Type=staff`)
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

  loadStudents(): void {
    const headers = this.authHeaders

    this.http
      .get<User[]>(`${this.apiUrl}/api/users?Type=student`, { headers })
      .subscribe({
        next: (data) => {
          console.log('Students loaded:', data);
          this.students.set(data);
        },
        error: (err) => {
          console.error('Failed to load teachers', err);
        }
      });
  }

  addUser(teacher: User, userType: string){
    const headers = this.authHeaders
    const { id, ...payloadWithoutId } = teacher;
    const payload = { ...payloadWithoutId, type: userType };
    console.log("the teacher being added: ", payload)
    this.http.post<User>(`${this.apiUrl}/api/users`, payload, { headers })
      .subscribe({
        next: (data) => {
          console.log(`Teacher added `, data);
          this.currentUser.set(data);
        },
        error: (err) => {
          console.error('Failed to load teachers', err);
        }
      });
  }

  getUser(id: string){
    if(isNaN(parseInt(id))) return;
    const headers = this.authHeaders
    this.http
      .get<User>(`${this.apiUrl}/api/users/${id}`, { headers })
      .subscribe({
        next: (data) => {
          console.log(`User loaded ${id}`, data);
          this.currentUser.set(data);
        },
        error: (err) => {
          console.error('Failed to load user', err);
        }
      });
  }

  updateUser(id: string, teacher: User, userType: string){
    if(isNaN(parseInt(id))) return;
    const payload = { ...teacher, type: userType };
    const headers = this.authHeaders
    this.http
      .put<User>(`${this.apiUrl}/api/users/${id}`,payload , { headers })
      .subscribe({
        next: (data) => {
          console.log(`Teacher updated ${id}`, data);
          this.currentUser.set(data);
        },
        error: (err) => {
          console.error('Failed to load user', err);
        }
      });
  }

  searchTeachers(term: string): Observable<User[]> {
          const headers = this.authHeaders
          return this.http.get<User[]>(`${this.apiUrl}/api/users`, {
              headers,
              params: { Name: term} // Use 'params' for cleaner URL building
            });
  }
}
