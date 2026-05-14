import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actions-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './actions-header.html',
  styleUrl: './actions-header.scss',
})
export class ActionsHeader {
  searchTerm = signal<string>('');
  editMode = input<boolean>(false)
  @Output() addNew = new EventEmitter();
  @Output() updateSearchValue = new EventEmitter();

  updateSearch(term: string) {
    this.updateSearchValue.emit(term);
    this.searchTerm.set(term);
  }
  clearSearch() {
    this.searchTerm.set('');
  }
  openAddForm(){
    this.addNew.emit()
  }
}
