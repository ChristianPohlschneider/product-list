import { Product } from "../../../interfaces/product";

export class Productmodels implements Product {
  id: number;
  name: string;
  description: string;
  specs: string;
  stock: number;
  price: number;
  date: Date;

  constructor(data: Partial<Product> = {}) {
    this.id = data.id ?? 0;
    this.name = data.name ?? "";
    this.description = data.description ?? "";
    this.specs = data.specs ?? "";
    this.stock = data.stock ?? 0;
    this.price = data.price ?? 0;
    this.date = data.date ?? new Date('1999-09-19');
  }

  getCleanAddJson() {
    return {
      name: this.name,
      description: this.description,
      specs: this.specs,
      stock: this.stock,
      price: this.price,
      date: this.date
    }
  }
}
