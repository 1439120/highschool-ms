import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import BreadcrumbModel from '../../models/BreadcrumbModel';
import { PersonalInformationSection } from '../../components/personal-information-section/personal-information-section';
import { UsersService } from '../../services/users-service';
import { DetailsHeader } from '../../components/details-header/details-header';

@Component({
  selector: 'app-students-details',
  imports: [FormsModule, CommonModule, Breadcrumb, PersonalInformationSection, DetailsHeader],
  templateUrl: './students-details.html',
  styleUrl: './students-details.scss',
  providers: [DatePipe, DetailsHeader]
})
export class StudentsDetails {
  selectedTerm: string = 'term_two';
  studentId = signal<string | null>(null);

  student = computed(()=>{
    const currentStudent = this.service.currentUser();
    if(currentStudent && this.studentId() == currentStudent.id.toString())
    return currentStudent
    else return {
        id: 0,
        name: '',
        surname: '',
        phone: '',
        email: '',
        role: '',
        address: '',
        dateOfBirth: null,
        dateJoined: null,
        type: 'teacher'
      }
  })
  breadCrumb!: BreadcrumbModel[];
  subjects = signal([
        {
          name: 'maths',
          term_one: 70,
          term_two: 60,
          term_three: 0,
          term_four: 0,
        },
        {
          name: 'physics',
          term_one: 70,
          term_two: 60,
          term_three: 0,
          term_four: 0,
        },
        {
          name: 'life_sciences',
          term_one: 70,
          term_two: 60,
          term_three: 0,
          term_four: 0,
        },
        {
          name: 'english fal',
          term_one: 70,
          term_two: 60,
          term_three: 0,
          term_four: 0,
        }
      ])
  class_room = signal({
    grade: 11,
    class: 'Grade 11 C',
    average: 92,
    current_term: 'term_two',
  })
  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private service: UsersService
  ) {
    this.route.params.subscribe(params => {
      this.studentId.set(params['id']);
    });
    effect(()=>{
      this.breadCrumb  = [{name: 'Students', url:'/students'},{name: `${this.student().name} ${this.student().surname}`, url:''}]
    })
  }

  getTermDisplayName(term: string): string {
    const termMap: {[key: string]: string} = {
      'term_one': 'Term 1',
      'term_two': 'Term 2',
      'term_three': 'Term 3',
      'term_four': 'Term 4'
    };
    return termMap[term] || term;
  }

  onTermChange() {
    console.log('Term changed to:', this.selectedTerm);
    // You can add logic here to refresh data based on selected term
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'longDate') || '';
  }

  calculateAge(birthDate: Date): number {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }
  getAcademicYear(): string {
    const currentYear = new Date().getFullYear();
    return `${currentYear - 1}/${currentYear}`;
  }

  getTermAverage(): number {
    if (!this.subjects()?.length) return 0;
    const subjects = this.subjects();
    const total = subjects.reduce((sum: number, subject: any) => {
      return sum + (subject[this.selectedTerm] || 0);
    }, 0);
    return Math.round(total / subjects.length);
  }

  getScoreClass(score: number): string {
    if (score >= 80) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'average';
    return 'poor';
  }

  getTerms(): string[] {
    return ['term_one', 'term_two', 'term_three', 'term_four'];
  }

   getSubjectTermScore(subjectName: string, term: string): number {
    if (!this.subjects().length) return 0;
    const subject = this.subjects().find((s: any) => 
      s.name.toLowerCase() === subjectName.toLowerCase().replace(' ', '_')
    );
    return 2
    // return subject?.[term] || 0;
  }

  getSubjectsArray(): any[] {
    if (!this.subjects()) return [];
    return this.subjects().map((subject: any) => ({
      name: this.formatSubjectName(subject.name),
      score: subject[this.selectedTerm] || 0
    }));
  }

  isTermCompleted(term: string): boolean {
    return this.getTermAverageByTerm(term) > 0;
  }

  formatSubjectName(subject: string): string {
    return subject
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getTermAverageByTerm(term: string): number {
    if (!this.subjects().length) return 0;
    const subjects = this.subjects();
    const total = subjects.reduce((sum: number, subject: any) => {
      return sum + (subject[term] || 0);
    }, 0);
    return Math.round(total / subjects.length);
  }

  getTermStatus(term: string): string {
    if (term === this.selectedTerm) return 'in-progress';
    if (this.getTermAverageByTerm(term) > 0) return 'completed';
    return 'pending';
  }


}
