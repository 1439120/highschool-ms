import { Component, input } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-details-header',
  imports: [],
  templateUrl: './details-header.html',
  styleUrl: './details-header.scss',
})
export class DetailsHeader {
  user = input<User>();

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
