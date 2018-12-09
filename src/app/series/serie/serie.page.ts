import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SerieProvider } from 'src/providers/SerieProvider';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.page.html',
  styleUrls: ['./serie.page.scss'],
})
export class SeriePage implements OnInit {

  id : number;
  serie : any;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private serieProvider : SerieProvider,
    private toast : ToastController
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => { 
      this.id = params['id'];
      this.serieProvider.get(this.id).subscribe(serie => this.serie = serie);
    });
  }

  onSubmit() {
    this.serieProvider.put(this.serie.id, this.serie).subscribe(serie => {
      this.toast.create({
        message: "Se ha modificado la serie correctamente",
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

  onClickDelete() {
    this.serieProvider.delete(this.serie.id).subscribe(result => {
      this.toast.create({
        message: "Se ha borrado la serie correctamente",
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
