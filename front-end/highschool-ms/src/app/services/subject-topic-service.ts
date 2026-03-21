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
}
