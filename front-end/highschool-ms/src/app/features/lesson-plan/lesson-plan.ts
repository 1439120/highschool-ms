import { Component, effect } from '@angular/core';
import { Datamodel } from '../../models/Datamodel';
import LessonPlanModel from '../../models/LessonPlanModel';
import { Datatable } from '../../components/datatable/datatable';
import { LessonPlanService } from '../../services/lesson-plan-service';

@Component({
  selector: 'app-lesson-plan',
  imports: [Datatable],
  templateUrl: './lesson-plan.html',
  styleUrl: './lesson-plan.scss',
})
export class LessonPlan extends Datamodel<LessonPlanModel> {
  constructor(private service: LessonPlanService){
      super()
      this.service.loadLessonPlans();
      this.title_.set("Lesson-Plan");
      effect(()=>{
        this.records_.set(this.service.lessonPlans());
      })
      
      this.headers_.set( [
        {
          'col': 'lastUpdatedOn', 'groupBy': false,
          displaName: 'Last Updated On'
        },
        {
          'col': 'name', 'groupBy': true,
          displaName: 'Name'
        },
        {
          'col': 'subjects', 'groupBy': true,
          displaName: 'Subject'
        },
        {
          'col': 'responsible', 'groupBy': true,
          displaName: 'Responsible'
        },
        {
          'col': 'grades', 'groupBy': false,
          displaName: 'Grade'
        },
      ])
      this.searchByItems_.set(['name'])
      this.filterBy_.set('grade')
      // const uniqueGrades: string[] = [
      //   ...new Set(subjects.map(c => c.grade.toString()))
      // ];
      // this.filterByItems_.set(uniqueGrades);
    }
}
