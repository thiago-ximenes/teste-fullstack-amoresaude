import {NgModule} from "@angular/core";
import {ViewEntityRoutingModule} from "./view-entity-routing.module";
import {ViewEntityComponent} from "./view-entity.component";
import {MutableEntityModule} from "../mutable-entity/mutable-entity.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {CommonModule} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    ViewEntityComponent
  ],
  imports: [
    ViewEntityRoutingModule,
    MutableEntityModule,
    MatButtonToggleModule,
    CommonModule,
    MatDialogModule,
  ]
})
export class ViewEntityModule {
}
