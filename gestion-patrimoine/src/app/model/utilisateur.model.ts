import { IVehicule } from "./vehicule.model";

export interface IUtilisateur {

  rowNumber: number;
  utilisateurId: string;
  dateEnregistrement: Date;
  username: string;
  email: string;
  dateNaissance: Date;
  lieuNaissance: string;
  vehicules: IVehicule[];
}
