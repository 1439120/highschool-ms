import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Classroom } from '../models/Classroom';
import Grades from '../models/Grades';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5068';

  defaultGrade: Grades = {
    id: 0,
    name: '',
    gradeNumber: 0
  }
  defaultUser: User = {
    id: 0,
    name: '',
    surname: '',
    phone: '',
    email: '',
    role: '',
    address: '',
    dateOfBirth: null,
    dateJoined: null,
    type: ''
  }
  classrooms = signal<Classroom[]>([])
  currentClassroom = signal<Classroom>({
    id: 0,
    name: '',
    grade: this.defaultGrade,
    classTeacher: this.defaultUser,
    maximumOccupants: 0,
    registeredStudents: 0,
    numberOfSubjecteds: 0,
    academicYear: 0,
    roomNumber: ''
  })

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
  getClassroomById(Id: string){
    this.http
      .get<Classroom>(`${this.apiUrl}/api/classroom/${Id}`)
      .subscribe({
        next: (data) => {
          console.log(`data retrieved successfully ${data}`)
          this.currentClassroom.set(data);
        },
        error: (err) => {
          console.error(`Failed to load Classrooms ${Id}`, err);
        }
      });
  }
}
