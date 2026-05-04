import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Breadcrumb } from '../../../components/breadcrumb/breadcrumb';
import BreadcrumbModel from '../../../models/BreadcrumbModel';
import SubjectPlanModel from '../../../models/SubjectPlanModel';
import { SubjectsModel } from '../../../models/SubjectsModel';
import { SubjectPlanService } from '../../../services/subject-plan-service';
import { SubjectTopicCard } from '../../../components/subject-topic-card/subject-topic-card';
import { TermOverviewCard } from '../../../components/term-overview-card/term-overview-card';
import { Topic } from '../../../models/Topic';
import { SubjectTopicService } from '../../../services/subject-topic-service';
import Grades from '../../../models/Grades';
import { SubjectsService } from '../../../services/subjects-service';
import {  SearchItem } from '../../../components/search-field-component/search-field-component';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditSubjectplanModal } from '../../../components/edit-subjectplan-modal/edit-subjectplan-modal';

@Component({
  selector: 'app-subject-plan-details',
  imports: [
    CommonModule, FormsModule, Breadcrumb, RouterLink, DatePipe,
    SubjectTopicCard, TermOverviewCard, ReactiveFormsModule
  ],
  templateUrl: './subject-plan-details.html',
  styleUrl: './subject-plan-details.scss',
  providers: [DatePipe]
})
export class SubjectPlanDetails {
  // injections
  private fb = inject(FormBuilder);
  // states
  breadCrumb = signal<BreadcrumbModel[]>([]);
  currentYear: number = new Date().getFullYear();
  recordId = signal<string>("");
  subjectPlan = signal<SubjectPlanModel | null>(null);
  subjectTopics = signal<Topic[]>([]);
  editMode = signal<boolean>(true)

  // computed
  creatorFullname = computed(()=>(
    `${this.subjectPlan()?.createdBy.name} ${this.subjectPlan()?.createdBy.surname}`
  ))
  overallProgress = computed(() => {
    let totalCompleted = 0;
    let totalLessons = 0;
    
    for (let topic of this.subjectTopics()) {
      for (let lesson of topic.lessons) {
        totalCompleted += lesson.status === 'completed' ? 1 : 0;
      }
      totalLessons += topic.lessons.length;
    }
    
    // Don't set signals inside computed - just calculate and return
    return totalLessons === 0 ? 0 : Math.ceil((totalCompleted / totalLessons) * 100);
  });
  totalLessons = computed(() => {
    return this.subjectTopics().reduce((sum, topic) => sum + topic.lessons.length, 0);
  });
  completedLessons = computed(() => {
    return this.subjectTopics().reduce((sum, topic) => 
      sum + topic.lessons.filter(lesson => lesson.status === 'completed').length, 0
    );
  });
  completedTopics = computed(()=>{
    let totalCompleted = 0;
    for(let topic of this.subjectTopics()){
      let non_completed = topic.lessons.filter(x => x.status != 'completed')
      totalCompleted += non_completed.length == 0 ? 1 : 0
    }
    return totalCompleted
  })
    // Computed properties
  inProgressTopics = computed(()=>{
    return this.subjectTopics().length - this.completedTopics() 
  });
    
  editForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    subject: ['', Validators.required],
    grade: ['', Validators.required],
    year: ['', [Validators.required, Validators.min(2000), Validators.max(2030)]]
  });
  
  // View state
  activeTerm = signal<number>(1);
  viewType: 'topics' | 'weeks' | 'assessments' = 'topics';
  
  // Mock data for dropdowns
  subjects: SubjectsModel[] = [
    {
      id: 1, name: 'Mathematics',
    },
    {
      id: 2, name: 'English', 
    },
    {
      id: 3, name: 'Natural Sciences',
    },
    {
      id: 4, name: 'Social Sciences', 
    },
    {
      id: 5, name: 'Life Orientation', 
    }
  ];

  // Terms data
  terms = [
    { id: 1, name: 'Term 1', coverage: 85, completedTopics: 17, totalTopics: 20 },
    { id: 2, name: 'Term 2', coverage: 62, completedTopics: 13, totalTopics: 21 },
    { id: 3, name: 'Term 3', coverage: 45, completedTopics: 9, totalTopics: 20 },
    { id: 4, name: 'Term 4', coverage: 20, completedTopics: 4, totalTopics: 20 }
  ];
  
  grades = signal<Grades[]>([
    { id: 1, name: '8', gradeNumber: 8 },
    { id: 2, name: '9', gradeNumber: 9 },
    { id: 3, name: '10', gradeNumber: 10 },
    { id: 4, name: '11', gradeNumber: 11 },
    { id: 5, name: '12', gradeNumber: 12 }
  ]);

  years = signal<number[]>([
    2023, 2024, 2025, 2026, 2027
  ]);

  // // Topics data
  // topics = [
  //   {
  //     id: 1,
  //     termId: 1,
  //     name: 'Algebraic Expressions',
  //     startWeek: 1,
  //     endWeek: 3,
  //     progress: 100,
  //     objectives: [
  //       'Simplify algebraic expressions',
  //       'Expand and factorize expressions',
  //       'Solve linear equations'
  //     ],
  //     lessons: [
  //       { id: 1, name: 'Introduction to Variables', duration: 45, status: 'completed' },
  //       { id: 2, name: 'Simplifying Expressions', duration: 45, status: 'completed' },
  //       { id: 3, name: 'Solving Equations', duration: 45, status: 'completed' },
  //       { id: 4, name: 'Word Problems', duration: 45, status: 'completed' }
  //     ],
  //     resources: 4,
  //     assessments: 1,
  //     lessonPlanId: 101
  //   },
  //   {
  //     id: 2,
  //     termId: 1,
  //     name: 'Linear Equations',
  //     startWeek: 4,
  //     endWeek: 6,
  //     progress: 75,
  //     objectives: [
  //       'Solve one-step equations',
  //       'Solve two-step equations',
  //       'Solve equations with variables on both sides'
  //     ],
  //     lessons: [
  //       { id: 5, name: 'One-Step Equations', duration: 45, status: 'completed' },
  //       { id: 6, name: 'Two-Step Equations', duration: 45, status: 'completed' },
  //       { id: 7, name: 'Variables on Both Sides', duration: 45, status: 'in-progress' },
  //       { id: 8, name: 'Equation Word Problems', duration: 45, status: 'pending' }
  //     ],
  //     resources: 3,
  //     assessments: 1,
  //     lessonPlanId: 102
  //   },
  //   {
  //     id: 3,
  //     termId: 1,
  //     name: 'Linear Graphs',
  //     startWeek: 7,
  //     endWeek: 9,
  //     progress: 40,
  //     objectives: [
  //       'Plot points on coordinate plane',
  //       'Draw linear graphs',
  //       'Find gradient and intercept'
  //     ],
  //     lessons: [
  //       { id: 9, name: 'Coordinate Plane', duration: 45, status: 'completed' },
  //       { id: 10, name: 'Plotting Linear Graphs', duration: 45, status: 'in-progress' },
  //       { id: 11, name: 'Gradient and Intercept', duration: 45, status: 'pending' },
  //       { id: 12, name: 'Real-world Applications', duration: 45, status: 'pending' }
  //     ],
  //     resources: 5,
  //     assessments: 2,
  //     lessonPlanId: 103
  //   },
  //   {
  //     id: 4,
  //     termId: 2,
  //     name: 'Geometry: Angles',
  //     startWeek: 1,
  //     endWeek: 3,
  //     progress: 90,
  //     objectives: [
  //       'Identify angle types',
  //       'Calculate missing angles',
  //       'Work with parallel lines'
  //     ],
  //     lessons: [
  //       { id: 13, name: 'Angle Basics', duration: 45, status: 'completed' },
  //       { id: 14, name: 'Complementary & Supplementary', duration: 45, status: 'completed' },
  //       { id: 15, name: 'Parallel Lines', duration: 45, status: 'completed' },
  //       { id: 16, name: 'Angle Problems', duration: 45, status: 'in-progress' }
  //     ],
  //     resources: 4,
  //     assessments: 1,
  //     lessonPlanId: 104
  //   }
  // ];

  // Assessments data
  assessments = [
    {
      id: 1,
      termId: 1,
      name: 'Algebra Quiz 1',
      type: 'quiz',
      date: new Date(2024, 1, 15),
      topic: 'Algebraic Expressions',
      duration: 30,
      weight: 15
    },
    {
      id: 2,
      termId: 1,
      name: 'Equations Test',
      type: 'test',
      date: new Date(2024, 2, 5),
      topic: 'Linear Equations',
      duration: 45,
      weight: 25
    },
    {
      id: 3,
      termId: 2,
      name: 'Geometry Assignment',
      type: 'assignment',
      date: new Date(2024, 4, 10),
      topic: 'Angles and Parallel Lines',
      duration: 60,
      weight: 20
    },
    {
      id: 4,
      termId: 3,
      name: 'Mid-Year Exam',
      type: 'exam',
      date: new Date(2024, 6, 15),
      topic: 'All Term 1-2 Topics',
      duration: 120,
      weight: 40
    }
  ];

  // Key dates
  keyDates = [
    { icon: '📝', title: 'Term 1 Test', date: new Date(2024, 2, 5), status: 'upcoming' },
    { icon: '📊', title: 'Progress Reports', date: new Date(2024, 2, 20), status: 'upcoming' },
    { icon: '🎓', title: 'Parent Meeting', date: new Date(2024, 2, 25), status: 'upcoming' },
    { icon: '📅', title: 'Term 1 Ends', date: new Date(2024, 2, 28), status: 'upcoming' }
  ];

  // Resource counts
  resourceCounts = {
    textbooks: 3,
    worksheets: 24,
    videos: 15,
    assessments: 8
  };

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private service: SubjectPlanService,
    private subjectTopicsService: SubjectTopicService,
    private subjectService: SubjectsService,
    private dialog: MatDialog
  ) {
    // this.service.
    this.route.params.subscribe(params => {
      const Id = params['id'];
      if(Id != 'edit'){
        this.recordId.set(Id);
        this.editMode.set(false);
        // get data from the service
        service
          .getSubjectPlanById(Id)
          .subscribe((data) => {
            // update the data
            this.subjectPlan.set(data)
            // update the breadcrumb
            this.breadCrumb.set([
              { name: 'Subject Plans', url: '/subject-plan' },
              { name: data?.name || 'New Subject Plan', url: '' }
            ]);
            console.log("This is the data loade: ", data)
          }
        )
      }

      this.editForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        subject: ['', Validators.required],
        grade: ['', Validators.required],
        year: ['', [Validators.required, Validators.min(2000), Validators.max(2030)]]
      });
    });

    effect(()=>{
      // get subject topics
      subjectTopicsService
        .getSubjectTopics(this.recordId())
        .subscribe({
          next: data => {
              console.log("The data has bee loaded successfully: ", data)
              this.subjectTopics.set(data)
            },
          error: err => {
            console.log("There was an error: ", err)
          }
      });
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const planId = params['id'];
      this.loadSubjectPlan(planId);
    });

    // this.calculateProgress();
  }

  loadSubjectPlan(planId: string) {
    if (planId === 'new') {
      // Initialize new subject plan
      // this.subjectPlan = {
      //   name: 'Annual Teaching Plan',
      //   subject: this.subjects[0],
      //   createdById: {
      //     id: 1, name: 'Alice Mbatha', email: 'a.mbatha@school.edu', role: 'teacher',
      //     surname: '',
      //     phone: '',
      //     address: '',
      //     dateOfBirth: null,
      //     dateJoined: null,
      //     type: '',
      //     title: ''
      //   },
      //   grade: this.grades[0],
      //   createdOn: new Date(),
      //   lastUpdatedOn: new Date(),
      //   year: this.currentYear
      // };
    } else {
      // Load existing subject plan
      // this.subjectPlan = {
      //   id: parseInt(planId),
      //   name: 'Grade 8 Mathematics Annual Plan',
      //   subject: this.subjects[0],
      //   createdById: {
      //     id: 1, name: 'Alice Mbatha',
      //     email: 'a.mbatha@school.edu', role: 'teacher',
      //     surname: '',
      //     phone: '',
      //     address: '',
      //     dateOfBirth: null,
      //     dateJoined: null,
      //     type: '',
      //     title: ''
      //   },
      //   grade: this.grades[0],
      //   createdOn: new Date(2024, 0, 15),
      //   lastUpdatedOn: new Date(),
      //   year: 2024
      // };
    }
  }

  // calculateProgress() {
  //   // Calculate total lessons
  //   this.totalLessons = this.subjectTopics().reduce((sum, topic) => sum + topic.lessons.length, 0);
    
  //   // Calculate completed lessons
  //   this.completedLessons = this.subjectTopics().reduce((sum, topic) => 
  //     sum + topic.lessons.filter(lesson => lesson.status === 'completed').length, 0
  //   );
    
  //   // Calculate overall progress
  //   this.overallProgress = Math.round((this.completedLessons / this.totalLessons) * 100);
    
  //   // Calculate topic status
  //   this.completedTopics = this.subjectTopics().filter(topic => topic.progress === 100).length;
  //   this.inProgressTopics = this.subjectTopics().filter(topic => topic.progress > 0 && topic.progress < 100).length;
  // }

  // Getters for active term
  getActiveTermName(): string {
    const term = this.terms.find(t => t.id === this.activeTerm());
    return term ? term.name : 'Term 1';
  }

  getActiveTermDates(): string {
    const dates = {
      1: 'Jan 15 - Mar 28, 2024',
      2: 'Apr 8 - Jun 21, 2024',
      3: 'Jul 8 - Sep 20, 2024',
      4: 'Sep 30 - Dec 6, 2024'
    };
    return dates[this.activeTerm() as keyof typeof dates] || 'TBD';
  }

  getActiveTermWeeks(): number {
    const weeks = { 1: 11, 2: 11, 3: 11, 4: 10 };
    return weeks[this.activeTerm() as keyof typeof weeks] || 10;
  }

  getActiveTermTopics(): number {
    return this.subjectTopics().filter(t => t.term === this.activeTerm()).length;
  }

  getActiveTermLessons(): number {
    return this.subjectTopics()
      .filter(t => t.term === this.activeTerm())
      .reduce((sum, topic) => sum + topic.lessons.length, 0);
  }

  getActiveTermAssessments(): number {
    return this.assessments.filter(a => a.termId === this.activeTerm()).length;
  }

  getWeeksByTerm(termId: number): any[] {
    // Generate weeks for the term
    const weeks = [];
    const totalWeeks = this.getActiveTermWeeks();
    
    for (let i = 1; i <= totalWeeks; i++) {
      const weekTopics = this.subjectTopics().filter(t => 
        t.term === termId && 
        t.startWeek <= i && 
        t.endWeek >= i
      );
      
      const weekLessons = weekTopics.flatMap(topic => 
        topic.lessons.map((lesson, index) => ({
          ...lesson,
          lessonNumber: `${topic.startWeek}.${index + 1}`,
          topic: topic.name
        }))
      ).slice(0, 5); // Limit to 5 lessons per week for display
      
      weeks.push({
        weekNumber: i,
        startDate: this.getWeekStartDate(termId, i),
        endDate: this.getWeekEndDate(termId, i),
        progress: Math.round(weekLessons.filter(l => l.status === 'completed').length / weekLessons.length * 100) || 0,
        lessons: weekLessons
      });
    }
    
    return weeks;
  }

  getAssessmentsByTerm(termId: number): any[] {
    return this.assessments.filter(a => a.termId === termId);
  }

  // Helper methods for dates
  getWeekStartDate(termId: number, weekNumber: number): Date {
    const termStartDates = {
      1: new Date(2024, 0, 15),
      2: new Date(2024, 3, 8),
      3: new Date(2024, 6, 8),
      4: new Date(2024, 8, 30)
    };
    
    const startDate = termStartDates[termId as keyof typeof termStartDates];
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekNumber - 1) * 7);
    return weekStart;
  }

  getWeekEndDate(termId: number, weekNumber: number): Date {
    const startDate = this.getWeekStartDate(termId, weekNumber);
    const weekEnd = new Date(startDate);
    weekEnd.setDate(startDate.getDate() + 4); // Friday
    return weekEnd;
  }

  getTotalLessons(): number {
    return this.totalLessons();
  }

  // UI Actions
  setActiveTerm(termId: number) {
    this.activeTerm.set(termId);
  }

  addTopic() {
    console.log('Add topic');
    // Open modal or navigate to topic creation
  }

  addLesson() {
    console.log('Add lesson');
    // Open modal or navigate to lesson creation
  }

  scheduleAssessment() {
    console.log('Schedule assessment');
    // Open modal for scheduling assessment
  }

  editPlan(plan: any) {
  //   console.log('=== Edit Plan Debug ===');
  //   console.log('1. Subject plan data:', this.subjectPlan());
  //   console.log('2. Subject plan name:', this.subjectPlan()?.name);
  //   console.log('3. Subject plan subject id:', this.subjectPlan()?.subject?.id);
  //   console.log('4. Subject plan grade id:', this.subjectPlan()?.grade?.id);
  //   console.log('5. Subject plan year:', this.subjectPlan()?.year);
    
  //   this.initEditForm();
  //   console.log('6. Form after patch:', this.editForm.value);
  //   console.log('7. Form valid:', this.editForm.valid);
  //   console.log('8. Form dirty:', this.editForm.dirty);

  // this.editMode.set(true);

    const dialogRef = this.dialog.open(EditSubjectplanModal, {
      width: '1400px',
      maxWidth: '90vw',
      data: plan // This flows into the @Inject(MAT_DIALOG_DATA) in your modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Update the database with:', result);
      }
    });

  }

  exportPlan() {
    console.log('Export plan');
    // Generate PDF/Excel export
  }

  // Icon helpers
  getSubjectIcon(subjectName: string | undefined): string {
    const icons: {[key: string]: string} = {
      'mathematics': '🧮',
      'english': '📝',
      'natural sciences': '🔬',
      'social sciences': '🌍',
      'life orientation': '🧠'
    };
    if(!subjectName) return "";
    return icons[subjectName?.toLowerCase()] || '📘';
  }

  getSubjectInitials(subjectName: string | undefined): string {
    if (!subjectName) return 'SP';
    return subjectName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  getAssessmentIcon(type: string): string {
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

  initEditForm() {
    const plan = this.subjectPlan();
    this.editForm.patchValue({
      name: plan?.name || '',
      subject: plan?.subject?.name || '',
      grade: plan?.grade?.id.toString() || '',
      year: plan?.year?.toString() || '2025'
    });
  }

  cancelEdit() {
    this.editMode.set(false);
    // Reset form to original values
    this.initEditForm();
  }

  saveEdit() {

    
  }

  // Helper methods for the edit form
  getSubjectNameById(subjectId: number): string {
    const subject = this.subjects.find(s => s.id === subjectId);
    return subject ? subject.name : '';
  }

  getGradeNameById(gradeId: number): string {
    const grade = this.grades().find(g => g.id === gradeId);
    return grade ? `Grade ${grade.gradeNumber}` : '';
  }

  async loadSubjects(): Promise<SubjectsModel[]>{
    return await this.subjectService.loadSubjects(1).toPromise() ?? [];
  }

  assignSubjectToPlan(plan: SubjectsModel){

  }

  // Handle subject selection
  onSubjectSelected(subject: SearchItem) {
      console.log('Subject selected:', subject);
  }

  // Handle add new subject
  onAddNewSubject(searchTerm: string) {
      console.log('Add new subject:', searchTerm);
      // Open modal to create new subject
  }

}
