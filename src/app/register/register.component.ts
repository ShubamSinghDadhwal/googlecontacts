import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Register } from '../register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fname:string;
  lname:string;
  company:string;
  job:string;
  email:string;
  phone:string;

  msg:string;

  myregister:Register

  constructor(private registerService:ContactsService,private myrouter:Router) { }

  ngOnInit(): void {

  }

  onregister()
  {
    this.myregister= new Register(this.fname,this.lname,this.company,this.job,this.email,this.phone);
    
    this.registerService.registerContact(this.myregister).subscribe({
      next:(res)=>{
        this.msg=res;
        this.myrouter.navigateByUrl("/")
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

}
