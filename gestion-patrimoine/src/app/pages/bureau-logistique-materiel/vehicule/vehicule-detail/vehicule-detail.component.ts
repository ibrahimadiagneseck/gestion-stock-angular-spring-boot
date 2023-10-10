import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VehiculeModifierComponent } from '../vehicule-modifier/vehicule-modifier.component';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './vehicule-detail.component.html',
  styleUrls: ['./vehicule-detail.component.css']
})
export class VehiculeDetailComponent implements OnInit {

  vehicule: any;

  constructor(
    // private router: Router,
    private vehiculeService: VehiculeService,
    public dialogRef: MatDialogRef<VehiculeDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private matDialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.vehicule = this.data;
  }

  supprimerVehiculeById(vehiculeid: String) {
    this.vehiculeService.deleteVehicule(vehiculeid).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (erreurs: HttpErrorResponse) => {
        console.log(erreurs);
      }
    });
  }



  popupModifier(element: any) {
    this.dialogRef.close(); // fermer le popup detail avant
    this.matDialog.open(
      VehiculeModifierComponent,
      {
        width:'80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: element
      }
    );
  }

  fermerPopup() {
    this.dialogRef.close();
  }

}
