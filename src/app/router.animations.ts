import {animate, state, style, transition, trigger} from '@angular/animations';

export function moveInUp() {
  return trigger('moveInUp', [

    transition(':enter', [
      style({opacity: '0', transform: 'translateY(20px)'}),
      animate('.6s .6s ease-in-out', style({opacity: '1', transform: 'translateX(0)'}))
    ]),
    transition(':leave', [
      style({opacity: '1', transform: 'translateX(0)'}),
      animate('.3s .2s ease-in-out', style({opacity: '0', transform: 'translateY(200px)'}))
    ])
  ]);
}

export function moveInLeft() {

  return trigger('moveInLeft', [
    transition(':enter', [
      style({opacity: '0', transform: 'translateX(-20px)'}),
      animate('.6s .6s ease-in-out', style({opacity: '1', transform: 'translateY(0)'}))
    ]),
    transition(':leave', [
      style({opacity: '1', transform: 'translateY(0)'}),
      animate('.3s .2s ease-in-out', style({opacity: '0', transform: 'translateX(-200px;)'}))
    ])
  ]);
}

export function moveInLeftBig() {

  return trigger('moveInLeft', [
    state('void', style({position: 'fixed', width: '100%'})),
    state('*', style({position: 'fixed', width: '100%'})),
    transition(':enter', [
      style({opacity: '0', transform: 'translateX(-100px)'}),
      animate('.6s .6s ease-in-out', style({opacity: '1', transform: 'translateX(100px)'}))
    ]),

  ]);
}

export function fallIn() {
  return trigger('fallIn', [
    transition(':enter', [
      style({opacity: '0', transform: 'translateY(40px)'}),
      animate('.4s .2s ease-in-out', style({opacity: '1', transform: 'translateY(0)'}))
    ]),
    transition(':leave', [
      style({opacity: '1', transform: 'translateX(0)'}),
      animate('.3s ease-in-out', style({opacity: '0', transform: 'translateX(-200px)'}))
    ])
  ]);
}


export function moveInRight() {
  return trigger('moveInRight', [
    transition(':enter', [
      style({opacity: '0', transform: 'translateX(100px)'}),
      animate('.6s .2s ease-in-out', style({opacity: '1', transform: 'translateX(0)'}))
    ])
  ]);
}

export function rotateImg() {
  return trigger('rotatedState', [
    state('default', style({transform: 'rotate(0)'})),
    state('rotated', style({transform: 'rotate(-90deg)'})),
    transition('rotated => default', animate('400ms ease-out')),
    transition('default => rotated', animate('400ms ease-in'))
  ]);
}
