import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()

export class CustomAlertService {

  newestOnTop = false;
  preventDuplicates = true;

  constructor(private toastrService: ToastrService) {
  }

  toastAlert(message: string, position: string, type: string, title = '') {
    // AFTER ADD ITEM SUCCESS
    const options = {
      tapToDismiss: type !== ('error' || 'warning'),
      closeButton: true,
      progressBar: true,
      progressAnimation: 'Increasing',
      positionClass: position,
    };
    this.toastrService.toastrConfig.newestOnTop = this.newestOnTop;
    this.toastrService.toastrConfig.preventDuplicates = this.preventDuplicates;
    this.toastrService[type](message, title, options);
  }

  errorValid(message: string) {
    // 500 ERROR SERVER STATUS
  }

  warningAlert(message: string) {
    // ALL ERROR SERVER STATUS INSTEAD OF 404
  }

  deleteItemAlert(message: string) {
    // ALL ERROR SERVER STATUS INSTEAD OF 409
  }
}
