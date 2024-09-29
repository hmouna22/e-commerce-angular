
import { CartComponent } from '../components/cart/cart.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
@NgModule({
  declarations:[CartComponent],
  imports:[FormsModule,
    CommonModule
  ]
})
export class CartsModule{}