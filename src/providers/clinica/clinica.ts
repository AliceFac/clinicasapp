import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ClinicaProvider {

  constructor(public http: HttpClient, public afd: AngularFireDatabase) {
    console.log('Hello ClinicaProvider Provider');
  }

  listar() {
    return this.afd.list('/clinicas')
    .snapshotChanges()
    .map(item => item.map(changes => ({key: changes.payload.key, value: changes.payload.val() })));
  }

  inserir(clinica) {
    return this.afd.list('/clinicas').push(clinica);
  }

  atualizar(id, clinica) {
    return this.afd.object('/clinicas/' + id).update(clinica);
  }

  remover(id) {
    return this.afd.object('/clinicas/' + id).remove();
  }

}
