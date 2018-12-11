import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComicProvider } from 'src/providers/ComicProvider';
import { ToastController } from '@ionic/angular';
import { Comic } from 'src/models/Comic';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.page.html',
  styleUrls: ['./comic.page.scss'],
})
export class ComicPage implements OnInit {
  
  comic : Comic;
  foto : string;

  constructor(    private activatedRoute : ActivatedRoute,
    private router : Router,
    private comicProvider : ComicProvider,
    private toastCtrl : ToastController,
    private sanitizer: DomSanitizer,
    ) { }

  ngOnInit() {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(!isNaN(id)) {
      this.comicProvider.get(id).subscribe(comic => {
      this.comic = comic;
      console.log(this.comic);
    });
  }   
  }
  
  getFoto(comic : Comic){
    return "data:image/jpeg;base64, " +comic.foto;
    console.log(comic.foto);
   }
   getImgContent(comic : Comic): SafeUrl {
     return this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64, " +comic.foto);
   }
 
  onSubmit() {
    this.comicProvider.put(this.comic.id, this.comic).subscribe(comic => {
      this.toastCtrl.create({
        message: "Se ha modificado el comic correctamente",
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
    this.comicProvider.delete(this.comic.id).subscribe(result => {
      let toast = this.toastCtrl.create({
        message: "Se ha borrado el comic correctamente",
        duration: 3000,
        position: 'top'
      }).then(toast => toast.present());
      this.router.navigate(['/comics']);
    }, error => {
      this.toastCtrl.create({
        message: "Se ha producido un error. Inténtalo más tarde",
        duration: 3000,
        position: 'top'
      }).then(toast => toast.present());
    });
  }
}
