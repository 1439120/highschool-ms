import { Routes } from "@angular/router";
import { TeachersDetails } from "./teachers-details/teachers-details";

export const TEACHERS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: ()=>{
            return import('../teachers/teachers').then((m) => m.Teachers)
        },
    },
     {
        path: ':id',
        component: TeachersDetails
    }
]