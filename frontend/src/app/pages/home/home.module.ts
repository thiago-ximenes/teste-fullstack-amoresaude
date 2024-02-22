import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {HttpClientModule} from "@angular/common/http";
import {HomeService} from "./home.service";
import { MatPaginatorIntl } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const paginatorIntl = new MatPaginatorIntl();

paginatorIntl.itemsPerPageLabel = 'Itens por página';
paginatorIntl.nextPageLabel = 'Próxima página';
paginatorIntl.previousPageLabel = 'Página anterior';
paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) {
    return `0 de ${length}`;
  }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
  return `${startIndex + 1} – ${endIndex} de ${length}`;
};

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonToggleModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatPaginatorModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [HomeService, {
    provide: MatPaginatorIntl, useValue: paginatorIntl
  }],
})
export class HomeModule {
}
