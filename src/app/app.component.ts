import { Component } from '@angular/core';
import { TaskService } from './providers/task.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  public tasks: [{id:any, userId:any, title:any, completed:any, age:any, userName:any, dateLimit:any}] = [{id:0, userId:0, title:'nada', completed:true, age:0, userName:"test test", dateLimit:'2024-12-10'}];
  public userArray = [
    {id : 1, name:"Armando Caceres", age:20},
    {id : 2, name:"Amanda Gonzales", age:22},
    {id : 3, name:"Mariangel Matos", age:21},
    {id : 4, name:"Ana Matos", age:21},
    {id : 5, name:"Sofia Matos", age:21},
    {id : 6, name:"Mario Matos", age:21},
    {id : 7, name:"Lupe Matos", age:21},
    {id : 8, name:"Andrea Matos", age:21},
    {id : 9, name:"Freddy Matos", age:21},
    {id : 10, name:"Fabiana Matos", age:21}
  ]
  public skills = [{id:1, name:"test skills"}]
  public loading: boolean = false;

  constructor(
    private TaskService: TaskService,
    private _matDialog : MatDialog
  ) {


  }

  public async ngOnInit(): Promise<any> {
    try{

      this.TaskService.user
      .subscribe(data => {
        if(data.data){
          this.userArray.push(data.data);
          console.log(this.userArray)
        }
        
      });

      this.loading = true
      let data = await this.TaskService.getTask();
      data.map((taskData:any)=>{
        let foundUser = this.userArray.find((element:any) => element.id == taskData.userId);
        taskData.age = foundUser?.age;
        taskData.userName = foundUser?.name;
      })
      
      this.tasks = data
      this.loading = false
    }catch(err){
      console.error(err)
    }
  }

  addTask() : void {
    this._matDialog.open(ModalComponent, {
      width: '900px',
      data:{title:"Agregar Tarea", userArray:this.userArray, skills:this.skills},
    })
  }

}
