import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  constructor(private title:Title,  private _route:ActivatedRoute,
    private login: LoginService,
    private snack: MatSnackBar,
    private userService:UserServiceService,
    private router:Router
    ){}
    username:any;
    public user = {
      email: '',
      phone: '',
      password: '',

    }
  ngOnInit(): void {
    this.username=this._route.snapshot.params['username'];
      this.login.getCurrentUser().subscribe(
        (data:any)=>{
          this.user.email=data.email;
          this.user.phone=data.phone;
          //this.user.password=data.password;
        }
      );
    //console.log(this.username)

    this.title.setTitle("User Update")
  }


  updateUser(){
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if(this.user.email==null || this.user.email==''){
              this.snack.open("Email is required.",'ok',{
                duration:3000,
                horizontalPosition: 'center'
              });
              return;
          }
        else if(! this.user.email.match(validRegex)){
          this.snack.open("Invalid email format", 'ok', {
            duration: 3000,
            horizontalPosition: 'center'
          });
          return;
        }
        else if(this.user.phone==null || this.user.phone==''){
          this.snack.open("Phone number is required.",'ok',{
            duration:3000,
            horizontalPosition: 'center'
          });
          return;
      }
      else if(this.user.phone.toString().length != 10){
        this.snack.open("Phone number must be 10 digit", 'ok', {
          duration: 3000,
          horizontalPosition: 'center'
        });

      }
      else if (this.user.password == "" || this.user.password == null) {
        this.snack.open("Password is required", 'ok', {
          duration: 3000,
          horizontalPosition: 'center'
        });
      }
      else{
            this.userService.updateUser(this.username,this.user).subscribe(
              (data:any)=>{
                  Swal.fire({
                    title: 'User Updated',
                    text: `User updated successfully.`,
                    icon: 'success',
                    confirmButtonText: 'Go to Profile',
                    confirmButtonColor:'#FF7E06',
                    cancelButtonColor:'#d33',
                    showCancelButton:true
                  }).then((result)=>{
                         if(result.isConfirmed){
                             this.router.navigate(["admin/profile"]);
                         }
                  });;
              },
              (error)=>{
                Swal.fire('Error !!','Somthing went wrong, try after sometime.','error');
              }
            )
      }

  }
}
