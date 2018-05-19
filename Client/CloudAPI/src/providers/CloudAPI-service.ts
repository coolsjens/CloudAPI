import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'; 
import { IBooks } from "../pages/home/home";
//import { IWeather } from "../pages/home/home";

@Injectable() 

export class CloudAPIServiceProvider{

    constructor(public http: HttpClient ) { 
    
    } 

    getBooks() : Promise<IBooks[]> { 

        return new Promise(resolve => { 
          this.http.get<IBooks[]>("https://anapioficeandfire.com/api/books/2").subscribe(data => { 
          resolve(data); 
          }, err => { 
            console.log(err); 
          }); 
        }); 
      } 


}