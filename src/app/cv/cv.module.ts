import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MasterDetailsCvComponent } from './master-details-cv/master-details-cv.component';
import { DetailsCvComponent } from './details-cv/details-cv.component';
import { ListComponent } from './list/list.component';
import { AddCvComponent } from './add-cv/add-cv.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CvCardComponent } from './cv-card/cv-card.component';
import { EmbaucheComponent } from './embauche/embauche.component';
import { ItemComponent } from './item/item.component';
import { CvResolver } from '../resolvers/cv.resolver';
import { EmbaucheService } from './services/embauche.service';
import { CvService } from './services/cv.service';
import { DefaultImagePipe } from './pipes/default-image.pipe';
import { CvComponent } from './cv/cv.component';

@NgModule({
  declarations: [
    MasterDetailsCvComponent,
    DetailsCvComponent,
    ListComponent,
    AddCvComponent,
    DefaultImagePipe,
    AutocompleteComponent,
    CvCardComponent,
    CvComponent,
    EmbaucheComponent,
    ItemComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  providers: [CvResolver, EmbaucheService, CvService],
})
export class CvModule {}
