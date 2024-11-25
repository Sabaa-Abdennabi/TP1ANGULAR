import { Component, inject } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Observable, of, switchMap, tap } from 'rxjs';
import { CvService } from '../services/cv.service';
import { Cv } from '../model/cv';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  router = inject(Router);
  searchReasults$ : Observable<Cv[]>=of([])

  get search(): AbstractControl {
    return this.form.get('search')!;
  }
  form = this.formBuilder.group({ search: [''] });
  constructor() {
    this.searchReasults$ = this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((search) => search.trim().length > 0),
      switchMap((search) => this.cvService.searchCvs(search))
    );
  }
}
