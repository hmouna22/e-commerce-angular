import { Component, OnInit } from '@angular/core';
import OrdersService from '../../services/order-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderData: any;
  orderDataByUser: any;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersService.getOrderDATA().subscribe((data) => {
      this.orderData = data;
    });

    this.ordersService.getOrderByUserId().subscribe((data) => {
      this.orderDataByUser = data;
    });
  }

  viewOrder(order: any): void {
    // Implement your logic to view the order details
    // For example, open a modal or navigate to a separate page
    console.log('View Order:', order);
  }
}
