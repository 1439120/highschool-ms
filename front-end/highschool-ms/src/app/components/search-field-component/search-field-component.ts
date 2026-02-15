import { Component, Input, Output, EventEmitter, forwardRef, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

export interface SearchItem {
  id: number | string;
  name: string;
  email?: string;
  subtitle?: string;
  avatar?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-search-field-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-field-component.html',
  styleUrls: ['./search-field-component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchFieldComponent),
      multi: true
    }
  ]
})
export class SearchFieldComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() placeholder: string = 'Search...';
  @Input() icon: string = '🔍';
  @Input() items: SearchItem[] = []; // For static items
  @Input() searchFn?: (term: string) => Promise<SearchItem[]>; // For dynamic API search
  @Input() minChars: number = 0;
  @Input() debounceTime: number = 400;
  @Input() clearOnSelect: boolean = false;
  @Input() allowAddNew: boolean = false;
  @Input() addNewText: string = 'Add New';
  @Input() noResultsText: string = 'No results found';
  @Input() loadingText: string = 'Searching...';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() displayField: string = 'name';
  @Input() subtitleField: string = 'email';
  @Input() avatarField: string = 'avatar';
  @Input() showAvatars: boolean = true;

  @Output() itemSelected = new EventEmitter<SearchItem>();
  @Output() addNew = new EventEmitter<string>();
  @Output() searchStarted = new EventEmitter<string>();
  @Output() searchCompleted = new EventEmitter<SearchItem[]>();

  // State
  searchTerm: string = '';
  searchResults: SearchItem[] = [];
  selectedItem: SearchItem | null = null;
  isSearching = signal<boolean>(false);
  showResults = signal<boolean>(false);
  hasFocus = signal<boolean>(false);

  // Search debouncing
  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  // ControlValueAccessor
  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngOnInit() {
    this.setupSearch();
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
  }

  private setupSearch() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    ).subscribe(async term => {
      await this.performSearch(term);
    });
  }

  private async performSearch(term: string) {
    if (!term || term.length < this.minChars) {
      this.searchResults = [];
      this.isSearching.set(false);
      this.searchCompleted.emit([]);
      return;
    }

    this.isSearching.set(true);
    this.searchStarted.emit(term);

    try {
      let results: SearchItem[] = [];
      
      if (this.searchFn) {
        // Use custom search function (API call)
        results = await this.searchFn(term);
      } else {
        // Filter static items
        results = this.filterStaticItems(term);
      }

      this.searchResults = results;
      this.searchCompleted.emit(results);
      this.isSearching.set(false);
    } catch (error) {
      console.error('Search error:', error);
      this.searchResults = [];
    } finally {
      this.isSearching.set(false);
    }
  }

  private filterStaticItems(term: string): SearchItem[] {
    if (!this.items || !term) return [];
    
    const searchTerm = term.toLowerCase();
    return this.items.filter(item => 
      item.name?.toLowerCase().includes(searchTerm) ||
      item.email?.toLowerCase().includes(searchTerm) ||
      item.subtitle?.toLowerCase().includes(searchTerm) ||
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchTerm)
      )
    );
  }

  // Search trigger
  onSearchInput() {
    this.searchSubject.next(this.searchTerm);
    if (this.searchTerm.length >= this.minChars) {
      this.showResults.set(true);
    } else {
      this.showResults.set(false);
    }
  }

  onFocus() {
    this.hasFocus.set(true);
    if (this.searchTerm.length >= this.minChars) {
      this.showResults.set(true);
    }
  }

  onBlur() {
    // Delay to allow click events on results
    setTimeout(() => {
      this.hasFocus.set(false);
      if (!this.selectedItem) {
        this.showResults.set(false);
      }
    }, 200);
  }

  // Select item
  selectItem(item: SearchItem) {
    this.selectedItem = item;
    this.searchTerm = item[this.displayField] || item.name;
    this.showResults.set(false);
    
    // Update form value
    this.onChange(item.id);
    this.itemSelected.emit(item);
    
    if (this.clearOnSelect) {
      this.searchTerm = '';
    }
  }

  // Clear selection
  clearSelection() {
    this.selectedItem = null;
    this.searchTerm = '';
    this.onChange(null);
  }

  // Add new item
  onAddNew() {
    this.addNew.emit(this.searchTerm);
    this.showResults.set(false);
  }

  // Get avatar text (initials)
  getInitials(item: SearchItem): string {
    const name = item[this.displayField] || item.name || '';
    const surname = item['surname'] || item.name || '';
    return name.concat(` ${surname}`)
      .split(' ')
      .map((word: string) => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value) {
      // If we have items, find and set the selected item
      if (this.items.length > 0) {
        const item = this.items.find(i => i.id === value);
        if (item) {
          this.selectedItem = item;
          this.searchTerm = item[this.displayField] || item.name;
        }
      } else {
        // If no items, just set the value
        this.selectedItem = { id: value, name: value } as SearchItem;
      }
    } else {
      this.selectedItem = null;
      this.searchTerm = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}