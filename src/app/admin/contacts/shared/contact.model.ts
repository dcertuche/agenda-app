export interface ContactPage {
  content:          Contact[];
  pageable:         Pageable;
  last:             boolean;
  totalPages:       number;
  totalElements:    number;
  first:            boolean;
  numberOfElements: number;
  size:             number;
  number:           number;
  sort:             Sort;
  empty:            boolean;
}

export interface Contact {
  id:                 number;
  nombre:             string;
  apellido:           string;
  nombreCompleto:     string;
  celular:            string;
  email:              string;
  direccion:          string;
  fechaRegistro:      Date;
  fechaActualizacion: null;
}

export interface Pageable {
  sort:       Sort;
  offset:     number;
  pageNumber: number;
  pageSize:   number;
  unpaged:    boolean;
  paged:      boolean;
}

export interface Sort {
  unsorted: boolean;
  empty:    boolean;
  sorted:   boolean;
}
