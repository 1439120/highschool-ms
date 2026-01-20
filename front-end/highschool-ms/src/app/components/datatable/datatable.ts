import { Component, input, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/User';
import { Filterbar } from '../filterbar/filterbar';
import { Searchbar } from '../searchbar/searchbar';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [CommonModule, FormsModule, Filterbar, Searchbar], // Add FormsModule for ngModel
  templateUrl: './datatable.html',
  styleUrl: './datatable.scss',
})
export class Datatable implements OnInit {
  // inputs
  title = input<string>('Default');
  originalUsers = input<User[]>([])

  // Filter and search properties
  searchQuery = signal('');
  selectedRole = signal('');
  sortBy = signal('name');
  currentPage = signal(1);
  itemsPerPage = 5;
  isLoading = signal(false);
  currentSort = signal('');
  
  // Computed filtered users
  filteredUsers = computed(() => {
    let users = [...this.originalUsers()];
    
    // Apply search filter
    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      users = users.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.surname.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.phone.includes(query)
      );
    }
    
    // Apply role filter
    if (this.selectedRole()) {
      users = users.filter(user => user.role === this.selectedRole());
    }
    
    // Apply sorting
    users.sort((a, b) => {
      switch (this.sortBy()) {
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'role':
          return a.role.localeCompare(b.role);
        case 'date':
          return 0; // Add date field for proper sorting
        default: // 'name'
          return a.name.localeCompare(b.name);
      }
    });
    
    return users;
  });
  
  // Computed properties
  totalUsers = computed(() => this.originalUsers.length);
  totalPages = computed(() => Math.ceil(this.filteredUsers().length / this.itemsPerPage));
  paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredUsers().slice(start, end);
  });
  
  ngOnInit() {
    // Simulate loading
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }
  
  // Search and filter methods
  onSearch() {
    this.currentPage.set(1);
  }

  getSearchQuery(value: string){
    this.searchQuery.set(value);
  }
  
  onFilterChange(newRole: string) {
    console.log("New role changed in parent:", newRole);
    this.selectedRole.set(newRole);
    this.currentPage.set(1);
  }

  getSortByFromChild(newOrderBy: string){
    this.sortBy.set(newOrderBy);
  }
  
  onSortChange() {
    this.currentSort.set(this.sortBy());
  }
  
  clearSearch() {
    this.searchQuery.set('');
    this.onSearch();
  }
  
  clearFilters() {
    this.searchQuery.set('');
    this.selectedRole.set('');
    this.sortBy.set('name');
    this.currentPage.set(1);
  }
  
  // Sorting
  sortByColumn(column: string) {
    if (this.currentSort() === column) {
      this.sortBy.set(column + '_desc');
    } else {
      this.sortBy.set(column);
    }
    this.currentSort.set(this.sortBy().replace('_desc', ''));
    this.onSortChange();
  }
  
  // Pagination
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
    }
  }
  
  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
    }
  }
  
  // User actions
  editUser(user: any) {
    console.log('Edit user:', user);
    // Implement edit logic
  }
  
  deleteUser(user: any) {
    if (confirm(`Are you sure you want to delete ${user.name} ${user.surname}?`)) {
      console.log('Delete user:', user);
      // Implement delete logic
    }
  }
  
  viewUser(user: any) {
    console.log('View user:', user);
    // Implement view logic
  }
  
  refreshData() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }
  
  addNew() {
    console.log('Add new user');
    // Implement add new logic
  }
  
  // Helper methods
  getRoleClass(role: string): string {
    const roleMap: {[key: string]: string} = {
      'Admin': 'admin',
      'User': 'user',
      'Editor': 'editor'
    };
    return roleMap[role] || 'other';
  }
  
  getAvatarColor(name: string): string {
    const colors = [
      'linear-gradient(135deg, #4361ee, #3a0ca3)',
      'linear-gradient(135deg, #7209b7, #560bad)',
      'linear-gradient(135deg, #f72585, #b5179e)',
      'linear-gradient(135deg, #4cc9f0, #4895ef)',
      'linear-gradient(135deg, #2ecc71, #27ae60)',
      'linear-gradient(135deg, #f39c12, #e67e22)'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }
}