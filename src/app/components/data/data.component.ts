import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {
  forma: any;
  usuario = {
    nombreCompleto: {
      nombre: 'adrian',
      apellido: 'Fernandez'
    },
    correo: 'adrianfern95@gmail.com',
    // pasatiempos: ['Dormir', 'Jugar', 'Comer']
  };
  constructor() {
    this.forma = new FormGroup({
        nombreCompleto: new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(5)] ),
        apellido: new FormControl('', [Validators.required, this.noFernandez])
      }),
        correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ),
        pasatiempos: new FormArray([
        new FormControl('Dormir', Validators.required)
      ]),
        username: new FormControl('', Validators.required, this.existeUsuario),
        password1: new FormControl('', Validators.required),
        password2: new FormControl()
    });
    // this.forma.setValue(this.usuario);
    // tslint:disable-next-line: no-string-literal
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind( this.forma)
    ]);
    // tslint:disable-next-line: no-string-literal
    this.forma.controls['username'].valueChanges.subscribe( data => {
      console.log(data);
    });
   }

   guardarCambios() {
     console.log(this.forma.value);
     this.forma.reset( {
       nombreCompleto: {
         nombre: '',
         apellido: ''
       },
       correo: ''

     });
   }

   noFernandez( control: FormControl ): any {
          if ( control.value === 'fernandez' ) {
            return  {
              nofernandez: true
            };
          }
          return null;
   }
   noIgual( control: FormControl ): any {
     // tslint:disable-next-line: prefer-const
     let forma: any = this;
    // tslint:disable-next-line: no-string-literal
     if ( control.value !== forma.controls['password1'].value ) {
      return  {
        noigual: true
      };
    }
     return null;
}

   agregarPasatiempo() {

     // tslint:disable-next-line: no-angle-bracket-type-assertion no-string-literal
     (<FormArray> this.forma.controls['pasatiempos']).push(
       new FormControl('Jugar', Validators.required)
     );
   }

   existeUsuario( control: FormControl ): Promise<any> | Observable<any> {

    // tslint:disable-next-line: prefer-const
    let promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'adrian') {
            resolve({ existe: true});
          } else {
            resolve(null);
          }
        }, 3000);
      }
    );
    return promesa;
   }




}
