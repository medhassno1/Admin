import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SQLite } from '@ionic-native/sqlite';
import { LoginService } from '../providers/login.service';
import { Sim } from '@ionic-native/sim';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navMaster: Nav;

  rootPage: any = 'LoginPage';
  user: any[];

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public sqlite: SQLite,
    // public sqlService: SqlService,
    private auth: LoginService,
    private sim: Sim
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: 'HomePage' },
      { title: 'Vendedores', component: 'PreventaPage' },
      { title: 'Mapa', component: 'MapGenericPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.obtenerImei();
      this.splashScreen.hide();
      // this.createDatabase();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navMaster.setRoot(page.component);
  }

  private obtenerImei(){
    this.sim.getSimInfo().then( info => {
     let imei= '359825061511512';
      this.auth.buscarUser(imei).then(supervisor =>{
        this.user = supervisor;
        console.log(supervisor);
        this.navMaster.setRoot('LoginPage', {
          user: this.user
        }); 
      });
      
    })
  }

  // private createDatabase(){
  //   this.sqlite.create({
  //     name: 'data.db',
  //     location: 'default' // the location field is required
  //   })
  //   .then((db) => {
  //     this.sqlService.setDatabase(db);
  //     return this.sqlService.createTable();
  //   })
  //   .then(() =>{
  //     this.splashScreen.hide();
  //     this.rootPage = 'HomePage';
  //   })
  //   .catch(error =>{
  //     console.error(error);
  //   });
  // }

  logout() {
    this.navMaster.setRoot('LoginPage');
  }


}
