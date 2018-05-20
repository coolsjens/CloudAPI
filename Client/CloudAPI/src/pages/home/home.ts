import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CloudAPIServiceProvider } from '../../providers/CloudAPI-service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  books : IBooks[];
  book : IBooks[];
  id: number  = 1;
  page:number = 1
  isId : boolean = false;
  authors: string;
  characters: ICharacters;
  characterName:any =["jens","tom","test,","poety"]
 
;
  constructor(public navCtrl: NavController, public cloudAPIProvider: CloudAPIServiceProvider) {
    this.cloudAPIProvider.getBooks(this.page,this.isId,this.id)
      .then(data => {
        this.books = data
        //this.setData();
      });
  }

  Next() {
    this.isId = false;
    this.page++;
    //if(this.books[this.page*4-3].isbn == null){
    //  this.page--;
    //}
    this.cloudAPIProvider.getBooks(this.page,this.isId,this.id)
    .then(data => {
      this.books = data
      //this.setData();
    });
  }

  Previous() {
    this.isId = false;
    this.page--;
    if(this.page <1){
      this.page = 1
    }
    this.cloudAPIProvider.getBooks(this.page,this.isId,this.id)
    .then(data => {
      this.books = data
      //this.setData();
    });
  }

  Start() {
    this.isId = false;
    this.page = 1;
    this.cloudAPIProvider.getBooks(this.page,this.isId,this.id)
    .then(data => {
      this.books = data
      //this.setData();
    });
  }

  Submit(boekId){
    this.isId = true;
    this.id = boekId
    this.cloudAPIProvider.getBooks(this.page,this.isId,this.id)
    .then(data => {
      this.book = data
      //this.setData();
    });
  }

  /*setData(){
    //this.authors = this.books.authors[0];
    for( var i = 0;i<4;i++){
      this.cloudAPIProvider.getCharacters(this.books.characters[i])
      .then(data => {
        this.characters = data;
        //this.characterName.push(this.characterName.name)
        
        
      });
    }
  }*/


}
export interface IBooks {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: Date;
  characters: string[];
  povCharacters: string[];
}

export interface ICharacters {
  url: string;
  name: string;
  gender: string;
  culture: string;
  born: string;
  died: string;
  titles: string[];
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiances: string[];
  books: string[];
  povBooks: string[];
  tvSeries: string[];
  playedBy: string[];
}



