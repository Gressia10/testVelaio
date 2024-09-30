import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../providers/task.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {

  public userSelected:any;
  public skillSelected:any;
  public nameUser:any;
  public ageUser:any;
  public showUser:boolean=false;
  public showSkills:boolean=false;
  public errorUser:boolean=false;
  public errorSkills:boolean=false;
  constructor(
    public _matDialogRef : MatDialogRef<ModalComponent>,
    private _matDialog : MatDialog,
    private TaskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    console.log(this.data)
  }

  addUser():void{
    this.showUser = !this.showUser;
  }

  addUserData():void{
    if(this.ageUser >= 18 && this.nameUser != ""){
      const maxId = Math.max(...this.data.userArray.map((user:any) => user.id));
      console.log(maxId)
      let objectUser = {id:maxId+1, name:this.nameUser, age:this.ageUser};
      this.TaskService.addUser(objectUser)
      //this.data.userArray.push(objectUser)
    }else{
      this.errorUser = true;
    }
    
  }

  addSkill():void{
    this.showSkills = !this.showSkills;
  }

  hide() : void {
    this._matDialog.closeAll()
  }
}
