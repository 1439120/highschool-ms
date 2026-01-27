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
    this.title_.set("Students")
    effect(()=>{
      this.records_.set(this.service.students());
      const uniqueRoles: string[] = [
        ...new Set(this.service.students().map(c => c.role))
      ];
      this.filterByItems_.set(uniqueRoles);
    })
    
    this.headers_.set( [
      {'col':'Name', 'groupBy': true},
      {'col':'Phone', 'groupBy': false},
      {'col':'Email', 'groupBy': true},
      {'col':'Role', 'groupBy': true},
      {'col':'Address', 'groupBy': true}])
      this.searchByItems_.set(['name','surname','email','role','phone'])
      this.filterBy_.set('Role')
      
  }

}
