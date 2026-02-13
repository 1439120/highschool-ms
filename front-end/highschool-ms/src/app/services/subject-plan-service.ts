import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import SubjectPlanModel from '../models/SubjectPlanModel';

@Injectable({
  providedIn: 'root',
})
export class SubjectPlanService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5068';

  subjectPlans = signal<SubjectPlanModel[]>([])

  loadSubjectPlans(){
      this.http
        .get<SubjectPlanModel[]>(`${this.apiUrl}/api/subject-plan`)
        .subscribe({
          next: (data) => {
            console.log('Subject plans loaded:', data);
            this.subjectPlans.set(data);
          },
          error: (err) => {
            console.error('Failed to load Subject plans', err);
          }
        });
    }
}
