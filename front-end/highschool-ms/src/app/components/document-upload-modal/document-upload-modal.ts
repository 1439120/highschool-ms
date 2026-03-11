import { Component, computed, ElementRef, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { UploadedFile } from '../../models/UploadFile';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-document-upload-modal',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './document-upload-modal.html',
  styleUrl: './document-upload-modal.scss',
})
export class DocumentUploadModal {
    @Output() close = new EventEmitter<void>();
    @Output() filesUploaded = new EventEmitter<UploadedFile[]>();
    @Output() fileSelected = new EventEmitter<File[]>();

    @Input() title: string = 'Upload Documents';
    @Input() maxFileSize: number = 2; // MB
    @Input() acceptedFileTypes: string[] = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.xlsx', '.pptx'];
    @Input() maxFiles: number = 10;
    @Input() allowMultiple: boolean = true;
    @Input() uploadUrl?: string;
    @Input() autoUpload: boolean = false;

    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    // State
    uploadedFiles = signal<UploadedFile[]>([]);
    isDragging = signal<boolean>(false);
    isUploading = signal<boolean>(false);
    uploadProgress = signal<number>(0);
    error = signal<string | null>(null);
    searchTerm = signal<string>('');
    selectedTab = signal<'all' | 'uploading' | 'completed'>('all');
    // File categories
    readonly fileCategories = {
      images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
      documents: ['.pdf', '.doc', '.docx', '.txt', '.rtf'],
      spreadsheets: ['.xls', '.xlsx', '.csv'],
      presentations: ['.ppt', '.pptx'],
      archives: ['.zip', '.rar', '.7z'],
      videos: ['.mp4', '.avi', '.mov', '.wmv'],
      audio: ['.mp3', '.wav', '.ogg']
    };
    // Computed values
    readonly totalSize = computed(() => {
      return this.uploadedFiles().reduce((acc, file) => acc + file.size, 0);
    });
    readonly formattedTotalSize = computed(() => {
      return this.formatFileSize(this.totalSize());
    });
    readonly completedCount = computed(() => {
      console.log("filter: ", this.uploadedFiles())
      return this.uploadedFiles().filter(f => f.status === 'success').length;
    });
    readonly failedCount = computed(() => {
      return this.uploadedFiles().filter(f => f.status === 'error').length;
    });
    readonly uploadingCount = computed(() => {
      return this.uploadedFiles().filter(f => f.status === 'uploading').length;
    });
    readonly pendingFilesCount = computed(() => {
      return this.uploadedFiles().filter(f => f.status === 'pending').length;
    });
    readonly filteredFiles = computed(() => {
      const files = this.uploadedFiles();
      const term = this.searchTerm().toLowerCase();
      const tab = this.selectedTab();
      
      return files.filter(file => {
        // Filter by search term
        const matchesSearch = term === '' || 
          file.name.toLowerCase().includes(term) ||
          file.type.toLowerCase().includes(term);
        
        // Filter by tab
        const matchesTab = tab === 'all' || 
          (tab === 'uploading' && file.status === 'uploading') ||
          (tab === 'completed' && (file.status === 'success' || file.status === 'error'));
        
        return matchesSearch && matchesTab;
      });
    });
    readonly canAddMore = computed(() => {
      return this.uploadedFiles().length < this.maxFiles;
    });

