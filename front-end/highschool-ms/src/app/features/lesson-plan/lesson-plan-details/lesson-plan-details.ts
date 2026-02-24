import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Breadcrumb } from '../../../components/breadcrumb/breadcrumb';
import BreadcrumbModel from '../../../models/BreadcrumbModel';
import LessonPlanModel from '../../../models/LessonPlanModel';
import { SubjectsModel } from '../../../models/SubjectsModel';
import { User } from '../../../models/User';
import Grades from '../../../models/Grades';

@Component({
  selector: 'app-lesson-plan-details',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, RouterLink, DatePipe],
  templateUrl: './lesson-plan-details.html',
  styleUrl: './lesson-plan-details.scss',
  providers: [DatePipe]
})
export class LessonPlanDetails implements OnInit {
  breadCrumb!: BreadcrumbModel[];
  lessonPlan: Partial<LessonPlanModel> = {};
  
  // Form state
  lessonDuration: number = 45;
  lessonDate: string = new Date().toISOString().split('T')[0];
  today: string = new Date().toISOString().split('T')[0];
  
  // Dynamic form arrays
  learningObjectives: string[] = [];
  newObjective: string = '';
  
  materials: any[] = [
    { name: 'Textbook Chapter 5', type: 'Textbook' },
    { name: 'Worksheet: Algebra Practice', type: 'Handout' },
    { name: 'Interactive Whiteboard Presentation', type: 'Presentation' }
  ];
  
  activities: any[] = [
    {
      startTime: '08:30',
      description: 'Review previous lesson and introduce new topic',
      duration: 10,
      type: 'intro'
    },
    {
      startTime: '08:40',
      description: 'Direct instruction on key concepts',
      duration: 15,
      type: 'direct'
    },
    {
      startTime: '08:55',
      description: 'Guided practice with examples',
      duration: 15,
      type: 'guided'
    },
    {
      startTime: '09:10',
      description: 'Independent practice problems',
      duration: 15,
      type: 'independent'
    },
    {
      startTime: '09:25',
      description: 'Formative assessment and closing',
      duration: 10,
      type: 'closing'
    }
  ];
  
  assessments: any[] = [
    {
      name: 'Exit Ticket',
      description: '3-5 minute quick check for understanding',
      type: 'formative',
      weight: 10,
      dueDate: new Date()
    },
    {
      name: 'Practice Problems',
      description: 'Homework assignment for additional practice',
      type: 'homework',
      weight: 15,
      dueDate: new Date(Date.now() + 86400000)
    }
  ];
  
  extensions: string[] = [
    'Create advanced problems for early finishers',
    'Research project extension: Real-world applications',
    'Peer tutoring opportunity'
  ];
  
  supportStrategies: string[] = [
    'Provide step-by-step visual guides',
    'Small group instruction for struggling students',
    'Use manipulatives and hands-on examples',
    'Modified worksheets with reduced problems'
  ];
  
  // Mock data for dropdowns
  subjects: SubjectsModel[] = [
    {
      id: 1, name: 'Mathematics', code: 'MATH', department: 'STEM',
      grade: 0,
      chapters: 0,
      tests: 0,
      assignments: 0,
      exams: 0
    },
    {
      id: 2, name: 'English', code: 'ENG', department: 'Languages',
      grade: 0,
      chapters: 0,
      tests: 0,
      assignments: 0,
      exams: 0
    },
    {
      id: 3, name: 'Natural Sciences', code: 'SCI', department: 'STEM',
      grade: 0,
      chapters: 0,
      tests: 0,
      assignments: 0,
      exams: 0
    },
    {
      id: 4, name: 'Social Sciences', code: 'SOC', department: 'Humanities',
      grade: 0,
      chapters: 0,
      tests: 0,
      assignments: 0,
      exams: 0
    },
    {
      id: 5, name: 'Life Orientation', code: 'LO', department: 'Life Skills',
      grade: 0,
      chapters: 0,
      tests: 0,
      assignments: 0,
      exams: 0
    }
  ];
  
  grades: Grades[] = [
    { id: 1, name: '8', gradeNumber: 8 },
    { id: 2, name: '9', gradeNumber: 9 },
    { id: 3, name: '10', gradeNumber: 10 },
    { id: 4, name: '11', gradeNumber: 11 },
    { id: 5, name: '12', gradeNumber: 12 }
  ];
  
  teachers: User[] = [
    {
      id: 1, name: 'Alice Mbatha', email: 'a.mbatha@school.edu', role: 'teacher',
      surname: '',
      phone: '',
      address: '',
      dateOfBirth: null,
      dateJoined: null,
      type: ''
    },
    {
      id: 2, name: 'John Smith', email: 'j.smith@school.edu', role: 'teacher',
      surname: '',
      phone: '',
      address: '',
      dateOfBirth: null,
      dateJoined: null,
      type: ''
    },
    {
      id: 3, name: 'Priya Patel', email: 'p.patel@school.edu', role: 'teacher',
      surname: '',
      phone: '',
      address: '',
      dateOfBirth: null,
      dateJoined: null,
      type: ''
    },
    {
      id: 4, name: 'Maria Garcia', email: 'm.garcia@school.edu', role: 'teacher',
      surname: '',
      phone: '',
      address: '',
      dateOfBirth: null,
      dateJoined: null,
      type: ''
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const lessonId = params['id'];
      this.loadLessonPlan(lessonId);
    });

