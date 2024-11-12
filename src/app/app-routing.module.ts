import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {CharSortComponent} from "./char-sort/char-sort.component";
import {CharCountComponent} from "./char-count/char-count.component";

const routes: Routes = [
  {
    component: AppComponent,
    path: '',
  },
  {
    path: 'char-count',
    component: CharCountComponent
  },
  {
    path: 'char-sort',
    component: CharSortComponent,
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
