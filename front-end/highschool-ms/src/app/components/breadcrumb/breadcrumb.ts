import { Component, EventEmitter, inject, input, Output } from '@angular/core';
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
  customAddAction = input<(() => void) | null>(null);

  refreshData(){

  }
  addNew() {
    const customFn = this.customAddAction();
    
    if (customFn) {
      // Execute the function passed from the parent
      customFn();
    } else {
      // Default navigation logic
      this.router.navigate(
        [`/${this.titleBreadcrumbs()[0].url}/new`],
        { queryParams: { mode: 'edit' } }
      );
    }
  }

}
