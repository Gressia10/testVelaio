import { Component } from '@angular/core';
import { TaskService } from './providers/task.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular';
  public tasks: [{id:any, userId:any, title:any, completed:any, userData:any, dateLimit:any}];
  public loading: boolean = false;
  public orderStatus:boolean = false;

  constructor(
    private TaskService: TaskService,
    private _matDialog : MatDialog
  ) {


  }

  public async ngOnInit(): Promise<any> {
    try{

      this.TaskService.task
      .subscribe(data => {
        if(this.tasks){
          const maxId = Math.max(...this.tasks.map((task:any) => task.id));
          let objectUser = {id:maxId+1, userId:0, ...data};
          this.tasks.unshift(objectUser);
          // this.tasks.push(objectUser);
        }
        
      });

      this.loading = true
      let data = await this.TaskService.getTask();
      
      this.tasks = data
      this.loading = false
    }catch(err){
      console.error(err)
    }
  }

  addTask() : void {
    this._matDialog.open(ModalComponent, {
      width: '900px',
      data:{type:"add", title:"Agregar Tarea", data:""},
    })
  }

  statusTask(indexTask:any):void{
    this.tasks[indexTask].completed = !this.tasks[indexTask].completed
  }

  deleteTask(position:number):void{
    this.tasks.splice(position, 1)
  }

  updateTask(position:number):void{
    this._matDialog.open(ModalComponent, {
      width: '900px',
      data:{type:"edit", title:"Editar Tarea", data:this.tasks[position]},
    })
  }

  orderByStatus():void{
    this.orderStatus = !this.orderStatus;
    this.tasks.sort((a, b) => {
      // Comparar los valores de 'completed'
      return (a.completed === this.orderStatus ? -1 : 1) - (b.completed === this.orderStatus ? -1 : 1);
    });
  }

}
