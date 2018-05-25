import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CloudAPIServiceProvider } from '../../providers/CloudAPI-service';
import { ThrowStmt } from '@angular/compiler';
import { OwnPage } from '../own/own';


@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class Addpage {
  constructor(public navCtrl: NavController, public cloudAPIProvider: CloudAPIServiceProvider) {

  }

  Submit(firstname: string, lastname: string, age: number, gender: string, country: string, city: string, zipcode: number, street: string, number: number) {

    this.cloudAPIProvider.AddCharacter('{"firstname":"' + firstname + '","lastname":"' + lastname + '","age":"' + age + '","gender":"' + gender + '","address":{"country":"' + country + '","city":"' + city + '","zipcode":"' + zipcode + '","street":"' + street + '","number":"' + number + '"  }}')
      .then(data => {
        this.navCtrl.push(OwnPage)
      });

  }
}
