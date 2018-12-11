import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComicProvider } from 'src/providers/ComicProvider';
import {ToastController } from '@ionic/angular';
import { Comic } from 'src/models/Comic';

@Component({
  selector: 'app-add-comic',
  templateUrl: './add-comic.page.html',
  styleUrls: ['./add-comic.page.scss'],
})
export class AddComicPage implements OnInit {

comic : Comic;
imageURI:any;
imageFileName:any;

  constructor(
    private router : Router,
    private comicProvider : ComicProvider,
    private toastCtrl : ToastController
  ) {
    this.comic = new Comic();
   }

  ngOnInit() {
  }

  onSubmit() {
    this.comicProvider.post(this.comic).subscribe(comic => {
      this.toastCtrl.create({
        message: "Se ha creado el comic correctamente",
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

  /*
  uploadFile() {
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg";
      this.toastCtrl.create({
        message: "Imagen subida con exito",
        duration: 3000,
        position: 'top'
      }).then(toast => toast.present());
    }, (err) => {
      console.log(err);
      this.toastCtrl.create({
        message: "Se ha producido un error. Inténtalo más tarde",
        duration: 3000,
        position: 'top'
      }).then(toast => toast.present());
    });
  } */

}
