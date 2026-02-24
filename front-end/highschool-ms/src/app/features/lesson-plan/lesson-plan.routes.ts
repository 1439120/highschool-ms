import { Routes } from "@angular/router";
import { LessonPlanDetails } from "./lesson-plan-details/lesson-plan-details";


export const LESSONPLAN_ROUTES: Routes = [
    {
        path: '',
        loadComponent: ()=>{
            return import('./lesson-plan').then((m) => m.LessonPlan)
        },
    },
     {
        path: ':id',
        component: LessonPlanDetails
    }
]