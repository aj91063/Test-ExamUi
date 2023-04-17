import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizeService } from 'src/app/services/quize.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
    constructor(private _route:ActivatedRoute, private _quiz:QuizeService,
       private _category:CategoryService, private snack:MatSnackBar, private router:Router, private title:Title){}
    qId=0;
    quizData:any;
    categories:any;
    ngOnInit(): void {
         this.qId= this._route.snapshot.params['qid'];
        // alert(this.qId)
        this._quiz.getQuiz(this.qId).subscribe(
          (data:any)=>{
            this.quizData=data;
            //console.log(this.quizData);
          },(error)=>{
            console.error(error);
          }
        );

        this._category.categories().subscribe(
          (data)=>{
            this.categories=data;
          },
          (error)=>{
            console.error(error);
          }

        )
          this.title.setTitle("Update Quiz")

    }




    public updateQuiz(){
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


            this._quiz.updateQuiz(this.quizData).subscribe(
              (qdata:any)=>{
                Swal.fire('Success!!',`This Quiz \"${this.quizData.title}\" updated successfully.`,'success').then(
                  (e)=>{
                      this.router.navigate(['/admin/quizzes'])
                  }
                );
                // this.quizData={
                //   title:'',
                //   description:'',
                //   maxMarks:'',
                //   numberOfQuestions:'',
                //   active:true,
                //   category:{cid:''}
                // }
              },
              (error)=>{
                Swal.fire('Error','Error in sending data to the server.','error').then(
                  (e)=>{
                      this.router.navigate(['/admin/quizzes'])
                  }
                );
              }
            );
        }


      // console.log(this.quizData);
    }

}
