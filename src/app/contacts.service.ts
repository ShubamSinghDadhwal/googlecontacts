import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from './register';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private myhttp:HttpClient) { }

  registerContact(cdetails:Register)
  {
    return this.myhttp.post("http://localhost:3000/register",cdetails,{responseType:"text"})
  }

  fetchMembers()
  {
    return this.myhttp.get <Register[]> ("http://localhost:3000/fetchcontacts")
  }

  updateMember(databody)
  {
    return this.myhttp.put("http://localhost:3000/updatelist", databody, {responseType:"json"});
  }

  srchuser(userid:string)
  {
     return this.myhttp.get <Register> ("http://localhost:3000/searchuser?userid="+userid, {responseType:"json"})
  }
}
