import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userName: string | null = localStorage.getItem('username');
  isLoggedIn: boolean = localStorage.getItem('isLoggedIn') === 'true';
  constructor(private router: Router) {}

  isAdmin():boolean {
    if(localStorage.getItem('role')==='admin'){
      return true
    }
    else{
      return false
    }
  }
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');

    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('username');
    this.userName = localStorage.getItem('username');
  }
}
