import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MedicoProvider } from '../../providers/medico/medico';


@IonicPage()
@Component({
  selector: 'page-medicos-list',
  templateUrl: 'medicos-list.html',
})
export class MedicosListPage {

  medicos = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public medicoProvider: MedicoProvider
    ) {

      this.medicoProvider.listar().subscribe(_data => {
        console.log(_data);

        this.medicos = _data;
     })
  }
  addItem() {
    this.navCtrl.push('MedicosFormPage');
  }

  editItem(item) {
    const medicoID = item.key;
    const medico = item.value;

    this.navCtrl.push('MedicosFormPage', { itemID: medicoID, item: medico } );
  }


}
