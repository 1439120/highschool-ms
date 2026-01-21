import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  imports: [],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  titleBreadcrumbs = input<string[]>(['Teachers','Nomsa Mthembu'])
  refreshData(){

  }
  addNew(){
    
  }
}
