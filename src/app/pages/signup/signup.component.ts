import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserServiceService, private snackBar: MatSnackBar,public login:LoginService, private router:Router,private title:Title) { }
  ngOnInit(): void {
    this.title.setTitle("Singup")
  }
  hide = true;
  public user = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    gender: '',
    phone: '',
    password: '',

  }

  userFormSubmit(){
       //let oneusername:String[];
       this.userService.getUserByUsername(this.user.username).subscribe(
        (data:any)=>{
          console.log(data);
          if(data.username != null){
            this.snackBar.open(`${data.username} already exists, Try with anoter username.`,'ok',
            {duration:4000,
            })
           }else{
            this.snackBar.open(`Username is required.`,'ok',
            {duration:4000,
            })
           }
       });

  }



  formSubmit() {
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.user.firstName == "" || this.user.firstName == null) {
      this.snackBar.open("First name is required", 'ok', {
        duration: 3000,
        horizontalPosition: 'center'
      });
      return;
    }
    else if (this.user.lastName == "" || this.user.lastName == null) {
      this.snackBar.open("Last name is required", 'ok', {
        duration: 3000,
        horizontalPosition: 'center'
      });
      return;
    }
    else if (this.user.username.trim() == '' || this.user.username == null) {
      this.snackBar.open("Username is required", 'ok', {
        duration: 3000,
        horizontalPosition: 'center'
      });
      return;
    }
    else if (this.user.email == "" || this.user.email == null) {
      this.snackBar.open("Email is required", 'ok', {
        duration: 3000,
        horizontalPosition: 'center'
      });
      return;
    }
    else if(! this.user.email.match(validRegex)){
      this.snackBar.open("Invalid Email format", 'ok', {
        duration: 3000,
        horizontalPosition: 'center'
      });
      return;
    }
    else if (this.user.gender == "" || this.user.gender == null) {
      this.snackBar.open("Gender is required", 'ok', {
        duration: 3000,
        horizontalPosition: 'center'
      });
      return;
    }
    else if (this.user.phone == "" || this.user.phone == null) {
      this.snackBar.open("Phone number is required", 'ok', {
        duration: 3000,
        horizontalPosition: 'center'
      });
    }
    else if(this.user.phone.toString().length != 10){
      this.snackBar.open("Phone number must be 10 digit", 'ok', {
        duration: 3000,
        horizontalPosition: 'center'
      });

    }

    else if (this.user.password == "" || this.user.password == null) {
      this.snackBar.open("Password is required", 'ok', {
        duration: 3000,
        horizontalPosition: 'center'
      });
    }


    else {
      this.userService.getUserByUsername(this.user.username).subscribe(
        (data:any)=>{
           if(data == null){
            this.userService.addUser(this.user).subscribe(
              (data:any) => {

                 Swal.fire({
                   title: '',
                   text: `Account is created successfully. ${this.user.username}`,
                   icon: 'success',
                   confirmButtonText: 'Login',
                   confirmButtonColor:'#FF7E06',
                   cancelButtonColor:'#d33',
                   showCancelButton:true
                 }).then((result)=>{
                        if(result.isConfirmed){
                            this.router.navigate(["login"]);
                        }
                        else{
                          this.router.navigate(['']);
                        }
                 });
              },
               (error) => {
                 console.log(this.user)
                 this.snackBar.open("Something went wrong", 'ok', {
                   duration: 3000,
                   horizontalPosition: 'center'
                 });
              }
            );
           }

           else{
               this.snackBar.open(`${data.username} already exists, Try with anoter username.`,'ok',
               {duration:4000});
           }
       });



    }



}
}

