import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CurrencyPipe, DatePipe, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, DatePipe, TitleCasePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {

  private route = inject(ActivatedRoute)

  ngOnInit() {
    let currentName = this.route.snapshot.paramMap.get('name');
    if (currentName) {
      this.detail.name = currentName;
    }
  }

  detail = {
    "name": "Gaming Maus",
    "description": "Eine ergonomische Gaming-Maus mit hoher Präzision und einstellbarer DPI.Ideal für FPS- und MOBA - Spiele, bietet sie eine langlebige Bauweise und komfortable Seitentasten für schnelles Reagieren.",
    "specs": "dpi: 6400, cable length: 1.8m, color: Schwarz",
    "stock": 120,
    "price": 25.99,
    "date": '1999-02-11'
  }

  deleteDetail() {
    this.detail.name = "";
  }
}
