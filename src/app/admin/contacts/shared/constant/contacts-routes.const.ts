import {Routes} from "@angular/router";
import {ContactAdminComponent} from "../../components/contact-admin/contact-admin.component";
import {ContactDetailComponent} from "../../components/contact-detail/contact-detail.component";

export const CONTACTS_ROUTES: Routes = [
  {path: 'contacts', component: ContactAdminComponent},
  {path: 'contacts/:id', component: ContactDetailComponent}
]
