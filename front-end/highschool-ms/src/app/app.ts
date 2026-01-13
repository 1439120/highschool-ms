import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './compoenents/sidebar/sidebar';
import { Dashboard } from './dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('highschool-ms');
}
