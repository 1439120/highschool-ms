import Grades from "./Grades";
import { SubjectsModel } from "./SubjectsModel";
import { User } from "./User";

export default interface SubjectPlanModel{
    id: number,
    name: string,
    subjects: SubjectsModel,
    responsible: User,
    grades: Grades,
    lastUpdatedOn: Date,
    start: Date,
    end: Date,
}