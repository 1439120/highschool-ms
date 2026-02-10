import { Component, effect } from '@angular/core';
import { Datamodel } from '../models/Datamodel';
import { User } from '../models/User';
import { Datatable } from '../components/datatable/datatable';
import { UsersService } from '../services/users-service';

@Component({
  selector: 'app-students',
  imports: [Datatable],
  templateUrl: './students.html',
  styleUrl: './students.scss',
})
export class Students extends Datamodel<User> {
  constructor(private service: UsersService){
    super();
    this.service.loadStudents(); 

    this.title_.set("Students")
    effect(()=>{
      this.records_.set(this.service.students());
      const uniqueRoles: string[] = [
        ...new Set(this.records_().map(c => c.role))
      ];
      this.filterByItems_.set(uniqueRoles);
    })
    
    this.headers_.set( [
      {
        'col': 'name', 'groupBy': true,
        displaName: 'Name'
      },
      {
        'col': 'phone', 'groupBy': false,
        displaName: 'Phone'
      },
      {
        'col': 'email', 'groupBy': true,
        displaName: 'Email'
      },
      {
        'col': 'role', 'groupBy': true,
        displaName: 'Role'
      },
      {
        'col': 'address', 'groupBy': true,
        displaName: 'Address'
      }])
      this.searchByItems_.set(['name','surname','email','role','phone'])
      this.filterBy_.set('Role')
      
  }

}
