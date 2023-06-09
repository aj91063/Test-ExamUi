import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public categories(){
    return this.http.get(`${baseUrl}/category/allCategories`);
  }

  public addCategory(category:any){
    return this.http.post(`${baseUrl}/category/addCategory`,category);
  }
  public getCategoryByTitle(title:any){
    return this.http.get(`${baseUrl}/category/title/${title}`);

  }

  public deleteCategory(id:any){
    return this.http.delete(`${baseUrl}/category/deleteCategory/${id}`);
  }


  public getCategoryById(cid:any){
        return this.http.get(`${baseUrl}/category/${cid}`);
  }


  public updateCategory(category:any){
          return this.http.put(`${baseUrl}/category/updateCategory`,category);
  }
}
