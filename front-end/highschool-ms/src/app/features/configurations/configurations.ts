import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configurations',
  imports: [FormsModule],
  templateUrl: './configurations.html',
  styleUrl: './configurations.scss',
})
export class Configurations {
  hasUnsavedChanges = false;
  showSaveModal = false;
  newSubject = '';
  
  // Original configuration for comparison
  originalConfig: any = {};
  
  // Current configuration
  config: any = {
    school: {
      name: 'Mambane Secondary School',
      phone: '011 734 8899',
      email: 'mambane@gmail.com',
      website: 'www.mambane.co.za',
      address: '123 Education Street, Mambane, South Africa',
      motto: 'Excellence Through Education',
      establishedYear: 1995,
      logoUrl: ''
    },
    academic: {
      minGrade: 8,
      maxGrade: 12,
      currentYear: new Date().getFullYear(),
      termsPerYear: 4,
      maxClassSize: 40,
      startTime: '07:30',
      endTime: '14:30',
      defaultSubjects: [
        'Mathematics',
        'English',
        'Physical Sciences',
        'Life Sciences',
        'Geography',
        'History',
        'Accounting',
        'Business Studies',
        'Life Orientation',
        'Technology'
      ]
    },
    statistics: {
      teachers: 200,
      adminStaff: 50,
      students: 800,
      classes: 40
    },
    system: {
      dateFormat: 'DD/MM/YYYY',
      timeZone: 'Africa/Johannesburg',
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      sessionTimeout: 30,
      twoFactorAuth: false,
      ipRestriction: false
    },
    additional: {
      contacts: [
        { role: 'Principal', name: 'Dr. Thabo Molefe', email: 'principal@mambane.co.za', phone: '011 734 8801' },
        { role: 'Deputy Principal', name: 'Mrs. Nomsa Dlamini', email: 'deputy@mambane.co.za', phone: '011 734 8802' },
        { role: 'Administrator', name: 'Mr. Sipho Nkosi', email: 'admin@mambane.co.za', phone: '011 734 8803' }
      ],
      facilities: {
        library: true,
        computerLab: true,
        scienceLab: true,
        sportsField: true,
        auditorium: true,
        cafeteria: true,
        busService: true,
        wifi: true,
        security: true,
        medical: true
      },
      description: 'Mambane Secondary School is a leading educational institution committed to providing quality education in a nurturing environment. We focus on academic excellence, character development, and preparing students for future success.'
    }
  };
  
  // Options for dropdowns
  gradeOptions = [7, 8, 9, 10, 11, 12];
  academicYearOptions: number[] = [];
  termOptions = [
    { value: 2, label: '2 Terms (Semesters)' },
    { value: 3, label: '3 Terms (Trimesters)' },
    { value: 4, label: '4 Terms (Quarters)' }
  ];
  facilityOptions = [
    { value: 'library', label: 'Library', icon: '📚' },
    { value: 'computerLab', label: 'Computer Lab', icon: '💻' },
    { value: 'scienceLab', label: 'Science Lab', icon: '🔬' },
    { value: 'sportsField', label: 'Sports Field', icon: '⚽' },
    { value: 'auditorium', label: 'Auditorium', icon: '🎭' },
    { value: 'cafeteria', label: 'Cafeteria', icon: '🍽️' },
    { value: 'busService', label: 'Bus Service', icon: '🚌' },
    { value: 'wifi', label: 'Wi-Fi', icon: '📶' },
    { value: 'security', label: 'Security', icon: '🚨' },
    { value: 'medical', label: 'Medical Room', icon: '🏥' }
  ];
  
