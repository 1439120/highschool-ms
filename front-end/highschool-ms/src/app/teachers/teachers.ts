import { Component } from '@angular/core';
import { Datatable } from '../components/datatable/datatable';
import { User } from '../models/User';
import { Datamodel } from '../models/Datamodel';

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
    let teachers: User[] = [
        { id:9093, name: 'Alice', surname: 'Mbatha', phone:'012 111 2233', email: 'alice@mail.com', role: 'Admin', address:'123 Avenue' },
        { id:6393, name: 'Bob', surname: 'Mkhonto', phone:'012 111 2233', email: 'bob@mail.com', role: 'User', address:'450 Value' },
        { id:9494, name: 'Charlie', surname: 'Nkhosi', phone:'012 111 2233', email: 'charlie@mail.com', role: 'Editor', address:'011 Vilikazi' },
        { id:8943, name: 'David', surname: 'Smith', phone:'012 222 3344', email: 'david@mail.com', role: 'User', address:'789 Street' },
        { id:3334, name: 'Eve', surname: 'Johnson', phone:'012 333 4455', email: 'eve@mail.com', role: 'Admin', address:'456 Road' },
        { id:5893, name: 'Frank', surname: 'Williams', phone:'012 444 5566', email: 'frank@mail.com', role: 'Editor', address:'321 Boulevard' }
    ]
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
