package sn.douanes.gestionstockpostgres.services.impl;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.gestionstockpostgres.entities.Utilisateur;
import sn.douanes.gestionstockpostgres.entities.Vehicule;
import sn.douanes.gestionstockpostgres.services.VehiculeService;

import java.util.List;
import sn.douanes.gestionstockpostgres.repositories.VehiculeRepository;

@Service
public class VehiculeServiceImpl  implements VehiculeService {

    @Autowired
    VehiculeRepository vehiculeRepository;

    @Override
    public Vehicule saveVehicule(Vehicule v) {
        v.setVehiculeid(generateVehiculeid());
        return vehiculeRepository.save(v);
    }

    @Override
    public Vehicule updateVehicule(Vehicule v) {

        Vehicule vehicule = vehiculeRepository.findByVehiculeid(v.getVehiculeid());
        System.out.println(vehicule.getMarque());
        if(vehicule != null) {
            return vehiculeRepository.save(vehicule);
        }
        return null;
    }

    @Override
    public void deleteVehicule(Vehicule v) {
        vehiculeRepository.delete(v);
    }

    @Override
    public void deleteVehiculeById(Long id) {
        vehiculeRepository.deleteById(id);
    }

    @Override
    public Vehicule getVehicule(Long id) {
        return vehiculeRepository.findById(id).get();
    }

    @Override
    public List<Vehicule> getAllVehicules() {
        return vehiculeRepository.findAll();
    }





    @Override
    public Vehicule findByVehiculeid(String vehiculeid) {
        return vehiculeRepository.findByVehiculeid(vehiculeid);
    }


    private String generateVehiculeid() {
        return RandomStringUtils.randomNumeric(10);
    }
}
