import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  showMoreProducts = true;
  showMoreCategories = false;
  showMoreUsers = false;
  showMoreOrders = false;

  showUnshowProducts() {
    if(!this.showMoreProducts){
      this.showMoreProducts = true;
      this.showMoreCategories = false;
      this.showMoreUsers = false;
      this.showMoreOrders = false;
    }
    else{
      this.showMoreProducts = false;
    }
  }

  showUnshowCategories() {
    if(!this.showMoreCategories){
      this.showMoreCategories = true;
      this.showMoreProducts = false;
      this.showMoreUsers = false;
      this.showMoreOrders = false;
    }
    else{
      this.showMoreCategories = false;
    }
  }

  showUnshowUsers() {
    if(!this.showMoreUsers){
      this.showMoreUsers = true;
      this.showMoreProducts = false;
      this.showMoreCategories = false;
      this.showMoreOrders = false;
    }
    else{
      this.showMoreUsers = false;
    }
  }

  showUnshowOrders() {
    if(!this.showMoreOrders){
      this.showMoreOrders = true;
      this.showMoreProducts = false;
      this.showMoreCategories = false;
      this.showMoreUsers = false;
    }
    else{
      this.showMoreUsers = false;
    }
  }

}
