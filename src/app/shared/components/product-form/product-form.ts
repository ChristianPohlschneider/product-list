import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from '../../services/products';

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
    name: new FormControl('n/a', { validators: [Validators.required, Validators.minLength(3)] }),
    description: new FormControl('n/a'),
    // specs: new FormControl('n/a'),
    stock: new FormControl('0', { validators: [Validators.required, Validators.min(0)] }),
    price: new FormControl('0.00', { validators: [Validators.required, Validators.min(0)] }),
    // date: new FormControl(''),
  });

  onSubmit() {
    if (this.productForm.valid) {

      let product: Product = {
        "name": this.productForm.value.name?this.productForm.value.name : "n/a",
        "description": this.productForm.value.description?this.productForm.value.description : "n/a",
        "specs": "n/a",
        "stock": Number(this.productForm.value.stock?this.productForm.value.stock : 0),
        "price": Number(this.productForm.value.price?this.productForm.value.price : 0.0),
        "date": new Date('1900-09-09')
      }

      this.productService.addProduct(product)
      this.router.navigate([""])
    }

  }
}
