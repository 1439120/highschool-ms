import { Component } from '@angular/core';
import { Datamodel } from '../models/Datamodel';
import { Classroom, classrooms } from '../models/Classroom';
import { Datatable } from '../components/datatable/datatable';

@Component({
  selector: 'app-classrooms',
  imports: [Datatable],
  templateUrl: './classrooms.html',
  styleUrl: './classrooms.scss',
})
export class Classrooms extends Datamodel<Classroom> {
  constructor(){
      super();
      this.title_.set("Teachers");
      this.records_.set(classrooms);
      this.headers_.set( [
      {'col':'Name', 'groupBy': true},
      {'col':'class_teacher', 'groupBy': true},
      {'col':'Grade', 'groupBy': true},
      {'col':'number_of_subjecteds', 'groupBy': true},
      {'col':'maximum_occupants', 'groupBy': true},
      {'col':'regsitered_students', 'groupBy': true}])
      this.searchByItems_.set(['name','class_teacher'])
      this.filterBy_.set('Grade')
      const uniqueGrades: string[] = [
        ...new Set(classrooms.map(c => c.grade.toString()))
      ];
      this.filterByItems_.set(uniqueGrades);
    }
}
