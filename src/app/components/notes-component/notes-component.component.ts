import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
// import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'app-notes-component',
  templateUrl: './notes-component.component.html',
  styleUrls: ['./notes-component.component.css'],
  animations: [trigger('fadeInOut', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0 }),
      animate('1000ms', style({ transform: 'translateX(0)', opacity: 1 }))
    ]),
  ])
  ]
})
export class NotesComponent implements OnInit {
  files = [];
  @ViewChild('video') video: ElementRef;
  @ViewChild('videoUser') videoUser: ElementRef;
  noteForm: FormGroup;
  submitted: boolean;
  isNewNote = false;
  notesData: { time: string, note: string }[] = [];
  count = 0;
  editField: string;
  noteList: Array<any> = [];
  datetimedata: Array<any> = [];
  attentiondata: Array<any> = [];
  relaxeddata: Array<any> = [];
  stressdata: Array<any> = [];
  hide: boolean;
  showNotes = false;
  videoCurrentTime: any;
  currentTime: any;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.noteForm = this.formBuilder.group({
      time: '',
      note: ['', Validators.required],
    });

    this.hide = true;
  }

  get f() { return this.noteForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.isNewNote = false;
    // stop here if form is invalid
    if (this.noteForm.invalid) {
      return;
    }

  }

  getfolder(e) {
    this.hide = true;
    this.showNotes = false;

    this.files = e.target.files;
    const path = this.files[0].webkitRelativePath;
    let file1 = this.files[0].name;
    for (let ii = 0; ii < this.files.length; ii++) {
      const arrFilename = (this.files[ii].name).split('_');
      if (arrFilename[arrFilename.length - 1] === 'Video.mp4') {  // arrFilename[arrFilename.length - 1] === 'Video.avi'

        const fileURL = URL.createObjectURL(this.files[ii]);
        const videoNode = this.video.nativeElement;
        videoNode.src = URL.createObjectURL(this.files[ii]);
        // ToDo: Url will be change - Re-visit
        const videoUser = this.videoUser.nativeElement;
        videoUser.src = URL.createObjectURL(this.files[ii]);
      }
    }
  }

  playCharts() {

    if (this.files.length === 0) {
      alert('Please upload the test file..!');
      return;
    }

    this.hide = false;
    this.showNotes = true;
    const videoList = document.getElementsByTagName('video');

    for (let i = 0; i < videoList.length; i++) {
      videoList[i].load();
      videoList[i].paused ? videoList[i].play() : videoList[i].pause();
    }
    // Reset the note collection
    this.noteList = [];
    const source = interval(1000);

    const vid = document.getElementById('video');
    // this.videoCurrentTime = vid.currentTime;

    // Note - Added logic to add rows dynamically
    //const subscribe = source.subscribe(val => this.add(val));
    //const videoEnd = document.getElementById('video');

    // videoEnd.onended = function () {
    //   setTimeout(() => subscribe.unsubscribe());
    // };

  }

  // updateList(time: number, property: string, event: any) {
  //   const editField = event.target.textContent;
  //   this.noteList[time][property] = editField;
  // }

  // remove(id: any) {
  //   // this.awaitingPersonList.push(this.personList[id]);
  //   this.noteList.splice(id, 1);
  // }

  // changeValue(time: number, property: string, event: any) {
  //   //this.editField = event.target.textContent;
  // }


  // back up code
  add(value: number) {

    let newRecord = {
      time: value,
      note: ''
    };
    this.noteList.unshift(newRecord);
  }

  addNewNote() {
    this.isNewNote = true;
    this.currentTime =  this.video.nativeElement.currentTime;
    this.noteForm.reset();
  }

  sumitNote() {
    this.noteForm.controls.time.setValue(this.currentTime);
    this.noteList.unshift(this.noteForm.value);
    this.isNewNote = false;
  }

  deleteNote(index: any) {
    this.noteList.splice(index, 1);
  }


  reset() {
    this.noteForm.reset();
    this.isNewNote = false;
  }

  // editNote(item: any)
  // {
  //   let updateItem = this.noteList.find(index, newItem.id);
  //   let index = this.noteList.indexOf(updateItem);
  //   this.itemArray.items[index] = newItem;
  // }



  onRowClick(event, id) {
    console.log(event.target.outerText, id);
  }


}
