import { Component } from '@angular/core';
import { Datamodel } from '../models/Datamodel';
import LessonPlanModel from '../models/LessonPlanModel';
import { Datatable } from '../components/datatable/datatable';

@Component({
  selector: 'app-lesson-plan',
  imports: [Datatable],
  templateUrl: './lesson-plan.html',
  styleUrl: './lesson-plan.scss',
})
export class LessonPlan extends Datamodel<LessonPlanModel> {
  constructor(){
      super()
      this.title_.set("Lesson Plan");
      // this.records_.set(subjects);
      this.headers_.set( [
        {'col':'lastUpdatedOn', 'groupBy': false},
        {'col':'name', 'groupBy': true},
        {'col':'subject', 'groupBy': true},
        {'col':'teacher', 'groupBy': true},
        {'col':'grade', 'groupBy': false},
      ])
      this.searchByItems_.set(['name'])
      this.filterBy_.set('grade')
      // const uniqueGrades: string[] = [
      //   ...new Set(subjects.map(c => c.grade.toString()))
      // ];
      // this.filterByItems_.set(uniqueGrades);
    }
}
