import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CartCardComponent } from './components/cart-card/cart-card.component';
import { CardComponent } from './components/card/card.component';
import { BannerComponent } from './components/banner/banner.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilterStoreComponent } from './components/filter-store/filter-store.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderItemsComponent } from './components/order-items/order-items.component';
import { ProductsComponent } from './components/products/products.component';
import { StripeContainerComponent } from './components/stripe-container/stripe-container.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StoreComponent } from './pages/store/store.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { CartsModule } from './services/CartsModule';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { UsersComponent } from './components/users/users.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ProductItemComponent } from './components/product-item/product-item.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CartCardComponent,
    CardComponent,
    BannerComponent,
    DashboardComponent,
    FilterStoreComponent,
    FooterComponent,
    NavbarComponent,
    OrdersComponent,
    OrderItemsComponent,
    ProductsComponent,
    ProductItemComponent,
    StripeContainerComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    StoreComponent,
    AddProductComponent,
    MyProfileComponent,
    ManageProductsComponent,
    ProductItemComponent,
    ManageCategoriesComponent,
    AddCategoryComponent,
    UsersComponent,
    ImageUploadComponent,
    ManageOrdersComponent,
    CheckoutComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule, 
    ReactiveFormsModule,
    // CloudinaryModule,
    CommonModule,
    CartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
