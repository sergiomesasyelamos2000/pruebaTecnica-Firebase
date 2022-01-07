import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model'; 
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();;
  /* recordarme = false; */

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    //Para que se guarde el email al recargar la página
    /* if(localStorage.getItem('email')){
      this.usuario.email = JSON.parse(localStorage.getItem('email') || '{}');
      this.recordarme = true;
    } */
  }

  login(form: NgForm){

      if(form.invalid){ return; }

      Swal.fire({
        allowOutsideClick: false,
        icon:'info',
        text: 'Espere por favor...',
        confirmButtonColor: '#3754A2'
      });

      Swal.showLoading();

      this.auth.login(this.usuario).subscribe(resp =>{

        console.log(resp);
        Swal.close();
        //Aqui tenemos login valido
        /* if(this.recordarme){
          //Almacenamos el email del usuario
          localStorage.setItem('email', this.usuario.email);
        }else{
          localStorage.removeItem('email');
        }  */
        
        this.router.navigateByUrl('/home');
  
      //Capturamos posibles errores
      }, (err) => {
        let resultado= (err.error.error.message);
  
        if(resultado == "INVALID_PASSWORD"){
          Swal.fire({
            icon:'error',
            title:'Error al autenticar',
            text: 'La contraseña es incorrecta',
            confirmButtonColor: '#3754A2'
            
          });
        }else if(resultado == "EMAIL_NOT_FOUND"){
          Swal.fire({
            icon:'error',
            title:'Error al autenticar',
            text: 'El email es inválido',
            confirmButtonColor: '#3754A2'
          });
        }else{
          Swal.fire({
            icon:'error',
            title:'Error al autenticar',
            text: 'El correo o la contraseña son incorrectos',
            confirmButtonColor: '#3754A2'
          });
          
        }
      });
    }
  
  }
  