    // File type helpers
    getFileIcon(fileType: string): string {
      if (fileType.includes('pdf')) return '📄';
      if (fileType.includes('image')) return '🖼️';
      if (fileType.includes('word') || fileType.includes('document')) return '📝';
      if (fileType.includes('excel') || fileType.includes('sheet')) return '📊';
      if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📽️';
      if (fileType.includes('zip') || fileType.includes('archive')) return '📦';
      if (fileType.includes('video')) return '🎬';
      if (fileType.includes('audio')) return '🎵';
      return '📎';
    }
    getFileColorClass(fileType: string): string {
      if (fileType.includes('pdf')) return 'pdf';
      if (fileType.includes('image')) return 'image';
      if (fileType.includes('word')) return 'word';
      if (fileType.includes('excel')) return 'excel';
      if (fileType.includes('powerpoint')) return 'powerpoint';
      return 'default';
    }
    formatFileSize(bytes: number): string {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    formatDate(date: Date): string {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    }

    // File selection methods
    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        this.processFiles(Array.from(input.files));
      }
    }

    onDragOver(event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();
      this.isDragging.set(true);
    }
    onDragLeave(event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();
      this.isDragging.set(false);
    }

    onDrop(event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();
      this.isDragging.set(false);
      
      const files = event.dataTransfer?.files;
      if (files) {
        this.processFiles(Array.from(files));
      }
    }
    processFiles(files: File[]) {
      this.error.set(null);
      
      // Check max files limit
      if (this.uploadedFiles().length + files.length > this.maxFiles) {
        this.error.set(`You can only upload up to ${this.maxFiles} files`);
        return;
      }

      const newFiles: UploadedFile[] = [];
      
      for (const file of files) {
        // Check file size
        if (file.size > this.maxFileSize * 1024 * 1024) {
          this.error.set(`File "${file.name}" exceeds ${this.maxFileSize}MB limit`);
          continue;
        }
        
        // Check file type
        const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
        if (!this.acceptedFileTypes.includes(fileExt)) {
          this.error.set(`File type "${fileExt}" is not allowed`);
          continue;
        }
        
        // Check for duplicates
        const exists = this.uploadedFiles().some(f => 
          f.name === file.name && f.size === file.size
        );
        
        if (exists) {
          this.error.set(`File "${file.name}" already exists`);
          continue;
        }
        
        newFiles.push({
          id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'pending',
          file: file,
          lastModified: new Date(file.lastModified)
        });
      }
      
      if (newFiles.length > 0) {
        this.uploadedFiles.update(files => [...files, ...newFiles]);
        this.fileSelected.emit(newFiles.map(f => f.file!));
        
        if (this.autoUpload) {
          this.uploadFiles(newFiles);
        }
      }
      
      // Reset file input
      if (this.fileInput) {
        this.fileInput.nativeElement.value = '';
      }
    }

    // File management methods
    removeFile(index: number) {
      this.uploadedFiles.update(files => files.filter((_, i) => i !== index));
    }

    clearAll() {
      if (confirm('Are you sure you want to remove all files?')) {
        this.uploadedFiles.set([]);
      }
    }

    retryFile(file: UploadedFile) {
      file.status = 'pending';
      file.progress = 0;
      file.errorMessage = undefined;
      this.uploadFiles([file]);
    }

    // Upload methods
    uploadFiles(files: UploadedFile[] = this.uploadedFiles()) {
      const filesToUpload = files.filter(f => f.status === 'pending');
      console.log(this.completedCount())
      if (filesToUpload.length === 0) return;
      
      this.isUploading.set(true);
      
      // Simulate upload progress (replace with actual HTTP upload)
      filesToUpload.forEach(file => {
        file.status = 'success';
        file.progress = 0;
        console.log("file ", file)
        
        // Simulate progress
        const interval = setInterval(() => {
          if (file.progress! < 90) {
            file.progress = (file.progress || 0) + 10;
            this.updateOverallProgress();
          } else {
            clearInterval(interval);
          }
        }, 1);
        
        // Simulate completion (replace with actual HTTP call)
        setTimeout(() => {
          clearInterval(interval);
          file.status = 'success';
          file.progress = 100;
          file.url = '#';
          this.updateOverallProgress();

          // Update the signal to recompute
          this.uploadedFiles.update(files => 
            files.map(f => {
              if (f.id === file.id) {
                return { ...f, status: 'success' }; // Create a new object reference
              }
              return f;
            })
          );

          // Check if all done
          if (this.uploadedFiles().every(f => f.status === 'success' || f.status === 'error')) {
            this.isUploading.set(false);
          }
        }, 1);
      });

        
      
      // // Simulate occasional error (for demo)
      // setTimeout(() => {
      //   const randomFile = filesToUpload.find(f => Math.random() > 0.7);
      //   if (randomFile) {
      //     randomFile.status = 'error';
      //     randomFile.errorMessage = 'Upload failed. Please try again.';
      //   }
      // }, 2000);
    }

    private updateOverallProgress() {
      const files = this.uploadedFiles();
      const totalProgress = files.reduce((acc, f) => acc + (f.progress || 0), 0);
      this.uploadProgress.set(totalProgress / files.length);
    }

    startUpload() {
      this.uploadFiles();
    }

     // Modal actions
    confirmUpload() {
      const successfulFiles = this.uploadedFiles().filter(f => f.status === 'success');
      this.filesUploaded.emit(successfulFiles);
      this.closeModal();
    }

    closeModal() {
      if (this.isUploading()) {
        if (confirm('Upload in progress. Are you sure you want to cancel?')) {
          this.close.emit();
        }
      } else {
        this.close.emit();
      }
    }

    // Tab switching
    setTab(tab: 'all' | 'uploading' | 'completed') {
      this.selectedTab.set(tab);
    }

    clearSearch() {
      this.searchTerm.set('');
    }

  }
