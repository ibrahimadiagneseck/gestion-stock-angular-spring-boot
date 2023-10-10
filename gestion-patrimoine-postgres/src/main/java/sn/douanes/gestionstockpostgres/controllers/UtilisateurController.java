package sn.douanes.gestionstockpostgres.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.douanes.gestionstockpostgres.entities.Utilisateur;
import sn.douanes.gestionstockpostgres.services.UtilisateurService;


import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
public class UtilisateurController {

    @Autowired
    UtilisateurService utilisateurService;

    @GetMapping("/Utilisateurs")
    @ResponseBody
    public List<Utilisateur> getAllUsers() {
        List<Utilisateur> list = utilisateurService.getAllUtilisateurs();
        return list;
    }

    @GetMapping("/UtilisateurByUtilisateurId/{utilisateurId}")
    @ResponseBody
    public Utilisateur UtilisateurByUtilisateurId(@PathVariable String utilisateurId) {
        Utilisateur user = utilisateurService.findByUtilisateurid(utilisateurId);
        return user;
    }

    @PostMapping("/AjouterUtilisateur")
    @ResponseBody
    public Utilisateur AjouterUtilisateur(@RequestBody Utilisateur u) {
        return utilisateurService.saveUtilisateur(u);
    }

    @PutMapping("/ModifierUtilisateur")
    @ResponseBody
    public Utilisateur ModifierUtilisateur(@RequestBody Utilisateur u) {
        return utilisateurService.updateUtilisateur(u);
    }

    @DeleteMapping("SupprimerUtilisateurByUtilisateurId/{utilisateurId}")
    public void SupprimerUtilisateurByUtilisateurId(@PathVariable("utilisateurId") String utilisateurId) {
        utilisateurService.deleteUtilisateurById(utilisateurService.findByUtilisateurid(utilisateurId).getId());
    }

}
