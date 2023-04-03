import { SignupComponent } from './../../pages/signup/signup.component';
import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
       constructor(public login :LoginService){}

       isLoggedIn=false;
       user=null;

       ngOnInit():void{
          this.isLoggedIn=this.login.isLoggedIn();
          this.user=this.login.getUser();
          this.login.loginStatusSubject.asObservable().subscribe((data)=>{
            this.isLoggedIn=this.login.isLoggedIn();
          this.user=this.login.getUser();
          })
       }

       public logout(){
        this.login.logout();
        window.location.reload();
       }
}
