import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {

  series : any[] = [
    {
      nombre : "Superman",
      anotacionPrivada : "La kriptonita le flipa",
      genero : "Acción"
    },
    {
      nombre : "Batman",
      anotacionPrivada : "Los coches le flipan",
      genero : "Drama"
    },
    {
      nombre : "Aquaman",
      anotacionPrivada : "Los caballitos de mar le flipan",
      genero : "Momoa"
    }
  ];

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  onClickAdd() {
    this.router.navigate(['/series/add'])
  }
}
