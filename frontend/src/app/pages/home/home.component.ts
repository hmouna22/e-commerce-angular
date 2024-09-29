import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  userName: string | null = localStorage.getItem('username');
  isLoggedIn: boolean = localStorage.getItem('isLoggedIn') === 'true';

  constructor(private router: Router) {}

  
  goToMyProfile() {
    this.router.navigate(['/myProfile']);
  }
  
  goToMyStore() {
    this.router.navigate(['/products']);
  }


  websiteDescription: string = 'Welcome to our online store! We offer a wide range of products at competitive prices. Shop now to discover great deals and enjoy a seamless shopping experience.';

  ngOnInit() { }
}
