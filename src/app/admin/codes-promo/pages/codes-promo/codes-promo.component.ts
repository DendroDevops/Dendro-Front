import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { IOption } from "ng-select";
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { fallIn, moveInUp } from "../../../../router.animations";
import { AuthService } from "../../../../shared/service/auth.service";
import { ColumnInterface } from "../../../../custom-table/shared/modele/column.interface";
import { Router } from "@angular/router";
import { CustomAlertService } from "../../../../customAlertService.service";
import { CodePromoService } from "../../shared/service/code-promo.service";

@Component({
  selector: "app-codes-promo",
  templateUrl: "./codes-promo.component.html",
  styleUrls: [
    "./codes-promo.component.scss",
    "../../../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss",
  ],
  animations: [moveInUp(), fallIn()],
})
export class CodesPromoComponent implements OnInit {
  list = true;
  visibleSpinner = false;

  perPage = 10;
  currentPage = 1;
  totalItems = 0;

  columns: ColumnInterface[] = [
    {
      name: "code",
      display: "Code",
      style: { "min-width": "10rem" },
      isModelProperty: true,
      isVisible: true,
      isString: true,
      isSort: true,
    },
    {
      name: "utilisation",
      display: "Utilisation",
      style: { "min-width": "10rem" },
      isModelProperty: true,
      isVisible: true,
      isNumber: true,
      isSort: true,
    },
    {
      name: "dateActivation",
      display: "Date d'activation",
      isString: true,
      dateFormat: "mediumDate",
      isModelProperty: true,
      isVisible: true,
      isSort: true,
    },
    {
      name: "status",
      display: "Statut",
      style: { "min-width": "8rem" },
      isModelProperty: true,
      isVisible: true,
      isSort: true,
      isLowerCase: false,
      isString: true,
      tdValue: (data) => (data.status ? "Actif" : "Désactivé"),
      tdClassFn: (data) =>
        "mr-1 " + (data.status ? "promo-succes" : "promo-danger"),
    },
  ];

  datas: any[] = [];
  originalDatas: any[] = [];

  typeOptions: IOption[] = [
    {
      label: "type",
      value: "id",
    },
  ];

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  codePromoGroup: FormGroup;

  constructor(
    public authService: AuthService,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,
    private _fb: FormBuilder,
    private _router: Router,
    private _customAlertService: CustomAlertService,
    private _codePromoService: CodePromoService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  }

  ngOnInit() {
    this.getCodesPromo();
    this.initForm();
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  getCodesPromo() {
    this.visibleSpinner = true;
    this._codePromoService.list().subscribe(
      (data: any[]) => {
        this.originalDatas = data;
        this.datas = data;
        this.totalItems = this.originalDatas.length;

        this.visibleSpinner = false;
      },
      () => {
        this.visibleSpinner = false;
      }
    );
  }

  initForm() {
    this.codePromoGroup = this._fb.group({
      code: new FormControl("", Validators.required),
      quantity: new FormControl("", [
        Validators.required,
        Validators.pattern("^[1-9]\\d*(?:\\.\\d+)?$"),
      ]),
      fromDate: new FormControl(this.formatter.format(this.fromDate), [
        Validators.required,
        this.invalidDateValidator(),
      ]),
      toDate: new FormControl(this.formatter.format(this.toDate), [
        Validators.required,
        this.invalidDateValidator(),
      ]),
      type: new FormControl("", Validators.required),
      value: new FormControl("", [
        Validators.required,
        Validators.pattern("^[1-9]\\d*(?:\\.\\d+)?$"),
      ]),
    });
  }

  onSubmit() {
    console.log(this.codePromoGroup.value);
  }

  show(id: number) {
    let codePromoId = this.datas.find((elt: any) => elt.id == id).id;
    if (codePromoId) {
      this._router.navigate([`admin/codes-promo/${codePromoId}`]);
    } else {
      this._customAlertService.toastAlert(
        "Aucun code promo associé",
        "toast-center-center",
        "error"
      );
    }
  }

  invalidDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parsed = this.formatter.parse(control.value);
      // TODO: validate Date Format
      return parsed && this.calendar.isValid(NgbDate.from(parsed))
        ? null
        : { invalidDate: { value: control.value } };
    };
  }

  onChangingMenu(event: boolean) {
    this.list = event;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.codePromoGroup
        .get("fromDate")
        .setValue(this.formatter.format(this.fromDate));
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
      this.codePromoGroup
        .get("toDate")
        .setValue(this.formatter.format(this.toDate));
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.codePromoGroup
        .get("toDate")
        .setValue(this.formatter.format(this.toDate));
      this.codePromoGroup
        .get("fromDate")
        .setValue(this.formatter.format(this.fromDate));
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
