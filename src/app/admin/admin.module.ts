import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContactComponent } from './contacts/list-contact/list-contact.component';
import { NewContactComponent } from './contacts/new-contact/new-contact.component';
import { EditContactComponent } from './contacts/edit-contact/edit-contact.component';
import { FormContactComponent } from './contacts/shared/form-contact/form-contact.component';
import { LayoutComponent } from './layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ListContactComponent,
    NewContactComponent,
    EditContactComponent,
    FormContactComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class AdminModule { }
