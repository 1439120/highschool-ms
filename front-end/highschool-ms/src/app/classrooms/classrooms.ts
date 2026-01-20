import { Component } from '@angular/core';
import { Datamodel } from '../models/Datamodel';
import Classroom from '../models/Classroom';
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
      let classrooms: Classroom[] = [
          { id:1, name: 'Grade 8A', grade: 8, class_teacher:'Alice Mbatha', maximum_occupants: 60, regsitered_students: 48, number_of_subjecteds:10 },
          { id:2, name: 'Grade 8B', grade: 8, class_teacher:'Bob Mkhonto', maximum_occupants: 60, regsitered_students: 52, number_of_subjecteds:10 },
          { id:3, name: 'Grade 9A', grade: 9, class_teacher:'Charlie Nkhosi', maximum_occupants: 75, regsitered_students: 55, number_of_subjecteds:10 },
          { id:4, name: 'Grade 9B', grade: 9, class_teacher:'David Smith', maximum_occupants: 75, regsitered_students: 60, number_of_subjecteds:10 },
           { id:3, name: 'Grade 10A', grade: 10, class_teacher:'Eve Johnson', maximum_occupants: 50, regsitered_students: 40, number_of_subjecteds:8 },
          { id:4, name: 'Grade 10B', grade: 10, class_teacher:'Frank Williams', maximum_occupants: 50, regsitered_students: 43, number_of_subjecteds:8 },
          { id:4, name: 'Grade 10C', grade: 10, class_teacher:'Alice Mbatha', maximum_occupants: 50, regsitered_students: 48, number_of_subjecteds:8 },
          { id:4, name: 'Grade 10D', grade: 10, class_teacher:'Bob Mkhonto', maximum_occupants: 50, regsitered_students: 50, number_of_subjecteds:8 },

      ]
      this.records_.set(classrooms);
      this.headers_.set( [
      {'col':'Name', 'groupBy': true},
      {'col':'class_teacher', 'groupBy': true},
      {'col':'Grade', 'groupBy': true},
      {'col':'number_of_subjecteds', 'groupBy': true},
      {'col':'maximum_occupants', 'groupBy': true},
      {'col':'regsitered_students', 'groupBy': true}])
    }
}
