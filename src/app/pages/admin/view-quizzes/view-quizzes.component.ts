import { Component, OnInit } from '@angular/core';
import { QuizeService } from 'src/app/services/quize.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{

  public quizees:any=[];
    constructor(private quiz:QuizeService){}

    ngOnInit(): void {
            this.quiz.getAllQuizzes().subscribe(
              (data:any)=>{
                  this.quizees=data;
            })
    }


    /*{
      qId:Number,
      title: String,
      description:String,
      maxMarks:String,
      numberOfQuestions:String,
      active: Boolean,
      category: {
          title:String,
      }
    }*/
}
