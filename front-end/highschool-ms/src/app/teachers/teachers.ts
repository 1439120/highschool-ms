import { Component, computed, effect, inject, OnDestroy } from '@angular/core';
import { Datatable } from '../components/datatable/datatable';
import { User } from '../models/User';
import { Datamodel } from '../models/Datamodel';
import { UsersService } from '../services/users-service';

@Component({
  selector: 'app-teachers',
  imports: [ Datatable ],
  templateUrl: './teachers.html',
  styleUrl: './teachers.scss',
})

export class Teachers extends Datamodel<User>{

  constructor(private service: UsersService){
    super();
    this.title_.set("Teachers");
    effect(()=>{
      this.records_.set(this.service.teachers());
      const uniqueRoles: string[] = [
        ...new Set(this.service.teachers().map(c => c.role))
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
