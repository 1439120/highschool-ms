import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { updateUser, User } from '../../models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-information-section',
  imports: [FormsModule],
  templateUrl: './contact-information-section.html',
  styleUrl: './contact-information-section.scss',
  providers: []
})
export class ContactInformationSection {
  onEditMode = signal(false)
  contactInformation = input<User>();
  private route = inject(ActivatedRoute)
  editContactInformation = signal<User>({
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

  ngOnInit(): void {
    this.onEditMode.set(
      this.route.snapshot.queryParamMap.get('mode') === 'edit'
    )
  }


  toggleEditMode(){
    this.onEditMode.set(!this.onEditMode())
    let user = this.contactInformation()
    this.editContactInformation.set({
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
  
  removeAdditionalContact(index: number){

  }
  addAdditionalContact(){

  }
  cancelEdit(){
    this.toggleEditMode()
  }
  saveContactInfo(){
    console.log('saving the contact information')
    updateUser(this.editContactInformation())

    // In real app, save to backend here
    console.log('Saving contact info:', this.editContactInformation);
    
    // Exit edit mode
    this.onEditMode.set(false);    
    // Show success message
    alert('Contact information updated successfully!');

  }
}
