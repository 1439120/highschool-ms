import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Topic } from '../models/Topic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectTopicService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5068/api/subject-topics';

  getSubjectTopics(subjectId: string): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.apiUrl}/${subjectId}`);
  }

  addNewTopic(subjectId: string, topic: Topic): Observable<Topic>{
    const payload = { ...topic, subjectPlanId: parseInt(subjectId)};
    console.log("this is my payload", payload)
    return this.http.post<Topic>(`${this.apiUrl}`, payload)
  }
  editExistingTopic(subjectId: string, topic: Topic): Observable<Topic>{
    const payload = { ...topic, subjectPlanId: parseInt(subjectId)};
    console.log("this is edit topic payload", payload)
    return this.http.put<Topic>(`${this.apiUrl}/${topic.id}`, payload)
  }

  addObjectiveToTopic(topicId: string, objectives: {name: string}[]): Observable<Topic>{
    const payload = objectives.map((data)=> ({ topicId:topicId, name: data.name}));
    console.log("this is my objective payload", payload)
    return this.http.post<Topic>(`${this.apiUrl}/objective/all`, payload)
  }
  removeAllObjectives(topicId: string): Observable<Topic>{
    return this.http.delete<Topic>(`${this.apiUrl}/objective/removeall/${topicId}`)
  }
}
