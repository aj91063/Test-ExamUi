import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute,
    private titlebar:Title,
    private questions:QuestionService
  ){}
    qid:any;
    title:any;
    question:any=[];
      ngOnInit():void{
        this.qid=this._route.snapshot.params['qid'];
        this.title=this._route.snapshot.params['title'];
        // console.log(this.qid+"----------"+this.title);
        this.titlebar.setTitle('Questions of '+this.title+ ' Quiz');
        this.questions.getQuestionByIdAdmin(this.qid).subscribe(
          (data)=>{
            this.question=data;
            // console.log(this.question);
          },
          (error)=>{
            Swal.fire('Error','Question loading from server error...','error');
          }
        )
     }

     toDisplay = false;

     toggleData() {
       this.toDisplay = !this.toDisplay;
     }

    //  toggleData() {
    //   let x = document.getElementById("myDIV");
    //   if (x.style.display === "none") {
    //     x.style.display = "block";
    //   } else {
    //     x.style.display = "none";
    //   }
    // }

}
