import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5068';

  token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiZ2l2ZW5fbmFtZSI6IlVzZXIxIiwibmJmIjoxNzcwMzc1NDYyLCJleHAiOjE3NzA5ODAyNjIsImlhdCI6MTc3MDM3NTQ2MiwiaXNzIjoiaHR0dHA6Ly9sb2NhbGhvc3Q6NTI0NiIsImF1ZCI6Imh0dHRwOi8vbG9jYWxob3N0OjUyNDYifQ.Hg7o-FGOXA2aN6CTVP5_R-r7sgY4gmr_F4j96XRh53q7maaODqoBCNkbI1YcBrObmFxx4d6drg3IfJrHHpY21w";

  teachers = signal<User[]>([]);
  students = signal<User[]>([]);
  currentTeacher = signal<User | null>(null);

  private get authHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  loadTeachers(): void {
    const headers = this.authHeaders

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

  addTeacher(teacher: User){
    const headers = this.authHeaders
    const { id, ...payloadWithoutId } = teacher;
    const payload = { ...payloadWithoutId, type: 'staff' };
    console.log("the teacher being added: ", payload)
    this.http.post<User>(`${this.apiUrl}/api/users`, payload, { headers })
      .subscribe({
        next: (data) => {
          console.log(`Teacher added `, data);
          this.currentTeacher.set(data);
        },
        error: (err) => {
          console.error('Failed to load teachers', err);
        }
      });
  }

  getTeacher(id: string){
    if(isNaN(parseInt(id))) return;
    const headers = this.authHeaders
    this.http
      .get<User>(`${this.apiUrl}/api/users/${id}`, { headers })
      .subscribe({
        next: (data) => {
          console.log(`Teacher loaded ${id}`, data);
          this.currentTeacher.set(data);
        },
        error: (err) => {
          console.error('Failed to load teachers', err);
        }
      });
  }

  updateTeacher(id: string, teacher: User){
    if(isNaN(parseInt(id))) return;
    const payload = { ...teacher, type: 'staff' };
    const headers = this.authHeaders
    this.http
      .put<User>(`${this.apiUrl}/api/users/${id}`,payload , { headers })
      .subscribe({
        next: (data) => {
          console.log(`Teacher updated ${id}`, data);
          this.currentTeacher.set(data);
        },
        error: (err) => {
          console.error('Failed to load teachers', err);
        }
      });
  }
}
