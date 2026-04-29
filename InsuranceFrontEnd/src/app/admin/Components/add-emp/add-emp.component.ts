import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AdminService } from 'src/app/Services/admin.service';
import { __values } from 'tslib';
import { ValidateForm } from 'src/app/helper/validateForm';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent {

  addEmpForm=new FormGroup({
    firstName:new FormControl('',[Validators.required,ValidateForm.onlyCharactersValidator]),
    lastName:new FormControl('',[Validators.required,ValidateForm.onlyCharactersValidator]),
    userName:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    mobileNumber:new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    salary:new FormControl('',[Validators.min(0)]),
    password:new FormControl('',[Validators.required,ValidateForm.passwordPatternValidator]),
  })

  token :any='';
  addModal:any;
  employeeData:any;

constructor( private admin:AdminService,private router:Router,private location:Location, private notification: NotificationService){
 
}
goBack(){
  this.location.back()
}
OnCancel() {
  this.addEmpForm.reset()
  }
  
  
  addEmp(): void{
    if(this.addEmpForm.valid){
      console.log(this.addEmpForm.value)
      this.admin.addEmp(this.addEmpForm.value).subscribe({
        next:(data)=>{
         this.addEmpForm.reset()
          console.log(data)
          this.notification.showDialog("Employee Added Successfully", "Success", "pi pi-check-circle");
          this.goBack();
        },
        error:(error:HttpErrorResponse)=>{
          console.log(error)
          this.addEmpForm.reset()
          this.notification.showDialog(error.error.Message, "Error", "pi pi-exclamation-triangle");
        }
      })
    }
    else{
      ValidateForm.validateAllFormFileds(this.addEmpForm);
      this.notification.showDialog("One or more fields required", "Warning", "pi pi-exclamation-circle");
    }
  }
}