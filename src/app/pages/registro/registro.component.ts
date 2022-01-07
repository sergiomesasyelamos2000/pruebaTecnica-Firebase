import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService,
              private router: Router ) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
    
  }

  onSubmit(form: NgForm){

    if(form.invalid){ return; }


    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading()

    this.auth.nuevoUsuario(this.usuario).subscribe(resp =>{

      console.log(resp);

      Swal.close();
      this.router.navigateByUrl('/home');

    }, (err) => {
     let resultado= (err.error.error.message);
  
        if(resultado == "EMAIL_EXISTS"){
          Swal.fire({
            icon:'error',
            title:'Error al autenticar',
            text: 'El email ya existe',
            confirmButtonColor: '#3754A2'
          });
        }else{
          Swal.fire({
            icon:'error',
            title:'Error al autenticar',
            text: resultado,
            confirmButtonColor: '#3754A2'
          });
          
        }
    });
  }

}
