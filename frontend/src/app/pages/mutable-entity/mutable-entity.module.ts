import {NgModule} from "@angular/core";
import {MutableEntityComponent} from "./mutable-entity.component";
import {MutableEntityRoutingModule} from "./mutable-entity-routing.module";

@NgModule({
  declarations: [
    MutableEntityComponent
  ],
  imports: [
    MutableEntityRoutingModule,
  ]
})
export class MutableEntityModule {
}
