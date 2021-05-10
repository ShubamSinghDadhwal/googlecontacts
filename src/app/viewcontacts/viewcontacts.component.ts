import { HttpClient } from '@angular/common/http';
import { DepFlags } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Register } from '../register';

@Component({
  selector: 'app-viewcontacts',
  templateUrl: './viewcontacts.component.html',
  styleUrls: ['./viewcontacts.component.css']
})
export class ViewcontactsComponent implements OnInit {

  memblist:Register[];
  msg:string;
  updateFlag:boolean=false;
  nocontacts:boolean=false;
  

  constructor(private myhttp:HttpClient, private viewmembersService:ContactsService, private myrouter:Router) { }

  ngOnInit(): void {
    
    this.viewmembersService.fetchMembers().subscribe({
      next:(res)=>{
        this.memblist= res;
        if(res.length == 0)
        {
          this.nocontacts=true;
        }
        
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }


  ondelete(memid)
  {
      var confrm= confirm("Are you sure want to delete?");
      if(confrm)
      {
          this.myhttp.delete("http://localhost:3000/delcontact?uid="+memid,{responseType:"json"}).subscribe({
            next:(res)=>{
              if(res["deletedCount"] == 1)
              {
                alert("User Deleted Successfully!")
                this.ngOnInit()
              }
            },
            error:(err)=>{
              this.msg=err;
            }
          })
    }
  }

  onupdate(memid){
    this.updateFlag=true;
    sessionStorage.setItem("userid",memid);
    this.myrouter.navigateByUrl("update")
  }

  
}
