import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../../../components/breadcrumb/breadcrumb';
import BreadcrumbModel from '../../../models/BreadcrumbModel';
import { DetailsHeader } from '../../../components/details-header/details-header';
import Grades from '../../../models/Grades';
import { ClassroomInformationSection } from '../../../components/classroom-information-section/classroom-information-section';
import { ClassroomService } from '../../../services/classroom-service';
import { Classroom } from '../../../models/Classroom';
import { User } from '../../../models/User';
import { SubjectCard } from '../../../components/subject-card/subject-card';
import { GenericSelectModal } from '../../../components/generic-select-modal/generic-select-modal';
import { SubjectsService } from '../../../services/subjects-service';
import { SubjectsModel } from '../../../models/SubjectsModel';
import { ClassSubjectsService } from '../../../services/class-subjects-service';
import { StudentsRoster } from '../../../components/students-roster/students-roster';


@Component({
  selector: 'app-class-details',
  imports: [
    FormsModule, Breadcrumb, DetailsHeader, ClassroomInformationSection,
    SubjectCard, GenericSelectModal, StudentsRoster
  ],
  templateUrl: './class-details.html',
  styleUrl: './class-details.scss',
  providers: [DatePipe]
})
export class ClassDetails {
 studentSearchQuery: string = '';
  filteredStudents: string[] = [];
  breadCrumb = signal<BreadcrumbModel[]>([]);
  showModal = signal<boolean>(false)

  classroomId = signal<string>("")
  classroom = computed(()=>{
    return this.service.currentClassroom();
  })
  classTeacher = computed(()=>{
    let classr = this.classroom()
    if(classr){
      let classTeacher = classr.classTeacher;
      return classTeacher.name + ' ' + classTeacher.surname;
    }
    return ""
  })
  classSubjectsService = inject(ClassSubjectsService)
  constructor(
    private route: ActivatedRoute, 
    private service: ClassroomService,
    private subjectService: SubjectsService,
  ) {
    this.route.params.subscribe(params => {
      const classId = params['id'];
      this.classroomId.set(classId);
      if(classId){
        this.service.getClassroomById(classId);
        this.classSubjectsService.loadClassSubjects(classId);
      }
    });
    effect(()=>{
      console.log("running....")
      this.breadCrumb.set([{name: 'Classes', url:'/classes'},{name: `${this.classroom().name}`, url:''}])
    })
    
  }

  getSubjectSubtitle(subject: SubjectsModel){
    return subject.grade?.name || '';
  }

  getOccupancyPercentage(): number {
    if (!this.classroom().maximumOccupants || !this.classroom().registeredStudents) return 0;
    return Math.round((this.classroom().registeredStudents / this.classroom().maximumOccupants) * 100);
  }

  getAcademicYear(): string {
    const currentYear = new Date().getFullYear();
    return `${currentYear}`;
  }

  filterStudents() {
    // if (!this.studentSearchQuery.trim()) {
    //   this.filteredStudents = [...this.classData.regsitered_students];
    //   return;
    // }
    
    // const query = this.studentSearchQuery.toLowerCase();
    // this.filteredStudents = this.classData.regsitered_students.filter((student: string) =>
    //   student.toLowerCase().includes(query)
    // );
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

  async loadSubjects(): Promise<SubjectsModel[]>{
    console.log("grade", this.classroom().grade.id)
    return await this.subjectService.loadSubjects(this.classroom().grade.id).toPromise() ?? [];
  }
  searchSubjects(subject: SubjectsModel, searchTerm: string): boolean{
    // console.log(`${subject.name} - ${searchTerm}`)
    if(subject.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) return true;
    return false;
  }

  onSubjectedSelected(subject: SubjectsModel) {
        console.log('Selected Subject:', subject);
        this.classSubjectsService.assignSubject(this.classroomId(), subject)
        this.showModal.set(false);
    }
  
  unAssignSubject(subjectId: number){
    if(subjectId > 0){
      this.classSubjectsService.unAssignSubject(this.classroomId(), subjectId)
    }
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
    // if (!this.classData?.regsitered_students?.length) return 'N/A';
    // const randomIndex = Math.floor(Math.random() * this.classData.regsitered_students.length);
    // return this.classData.regsitered_students[randomIndex].split(' ')[0];
    return 'N/A';
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
    // return this.classData.subjects_offered.slice(0, count).map((subject: string) => ({
    //   name: this.formatSubjectName(subject),
    //   score: this.getRandomScore(70, 95)
    // }));
    return []
  }

  getTopStudentsCount(): number {
    const total = this.classroom().registeredStudents || 0;
    return Math.ceil(total * 0.1); // Top 10%
  }

  getSupportNeededCount(): number {
    const total = this.classroom().registeredStudents || 0;
    return Math.ceil(total * 0.15); // 15% need support
  }
}
