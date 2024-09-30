import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  task = new BehaviorSubject<any>({});
  public modalOn = this.task.asObservable();

  addTask(data:any) {
    this.task.next(data);
  }

  getTask() {
    let clientsUrl = '';
    clientsUrl =`https://jsonplaceholder.typicode.com/todos`;
    return axios.get(`https://jsonplaceholder.typicode.com/todos`)
    .then(res => {
      return res.data
    })
  }
}
