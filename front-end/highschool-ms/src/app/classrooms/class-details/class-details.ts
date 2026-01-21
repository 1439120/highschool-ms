import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

/**
 * ** Over the ovierview boards
 * Add capacity - should be editable by admin
 * Add current period
 * ** subjects offered
 * make them scrollable from
 * must have an add button to add a new subject
 */

@Component({
  selector: 'app-class-details',
  imports: [FormsModule],
  templateUrl: './class-details.html',
  styleUrl: './class-details.scss',
  providers: [DatePipe]
})
export class ClassDetails {
 studentSearchQuery: string = '';
  filteredStudents: string[] = [];
  
  classData: any = null;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const classId = params['id'];
      this.loadClassData(classId);
    });
  }

  loadClassData(classId: string) {
    // In real app, you would fetch from API
    this.classData = {
      id: 1,
      name: 'Grade 8A',
      grade: 8,
      class_teacher: 'Alice Mbatha',
      maximum_occupants: 60,
      regsitered_students: [
        'Bheki Cele',
        'Musa Maziya',
        'Freddie Khumalo',
        'Thembi Ntimba',
        'Silva Mlambo',
        'Lindiwe Zulu',
        'Thabo Mbeki',
        'Nelson Mandela',
        'Winnie Madikizela',
        'Desmond Tutu'
      ],
      subjects_offered: [
        'english',
        'maths',
        'natural sciences',
        'social sciences',
        'life orientation'
      ]
    };
    
    this.filteredStudents = [...this.classData.regsitered_students];
  }

  getOccupancyPercentage(): number {
    if (!this.classData?.maximum_occupants || !this.classData?.regsitered_students) return 0;
    return Math.round((this.classData.regsitered_students.length / this.classData.maximum_occupants) * 100);
  }

  getAcademicYear(): string {
    const currentYear = new Date().getFullYear();
    return `${currentYear}`;
  }

  filterStudents() {
    if (!this.studentSearchQuery.trim()) {
      this.filteredStudents = [...this.classData.regsitered_students];
      return;
    }
    
    const query = this.studentSearchQuery.toLowerCase();
    this.filteredStudents = this.classData.regsitered_students.filter((student: string) =>
      student.toLowerCase().includes(query)
    );
  }

  sortStudents(field: string) {
    if (field === 'name') {
      this.filteredStudents.sort((a, b) => a.localeCompare(b));
    }
  }

  getStudentInitials(student: string): string {
    const names = student.split(' ');
    if (names.length >= 2) {
      return names[0].charAt(0) + names[1].charAt(0);
    }
    return names[0].charAt(0);
  }

  generateStudentEmail(student: string): string {
    const name = student.toLowerCase().replace(' ', '.');
    return `${name}@school.edu`;
  }

  generateStudentId(student: string): string {
    // Generate a consistent ID based on student name
    let hash = 0;
    for (let i = 0; i < student.length; i++) {
      hash = student.charCodeAt(i) + ((hash << 5) - hash);
    }
    return 'STU' + Math.abs(hash).toString().substring(0, 5);
  }

  getRandomScore(min: number = 60, max: number = 95): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomAttendance(): number {
    return Math.floor(Math.random() * (100 - 80 + 1)) + 80;
  }

  getAttendanceClass(): string {
    const attendance = this.getRandomAttendance();
    if (attendance >= 95) return 'excellent';
    if (attendance >= 90) return 'good';
    if (attendance >= 85) return 'average';
    return 'poor';
  }

  getSubjectIcon(subject: string): string {
    const icons: {[key: string]: string} = {
      'english': '📝',
      'maths': '🧮',
      'natural sciences': '🔬',
      'social sciences': '🌍',
      'life orientation': '🧠'
    };
    return icons[subject.toLowerCase()] || '📘';
  }

  formatSubjectName(subject: string): string {
    return subject
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getTeacherForSubject(subject: string): string {
    const teachers: {[key: string]: string} = {
      'english': 'Mrs. Johnson',
      'maths': 'Mr. Smith',
      'natural sciences': 'Dr. Patel',
      'social sciences': 'Ms. Garcia',
      'life orientation': 'Mr. Davis'
    };
    return teachers[subject.toLowerCase()] || 'Teacher TBD';
  }

  getRandomStudent(): string {
    if (!this.classData?.regsitered_students?.length) return 'N/A';
    const randomIndex = Math.floor(Math.random() * this.classData.regsitered_students.length);
    return this.classData.regsitered_students[randomIndex].split(' ')[0];
  }

  getDays(): string[] {
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  }

  getTimeSlots(): string[] {
    return ['7:30', '8:30', '9:30', '10:30', '11:30', '12:30', '13:30', '14:30'];
  }

  getScheduleClass(day: string, time: string): string {
    // Simple scheduling logic - in real app this would come from backend
    const schedule: {[key: string]: {[key: string]: string}} = {
      'Mon': {
        '7:30': 'maths',
        '8:30': 'english',
        '9:30': 'natural sciences',
        '10:30': 'social sciences',
        '11:30': 'life orientation',
        '12:30': '',
        '13:30': 'maths',
        '14:30': ''
      }
      // Add other days...
    };
    
    const subject = schedule[day]?.[time];
    return subject || '';
  }

  getScheduledSubject(day: string, time: string): string {
    return this.getScheduleClass(day, time) || 'Free';
  }

  getScheduledTeacher(day: string, time: string): string {
    const subject = this.getScheduleClass(day, time);
    return this.getTeacherForSubject(subject) || '';
  }

  getClassAverage(): number {
    // Calculate average of all students' scores
    return 82; // Placeholder - in real app, calculate from student data
  }

  getGradeLetter(score: number): string {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  }

  getTopSubjects(count: number): any[] {
    return this.classData.subjects_offered.slice(0, count).map((subject: string) => ({
      name: this.formatSubjectName(subject),
      score: this.getRandomScore(70, 95)
    }));
  }

  getTopStudentsCount(): number {
    const total = this.classData?.regsitered_students?.length || 0;
    return Math.ceil(total * 0.1); // Top 10%
  }

  getSupportNeededCount(): number {
    const total = this.classData?.regsitered_students?.length || 0;
    return Math.ceil(total * 0.15); // 15% need support
  }
}
