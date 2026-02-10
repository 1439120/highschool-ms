import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import LessonPlanModel from '../models/LessonPlanModel';

@Injectable({
  providedIn: 'root',
})
export class LessonPlanService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5068';

  lessonPlans = signal<LessonPlanModel[]>([])

  loadLessonPlans(){
    this.http
      .get<LessonPlanModel[]>(`${this.apiUrl}/api/lesson-plan`)
      .subscribe({
        next: (data) => {
          console.log('Lesson plans loaded:', data);
          this.lessonPlans.set(data);
        },
        error: (err) => {
          console.error('Failed to load Lesson plans', err);
        }
      });
  }
}
