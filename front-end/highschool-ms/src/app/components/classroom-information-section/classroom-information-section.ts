import { Component, input, signal } from '@angular/core';
import { Classroom } from '../../models/Classroom';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Grades from '../../models/Grades';

@Component({
  selector: 'app-classroom-information-section',
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './classroom-information-section.html',
  styleUrl: './classroom-information-section.scss',
})
export class ClassroomInformationSection {
  grade: Grades = {
        id: 0,
        name: '',
        gradeNumber: 0
  }
  classroom = signal<Classroom>({
    id: 0,
    name: 'Grade 8A',
    grade: this.grade,
    classTeacher: 'Mrs Mthethwa',
    maximumOccupants: 0,
    registeredStudents: 0,
    numberOfSubjecteds: 0,
    academicYear: 2025,
    roomNumber: 'A1'
  })
  onEditMode = signal(false);
  

  overviewForm: FormGroup;

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

   constructor(private fb: FormBuilder) {
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
        classTeacher: "Mrs Mazibuko",
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
