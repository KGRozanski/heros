import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HeroService } from '../services/hero.service'
import { Hero } from '../interfaces/hero.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SingleHeroResolver implements Resolve<Hero> {
  constructor(private hs: HeroService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    //Make request for details of single hero with url paramter
    return this.hs.getHero(route.paramMap.get('id'));
  }
}