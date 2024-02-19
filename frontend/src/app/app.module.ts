import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from "@ngxs/store";
import {AuthState} from "./guards/auth/auth.state";
import {HttpClientModule} from "@angular/common/http";
import { MutableEntityComponent } from './pages/mutable-entity/mutable-entity.component';

@NgModule({
  declarations: [
    AppComponent,
    MutableEntityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
