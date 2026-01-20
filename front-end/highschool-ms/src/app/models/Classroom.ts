export default interface Classroom{
    id: number,
    name: string,
    grade: number,
    class_teacher: string,
    maximum_occupants: number,
    regsitered_students: number,
    number_of_subjecteds: number,
    [key: string]: any
}