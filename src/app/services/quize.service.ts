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

}
