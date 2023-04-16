import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Title } from '@angular/platform-browser';
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


  constructor(private _category:CategoryService, private title:Title ){}

ngOnInit():void{
  this._category.categories().subscribe((data:any)=>{
    this.categories=data;
    //console.log(data);

  },(error)=>{
    console.log(error);
  }
  );

  this.title.setTitle("View Catregory")
}


}
