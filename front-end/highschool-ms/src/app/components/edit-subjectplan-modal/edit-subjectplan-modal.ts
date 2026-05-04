import { CommonModule } from '@angular/common';
import { Component, computed, Inject, inject, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { SearchFieldComponent, SearchItem } from '../search-field-component/search-field-component';
import { firstValueFrom, startWith } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import Grades from '../../models/Grades';
import { SubjectsService } from '../../services/subjects-service';
import { toSignal } from '@angular/core/rxjs-interop'


@Component({
  selector: 'app-edit-subjectplan-modal',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, SearchFieldComponent,
    MatDialogModule
  ],
  templateUrl: './edit-subjectplan-modal.html',
  styleUrl: './edit-subjectplan-modal.scss',
})
export class EditSubjectplanModal {

  private fb = inject(FormBuilder);
  grades = signal<Grades[]>([
    { id: 1, name: '8', gradeNumber: 8 },
    { id: 2, name: '9', gradeNumber: 9 },
    { id: 3, name: '10', gradeNumber: 10 },
    { id: 4, name: '11', gradeNumber: 11 },
    { id: 5, name: '12', gradeNumber: 12 }
  ]);
  
  years = signal<number[]>([
    2023, 2024, 2025, 2026, 2027
  ]);
  editForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    subject: ['', Validators.required],
    grade: ['', Validators.required],
    year: ['', [Validators.required, Validators.min(2000), Validators.max(2030)]]
  });

  gradeId: Signal<any>;

   constructor(
     private subjectService: SubjectsService,
      private dialogRef: MatDialogRef<EditSubjectplanModal>,
      @Inject(MAT_DIALOG_DATA) public data: any // This is the Subject Plan passed in
    ){
      console.log(`This is the data ${typeof(data)}`)
      console.log(data)
      this.editForm = this.fb.group({
        name: [data?.name || '', [Validators.required, Validators.minLength(3)]],
        subject: [data?.subject?.name || null, Validators.required],
        grade: [data?.grade?.id || '', Validators.required],
        year: [data?.year || '', Validators.required]
      });

       const gradeControl = this.editForm.get('grade')!;
        this.gradeId = toSignal(
          gradeControl.valueChanges.pipe(startWith(gradeControl.value)),
          { initialValue: gradeControl.value }
        );
    }

  saveEdit() {
    if (this.editForm.valid) {
      // Return the form value to the caller
      this.dialogRef.close(this.editForm.value);
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  findGrade(gradeId: string | undefined | null){
    return this.grades().filter( x => x.id.toString() == gradeId)[0]?.gradeNumber
  }

  close() {
    this.dialogRef.close();
  }

  searchSubjects = async (term: string): Promise<SearchItem[]> => {

    const gradeId = this.gradeId();
    console.log("This is the grade", gradeId)
    console.log(gradeId)

    if (!gradeId) {
      return [];
    }

    return await firstValueFrom(
      this.subjectService.searchSubjects(term, parseInt(gradeId))
    );
  };

  onSubjectSelected(subject: any) {
    console.log("This is the selected subject", subject)
    this.editForm.patchValue({ subject: subject.name });
  }
  onAddNewSubject(searchTerm: string) {
      console.log('Add new subject:', searchTerm);
      // Open modal to create new subject
  }

}
