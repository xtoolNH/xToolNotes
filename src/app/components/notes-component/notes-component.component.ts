import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteServiceService } from '../note-services/note-service.service';
import { Note } from '../Models/note';
import { Task } from '../Models/task';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';
import { error } from '@angular/compiler/src/util';


const TASK_DATA: Task[] = [
  { Id: 1, Description: 'Task1', ProjectId: 0 },
  { Id: 2, Description: 'Task2', ProjectId: 0 },
  { Id: 3, Description: 'Task3', ProjectId: 0 },
  { Id: 4, Description: 'Task4', ProjectId: 0 }];


@Component({
  selector: 'app-notes-component',
  templateUrl: './notes-component.component.html',
  styleUrls: ['./notes-component.component.css']
})
export class NotesComponent implements OnInit {
  files = [];
  noteForm: FormGroup;
  userForm: FormGroup;
  submitted: boolean;
  isNewNote = false;
  notesData: { time: string, task: string, note: string }[] = [];
  count = 0;
  editField: string;
  noteList: any;
  noteListToSave: Note[] = [];
  hide: boolean;
  showNotes = false;
  currentTime: any;
  isEditNote = false;
  userName: string;
  submittedUser = false;

  projects: any;
  tests: any;

  tasks: Task[];
  taskId: number;

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public ngbModalService: NgbActiveModal,
    private noteService: NoteServiceService) { }

  ngOnInit() {
    this.noteForm = this.formBuilder.group({
      Project: ['', Validators.required],
      Test: ['', Validators.required],
      Task: '',
      NoteId: [{ value: null, disabled: true }],
      DateTime: '',
      NotesDescription: ['', Validators.required]
    });

    this.tasks = TASK_DATA;
    this.noteList = [];
    this.noteListToSave = [];
    this.hide = true;
    this.submitted = false;
    this.getProjects();
  }

  get f() { return this.noteForm.controls; }

  getProjects() {
    this.noteService.getProjects().subscribe(res => {
      this.projects = res;
    });
  }

  changeProject(event) {
    let projectId = parseInt(event.target.value);
    this.noteService.getTests(projectId).subscribe(res => {
      this.tests = res;
    });
  }

  changeTest(event) {
    let testId = parseInt(event.target.value);
    this.noteService.getTests(testId).subscribe(res => {
      //this.tasks  = res;
    });
  }

  addNewNote() {
    this.isNewNote = true;
    let dateTime = new Date();
    this.currentTime = moment(dateTime).format('MM/DD/YYYY HH:mm:ss');
    this.noteForm.controls.time.setValue(this.currentTime);

    this.noteForm.reset();
  }

  onSubmit() {

    this.submitted = true;
    if (this.noteForm.invalid) {
      this.isNewNote = true;
      return;
    }
    let noteIndex = this.noteForm.getRawValue().NoteId;
    if (!isNullOrUndefined(noteIndex)) {
      this.noteList[noteIndex] = this.noteForm.value;
      this.isEditNote = false;
      this.currentTime = null;
    } else {
      this.noteForm.controls.DateTime.setValue(this.currentTime);
      this.noteList.unshift(this.noteForm.value);
    }
    this.reset();
  }

  deleteNote(index: any) {
    this.noteList.splice(index, 1);
  }

  reset() {
    this.noteForm.reset();
    this.submitted = false;
    this.isNewNote = false;
  }

  editNote(newNote: any, selectedIndex: any) {
    this.isNewNote = true;
    this.isEditNote = true;
    this.noteService.getTests(newNote.Project.projectId).subscribe(res => {
      this.tests = res;
    });

    this.noteForm.setValue({
      Project: newNote.Project,
      Test: newNote.Test,
      Task: newNote.Task,
      NoteId: selectedIndex,
      DateTime: newNote.DateTime,
      NotesDescription: newNote.NotesDescription,
    });
  }

  saveAllNotes() {
    this.noteList.forEach(note => {
      let noteToSave = new Note();
      noteToSave.ProjectId = note.Project.projectId;
      noteToSave.TestId = note.Test.testId;
      noteToSave.TaskId = !isNullOrUndefined(note.Task.Id) ? note.Task.Id : 0;
      noteToSave.DateTime = note.DateTime;
      noteToSave.NoteId = note.NoteId;
      noteToSave.NotesDescription = note.NotesDescription;
      this.noteListToSave.push(noteToSave);
    });

    this.noteService.saveNotes(this.noteListToSave).subscribe(res => {
      alert('Note saved successfully.');
    }, error => {
      alert('Something went wrong while save note.');
      console.log(error);
    });
  }
}
