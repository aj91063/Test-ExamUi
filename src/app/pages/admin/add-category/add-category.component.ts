import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

  public category={
    title:"",
    description:""
  }

  constructor(private snack:MatSnackBar, private _category:CategoryService, private title:Title){}
  ngOnInit(): void {
    this.title.setTitle("Add Category")
  }


  addCategoryForm(){
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
    this._category.getCategoryByTitle(this.category.title).subscribe((data:any)=>{

        console.log(data);
        if(data == null){
        this._category.addCategory(this.category).subscribe(
          ()=>{
            Swal.fire('Success!!',`This category \"${this.category.title}\" created successfully.`,'success')
            this.category={
              title:"",
              description:""
            }
          }
        )
      }else{
        this.snack.open("This title \""+data.title+"\" is already exits","ok",{
          duration:2000,
          horizontalPosition: 'center'
        });
       // console.log(data.title+" is already exits");
      }



    },(error)=>{
      console.log(error);
    }
    );




    }
  }

}
