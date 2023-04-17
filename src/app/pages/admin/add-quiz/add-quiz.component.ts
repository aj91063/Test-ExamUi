import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizeService } from 'src/app/services/quize.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
      public categories:any=[];
      public quizData={
        title:'',
        description:'',
        maxMarks:'',
        numberOfQuestions:'',
        active:true,
        category:{cid:''}
      }


      constructor(private _category:CategoryService, private quiz:QuizeService,
         private snack:MatSnackBar,
         private titleBar:Title
         ){}
      ngOnInit(): void {
            this._category.categories().subscribe(
              (data:any)=>{
                this.categories=data;
              },(error)=>{
                Swal.fire('Error','Error in loading from server.','error')
              }
            )

            this.titleBar.setTitle('Add Quiz')
      }



      addQuiz(){
        if(this.quizData.title.trim() =='' || this.quizData.title ==null){
          this.snack.open("Title is required","ok",{
            duration:2000,
            horizontalPosition: 'center'
          });
          return;
      }
      else if(this.quizData.description.trim() =='' || this.quizData.description ==null){
        this.snack.open("Descripition are required","ok",{
          duration:2000,
          horizontalPosition: 'center'
        });
        return;
      }
      else if(this.quizData.category.cid==null || this.quizData.category.cid==''){
        this.snack.open("Please choose the category.","ok",{
          duration:2000,
          horizontalPosition: 'center'
        });
      }
      else if(this.quizData.maxMarks =='' || this.quizData.maxMarks ==null){
        this.snack.open("Maximum Marks are required","ok",{
          duration:2000,
          horizontalPosition: 'center'
        });
        return;
      }
      else if(this.quizData.numberOfQuestions =='' || this.quizData.numberOfQuestions ==null){
        this.snack.open("Number of questions are required","ok",{
          duration:2000,
          horizontalPosition: 'center'
        });
        return;
      }
      else{
        this.quiz.getQuizByTitle(this.quizData.title).subscribe((data)=>{
          if(data == null){
              this.quiz.addQuiz(this.quizData).subscribe(
                (qdata:any)=>{
                  Swal.fire('Success!!',`This Quiz \"${this.quizData.title}\" created successfully.`,'success')
                  this.quizData={
                    title:'',
                    description:'',
                    maxMarks:'',
                    numberOfQuestions:'',
                    active:true,
                    category:{cid:''}
                  }
                },
                (error)=>{
                  Swal.fire('Error','Error in sending data to the server.','error')
                }
              );
          }
          else{
            this.snack.open("This title \""+this.quizData.title+"\" is already exits","ok",{
              duration:2000,
              horizontalPosition: 'center'
            });
          }
        })
        // console.log(this.quizData);
      }
      }


      reset(){
        this.quizData.active=true;
      }
}
