import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { Productmodels } from '../components/models/productmodels/productmodels';



@Injectable({
  providedIn: 'root',
})
export class Products {
  // Create a single supabase client for interacting with your database
  supabase = createClient('https://xzapyxcqzqhelqxuicai.supabase.co/', 'sb_publishable_0kLK-LQNzILOAwL_y_FUzw_IpsCxBuB')
  // productlist: Product[] = []

  productlistInsertChannel;

  productlistDeleteChannel;

  productlist = signal<Product[]>([])

  productdetail = signal<Product>({
    "id": 0,
    "name": "n/a",
    "description": "n/a",
    "specs": "n/a",
    "stock": 0,
    "price": 0,
    "date": new Date('1900-09-09')
  })

  async addProduct(product: Productmodels) {
    console.log(product.getCleanAddJson());
    const productData = product.getCleanAddJson()
    const { data, error } = await this.supabase
      .from('products')
      .insert([
        productData,
      ])
      .select()
  }

  async deleteProduct(id: number) {
    const { error } = await this.supabase
      .from('products')
      .delete()
      .eq('id', id)

  }

  // setProductDetailByName(name: string) {
  //   let tmpProduct = this.productlist().find(product => product.name == name)!
  //   if (tmpProduct) this.productdetail.set(tmpProduct)

  //   setTimeout(() => {
  //     this.productdetail.update(product => ({ ...product, description: "banana" }))
  //   }, 2000
  //   )
  // }

  setProductDetailById(id: number) {
    let tmpProduct = this.productlist().find(product => product.id == id)!
    if (tmpProduct) this.productdetail.set(tmpProduct)

  }

  updateProduct(updated: Product) {
    this.productlist.update(list =>
      list.map(p =>
        p.name === updated.name ? updated : p
      )
    );
  }

  async getAllProducts() {
    let response = await this.supabase
      .from('products')
      .select('*')
    console.log(response.data);
    this.productlist.set((response.data ?? []) as Product[])

  }

  constructor() {
    this.getAllProducts()

    //hier werden Änderungen gespeichert auf INSERT. wichtig: jeder channel muss unsubscribet werden!!!
    this.productlistInsertChannel = this.supabase.channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'products' },
        (payload) => {
          let tmpProduct = new Productmodels(payload.new)
          this.productlist.update(list => [...list, tmpProduct])
          // console.log('Change received!', payload)
        }
      )
      .subscribe()

    //Änderungen werden auf DELETE gespeichert
    this.productlistDeleteChannel = this.supabase.channel('custom-delete-channel')
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'products' },
        (payload) => {
          let tmpProductId = payload.old["id"]
          this.productlist.update(list => list.filter(product => product.id != tmpProductId))
          // console.log('Change received!', payload)
        }
      )
      .subscribe()

    //   this.productlist.set([
    //     {
    //       "name": "Gaming Maus",
    //       "description": "Eine ergonomische Gaming-Maus mit hoher Präzision und einstellbarer DPI.Ideal für FPS- und MOBA - Spiele, bietet sie eine langlebige Bauweise und komfortable Seitentasten für schnelles Reagieren.",
    //       "specs": "dpi: 6400, cable length: 1.8m, color: Schwarz",
    //       "stock": 120,
    //       "price": 2599999,
    //       "date": new Date('2026-02-12')
    //     },
    //     {
    //       "name": "USB-C Kabel",
    //       "description": "Robustes Ladekabel für Smartphones, Tablets und Laptops. Unterstützt schnelles Laden und Datenübertragung. Perfekt für den täglichen Einsatz zu Hause, im Büro oder unterwegs.",
    //       "specs": "length: 1m, color: Weiß, type: USB-C zu USB-A",
    //       "stock": 300,
    //       "price": 48.00,
    //       "date": new Date('2026-02-10')
    //     },
    //     {
    //       "name": "Mechanische Tastatur",
    //       "description": "Hochwertige mechanische Tastatur mit RGB-Hintergrundbeleuchtung. Die schnellen Switches sorgen für präzise Eingaben und langen Schreibkomfort.Ideal für Gamer und Vielschreiber.",
    //       "specs": "switches: Red, connection: USB, color: Schwarz",
    //       "stock": 85,
    //       "price": 79.90,
    //       "date": new Date('2026-02-01')
    //     },
    //     {
    //       "name": "HDMI Kabel",
    //       "description": "Ein zuverlässiges HDMI 2.1 Kabel, das gestochen scharfe Bilder in 4K und 8K Qualität liefert. Geeignet für Fernseher, Monitore, Konsolen und Projektoren. Unterstützt HDR und hohe Bildwiederholraten.",
    //       "specs": "length: 2m, version: 2.1, color: Schwarz",
    //       "stock": 250,
    //       "price": 1299,
    //       "date": new Date('2026-05-12')
    //     },
    //     {
    //       "name": "Externe SSD",
    //       "description": "Leistungsstarke und kompakte externe SSD für schnelle Datenübertragung. Perfekt für große Dateien, Gaming - Bibliotheken oder als Backup - Lösung. Stoßfestes Gehäuse für den mobilen Einsatz.",
    //       "specs": "capacity: 1TB, interface: USB 3.2, color: Silber",
    //       "stock": 60,
    //       "price": 109.99,
    //       "date": new Date('2026-01-01')
    //     },
    //     {
    //       "name": "Bluetooth Kopfhörer",
    //       "description": "Kabellose Over-Ear Kopfhörer mit klaren Höhen und kräftigem Bass. Dank 20 Stunden Akkulaufzeit und komfortabler Ohrpolster ideal für lange Musik - oder Gaming - Sessions.",
    //       "specs": "battery life: 20h, color: Schwarz, connection: Bluetooth 5.0",
    //       "stock": 150,
    //       "price": 59.95,
    //       "date": new Date('2026-04-25')
    //     }
    // ])
  }

  ngOnDestroy() {
    this.supabase.removeChannel(this.productlistInsertChannel)
    this.supabase.removeChannel(this.productlistDeleteChannel)
  }

}
