import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private snack:MatSnackBar){}
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





  }
  }

}
