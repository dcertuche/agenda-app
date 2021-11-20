import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: [],
})
export class NewContactComponent implements OnInit {
  constructor(private service: ContactService, private router: Router) {}

  ngOnInit(): void {}

  create(contact: any) {
    this.service.create(contact).subscribe(
      (contact: any) => {
        this.router.navigate(['admin']);
        Swal.fire(
          'Contacto Nuevo',
          `Contacto ${contact.nombreCompleto} ha sido creado con éxito`,
          'success'
        );
      },
      (error) => {
        if (error.status == 422) {
        }
      }
    );
  }
}
