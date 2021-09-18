import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class PacienteProvider {

  constructor(public http: HttpClient, public afd: AngularFireDatabase) {
    console.log('Hello PacienteProvider Provider');
  }

  listar() {
    return this.afd.list('/pacientes')
    .snapshotChanges()
    .map(item => item.map(changes => ({key: changes.payload.key, value: changes.payload.val() })));
  }

  inserir(paciente) {
    return this.afd.list('/pacientes').push(paciente);
  }

  atualizar(id, paciente) {
    return this.afd.object('/pacientes/' + id).update(paciente);
  }

  remover(id) {
    return this.afd.object('/pacientes/' + id).remove();
  }

}
