import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerieProvider } from 'src/providers/SerieProvider';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-serie',
  templateUrl: './add-serie.page.html',
  styleUrls: ['./add-serie.page.scss'],
})
export class AddSeriePage implements OnInit {

  serie : any = {}

  constructor(
    private router : Router,
    private serieProvider : SerieProvider,
    private toast : ToastController
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.serieProvider.post(this.serie).subscribe(serie => {
      this.toast.create({
        message: "Se ha creado la serie correctamente",
        duration: 3000,
        position: 'top'
      });
      this.router.navigate(['/series']);
    }, error => {
      this.toast.create({
        message: "Se ha producido un error. Inténtalo más tarde",
        duration: 3000,
        position: 'top'
      });
    });
  }
}
