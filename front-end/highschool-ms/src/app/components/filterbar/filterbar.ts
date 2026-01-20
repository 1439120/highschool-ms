import { Component, input, signal, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filterbar',
  imports: [FormsModule],
  templateUrl: './filterbar.html',
  styleUrl: './filterbar.scss',
})
export class Filterbar {
  // filtering by role
  // input from the parent
  @Input() selectedRole: string = '';
  // output to parent
  @Output() filterChange = new EventEmitter<string>();
  // sort by
  @Input() sortBy: string = '';
  @Output() orderByChange = new EventEmitter<string>();

  filterBy = input('');
  filterByItems = input<string[]>([])

  // stats inputs
  filteredUsers = input(0);
  totalUsers = input(0);

  onFilterChange(){
    console.log(`This is emitted ${this.selectedRole}`)
    this.filterChange.emit(this.selectedRole);         // For your custom event
  }

  onSortChange(){
    this.orderByChange.emit(this.sortBy);
  }
}
