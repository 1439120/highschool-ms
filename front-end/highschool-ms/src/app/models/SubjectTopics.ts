export interface SubjectTopic{
    name: string,
    startWeek: number,
    endWeek: number,
    progress: number,
    lessonObjectives: LessonObjectives[]
    description: string
}

export interface LessonObjectives{
    name: string,
    status: 'new' | 'inprogress' | 'done',
}