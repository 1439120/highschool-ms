import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SubjectsModel } from '../models/SubjectsModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5068/api/subjects';
  isLoading = signal<boolean>(false)
  subjects = signal<SubjectsModel[]>([])

  loadSubjects(gradeId: number): Observable<SubjectsModel[]> {
    return this.http.get<SubjectsModel[]>(`${this.apiUrl}`,{
      params: {Grade: gradeId}
    });
  }
  searchSubjects(searchTerm: string, gradeId: number): Observable<SubjectsModel[]> {
    if(!searchTerm.trim().length) return this.loadSubjects(gradeId);

    return this.http.get<SubjectsModel[]>(`${this.apiUrl}`,{
      params: { Name: searchTerm, Grade: gradeId}
    });
  }
}
