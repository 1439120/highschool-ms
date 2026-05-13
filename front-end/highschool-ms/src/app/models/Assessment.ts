import { Topic } from "./Topic";

export interface Assessment{
    id: number,
    name: string,
    term: number,
    type: 'quiz'| 'test' | 'exam' | 'assignment' | 'project' | 'presentation',
    due_date: Date,
    topics: Topic[],
    duration: number,
    weight: number
}