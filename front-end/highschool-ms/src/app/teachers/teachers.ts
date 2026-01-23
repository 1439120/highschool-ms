import { Component } from '@angular/core';
import { Datatable } from '../components/datatable/datatable';
import { User } from '../models/User';
import { Datamodel } from '../models/Datamodel';
import { teachers } from '../models/User';
@Component({
  selector: 'app-teachers',
  imports: [ Datatable ],
  templateUrl: './teachers.html',
  styleUrl: './teachers.scss',
})

export class Teachers extends Datamodel<User> {

  constructor(){
    super();
    this.title_.set("Teachers");
    // let teachers: User[] = 
    this.records_.set(teachers);
    this.headers_.set( [
      {'col':'Name', 'groupBy': true},
      {'col':'Phone', 'groupBy': false},
      {'col':'Email', 'groupBy': true},
      {'col':'Role', 'groupBy': true},
      {'col':'Address', 'groupBy': true}])
    this.searchByItems_.set(['name','surname','email','role','phone'])
    this.filterBy_.set('Role')
    const uniqueRoles: string[] = [
      ...new Set(teachers.map(c => c.role))
    ];
    this.filterByItems_.set(uniqueRoles);
  }

}
