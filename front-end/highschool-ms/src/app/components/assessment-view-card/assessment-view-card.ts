import { Component, input } from '@angular/core';
import { Assessment } from '../../models/Assessment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-assessment-view-card',
  imports: [DatePipe],
  templateUrl: './assessment-view-card.html',
  styleUrl: './assessment-view-card.scss',
})
export class AssessmentViewCard {
    assessment = input<Assessment>()

    getAssessmentIcon(type?: Assessment['type']): string {
      if(!type) return '📊'
      const icons: {[key: string]: string} = {
        'quiz': '❓',
        'test': '📝',
        'exam': '📋',
        'assignment': '📚',
        'project': '🎨',
        'presentation': '🎤'
      };
    return icons[type] || '📊';
  }
}
