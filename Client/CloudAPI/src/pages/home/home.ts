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
  id: number  = 1;
  authors: string;
  characters: ICharacters;
 characterName:any =["jens","tom","test,","poety"]
 
;
  constructor(public navCtrl: NavController, public cloudAPIProvider: CloudAPIServiceProvider) {
    this.cloudAPIProvider.getBooks(this.id)
      .then(data => {
        //console.log(data)
        this.books = data
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



