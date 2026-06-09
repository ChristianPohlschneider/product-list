import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from '../../services/products';
import { Productmodels } from '../models/productmodels/productmodels';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  router = inject(Router)
  productService = inject(Products)

  productForm = new FormGroup({
    id: new FormControl(0, {nonNullable:true}),
    name: new FormControl('n/a', {nonNullable:true, validators: [Validators.required, Validators.minLength(3)] }),
    description: new FormControl('n/a', {nonNullable:true}),
    specs: new FormControl('n/a', {nonNullable:true}),
    stock: new FormControl(0, {nonNullable:true, validators: [Validators.required, Validators.min(0)] }),
    price: new FormControl(0.00, {nonNullable:true, validators: [Validators.required, Validators.min(0)] }),
    date: new FormControl(new Date(), {nonNullable:true}),
  });

  onSubmit() {
    if (this.productForm.valid) {

      // let product: Product = {
      //   "name": this.productForm.value.name?this.productForm.value.name : "n/a",
      //   "description": this.productForm.value.description?this.productForm.value.description : "n/a",
      //   "specs": "n/a",
      //   "stock": Number(this.productForm.value.stock?this.productForm.value.stock : 0),
      //   "price": Number(this.productForm.value.price?this.productForm.value.price : 0.0),
      //   "date": new Date('1900-09-09')
      // }

      let product = new Productmodels(this.productForm.value)

      this.productService.addProduct(product)
      this.router.navigate([""])
    }

  }
}
