import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.scss',
})
export class Searchbar {
  @Input() searchQuery : string = '';

  @Output() onSearch = new EventEmitter<string>();

  onChangeSearch(){
    this.onSearch.emit(this.searchQuery);
    console.log(`Search query emitted ${this.searchQuery}`)
  }

  clearSearch(){
    this.searchQuery='';
  }
}
