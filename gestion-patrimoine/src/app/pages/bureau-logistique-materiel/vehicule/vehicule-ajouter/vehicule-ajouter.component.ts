import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectEnum } from 'src/app/enum/select-enum';
import { IVehicule } from 'src/app/models/vehicule';
import { ServicesService } from 'src/app/services/services.service';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'app-ajouter',
  templateUrl: './vehicule-ajouter.component.html',
  styleUrls: ['./vehicule-ajouter.component.css'],
})
export class VehiculeAjouterComponent implements OnInit {


  selectCouleur: string = SelectEnum.COULEUR;
  selectTransmission: string = SelectEnum.TRANSMISSION;
  selectEnergie: string = SelectEnum.ENERGIE;
  selectEtat: string = SelectEnum.ETAT;
  selectMarque: string = SelectEnum.MARQUE;
  selectTypeVehicule: string = SelectEnum.TYPE_VEHICULE;

  public vehiculeForm!: FormGroup;

  constructor(
    private router: Router,
    private serviceService: ServicesService,
    private validationsService: ValidationsService,
    public dialogRef: MatDialogRef<VehiculeAjouterComponent>
  ) {}

  AjouterVehicule() {
    this.serviceService.postVehicule(this.vehiculeForm.value).subscribe({
      next: (donnee: IVehicule) => {
        this.popupFermer();
        this.actualiserPage();
      },
      error: (erreurs: any) => {
        console.log(erreurs);
      },
    });
  }

  ngOnInit(): void {

    console.log(this.selectCouleur);


    this.vehiculeForm = new FormGroup({

      numeroChassis: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{4}$'),
      ]),
      couleur: new FormControl(this.selectCouleur, [
        Validators.required,
        this.validationsService.validateCouleurSelection
      ]),
      dateLivraison: new FormControl('', [
        Validators.required
      ]),
      numeroMatricule: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{4}$'),
      ]),
      transmission: new FormControl(this.selectTransmission, [
        Validators.required,
        this.validationsService.validateTransmissionSelection
      ]),
      energie: new FormControl(this.selectEnergie, [
        Validators.required,
        this.validationsService.validateEnergieSelection
      ]),
      modele: new FormControl('', [
        Validators.required
      ]),
      dateFabrication: new FormControl('', [
        Validators.required
      ]),
      etat: new FormControl(this.selectEtat, [
        Validators.required,
        this.validationsService.validateEtatSelection
      ]),
      marque: new FormControl(this.selectMarque, [
        Validators.required,
        this.validationsService.validateMarqueSelection
      ]),
      dateCommande: new FormControl('', [
        Validators.required
      ]),
      typeVehicule: new FormControl(this.selectTypeVehicule, [
        Validators.required,
        this.validationsService.validateTypeVehiculeSelection
      ])
    });
  }

  onSubmit(): void {
    // console.log(this.vehiculeForm.value);
    this.AjouterVehicule();
  }

  popupFermer() {
    this.dialogRef.close();
  }

  actualiserPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['gestion-vehicule']);

  }
}
