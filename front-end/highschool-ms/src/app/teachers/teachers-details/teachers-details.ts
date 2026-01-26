import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import BreadcrumbModel from '../../models/BreadcrumbModel';
import { FormsModule } from '@angular/forms';
import { ContactInformationSection } from '../../components/contact-information-section/contact-information-section';
import { PersonalInformationSection } from '../../components/personal-information-section/personal-information-section';
import { User } from '../../models/User';

import { UsersService } from '../../services/users-service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-teachers-details',
  imports: [Breadcrumb, FormsModule, ContactInformationSection, PersonalInformationSection],
  templateUrl: './teachers-details.html',
  styleUrl: './teachers-details.scss',
  providers: []
})
export class TeachersDetails {
  private route = inject(ActivatedRoute);
  breadCrumb!: BreadcrumbModel[];
  teacher = computed(()=>{
    return this.service.findUser(this.teacherId()) ?? {
      id: 0,
      name: '',
      surname: '',
      phone: '',
      email: '',
      role: '',
      address: '',
      date_of_birth: undefined,
      date_joined: undefined,
      type: 'teacher'
    }
  })
  assigned_classes = signal<string[]>([])
  assigned_subjects = signal<string[]>([])
  editTeacher: any = {};
  showAddSubjectInput: number | null = null;
  newSubject: string = '';
  onEditMode = signal(false)
  teacherId = signal<string | null>(null);
  private destroy$ = new Subject<void>();

  constructor(
    private service: UsersService
  ) {
    this.route.paramMap.subscribe(params => {
      this.teacherId.set(params.get('id'));
    });
  }

  ngOnInit(): void {
    // this.teacherId = this.route.snapshot.paramMap.get('id')!;
    console.log("Teacher ID: ", this.teacherId)
    this.breadCrumb  = [{name: 'Teachers', url:'/teachers'},{name: `Teacher ${this.teacherId()}`, url:''}]
    this.loadTeacherData();
  }

  loadTeacherData() {
    // let value = this.service.findUser(Id)
    // if (value) this.teacher.set(value)
    this.assigned_classes.set(['Grade 12 A', 'Grade 12 B', 'Grade 10 A'])
    this.assigned_subjects.set(['maths', 'physics', 'life science'])
  }

  addClass() {
    const className = prompt('Enter class name (e.g., Grade 12 A):');
    if (className && this.assigned_classes().length) {
      this.assigned_classes.update(value => [...value, className]) //.push(className);
    }
  }

  removeClass(index: number) {
    if (confirm('Are you sure you want to remove this class?')) {
      this.assigned_classes?.update(value => value.splice(index, 1));
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


// Copy to clipboard
// copyToClipboard(text: string) {
//   if (!text) return;
  
//   navigator.clipboard.writeText(text).then(() => {
//     // Show feedback
//     const toast = document.createElement('div');
//     toast.textContent = 'Address copied to clipboard!';
//     toast.style.cssText = `
//       position: fixed;
//       bottom: 20px;
//       right: 20px;
//       background: #10b981;
//       color: white;
//       padding: 12px 20px;
//       border-radius: 8px;
//       font-weight: 500;
//       z-index: 1000;
//       animation: slideIn 0.3s ease;
//     `;
//     document.body.appendChild(toast);
    
//     setTimeout(() => {
//       toast.style.animation = 'slideOut 0.3s ease';
//       setTimeout(() => document.body.removeChild(toast), 300);
//     }, 2000);
//   }).catch(err => {
//     console.error('Failed to copy:', err);
//     alert('Failed to copy address. Please try again.');
//   });
// }

hideAddSubjectInput() {
  this.showAddSubjectInput = null;
  this.newSubject = '';
}

  getRoleClass(role: string): string {
    const roleMap: {[key: string]: string} = {
      'Admin': 'admin',
      'User': 'user',
      'Editor': 'editor',
      'Teacher': 'user'
    };
    return roleMap[role] || 'user';
  }

  ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

}
