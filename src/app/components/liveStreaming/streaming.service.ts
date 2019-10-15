import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/behaviorSubject';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';
import * as io from 'socket.io-client';
@Injectable()
export class StreamingService {

  observable: Observable<string>;
  socket;
  constructor() {
    this.socket = io('http://localhost:3000');
  }

  getData(): Observable<string> {
    return this.observable = new Observable((observer) => {
      this.socket.on('hello', (data) => observer.next(data));
    });
  }
}