  constructor() {
    // Generate academic year options (current year ± 5 years)
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      this.academicYearOptions.push(i);
    }
  }
  
  ngOnInit() {
    // Deep clone the original config for comparison
    this.originalConfig = JSON.parse(JSON.stringify(this.config));
  }
  
  markAsChanged() {
    this.hasUnsavedChanges = true;
  }
  
  getSectionStatus(section: string): string {
    const original = JSON.stringify(this.originalConfig[section]);
    const current = JSON.stringify(this.config[section]);
    return original === current ? 'saved' : 'changed';
  }
  
  getChangedFields(): string[] {
    const changed: string[] = [];
    
    // Compare school info
    if (JSON.stringify(this.originalConfig.school) !== JSON.stringify(this.config.school)) {
      changed.push('School Information');
    }
    
    // Compare academic config
    if (JSON.stringify(this.originalConfig.academic) !== JSON.stringify(this.config.academic)) {
      changed.push('Academic Configuration');
    }
    
    // Compare statistics
    if (JSON.stringify(this.originalConfig.statistics) !== JSON.stringify(this.config.statistics)) {
      changed.push('Statistics');
    }
    
    // Compare system settings
    if (JSON.stringify(this.originalConfig.system) !== JSON.stringify(this.config.system)) {
      changed.push('System Settings');
    }
    
    // Compare additional info
    if (JSON.stringify(this.originalConfig.additional) !== JSON.stringify(this.config.additional)) {
      changed.push('Additional Information');
    }
    
    return changed;
  }
  
  addSubject() {
    if (this.newSubject.trim()) {
      this.config.academic.defaultSubjects.push(this.newSubject.trim());
      this.newSubject = '';
      this.markAsChanged();
    }
  }
  
  removeSubject(index: number) {
    this.config.academic.defaultSubjects.splice(index, 1);
    this.markAsChanged();
  }
  
  addContact() {
    this.config.additional.contacts.push({
      role: 'New Contact',
      name: '',
      email: '',
      phone: ''
    });
    this.markAsChanged();
  }
  
  removeContact(index: number) {
    this.config.additional.contacts.splice(index, 1);
    this.markAsChanged();
  }
  
  getGradeDistribution(): any[] {
    const totalStudents = this.config.statistics.students;
    const grades = [];
    
    if (this.config.academic.minGrade && this.config.academic.maxGrade) {
      const gradeRange = this.config.academic.maxGrade - this.config.academic.minGrade + 1;
      const studentsPerGrade = Math.floor(totalStudents / gradeRange);
      
      for (let i = this.config.academic.minGrade; i <= this.config.academic.maxGrade; i++) {
        const count = i === this.config.academic.maxGrade 
          ? totalStudents - (studentsPerGrade * (gradeRange - 1))
          : studentsPerGrade;
        const percentage = Math.round((count / totalStudents) * 100);
        
        grades.push({
          name: `Grade ${i}`,
          count: count,
          percentage: percentage
        });
      }
    }
    
    return grades;
  }
  
  openFilePicker() {
    // In a real app, this would open a file picker dialog
    // For demo purposes, we'll simulate it
    const logoUrl = prompt('Enter logo URL:');
    if (logoUrl) {
      this.config.school.logoUrl = logoUrl;
      this.markAsChanged();
    }
  }
  
  saveConfiguration() {
    this.showSaveModal = true;
  }
  
  confirmSave() {
    // In a real app, save to backend
    console.log('Saving configuration:', this.config);
    
    // Update original config
    this.originalConfig = JSON.parse(JSON.stringify(this.config));
    this.hasUnsavedChanges = false;
    this.showSaveModal = false;
    
    // Show success message
    alert('Configuration saved successfully!');
  }
  
  resetToDefaults() {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      this.config = JSON.parse(JSON.stringify(this.originalConfig));
      this.hasUnsavedChanges = false;
    }
  }
  
  confirmClearData() {
    if (confirm('WARNING: This will permanently delete ALL school data. This action cannot be undone.\n\nAre you absolutely sure?')) {
      if (prompt('Type "DELETE ALL" to confirm:') === 'DELETE ALL') {
        // In real app, call API to clear data
        alert('All data has been cleared.');
      }
    }
  }
  
  exportData() {
    // In real app, generate and download CSV/Excel file
    const dataStr = JSON.stringify(this.config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `mambane-school-config-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert('Configuration exported successfully!');
  }
  
  resetSystem() {
    if (confirm('Reset all system settings to factory defaults? Your data will not be affected.')) {
      // Reset to factory defaults
      const factoryDefaults = {
        school: {
          name: '',
          phone: '',
          email: '',
          website: '',
          address: '',
          motto: '',
          establishedYear: new Date().getFullYear(),
          logoUrl: ''
        },
        academic: {
          minGrade: 8,
          maxGrade: 12,
          currentYear: new Date().getFullYear(),
          termsPerYear: 4,
          maxClassSize: 40,
          startTime: '07:30',
          endTime: '14:30',
          defaultSubjects: []
        },
        statistics: {
          teachers: 0,
          adminStaff: 0,
          students: 0,
          classes: 0
        },
        system: {
          dateFormat: 'DD/MM/YYYY',
          timeZone: 'Africa/Johannesburg',
          emailNotifications: true,
          smsNotifications: true,
          pushNotifications: true,
          sessionTimeout: 30,
          twoFactorAuth: false,
          ipRestriction: false
        },
        additional: {
          contacts: [],
          facilities: {},
          description: ''
        }
      };
      
      this.config = factoryDefaults;
      this.originalConfig = JSON.parse(JSON.stringify(factoryDefaults));
      this.hasUnsavedChanges = false;
      
      alert('System reset to factory defaults!');
    }
  }
}
