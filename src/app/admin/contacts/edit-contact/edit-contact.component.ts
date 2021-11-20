import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../shared/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: [],
})
export class EditContactComponent implements OnInit {
  contact: any;

  constructor(
    private service: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.service.get(id).subscribe((contact) => {
      this.contact = contact;
    });
  }

  update(contact: any) {
    this.service.update(this.contact.id, contact).subscribe((contact: any) => {
      this.router.navigate(['admin']);
      Swal.fire(
        'Contacto actualizado',
        `Contacto ${contact.nombreCompleto} ha sido actualizado con éxito`,
        'success'
      );
    });
  }
}
