import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private _http:HttpClient
  ) { }



  public getQuestionByIdAdmin(qId:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qId}`);
  }


  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/addQuestion`,question);
  }

  public deleteQuestion(quesId:any){
    return this._http.delete(`${baseUrl}/question/deleteQuestion/${quesId}`);
  }

  public getSingle(quesId:any){
    return this._http.get(`${baseUrl}/question/${quesId}`)
  }


  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/updateQuestion`, question);
  }
}
