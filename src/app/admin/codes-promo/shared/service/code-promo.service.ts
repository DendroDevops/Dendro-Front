import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { ResourceService } from "../../../../shared/service/resource.service";
import { CodePromoSerializer } from "../serializer/code-promo.serializer";

const headers = new HttpHeaders()
  .append("Content-Type", "application/json")
  .append("Authorization", "Bearer " + localStorage.getItem("token"));

@Injectable({
  providedIn: "root",
})
export class CodePromoService extends ResourceService<any> {
  constructor(
    private _http: HttpClient,
    private codePromoSerializer: CodePromoSerializer
  ) {
    super(_http, "stripe/coupons", codePromoSerializer);
  }

  getCouponsCustomers(id: string) {
    return this.httpClient.get<any[]>(
      `${environment.baseUrl}${this.endpoint}/customers/${id}`,
      {
        headers,
      }
    );
  }

  checkCodePromo(discount: string, codeForfait: string) {
    return this.httpClient.post<{
      id: string;
      code: string;
      reduction: number;
      coupon: string;
      valid: boolean;
      codeForfait: string;
    }>(
      `${environment.baseUrl}stripe/codepromos`,
      { discount, codeForfait },
      {
        headers,
      }
    );
  }
}
