import { Component, computed, EventEmitter, input, Input, Output } from '@angular/core';
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

  searchItems = input<string[]>([]);
  tableTitle = input('')

  searchByPlaceholder = computed(() => {
    return `Search ${this.tableTitle().toLocaleLowerCase()} by ${this.searchItems().slice(0,3).join(',').replaceAll('_',' ').replaceAll(',',', ')}...`
  })

  onChangeSearch(){
    this.onSearch.emit(this.searchQuery);
    console.log(`Search query emitted ${this.searchQuery}`)
  }

  clearSearch(){
    this.searchQuery='';
  }
}
