import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/core/services/hero.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private hs: HeroService) {}

  private data;
  

  ngOnInit() {
    this.data = this.hs.currentHero.subscribe(hero => this.data = hero)
    this.data = this.route.snapshot.data['hero']['data'];
    console.log(this.data)
  }



}
