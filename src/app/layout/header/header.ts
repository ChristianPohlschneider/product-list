import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  btnClassList = "btn--primary";
  path = "";
  btn_text = "Neues Produkt"
  ngOnInit() {
    this.path = "detail";
    if (this.path =="") {
      this.btn_text = "zurück zur Liste";
    }
  }
}
