import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SerieProvider } from 'src/providers/SerieProvider';
import { ToastController } from '@ionic/angular';
import { Serie } from 'src/models/Serie';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.page.html',
  styleUrls: ['./serie.page.scss'],
})
export class SeriePage implements OnInit {

  serie : Serie;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private serieProvider : SerieProvider,
    private toastCtrl : ToastController
  ) { }

  ngOnInit() {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(!isNaN(id)) this.serieProvider.get(id).subscribe(serie => this.serie = serie);
  }

  onSubmit() {
    this.serieProvider.put(this.serie.id, this.serie).subscribe(serie => {
      this.toastCtrl.create({
        message: "Se ha modificado la serie correctamente",
        duration: 3000,
        position: 'top'
      }).then(toast => toast.present());
      this.router.navigate(['/series']);
    }, error => {
      this.toastCtrl.create({
        message: "Se ha producido un error. Inténtalo más tarde",
        duration: 3000,
        position: 'top'
      }).then(toast => toast.present());
    });
  }

  onClickDelete() {
    this.serieProvider.delete(this.serie.id).subscribe(result => {
      let toast = this.toastCtrl.create({
        message: "Se ha borrado la serie correctamente",
        duration: 3000,
        position: 'top'
      }).then(toast => toast.present());
      this.router.navigate(['/series']);
    }, error => {
      this.toastCtrl.create({
        message: "Se ha producido un error. Inténtalo más tarde",
        duration: 3000,
        position: 'top'
      }).then(toast => toast.present());
    });
  }
}
