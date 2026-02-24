import { Routes } from "@angular/router";
import { StudentsDetails } from "./students-details/students-details";


export const STUDENTS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: ()=>{
            return import('./students').then((m) => m.Students)
        },
    },
     {
        path: ':id',
        component: StudentsDetails
    }
]