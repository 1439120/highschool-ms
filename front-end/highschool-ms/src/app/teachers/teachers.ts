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

  constructor( private teacherService: UsersService){
    super();
    this.teacherService.loadTeachers();

    this.title_.set("Teachers");
    // react to signal changes
    effect(()=>{
      this.records_.set(this.teacherService.teachers());
      console.log(this.records_());
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
