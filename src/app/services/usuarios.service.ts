import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuariosURL: string= 'https://pruebatecnica-699c2-default-rtdb.firebaseio.com/usuarios.json';
  private usuarioURL: string= 'https://pruebatecnica-699c2-default-rtdb.firebaseio.com/usuarios';

  constructor(private http: HttpClient) { }

  borrarUsuario(id: string){
    let url = `${this.usuarioURL}/${id}.json`;
    return this.http.delete(url);
  }



  getUsuario(id: string){

    let url = `${this.usuarioURL}/${id}.json`;
    return this.http.get(url);
    
  } 
  getUsuarios(){
    return this.http.get(this.usuariosURL)
            .pipe(
              map( this.crearArreglo ),
              delay(1000)
            );
  }


  private crearArreglo( usuariosObj: any ) {

    const usuarios: UsuarioModel[] = [];
    if(usuariosObj === null){ return[];}

    for(let registro in usuariosObj){
      usuariosObj[registro].id = registro;
      usuarios.push(usuariosObj[registro]);
    }
    console.log(usuarios);
    return usuarios;

  }

  actualizarUsuario( usuario: UsuarioModel ) {

    const usuarioTemp = {
      ...usuario
    };

    delete usuarioTemp.id;

    let url = `${this.usuarioURL}/${usuario.id}.json`;

    return this.http.put(url, usuarioTemp);
  }


  crearUsuario( usuario: UsuarioModel ) {

    return this.http.post(this.usuariosURL, usuario)
            .pipe(
              map( (resp: any) => {
                usuario.id = resp.name;
                return usuario;
              })
            );

  }




  
}
