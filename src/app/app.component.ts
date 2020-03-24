import { Component } from '@angular/core';
import { HeroService } from './core/services/hero.service';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'heros';
  private searchValue: string = '';

  constructor(private hs: HeroService, public router: Router) {}

  onSearch(event: KeyboardEvent) {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.hs.searchHero(this.searchValue);
  }

}
