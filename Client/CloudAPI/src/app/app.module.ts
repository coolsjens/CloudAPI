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
import { AngularFireModule} from 'angularfire2';
import { firebaseConfig } from './app.firebase.config';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from '../pages/register/register';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OwnPage,
    Addpage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OwnPage,
    Addpage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CloudAPIServiceProvider,
    AngularFireAuth

  ]
})
export class AppModule {}
