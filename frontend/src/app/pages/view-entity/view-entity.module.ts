import {NgModule} from "@angular/core";
import {ViewEntityRoutingModule} from "./view-entity-routing.module";
import {ViewEntityComponent} from "./view-entity.component";

@NgModule({
  declarations: [
    ViewEntityComponent
  ],
  imports: [
    ViewEntityRoutingModule,
  ]
})
export class ViewEntityModule {
}
