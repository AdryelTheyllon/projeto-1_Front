import { ListComponent } from './list/list.component';
import { Funcionario } from './funcionario';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Data } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export default class FuncionarioService {

  constructor( private _angularFireDatabase: AngularFireDatabase) { }

  insert(funcionario: Funcionario){
      this._angularFireDatabase.list("funcionarios").push(funcionario)
      .then((result: any) =>{
        console.log(result,key)
      })
  }

  update(funcionario:Funcionario, key: string){
    this._angularFireDatabase.list("funcionarios").update(key, funcionario)

  }

  getAll(){
  return this._angularFireDatabase.list("funcionarios")
   .snapshotChanges()
   .pipe(
     map(changes =>{
       return changes.map(data =>({key: data.payload.key, ...data.payload.val }));
     } ))

    }

  delete(key:string){
    this._angularFireDatabase.object('funcionarios/'+key+'').remove();
  }
}

function key(result: any, key: any) {
  throw new Error('Function not implemented.');
}

