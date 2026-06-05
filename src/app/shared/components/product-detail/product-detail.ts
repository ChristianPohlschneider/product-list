import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {CurrencyPipe, DatePipe, TitleCasePipe} from '@angular/common';
import { Products } from '../../services/products';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, DatePipe, TitleCasePipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {

  private route = inject(ActivatedRoute)
  productService = inject(Products)

  detail = this.productService.productdetail

  ngOnInit() {
    let currentName = this.route.snapshot.paramMap.get('name');
    if (currentName) {
      this.productService.setProductDetailByName(currentName);
    }
  }



  deleteDetail() {
    // this.detail.name = "";
  }
}
