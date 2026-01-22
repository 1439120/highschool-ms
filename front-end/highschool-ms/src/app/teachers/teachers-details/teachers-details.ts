import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import BreadcrumbModel from '../../models/BreadcrumbModel';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactInformationSection } from '../../components/contact-information-section/contact-information-section';


@Component({
  selector: 'app-teachers-details',
  imports: [Breadcrumb, FormsModule, ContactInformationSection],
  templateUrl: './teachers-details.html',
  styleUrl: './teachers-details.scss',
  providers: [DatePipe]
})
export class TeachersDetails {
  private route = inject(ActivatedRoute);
  teacherId!: string;
  breadCrumb!: BreadcrumbModel[];
  teacher: any = null;
  editTeacher: any = {};
  showAddSubjectInput: number | null = null;
  newSubject: string = '';
  onEditMode = signal(false)

  constructor(
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.teacherId = this.route.snapshot.paramMap.get('id')!;
    console.log("Teacher ID: ", this.teacherId)
    this.breadCrumb  = [{name: 'Teachers', url:'/teachers'},{name: `Teacher ${this.teacherId}`, url:''}]
    this.loadTeacherData();
  }

  // Toggle edit mode
  toggleEditMode() {
    if (!this.onEditMode()) {
      // Enter edit mode - clone the teacher data
      this.editTeacher = {
        ...this.teacher,
        date_of_birth: this.formatDateForInput(this.teacher?.date_of_birth),
        date_joined: this.formatDateForInput(this.teacher?.date_joined)
      };
    }
    this.onEditMode.set(!this.onEditMode());
  }

  // Format date for input[type="date"]
  formatDateForInput(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  // Cancel edit
  cancelEdit() {
    this.onEditMode.set(false);
    this.editTeacher = {};
  }

  // Save personal info
  savePersonalInfo() {
    // Validate data
    if (!this.editTeacher.name?.trim() || !this.editTeacher.surname?.trim()) {
      alert('Please fill in both name fields');
      return;
    }
    
    // Update the teacher object
    this.teacher = {
      ...this.teacher,
      ...this.editTeacher,
      // Convert date strings back to Date objects
      date_of_birth: new Date(this.editTeacher.date_of_birth),
      date_joined: new Date(this.editTeacher.date_joined)
    };
    
    // In real app, save to backend here
    console.log('Saving teacher info:', this.teacher);
    
    // Exit edit mode
    this.onEditMode.set(false);
    this.editTeacher = {};
    
    // Show success message
    alert('Personal information updated successfully!');
  }


  loadTeacherData() {
    this.teacher = {
      id: 9093,
      name: 'Alice',
      surname: 'Mbatha',
      phone: '012 111 2233',
      email: 'alice@mail.com',
      role: 'Admin',
      address: '123 Avenue',
      date_of_birth: new Date('1985-05-15'),
      expect_subjects: ['maths', 'physics', 'life science'],
      assigned_classes: ['Grade 12 A', 'Grade 12 B', 'Grade 10 A'],
      assigned_subjects: [
        'Grade 12 A - Maths',
        'Grade 12 A - Physics',
        'Grade 12 B - Maths',
        'Grade 12 B - Physics'
      ]
    };
  }

  addClass() {
    const className = prompt('Enter class name (e.g., Grade 12 A):');
    if (className && this.teacher?.assigned_classes) {
      this.teacher.assigned_classes.push(className);
    }
  }

  removeClass(index: number) {
    if (confirm('Are you sure you want to remove this class?')) {
      this.teacher?.assigned_classes?.splice(index, 1);
    }
  }

  removeSubjectFromClass(classIndex: number, subjectIndex: number) {
    this.teacher?.expect_subjects?.splice(subjectIndex, 1);
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
    if (!this.teacher?.expect_subjects) {
      this.teacher.expect_subjects = [];
    }
    this.teacher.expect_subjects.push(this.newSubject.trim());
    this.newSubject = '';
    this.hideAddSubjectInput();
  }
}

// Save contact information
saveContactInfo() {
  // Validate required fields
  if (!this.editTeacher.email?.trim()) {
    alert('Please enter an email address');
    return;
  }
  
  if (!this.editTeacher.phone?.trim()) {
    alert('Please enter a phone number');
    return;
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.editTeacher.email.trim())) {
    alert('Please enter a valid email address');
    return;
  }
  
  // Update the teacher object
  this.teacher = {
    ...this.teacher,
    email: this.editTeacher.email.trim(),
    phone: this.editTeacher.phone.trim(),
    address: this.editTeacher.address?.trim() || '',
    additionalContacts: [] // this.editTeacher.additionalContacts?.filter(
      // contact => contact.number.trim()
    // ) || []
  };
  
  // In real app, save to backend here
  console.log('Saving contact info:', this.teacher);
  
  // Exit edit mode
  this.onEditMode.set(false);
  this.editTeacher = {};
  
  // Show success message
  alert('Contact information updated successfully!');
}

// Copy to clipboard
copyToClipboard(text: string) {
  if (!text) return;
  
  navigator.clipboard.writeText(text).then(() => {
    // Show feedback
    const toast = document.createElement('div');
    toast.textContent = 'Address copied to clipboard!';
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    alert('Failed to copy address. Please try again.');
  });
}

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

    calculateAge(birthDate: Date): number {
      if (!birthDate) return 0;
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      
      return age;
    }

    // Format date for display
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'longDate') || '';
  }

}
