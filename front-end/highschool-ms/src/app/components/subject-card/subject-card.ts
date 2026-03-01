import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subject-card',
  imports: [],
  templateUrl: './subject-card.html',
  styleUrl: './subject-card.scss',
})
export class SubjectCard {
  subjectName = input<string>()
  addSubject = input<boolean>(false)

  getSubjectIcon(subject: string | undefined): string {
    const icons: {[key: string]: string} = {
      'english': '📝',
      'maths': '🧮',
      'natural sciences': '🔬',
      'social sciences': '🌍',
      'life orientation': '🧠'
    };
    return icons[subject?.toLowerCase() || 0] || '📘';
  }

  formatSubjectName(subject: string | undefined): string {
    return subject
      ?.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || '';
  }

  getTeacherForSubject(subject: string | undefined): string {
    const teachers: {[key: string]: string} = {
      'english': 'Mrs. Johnson',
      'maths': 'Mr. Smith',
      'natural sciences': 'Dr. Patel',
      'social sciences': 'Ms. Garcia',
      'life orientation': 'Mr. Davis'
    };
    return teachers[subject?.toLowerCase() || 0] || 'Teacher TBD';
  }

  removeSubject(){
    
  }
}
