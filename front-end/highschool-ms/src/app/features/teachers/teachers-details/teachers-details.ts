import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../../../components/breadcrumb/breadcrumb';
import BreadcrumbModel from '../../../models/BreadcrumbModel';
import { FormsModule } from '@angular/forms';
import { PersonalInformationSection } from '../../../components/personal-information-section/personal-information-section';
import { Subject } from 'rxjs';
import { UsersService } from '../../../services/users-service';
import { DetailsHeader } from '../../../components/details-header/details-header';
import { ClassesCard } from '../../../components/classes-card/classes-card';
import { Classroom } from '../../../models/Classroom';
import { AddclassModal } from '../../../components/addclass-modal/addclass-modal';
import { UserClassesService } from '../../../services/user-classes-service';
import { GenericSelectModal } from '../../../components/generic-select-modal/generic-select-modal';
import { SubjectsModel } from '../../../models/SubjectsModel';
import { SubjectsService } from '../../../services/subjects-service';
import { UserAssignedSubjects } from '../../../services/user-assigned-subjects';

@Component({
  selector: 'app-teachers-details',
  imports: [
    Breadcrumb, FormsModule, PersonalInformationSection, ClassesCard,
    DetailsHeader, AddclassModal, GenericSelectModal
  ],
  templateUrl: './teachers-details.html',
  styleUrl: './teachers-details.scss',
  providers: []
})
export class TeachersDetails {
  private route = inject(ActivatedRoute);
  breadCrumb!: BreadcrumbModel[];
  teacher = computed(()=>{
    const currentTeacher = this.service.currentUser();
    if(currentTeacher && this.teacherId() == currentTeacher.id.toString())
    return currentTeacher
    else {
      return {
        id: 0,
        name: '',
        surname: '',
        phone: '',
        email: '',
        role: '',
        address: '',
        dateOfBirth: null,
        dateJoined: null,
        type: 'teacher',
        title: ''
      }
    }
  })
  // assigned_classes = signal<UserClassesModel[]>([])
  assigned_subjects = signal<string[]>([])
  editTeacher: any = {};
  showAddSubjectInput: number | null = null;
  newSubject: string = '';
  onEditMode = signal(false)
  teacherId = signal<string | null>(null);
  showAddClassModal = signal(false);
  userClassService = inject(UserClassesService)
  private destroy$ = new Subject<void>();
  addSubjectModal = signal<boolean>(false);
  selectedClassroom:Classroom | null = null;

  constructor(
    private service: UsersService,
    private subjectService: SubjectsService,
    private assingSubjectService: UserAssignedSubjects,
  ) {
    this.route.paramMap.subscribe(params => {
      let Id = params.get('id')
      this.teacherId.set(Id);
      if(Id && parseInt(Id))
      this.userClassService.loadUserClasses(Id);
    });
    // this.loadTeacherData();
    
    effect(()=>{
      this.breadCrumb  = [{name: 'Teachers', url:'/teachers'},{name: `${this.teacher().name} ${this.teacher().surname}`, url:''}]
    })
  }

  calculateExperince(dateJoined: Date | null): number {
      if (!dateJoined) return 0;
      const today = new Date();
      const birth = new Date(dateJoined);
      let experience = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        experience--;
      }
      return experience;
    }

  openSubjectsModal(classroom: Classroom){
    this.selectedClassroom = classroom;
    this.addSubjectModal.set(true);
  }
  async loadSubjects(): Promise<SubjectsModel[]>{
    return await this.subjectService.loadSubjects(this.selectedClassroom?.grade.id || 0).toPromise() ?? [];
  }
  assignSubjectToClass(subject: SubjectsModel){
    this.assingSubjectService.assignUserSubjects(
      this.teacherId() || '', 
      this.selectedClassroom?.id.toString() || '', 
      subject.id.toString())
  }

  openAddClassModal() {
    this.showAddClassModal.set(true);
  }

  closeAddClassModal() {
      this.showAddClassModal.set(false);
  }

  onClassSelected(selectedClass: Classroom) {
      console.log('Selected class:', selectedClass);
      // Add the selected class to your list
      var teacherId = this.teacherId()
      if(teacherId){
        this.userClassService.assignToClass(teacherId, selectedClass);
      }
      this.closeAddClassModal();
  }

  removeClass(classroom: Classroom) {
    if (confirm('Are you sure you want to remove this class?')) {
      // this.assigned_classes?.update(value => value.splice(index, 1));
      let Id = this.teacherId()
      if(Id)
      this.userClassService.unAssignToClass(Id, classroom)
    }
  }

  removeSubjectFromClass(classIndex: number, subjectIndex: number) {
    this.assigned_subjects.update(value => value.splice(subjectIndex, 1));
  }

  // Remove additional contact
  removeAdditionalContact(index: number) {
    this.editTeacher.additionalContacts?.splice(index, 1);
  }

  // Add additional contact
  addAdditionalContact() {
    if (!this.editTeacher.additionalContacts) {
      this.editTeacher.additionalContacts = [];
    }
    this.editTeacher.additionalContacts.push({
      type: 'mobile',
      number: ''
    });
  }

  

  addSubjectToClass(classIndex: number) {
    this.showAddSubjectInput = classIndex;
    this.newSubject = '';
    
    // Focus the input field after view updates
    setTimeout(() => {
      const input = document.querySelector('.subject-input') as HTMLInputElement;
      if (input) input.focus();
    }, 100);
  }

  confirmAddSubject(classIndex: number) {
    if (this.newSubject.trim()) {
      if (!this.assigned_subjects()) {
        this.assigned_subjects.set([]);
      }
      this.assigned_subjects.update(value => [...value, this.newSubject.trim()]);
      this.newSubject = '';
      this.hideAddSubjectInput();
    }
  }

  hideAddSubjectInput() {
    this.showAddSubjectInput = null;
    this.newSubject = '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
