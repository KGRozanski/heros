import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/core/services/hero.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, AfterViewInit {

  constructor(private hs: HeroService, private route: ActivatedRoute, private elRef: ElementRef) { }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    //Setting downloaded blob avatar to img element
    var img = this.elRef.nativeElement.getElementsByClassName('avatar')[0];
    img.src = URL.createObjectURL(this.heroAvatar);
  }

  private hero;
  private heroAvatar;

  ngOnInit() {
    //Getting data from the resolver
    this.hero = this.route.snapshot.data['heroDetails'][0];
    this.heroAvatar = this.route.snapshot.data['heroAvatar'];
    console.log(this.hero);
  }
  

}
