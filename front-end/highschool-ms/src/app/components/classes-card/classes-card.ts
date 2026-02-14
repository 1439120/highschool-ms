import { Component, input, signal } from '@angular/core';
import { Classroom } from '../../models/Classroom';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-classes-card',
  imports: [FormsModule],
  templateUrl: './classes-card.html',
  styleUrl: './classes-card.scss',
})
export class ClassesCard {
  addClass = input(false);
  classroom = input<Classroom>()
  assignedSubjects = signal([])
  showAddSubjectInput = signal(false)
  newSubject: string = '';

  removeClass(index: number | undefined){

  }
  addSubjectToClass(index: number | undefined){
    this.showAddSubjectInput.set(true);
  }
  removeSubjectFromClass(){

  }
  confirmAddSubject(){

  }
  hideAddSubjectInput(){
    this.showAddSubjectInput.set(false);
  }
}
