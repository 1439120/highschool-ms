import Grades from "./Grades";
import { SubjectsModel } from "./SubjectsModel";
import { User } from "./User";

export default interface LessonPlanModel{
    id: number,
    name: string,
    subjects: SubjectsModel,
    responsible: User,
    grades: Grades,
    lastUpdatedOn: Date,
    status: string,
    notes: string,
}