import { Routes } from "@angular/router";
import { SubjectPlanDetails } from "./subject-plan-details/subject-plan-details";

export const SUBJECTPLAN_ROUTES: Routes = [
    {
        path: '',
        loadComponent: ()=>{
            return import('./subject-plan').then((m) => m.SubjectPlan)
        },
    },
     {
        path: ':id',
        component: SubjectPlanDetails
    }
]