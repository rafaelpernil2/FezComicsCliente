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

  constructor(
    private router : Router,
    private serieProvider : SerieProvider
  ) { }

  ngOnInit() {
    this.serieProvider.all().subscribe(series => {
      this.series = series;
    });
  }

  onInput($event : any) {
    this.series.filter(serie => serie.includes($event));
  }

  onClickAdd() {
    this.router.navigate(['/series/add']);
  }

  onClickSerie(id : number) {
    this.router.navigate([`/series/${id}`])
  }
}
