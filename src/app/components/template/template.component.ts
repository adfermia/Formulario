import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
  .ng-invalid.ng-touched:not(form) {
    border: 1px solid red;
  }
  `]
})
export class TemplateComponent implements OnInit {
  usuario: any = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: 'ESP',
    sexo: 'hombre',
    acepta: false
  };

  paises = [{
    codigo: 'ESP',
    nombre: 'España'
  }, {
    codigo: 'USA',
    nombre: 'Estados Unidos'
  }, {
    codigo: 'FRA',
    nombre: 'Francia'
  }, {
    codigo: 'RUS',
    nombre: 'Rusia'
  }];
  sexos: string[] = ['hombre' , 'mujer'];
  constructor() { }

  ngOnInit() {
  }

  guardar(forma: NgForm) {
    console.log('Formulario posteado');
    console.log('ngForm', forma);
    console.log('valor', forma.value);
    console.log('nombre', forma.value.nombre);
    console.log('apellido', forma.value.apellido);
    console.log('email', forma.value.email);

    console.log('Usuario', this.usuario);
  }
}
