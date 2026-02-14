import { Component, effect } from '@angular/core';
import { Datamodel } from '../models/Datamodel';
import { Classroom } from '../models/Classroom';
import { Datatable } from '../components/datatable/datatable';
import { ClassroomService } from '../services/classroom-service';

@Component({
  selector: 'app-classrooms',
  imports: [Datatable],
  templateUrl: './classrooms.html',
  styleUrl: './classrooms.scss',
})
export class Classrooms extends Datamodel<Classroom> {
  constructor(private service: ClassroomService){
      super();
      this.title_.set("Teachers");
      this.service.loadClassrooms();
      effect(()=>{
        this.records_.set(this.service.classrooms());
        const uniqueGrades: string[] = [
          ...new Set(this.records_().map(c => c.grade.toString()))
        ];
        this.filterByItems_.set(uniqueGrades);
      })
      
      this.headers_.set( [
      {
        'col': 'name', 'groupBy': true,
        displaName: 'Name'
      },
      {
        'col': 'classTeacher', 'groupBy': true,
        displaName: 'Class Teacher'
      },
      {
        'col': 'grade', 'groupBy': true,
        displaName: 'Grade'
      },
      {
        'col': 'number_of_subjecteds', 'groupBy': true,
        displaName: 'Number of Subjects'
      },
      {
        'col': 'maximumOccupants', 'groupBy': true,
        displaName: 'Maximum Occupants'
      },
      {
        'col': 'registeredStudents', 'groupBy': true,
        displaName: 'Registered Students'
      }])
      this.searchByItems_.set(['name','class_teacher'])
      this.filterBy_.set('Grade')
      
      
    }
}
