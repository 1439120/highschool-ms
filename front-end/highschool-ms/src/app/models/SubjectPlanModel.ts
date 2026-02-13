import Grades from "./Grades";
import { SubjectsModel } from "./SubjectsModel";
import { User } from "./User";

export default interface SubjectPlanModel{
    id: number,
    name: string,
    subject: SubjectsModel,
    createdById: User,
    grade: Grades,
    lastUpdatedOn: Date,
    createdOn: Date,
    year: number,
}