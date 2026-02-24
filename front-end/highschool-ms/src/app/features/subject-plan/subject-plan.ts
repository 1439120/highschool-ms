import { Component, effect } from '@angular/core';
import { Datamodel } from '../../models/Datamodel';
import SubjectPlanModel from '../../models/SubjectPlanModel';
import { Datatable } from "../../components/datatable/datatable";
import { SubjectPlanService } from '../../services/subject-plan-service';


@Component({
  selector: 'app-subject-plan',
  imports: [Datatable],
  templateUrl: './subject-plan.html',
  styleUrl: './subject-plan.scss',
})
export class SubjectPlan extends Datamodel<SubjectPlanModel> {
  constructor(private service: SubjectPlanService){
      super()
      this.title_.set("Subject-Plan");
      this.service.loadSubjectPlans();

      effect(()=>{
        this.records_.set(this.service.subjectPlans());
      })
      
      this.headers_.set( [
        {
          'col': 'name', 'groupBy': true, displaName: 'Name'
        },
        {
          'col': 'createdBy', 'groupBy': true, displaName: 'Created By'
        },
        {
          'col': 'subject', 'groupBy': true, displaName: 'Subject'
        },
        {
          'col': 'grade', 'groupBy': false, displaName: 'Grade'
        },
        {
          'col': 'createdOn', 'groupBy': false, displaName: 'Created On'
        },
        {
          'col': 'lastUpdatedOn', 'groupBy': false, displaName: 'Last Updated On'
        },
      ])
      this.searchByItems_.set(['name'])
      this.filterBy_.set('grade')
    }
}
