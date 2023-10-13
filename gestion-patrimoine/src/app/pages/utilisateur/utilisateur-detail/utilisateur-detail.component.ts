import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUtilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-utilisateur-detail',
  templateUrl: './utilisateur-detail.component.html',
  styleUrls: ['./utilisateur-detail.component.css']
})
export class UtilisateurDetailComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  utilisateur!: IUtilisateur;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utilisateurService: UtilisateurService
  ) { }


  ngOnInit(): void {

    const utilisateurId: string|null = this.route.snapshot.paramMap.get('id');

    if(utilisateurId) {

      // this.utilisateurService.getUtilisateurByUtilisateurId(+utilisateurId).subscribe(pokemon => this.pokemon = pokemon);
      setTimeout(() => { // a enlever
        const subscription = this.utilisateurService.getUtilisateurByUtilisateurId(utilisateurId).subscribe({
          next: (donnee: IUtilisateur) => {
            this.utilisateur = donnee;
          },
          error: (erreurs: any) => {
            console.log(erreurs);
          },
        });

        this.subscriptions.push(subscription);
      }, 3000);


    }
  }

  supprimerUtilisateurById(utilisateurId: String): void {
    this.subscriptions.push(
      this.utilisateurService.deleteUtilisateur(utilisateurId).subscribe({
        next: () => {
          this.goToUtilisateurList();
        },
        error: (erreurs: HttpErrorResponse) => {
          console.log(erreurs);
        }
      })
    );
  }

  goToUtilisateurList() {
    this.router.navigate(['/gestion-utilisateur']);
  }

  goToModifierUtilisateur(utilisateurId: String) {
    this.router.navigate(['/gestion-utilisateur/modifier', utilisateurId]);
  }

}
