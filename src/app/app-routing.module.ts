import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailedComponent } from './components/detailed-book/detailed-book.component';
import { AuthGuard } from './auth.guard';
import { RegistryComponent } from './registry/registry.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'detailed/:id', component: DetailedComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorComponent },
  { path: 'registry', component: RegistryComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
