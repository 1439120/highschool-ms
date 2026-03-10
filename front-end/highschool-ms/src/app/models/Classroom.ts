import Grades from "./Grades"
import { User } from "./User"

export interface Classroom{
    id: number,
    name: string,
    grade: Grades,
    classTeacher: User,
    maximumOccupants: number,
    registeredStudents: number,
    numberOfSubjecteds: number,
    academicYear: number,
    roomNumber: string
    learners: User[],
    [key: string]: any
}

export interface UserClassesModel{
    usersId: number,
    class: Classroom
}