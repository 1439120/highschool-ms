import { Routes } from "@angular/router";
import { ClassDetails } from "./class-details/class-details";

export const CLASSROOMS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: ()=>{
            return import('../classrooms/classrooms').then((m) => m.Classrooms)
        },
    },
     {
        path: ':id',
        component: ClassDetails
    }
]