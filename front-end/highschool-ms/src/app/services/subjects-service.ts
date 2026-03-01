import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SubjectsModel } from '../models/SubjectsModel';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5068/api/subjects';
  isLoading = signal<boolean>(false)
  subjects = signal<SubjectsModel[]>([])

  loadSubjects(){
    this.isLoading.set(true);
       
        this.http.get<SubjectsModel[]>(this.apiUrl).subscribe({
            next: (data) => {
                this.subjects.set(data);
                this.isLoading.set(false);
            },
            error: () => this.isLoading.set(false)
        });
  }
}
