import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private http:HttpClient
  ) { }

  //addUser
  public addUser(user:any) {
      return this.http.post(`${baseUrl}/api/user/create-user`,user);
  }

  public getUserByUsername(username:any){
    return this.http.get(`${baseUrl}/api/user/${username}`)
  }


  public getAllUser(){
    return this.http.get(`${baseUrl}/api/user/`)
  }
public deleteUser(id:any){
  return this.http.delete(`${baseUrl}/api/user/${id}`)
}

public updateStatus(username:any, enabled:any){
  return  this.http.put(`${baseUrl}/api/user/enabled/${username}`,enabled);
}

public updateUser(username:any, user:any){
      return this.http.put(`${baseUrl}/api/user/${username}`,user);
}

}
