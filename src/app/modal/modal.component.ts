import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TaskService } from '../providers/task.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {

  public nameUser:any="";
  public ageUser:any;
  public skillName:any;
  public skillName2:any;
  public taskName:any;
  public taskDate:any;
  public showUser:boolean=false;
  public showSkills:boolean=false;
  public showSkills2:boolean=false;
  //Codigos de errores
  public errorModal:number=0; 
  //1 = El usuario ya esta registrado en la tarea 
  //2 = Comprobacion para crear persona 
  //3 = El usuario debe tener habilidad si se elimina a la persona 
  //4 = Debe completar todos los campos
  public skills:any;
  public userData : [{name:any, age:any, skills:[string]}];
  public task = {};
  constructor(
    public _matDialogRef : MatDialogRef<ModalComponent>,
    private _matDialog : MatDialog,
    private TaskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    if(this.data.type == 'edit'){
      this.taskName = this.data.data.title;
      this.taskDate = this.data.data.dateLimit;
      this.userData = this.data.data.userData;
    }
  }

  addUser():void{
    this.showUser = !this.showUser;
  }

  addUserData():void{
    console.log(this.nameUser.length)
    if(this.ageUser >= 18 && this.nameUser.length >= 5 && this.skills && this.skills.length > 0){

      if(this.userData){
        let foundUser = this.userData.find((element:any) => element.name == this.nameUser);
        if(!foundUser){
          this.errorModal = 0;
          let objectUser = {name:this.nameUser, age:this.ageUser, skills:this.skills};
          this.userData.push(objectUser)
          this.skills = null;
          this.nameUser="";
          this.ageUser="";
          this.showUser = false;
        }else{
          this.errorModal = 1;
        }
        
      }else{
        this.errorModal = 0;
        this.userData = [{name:this.nameUser, age:this.ageUser, skills:this.skills}]
        this.skills = null;
        this.nameUser="";
        this.ageUser="";
        this.showUser = false;
      }
    }else{
      this.errorModal = 2;
    }
    
  }

  addSkillData():void{
    if(this.skillName.length > 0){
      if(this.skills){
        this.skills.push(this.skillName)
        this.skillName = "";
        this.showSkills = false;
      }else{
        this.skills = [this.skillName]
        this.skillName = "";
        this.showSkills = false;
      }
      
    }
  }

  addSkillDataUser(position:number):void{
    if(this.skillName2.length > 0){
      this.userData[position].skills.push(this.skillName2)
      this.skillName2 = "";
      this.showSkills2 = false;
    }else{
      this.skills = [this.skillName2]
      this.skillName2 = "";
      this.showSkills2 = false;
    }
  }

  deleteSkill(position:number){
    this.skills.splice(position, 1);
  }

  deleteuser(position:number){
    this.userData.splice(position, 1);
  }

  deleteSkillData(position:number, positionArray:number){
    
    if(this.userData[position].skills.length > 1){
      this.userData[position].skills.splice(positionArray, 1)
      this.errorModal = 0;
    }else{
      this.errorModal = 3;
    }
  }

  addSkill(type:number):void{
    if(type == 1){
      this.showSkills = !this.showSkills;
    }else if(type == 2){
      this.showSkills2 = !this.showSkills2;
    }
    
  }

  addTask(){ 
    if(this.data.type == 'edit'){
      if(this.taskName && this.userData && this.taskDate){
        if(this.userData.length > 0 && this.taskName.length > 0 && this.taskDate.length > 0){
          this.data.data.title - this.taskName;
          this.data.data.userData = this.userData;
          this.data.data.dateLimit = this.taskDate;
          this._matDialog.closeAll()
        }else{
          this.errorModal = 4;
        }
      }else{
        this.errorModal = 4;
      }
    }else{
      if(this.taskName && this.userData && this.taskDate){
        this.TaskService.addTask({title:this.taskName, completed:false, userData:this.userData, dateLimit:this.taskDate});
        this._matDialog.closeAll()
      }else{
        this.errorModal = 4;
      }
    }
  }

  hide() : void {
    this._matDialog.closeAll()
  }
}
