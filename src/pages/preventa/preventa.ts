import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController} from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { VendedorService } from '../../providers/vendedor.service';
import { LoginService } from '../../providers/login.service';

@IonicPage()
@Component({
  selector: 'page-preventa',
  templateUrl: 'preventa.html',
})
export class PreventaPage {

  listsVendedores: any;
  vendedores: FirebaseListObservable<any>;
  myDate: String = new Date().toISOString().substring(0, 10);
  UserLogged : any;
  users: any[] = [];

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public loadCtrl: LoadingController,
    public loginService: LoginService,
    public VendedorService: VendedorService,
    // public sqlService: SqlService
    ) {
      //this.getAllUser();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'menuAdmin');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreventaPage');
    
    let load = this.loadCtrl.create({
      content: 'Cargando...'
    });
    load.present();
    
    this.loginService.getVendedorAll('212').then(data =>{
      console.log(data);
      this.listsVendedores = data;
      load.dismiss(); 
    })
  }

  // getAllUser(){
  //   this.sqlService.getAll()
  //   .then(users => {
  //     this.users = users;
  //   })
  //   .catch( error => {
  //     console.error( error );
  //   });
  // }

    goToMapPage(vendedor){
    this.VendedorService.getVendedor('356812072372426').subscribe(data=>{
      this.navCtrl.push('MapPage', {
        vendedor: data
      });
    });
  }

}
