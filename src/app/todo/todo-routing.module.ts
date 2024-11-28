import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { NF404Component } from '../components/nf404/nf404.component';
const routes: Route[] = [
  { path: 'todo', component: TodoComponent },
  { path: '**', component: NF404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRouting {}
