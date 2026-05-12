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

  newObjective: string = '';

  filteredTopics = computed(() => {
    return this.topics().filter(topic => 
      topic.name.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  });


  // Add methods
  openAddForm() {
    // this.resetForm();
    this.showAddForm.set(true);
    this.editingTopic.set(null);
  }

  calculateProgress(lessons: any[]): number {
    if (lessons.length === 0) return 0;
    const completed = lessons.filter(l => l.status === 'completed').length;
    return Math.round((completed / lessons.length) * 100);
  }

  closeAddForm() {
    this.showAddForm.set(false);
    // this.resetForm();
  }

  // Search
  updateSearch(term: string) {
    this.searchTerm.set(term);
  }

  clearSearch() {
    this.searchTerm.set('');
  }
}
