import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient, HttpResponse ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

loginData={
  userName:'',
  password:'',
}
  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router){}
  ngOnInit():void{}

  loginFormSubmit(){
    //alert("hello")
    if(this.loginData.userName.trim() =='' || this.loginData.userName ==null){
        this.snack.open("Username required","ok",{
          duration:2000,
          horizontalPosition: 'center'
        });
        return;
    }
    else if(this.loginData.password.trim() =='' || this.loginData.password ==null){
      this.snack.open("Password required","ok",{
        duration:2000,
        horizontalPosition: 'center'
      });
      return;
  }
  else{

   this.login.generateToken(this.loginData).subscribe(
    (data:any)=>{
          console.log("Success");
          //console.log(data.token);
          this.login.loginUser(data.token);
         // console.log("token set--->", localStorage.getItem('token'));
          this.login.getCurrentUser().subscribe(
            (user:any)=>{
              this.login.setUser(user)
              //console.log(user);
              //redirect to admin or user
              if(user.authorities[0].authority=='ADMIN'){
                // admin dashboard
                //window.location.href='/admin';
                this.login.loginStatusSubject.next(true);
                this.router.navigate(['admin'])

              }else if(this.login.getUserRole()=='NORMAL'){
                // user dashboard
               // window.location.href='/userDashboard';
               this.login.loginStatusSubject.next(true);
                this.router.navigate(['userDashboard'])
              }
              else{
                this.login.logout();

              }

            },
            (error)=>{
               console.log(error);
            }
          );
    },(error)=>{
      console.log("error");
      console.error(error);
      this.snack.open("Invalid details, Try again.",'ok',{
        duration:3000
      })
    }
   );
  }

  }

}
