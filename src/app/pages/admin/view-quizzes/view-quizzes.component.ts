import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { QuizeService } from 'src/app/services/quize.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{

  public quizees:any=[];
    constructor(private quiz:QuizeService, private title:Title, private snak:MatSnackBar ){}

    ngOnInit(): void {
            this.fetchQuiz();
            this.title.setTitle("View all Quiz")
    }
      fetchQuiz(){
        this.quiz.getAllQuizzes().subscribe(
          (data:any)=>{
              this.quizees=data;
        })
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
                this.quiz.deleteQuiz(id).subscribe(
                  ()=>{
                    this.fetchQuiz();
                    this.snak.open(`QuizId: ${id} deleted successfully.` ,'ok',{
                      duration:3000
                    })
                    console.log();
                  });

              }
       });

      //console.log(id)
     }
}
