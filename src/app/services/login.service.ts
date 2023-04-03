import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public loginStatusSubject = new Subject<boolean>();

//current User which isa login
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/currentUser`);
  }

// generate the token
  public generateToken(loginData:any){

    return this.http.post(`${baseUrl}/generate-token`,loginData)
  }

  public loginUser(token:any){
    localStorage.setItem('token',token)
    return true;
  }

  // is user logged in or not
  public isLoggedIn(){
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null){
      return false;
    }
    else{
      return true;
    }
  }

  //remove token if user logout

  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  // get token

  public getToken(){
    let tokenStr = localStorage.getItem("token");
    return tokenStr;
  }

  public setUser(user:any){
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr != null){
        return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user =this.getUser();
    return user.authorities[0].authority;
  }
}
