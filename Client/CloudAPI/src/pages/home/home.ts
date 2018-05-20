import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CloudAPIServiceProvider } from '../../providers/CloudAPI-service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  books: IBooks[];
  book: IBooks[];
  id: number = 1;
  page: number = 1
  isId: boolean = false;
  authors: string;
  character: ICharacters;
  house :IHouses;
  characterName: string;
  houseName: string;
  url:string;

    ;
  constructor(public navCtrl: NavController, public cloudAPIProvider: CloudAPIServiceProvider) {
    this.getData();
  }

  getData(){
    this.cloudAPIProvider.getBooks(this.page, this.isId, this.id)
    .then(data => {
      this.books = data
    });
  }

  Next() {
    this.isId = false;
    this.page++;
    //if(this.books[this.page*4-3].isbn == null){
    //  this.page--;
    //}
    this.getData();
  }

  Previous() {
    this.isId = false;
    this.page--;
    if (this.page < 1) {
      this.page = 1
    }
    this.getData();
  }

  Start() {
    
    this.isId = false;
    this.page = 1;
    this.getData();
  }

  Submit(boekId) {
    this.isId = true;
    this.id = boekId
    this.cloudAPIProvider.getBooks(this.page, this.isId, this.id)
      .then(data => {
        this.book = data
        this.setData(this.book.characters[0]);
      });
  }

  setData(url:string) {
    
   
    this.cloudAPIProvider.getCharacters(url)
      .then(data => {
        this.character = data;
        this.characterName = this.character.name
        //console.log(this.character.allegiances[0])
        this.cloudAPIProvider.getHouses(this.character.allegiances[0])
        .then(data => {
          this.house = data;
          this.houseName = this.house.name
          console.log(this.houseName)
        });
      });

  }


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
  characters: any[];
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

export interface IHouses {
  url: string;
  name: string;
  region: string;
  coatOfArms: string;
  words: string;
  titles: string[];
  seats: string[];
  currentLord: string;
  heir: string;
  overlord: string;
  founded: string;
  founder: string;
  diedOut: string;
  ancestralWeapons: string[];
  cadetBranches: any[];
  swornMembers: string[];
}



