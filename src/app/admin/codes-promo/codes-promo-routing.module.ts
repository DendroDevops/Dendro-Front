import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CODE_PROMO_ROUTES } from './shared/constant/codes-promo-route.const';

@NgModule({
  imports: [RouterModule.forChild(CODE_PROMO_ROUTES)],
  exports: [RouterModule]
})
export class CodesPromoRoutingModule { }
