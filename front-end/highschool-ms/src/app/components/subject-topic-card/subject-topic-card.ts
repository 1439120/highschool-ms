import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Input, input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Topic } from '../../models/Topic';
import { SubjectTopicInformation } from '../subject-topic-information/subject-topic-information';

@Component({
  selector: 'app-subject-topic-card',
  imports: [CommonModule, FormsModule, SubjectTopicInformation],
  templateUrl: './subject-topic-card.html',
  styleUrl: './subject-topic-card.scss',
})
export class SubjectTopicCard {
  topics = input<any[]>([])
  termNumber = input<number>()
  searchTerm = signal<string>('');
  // / State
  showAddForm = signal<boolean>(false);
  editingTopic = signal<any | null>(null);
  showDeleteConfirm = signal<string | null>(null);
  editObjective: string = '';

  weeks = Array.from({ length: 13 }, (_, i) => i + 1);
  @Input() editable: boolean = true;

   @Output() topicUpdated = new EventEmitter<Topic>();
   @Output() topicAdded = new EventEmitter<Topic>();
   @Output() topicDeleted = new EventEmitter<string>();
   @Output() topicViewed = new EventEmitter<Topic>();
   // New topic form
  newTopic: Topic = {
    name: '',
    startWeek: 1,
    endWeek: 2,
    progress: 0,
    objectives: [],
    lessons: [],
    resources: 0,
    assessments: 0,
    term: 0,
    description: 'no description'
  };
  newObjective: string = '';

  filteredTopics = computed(() => {
    return this.topics().filter(topic => 
      topic.name.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  });
  // getTopicIcon(topicName: string): string {
  //   const icons: {[key: string]: string} = {
  //     'algebra': '🔢',
  //     'geometry': '📐',
  //     'equations': '⚖️',
  //     'graphs': '📈',
  //     'fractions': '🥧',
  //     'statistics': '📊',
  //     'probability': '🎲',
  //     'trigonometry': '📐',
  //     'calculus': '∫'
  //   };
    
  //   const lowercaseName = topicName.toLowerCase();
  //   for (const [key, icon] of Object.entries(icons)) {
  //     if (lowercaseName.includes(key)) {
  //       return icon;
  //     }
  //   }
  //   return '📋';
  // }

  // addObjective() {
  //   if (this.newObjective.trim()) {
  //     this.newTopic.objectives.push(this.newObjective.trim());
  //     this.newObjective = '';
  //   }
  // }

  // addEditObjective() {
  //   if (this.editObjective.trim() && this.editingTopic()) {
  //     this.editingTopic()!.objectives.push(this.editObjective.trim());
  //     this.editObjective = '';
  //   }
  // }

  // Add methods
  openAddForm() {
    this.resetForm();
    this.showAddForm.set(true);
    this.editingTopic.set(null);
  }

  resetForm() {
    this.newTopic = {
      name: '',
      startWeek: 1,
      endWeek: 2,
      progress: 0,
      objectives: [],
      lessons: [],
      resources: 0,
      assessments: 0,
      term: 0,
      description: 'no description',
    };
    this.newObjective = '';
  }

  // removeObjective(index: number) {
  //   this.newTopic.objectives.splice(index, 1);
  // }

  // addLesson() {
  //   this.newTopic.lessons.push({
  //     name: 'New Lesson',
  //     duration: 45,
  //     status: 'pending'
  //   });
  // }

  // saveTopic() {
  //   if (!this.newTopic.name.trim()) return;
    
  //   const topicToSave = {
  //     ...this.newTopic,
  //     id: this.editingTopic()?.id || Date.now().toString(),
  //     progress: this.calculateProgress(this.newTopic.lessons)
  //   };
    
  //   if (this.editingTopic()) {
  //     this.topicUpdated.emit(topicToSave);
  //   } else {
  //     this.topicAdded.emit(topicToSave);
  //   }
    
  //   this.closeAddForm();
  // }

  calculateProgress(lessons: any[]): number {
    if (lessons.length === 0) return 0;
    const completed = lessons.filter(l => l.status === 'completed').length;
    return Math.round((completed / lessons.length) * 100);
  }

  // removeLesson(index: number) {
  //   this.newTopic.lessons.splice(index, 1);
  // }

  // cancelDelete() {
  //   this.showDeleteConfirm.set(null);
  // }
  
  // deleteTopic(topicId: string, event?: Event) {
  //   event?.stopPropagation();
  //   this.topicDeleted.emit(topicId);
  //   this.showDeleteConfirm.set(null);
  // }

  closeAddForm() {
    this.showAddForm.set(false);
    this.resetForm();
  }

  // Search
  updateSearch(term: string) {
    this.searchTerm.set(term);
  }

  clearSearch() {
    this.searchTerm.set('');
  }

  //  // View method
  // viewTopic(topic: Topic) {
  //   this.topicViewed.emit(topic);
  // }

  // // Edit methods
  // editTopic(topic: Topic, event?: Event) {
  //   event?.stopPropagation();
  //   this.editingTopic.set(topic);
  //   this.newTopic = { ...topic };
  //   this.showAddForm.set(true);
  // }

  // cancelEdit() {
  //   this.editingTopic.set(null);
  //   this.editObjective = '';
  // }

  // // Delete methods
  // confirmDelete(topicId: string, event?: Event) {
  //   event?.stopPropagation();
  //   this.showDeleteConfirm.set(topicId);
  // }

  // removeEditObjective(index: number) {
  //   if (this.editingTopic()) {
  //     this.editingTopic()!.objectives.splice(index, 1);
  //   }
  // }

  // saveEdit() {
  //   if (this.editingTopic() && this.editingTopic()!.name.trim()) {
  //     // Recalculate progress based on lessons
  //     const topic = this.editingTopic()!;
  //     topic.progress = this.calculateProgress(topic.lessons);
  //     this.topicUpdated.emit(topic);
  //     this.editingTopic.set(null);
  //     this.editObjective = '';
  //   }
  // }
  

  // Filter methods
  getTopicsByTerm(): any[] {
    return this.topics().filter(topic => topic.termId === this.termNumber());
    // return [];
  }
}
