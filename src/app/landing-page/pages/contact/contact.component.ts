import {Component, OnInit} from '@angular/core';
import {ControlService} from '../../../shared/service/control.service';
import {ContactService} from '../../../admin/contacts/shared/service/contactService.service';


import {fallIn, moveInLeft, moveInUp} from '../../../router.animations';


@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    animations: [fallIn(), moveInLeft(), moveInUp()]
})
export class ContactComponent implements OnInit {

    lat = 47.21842119999999;
    lng = -1.6666689999999562;
    zoom = 11;

    state: any;

    visibleSpinner = false;
    error = {
        showError: false,
        message: ''
    };

    success = {
        showSuccess: false,
        message: ''
    };

    nom: string
    errorNom: string = '';
    showErrorNom = false;

    prenom: string
    message: string

    email: string
    errorEmail: string = '';
    showErrorEmail = false;

    tel: string
    errorTel: string = '';
    showErrorTel = false;

    fonction: string
    errorFonction: string = '';
    showErrorFonction = false;

    // GROUPE AND OBJET SELECT
    groupe: string
    errorGroupe: string = '';
    showErrorGroupe = false;

    objet: string
    errorObjet: string = '';
    showErrorObjet = false;

    constructor(private controlService: ControlService, private contactService: ContactService) {
    }

    ngOnInit() {
    }

    // CONTROL FORM
    onControlNom() {
        let error = false;
        if (this.controlService.isEmpty(this.nom)) {
            this.showErrorNom = true;
            this.errorNom = 'Champs obligatoire';
            error = true;
        } else {
            this.showErrorNom = false;
            this.errorNom = '';
            error = false;
        }
        return error;
    }

    onControlFonction() {
        let error = false;
        if (this.controlService.isEmpty(this.fonction)) {
            this.showErrorFonction = true;
            this.errorFonction = 'Champs obligatoire';
            error = true;
        } else {
            this.showErrorFonction = false;
            this.errorFonction = '';
            error = false;
        }
        return error;
    }

    onControlTel() {
        let error = false;
        if (this.controlService.isEmpty(this.tel)) {
            this.showErrorTel = true;
            this.errorTel = 'Champs obligatoire';
            error = true;
        } else if (!this.controlService.isTelephone(this.tel)) {
            this.showErrorTel = true;
            this.errorTel = 'Saisir un numero valide';
            error = true;
        } else {
            this.showErrorTel = false;
            this.errorTel = '';
            error = false;
        }
        return error;
    }

    onControlEmail() {
        // CONTROL EMAIL FORMULAIRE
        let error = false;
        if (this.controlService.isEmpty(this.email)) {
            this.showErrorEmail = true;
            this.errorEmail = 'Champs obligatoire';
            error = true;
        } else if (!this.controlService.isEmail(this.email)) {
            this.showErrorEmail = true;
            this.errorEmail = 'Saisir un email valide';
            error = true;
        } else {
            this.showErrorEmail = false;
            this.errorEmail = '';
            error = false;
        }
        return error;
    }

    onControlGroupe() {
        let error = false;
        if (this.controlService.isEmpty(this.groupe)) {
            this.showErrorGroupe = true;
            this.errorGroupe = 'Champs obligatoire';
            error = true;
        } else {
            this.showErrorGroupe = false;
            this.errorGroupe = '';
            error = false;
        }
        return error;
    }

    onControlObjet() {
        let error = false;
        if (this.controlService.isEmpty(this.objet)) {
            this.showErrorObjet = true;
            this.errorObjet = 'Champs obligatoire';
            error = true;
        } else {
            this.showErrorObjet = false;
            this.errorObjet = '';
            error = false;
        }
        return error;
    }

    onAdd() {
        this.visibleSpinner = true;

        if (!this.onControlNom() && !this.onControlEmail() && !this.onControlTel() && !this.onControlFonction()) {
            console.log(this.prenom);
            this.contactService.add(this.nom, this.prenom, this.tel, this.email, this.fonction, this.groupe, this.objet, this.message)
                .subscribe((data: any) => {
                    this.resetForm();
                    this.visibleSpinner = false;
                    this.error.showError = false;
                    this.success.showSuccess = true;
                    let message = " Votre demande a bien été envoyée, nous vous répondrons dans les plus brefs délais. Merci"
                    this.success.message = message;
                }, err => {
                    this.visibleSpinner = false;
                    this.error.showError = true;
                    this.error.message = err;
                });
        } else {
            this.visibleSpinner = false;
        }
    }

    resetForm() {
        this.email = '';
        this.groupe = '';
        this.message = '';
        this.objet = '';
        this.nom = '';
        this.tel = '';
        this.prenom = '';
    }

}
