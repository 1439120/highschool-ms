import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Classroom, UserClassesModel } from '../models/Classroom';

@Injectable({
  providedIn: 'root',
})
export class UserClassesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5068/api/user-classes';

  readonly isLoading = signal<boolean>(false);
  assignedClasses = signal<UserClassesModel[]>([])

  loadUserClasses(userId: string){
    this.isLoading.set(true);
    this.http
      .get<UserClassesModel[]>(`${this.apiUrl}/${userId}`)
      .subscribe({
        next: (data) => {
          console.log('Information added:', data);
          this.assignedClasses.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Information failed to load', err);
          this.isLoading.set(false);
        }
      });
  }

  assignToClass(userId: string, classroom: Classroom){
    this.isLoading.set(true);
    const payload = {
      usersId: userId,
      classId: classroom.id
    }
    this.http
      .post(`${this.apiUrl}`, payload)
      .subscribe({
        next: (data) => {
          console.log('Information added:', data);
          // this.assignedClasses.set(data);
          // this.loadUserClasses(userId);
          const addedClass:UserClassesModel  = {
            usersId: parseInt(userId),
            class: classroom
          }
          this.assignedClasses.update(classes => [...classes, addedClass]);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Information failed to load', err);
          this.isLoading.set(false);
        }
      });
  }
  unAssignToClass(userId: string, classroom: Classroom){
    this.isLoading.set(true);

    this.http
      .delete(`${this.apiUrl}/${classroom.id}/${userId}`)
      .subscribe({
        next: (data) => {
          console.log('Information deleted:', data);
          // this.assignedClasses.set(data);
          // this.loadUserClasses(userId);
          this.assignedClasses.update(classes => 
            classes.filter(c => c.class.id !== classroom.id)
          );
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Information failed to load', err);
          this.isLoading.set(false);
        }
      });
  }
}
