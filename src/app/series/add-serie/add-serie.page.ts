import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-serie',
  templateUrl: './add-serie.page.html',
  styleUrls: ['./add-serie.page.scss'],
})
export class AddSeriePage implements OnInit {

  serie : any = {}

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.serie);
    this.router.navigate(['/series']);
  }
}
