import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {CurrencyPipe, DatePipe, TitleCasePipe} from '@angular/common';
import { Products } from '../../services/products';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, CurrencyPipe, DatePipe, TitleCasePipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  productService = inject(Products)

  // list: Product[] = [
  //   {
  //     "name": "Gaming Maus",
  //     "description": "Eine ergonomische Gaming-Maus mit hoher Präzision und einstellbarer DPI.Ideal für FPS- und MOBA - Spiele, bietet sie eine langlebige Bauweise und komfortable Seitentasten für schnelles Reagieren.",
  //     "specs": "dpi: 6400, cable length: 1.8m, color: Schwarz",
  //     "stock": 120,
  //     "price": 2599999,
  //     "date": new Date('2026-02-12')
  //   },
  //   {
  //     "name": "USB-C Kabel",
  //     "description": "Robustes Ladekabel für Smartphones, Tablets und Laptops. Unterstützt schnelles Laden und Datenübertragung.Perfekt für den täglichen Einsatz zu Hause, im Büro oder unterwegs.",
  //     "specs": "length: 1m, color: Weiß, type: USB-C zu USB-A",
  //     "stock": 300,
  //     "price": 48.00,
  //     "date":  new Date('2026-02-10')
  //   },
  //   {
  //     "name": "Mechanische Tastatur",
  //     "description": "Hochwertige mechanische Tastatur mit RGB-Hintergrundbeleuchtung. Die schnellen Switches sorgen für präzise Eingaben und langen Schreibkomfort.Ideal für Gamer und Vielschreiber.",
  //     "specs": "switches: Red, connection: USB, color: Schwarz",
  //     "stock": 85,
  //     "price": 79.90,
  //     "date":  new Date('2026-02-01')
  //   },
  //   {
  //     "name": "HDMI Kabel",
  //     "description": "Ein zuverlässiges HDMI 2.1 Kabel, das gestochen scharfe Bilder in 4K und 8K Qualität liefert.Geeignet für Fernseher, Monitore, Konsolen und Projektoren. Unterstützt HDR und hohe Bildwiederholraten.",
  //     "specs": "length: 2m, version: 2.1, color: Schwarz",
  //     "stock": 250,
  //     "price": 1299,
  //     "date":  new Date('2026-05-12')
  //   },
  //   {
  //     "name": "Externe SSD",
  //     "description": "Leistungsstarke und kompakte externe SSD für schnelle Datenübertragung.Perfekt für große Dateien, Gaming - Bibliotheken oder als Backup - Lösung. Stoßfestes Gehäuse für den mobilen Einsatz.",
  //     "specs": "capacity: 1TB, interface: USB 3.2, color: Silber",
  //     "stock": 60,
  //     "price": 109.99,
  //     "date":  new Date('2026-01-01')
  //   },
  //   {
  //     "name": "Bluetooth Kopfhörer",
  //     "description": "Kabellose Over-Ear Kopfhörer mit klaren Höhen und kräftigem Bass. Dank 20 Stunden Akkulaufzeit und komfortabler Ohrpolster ideal für lange Musik - oder Gaming - Sessions.",
  //     "specs": "battery life: 20h, color: Schwarz, connection: Bluetooth 5.0",
  //     "stock": 150,
  //     "price": 59.95,
  //     "date":  new Date('2026-04-25')
  //   }
  // ]
    list = this.productService.productlist;

}
