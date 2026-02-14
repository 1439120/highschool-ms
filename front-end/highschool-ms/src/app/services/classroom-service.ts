import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Classroom } from '../models/Classroom';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5068';

  classrooms = signal<Classroom[]>([])

  loadClassrooms(){
        this.http
          .get<Classroom[]>(`${this.apiUrl}/api/classroom`)
          .subscribe({
            next: (data) => {
              console.log('Classrooms loaded:', data);
              this.classrooms.set(data);
            },
            error: (err) => {
              console.error('Failed to load Classrooms', err);
            }
          });
      }
}
