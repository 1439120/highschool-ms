export interface Topic {
  id?: string;
  name: string;
  startWeek: number;
  endWeek: number;
  progress: number;
  objectives: string[];
  lessons: {
    name: string;
    duration: number;
    status: 'completed' | 'in-progress' | 'pending';
  }[];
  resources: number;
  assessments: number;
  lessonPlanId?: number;
}
