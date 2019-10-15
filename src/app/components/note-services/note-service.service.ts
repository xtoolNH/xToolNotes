import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { observable, Observable } from 'rxjs';
import { Note } from '../Models/note';
import { Task } from '../Models/task';
@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(this.baseUrl + 'ProjectMaster');
  }

  getTests(projectIdValue: number) {
    return this.http.post(this.baseUrl + 'TestMaster/GetTestMasterdata', {projectId: projectIdValue});
  }

  getTasks() {
    return this.http.get<Task[]> (this.baseUrl + 'api/taskcontroller');
  }

  getNotes() {
    return this.http.get(this.baseUrl + 'api/notescontroller');
  }

  saveNotes(NotestList: Note[]) {
    return this.http.post(this.baseUrl + 'api/notescontroller', JSON.stringify(NotestList));
  }

}
