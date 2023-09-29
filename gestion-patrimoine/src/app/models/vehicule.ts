
export interface IVehicule {

  vehicule_id: number;
  numero_chassis: number;
  numero_matricule: number;
  modele: string;
  transmission: string;
  date_fabrication: Date;
  date_commande: Date;
  date_livraison: Date;
  energie: string;
  etat: string;
  type_vehicule: string;
}
