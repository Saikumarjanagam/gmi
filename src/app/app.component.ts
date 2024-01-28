import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ganga';
  constructor(private route: Router) { }
  email: string;
  password: string;
  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })
  get Email() {
    return this.loginForm.get('email')
  }
  get Password() {
    return this.loginForm.get('password')
  }

  // login() {
  //   if (this.email == 'Sharathkumar' && this.password == 'Sharath@2409') {
  //     this.route.navigate(['/home'])
  //   }
  // }
}
