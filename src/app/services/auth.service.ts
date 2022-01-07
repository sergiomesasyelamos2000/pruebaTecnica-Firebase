import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url= ' https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey= 'AIzaSyAlIHpK-Ny7quVkegqvifcGznTnA_0s_-I';
  
  userToken: string;

  //Crear nuevos usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor(private http: HttpClient) {

    this.leerToken();
   }


  logout(){
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel){
    const authData= {
      email:usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`, 
      authData
    ).pipe(
      map( (resp:any) => {
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );
  }

  nuevoUsuario(usuario: UsuarioModel){
    const authData= {
      email:usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`, 
      authData
    ).pipe(
      map( (resp:any) => {
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );
  }

  private guardarToken(idToken: string){

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    //Almacenamos fecha
    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());

  }
  leerToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = JSON.parse(localStorage.getItem('token') || '{}');
   } else {
      this.userToken = '';
    }

    return this.userToken;

  }

  estaAutenticado(): boolean{

    if(this.userToken.length < 2){
      return false;
    }

    //Esta es la fecha en la que el token expira
    const expira = Number(localStorage.getItem('expira'));
    const fecha = new Date();
    fecha.setTime(expira);

    if(fecha > new Date()){
      return true;
    }else{
      return false;
    }
  }
}


