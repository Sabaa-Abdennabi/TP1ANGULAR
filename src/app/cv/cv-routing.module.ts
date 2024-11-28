import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { MasterDetailsCvComponent } from './master-details-cv/master-details-cv.component';
import { DetailsCvComponent } from './details-cv/details-cv.component';
import { CvResolver } from '../resolvers/cv.resolver';
import { NF404Component } from '../components/nf404/nf404.component';
import { AddCvComponent } from './add-cv/add-cv.component';
import { CvComponent } from './cv/cv.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Route[] = [
    {
      path: 'cv',
      component: CvComponent,
    },
    { path: 'cv/add', component: AddCvComponent, canActivate: [AuthGuard] },
    { path: 'cv/:id', component: DetailsCvComponent },


    {
      path: 'list',
      component: MasterDetailsCvComponent,
      children: [
        {
          path: ':id',
          component: DetailsCvComponent,
          resolve: { cv: CvResolver }, 
        }
      ]
    },
    { path: '**', component: NF404Component },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }