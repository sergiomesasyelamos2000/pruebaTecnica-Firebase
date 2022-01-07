import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario = new UsuarioModel();

  constructor(private usuariosService: UsuariosService,
              private route: ActivatedRoute) { }

  ngOnInit(){

    const id = this.route.snapshot.paramMap.get('id') || '';

    console.log(id);

    if(id !== 'nuevo'){
      //Tengo que ir a firebase para obtener info
      this.usuariosService.getUsuario(id)
      .subscribe( (resp: any) => {
        console.log(resp);
        this.usuario = resp;
        this.usuario.id = id;
      });
    }

  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      title:'Espere por favor',
      text: 'Guardando información...',
      confirmButtonColor: '#3754A2'
    });
    Swal.showLoading();


    let peticion: Observable<any>;

    if ( this.usuario.id ) {
      peticion = this.usuariosService.actualizarUsuario( this.usuario );
    } else {
      peticion = this.usuariosService.crearUsuario( this.usuario );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        icon:'success',
        title:this.usuario.name,
        text: 'Se actualizó correctamente',
        confirmButtonColor: '#3754A2'
      });

    });



  }

}
