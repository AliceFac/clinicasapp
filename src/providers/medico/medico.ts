import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class MedicoProvider {
  constructor(public http: HttpClient, public afd: AngularFireDatabase) {
    console.log('Hello MedicoProvider Provider');
  }

  listar() {
    return this.afd.list('/medicos')
    .snapshotChanges()
    .map(item => item.map(changes => ({key: changes.payload.key, value: changes.payload.val() })));
  }

  inserir(medico) {
    return this.afd.list('/medicos').push(medico);
  }

  atualizar(id, medico) {
    return this.afd.object('/medicos/' + id).update(medico);
  }

  remover(id) {
    return this.afd.object('/medicos/' + id).remove();
  }

}
