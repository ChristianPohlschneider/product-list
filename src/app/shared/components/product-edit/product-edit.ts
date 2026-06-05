import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../../services/products';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { signal } from '@angular/core';

@Component({
  selector: 'app-product-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.scss',
})
export class ProductEdit {
  router = inject(Router)
  productService = inject(Products)
  private route = inject(ActivatedRoute)

  detail = this.productService.productdetail
  productlist = signal<Product[]>([]);

  ngOnInit() {
    const currentName = this.route.snapshot.paramMap.get('name');

    if (currentName) {
      this.productService.setProductDetailByName(currentName);
    }

    this.productEdit.patchValue({
      name: this.detail().name,
      description: this.detail().description,
      stock: this.detail().stock,
      price: this.detail().price,
    });
  }

  productEdit = new FormGroup({
    name: new FormControl(this.detail.name, { validators: [Validators.required, Validators.minLength(3)] }),
    description: new FormControl('n/a'),
    // specs: new FormControl('n/a'),
    stock: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
    price: new FormControl(0.00, { validators: [Validators.required, Validators.min(0)] }),
    // date: new FormControl(''),
  });

  onSubmit() {
    if (this.productEdit.valid) {

      const product: Product = {
        name: this.productEdit.value.name ?? "n/a",
        description: this.productEdit.value.description ?? "n/a",
        specs: "n/a",
        stock: Number(this.productEdit.value.stock ?? 0),
        price: Number(this.productEdit.value.price ?? 0),
        date: new Date('1900-09-09')
      };

      this.productService.updateProduct(product);

      this.router.navigate([""]);
    }
  }
}
