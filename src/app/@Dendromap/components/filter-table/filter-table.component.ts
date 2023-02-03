import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {FilterTableService} from "./service/filter-table.service";
import {fromEvent, Subject} from "rxjs";
import {takeUntil} from "rxjs/internal/operators";
import {PreviousUrlService} from "./service/previous-url.service";

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit, OnDestroy {

  @Output() onFilter: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('filterVal', {static: true}) filterVal: ElementRef;

  @Input() placeholder: string = 'Rechercher...';
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(
    private filterService: FilterTableService,
    private urlService: PreviousUrlService
  ) {
  }

  ngOnInit() {
    this.update();
    this.filterService.getProfileSourceObs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: string) => {
        let urlPrevious = this.urlService.getUrl();
        if (data) {
          if (PreviousUrlService.isPreviousDetailUrl(urlPrevious) || PreviousUrlService.existFilterRoute(urlPrevious)) {
            this.filterVal.nativeElement.value = data;
            this.onFilter.emit(data);
          } else {
            this.urlService.removeUrl();
          }
        } else {
          this.filterVal.nativeElement.value = '';
        }
      })
  }

  update(): void {
    fromEvent(this.filterVal.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value && event.target.value.trim();
        }),
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe((text: string) => {
        this.onFilter.emit(text.toLowerCase())
        this.filterService.updateFilter(text.toLowerCase());
      }, (err) => {
        this.filterService.updateFilter(null);
        this.onFilter.emit(null)
      }
    )
  }


  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
