import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizeService {

  constructor(private http:HttpClient) { }
public getAllQuizzes(){
  return this.http.get(`${baseUrl}/quiz/getAllQuizzes`);
}

public getQuizByTitle(title:any){
    return this.http.get(`${baseUrl}/quiz/title/${title}`);
}

public addQuiz(quizData:any){
  return this.http.post(`${baseUrl}/quiz/addQuiz`,quizData);
}

public deleteQuiz(qid:any){
 return this.http.delete(`${baseUrl}/quiz/deleteQuiz/${qid}`);
}

}
