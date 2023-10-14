import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IVehicule } from '../models/vehicule';

@Injectable({
  providedIn: 'root',
})
export class VehiculeService {

  private urlServeur = 'http://localhost:8081';

  constructor(private httpClient: HttpClient) {}

  // ----------------------------------------------------------------------------
  // RECHERCHER VEHICULE SANS DOUBLONS
  public searchVehiculeListFilterDouble(term: string, listeVehicules: IVehicule[]): Observable<IVehicule[]> {

    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de vehicule en fonction du terme de recherche
    const filteredVehicules = listeVehicules.filter((vehicule) =>
      vehicule.numeroMatricule.toString().includes(term.toLowerCase()) || vehicule.marque.toLowerCase().includes(term.toLowerCase())
    );

    // Utilisation de la méthode filter() pour éliminer les doublons
    const filteredVehicules1: IVehicule[] = filteredVehicules.filter((item, index, self) =>
      index === self.findIndex((t) => (
          t.marque === item.marque || t.numeroMatricule === item.numeroMatricule
      ))
    );

    return of(filteredVehicules1);
  }

  // RECHERCHER VEHICULE
  public searchVehiculeList(term: string, listeVehicules: IVehicule[]): Observable<IVehicule[]> {
    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de vehicule en fonction du terme de recherche
    const filteredVehicules = listeVehicules.filter((vehicule) =>
      this.doesVehiculeMatchTerm(vehicule, term)
    );

    return of(filteredVehicules);
  }

  private doesVehiculeMatchTerm(vehicule: IVehicule, term: string): boolean {
    // Vérifier si le terme de recherche correspond à n'importe lequel des attributs du Pokémon
    const termLowerCase = term.toLowerCase();
    return (
      vehicule.numeroMatricule.toString().includes(termLowerCase)
      || vehicule.marque.toLowerCase().includes(termLowerCase)
      // Ajoutez d'autres attributs à vérifier si nécessaire
    );
  }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  //  CRUD VEHICULE
  public getVehicules(): Observable<IVehicule[]> {
    return this.httpClient.get<IVehicule[]>(this.urlServeur + '/Vehicules');
  }

  public postVehicule(vehicule: IVehicule): Observable<IVehicule> {
    return this.httpClient.post<IVehicule>(
      `${this.urlServeur}/AjouterVehicule`,
      vehicule
    );
  }

  public putVehicule(
    vehicule: IVehicule
  ): Observable<IVehicule> {
    return this.httpClient.put<IVehicule>(
      `${this.urlServeur}/ModifierVehicule`,
      vehicule
    );
  }

  public deleteVehicule(vehiculeId: String): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.urlServeur}/SupprimerVehiculeByVehiculeId/${vehiculeId}`
    );
  }

  public getVehiculeByVehiculeId(vehiculeId: String): Observable<IVehicule> {
    return this.httpClient.get<IVehicule>(
      `${this.urlServeur}/VehiculeByVehiculeId/${vehiculeId}`
    );
  }
}
// ----------------------------------------------------------------------------
