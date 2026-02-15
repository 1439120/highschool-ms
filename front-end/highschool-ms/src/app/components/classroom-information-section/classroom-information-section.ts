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
  
  teachers = [
    { id: 1, name: 'Alice Mbatha' },
    { id: 2, name: 'John Smith' },
    { id: 3, name: 'Priya Patel' },
    { id: 4, name: 'Maria Garcia' },
    { id: 5, name: 'David Wilson' }
  ];

  mockTeachers: User[] = [
    {
      id: 1, name: 'Alice Mbatha', email: 'a.mbatha@school.edu', department: 'Mathematics',
      surname: '',
      phone: '',
      role: '',
      address: '',
      dateOfBirth: null,
      dateJoined: null,
      type: ''
    },
    {
      id: 2, name: 'John Smith', email: 'j.smith@school.edu', department: 'English',
      surname: '',
      phone: '',
      role: '',
      address: '',
      dateOfBirth: null,
      dateJoined: null,
      type: ''
    },
    {
      id: 3, name: 'Priya Patel', email: 'p.patel@school.edu', department: 'Science',
      surname: '',
      phone: '',
      role: '',
      address: '',
      dateOfBirth: null,
      dateJoined: null,
      type: ''
    },
    {
      id: 4, name: 'Maria Garcia', email: 'm.garcia@school.edu', department: 'Social Studies',
      surname: '',
      phone: '',
      role: '',
      address: '',
      dateOfBirth: null,
      dateJoined: null,
      type: ''
    },
    {
      id: 5, name: 'David Wilson', email: 'd.wilson@school.edu', department: 'Physical Education',
      surname: '',
      phone: '',
      role: '',
      address: '',
      dateOfBirth: null,
      dateJoined: null,
      type: ''
    },
    {
      id: 6, name: 'Sarah Johnson', email: 's.johnson@school.edu', department: 'Mathematics',
      surname: '',
      phone: '',
      role: '',
      address: '',
      dateOfBirth: null,
      dateJoined: null,
      type: ''
    },
    {
      id: 7, name: 'Michael Brown', email: 'm.brown@school.edu', department: 'Science',
      surname: '',
      phone: '',
      role: '',
      address: '',
      dateOfBirth: null,
      dateJoined: null,
      type: ''
    },
    {
      id: 8, name: 'Linda Davis', email: 'l.davis@school.edu', department: 'English',
      surname: '',
      phone: '',
      role: '',
      address: '',
      dateOfBirth: null,
      dateJoined: null,
      type: ''
    },
    {
      id: 9, name: 'Robert Taylor', email: 'r.taylor@school.edu', department: 'History',
      surname: '',
      phone: '',
      role: '',
      address: '',
      dateOfBirth: null,
      dateJoined: null,
      type: ''
    },
    {
      id: 10, name: 'Jennifer Lee', email: 'j.lee@school.edu', department: 'Art',
      surname: '',
      phone: '',
      role: '',
      address: '',
      dateOfBirth: null,
      dateJoined: null,
      type: ''
    }
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
          }
      }
    })
  }

  toggleEditMode(){
    this.onEditMode.set(!this.onEditMode())
  }

  saveOverview() {
    if (this.overviewForm.valid) {
      const formData = this.overviewForm.value;
      
      // Update the classroom signal with new data
      const updatedClassroom: Classroom = {
        ...this.classroom(),
        name: formData.className,
        grade: this.grade,
        academicYear: formData.academicYear,
        classTeacher: this.defaultUser,
        roomNumber: formData.roomNumber,
        capacity: formData.capacity,
        description: formData.description,
        schedule: `${formData.scheduleStart} - ${formData.scheduleEnd}`
      };
      
      this.classroom.set(updatedClassroom);
      
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
    this.overviewForm.patchValue({
      grade: this.classroom()?.grade?.id,
      className: this.classroom()?.name,
      academicYear: this.classroom()?.academicYear,
      classTeacher: this.classroom()?.classTeacher,
      roomNumber: this.classroom()?.roomNumber,
      capacity: this.classroom()?.maximumOccupants,
      // description: this.classroom()?.description
    });
    
    this.toggleEditMode();
  }
}
