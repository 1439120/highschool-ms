export interface Topic {
  id?: string;
  name: string;
  term: number;
  startWeek: number;
  endWeek: number;
  progress: number;
  description: string;
  objectives: {
    name: string
  }[];
  lessons: {
    name: string;
    duration: number;
    status: 'completed' | 'in-progress' | 'pending';
  }[];
  resources: number;
  assessments: number;
  lessonPlanId?: number;
}
