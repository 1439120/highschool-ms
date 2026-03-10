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
  readonly isLoading = signal<boolean>(false);

  private get authHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  loadTeachers(): void {
    this.isLoading.set(true);
    this.http
      .get<User[]>(`${this.apiUrl}/api/users?Type=staff`)
      .subscribe({
        next: (data) => {
          console.log('Teachers loaded:', data);
          this.teachers.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Failed to load teachers', err);
          this.isLoading.set(false);
        }
      });
  }

  loadStudents(): User[] {
    const headers = this.authHeaders
    this.isLoading.set(true);
    this.http
      .get<User[]>(`${this.apiUrl}/api/users?Type=student`, { headers })
      .subscribe({
        next: (data) => {
          console.log('Students loaded:', data);
          this.students.set(data);
          this.isLoading.set(false);
          return data
        },
        error: (err) => {
          console.error('Failed to load teachers', err);
          this.isLoading.set(false);
          return []
        }
      });
      return this.students()
  }
  loadStudentsAsync(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiUrl}/api/users`,{
        params: {Type: 'student'}
      });
    }

  addUser(teacher: User, userType: string){
    const headers = this.authHeaders
    const { id, ...payloadWithoutId } = teacher;
    const payload = { ...payloadWithoutId, type: userType };
    this.isLoading.set(true);
    console.log("the teacher being added: ", payload)
    this.http.post<User>(`${this.apiUrl}/api/users`, payload, { headers })
      .subscribe({
        next: (data) => {
          console.log(`Teacher added `, data);
          this.currentUser.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Failed to load teachers', err);
          this.isLoading.set(false);
        }
      });
  }

  assignUserToClass(user: User, classId: string){
    const headers = this.authHeaders
    this.isLoading.set(true);
    this.http.put<User>(`${this.apiUrl}/api/users/${user.id}/${classId}`, { headers })
      .subscribe({
        next: (data) => {
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Failed to load teachers', err);
          this.isLoading.set(false);
        }
      });
  }

  getUser(id: string){
    if(isNaN(parseInt(id))) return;
    const headers = this.authHeaders
    this.isLoading.set(true);
    this.http
      .get<User>(`${this.apiUrl}/api/users/${id}`, { headers })
      .subscribe({
        next: (data) => {
          console.log(`User loaded ${id}`, data);
          this.currentUser.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Failed to load user', err);
          this.isLoading.set(false);
        }
      });
  }

  updateUser(id: string, teacher: User, userType: string){
    if(isNaN(parseInt(id))) return;
    const payload = { ...teacher, type: userType };
    const headers = this.authHeaders
    this.isLoading.set(true);
    this.http
      .put<User>(`${this.apiUrl}/api/users/${id}`,payload , { headers })
      .subscribe({
        next: (data) => {
          console.log(`Teacher updated ${id}`, data);
          this.currentUser.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Failed to load user', err);
          this.isLoading.set(false);
        }
      });
  }

  searchTeachers(term: string): Observable<User[]> {
    
    const headers = this.authHeaders;
    if(term.length > 0)
      return this.http.get<User[]>(`${this.apiUrl}/api/users`, {
          headers,
          params: { Name: term} // Use 'params' for cleaner URL building
        });
    return this.http.get<User[]>(`${this.apiUrl}/api/users`, {
          headers,
        });  
  }
}
