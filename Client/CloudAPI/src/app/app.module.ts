import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { CloudAPIServiceProvider } from '../providers/CloudAPI-service';
import { OwnPage } from '../pages/own/own';
import { Addpage } from '../pages/add/add';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OwnPage,
    Addpage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OwnPage,
    Addpage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CloudAPIServiceProvider

  ]
})
export class AppModule {}
