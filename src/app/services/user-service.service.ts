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
}
