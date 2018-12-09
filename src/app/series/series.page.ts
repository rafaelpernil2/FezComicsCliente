import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerieProvider } from 'src/providers/SerieProvider';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {

  series : any[] = [];
  allSeries : any[] = [];

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

  onInput(ev : any) {
    this.initializeItems();

    var val = ev.target.value;

    if (val && val.trim() != '') {
      this.series = this.series.filter((serie) => {
        return (serie.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    
  }

  onClickAdd() {
    this.router.navigate(['/series/add']);
  }

  onClickSerie(id : number) {
    this.router.navigate([`/series/${id}`])
  }
}
