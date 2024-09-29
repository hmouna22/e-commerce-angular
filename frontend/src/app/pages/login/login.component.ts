import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  emailPattern: string = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}';
  passwordPattern: string = '.{8,15}';
  url: string = 'http://localhost:3000/api/users/login';
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      axios
        .post(this.url, {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        })
        .then((res) => { 
          if (res.status === 200) {
            alert(res.data.message);
            const user = res.data.user;
            console.log(res.data)
            localStorage.setItem('role', user.role);
            localStorage.setItem('id', user.user_id);
            localStorage.setItem('username',user.user_name)
            user.role === 'admin'
              ? this.router.navigate(['/dashboard'])
              : this.router.navigate(['/home']);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            alert(error.response.data.message)
          } else {
            console.error(error);
            alert('An error occurred. Please try again later.');
          }
        });
    } else {
      return;
    }
  }
}
