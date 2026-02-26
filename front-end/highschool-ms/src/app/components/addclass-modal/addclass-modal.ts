import { Component, EventEmitter, Output, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClassroomService } from '../../services/classroom-service';
import { Classroom } from '../../models/Classroom';

@Component({
    selector: 'app-addclass-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './addclass-modal.html',
    styleUrls: ['./addclass-modal.scss']
})
export class AddclassModal {
    @Output() close = new EventEmitter<void>();
    @Output() classSelected = new EventEmitter<Classroom>();

    searchTerm: string = '';
    selectedClass: Classroom | null = null;

    constructor(private service: ClassroomService){
        this.service.loadClassrooms();
    }

    // Filtered classes based on search
    filteredClasses = computed(() => {
        if (!this.searchTerm.trim()) {
            return this.service.classrooms();
        }
        
        const term = this.searchTerm.toLowerCase();
        return this.service.classrooms().filter(c => 
            c.name.toLowerCase().includes(term) ||
            c.classTeacher.name.toLowerCase().includes(term) ||
            `grade ${c.grade.name}`.includes(term) ||
            c.roomNumber?.toLowerCase().includes(term)
        );
    });

    filterClasses() {
        // Signal automatically updates due to computed property
    }

    clearSearch() {
        this.searchTerm = '';
    }

    selectClass(classItem: Classroom) {
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