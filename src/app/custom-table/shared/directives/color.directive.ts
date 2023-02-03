import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
    selector: '[appColor]'
})

export class ColorDirective implements OnInit {
    @Input() data: any;

    constructor(private el: ElementRef<HTMLTableRowElement>) {

    }

    ngOnInit() {
        this.inventoryStyle();
    }

    inventoryStyle(): void {
        if (Object.keys(this.data).find(elt => elt === 'type')) {
            this.data.type === 'ARBRE'
                ? this.el.nativeElement.classList.add('arbre-style') :
                this.el.nativeElement.classList.replace('arbre-style', 'epaysage-style')
        }
    }
}
