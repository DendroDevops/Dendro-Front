import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ContactService} from '../../shared/service/contactService.service';
import {ContactModele} from '../../shared/model/contact';
import {AppService} from '../../../../app.service';
import {LayoutService} from '../../../../layout/layout.service';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.scss', '../../../../../vendor/styles/pages/messages.scss',]
})
export class ContactAdminComponent implements OnInit, AfterViewInit {
  datas: ContactModele[];
  visibleSpinner = false;

  selected: any = [];

  totalItems = 0;
  perPage = 10;

  constructor(private contactService: ContactService, private appService: AppService, private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.listContact();
  }

  ngAfterViewInit() {
    setTimeout(() => this.layoutService.setCollapsed(true, false));
  }

  listContact() {

    this.visibleSpinner = true;
    // GET INFORMATION
    this.contactService.list()
      .subscribe(data => {
        this.visibleSpinner = false;
        this.datas = data;
        this.totalItems = this.datas.length
      }, err => console.log(err));
  }

  detailContact(id) {

  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  // CONTACT
  toggleSelect($event, message) {
    if ($event.target.checked) {
      this.selected.push(message);
    } else {
      this.selected.splice(this.selected.indexOf(message), 1);
    }
  }

}
