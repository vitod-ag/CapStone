import { Component } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent {
  scrollToSection(event: Event) {
    event.preventDefault(); 
    const element = document.getElementById('createFormation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
