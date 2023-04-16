import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements  OnInit{
  public status ={
    enabled:Boolean
  }
  checked = true;
  disabled = false;

    constructor(private users: UserServiceService, private router:Router, private snak:MatSnackBar, private title:Title){}
     usersDetails:any=[];
    ngOnInit(): void {
        this.fetchData();
        this.title.setTitle("User Details")
    }

    fetchData(){
      this.users.getAllUser().subscribe((data:any)=>{
        this.usersDetails=data;
    });
    }

    delete(id:any){
      Swal.fire(
        {
          icon:'info',
          title:'Are you sure?',
          confirmButtonText:'Delete',
          showCancelButton:true
        }
        ).then((result)=>{
          if(result.isConfirmed) {
            this.users.deleteUser(id).subscribe(
              ()=> {
                this.fetchData();
                this.snak.open(`UserId: ${id} deleted successfully.` ,'ok',{
                  duration:3000
                })
            }
            );

          }
        });
    }


      updateStatus(username:any,status:any){
        this.status.enabled=status;
          this.users.updateStatus(username,this.status).subscribe(
            (data)=>{
              //console.log(data)
            },
            (error)=>{
              console.error(error);
            }
          );

      }

}

