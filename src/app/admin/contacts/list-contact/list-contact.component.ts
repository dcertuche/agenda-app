import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ContactPage } from '../shared/contact.model';
import { ContactService } from '../shared/contact.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/shared/auth.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: [],
})
export class ListContactComponent implements OnInit {

  isAdmin: boolean= false;

  displayedColumns: string[] = [
    'nombreCompleto',
    'celular',
    'email',
    'direccion',
    'acciones',
  ];
  contactPage: ContactPage = Object.assign({});

  constructor(private service: ContactService,
     private auth: AuthService) {
       this.isAdmin = this.auth.isAdmin();
     }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((contactPage) => {
      this.contactPage = contactPage;
    });
  }

  delete(contact: any) {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al contacto ${contact.nombreCompleto}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(contact.id).subscribe(() => {
          this.getAll();
          Swal.fire(
            'Contacto Eliminado!',
            `Contacto ${contact.nombreCompleto} ha sido eliminado con éxito.`,
            'success'
          );
        });
      }
    });
  }

  onPaginateChange(event: PageEvent) {
    const page = event.pageIndex;
    const size = event.pageSize;
    this.service.getAll(page, size).subscribe((contactPage) => {
      this.contactPage = contactPage;
    });
  }



}
