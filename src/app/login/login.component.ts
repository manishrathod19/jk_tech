import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private fb: FormBuilder, private router: Router) {}

  loginForm = this.fb.group({
    user_name: ['', Validators.required],
    password: ['', Validators.required],

  });
  // Method to submit the form
  onSubmit() {
    console.log('Form output', this.loginForm);
    this.router.navigate(['/home']);
  }
}
