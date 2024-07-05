import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() {
    const body = document.querySelector('body')
    if (body) {
      if (body.classList.contains('sfondo')) {
        body.classList.remove('sfondo')
      }
    }
  }
}
