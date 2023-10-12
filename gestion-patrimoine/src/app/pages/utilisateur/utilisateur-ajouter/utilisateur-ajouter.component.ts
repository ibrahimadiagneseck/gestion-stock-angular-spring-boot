import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IUtilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-utilisateur-ajouter',
  templateUrl: './utilisateur-ajouter.component.html',
  styleUrls: ['./utilisateur-ajouter.component.css']
})
export class UtilisateurAjouterComponent implements OnInit {

  public utilisateurForm!: FormGroup;

  constructor(
    // private router: Router,
    private utilisateurService: UtilisateurService,
    // private validationService: ValidationService,
    public dialogRef: MatDialogRef<UtilisateurAjouterComponent>
  ) {}

  AjouterUtilisateur() {
    this.utilisateurService.postUtilisateur(this.utilisateurForm.value).subscribe({
      next: () => {
        this.popupFermer();
      },
      error: (erreurs: any) => {
        console.log(erreurs);
      },
    });
  }

  ngOnInit(): void {

    this.utilisateurForm = new FormGroup({

      username: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      dateNaissance: new FormControl('', [
        Validators.required
      ]),
      lieuNaissance: new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit(): void {
    // console.log(this.utilisateurForm.value);
    this.AjouterUtilisateur();
  }

  popupFermer() {
    this.dialogRef.close();
  }


}
