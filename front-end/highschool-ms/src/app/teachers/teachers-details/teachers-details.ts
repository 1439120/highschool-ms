import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import BreadcrumbModel from '../../models/BreadcrumbModel';


@Component({
  selector: 'app-teachers-details',
  imports: [Breadcrumb],
  templateUrl: './teachers-details.html',
  styleUrl: './teachers-details.scss',
})
export class TeachersDetails {
  private route = inject(ActivatedRoute);
  // teacherId = toSignal
  teacherId!: string;
  breadCrumb!: BreadcrumbModel[];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.teacherId = this.route.snapshot.paramMap.get('id')!;
    console.log("Teacher ID: ", this.teacherId)
    this.breadCrumb  = [{name: 'Teachers', url:'/teachers'},{name: `Teacher ${this.teacherId}`, url:''}]
  }
}
