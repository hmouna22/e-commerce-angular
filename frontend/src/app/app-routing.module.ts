import { NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate, CanActivateFn } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './pages/about/about.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { authGuard } from './auth.guard';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'dashboard', component: DashboardComponent ,
  canActivate:[authGuard]},
  { path: 'about', component: AboutComponent }, 
  { path: 'addproduct', component: AddProductComponent },
  { path: 'myProfile', component:MyProfileComponent},
  // additional routes...
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
