import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from "@ngxs/store";
import {AuthState} from "./guards/auth/auth.state";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import { ErrorDialogComponent } from './component/error-dialog/error-dialog.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import { ListAttendSpecialtiesDialogComponent } from './component/list-attend-specialties-dialog/list-attend-specialties-dialog.component';
import {AuthInterceptor} from "./guards/auth/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    ListAttendSpecialtiesDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState]),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
    }),
    MatButtonToggleModule,
    MatIconModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
