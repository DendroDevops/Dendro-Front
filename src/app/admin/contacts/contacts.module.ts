import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactDetailComponent} from "./components/contact-detail/contact-detail.component";
import {ContactAdminComponent} from "./components/contact-admin/contact-admin.component";
import {ContactsRoutingModule} from "./contacts-routing.module";
import {ContactService} from "./shared/service/contactService.service";

@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule
  ],
  declarations: [
    ContactDetailComponent,
    ContactAdminComponent
  ],
  providers: [ContactService]
})
export class ContactsModule {
}
