import { IVehicule } from "./vehicule";

export interface IUtilisateur {

  utilisateurid: string;
  username: string;
  email: string;
  datenaissance: Date;
  lieunaissance: string;
  vehicules: IVehicule[];
}
