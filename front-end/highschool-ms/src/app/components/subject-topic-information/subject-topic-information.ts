import { Component, effect, EventEmitter, input, linkedSignal, Output, signal } from '@angular/core';
import { Topic } from '../../models/Topic';
import { FormsModule } from '@angular/forms';
import { SubjectTopicService } from '../../services/subject-topic-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subject-topic-information',
  imports: [FormsModule],
  templateUrl: './subject-topic-information.html',
  styleUrl: './subject-topic-information.scss',
})
export class SubjectTopicInformation {
  
  @Output() closeFormOnCancel = new EventEmitter();
  showDeleteConfirm = signal<boolean>(false);
  recordId = signal<string>("");
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
    assessments: 0,
    term: 0,
    description: 'no description'
  };
  newObjective: string = '';
  weeks = Array.from({ length: 13 }, (_, i) => i + 1);

  constructor(private route: ActivatedRoute, private topicService: SubjectTopicService){
    this.route.params.subscribe(params => {
      this.recordId.set(params['id']);
    })
  }

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
      this.newTopic.objectives.push({name: this.newObjective.trim()});
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
  saveTopic() {
    // Determine which service method to call
    const request$ = this.editingTopic() 
      ? this.topicService.editExistingTopic(this.recordId(), this.newTopic)
      : this.topicService.addNewTopic(this.recordId(), this.newTopic);

    request$.subscribe({
      next: (data) => {
        console.log("Topic saved successfully:", data);
        // Handle objectives if ID exists
        if (data?.id) {
          this.topicService
            .removeAllObjectives(data.id)
            .subscribe((rmObjectives)=>console.log("Objective removed successfully", rmObjectives));
          this.topicService
            .addObjectiveToTopic(data.id, this.newTopic.objectives)
            .subscribe((addedObjectives)=>{
              console.log("Objective added successfully", addedObjectives)
              this.editMode.set(false);
            });
          this.topicService
            .removeTopicLessons(data.id)
            .subscribe((rmLesson) => console.log("Removed all the lessons"))
          this.topicService
            .addTopicLessons(data.id, this.newTopic.lessons)
            .subscribe(addLessons => console.log("Added lessons: ", addLessons))
        }
      },
      error: (err) => console.error("Save failed:", err)
    });
  }


}
