import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CvService } from '../cv/services/cv.service';
import { Cv } from '../cv/model/cv';

@Injectable({
  providedIn: 'root',
})
export class CvResolver implements Resolve<Cv | null> {
  constructor(private cvService: CvService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Cv | null> {
    const id = route.params['id'];
    return this.cvService.getCvById(+id).pipe(
      catchError((error) => {
        console.error('Error fetching CV', error);
        return of(null); // Return a default value or null in case of error
      })
    );
  }
}
