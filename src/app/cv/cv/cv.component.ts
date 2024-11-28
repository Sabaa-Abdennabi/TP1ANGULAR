import { Component, inject } from '@angular/core';
import { Cv } from '../model/cv';
import { LoggerService } from '../../services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../services/cv.service';
import { catchError, map, Observable, of, share, shareReplay } from 'rxjs';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent {
  cvsJunior: Observable<Cv[]>;
  cvsSenior: Observable<Cv[]>;
  selectedCv: Observable<Cv | null>;
  logger = inject(LoggerService);
  toastr = inject(ToastrService);
  cvService = inject(CvService);
  /*   selectedCv: Cv | null = null; */
  date = new Date();

  constructor() {
    const cvs = this.cvService.getCvs().pipe(
      catchError((error) => {
        this.toastr.error(`Problème d'accès aux données`);
        return of([]);
      }),
      shareReplay(1)
    );
    this.cvsJunior = cvs.pipe(map((cvs) => cvs.filter((cv) => cv.age < 40)));
    this.cvsSenior = cvs.pipe(map((cvs) => cvs.filter((cv) => cv.age >= 40)));
    this.logger.logger('je suis le cvComponent');
    this.toastr.info('Bienvenu dans notre CvTech');
    this.selectedCv = this.cvService.selectCv$;
  }
  openTab(event: Event, tabName: string) {
    const tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove('active');
    }

    const tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove('active');
    }

    const target = event.currentTarget as HTMLElement;
    document.getElementById(tabName)?.classList.add('active');
    target.classList.add('active');
  }
}
