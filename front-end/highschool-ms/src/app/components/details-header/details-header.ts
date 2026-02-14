import { Component, computed, input } from '@angular/core';
import { User } from '../../models/User';
import { Classroom } from '../../models/Classroom';
import Grades from '../../models/Grades';

@Component({
  selector: 'app-details-header',
  imports: [],
  templateUrl: './details-header.html',
  styleUrl: './details-header.scss',
})
export class DetailsHeader {
  user = input<User>();
  displayName = input<string>();
  recordId = input();
  role = input<string>();
  classroom = input<string>();
  averageScore = input<number>();
  grade = input<Grades>();
  classTeacher = input<string>()
  occupancy = input<number>()

  initals = computed(()=>{
    let temp = this.displayName()?.split(' ')
    if(temp?.length && temp?.length == 1) return [temp[0][0]]
    if(temp?.length && temp.length>= 2) return [temp[0][0], temp[1][0]]
    return []
  })
  getRoleClass(role: string | undefined): string {
    const roleMap: {[key: string]: string} = {
      'Admin': 'admin',
      'User': 'user',
      'Editor': 'editor',
      'Teacher': 'user'
    };
    if(!role) return "user";
    return roleMap[role] || 'user';
  }
}
