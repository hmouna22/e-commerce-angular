import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
  providers: [SlicePipe],
})
export class ProductItemComponent {
  quantity: number = 0;
  cartProducts: any[] = [];
  showDetailsModal = false;
  showReviewForm = false;
  reviewTitle!: string;
  reviewContent!: string;
  rating: number = 0;

  public range(length: number): number[] {
    return new Array(length);
  }

  slicePipe: SlicePipe = new SlicePipe();
  @Input()
  product!: Product;
  @Output() item = new EventEmitter<any>();

  addButton: boolean = false;

  constructor(private productService: ProductService) {}
  toggleReviewForm() {
    this.showReviewForm = !this.showReviewForm;
  }

  closeModal() {
    this.showDetailsModal = false;
    this.showReviewForm = false;
  }

  addClicked(){
    this.addButton = true  
  }
  
  submitReview() {
    const reviewData = {
      title: this.reviewTitle,
      content: this.reviewContent,
      rating: this.rating,
    };

    console.log(reviewData);

    this.productService
      .submitReview(this.product.product_id, reviewData)
      .subscribe(
        (response) => {
          console.log(response);
          // Handle success response
        },
        (error) => {
          console.error(error);
          // Handle error response
        }
      );

    this.reviewTitle = '';
    this.reviewContent = '';
    this.rating = 0;
    this.showReviewForm = false;
  }

  addToCart(event: any, newQuantity: string) {
    // get cart from  localstorage if exist
    // if not exist create cart []
    // check if product_id exist in side the cart
    // if exist quantity = qunatity + new quantity
    // else push the product in cart
    // stringfy cart in  localSorage
    console.log(newQuantity);
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    } else {
      this.cartProducts = [];
    }
    let exist = this.cartProducts.filter(
      (e) => e.product_id === event.product_id
    )[0];
    if (exist) {
      exist.quantity = exist.quantity + Number(newQuantity);
      this.quantity = exist.quantity;
      this.cartProducts = this.cartProducts.map((e) => {
        if (e.product_id === event.product_id) {
          return exist;
        } else {
          return e;
        }
      });
    } else {
      event.quantity = Number(newQuantity);

      this.cartProducts.push(event);
    }
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
}
