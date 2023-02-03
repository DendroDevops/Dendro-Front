import {AfterViewInit, Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../../app.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: [
        '../../../../vendor/libs/ngx-swiper-wrapper/ngx-swiper-wrapper.scss',
        './accueil.component.scss'
    ]
})
export class AccueilComponent implements AfterViewInit, OnInit {
    radioButtonsModel = '12M';
    agile = 75;
    private fragment: string;
    fragSub: Subscription;

    constructor(private appService: AppService, private route: Router, private activatedRoute: ActivatedRoute) {
        this.appService.pageTitle = 'accueil';
    }

    ngOnInit() {
        this.fragSub = this.activatedRoute.fragment.subscribe(fragment => {
            this.fragment = fragment;
        })
        if (document.querySelector('#' + this.fragment)) {
          document.querySelector('#' + this.fragment).scrollIntoView({behavior: 'smooth'});
        }
    }

    ngAfterViewInit() {
        try {
            document.querySelector('#' + this.fragment).scrollIntoView({behavior: 'smooth'});
            //window.location.hash = "";
        } catch (e) {
        }

        // Trigger resize event to redraw swiper
        setTimeout(() => {
            if (document.createEvent) {
                let event;

                if (typeof document['documentMode'] === 'number' && document['documentMode'] > 10) {
                    event = document.createEvent('Event');
                    event.initEvent('resize', false, true);
                } else {
                    event = new Event('resize');
                }

                window.dispatchEvent(event);
            } else {
                window['fireEvent']('onresize', document['createEventObject']());
            }
        }, 50);
    }

    ngOnDestroy() {
        this.fragSub.unsubscribe();
    }

    // FORMAT PERSO AU CLIC
    getForfait(val) {
        (val === 'GRATUIT') ? this.appService.forfaitPerso = val : this.appService.forfaitPerso = this.radioButtonsModel;
        this.route.navigate([`/Inscrire`]);
    }

    goInscription() {
        this.appService.forfaitPerso = '1M';
        this.route.navigate(['/Inscrire']);
    }

    selectForfait(event) {
        if (this.radioButtonsModel === '1M') {
            this.agile = 120;

        } else if (this.radioButtonsModel === '6M') {
            this.agile = 99;
        } else if (this.radioButtonsModel === '12M') {
            this.agile = 75;
        }

        this.appService.forfaitPerso = this.radioButtonsModel;
    }

}
