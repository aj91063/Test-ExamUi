import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit{

 public categories:any=[];

/*{
  cid:null,
  title:"",
  description:""
}*/


  constructor(private _category:CategoryService, private title:Title, private snack:MatSnackBar ){}

ngOnInit():void{

  this.fetchCategory();
  this.title.setTitle("View Catregory")
}

fetchCategory(){
  this._category.categories().subscribe((data:any)=>{
    this.categories=data;
    //console.log(data);

  },(error)=>{
    console.log(error);
  }
  );
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
           if(result.isConfirmed){
             this._category.deleteCategory(id).subscribe(
              (data)=>{
                this.categories= this.categories.filter((category:any)=>category.cid !=id)
                Swal.fire("Success","Category deleted.", "success")
              },
              (error)=>{
                    Swal.fire("You Can't delete this category.","Some Quizes belongs to this category.",'info');
              }
             )
            }

          });

  }
}
