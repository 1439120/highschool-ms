import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    loadComponent: ()=>{
        return import('./dashboard/dashboard').then((m) => m.Dashboard)
 }
},
 {
    path: 'teachers',
    loadComponent: ()=>{
        return import('./teachers/teachers').then((m) => m.Teachers)
    }

},
 {
    path: 'students',
    loadComponent: ()=>{
        return import('./students/students').then((m) => m.Students)
    }

}];
