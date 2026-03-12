export interface SubjectTopic{
    name: string,
    startWeek: number,
    endWeek: number,
    progress: number,
    lessonObjectives: LessonObjectives[]
    lessons: Lessons[]
    description: string
}

export interface LessonObjectives{
    name: string,
}

export interface Lessons{
    name: string,
    status: 'new' | 'inprogress' | 'done',
    period: number,
}