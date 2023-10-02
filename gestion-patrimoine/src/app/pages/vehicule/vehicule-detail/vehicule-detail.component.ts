import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VehiculeModifierComponent } from '../vehicule-modifier/vehicule-modifier.component';
import { ServicesService } from 'src/app/services/services.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './vehicule-detail.component.html',
  styleUrls: ['./vehicule-detail.component.css']
})
export class VehiculeDetailComponent implements OnInit {

  vehicule: any;

  constructor(
    // private dialogService: DialogService,
    private servicesService: ServicesService,
    public dialogRef: MatDialogRef<VehiculeDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private matDialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.vehicule = this.data;
  }

  supprimerVehiculeById(idVehicule: number) {
    this.servicesService.deleteVehicule(idVehicule).subscribe({
      next: () => {
        this.fermerPopup();
      },
      error: (erreurs: HttpErrorResponse) => {
        console.log(erreurs);
      }
    });
  }



  popupModifier(element: any) {
    this.matDialog.open(
      VehiculeModifierComponent,
      {
        width:'75%',
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'2000ms',
        data: {
          element
        }
      }
    );
  }

  fermerPopup() {
    this.dialogRef.close();
  }

}
