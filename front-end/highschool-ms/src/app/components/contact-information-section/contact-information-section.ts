import { TitleCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-information-section',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './contact-information-section.html',
  styleUrl: './contact-information-section.scss',
  providers: [TitleCasePipe]
})
export class ContactInformationSection {
  onEditMode = signal(false)
  contactInformation: any;
  toggleEditMode(){
    this.onEditMode.set(!this.onEditMode())
  }
  removeAdditionalContact(index: number){

  }
  addAdditionalContact(){

  }
  cancelEdit(){
    this.toggleEditMode()
  }
  saveContactInfo(){}
}
