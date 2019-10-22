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

  getTasks(notes) {
    return this.http.get<Task[]> (this.baseUrl + 'TaskMaster/Get',
      {
        params: {
          projectId: notes.Project.projectId,
          testId: notes.Test.testId
        }
      });
  }

  getNotes(notes) {
    return this.http.get<Note[]> (this.baseUrl + 'Notes/Get',
      {
        params: {
          projectId: notes.Project.projectId,
          testId: notes.Test.testId,
          taskId: notes.Task.Id
        }
      });
  }

  saveNotes(NotestList: Note[]) {
    return this.http.post(this.baseUrl + 'Notes/Insert', JSON.stringify(NotestList));
  }

}
