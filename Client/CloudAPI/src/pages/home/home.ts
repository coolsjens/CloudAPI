import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { CloudAPIServiceProvider } from '../../providers/CloudAPI-service';
import { ThrowStmt } from '@angular/compiler';
import { OwnPage } from '../own/own';
import { AngularFireAuth } from 'angularfire2/auth';


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
  house: IHouses;
  characterName: string;
  houseName: string;
  url: string;

  ;
  constructor(public navCtrl: NavController, private toast: ToastController, public cloudAPIProvider: CloudAPIServiceProvider, private afAuth: AngularFireAuth) {
    this.getData();
  }

  getData() {
    this.cloudAPIProvider.getBooks(this.page, this.isId, this.id)
      .then(data => {
        this.books = data
      });
  }

  Next() {
    this.isId = false;
    this.page++;
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

  NextPage() {
    this.navCtrl.push(OwnPage);
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

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: 'Welkom bij APP_NAME,' + data.email,
          duration: 3000
        }).present();
      }
      else {
        this.toast.create({
          message: "Kan de authenticatie details niet vinden",
          duration: 3000
        }).present();
      }
    })
  }


  setData(url: string) {


    this.cloudAPIProvider.getCharacters(url)
      .then(data => {
        this.character = data;
        this.characterName = this.character.name
        //console.log(this.character.allegiances[0])
        this.cloudAPIProvider.getHouses(this.character.allegiances[0])
          .then(data => {
            this.house = data;
            this.houseName = this.house.name
            console.log(this.house)
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
  characters: any;
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



