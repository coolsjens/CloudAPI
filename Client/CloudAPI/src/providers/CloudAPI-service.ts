import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBooks, ICharacters, IHouses } from "../pages/home/home";
import { ICharacterOwn, IAddressesOwn } from "../pages/own/own";
//import { IWeather } from "../pages/home/home";

@Injectable()

export class CloudAPIServiceProvider {

  constructor(public http: HttpClient) {

  }

  getBooks(page: number, isId: boolean, id: number): Promise<IBooks[]> {

    if (isId == false) {
      return new Promise(resolve => {
        this.http.get<IBooks[]>("https://cors-anywhere.herokuapp.com/https://www.anapioficeandfire.com/api/books?page=" + page + "&pageSize=4").subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
    if (isId == true) {
      return new Promise(resolve => {
        this.http.get<IBooks[]>("https://cors-anywhere.herokuapp.com/https://www.anapioficeandfire.com/api/books/" + id).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
  }

  getBook(page: number, isId: boolean, id: number) {
    if (isId == true) {
      return new Promise(resolve => {
        this.http.get("https://cors-anywhere.herokuapp.com/https://www.anapioficeandfire.com/api/books/" + id).subscribe(data => {
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

  getHouses(url: string): Promise<IHouses> {

    return new Promise(resolve => {
      this.http.get<IHouses>(url).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  //----------------------------------------------------------------------------//
  getCharactersOwn(page: number, isId: boolean, id: number): Promise<ICharacterOwn[]> {

    if(isId == false){
    return new Promise(resolve => {
      this.http.get<ICharacterOwn[]>("http://localhost:5000/api/character").subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  if(isId == true){
    return new Promise(resolve => {
      this.http.get<ICharacterOwn[]>("http://localhost:5000/api/character/"+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}

  getAddressesOwn(): Promise<IAddressesOwn[]> {

    return new Promise(resolve => {
      this.http.get<IAddressesOwn[]>("http://localhost:5000/api/address").subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  AddCharacter(data) {
    const header = new HttpHeaders({
      "Content-Type" : "application/json"
    });
    return new Promise(resolve => {
      this.http.post("http://localhost:5000/api/character",data,{headers:header}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }



}