import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserServiceService, private snackBar: MatSnackBar) { }
  ngOnInit(): void {

  }

  public user = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    gender: '',
    phone: '',
    password: '',

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
    else if (this.user.userName == "" || this.user.userName == null) {
      //alert("Field are required");
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
      this.snackBar.open("Invalid email format", 'ok', {
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
      this.snackBar.open("Phon number must be 10 digit", 'ok', {
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
     this.userService.addUser(this.user).subscribe(
       (data:any) => {
         console.log(data);
          this.snackBar.open("Account is created successfully", 'ok', {
            duration: 3000,
            horizontalPosition: 'center'
          });
          Swal.fire({
            title: '',
            text: `Account is created successfully. ${this.user.userName}`,
            icon: 'success',
            confirmButtonText: 'ok'
          });

       },
        (error) => {
          console.error(error);
          this.snackBar.open("Something went wrong", 'ok', {
            duration: 3000,
            horizontalPosition: 'center'
          });
       }
     );
    }

  

}
}

