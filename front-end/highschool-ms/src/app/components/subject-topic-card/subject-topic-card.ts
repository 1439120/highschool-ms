import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subject-topic-card',
  imports: [CommonModule],
  templateUrl: './subject-topic-card.html',
  styleUrl: './subject-topic-card.scss',
})
export class SubjectTopicCard {
  topics = input<any[]>([])
  termNumber = input<number>()

  getTopicIcon(topicName: string): string {
    const icons: {[key: string]: string} = {
      'algebra': '🔢',
      'geometry': '📐',
      'equations': '⚖️',
      'graphs': '📈',
      'fractions': '🥧',
      'statistics': '📊',
      'probability': '🎲',
      'trigonometry': '📐',
      'calculus': '∫'
    };
    
    const lowercaseName = topicName.toLowerCase();
    for (const [key, icon] of Object.entries(icons)) {
      if (lowercaseName.includes(key)) {
        return icon;
      }
    }
    return '📋';
  }

  // Filter methods
  getTopicsByTerm(): any[] {
    return this.topics().filter(topic => topic.termId === this.termNumber());
    // return [];
  }
}
