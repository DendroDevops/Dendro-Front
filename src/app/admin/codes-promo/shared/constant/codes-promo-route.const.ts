import { Routes } from "@angular/router";
import { AdminGuard } from "../../../../shared/guard/admin.guard";
import { CodesPromoComponent } from "../../pages/codes-promo/codes-promo.component";
import { DetailCodePromoComponent } from "../../pages/detail-code-promo/detail-code-promo.component";

export const CODE_PROMO_ROUTES: Routes = [
  {
    path: "",
    component: CodesPromoComponent,
  },
  {
    path: ":id",
    component: DetailCodePromoComponent,
  },
];
