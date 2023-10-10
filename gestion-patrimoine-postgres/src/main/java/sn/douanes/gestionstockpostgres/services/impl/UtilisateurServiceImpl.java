package sn.douanes.gestionstockpostgres.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.gestionstockpostgres.entities.Utilisateur;
import sn.douanes.gestionstockpostgres.repositories.UtilisateurRepository;
import sn.douanes.gestionstockpostgres.services.UtilisateurService;

import org.apache.commons.lang3.RandomStringUtils;

import java.util.List;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    @Autowired
    UtilisateurRepository utilisateurRepository;

    @Override
    public Utilisateur saveUtilisateur(Utilisateur u) {
        u.setUtilisateurid(generateUtilisateurid());
        return utilisateurRepository.save(u);
    }

    @Override
    public Utilisateur updateUtilisateur(Utilisateur u) {

        Utilisateur utilisateur = this.findByUtilisateurid(u.getUtilisateurid());

        utilisateur.setUsername(u.getUsername());
        utilisateur.setEmail(u.getEmail());
        utilisateur.setDatenaissance(u.getDatenaissance());
        utilisateur.setLieunaissance(u.getLieunaissance());
        utilisateur.setVehicules(u.getVehicules());

        return utilisateurRepository.save(utilisateur);
    }

    @Override
    public void deleteUtilisateur(Utilisateur u) {
        utilisateurRepository.delete(u);
    }

    @Override
    public void deleteUtilisateurById(Long id) {
        utilisateurRepository.deleteById(id);
    }

    @Override
    public Utilisateur getUtilisateur(Long id) {
        return utilisateurRepository.findById(id).get();
    }

    @Override
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }




    @Override
    public Utilisateur findByUtilisateurid(String utilisateurid) {
        return utilisateurRepository.findByUtilisateurid(utilisateurid);
    }


    private String generateUtilisateurid() {
        return RandomStringUtils.randomNumeric(10);
    }
}
