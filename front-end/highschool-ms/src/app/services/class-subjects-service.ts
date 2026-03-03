import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SubjectsModel } from '../models/SubjectsModel';

@Injectable({
  providedIn: 'root',
})
export class ClassSubjectsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5068/api/class-subjects';

  readonly isLoading = signal<boolean>(false);
  classSubjects = signal<SubjectsModel[]>([])

  loadClassSubjects(classId: string){
    this.isLoading.set(true);
    this.http
      .get<SubjectsModel[]>(`${this.apiUrl}/${classId}`)
      .subscribe({
        next: (data) => {
          // console.log('class subjects done loading:', classId);
          console.log('class subjects done loading:', data);
          this.classSubjects.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Information failed to load', err);
          this.isLoading.set(false);
        }
      });
  }
}
