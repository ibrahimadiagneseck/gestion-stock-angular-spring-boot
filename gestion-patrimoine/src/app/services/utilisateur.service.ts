import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUtilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private urlServeur = "http://localhost:8081";

  constructor(
    private httpClient: HttpClient
  ) { }




  //  CRUD UTILISATEUR
  public getUtilisateurs():Observable<IUtilisateur[]> {
    return this.httpClient.get<IUtilisateur[]>(this.urlServeur+"/Utilisateurs");
  }

  public postUtilisateur(utilisateur: IUtilisateur): Observable<IUtilisateur> {
    return this.httpClient.post<IUtilisateur>(`${this.urlServeur}/AjouterUtilisateur`, utilisateur);
  }

  public putUtilisateur(utilisateur: IUtilisateur): Observable<IUtilisateur> {
    return this.httpClient.put<IUtilisateur>(`${this.urlServeur}/ModifierUtilisateur`, utilisateur);
  }

  public deleteUtilisateur(utilisateurId: String): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlServeur}/SupprimerUtilisateurByUtilisateurId/${utilisateurId}`);
  }

  public getUtilisateurByUtilisateurId(utilisateurId: String):Observable<IUtilisateur> {
    return this.httpClient.get<IUtilisateur>(`${this.urlServeur}/UtilisateurByUtilisateurId/${utilisateurId}`);
  }




}
