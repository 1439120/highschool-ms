import { Component, EventEmitter, Output, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface AvailableClass {
    id: number;
    name: string;
    grade: number;
    teacher: string;
    studentCount: number;
    subjectCount: number;
    room?: string;
}

@Component({
    selector: 'app-addclass-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './addclass-modal.html',
    styleUrls: ['./addclass-modal.scss']
})
export class AddclassModal {
    @Output() close = new EventEmitter<void>();
    @Output() classSelected = new EventEmitter<AvailableClass>();

    searchTerm: string = '';
    selectedClass: AvailableClass | null = null;
    
    // Mock available classes - replace with actual data from service
    private availableClasses: AvailableClass[] = [
        { id: 1, name: 'Grade 8A', grade: 8, teacher: 'Alice Mbatha', studentCount: 28, subjectCount: 8, room: '201' },
        { id: 2, name: 'Grade 8B', grade: 8, teacher: 'John Smith', studentCount: 26, subjectCount: 8, room: '202' },
        { id: 3, name: 'Grade 9A', grade: 9, teacher: 'Priya Patel', studentCount: 30, subjectCount: 9, room: '105' },
        { id: 4, name: 'Grade 9B', grade: 9, teacher: 'Maria Garcia', studentCount: 27, subjectCount: 9, room: '106' },
        { id: 5, name: 'Grade 10A', grade: 10, teacher: 'David Wilson', studentCount: 25, subjectCount: 10, room: '301' },
        { id: 6, name: 'Grade 10B', grade: 10, teacher: 'Sarah Johnson', studentCount: 29, subjectCount: 10, room: '302' },
        { id: 7, name: 'Grade 11A', grade: 11, teacher: 'Michael Brown', studentCount: 24, subjectCount: 11, room: '401' },
        { id: 8, name: 'Grade 11B', grade: 11, teacher: 'Linda Davis', studentCount: 23, subjectCount: 11, room: '402' },
        { id: 9, name: 'Grade 12A', grade: 12, teacher: 'Robert Taylor', studentCount: 22, subjectCount: 12, room: '501' },
        { id: 10, name: 'Grade 12B', grade: 12, teacher: 'Jennifer Lee', studentCount: 21, subjectCount: 12, room: '502' },
    ];

    // Filtered classes based on search
    filteredClasses = computed(() => {
        if (!this.searchTerm.trim()) {
            return this.availableClasses;
        }
        
        const term = this.searchTerm.toLowerCase();
        return this.availableClasses.filter(c => 
            c.name.toLowerCase().includes(term) ||
            c.teacher.toLowerCase().includes(term) ||
            `grade ${c.grade}`.includes(term) ||
            c.room?.toLowerCase().includes(term)
        );
    });

    filterClasses() {
        // Signal automatically updates due to computed property
    }

    clearSearch() {
        this.searchTerm = '';
    }

    selectClass(classItem: AvailableClass) {
        this.selectedClass = classItem;
    }

    addSelectedClass() {
        if (this.selectedClass) {
            this.classSelected.emit(this.selectedClass);
            this.closeModal();
        }
    }

    closeModal() {
        this.close.emit();
    }
}