import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerieProvider } from 'src/providers/SerieProvider';
import { ToastController } from '@ionic/angular';
import { Serie } from 'src/models/Serie';

@Component({
  selector: 'app-add-serie',
  templateUrl: './add-serie.page.html',
  styleUrls: ['./add-serie.page.scss'],
})
export class AddSeriePage implements OnInit {

  serie : Serie;

  constructor(
    private router : Router,
    private serieProvider : SerieProvider,
    private toastCtrl : ToastController
  ) {
    this.serie = new Serie();
  }

  ngOnInit() {
    

  }

  onSubmit() {
    
    this.serieProvider.post(
      this.serie
      
      ).subscribe(serie => {
      this.toastCtrl.create({
        message: "Se ha creado la serie correctamente",
        duration: 3000,
        position: 'bottom'
      }).then(toast => toast.present());
      this.router.navigate(['/series']);
    }, error => {
      this.toastCtrl.create({
        message: "Se ha producido un error. Inténtalo más tarde",
        duration: 3000,
        position: 'bottom'
      }).then(toast => toast.present());
    });
  }
}
