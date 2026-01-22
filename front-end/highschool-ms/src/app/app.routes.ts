import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: ()=>{
            return import('./dashboard/dashboard').then((m) => m.Dashboard)
        }
    },{
        path: 'teachers',
        loadChildren: () => import('./teachers/teachers.routes').then(m => m.TEACHERS_ROUTES)
    },
    {
        path: 'students',
        loadChildren: ()=>{
            return import('./students/students.routes').then((m) => m.STUDENTS_ROUTES)
        }
    },
    {
        path: 'classes',
        loadChildren: ()=>{
            return import('./classrooms/classrooms.routes').then((m) => m.CLASSROOMS_ROUTES)
        }
    },
    {
        path: 'settings',
        loadComponent: ()=>{
            return import('./configurations/configurations').then((m) => m.Configurations)
        }
    }
];
