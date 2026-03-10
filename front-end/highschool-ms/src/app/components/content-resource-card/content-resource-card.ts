import { Component } from '@angular/core';
import ContentResourceModel from '../../models/ContentResourceModel';

@Component({
  selector: 'app-content-resource-card',
  imports: [],
  templateUrl: './content-resource-card.html',
  styleUrl: './content-resource-card.scss',
})
export class ContentResourceCard {
  resources:ContentResourceModel[] = [
    {
      icon: '📖',
      name: 'Textbooks',
      total: 12,
      status: 'books'
    },
    {
      icon: '📝',
      name: 'Assignments',
      total: 12,
      status: 'pending'
    },
    {
      icon: '🎬',
      name: 'Videos',
      total: 15,
      status: 'videos'
    },
    {
      icon: '📋',
      name: 'Lesson Plans',
      total: 20,
      status: 'plans'
    }
  ]
}
