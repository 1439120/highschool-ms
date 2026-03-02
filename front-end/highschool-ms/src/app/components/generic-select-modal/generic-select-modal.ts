import { Component, computed, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface SelectableItem {
  id: number | string;
  name: string;
  [key: string]: any;
}

@Component({
  selector: 'app-generic-select-modal',
  imports: [FormsModule],
  templateUrl: './generic-select-modal.html',
  styleUrl: './generic-select-modal.scss',
})
export class GenericSelectModal<T extends SelectableItem> implements OnInit {
    @Output() close = new EventEmitter<void>();
    @Output() itemSelected = new EventEmitter<T>();
    
    // Input properties for customization
    @Input() title: string = 'Select Item';
    @Input() icon: string = '➕';
    @Input() searchPlaceholder: string = 'Search...';
    @Input() noResultsMessage: string = 'No items found';
    @Input() emptyStateMessage: string = 'No items available';
    @Input() displayField: string = 'name';
    @Input() subtitleField: string = ''; // Optional second field to display
    @Input() secondaryFields: string[] = []; // Additional fields to search in
    @Input() loadItems!: () => Promise<T[]> | T[]; // Function to load items
    @Input() getItemIcon?: (item: T) => string; // Optional function to get icon for item
    @Input() getItemSubtitle?: (item: T) => string; // Optional function to get subtitle
    @Input() filterFunction?: (item: T, term: string) => boolean; // Custom filter function

    // searchTerm: string = '';
    searchTerm = signal<string>('');
    selectedItem: T | null = null;
    items = signal<T[]>([]);
    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);

    // Filtered items based on search
    filteredItems = computed(() => {
        const items = this.items();
        // console.log("search term: ", this.searchTerm())
        if (!this.searchTerm().trim()) {
            return items;
        }
        
        const term = this.searchTerm().toLowerCase();
        
        // Use custom filter if provided
        if (this.filterFunction) {
            return items.filter(item => this.filterFunction!(item, term));
        }
        
        // Default filtering
        return items.filter(item => {
            // Search in display field
            const displayValue = String(item[this.displayField] || '').toLowerCase();
            if (displayValue.includes(term)) return true;
            
            // Search in subtitle field if provided
            if (this.subtitleField) {
                const subtitleValue = String(item[this.subtitleField] || '').toLowerCase();
                if (subtitleValue.includes(term)) return true;
            }
            
            // Search in secondary fields
            for (const field of this.secondaryFields) {
                const fieldValue = String(item[field] || '').toLowerCase();
                if (fieldValue.includes(term)) return true;
            }
            
            return false;
        });
    });

    ngOnInit() {
        this.loadItemsData();
    }

    async loadItemsData() {
        this.isLoading.set(true);
        this.error.set(null);
        
        try {
            const items = await this.loadItems();
            this.items.set(items);
        } catch (err) {
            console.error('Error loading items:', err);
            this.error.set('Failed to load items. Please try again.');
        } finally {
            this.isLoading.set(false);
        }
    }

    filterItems() {
        // Computed property automatically updates
        // console.log("what to do", this.searchTerm())
        // this.filteredItems()
    }

    clearSearch() {
        this.searchTerm.set('');
    }

    selectItem(item: T) {
        this.selectedItem = item;
    }

    getItemDisplayValue(item: T): string {
        return String(item[this.displayField] || '');
    }

    getItemSubtitleValue(item: T): string {
        if (this.getItemSubtitle) {
            return this.getItemSubtitle(item);
        }
        if (this.subtitleField) {
            return String(item[this.subtitleField] || '');
        }
        return '';
    }

    getItemIconValue(item: T): string {
        if (this.getItemIcon) {
            return this.getItemIcon(item);
        }
        return '📄'; // Default icon
    }

    addSelectedItem() {
        if (this.selectedItem) {
            this.itemSelected.emit(this.selectedItem);
            this.closeModal();
        }
    }

    closeModal() {
        this.close.emit();
    }

    retryLoading() {
        this.loadItemsData();
    }
}