import { IVehicule } from "./vehicule";

export interface IUtilisateur {

  utilisateurId: string;
  username: string;
  email: string;
  dateNaissance: Date;
  lieuNaissance: string;
  vehicules: IVehicule[];
}
