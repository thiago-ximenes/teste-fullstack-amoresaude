import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MutableEntityComponent} from "./mutable-entity.component";

const routes: Routes = [{path: '', component: MutableEntityComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MutableEntityRoutingModule { }
