import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit{

  constructor(private question1:QuestionService, private _route:ActivatedRoute,
     private snack:MatSnackBar,
     private router:Router){}

  public Editor = ClassicEditor;
    quesId:any;
    question:any;
    title:any;
  ngOnInit(): void {
    this.quesId =this._route.snapshot.params['quesId']
    this.title=this._route.snapshot.params['title']
    console.log(this.quesId);
    this.question1.getSingle(this.quesId).subscribe(
      (data)=>{
        this.question=data;
        console.log(data);
      }
    )
  }

  updateQuestion(){
    if(this.question.content ==null || this.question.content.trim()==''){
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
  else if(this.question.option2==null || this.question.option2.trim()==''){
    this.snack.open("Option 2 is required","ok",{
      duration:2000,
      horizontalPosition: 'center'
    });
  }else{
        this.question1.updateQuestion(this.question).subscribe(
          (data)=>{
            Swal.fire('Success!!',`This question updated successfully.`,'success').then(
              (e)=>{
                  this.router.navigate(['/admin/quizzes'])
              }
            );
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
  }


cancle(){
  history.back();
}


}
