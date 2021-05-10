import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Register } from '../register';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  up_fname:string;
  up_lname:string;
  up_company:string;
  up_job:string;
  up_email:string;
  up_phone:string;

  srchuserdata:Register

  msg:string;

  constructor(private updateService:ContactsService, private myrouter:Router) { }

  ngOnInit(): void {
  
    this.updateService.srchuser(sessionStorage.getItem("userid")).subscribe({
      next:(res)=>{
        if(res[0]== null)
        {
          
          this.msg= "User doesn't exist"
        }
        else
        {
          
          this.msg="";
          this.srchuserdata= res[0];
          this.up_fname= this.srchuserdata.fname;
          this.up_lname= this.srchuserdata.lname;
          this.up_company= this.srchuserdata.company;
          this.up_job= this.srchuserdata.job;
          this.up_email= this.srchuserdata.email;
          this.up_phone= this.srchuserdata.phone;
        }
      },
      error:(err)=>{
        alert(err);
      }
    })
    
  }

  onupdate(){

    var databody={
      
      fname:this.up_fname,
      lname:this.up_lname,
      company:this.up_company,
      job:this.up_job,
      email:this.up_email,
      phone:this.up_phone,
      userid:sessionStorage.getItem("userid")
    }

    this.updateService.updateMember(databody).subscribe(
    {
      next:(res)=>{
        if(res["nModified"] > 0)
        {
          // this.msg="Password Changed Successfully";
          alert("Details updated succesfully")
          this.myrouter.navigateByUrl("");
          sessionStorage.clear();
          
        } 
        else
        {
          this.msg="Can't update"
        }
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

}
