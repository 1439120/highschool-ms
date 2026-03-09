import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SubjectsModel } from '../models/SubjectsModel';

@Injectable({
  providedIn: 'root',
})
export class UserAssignedSubjects {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5068/api/user-subjects';

  readonly isLoading = signal<boolean>(false);
  subjects = signal<SubjectsModel[]>([])
  reloadSubjects = signal(0);

  getUserClassSubjects(userId: string, classId: string){
    return this.http.get<SubjectsModel[]>(
    `${this.apiUrl}/${userId}/${classId}`
  );
  }

  assignUserSubjects(userId: string, classId: string, subjectId: string){
    const payload = {
        "userId": userId,
        "classId": classId,
        "subjectId": subjectId
    }
    this.isLoading.set(true);
    this.http
      .post<SubjectsModel[]>(`${this.apiUrl}`, payload)
      .subscribe({
        next: (data) => {
          console.log('user subjects added:', data);
          // this.subjects.set(data);
          this.reloadSubjects.update(v => v + 1);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Information failed to load', err);
          this.isLoading.set(false);
        }
      });
  }

  unAssignUserSubjects(userId: string, classId: string, subjectId: string){

    this.isLoading.set(true);
    this.http
      .delete<SubjectsModel[]>(`${this.apiUrl}/${userId}/${classId}/${subjectId}`)
      .subscribe({
        next: (data) => {
          console.log('user subjects added:', data);
          // this.subjects.set(data);
          this.reloadSubjects.update(v => v + 1);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Information failed to load', err);
          this.isLoading.set(false);
        }
      });
  }

}
