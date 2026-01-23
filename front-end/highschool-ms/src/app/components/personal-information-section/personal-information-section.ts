import { DatePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { updateUser, User } from '../../models/User';

@Component({
  selector: 'app-personal-information-section',
  imports: [FormsModule],
  templateUrl: './personal-information-section.html',
  styleUrl: './personal-information-section.scss',
  providers: [DatePipe]
})
export class PersonalInformationSection {
  onEditMode = signal(false)
  personalInformation = input<User>();
  editPersonalInformation = signal<User>({
    id: 0,
    name: '',
    surname: '',
    phone: '',
    email: '',
    role: '',
    address: '',
    date_of_birth: new Date(),
    date_joined: undefined,
    type: ''
  });

  constructor(private datePipe: DatePipe){}
  toggleEditMode(){
    this.onEditMode.set(!this.onEditMode())
    let user = this.personalInformation()
    this.editPersonalInformation.set({
      id: user?.id || 0,
      name: user?.name || '',
      surname: user?.surname || '',
      phone: user?.phone || '',
      email: user?.email || '',
      role: user?.role || '',
      address: user?.address || '',
      date_of_birth: user?.date_of_birth || new Date(),
      date_joined: user?.date_joined || new Date(),
      type: ''
    })
  }
  formatDateForInput(date: Date | string | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    console.log(`Date converted to ${d.toISOString().split('T')[0]}`)
    return d.toISOString().split('T')[0];
  }
  formatDate(date: Date | undefined): string {
    return this.datePipe.transform(date, 'longDate') || '';
  }
  calculateAge(birthDate: Date | undefined): number {
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
    cancelEdit(){
      this.toggleEditMode()
    }

  // Save contact information
  savePersonalInfo() {
    console.log('saving the personal information')
    updateUser(this.editPersonalInformation())

    // In real app, save to backend here
    console.log('Saving contact info:', this.personalInformation);
    
    // Exit edit mode
    this.onEditMode.set(false);    
    // Show success message
    alert('Contact information updated successfully!');
  }


}
