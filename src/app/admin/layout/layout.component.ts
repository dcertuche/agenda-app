import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/shared/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: [],
})
export class LayoutComponent implements OnInit {
  user: string = '';
  islogin: boolean = false;

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.service.getName();
    this.islogin = this.service.isLoggedIn();
  }

  logout() {
    this.service.logout();
    Swal.fire(
      'Logout',
      `${this.user}, has cerrado sesión con éxito!`,
      'success'
    );
    this.user = '';
    this.router.navigate(['/']);
  }
}
