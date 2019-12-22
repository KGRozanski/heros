import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../../core/services/hero.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  private data;
  

  ngOnInit() {
    this.data = this.route.snapshot.data['hero'];
    console.log(this.data)
  
  }

}
