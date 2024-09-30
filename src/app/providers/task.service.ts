import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  user = new BehaviorSubject<any>({});
  public modalOn = this.user.asObservable();

  addUser(data:any) {
    this.user.next({ data: data});
  }

  deleteUser(data:any) {
    this.user.next({ data: data});
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
