import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {AppService} from '../../../../app.service';
import {ModalDismissReasons, NgbCalendar, NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

import * as Highcharts from 'highcharts';
import {Inventaire} from '../../../inventaires/shared/model/inventaire.interface';
import {Essence} from "../../../inventaires/shared/model/essence.interface";
import {PlantationService} from '../../../plantations/shared/service/plantation.service';
import {Plantation} from '../../../plantations/shared/model/plantation.interface';
import * as moment from 'moment';
import {GestionTravauxService} from "../../../gestion-travaux/shared/service/gestion-travaux.service";
import {InventaireService} from "../../../inventaires/shared/service/inventaire.service";
import {InventaireSerializer} from "../../../inventaires/shared/serializer/inventaire.serializer";
import { CARACT_TAB } from '../../../inventaires/shared/constant/woodArea.constant';
import { DatePipe } from '@angular/common';


// DATE && PICKER
const now = new Date();
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss',
    '../../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
    '../../../../../vendor/libs/ngb-timepicker/ngb-timepicker.scss',
    '../../../../../vendor/libs/ngx-color-picker/ngx-color-picker.scss',
    '../../../../../vendor/libs/spinkit/spinkit.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  isIE10 = false;

  chart: any;
  optionsBar: Object;
  chartOptions: Object;

  year: any;
  totalPlantation = 0;
  plantationData: Plantation[] = [];
  searchedDatas: any = [];
  inventaireNoNFinal: Inventaire[] = [];

  updateFlag: true;
  // OPTIONS CHART
  Highcharts = Highcharts;
  chartConstructor = 'chart';


  countAbattage = 0;
  countWorkType = 0;
  examenComplementaire = 0;

  // VALEUR ESTIMATIVE
  totalBeva = 0;
  totalArea = 0;
  totalSaisieValid = 0;

  @ViewChild('chart', /* TODO: add static flag */ null) public chartEl: ElementRef;

  blocIdentity: String = '';

  constructor(
    private appService: AppService,
    private calendar: NgbCalendar,
    private modalService: NgbModal,
    private router: Router,
    private plantationService: PlantationService,
    private inventaireService: InventaireService,
    private travauxService: GestionTravauxService,
    private datePipe: DatePipe
  ) {

    this.year = (new Date).getFullYear();
    this.appService.pageTitle = 'Accueil';
    this.isIE10 = this.appService.isIE10;

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.inventaires();
    this.plantations();
    this.inventoryNotFished();
  }

  printPieChart(momentSelected = 'DEFAULT') {
    let endMonthDate,
      startMonthDate;
    const monthEnCourt = this.getSelectedMoment(momentSelected);

    if (momentSelected == 'CURRENT') {
      endMonthDate = monthEnCourt.clone().endOf('month');
      startMonthDate = monthEnCourt.clone().startOf('month');
      this.countprintPieChartStatic(startMonthDate, endMonthDate);

    } else if (momentSelected == 'LAST_MONTH') {
      endMonthDate = monthEnCourt.clone().endOf('month');
      startMonthDate = monthEnCourt.clone().startOf('month');
      this.countprintPieChartStatic(startMonthDate, endMonthDate);
    } else if (momentSelected == 'LAST_SIX_MONTH') {
      endMonthDate = moment();
      startMonthDate = moment().clone().startOf('month');
      this.countprintPieChartStatic(startMonthDate, endMonthDate);
    } else if (momentSelected == 'LAST_YEAR') {
      endMonthDate = monthEnCourt.clone().endOf('year');
      startMonthDate = monthEnCourt.clone().startOf('year');
      this.countprintPieChartStatic(startMonthDate, endMonthDate);
    } else if (momentSelected == 'DEFAULT') {
      // PERSONNAL
      this.countprintPieChartStatic()
    }
  }

  countprintPieChartStatic(startMonthDate = null, endMonthDate = null): void {
    let ARBRE = 0;
    let EP = 0;
    let EBC = 0;
    let ALIGNEMENT = 0;
    let EB = 0;

    let pieChartInventory: Inventaire[] = this.searchedDatas;
    if (startMonthDate === null && endMonthDate === null) {
      for (let i = 0; i < pieChartInventory.length; i++) {
        if (InventaireSerializer.isEB(pieChartInventory[i].type)) {
          let essence = pieChartInventory[i].epaysage.essence;
          if (essence.length > 0) {
            if (essence[0].critereOther) {
              EB++
            }
            essence[0].critere.find((elt: string) => elt === 'espace-boise-classe') ? EBC++ : EP++
          }
        } else {
          if (pieChartInventory[i].arbre.implantation === 'en-alignement') {
            ALIGNEMENT++
          } else {
            ARBRE++
          }
        }
      }
    } else {
      for (let i = 0; i < pieChartInventory.length; i++) {
        const createdAt = moment(pieChartInventory[i].createdAt);
        if (startMonthDate.toDate() <= createdAt.toDate() && endMonthDate.toDate() >= createdAt.toDate()) {
          if (InventaireSerializer.isEB(pieChartInventory[i].type)) {
            let essence = pieChartInventory[i].epaysage.essence;
            if (essence.length > 0) {
              if (essence[0].critereOther) {
                EB++
              }
              essence[0].critere.find((elt: string) => elt === 'espace-boise-classe') ? EBC++ : EP++
            }
            EB++;
          } else {
            if (pieChartInventory[i].arbre.implantation === 'en-alignement') {
              ALIGNEMENT++
            } else {
              ARBRE++
            }
          }
        }
      }
    }

    let pieData = [
      {
        name: 'Arbre', y: ARBRE, sliced: true,
        selected: true
      },
      {name: 'Espace Boisé Classé', y: EBC},
      {name: 'Espace à préserver', y: EP},
      {name: 'Arbres d’alignement', y: ALIGNEMENT},
      {name: 'Espace boisé', y: EB}
    ];

    let optionsPieColor = ['#005532', '#EF6C00', '#795548', "#2962ff", "#c3803b"];

    let chartOptions = {
      chart: {type: 'pie'},
      colors: optionsPieColor,
      title: {text: ''},
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Nombre',
        colorByPoint: true,
        data: pieData
      }]
    };

    this.chartOptions = chartOptions;
  }

  printBarChart(momentSelected = 'DEFAULT') {
    let endMonthDate,
      startMonthDate;
    const monthEnCourt = this.getSelectedMoment(momentSelected);

    if (momentSelected == 'CURRENT') {
      endMonthDate = monthEnCourt.clone().endOf('year');
      startMonthDate = monthEnCourt.clone().startOf('year');
      this.printBarChartStatic(startMonthDate, endMonthDate);
    } else if (momentSelected == 'LAST_YEAR') {
      endMonthDate = monthEnCourt.clone().endOf('year');
      startMonthDate = monthEnCourt.clone().startOf('year');
      this.printBarChartStatic(startMonthDate, endMonthDate);
    } else if (momentSelected == 'DEFAULT') {
      this.printBarChartStatic();

    }
  }

  private printBarChartStatic(startMonthDate = null, endMonthDate = null) {
    let T1 = 0;
    let T2 = 0;
    let T3 = 0;
    let T4 = 0;
    let T5 = 0;
    let T6 = 0;
    let T7 = 0;
    let T8 = 0;
    let T9 = 0;
    let T10 = 0;
    let T11 = 0;
    let T12 = 0;

    let V1 = 0;
    let V2 = 0;
    let V3 = 0;
    let V4 = 0;
    let V5 = 0;
    let V6 = 0;
    let V7 = 0;
    let V8 = 0;
    let V9 = 0;
    let V10 = 0;
    let V11 = 0;
    let V12 = 0;

    let invNotTravaux = this.searchedDatas.filter((elt: Inventaire) => GestionTravauxService.filterTravauxInv(elt) || GestionTravauxService.filterExamenInv(elt));

    if (startMonthDate == null && endMonthDate == null) {
      for (let i = 0; i < invNotTravaux.length; i++) {
        if (invNotTravaux[i].arbre) {  // DANS LE CAS D'UN ARBRE

          const dateTravauxVal = invNotTravaux[i].arbre.dateTravaux;
          const dateProVisiteVal = GestionTravauxService.filterExamenInv(invNotTravaux[i]);

          let dateObj1 = new Date(invNotTravaux[i].arbre.userEditedDateTravaux);
          let month1 = dateObj1.getMonth() + 1; //months from 1-12
          let year1 = dateObj1.getFullYear();
          if (this.year == year1) {
            switch (month1) {
              case 1:
                dateTravauxVal && T1++;
                dateProVisiteVal && V1++;
                break;
              case 2:
                dateTravauxVal && T2++;
                dateProVisiteVal && V2++;
                break;
              case 3:
                dateTravauxVal && T3++;
                dateProVisiteVal && V3++;
                break;
              case 4:
                dateTravauxVal && T4++;
                dateProVisiteVal && V4++;
                break;
              case 5:
                dateTravauxVal && T5++;
                dateProVisiteVal && V5++;
                break;
              case 6:
                dateTravauxVal && T6++;
                dateProVisiteVal && V6++;
                break;
              case 7:
                dateTravauxVal && T7++;
                dateProVisiteVal && V7++;
                break;
              case 8:
                dateTravauxVal && T8++;
                dateProVisiteVal && V8++;
                break;
              case 9:
                dateTravauxVal && T9++;
                dateProVisiteVal && V9++;
                break;
              case 10:
                dateTravauxVal && T10++;
                dateProVisiteVal && V10++;
                break;
              case 11:
                dateTravauxVal && T11++;
                dateProVisiteVal && V11++;
                break;
              case 12:
                dateTravauxVal && T12++;
                dateProVisiteVal && V12++;
                break;
              default:
                break;
            }
          }
        } else if ((invNotTravaux[i].epaysage != null) && (invNotTravaux[i].epaysage.essence.length != 0)) {
          for (let j = 0; j < invNotTravaux[i].epaysage.essence.length; j++) {

            const dateTravauxVal = invNotTravaux[i].epaysage.essence[j].dateTravaux;
            const dateProVisiteVal = GestionTravauxService.filterExamenInv(invNotTravaux[i]);

            let dateObj2 = new Date(invNotTravaux[i].epaysage.essence[j].userEditedDateTravaux);
            let month2 = dateObj2.getMonth() + 1; //months from 1-12
            let year2 = dateObj2.getFullYear();
            if (this.year == year2) {
              switch (month2) {
                case 1:
                  dateTravauxVal && T1++;
                  dateProVisiteVal && V1++;
                  break;
                case 2:
                  dateTravauxVal && T2++;
                  dateProVisiteVal && V2++;
                  break;
                case 3:
                  dateTravauxVal && T3++;
                  dateProVisiteVal && V3++;
                  break;
                case 4:
                  dateTravauxVal && T4++;
                  dateProVisiteVal && V4++;
                  break;
                case 5:
                  dateTravauxVal && T5++;
                  dateProVisiteVal && V5++;
                  break;
                case 6:
                  dateTravauxVal && T6++;
                  dateProVisiteVal && V6++;
                  break;
                case 7:
                  dateTravauxVal && T7++;
                  dateProVisiteVal && V7++;
                  break;
                case 8:
                  dateTravauxVal && T8++;
                  dateProVisiteVal && V8++;
                  break;
                case 9:
                  dateTravauxVal && T9++;
                  dateProVisiteVal && V9++;
                  break;
                case 10:
                  dateTravauxVal && T10++;
                  dateProVisiteVal && V10++;
                  break;
                case 11:
                  dateTravauxVal && T11++;
                  dateProVisiteVal && V11++;
                  break;
                case 12:
                  dateTravauxVal && T12++;
                  dateProVisiteVal && V12++;
                  break;
                default:
                  break;
              }
            }

          }
        }
      }

    } else {
      for (let i = 0; i < invNotTravaux.length; i++) {
        if (invNotTravaux[i].arbre) { // DANS LE CAS D'UN ARBRE

          const dateTravauxVal = invNotTravaux[i].arbre.dateTravaux;
          const dateProVisiteVal = GestionTravauxService.filterExamenInv(invNotTravaux[i]);

          const dateEcheance = moment(invNotTravaux[i].arbre.userEditedDateTravaux);
          if (dateEcheance.isBetween(startMonthDate, endMonthDate)) {
            let dateObj1 = new Date(invNotTravaux[i].arbre.userEditedDateTravaux);

            let month1 = dateObj1.getMonth() + 1; //months from 1-12
            let year1 = dateObj1.getFullYear();
            if (this.year == year1) {
              switch (month1) {
                case 1:
                  dateTravauxVal && T1++;
                  dateProVisiteVal && V1++;
                  break;
                case 2:
                  dateTravauxVal && T2++;
                  dateProVisiteVal && V2++;
                  break;
                case 3:
                  dateTravauxVal && T3++;
                  dateProVisiteVal && V3++;
                  break;
                case 4:
                  dateTravauxVal && T4++;
                  dateProVisiteVal && V4++;
                  break;
                case 5:
                  dateTravauxVal && T5++;
                  dateProVisiteVal && V5++;
                  break;
                case 6:
                  dateTravauxVal && T6++;
                  dateProVisiteVal && V6++;
                  break;
                case 7:
                  dateTravauxVal && T7++;
                  dateProVisiteVal && V7++;
                  break;
                case 8:
                  dateTravauxVal && T8++;
                  dateProVisiteVal && V8++;
                  break;
                case 9:
                  dateTravauxVal && T9++;
                  dateProVisiteVal && V9++;
                  break;
                case 10:
                  dateTravauxVal && T10++;
                  dateProVisiteVal && V10++;
                  break;
                case 11:
                  dateTravauxVal && T11++;
                  dateProVisiteVal && V11++;
                  break;
                case 12:
                  dateTravauxVal && T12++;
                  dateProVisiteVal && V12++;
                  break;
                default:
                  break;
              }

            }
          } else if ((invNotTravaux[i].epaysage != null) && (invNotTravaux[i].epaysage.essence.length != 0)) {
            for (let j = 0; j < invNotTravaux[i].epaysage.essence.length; j++) {

              const dateTravauxVal = invNotTravaux[i].epaysage.essence[j].dateTravaux;
              const dateProVisiteVal = GestionTravauxService.filterExamenInv(invNotTravaux[i]);

              const dateEcheance = invNotTravaux[i].epaysage.essence[j].userEditedDateTravaux;

              if (dateEcheance.isBetween(startMonthDate, endMonthDate)) {
                let dateObj2 = new Date(invNotTravaux[i].epaysage.essence[j].userEditedDateTravaux);
                let month2 = dateObj2.getMonth() + 1; //months from 1-12
                let year2 = dateObj2.getFullYear();
                if (this.year == year2) {
                  switch (month2) {
                    case 1:
                      dateTravauxVal && T1++;
                      dateProVisiteVal && V1++;
                      break;
                    case 2:
                      dateTravauxVal && T2++;
                      dateProVisiteVal && V2++;
                      break;
                    case 3:
                      dateTravauxVal && T3++;
                      dateProVisiteVal && V3++;
                      break;
                    case 4:
                      dateTravauxVal && T4++;
                      dateProVisiteVal && V4++;
                      break;
                    case 5:
                      dateTravauxVal && T5++;
                      dateProVisiteVal && V5++;
                      break;
                    case 6:
                      dateTravauxVal && T6++;
                      dateProVisiteVal && V6++;
                      break;
                    case 7:
                      dateTravauxVal && T7++;
                      dateProVisiteVal && V7++;
                      break;
                    case 8:
                      dateTravauxVal && T8++;
                      dateProVisiteVal && V8++;
                      break;
                    case 9:
                      dateTravauxVal && T9++;
                      dateProVisiteVal && V9++;
                      break;
                    case 10:
                      dateTravauxVal && T10++;
                      dateProVisiteVal && V10++;
                      break;
                    case 11:
                      dateTravauxVal && T11++;
                      dateProVisiteVal && V11++;
                      break;
                    case 12:
                      dateTravauxVal && T12++;
                      dateProVisiteVal && V12++;
                      break;
                    default:
                      break;
                  }
                }
              }
            }
          }
        }
      }
    }

    let barData = [{
      name: 'Travaux',
      data: [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]
    }, {
      name: 'Examens',
      data: [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12]
    }];

    const optionsBar = {
      chart: {
        type: 'column'
      },
      colors: ['#005532', '#DDFAE9'],
      title: {text: ''},

      xAxis: {
        categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: 'Interventions'
        }
      },
      series: barData
    };

    this.optionsBar = optionsBar;
  }

  inventaires() {
    this.inventaireService.getInventaireFinished()
      .subscribe((data: Inventaire[]) => {
        this.searchedDatas = data;
        this.printPieChart();
        this.printBarChart();
        this.getMonthAlert();
        this.getValEstimative();
        // this.getDict();
        this.getEBArea();
       
      }, () => {
      });
  }

  inventoryNotFished() {
    this.inventaireService.getInventaireNotFinished()
      .subscribe((data: Inventaire[]) => {
        this.inventaireNoNFinal = data;
        this.getSaisieValid();
      })
  }

  plantations() {
    this.plantationService.list()
      .subscribe((data: Plantation[]) => {
        this.plantationData = data;
        this.getPlantation();
      }, () => {
      });
  }

  model: NgbDateStruct = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };

  displayMonths = 2;
  navigation = 'select';
  disabled = false;

  // Range datepicker

  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  //
  // Ngb Timepicker
  //
  time = {hour: 13, minute: 30, second: 30};
  //
  // ngx-color-picker
  //

  defaultColor = '#ff6161';
  rgbaColor = 'rgba(113,107,168,0.5)';
  presetColors = [
    '#fff', '#000', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
    '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107',
    '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'
  ];

  // MODALS
  open(content, options = {}) {
    this.modalService.open(content, options).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // PRECO TRAVAUX

  getMonthAlert(): void {
    let examCompl = 0;
    let workType = 0;
    let abattage = 0;
    // Get datas
    const dataAlert = this.searchedDatas.filter((elt: Inventaire) => this.travauxService.filterAlertMonth(elt) && GestionTravauxService.workStatus(elt));
    dataAlert.forEach((inv: Inventaire) => {
      if (inv.arbre) {
        inv.arbre.abattage && abattage++;
        // interventions work
        GestionTravauxService.isWorkVisiteTree(inv) && workType++
        inv.arbre.dateTravaux && workType++;
        // examen complementaire
        (inv.arbre.etatSanGeneral.filter((elt: string) => elt === 'exam-comple').length === 1) && examCompl++

      } else {
        if (inv.epaysage.essence.length > 0) {
          inv.epaysage.essence.forEach((essence: Essence) => {
            essence.travaux.find(data => ((data === "abattage-simple") || (data === "abattage-en-vue-de-remplacement") || (data === 'abattage-par-demontage'))) && abattage++;
            GestionTravauxService.isWork(essence.travaux) && workType++;
            // examen complementaire
            (essence.travaux.filter(elt => elt == 'examen-complementaire').length !== 0) && examCompl++;
          })
        }
      }
    });
    this.countAbattage = abattage;
    this.countWorkType = workType;
    this.examenComplementaire = examCompl;
  }

  // VALEUR ESTIMATIVE
  getValEstimative(momentSelected = 'DEFAULT') {
    let endMonthDate,
      startMonthDate;
    const monthEnCourt = this.getSelectedMoment(momentSelected);

    if (momentSelected == 'CURRENT') {
      endMonthDate = monthEnCourt.clone().endOf('month');
      startMonthDate = monthEnCourt.clone().startOf('month');
      this.countStaticValEstimative(startMonthDate, endMonthDate);

    } else if (momentSelected == 'LAST_MONTH') {
      endMonthDate = monthEnCourt.clone().endOf('month');
      startMonthDate = monthEnCourt.clone().startOf('month');
      this.countStaticValEstimative(startMonthDate, endMonthDate);
    } else if (momentSelected == 'LAST_SIX_MONTH') {
      endMonthDate = moment();
      startMonthDate = monthEnCourt.clone().startOf('month');
      this.countStaticValEstimative(startMonthDate, endMonthDate);
    } else if (momentSelected == 'LAST_YEAR') {
      endMonthDate = monthEnCourt.clone().endOf('year');
      startMonthDate = monthEnCourt.clone().startOf('year');
      this.countStaticValEstimative(startMonthDate, endMonthDate);
    } else if (momentSelected == 'DEFAULT') {
      // PERSONNAL
      this.countStaticValEstimative()
    }
  }

  getEBArea(momentSelected = "DEFAULT") {
    let endMonthDate: moment.Moment, startMonthDate: moment.Moment;
    const monthEnCourt = this.getSelectedMoment(momentSelected);
    if (momentSelected === "CURRENT") {
      endMonthDate = monthEnCourt.clone().endOf("month");
      startMonthDate = monthEnCourt.clone().startOf("month");
      this._countTotalArea(startMonthDate, endMonthDate);
    } else if (momentSelected === "LAST_MONTH") {
      endMonthDate = monthEnCourt.clone().endOf("month");
      startMonthDate = monthEnCourt.clone().startOf("month");
      this._countTotalArea(startMonthDate, endMonthDate);
    } else if (momentSelected === "LAST_SIX_MONTH") {
      endMonthDate = moment();
      startMonthDate = monthEnCourt.clone().startOf("month");
      this._countTotalArea(startMonthDate, endMonthDate);
    } else if (momentSelected === "LAST_YEAR") {
      endMonthDate = monthEnCourt.clone().endOf("year");
      startMonthDate = monthEnCourt.clone().startOf("year");
      this._countTotalArea(startMonthDate, endMonthDate);
    } else if (momentSelected == 'DEFAULT') {
      // PERSONNAL
      this._countTotalArea()
    }
  }

  _countTotalArea(
    startMonthDate: moment.Moment = null,
    endMonthDate: moment.Moment = null
  ) {
    let totalArea = 0;
    if (startMonthDate == null && endMonthDate == null) {
      this.searchedDatas.forEach((inv: Inventaire) => {
        if (inv.epaysage && inv.epaysage.essence.length > 0) {
          inv.epaysage.essence.forEach((essence: Essence) => {
            if (essence.caract && CARACT_TAB.findIndex((value) => value.name === essence.caract) !== -1) {
              totalArea += essence.area ? parseFloat(essence.area) : 0;
            }
          });
        }
      });
    } else {
      this.searchedDatas.forEach((inv: Inventaire) => {
        const createdAt = moment(inv.createdAt);
        if (
          startMonthDate.toDate() <= createdAt.toDate() &&
          endMonthDate.toDate() >= createdAt.toDate()
        ) {
          if (inv.epaysage && inv.epaysage.essence.length > 0) {
            inv.epaysage.essence.forEach((essence: Essence) => {
              if (essence.caract && CARACT_TAB.findIndex((value) => value.name === essence.caract) !== -1) {
                totalArea += essence.area ? parseFloat(essence.area) : 0;
              }
            });
          }
        }
      });
    }
    this.totalArea = Number(totalArea.toFixed(2));
  }

  private countStaticValEstimative(startMonthDate = null, endMonthDate = null) {
    let BEVA = 0;

    if (startMonthDate == null && endMonthDate == null) {
      this.searchedDatas.forEach((inv: Inventaire) => {

        if (inv.arbre && !isNaN(inv.arbre.beva)) {
          BEVA += Number(inv.arbre.beva);

        } else {
          inv.epaysage.essence.forEach((essence: Essence) => {
            BEVA += Number(essence.beva);
          });
        }
      });
    } else {
      this.searchedDatas.forEach((inv: Inventaire) => {
        const createdAt = moment(inv.createdAt);
        if (startMonthDate.toDate() <= createdAt.toDate() && endMonthDate.toDate() >= createdAt.toDate()) {

          if (inv.arbre && !isNaN(inv.arbre.beva)) {
            BEVA += Number(inv.arbre.beva);

          } else {
            inv.epaysage.essence.forEach((essence: Essence) => {
              BEVA += Number(essence.beva);
            });
          }
        }
      });
    }
    this.totalBeva = BEVA;
  }

  getSelectedMoment(momentSelected: String) {
    if (momentSelected === 'CURRENT') {
      return moment(moment(new Date()).format());
    } else if (momentSelected == 'LAST_MONTH') {
      return moment(moment(new Date()).subtract(1, 'month').format());
    } else if (momentSelected == 'LAST_SIX_MONTH') {
      return moment(moment(new Date()).subtract(6, 'month').format());
    } else if (momentSelected == 'LAST_YEAR') {
      return moment(moment(new Date()).subtract(1, 'year').format());
    } else if (momentSelected == 'PERSONNAL') {

    }
  }

  getSaisieValid(momentSelected = 'DEFAULT') {
    let startMonthDate, endMonthDate;
    const monthEnCourt = this.getSelectedMoment(momentSelected);

    if (momentSelected === 'CURRENT') {
      endMonthDate = monthEnCourt.clone().endOf('month');
      startMonthDate = monthEnCourt.clone().startOf('month');
      this.countSaisieValidStatic(startMonthDate, endMonthDate);
    } else if (momentSelected === 'LAST_MONTH') {
      endMonthDate = moment(new Date()).endOf('month');
      startMonthDate = monthEnCourt.clone().startOf('month');
      this.countSaisieValidStatic(startMonthDate, endMonthDate);
    } else if (momentSelected === 'LAST_SIX_MONTH') {  
      endMonthDate = moment(new Date());
      startMonthDate = monthEnCourt.clone().startOf('month');
      this.countSaisieValidStatic(startMonthDate, endMonthDate);
    } else if (momentSelected === 'LAST_YEAR') {
      endMonthDate = moment(new Date()).clone().endOf('year');
      startMonthDate = monthEnCourt.clone().startOf('year')
      this.countSaisieValidStatic(startMonthDate, endMonthDate);
    } else  {
      // PERSONNAL YEAR
      this.countSaisieValidStatic();
    }

  }

  private countSaisieValidStatic(startMonthDate = null, endMonthDate = null) {

    let SAISIEVALID = 0;
    if (startMonthDate == null && endMonthDate == null) {
      SAISIEVALID = this.inventaireNoNFinal.length;
    } else {
      this.inventaireNoNFinal.forEach((inv: Inventaire) => {
        const createdAt = moment(inv.createdAt);
        (startMonthDate.toDate() <= createdAt.toDate() && endMonthDate.toDate() >= createdAt.toDate())
         && SAISIEVALID++
      });
    }
    this.totalSaisieValid = SAISIEVALID;
  }

  getPlantation(momentSelected = 'DEFAULT') {
  
    // COUNT PLANTATION
    let startMonthDate, endMonthDate;
    const monthEnCourt = this.getSelectedMoment(momentSelected);
    if (momentSelected === 'CURRENT') {
      endMonthDate = monthEnCourt.clone().endOf('month');
      startMonthDate = monthEnCourt.clone().startOf('month');
      this.countStaticPlant(startMonthDate, endMonthDate);
    } else if (momentSelected === 'LAST_MONTH') {
      endMonthDate = moment(new Date()).endOf('month');
      startMonthDate = monthEnCourt.clone().startOf('month');
      this.countStaticPlant(startMonthDate, endMonthDate);
    } else if (momentSelected === 'LAST_SIX_MONTH') {
      endMonthDate = moment(new Date());
      startMonthDate = monthEnCourt.clone().startOf('month');
      this.countStaticPlant(startMonthDate, endMonthDate);
    } else if (momentSelected === 'LAST_YEAR') {
      endMonthDate = moment(new Date()).clone().endOf('year');
      startMonthDate = monthEnCourt.clone().startOf('year');
      this.countStaticPlant(startMonthDate, endMonthDate);
    } else {
      this.countStaticPlant();
    }

  }

  private countStaticPlant(startMonthDate = null, endMonthDate = null) {
    let PLANTATION = 0;
    if (startMonthDate == null && endMonthDate == null) {
      PLANTATION = this.plantationData.length
    } else {
      this.plantationData.forEach((plant: Plantation) => {
        const createdAt = moment(plant.createdAt);
        if (startMonthDate.toDate() <= createdAt.toDate() && endMonthDate.toDate() >= createdAt.toDate()) PLANTATION++
      });
    }
    this.totalPlantation = PLANTATION;
  }

  // PERSONAL CAMEMBERT
  getBlocIdentity(value: String) {
    this.blocIdentity = value;
  }

  personalValid() {

    if (this.toDate !== null) {

      const fromDate = this.fromDate.day + '/' + this.fromDate.month + '/' + this.fromDate.year;
      const toDate = this.toDate.day + '/' + this.toDate.month + '/' + this.toDate.year;
      const startMonthDate = moment(fromDate, "D/M/YYYY");
      const endMonthDate = moment(toDate, "D/M/YYYY");

      if (this.blocIdentity === 'BLOC_PIE_CHART') {
        this.countprintPieChartStatic(startMonthDate, endMonthDate)
      } else if (this.blocIdentity === 'BLOC_AREA') {
        this._countTotalArea(startMonthDate, endMonthDate);
      } else if (this.blocIdentity === 'BLOC_VAL_ESTIMATE') {
        this.countStaticValEstimative(startMonthDate, endMonthDate);
      } else if (this.blocIdentity === 'BLOC_VALID_SAISIE') {
        this.countSaisieValidStatic(startMonthDate, endMonthDate);
      } else if (this.blocIdentity === 'BLOC_NEW_PLANT') {
        this.countStaticPlant(startMonthDate, endMonthDate);
      }
    }

  }
}
