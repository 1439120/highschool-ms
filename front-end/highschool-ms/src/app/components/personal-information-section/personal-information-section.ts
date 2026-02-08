import { DatePipe } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  User } from '../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-personal-information-section',
  imports: [FormsModule],
  templateUrl: './personal-information-section.html',
  styleUrl: './personal-information-section.scss',
  providers: [DatePipe]
})
export class PersonalInformationSection {
  onEditMode = signal(false)
  userId = input<string | null>()
  userType = input<string>()
  personalInformation = signal<User>({
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
  });
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  editPersonalInformation = signal<User>({
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
  });

  // this to check if the addbutton was clicked
  addClicked = signal(false);

  constructor(private datePipe: DatePipe, private service: UsersService){    
    effect(() => {
      const currentUser = this.service.currentTeacher();
      let userId = this.userId();
      if(userId){
        if (currentUser && currentUser.id == parseInt(userId)){
          this.personalInformation.set(currentUser);
          this.onEditMode.set(false);
        }
      }

      if(this.addClicked()){
        const addedUser = this.service.currentTeacher();
        if(addedUser == null) return;
        this.addClicked.set(false);
        this.personalInformation.set(addedUser);
        this.onEditMode.set(false);
        this.router.navigate(['../', addedUser.id], {
          relativeTo: this.route,
        });
      }
    });
  }
  ngOnInit(): void {
    this.onEditMode.set(
      this.route.snapshot.queryParamMap.get('mode') === 'edit'
    )
    let Id = this.userId()
    if(Id){
      this.service.getTeacher(Id)
    }
  }
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
      dateOfBirth: user?.dateOfBirth || null,
      dateJoined: user?.dateJoined || null,
      type: ''
    })
  }
  formatDateForInput(date: Date | string | null): string {
    if (!date) return '';
    const d = new Date(date);
    console.log(`Date converted to ${d.toISOString().split('T')[0]}`)
    return d.toISOString().split('T')[0];
  }
  formatDate(date: Date | null): string {
    return this.datePipe.transform(date, 'longDate') || '';
  }
  calculateAge(birthDate: Date | null): number {
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
    let Id = this.userId()
    if(Id)
    this.service.updateTeacher(Id, this.editPersonalInformation())

    // In real app, save to backend here
    // console.log('Saving contact info:', this.personalInformation());
    
    // Exit edit mode
    this.onEditMode.set(false);    
    // Show success message
    alert('Contact information updated successfully!');
  }

  async addNewUser(){
    this.addClicked.set(true);
    this.service.addTeacher(this.editPersonalInformation());
    
  }


}
