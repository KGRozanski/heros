import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HeroService } from '../services/hero.service'
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AvatarResolver implements Resolve<string> {
  constructor(private hs: HeroService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    //Make request for details of single hero with url paramter
    return this.hs.getAvatar(route.paramMap.get('id'));
  }
}