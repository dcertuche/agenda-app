import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ContactPage } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiBase: string = environment.apiBase;

  constructor(private httpClient: HttpClient) {}

  get(id: number) {
    return this.httpClient.get<ContactPage>(`${this.apiBase}/contactos/${id}`);
  }

  getAll(page: number = 0, size: number = 5) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('sort', 'nombre,desc');
    return this.httpClient.get<ContactPage>(`${this.apiBase}/contactos`, {
      params,
    });
  }

  create(contact: any) {
    return this.httpClient.post(`${this.apiBase}/contactos`, contact);
  }

  update(id: number, contact: any) {
    return this.httpClient.put(`${this.apiBase}/contactos/${id}`, contact);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.apiBase}/contactos/${id}`);
  }
}
