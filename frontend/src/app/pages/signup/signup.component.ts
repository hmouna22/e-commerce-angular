import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user_name: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(private http: HttpClient, private router: Router) {
    this.user_name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  onSubmit() {
    if (this.validateForm()) {
      const userData = {
        user_name: this.user_name,
        email: this.email,
        password: this.password
      };

      this.http.post('http://localhost:3000/api/users/register', userData).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          // Navigate to login page
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    }
  }

  validateForm(): boolean {
    if (this.user_name.length < 4) {
      return false;
    }

    if (!this.email.match('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')) {
      return false;
    }

    if (this.password.length < 8) {
      return false;
    }

    if (this.password !== this.confirmPassword) {
      return false;
    }

    return true;
  }
}
