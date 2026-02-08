import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  User } from '../../models/User';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-contact-information-section',
  imports: [FormsModule],
  templateUrl: './contact-information-section.html',
  styleUrl: './contact-information-section.scss',
  providers: []
})
export class ContactInformationSection {
  onEditMode = signal(false)
  userId = signal<string | null>(null)
  userType = input<string>()
  contactInformation = computed(() => {
    const currentUser = this.service.currentUser();
    const id = this.userId();
    if(currentUser && this.userId() == currentUser.id.toString())
    return currentUser
    else return {
        id: 0,
        name: '',
        surname: '',
        phone: '',
        email: '',
        role: '',
        address: '',
        dateOfBirth: undefined,
        dateJoined: undefined,
        type: 'teacher'
      }
  });
  private route = inject(ActivatedRoute)
  editContactInformation = signal<User>({
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

  constructor(private service: UsersService){
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.userId.set(id);
    });
    this.route.queryParamMap.subscribe(params => {
      this.onEditMode.set(params.get('mode') === 'edit');
    });
  }
  
  // ngOnInit(): void {
  //   this.onEditMode.set(
  //     this.route.snapshot.queryParamMap.get('mode') === 'edit'
  //   )

  // }

  toggleEditMode(){
    this.onEditMode.set(!this.onEditMode())
    let user = this.contactInformation()
    if(user)
    this.editContactInformation.set({
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
    });

  }
  
  removeAdditionalContact(index: number){

  }
  addAdditionalContact(){

  }
  cancelEdit(){
    this.toggleEditMode()
  }
  saveContactInfo(){
    console.log('saving the contact information')
    let Id = this.userId()
    if(Id)
    this.service.updateUser(Id, this.editContactInformation(), this.userType() ?? "")
    // In real app, save to backend here
    // console.log('Saving contact info:', this.editContactInformation());
    // console.log('Saving contact info:', this.contactInformation());
    
    // Exit edit mode
    this.onEditMode.set(false);    
    // Show success message
    alert('Contact information updated successfully!');

  }
}
