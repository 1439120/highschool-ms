import { Component, input, signal } from '@angular/core';
import BreadcrumbModel from '../../models/BreadcrumbModel';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  addButton = input(false);
  titleBreadcrumbs = input<BreadcrumbModel[]>(
    [
      {name: 'Teachers', url:'teachers'},
      {name: 'Nomsa Mthembu', url: ''}
    ]
  )
  refreshData(){

  }
  addNew(){
    
  }

}
