import { Component, OnInit } from '@angular/core';
import OrdersService from '../../services/order-service.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders:any = [];
  constructor(private ordersService: OrdersService) { }
  ngOnInit() {
    this.ordersService.getOrderDATA().subscribe(
      (response) => {
        this.orders = response
        console.log(response)
      },
      (error) => {
        console.error('Error fetching data:', error)
      }
    );
}

}
