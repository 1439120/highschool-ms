import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  menuOptions = signal([
    {title: 'Dashboard', link:'/', icon:'🏠'},
    {title: 'Subjects', link:'/subjects', icon:'📖'},
    {title: 'Classes', link:'/classes', icon:'📚'},
    {title: 'Students', link:'/students', icon:'🎒'},
    {title: 'Teachers', link:'/teachers', icon:'👨‍🏫'},
    {title: 'Configuration', link:'/settings', icon:'⚙️'},
  ])
}
