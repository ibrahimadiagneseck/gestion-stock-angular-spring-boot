import { Injectable } from '@angular/core';
import { IVehicule } from '../models/vehicule';
import { Observable, of } from 'rxjs';
import { SelectEnum } from '../enum/select-enum';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  // ----------------------------------------------------------------------------
  public searchVehiculeList(term: string, listeVehicules: IVehicule[]): Observable<IVehicule[]> {
    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de vehicule en fonction du terme de recherche
    const filteredVehicule = listeVehicules.filter((vehicule) =>
      this.doesVehiculeMatchTerm(vehicule, term)
    );

    return of(filteredVehicule);
  }

  private doesVehiculeMatchTerm(vehicule: IVehicule, term: string): boolean {
    // Vérifier si le terme de recherche correspond à n'importe lequel des attributs du Pokémon
    const termLowerCase = term.toLowerCase();
    return (
      vehicule.couleur.toLowerCase().includes(termLowerCase) ||
      vehicule.transmission.toLowerCase().includes(termLowerCase) ||
      vehicule.modele.toLowerCase().includes(termLowerCase)
      // Ajoutez d'autres attributs à vérifier si nécessaire
    );
  }
  // ----------------------------------------------------------------------------



  // ----------------------------------------------------------------------------


  // Fonction de validation personnalisée pour chaque select
  public validateCouleurSelection(control: { value: string; }) {
    if (control.value === SelectEnum.COULEUR) {
      return { invalideCouleurSelection: true };
    }
    return null;
  }

  public validateTransmissionSelection(control: { value: string; }) {
    if (control.value === SelectEnum.TRANSMISSION) {
      return { invalideTransmissionSelection: true };
    }
    return null;
  }

  public validateEnergieSelection(control: { value: string; }) {
    if (control.value === SelectEnum.ENERGIE) {
      return { invalideEnergieSelection: true };
    }
    return null;
  }

  public validateEtatSelection(control: { value: string; }) {
    if (control.value === SelectEnum.ETAT) {
      return { invalideEtatSelection: true };
    }
    return null;
  }

  public validateMarqueSelection(control: { value: string; }) {
    if (control.value === SelectEnum.MARQUE) {
      return { invalideMarqueSelection: true };
    }
    return null;
  }

  public validateTypeVehiculeSelection(control: { value: string; }) {
    if (control.value === SelectEnum.TYPE_VEHICULE) {
      return { invalideTypeVehiculeSelection: true };
    }
    return null;
  }


  // ----------------------------------------------------------------------------


}
