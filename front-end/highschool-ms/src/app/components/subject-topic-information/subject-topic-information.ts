import { Component, effect, EventEmitter, input, linkedSignal, Output, signal } from '@angular/core';
import { Topic } from '../../models/Topic';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subject-topic-information',
  imports: [FormsModule],
  templateUrl: './subject-topic-information.html',
  styleUrl: './subject-topic-information.scss',
})
export class SubjectTopicInformation {
  
  @Output() closeFormOnCancel = new EventEmitter();
  showDeleteConfirm = signal<boolean>(false);
  topic = input<Topic>();
  editMode = linkedSignal({
    source: this.topic,
    computation: (newTopic, previous) => {
      if (previous !== undefined) return previous.value;
        return !newTopic;
    }
  });
  editingTopic = signal<Topic | null>(null);
  newTopic: Topic = {
    name: '',
    startWeek: 1,
    endWeek: 2,
    progress: 0,
    objectives: [],
    lessons: [],
    resources: 0,
    assessments: 0
  };
  newObjective: string = '';
  weeks = Array.from({ length: 13 }, (_, i) => i + 1);

   ngOnInit() {
    // This runs once after inputs are initialized
    if (!this.topic()) {
      this.editMode.set(true);
    }
  }
  cancelDelete(){
    this.showDeleteConfirm.set(true);
  }
  deleteTopic(id: string | null){

  }

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

  viewTopic(topic: Topic | undefined) {
    // this.topicViewed.emit(topic);
  }

  editTopic(topic: Topic | undefined, event?: Event) {
    // event?.stopPropagation();
    this.editMode.set(true);
    if(topic){
      this.editingTopic.set(topic);
      this.newTopic = { ...topic };
    }
    // this.showAddForm.set(true);
  }

   // Delete methods
  confirmDelete(topicId: string, event?: Event) {
    event?.stopPropagation();
    // this.showDeleteConfirm.set(topicId);
  }

  closeAddForm(){
    this.editMode.set(false);
    this.closeFormOnCancel.emit();
  }
  addObjective() {
    if (this.newObjective.trim()) {
      this.newTopic.objectives.push(this.newObjective.trim());
      this.newObjective = '';
    }
  }
  removeObjective(index: number) {
    this.newTopic.objectives.splice(index, 1);
  }
  addLesson() {
    this.newTopic.lessons.push({
      name: 'New Lesson',
      duration: 45,
      status: 'pending'
    });
  }
  removeLesson(index: number) {
    this.newTopic.lessons.splice(index, 1);
  }
  saveTopic(){

  }


}
