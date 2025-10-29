import { Component, OnInit } from '@angular/core';
import { ComicProvider } from 'src/providers/ComicProvider';
import { Comic } from 'src/models/Comic';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppSettings } from 'src/config/AppSettings';
import { DataUtil } from 'src/utils/DataUtil';


@Component({
  selector: 'app-comics',
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.page.scss'],
})
export class ComicsPage implements OnInit {

  comics: Comic[] = [];
  allComics: Comic[] = [];
  appSettingsObject: any;


  constructor(
    private comicProvider: ComicProvider,
    private router: Router,
    private sanitizer: DomSanitizer,
    private appSettings: AppSettings
  ) {
    this.appSettingsObject = appSettings.json.default;
  }

  init() {
    this.comicProvider.all().subscribe(comics => {
      this.allComics = comics;
      this.comics = comics;
      sessionStorage.setItem('comics', JSON.stringify(this.allComics));
    });
  }

  ngOnInit() {
    this.init();
  }


  ionViewWillEnter() {
    this.init();
  }


  getFoto(comic: Comic) {

    return DataUtil.getImgContent(this.sanitizer, comic);
  }


  initializeItems() {
    this.comics = this.allComics;
  }

  onInput(event: any) {
    this.initializeItems();

    const val = event.target.value;

    if (val && val.trim() !== '') {
      this.comics = this.comics.filter(comic => {
        return (comic.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  onClickAdd() {
    this.router.navigate(['/comics/add']);
  }

  onClickComic(comic: Comic) {
    this.router.navigate([`/comics/${comic.id}`]);
  }


}
