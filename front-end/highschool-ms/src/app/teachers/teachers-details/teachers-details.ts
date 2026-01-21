import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import BreadcrumbModel from '../../models/BreadcrumbModel';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-teachers-details',
  imports: [Breadcrumb],
  templateUrl: './teachers-details.html',
  styleUrl: './teachers-details.scss',
  providers: [DatePipe]
})
export class TeachersDetails {
  private route = inject(ActivatedRoute);
  // teacherId = toSignal
  teacherId!: string;
  breadCrumb!: BreadcrumbModel[];
  teacher: any = null;

  constructor(
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.teacherId = this.route.snapshot.paramMap.get('id')!;
    console.log("Teacher ID: ", this.teacherId)
    this.breadCrumb  = [{name: 'Teachers', url:'/teachers'},{name: `Teacher ${this.teacherId}`, url:''}]
    this.loadTeacherData();
  }

  loadTeacherData() {
    this.teacher = {
      id: 9093,
      name: 'Alice',
      surname: 'Mbatha',
      phone: '012 111 2233',
      email: 'alice@mail.com',
      role: 'Admin',
      address: '123 Avenue',
      date_of_birth: new Date('1985-05-15'),
      expect_subjects: ['maths', 'physics', 'life science'],
      assigned_classes: ['Grade 12 A', 'Grade 12 B', 'Grade 10 A'],
      assigned_subjects: [
        'Grade 12 A - Maths',
        'Grade 12 A - Physics',
        'Grade 12 B - Maths',
        'Grade 12 B - Physics'
      ]
    };
  }

  getRoleClass(role: string): string {
    const roleMap: {[key: string]: string} = {
      'Admin': 'admin',
      'User': 'user',
      'Editor': 'editor',
      'Teacher': 'user'
    };
    return roleMap[role] || 'user';
  }

    calculateAge(birthDate: Date): number {
      if (!birthDate) return 0;
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      
      return age;
    }

    // Format date for display
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'longDate') || '';
  }

}
