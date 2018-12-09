import { Component, OnInit } from '@angular/core';
import { ComicProvider } from 'src/providers/ComicProvider';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.page.scss'],
})
export class ComicsPage implements OnInit {

  comics : any[] = [];
  // comics : any[] = [
  //   {
  //     nombre : "Superman",
  //     anotacionPrivada : "La kriptonita le flipa",
  //     foto : "https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/439368/439368._SX1280_QL80_TTD_.jpg"
  //   },
  //   {
  //     nombre : "Batman",
  //     anotacionPrivada : "Los coches le flipan",
  //     foto : "https://images-na.ssl-images-amazon.com/images/I/51lbiihafXL.jpg"
  //   },
  //   {
  //     nombre : "Aquaman",
  //     anotacionPrivada : "Los caballitos de mar le flipan",
  //     foto : "https://www.ecccomics.com/content/productos/4850/cubierta_aquaman_subdiego_WEB.jpg"
  //   }
  // ];

  constructor(
    private comicProvider : ComicProvider
  ) { }

  ngOnInit() {
    this.comicProvider.all().subscribe(comics => {
      console.log(comics);
      this.comics = comics;
    });
  }
}
