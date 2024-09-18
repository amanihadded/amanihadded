// src/app/services/project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:9093/projects/'; // 

  constructor(private http: HttpClient) { }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl+"add", project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+"delete/"+id);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(this.apiUrl+"getProjectById/"+id);
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl+"all")
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(this.apiUrl+"update/"+id, project);
  }
}
