import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ClinicaProvider } from '../../providers/clinica/clinica';
import { Clinica } from '../../models/clinica'

@IonicPage()
@Component({
  selector: 'page-clinicas-form',
  templateUrl: 'clinicas-form.html',
})
export class ClinicasFormPage {

  titulo = '';

  clinicaID = undefined;
  clinica = new Clinica();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public clinicaProvider:  ClinicaProvider
    ) {

      const clinicaID = this.navParams.get('itemID');
      const clinica = this.navParams.get('item');

      console.log(clinicaID)
      console.log(clinica)

      if(clinicaID) { 
        this.clinicaID = clinicaID;
        this.clinica = clinica;

        this.titulo = 'Atualizar';

      } else {
        this.clinicaID = undefined;
        this.clinica = new Clinica();

        this.titulo = 'Inserir';
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad clinicasFormPage');
  }

  salvar() {
    console.log(this.clinica);

    if(this.clinicaID) { 

      this.clinicaProvider.atualizar(this.clinicaID, this.clinica).then(_ => {
        this.presentToast('Clínica atualizado com sucesso!');
        this.navCtrl.pop();
      })

    } else { 

      this.clinicaProvider.inserir(this.clinica).then(_ => {
        this.presentToast('Clínica inserido com sucesso!');
        this.navCtrl.pop();
      });
    }
  }

  excluir() {

    const confirm = this.alertCtrl.create({
      title: 'Excluir?',
      message: 'Tem certeza que deseja excluir este item?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            
            this.clinicaProvider.remover(this.clinicaID)
              .then(_ => {
                console.log('ok')
              })
              .catch(error => {
                console.log('error', error);
              })
              this.presentToast('Item excluído com sucesso!')
              this.navCtrl.pop()
          }
        }
      ]
    });
    confirm.present();
  }

  presentToast(mensagem) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'position',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

}
