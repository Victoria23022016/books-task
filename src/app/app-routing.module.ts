import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ErrorComponent } from './error/error.component';
import { DetailedComponent } from './detailed-book/detailed-book.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'detailed/:id', component: DetailedComponent },
  { path: 'cart', component: CartComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
