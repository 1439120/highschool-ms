import { Component } from '@angular/core';
import { Datamodel } from '../models/Datamodel';
import { User } from '../models/User';
import { Datatable } from '../components/datatable/datatable';
// import { students } from '../models/Student';
import { students } from '../models/User';

@Component({
  selector: 'app-students',
  imports: [Datatable],
  templateUrl: './students.html',
  styleUrl: './students.scss',
})
export class Students extends Datamodel<User> {
  constructor(){
    super();
    this.title_.set("Students")
    this.records_.set(students);
    this.headers_.set( [
      {'col':'Name', 'groupBy': true},
      {'col':'Phone', 'groupBy': false},
      {'col':'Email', 'groupBy': true},
      {'col':'Role', 'groupBy': true},
      {'col':'Address', 'groupBy': true}])
      this.searchByItems_.set(['name','surname','email','role','phone'])
      this.filterBy_.set('Role')
      const uniqueRoles: string[] = [
        ...new Set(students.map(c => c.role))
      ];
      this.filterByItems_.set(uniqueRoles);
  }

}
