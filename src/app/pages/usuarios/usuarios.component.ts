import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: UsuarioModel[] = [];

  //Para saber si estamos cargando o no info
  cargando:boolean = false;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(){

    this.cargando = true;
    //La cancelamos en el suscribe
    this.usuariosService.getUsuarios()
      .subscribe( resp => {
        this.usuarios = resp;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario: UsuarioModel, i :number){

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ usuario.name }`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonColor: '#3754A2',
      showCancelButton: true
      
    }).then(resp => {
      //El value es true por defecto
      if(resp.value){
        this.usuarios.splice(i, 1);
        this.usuariosService.borrarUsuario(usuario.id || '').subscribe();
      }
    });

  }


}
