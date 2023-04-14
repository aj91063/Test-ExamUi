import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(public login:LoginService, private title:Title){

  }

public userData:any="";
  ngOnInit(): void {
          this.login.getCurrentUser().subscribe((data)=>{
                this.userData=data;
                console.log(this.userData);
          });
          this.title.setTitle("Profile")
  }

}
