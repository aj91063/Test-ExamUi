import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizeService } from 'src/app/services/quize.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
constructor(private _route:ActivatedRoute, private _quiz:QuizeService,
  private _category:CategoryService, private snack:MatSnackBar, private router:Router, private title:Title){}

    cid:any;
    category:any;

 ngOnInit(): void {
  this.cid= this._route.snapshot.params['cid'];
  this._category.getCategoryById(this.cid).subscribe(
    (data)=>{
        console.log(data);
        this.category=data;
    }

    );
    this.title.setTitle("Update Category")
  }


  backbtn(){
    history.back();
  }

    updateCategoryForm(){
      if(this.category.title.trim() =='' || this.category.title ==null){
        this.snack.open("Title is required","ok",{
          duration:2000,
          horizontalPosition: 'center'
        });
        return;
    }
    else if(this.category.description.trim() =='' || this.category.description ==null){
      this.snack.open("Descripition are required","ok",{
        duration:2000,
        horizontalPosition: 'center'
      });
      return;
    }
    else{

      this._category.updateCategory(this.category).subscribe(
        ()=>{
          Swal.fire({
            title: 'Success',
            html: `Category updated successfully: <b> ${this.category.title}</b>`,
            icon: 'success',
            confirmButtonText: 'Go to Categories',
            confirmButtonColor:'#3252a8',
            cancelButtonColor:'#d33',
            showCancelButton:false
          }).then((result)=>{
            if(result.isConfirmed){
              this.router.navigate(["admin/categories"]);
            }
          })
        },
        (error)=>{
          Swal.fire('Error!!', 'Something went worng., Try again..', 'error')
        }
      );
    }

  }
}
