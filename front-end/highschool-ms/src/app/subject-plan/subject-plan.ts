import { Component } from '@angular/core';
import { Datamodel } from '../models/Datamodel';
import SubjectPlanModel from '../models/SubjectPlanModel';
import { Datatable } from "../components/datatable/datatable";


@Component({
  selector: 'app-subject-plan',
  imports: [Datatable],
  templateUrl: './subject-plan.html',
  styleUrl: './subject-plan.scss',
})
export class SubjectPlan extends Datamodel<SubjectPlanModel> {
  constructor(){
      super()
      this.title_.set("Subject-Plan");
      // this.service.loadLessonPlans();
      this.title_.set("Lesson-Plan");
      // effect(()=>{
      //   this.records_.set(this.service.lessonPlans());
      // })
      
      this.headers_.set( [
        {
          'col': 'lastUpdatedOn', 'groupBy': false, displaName: 'Last Updated On'
        },
        {
          'col': 'name', 'groupBy': true, displaName: 'Name'
        },
        {
          'col': 'subjects', 'groupBy': true, displaName: 'Subject'
        },
        {
          'col': 'responsible', 'groupBy': true, displaName: 'Responsible'
        },
        {
          'col': 'grades', 'groupBy': false, displaName: 'Grade'
        },
      ])
      this.searchByItems_.set(['name'])
      this.filterBy_.set('grade')
    }
}
