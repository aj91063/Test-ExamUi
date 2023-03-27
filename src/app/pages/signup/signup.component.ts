import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(){}
  ngOnInit(): void {
    
  }

  public user={
    firstName:'',
    lastName:'',
    userName:'',
    email:'',
    gender:'',
    phone:'',
    password:'',

  }

  formSubmit(){
    alert("submit");
  }

}


