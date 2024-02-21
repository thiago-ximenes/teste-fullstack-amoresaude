import {NgModule} from "@angular/core";
import {MutableEntityComponent} from "./mutable-entity.component";
import {MutableEntityRoutingModule} from "./mutable-entity-routing.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {MutableEntityService} from "./mutable-entity.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    MutableEntityComponent
  ],
  imports: [
    MutableEntityRoutingModule,
    MatButtonToggleModule,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [
    MutableEntityService,
  ],
})
export class MutableEntityModule {
}
