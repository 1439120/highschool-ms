import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './compoenents/dashboard/dashboard';
import { Sidebar } from './compoenents/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('highschool-ms');
}
