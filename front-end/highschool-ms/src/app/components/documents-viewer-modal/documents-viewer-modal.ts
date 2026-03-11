import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { DocumentFile } from '../../models/UploadFile';
import { FormsModule } from '@angular/forms';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-documents-viewer-modal',
  imports: [FormsModule, DatePipe, TitleCasePipe],
  templateUrl: './documents-viewer-modal.html',
  styleUrl: './documents-viewer-modal.scss',
})
export class DocumentsViewerModal {
  @Output() close = new EventEmitter<void>();
  @Output() documentSelected = new EventEmitter<DocumentFile>();
  @Output() downloadDocument = new EventEmitter<DocumentFile>();
  @Output() deleteDocument = new EventEmitter<DocumentFile>();
  @Output() shareDocument = new EventEmitter<DocumentFile>();
  @Output() starDocument = new EventEmitter<DocumentFile>();

  @Input() title: string = 'Documents Library';
  @Input() documents: DocumentFile[] = [];
  @Input() showFilters: boolean = true;
  @Input() allowSelection: boolean = false;
  @Input() allowDownload: boolean = true;
  @Input() allowDelete: boolean = true;
  @Input() allowShare: boolean = true;
  @Input() allowStar: boolean = true;
  @Input() showGridView: boolean = true;

  // View state
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('all');
  sortBy = signal<'date' | 'name' | 'size' | 'uploader'>('date');
  sortOrder = signal<'asc' | 'desc'>('desc');
  viewMode = signal<'grid' | 'list'>('grid');
  selectedDocument = signal<DocumentFile | null>(null);
  showPreview = signal<boolean>(false);
  selectedTags = signal<string[]>([]);

  // Available filters
  readonly categories = computed(() => {
    const cats = new Set(this.documents.map(d => d.category || 'Uncategorized'));
    return ['all', ...Array.from(cats)];
  });

  readonly allTags = computed(() => {
    const tags = new Set<string>();
    this.documents.forEach(d => d.tags?.forEach(t => tags.add(t)));
    return Array.from(tags);
  });

  // Filtered and sorted documents
  readonly filteredDocuments = computed(() => {
    let docs = [...this.documents];
    const search = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();
    const tags = this.selectedTags();

    // Apply search filter
    if (search) {
      docs = docs.filter(doc => 
        doc.name.toLowerCase().includes(search) ||
        doc.uploadedBy.name.toLowerCase().includes(search) ||
        doc.description?.toLowerCase().includes(search) ||
        doc.tags?.some(t => t.toLowerCase().includes(search))
      );
    }

    // Apply category filter
    if (category !== 'all') {
      docs = docs.filter(doc => (doc.category || 'Uncategorized') === category);
    }

    // Apply tags filter
    if (tags.length > 0) {
      docs = docs.filter(doc => 
        tags.every(tag => doc.tags?.includes(tag))
      );
    }

    // Apply sorting
    const sortField = this.sortBy();
    const order = this.sortOrder() === 'asc' ? 1 : -1;

    docs.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'date':
          comparison = a.uploadDate.getTime() - b.uploadDate.getTime();
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
        case 'uploader':
          comparison = a.uploadedBy.name.localeCompare(b.uploadedBy.name);
          break;
      }
      
      return comparison * order;
    });

    return docs;
  });

  // Statistics
  readonly totalSize = computed(() => {
    return this.documents.reduce((acc, doc) => acc + doc.size, 0);
  });

  readonly totalDocuments = computed(() => this.documents.length);

  readonly categoryCounts = computed(() => {
    const counts: Record<string, number> = {};
    this.documents.forEach(doc => {
      const cat = doc.category || 'Uncategorized';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  });

  readonly recentUploads = computed(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return this.documents.filter(d => d.uploadDate >= sevenDaysAgo).length;
  });

  readonly starredCount = computed(() => {
    return this.documents.filter(d => d.starred).length;
  });

  // Helper methods
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: now.getFullYear() !== date.getFullYear() ? 'numeric' : undefined
    }).format(date);
  }

  getFileIcon(fileType: string): string {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('sheet')) return '📊';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📽️';
    if (fileType.includes('zip') || fileType.includes('archive')) return '📦';
    if (fileType.includes('video')) return '🎬';
    if (fileType.includes('audio')) return '🎵';
    if (fileType.includes('text')) return '📃';
    return '📎';
  }

  getFileColorClass(fileType: string): string {
    if (fileType.includes('pdf')) return 'pdf';
    if (fileType.includes('image')) return 'image';
    if (fileType.includes('word')) return 'word';
    if (fileType.includes('excel')) return 'excel';
    if (fileType.includes('powerpoint')) return 'powerpoint';
    if (fileType.includes('zip')) return 'archive';
    if (fileType.includes('video')) return 'video';
    if (fileType.includes('audio')) return 'audio';
    return 'default';
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  // Actions
  toggleViewMode() {
    this.viewMode.set(this.viewMode() === 'grid' ? 'list' : 'grid');
  }

  toggleSort(field: 'date' | 'name' | 'size' | 'uploader') {
    if (this.sortBy() === field) {
      this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set(field);
      this.sortOrder.set('desc');
    }
  }

  toggleTag(tag: string) {
    const current = this.selectedTags();
    if (current.includes(tag)) {
      this.selectedTags.set(current.filter(t => t !== tag));
    } else {
      this.selectedTags.set([...current, tag]);
    }
  }

  clearFilters() {
    this.searchTerm.set('');
    this.selectedCategory.set('all');
    this.selectedTags.set([]);
  }

  showDocumentPreview(doc: DocumentFile) {
    this.selectedDocument.set(doc);
    this.showPreview.set(true);
  }

  closePreview() {
    this.showPreview.set(false);
    this.selectedDocument.set(null);
  }

  selectDocument(doc: DocumentFile) {
    if (this.allowSelection) {
      this.documentSelected.emit(doc);
    }
  }

  onDownload(doc: DocumentFile, event: Event) {
    event.stopPropagation();
    this.downloadDocument.emit(doc);
  }

  onDelete(doc: DocumentFile, event: Event) {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete "${doc.name}"?`)) {
      this.deleteDocument.emit(doc);
    }
  }

  onShare(doc: DocumentFile, event: Event) {
    event.stopPropagation();
    this.shareDocument.emit(doc);
  }

  onStar(doc: DocumentFile, event: Event) {
    event.stopPropagation();
    doc.starred = !doc.starred;
    this.starDocument.emit(doc);
  }

  closeModal() {
    this.close.emit();
  }

}
