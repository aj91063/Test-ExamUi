import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient, HttpResponse ,HttpHeaders} from '@angular/common/http';


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
  constructor(private snack:MatSnackBar, private login:LoginService){}
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
          console.log(data.token);
          this.login.loginUser(data.token);
          console.log("token set--->", localStorage.getItem('token'));
          this.login.getCurrentUser().subscribe(
            (user:any)=>{
              this.login.setUser(user)
              console.log(user);
            },
            (error)=>{
               console.log(error);
            }
          );
    },(error)=>{
      console.log("error");
      console.error(error);
    }
   );
  }

  }

}
