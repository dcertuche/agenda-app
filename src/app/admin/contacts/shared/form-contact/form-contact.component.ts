import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: [],
})
export class FormContactComponent implements OnInit {
  errors: any[] = [];
  form!: FormGroup;

  @Input() contact: any;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: ContactService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [this.contact?.id],
      nombre: [
        this.contact?.nombre,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      apellido: [
        this.contact?.apellido,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      nombreCompleto: [,],
      celular: [this.contact?.celular, [Validators.required]],
      email: [this.contact?.email, [Validators.required, Validators.email]],
      direccion: [this.contact?.direccion, [Validators.required]],
      fechaRegistro: [,],
      fechaActualizacion: [,],
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.onSave.emit(this.form.value);
  }
}
