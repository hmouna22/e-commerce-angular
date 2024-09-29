import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecom';
  paymentHandler: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.invokeStripe();
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MwW2YKqLFfv80mnhhcZsPR0ClUo76fPHPVjXk4lOfqVTtlEuAXH05KFD1q2RFMlL0WLHZ8rbBh2wm76b7OZjDUw005y2tMk0e', 
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log(stripeToken.card);
        const paymentMethodData = {
          type: 'card',
          card: {
            token: stripeToken.id
          }
        };
        
        
        this.http.post('http://localhost:3000/api/payment', { amount:amount, token: paymentMethodData })

          .subscribe(
            (response: any) => {
              console.log(response);
              if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {
                alert('Payment successful!');
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
      amount: amount*100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }
}
