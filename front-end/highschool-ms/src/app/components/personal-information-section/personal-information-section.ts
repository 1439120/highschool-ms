import { DatePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addUser, findUser, updateUser, User } from '../../models/User';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-information-section',
  imports: [FormsModule],
  templateUrl: './personal-information-section.html',
  styleUrl: './personal-information-section.scss',
  providers: [DatePipe]
})
export class PersonalInformationSection {
  onEditMode = signal(false)
  userId = input<string>()
  userType = input<string>()
  personalInformation = signal<User>({
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
    date_of_birth: new Date(),
    date_joined: undefined,
    type: ''
  });

  constructor(private datePipe: DatePipe){}
  ngOnInit(): void {
    console.log('When are you running??')
    this.onEditMode.set(
      this.route.snapshot.queryParamMap.get('mode') === 'edit'
    )
    let Id = this.userId()
    if(Id){
      let user = findUser(Id)
      if(user)
      this.personalInformation.set(user);
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

  addNewUser(){
    console.log("this is the route", this.router.url)
    // this.router.url.split('/').map((value, index) => index + 1 === this.router.url.split('/').length ? this.editPersonalInformation().id : value)
    let userType: string = this.userType() ?? ''
    let addedUser = addUser(this.editPersonalInformation(), userType)
    // const newId = this.editPersonalInformation().id;
    console.log("the new added user has this id", addedUser)
    // this.router.navigate([this.route.firstChild, this.editPersonalInformation().id])
    this.personalInformation.set(addedUser);
    this.onEditMode.set(false)
    this.router.navigate(['../', addedUser.id], { relativeTo: this.route });
  }


}
