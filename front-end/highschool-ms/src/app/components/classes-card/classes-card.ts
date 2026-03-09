import { Component, effect, EventEmitter, input, Output, signal } from '@angular/core';
import { Classroom } from '../../models/Classroom';
import { FormsModule } from '@angular/forms';
import { UserAssignedSubjects } from '../../services/user-assigned-subjects';
import { SubjectsModel } from '../../models/SubjectsModel';

@Component({
  selector: 'app-classes-card',
  imports: [FormsModule],
  templateUrl: './classes-card.html',
  styleUrl: './classes-card.scss',
})
export class ClassesCard {
  addClass = input(false);
  classroom = input<Classroom>()
  assignedSubjects = signal<SubjectsModel[]>([])
  recordId = input<string>("")
  newSubject: string = '';
  @Output() unassignThisClass = new EventEmitter<Classroom>();
  // @Output() AssignSubjectToClass = new EventEmitter();
  @Output() onClickSelect = new EventEmitter<Classroom>();
  // showSubjectsModal = signal<boolean>(false);

  constructor(private subjectService: UserAssignedSubjects){
    // // effect(()=>{
    //   subjectService.getUserClassSubjects(this.recordId(), this.classroom()?.id.toString() || '')
    //   this.assignedSubjects.set(subjectService.subjects())
    // // })
    effect(() => {
      this.subjectService.reloadSubjects();
      const teacherId = this.recordId();
      const classId = this.classroom()?.id;

      if (!teacherId || !classId) return;

      this.subjectService
        .getUserClassSubjects(teacherId, classId.toString())
        .subscribe(subjects => {
          this.assignedSubjects.set(subjects);
        });
    });
  }

  removeClass(){
    this.unassignThisClass.emit(this.classroom());
  }
  addSubjectToClass(index: number | undefined){
    // this.showSubjectsModal.set(true);
    console.log(this.classroom())
    this.onClickSelect.emit(this.classroom());
  }
  removeSubjectFromClass(){
    
  }
  confirmAddSubject(){

  }
  hideAddSubjectInput(){
    // this.showSubjectsModal.set(false);
  }
}
