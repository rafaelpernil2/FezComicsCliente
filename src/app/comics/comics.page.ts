import { Component, OnInit } from '@angular/core';
import { ComicProvider } from 'src/providers/ComicProvider';
import { Comic } from 'src/models/Comic';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.page.scss'],
})
export class ComicsPage implements OnInit {

  comics : Comic[] = [];

  constructor(
    private comicProvider : ComicProvider
  ) { }

  ngOnInit() {
    this.comicProvider.all().subscribe(comics => {
      this.comics = comics;
    });
  }
}
