import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() quantity!: number;
  public cartProducts: any[] = [];
  public grandTotal: number = 0;
  @Output() item: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCartProducts();
    this.invokeStripe();
  }

  getCartProducts(): void {
    if (localStorage.getItem("cart")) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      this.calculateGrandTotal();
    }
  }

  calculateGrandTotal(): void {
    this.grandTotal = 0;
    for (let product of this.cartProducts) {
      this.grandTotal += product.price * product.quantity;
    }
  }
  
  deleteProduct(index: number): void {
    this.cartProducts.splice(index, 1);
    this.calculateGrandTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  clearCart(): void {
    this.cartProducts = [];
    this.grandTotal = 0;
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  makePayment(callback: () => void): void {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MwW2YKqLFfv80mnhhcZsPR0ClUo76fPHPVjXk4lOfqVTtlEuAXH05KFD1q2RFMlL0WLHZ8rbBh2wm76b7OZjDUw005y2tMk0e',
      locale: 'auto',
      token: (stripeToken: any) => {
        const paymentMethodData = {
          type: 'card',
          card: {
            token: stripeToken.id
          }
        };
        
        const amountInCents = this.grandTotal * 100; // Convert grandTotal to cents
  
        this.http.post('http://localhost:3000/api/payment', { amount: amountInCents, token: paymentMethodData })
          .subscribe(
            (response: any) => {
              console.log(response);
              if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {
                alert('Payment successful!');
                callback(); // Trigger the callback function to navigate to checkout
              } else {
                alert('Payment failed. Please try again.');
              }
            },
            (error) => {
              console.error(error);
              alert('Payment failed. Please try again.');
            }
          );
      }
    });
  
    paymentHandler.open({
      name: 'E-commerce Website',
      description: '',
      amount: this.grandTotal * 100, // Convert grandTotal to cents
    });
  }
  
  payAndCheckout(): void {
    this.makePayment(() => {
      this.router.navigate(['/checkout']);
    });
  }

  invokeStripe(): void {
    if (!window.document.getElementById('stripe-script')) {
      const script = document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }
}
