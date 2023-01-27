import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CONTACTS_ROUTES} from "./shared/constant/contacts-routes.const";

@NgModule({
  imports: [RouterModule.forChild(CONTACTS_ROUTES)]
})

export class ContactsRoutingModule {

}