    this.breadCrumb = [
      { name: 'Lesson Plans', url: '/lesson-plan' },
      { name: this.lessonPlan?.name || 'New Lesson Plan', url: '' }
    ];
  }

  loadLessonPlan(lessonId: string) {
    if (lessonId === 'new') {
      // Initialize new lesson plan
      this.lessonPlan = {
        name: '',
        lastUpdatedOn: new Date(),
        status: 'draft'
      };
      this.learningObjectives = [
        'Understand the concept of variables',
        'Solve simple linear equations',
        'Apply algebraic thinking to word problems'
      ];
    } else {
      // Load existing lesson plan
      this.lessonPlan = {
        id: parseInt(lessonId),
        name: 'Introduction to Algebra',
        subjects: this.subjects[0],
        responsible: this.teachers[0],
        grades: this.grades[0],
        lastUpdatedOn: new Date(),
        status: 'published',
        notes: 'Students struggled with fractions - review next lesson'
      };
    }
  }

  // Learning Objectives Management
  addObjective() {
    if (this.newObjective && this.newObjective.trim()) {
      this.learningObjectives.push(this.newObjective.trim());
      this.newObjective = '';
    }
  }

  editObjective(index: number) {
    const objective = this.learningObjectives[index];
    this.newObjective = objective;
    this.removeObjective(index);
  }

  removeObjective(index: number) {
    this.learningObjectives.splice(index, 1);
  }

  // Activities Management
  removeActivity(index: number) {
    this.activities.splice(index, 1);
  }

  // Materials Management
  removeMaterial(material: any) {
    const index = this.materials.indexOf(material);
    if (index > -1) {
      this.materials.splice(index, 1);
    }
  }

  // Differentiation Management
  addExtension() {
    const extension = prompt('Enter extension activity:');
    if (extension && extension.trim()) {
      this.extensions.push(extension.trim());
    }
  }

  addSupportStrategy() {
    const strategy = prompt('Enter support strategy:');
    if (strategy && strategy.trim()) {
      this.supportStrategies.push(strategy.trim());
    }
  }

  // Modal handlers
  openAddMaterialModal() {
    // In a real app, this would open a modal
    const materialName = prompt('Enter material name:');
    const materialType = prompt('Enter material type (Textbook, Handout, Video, etc.):');
    if (materialName && materialName.trim() && materialType && materialType.trim()) {
      this.materials.push({
        name: materialName.trim(),
        type: materialType.trim()
      });
    }
  }

  openAddActivityModal() {
    // In a real app, this would open a modal
    this.activities.push({
      startTime: '09:00',
      description: 'New activity',
      duration: 15,
      type: 'direct'
    });
  }

  openAddAssessmentModal() {
    // In a real app, this would open a modal
    const assessmentName = prompt('Enter assessment name:');
    if (assessmentName && assessmentName.trim()) {
      this.assessments.push({
        name: assessmentName.trim(),
        description: 'Description pending',
        type: 'formative',
        weight: 10,
        dueDate: new Date(Date.now() + 604800000) // One week from now
      });
    }
  }

  // Form Actions
  saveAsDraft() {
    this.lessonPlan.status = 'draft';
    this.lessonPlan.lastUpdatedOn = new Date();
    console.log('Saving as draft:', this.lessonPlan);
    // API call would go here
    alert('Lesson plan saved as draft');
  }

  publishLesson() {
    if (this.learningObjectives.length === 0) {
      alert('Please add at least one learning objective before publishing.');
      return;
    }
    this.lessonPlan.status = 'published';
    this.lessonPlan.lastUpdatedOn = new Date();
    console.log('Publishing lesson:', this.lessonPlan);
    // API call would go here
    alert('Lesson plan published successfully!');
  }

  saveLessonPlan() {
    this.lessonPlan.lastUpdatedOn = new Date();
    console.log('Saving lesson plan:', this.lessonPlan);
    // API call would go here
    alert('Lesson plan saved successfully!');
  }

  previewLesson() {
    // Open preview mode
    console.log('Previewing lesson:', this.lessonPlan);
  }

  // Helper methods
  getStatusClass(): string {
    const status = this.lessonPlan?.status?.toLowerCase() || 'draft';
    switch(status) {
      case 'published': return 'published';
      case 'draft': return 'draft';
      case 'archived': return 'archived';
      case 'review': return 'review';
      default: return 'draft';
    }
  }

  getSubjectIcon(subjectName: string | undefined): string {
    const icons: {[key: string]: string} = {
      'mathematics': '🧮',
      'english': '📝',
      'natural sciences': '🔬',
      'social sciences': '🌍',
      'life orientation': '🧠'
    };
    if(!subjectName) return ""
    return icons[subjectName?.toLowerCase()] || '📘';
  }

  getSubjectInitials(subjectName: string| undefined): string {
    if (!subjectName) return 'LP';
    return subjectName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  getMaterialIcon(type: string): string {
    const icons: {[key: string]: string} = {
      'Textbook': '📖',
      'Handout': '📝',
      'Presentation': '🖥️',
      'Video': '🎬',
      'Worksheet': '📄',
      'Quiz': '📋',
      'Interactive': '🔄'
    };
    return icons[type] || '📁';
  }

  getAssessmentIcon(type: string): string {
    const icons: {[key: string]: string} = {
      'formative': '📊',
      'summative': '📝',
      'homework': '📚',
      'quiz': '❓',
      'project': '🎨',
      'presentation': '🎤'
    };
    return icons[type] || '📋';
  }
}