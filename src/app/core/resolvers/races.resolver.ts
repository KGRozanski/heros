import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HeroService } from '../services/hero.service'
import { Observable } from 'rxjs';
import { Races } from '../interfaces/races.interface';

@Injectable({ providedIn: 'root' })
export class RacesResolver implements Resolve<Races> {
  constructor(private hs: HeroService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.hs.getRaces();
  }
}