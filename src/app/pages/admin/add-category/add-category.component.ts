import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

  category={
    title:"",
    description:""
  }

  constructor(private snack:MatSnackBar, private _category:CategoryService){}
  ngOnInit(): void {

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
          (data1)=>{
             // console.log(data1);
             this.snack.open("This title \""+this.category.title+"\" added.","ok",{
              duration:2000,
              horizontalPosition: 'center'
            });
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
