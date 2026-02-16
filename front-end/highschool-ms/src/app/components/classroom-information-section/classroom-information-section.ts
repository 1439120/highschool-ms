import { Component, computed, effect, input, signal } from '@angular/core';
import { Classroom } from '../../models/Classroom';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Grades from '../../models/Grades';
import { User } from '../../models/User';
import { ClassroomService } from '../../services/classroom-service';
import { SearchFieldComponent, SearchItem } from '../search-field-component/search-field-component';
import { UsersService } from '../../services/users-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-classroom-information-section',
  imports: [CommonModule, ReactiveFormsModule, SearchFieldComponent],
  templateUrl: './classroom-information-section.html',
  styleUrl: './classroom-information-section.scss',
})
export class ClassroomInformationSection {
  grade: Grades = {
        id: 0,
        name: '',
        gradeNumber: 0
  }
  defaultUser: User = {
    id: 0,
    name: '',
    surname: '',
    phone: '',
    email: '',
    role: '',
    address: '',
    dateOfBirth: null,
    dateJoined: null,
    type: ''
  }
  classroom = signal<Classroom>({
    id: 0,
    name: '',
    grade: this.grade,
    classTeacher: this.defaultUser,
    maximumOccupants: 0,
    registeredStudents: 0,
    numberOfSubjecteds: 0,
    academicYear: 2025,
    roomNumber: ''
  })
  onEditMode = signal(false);
  overviewForm: FormGroup;
  classTeacher = computed(()=>{
    let teacher = this.classroom().classTeacher;
    return `${teacher.name} ${teacher.surname}`
  })
  classroomId = input<string>()

  grades = [
    { id: 1, gradeNumber: 8 },
    { id: 2, gradeNumber: 9 },
    { id: 3, gradeNumber: 10 },
    { id: 4, gradeNumber: 11 },
    { id: 5, gradeNumber: 12 }
  ];

   constructor(private fb: FormBuilder, private service: ClassroomService, private teacherService: UsersService) {
    this.overviewForm = this.fb.group({
      grade: ['', Validators.required],
      className: ['', Validators.required],
      academicYear: ['', Validators.required],
      classTeacher: ['', Validators.required],
      roomNumber: ['', Validators.required],
      scheduleStart: ['7:30'],
      scheduleEnd: ['14:30'],
      capacity: [60, [Validators.required, Validators.min(1), Validators.max(100)]],
      description: ['']
    });
    effect(()=>{
      const currenClass = this.service.currentClassroom();
      let Id = this.classroomId()
      if(Id){
        if (currenClass && currenClass.id == parseInt(Id)){
            this.classroom.set(currenClass);
            // this.cancelEdit()
          }
      }
    })
  }

  toggleEditMode(){
    this.updateInputFormOverview()
    this.onEditMode.set(!this.onEditMode())
  }

  saveOverview() {
    if (this.overviewForm.valid) {
      const formData = this.overviewForm.value;
      console.log("this is the form data")
      console.log(formData)
      let classTeacherId = formData.classTeacher;
      // If it's an object with id, extract the id
      console.log(typeof classTeacherId)
        if (classTeacherId && typeof classTeacherId === 'string') {
            classTeacherId = this.classroom().classTeacher.id;
        }

      const updatedClassroom: Classroom = {
        ...this.classroom(),
        name: formData.className,
        grade: formData.grade,
        academicYear: formData.academicYear,
        classTeacher: classTeacherId,
        roomNumber: formData.roomNumber,
        capacity: formData.capacity,
        description: formData.description,
        schedule: `${formData.scheduleStart} - ${formData.scheduleEnd}`
      };
      
      // this.classroom.set(updatedClassroom);
      this.service.updateClassroomDetails(updatedClassroom);
      // this.classroom.set(this.service.currentClassroom());
      
      // Here you would call an API to save the data
      console.log('Saving classroom data:', updatedClassroom);
      
      // Exit edit mode
      this.toggleEditMode();
      
      // Optional: Show success message
      // this.showSuccessMessage('Classroom updated successfully');
    } else {
      // Mark all fields as touched to show validation errors
      this.overviewForm.markAllAsTouched();
    }
  }

  // Simulate API call - Replace with actual API service
   searchTeachers = async (term: string): Promise<SearchItem[]> => {
    return await firstValueFrom(this.teacherService.searchTeachers(term));
  }

  // Handle teacher selection
  onTeacherSelected(teacher: SearchItem) {
      // this.selectedTeacher = teacher;
      console.log('Teacher selected:', teacher);
  }

  // Handle add new teacher
  onAddNewTeacher(searchTerm: string) {
      console.log('Add new teacher:', searchTerm);
      // Open modal to create new teacher
      // this.openAddTeacherModal(searchTerm);
  }

  cancelEdit() {
    // Reset form to original values
    this.updateInputFormOverview()
    this.toggleEditMode();
  }

  updateInputFormOverview(){
    let classroom = this.classroom()
    this.overviewForm.patchValue({
      grade: classroom?.grade?.id,
      className: classroom?.name,
      academicYear: classroom?.academicYear,
      classTeacher: classroom?.classTeacher?.name + ' ' + classroom?.classTeacher?.name,
      roomNumber: classroom?.roomNumber,
      capacity: classroom?.maximumOccupants
    });
  }
}
