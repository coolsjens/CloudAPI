import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CloudAPIServiceProvider } from '../../providers/CloudAPI-service';
import { ThrowStmt } from '@angular/compiler';
import { HomePage } from '../home/home';
import { Addpage } from '../add/add';


@Component({
  selector: 'page-own',
  templateUrl: 'own.html'
})
export class OwnPage {
  characters: ICharacterOwn[];
  character: ICharacterOwn[];
  address: IAddressesOwn[];
  id: number = 1;
  page: number = 0;
  isId: boolean = false;
  country:string;
  city:string;
  number:number
  zipcode:number;
  street:string
  constructor(public navCtrl: NavController, public cloudAPIProvider: CloudAPIServiceProvider) {
    this.getData();
  }
  NextPage() {
    this.navCtrl.push(HomePage);
  }

  Add() {
    this.navCtrl.push(Addpage);
  }
  getData() {
    this.cloudAPIProvider.getCharactersOwn(this.page, this.isId, this.id)
      .then(data => {
        //console.log(data)
        this.characters = data;
      });
  }

  Submit(CharacterId) {
    this.isId = true;
    this.id = CharacterId
    this.cloudAPIProvider.getCharactersOwn(this.page, this.isId, this.id)
      .then(data => {
        this.character = data
        this.country = this.character.address.country
        this.city = this.character.address.city
        this.zipcode = this.character.address.zipcode
        this.number = this.character.address.number
        this.street = this.character.address.street
      });
  }
}



export interface ICharacterOwn {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  address: any;
}

export interface IAddressesOwn {
  id: number;
  country: string;
  city: string;
  street: string;
  zipcode: number;
  number: number;
}


