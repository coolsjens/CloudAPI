import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IBooks, ICharacters } from "../pages/home/home";
//import { IWeather } from "../pages/home/home";

@Injectable()

export class CloudAPIServiceProvider {

  constructor(public http: HttpClient) {

  }

  getBooks(page: number, isId: boolean, id: number): Promise<IBooks[]> {

    if (isId == false) {
      return new Promise(resolve => {
        this.http.get<IBooks[]>("https://www.anapioficeandfire.com/api/books?page=" + page + "&pageSize=4").subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
    if (isId == true) {
      return new Promise(resolve => {
        this.http.get<IBooks[]>("https://www.anapioficeandfire.com/api/books/" + id).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
  }






  getCharacters(url: string): Promise<ICharacters> {

    return new Promise(resolve => {
      this.http.get<ICharacters>(url).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


}