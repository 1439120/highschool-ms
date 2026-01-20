import { Component } from '@angular/core';
import { Datamodel } from '../models/Datamodel';
import { User } from '../models/User';
import { Datatable } from '../components/datatable/datatable';
import Tableheader from '../models/Tableheader';

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
    let students: User[] = [
      { id:2239, name: 'Bheki', surname: 'Cele', phone:'072 171 2233', email: 'bhekic@mail.com', role: 'Student', address:'123 Avenue' },
        { id:8376, name: 'Musa', surname: 'Maziya', phone:'082 119 2234', email: 'musam@mail.com', role: 'Representative', address:'450 Value' },
        { id:1730, name: 'Freddie', surname: 'Khumalo', phone:'072 118 1231', email: 'freddiek@mail.com', role: 'Student', address:'011 Vilikazi' },
        { id:7839, name: 'Thembi', surname: 'Ntimba', phone:'076 222 3344', email: 'thembin@mail.com', role: 'Representative', address:'789 Street' },
        { id: 1348, name: 'Silva', surname: 'Mlambo', phone:'079 333 4455', email: 'silvam@mail.com', role: 'Student', address:'456 Road' },
        { id:3283, name: 'Gray', surname: 'Jordan', phone:'081 444 5566', email: 'grayj@mail.com', role: 'Student', address:'321 Boulevard' }
    ]
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
