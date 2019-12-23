import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/core/services/hero.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private hs: HeroService, private route: ActivatedRoute) { }

  private hero;

  ngOnInit() {
    this.hero = this.route.snapshot.data['heroDetails'][0];
    console.log(this.hero)
  }
  

}
