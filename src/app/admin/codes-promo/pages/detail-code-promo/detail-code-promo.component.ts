import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ColumnInterface } from "../../../../custom-table/shared/modele/column.interface";
import { CustomAlertService } from "../../../../customAlertService.service";
import { CodePromoService } from "../../shared/service/code-promo.service";

@Component({
  selector: "app-detail-code-promo",
  templateUrl: "./detail-code-promo.component.html",
  styleUrls: ["./detail-code-promo.component.scss"]
})
export class DetailCodePromoComponent implements OnInit {
  list = true;
  visibleSpinner = false;

  perPage = 10;
  currentPage = 1;
  totalItems = 0;

  columns: ColumnInterface[] = [
    {
      name: "name",
      display: "Nom",
      style: { "min-width": "10rem" },
      isModelProperty: true,
      isVisible: true,
      isString: true,
      isSort: true,
    },
    {
      name: "email",
      display: "Email",
      style: { "min-width": "10rem" },
      isModelProperty: true,
      isVisible: true,
      isString: true,
      isSort: true,
    },
    {
      name: "addDate",
      display: "Date d'ajout",
      isString: true,
      dateFormat: "mediumDate",
      isModelProperty: true,
      isVisible: true,
      isSort: true,
    },
  ];

  datas: any[] = [];
  originalDatas: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _codePromoService: CodePromoService,
    private _customAlertService: CustomAlertService
  ) {}

  ngOnInit() {
    this.getCodesPromoCustomers();
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }
  getCodesPromoCustomers() {
    this.visibleSpinner = true;
    const id = this._route.snapshot.paramMap.get("id");
    this._codePromoService.getCouponsCustomers(id).subscribe(
      (data: any[]) => {
        this.originalDatas = data;
        this.datas = data;
        this.totalItems = this.originalDatas.length;

        this.visibleSpinner = false;
      },
      () => {
        this.visibleSpinner = false;
        this._router.navigate([`admin/codes-promo/`]);
        this._customAlertService.toastAlert(
          "Aucun code promo associé",
          "toast-center-center",
          "error"
        );
      }
    );
  }
}
