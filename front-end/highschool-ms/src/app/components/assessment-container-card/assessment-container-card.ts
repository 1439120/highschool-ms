import { Component, input } from '@angular/core';
import { ActionsHeader } from '../actions-header/actions-header';
import { AssessmentViewCard } from '../assessment-view-card/assessment-view-card';
import { Assessment } from '../../models/Assessment';

@Component({
  selector: 'app-assessment-container-card',
  imports: [ActionsHeader, AssessmentViewCard],
  templateUrl: './assessment-container-card.html',
  styleUrl: './assessment-container-card.scss',
})
export class AssessmentContainerCard {
    activeTerm = input<number>(0)
    assessments:Assessment[] = [
        {
          id: 1,
          term: 1,
          name: 'Algebra Quiz 1',
          type: 'quiz',
          due_date: new Date(2024, 1, 15),
          topics: [],
          duration: 30,
          weight: 15
        },
        {
          id: 2,
          term: 1,
          name: 'Equations Test',
          type: 'test',
          due_date: new Date(2024, 2, 5),
          topics: [],
          duration: 45,
          weight: 25
        },
        {
          id: 3,
          term: 2,
          name: 'Geometry Assignment',
          type: 'assignment',
          due_date: new Date(2024, 4, 10),
          topics: [],
          duration: 60,
          weight: 20
        },
        {
          id: 4,
          term: 3,
          name: 'Mid-Year Exam',
          type: 'exam',
          due_date: new Date(2024, 6, 15),
          topics: [],
          duration: 120,
          weight: 40
        }
    ];
    getAssessmentsByTerm(termId: number): any[] {
    return this.assessments.filter(a => a.term === termId);
  }
}
