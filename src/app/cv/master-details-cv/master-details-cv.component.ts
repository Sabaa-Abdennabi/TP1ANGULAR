import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CvService } from '../services/cv.service';
import { Cv } from '../model/cv';
import { Router } from '@angular/router';
@Component({
  selector: 'app-master-details-cv',
  templateUrl: './master-details-cv.component.html',
  styleUrl: './master-details-cv.component.css',

})
export class MasterDetailsCvComponent {
  cvs : Observable<Cv[]>;
  selectedCv: Observable<Cv | null>;
  cvService = inject(CvService);
  router = inject(Router);

  constructor(){
    this.cvs = this.cvService.getCvs();
    this.selectedCv = this.cvService.selectCv$;
  }
  
  ngOnInit() {
    this.selectedCv.subscribe(cv => {
      if (cv) {
        this.router.navigate(['/list', cv.id]);
      }
    });
  }

}
