import { Component } from '@angular/core';
import { Datamodel } from '../models/Datamodel';
import { User } from '../models/User';
import { Datatable } from '../components/datatable/datatable';

@Component({
  selector: 'app-students',
  imports: [Datatable],
  templateUrl: './students.html',
  styleUrl: './students.scss',
})
export class Students extends Datamodel {
  constructor(){
    super();
    this.title_.set("Students")
    let students: User[] = [
      { name: 'Alice', surname: 'Mbatha', phone:'012 111 2233', email: 'alice@mail.com', role: 'Admin', address:'123 Avenue' },
        { name: 'Bob', surname: 'Mkhonto', phone:'012 111 2233', email: 'bob@mail.com', role: 'User', address:'450 Value' },
        { name: 'Charlie', surname: 'Nkhosi', phone:'012 111 2233', email: 'charlie@mail.com', role: 'Editor', address:'011 Vilikazi' },
        { name: 'David', surname: 'Smith', phone:'012 222 3344', email: 'david@mail.com', role: 'User', address:'789 Street' },
        { name: 'Eve', surname: 'Johnson', phone:'012 333 4455', email: 'eve@mail.com', role: 'Admin', address:'456 Road' },
        { name: 'Frank', surname: 'Williams', phone:'012 444 5566', email: 'frank@mail.com', role: 'Editor', address:'321 Boulevard' }
    ]
    this.records_.set(students);
  }
}
