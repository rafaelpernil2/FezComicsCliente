import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerieProvider } from 'src/providers/SerieProvider';
import { Serie } from 'src/models/Serie';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {

  series : Serie[] = [];
  allSeries : Serie[] = [];

  constructor(
    private router : Router,
    private serieProvider : SerieProvider
  ) { }

  ngOnInit() {
    this.serieProvider.all().subscribe(series => {
      this.allSeries = series;
      this.series = series;
    });
  }

  initializeItems(){
    this.series = this.allSeries;
  }

  onInput($event : any) {
    this.initializeItems();

    var val = $event.target.value;

    if (val && val.trim() != '') {
      this.series = this.series.filter(serie => {
        return (serie.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1)
                || (serie.genero.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  onClickAdd() {
    this.router.navigate(['/series/add']);
  }

  onClickSerie(serie : Serie) {
    this.router.navigate([`/series/${serie.id}`])
  }
}
