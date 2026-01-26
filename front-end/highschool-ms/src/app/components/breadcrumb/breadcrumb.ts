import { Component, inject, input } from '@angular/core';
import BreadcrumbModel from '../../models/BreadcrumbModel';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  addButton = input(false);
  titleBreadcrumbs = input<BreadcrumbModel[]>([])
  private router = inject(Router)

  refreshData(){

  }
  addNew(){
    // console.log("The printed url is ", this.titleBreadcrumbs()[0].url)
    this.router.navigate(
      [`/${this.titleBreadcrumbs()[0].url}/new`],
      {queryParams: {mode: 'edit'}}
    )
  }

}
