import { Component } from '@angular/core';
import { Datamodel } from '../models/Datamodel';
import { SubjectsModel, subjects } from '../models/SubjectsModel';
import { Datatable } from '../components/datatable/datatable';
/**
 * Subjects should come from the department should not be editable
 * If the school has grade 8 to 10, only show those subjects
 */
@Component({
  selector: 'app-subjects',
  imports: [Datatable],
  templateUrl: './subjects.html',
  styleUrl: './subjects.scss',
})
export class Subjects extends Datamodel<SubjectsModel> {
  constructor(){
    super()
    this.title_.set("Subjects");
    this.records_.set(subjects);
    this.headers_.set( [
    {'col':'name', 'groupBy': true},
    {'col':'grade', 'groupBy': true},
    {'col':'chapters', 'groupBy': true},
    {'col':'tests', 'groupBy': true},
    {'col':'assignments', 'groupBy': true},
    {'col':'exams', 'groupBy': true}])
    this.searchByItems_.set(['name'])
    this.filterBy_.set('grade')
    const uniqueGrades: string[] = [
      ...new Set(subjects.map(c => c.grade.toString()))
    ];
    this.filterByItems_.set(uniqueGrades);
  }

}
