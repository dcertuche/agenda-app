import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent implements OnInit {
  returnUrl: string = '/';
  error: boolean = false;
  hidePassword: boolean = true;

  credentials = {
    username: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  login(form: NgForm) {
    if (form.form.invalid) {
      return;
    }
    this.authService
      .login(this.credentials.username, this.credentials.password)
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
          let usuario = this.authService.getName();
          Swal.fire(
            'Login',
            `Hola ${usuario}, has iniciado sesión con éxito!`,
            'success'
          );
        },
        (error) => {
          this.error = true;
        }
      );
  }
}
