import { Component, signal } from '@angular/core';
import { Datatable } from '../datatable/datatable';
import Tableheader from '../../models/Tableheader';

@Component({
  selector: 'app-students-roster',
  imports: [Datatable],
  templateUrl: './students-roster.html',
  styleUrl: './students-roster.scss',
})
export class StudentsRoster {
  headers = signal<Tableheader[]>( [
      {
        'col': 'name', 'groupBy': true, displaName: 'Name'
      },
      {
        'col': 'phone', 'groupBy': false, displaName: 'Phone'
      },
      {
        'col': 'email', 'groupBy': true, displaName: 'Email'
      },
      {
        'col': 'role', 'groupBy': true, displaName: 'Role'
      },
      {
        'col': 'address', 'groupBy': true, displaName: 'Address'
      }])
}
