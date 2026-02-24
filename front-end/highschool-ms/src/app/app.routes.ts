import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: ()=>{
            return import('./features/dashboard/dashboard').then((m) => m.Dashboard)
        }
    },{
        path: 'teachers',
        loadChildren: () => import('./features/teachers/teachers.routes').then(m => m.TEACHERS_ROUTES)
    },
    {
        path: 'students',
        loadChildren: ()=>{
            return import('./features/students/students.routes').then((m) => m.STUDENTS_ROUTES)
        }
    },
    {
        path: 'classes',
        loadChildren: ()=>{
            return import('./features/classrooms/classrooms.routes').then((m) => m.CLASSROOMS_ROUTES)
        }
    },
    {
        path: 'settings',
        loadComponent: ()=>{
            return import('./features/configurations/configurations').then((m) => m.Configurations)
        }
    },
    {
        path: 'subjects',
        loadComponent: ()=>{
            return import('./features/subjects/subjects').then((m) => m.Subjects)
        }
    },
    {
        path: 'subject-plan',
        loadChildren: ()=>{
            return import('./features/subject-plan/subject-plan.routes').then((m) => m.SUBJECTPLAN_ROUTES)
        }
    },
    {
        path: 'lesson-plan',
        loadChildren: ()=>{
            return import('./features/lesson-plan/lesson-plan.routes').then((m) => m.LESSONPLAN_ROUTES)
        }
    },
];
