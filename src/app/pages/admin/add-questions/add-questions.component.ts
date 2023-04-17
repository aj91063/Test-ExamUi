import { QuestionService } from 'src/app/services/question.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  qid:any;
    title:any;
  question={
    answer: '',
    content: '',
    // image: '',
    option1: '',
    option2:'',
    option3: '',
    option4: '',
    quize: {qId:''}
  }
  constructor(private _route:ActivatedRoute, private titleBar:Title,
    private snack:MatSnackBar,
    private qService:QuestionService

    ){}
  ngOnInit(): void {
      this.qid=this._route.snapshot.params['qid'];
      this.title=this._route.snapshot.params['title']
      this.question.quize.qId=this.qid;
      // console.log(this.question.quize.qId)


      this.titleBar.setTitle("Add Question")
  }


  addQuestion(){
        if(this.question.content.trim() =='' || this.question.content ==null){
          this.snack.open("Question content is required","ok",{
            duration:2000,
            horizontalPosition: 'center'
          });
          return;
      }
      else if(this.question.option1.trim() =='' || this.question.option1 ==null){
        this.snack.open("Option 1 is required","ok",{
          duration:2000,
          horizontalPosition: 'center'
        });
        return;
      }
      else if(this.question.option2==null || this.question.option2==''){
        this.snack.open("Option 2 is required","ok",{
          duration:2000,
          horizontalPosition: 'center'
        });
      }
      // else if(this.question.option3 =='' || this.question.option3 ==null){
      //   this.snack.open("Option 3 is required","ok",{
      //     duration:2000,
      //     horizontalPosition: 'center'
      //   });
      //   return;
      // }
      // else if(this.question.option4 =='' || this.question.option4 ==null){
      //   this.snack.open("Option 4 is required","ok",{
      //     duration:2000,
      //     horizontalPosition: 'center'
      //   });
      //   return;
      // }
      else if(this.question.answer =='' || this.question.answer ==null){
        this.snack.open("Answer is required","ok",{
          duration:2000,
          horizontalPosition: 'center'
        });
        return;
      }else{
        this.qService.addQuestion(this.question).subscribe(
          (data)=>{
            Swal.fire('Success', 'Question added successfully', 'success');
          },
          (error)=>{
            Swal.fire('Error','Something went wrong', 'error');
          }
        )

      }
  }

}
