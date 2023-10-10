package sn.douanes.gestionstockpostgres.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.douanes.gestionstockpostgres.entities.Vehicule;
import sn.douanes.gestionstockpostgres.services.VehiculeService;


import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
public class VehiculeController {

    @Autowired
    VehiculeService vehiculeService;

    @GetMapping("/Vehicules")
    @ResponseBody
    public List<Vehicule> getAllVehicules() {
        List<Vehicule> list = vehiculeService.getAllVehicules();
        return list;
    }

    @GetMapping("/VehiculeByVehiculeId/{vehiculeId}")
    @ResponseBody
    public Vehicule VehiculeByVehiculeId(@PathVariable String vehiculeId) {
        Vehicule vehicule = vehiculeService.findByVehiculeid(vehiculeId);
        return vehicule;
    }

    @PostMapping("/AjouterVehicule")
    @ResponseBody
    public Vehicule AjouterVehicule(@RequestBody Vehicule v) {
        return vehiculeService.saveVehicule(v);
    }

    @PutMapping("/ModifierVehicule")
    @ResponseBody
    public Vehicule ModifierVehicule(@RequestBody Vehicule v) {
        return vehiculeService.updateVehicule(v);
    }

    @DeleteMapping("SupprimerVehiculeByVehiculeId/{vehiculeId}")
    public void SupprimerVehiculeByVehiculeId(@PathVariable("vehiculeId") String vehiculeId) {
        vehiculeService.deleteVehiculeById(vehiculeService.findByVehiculeid(vehiculeId).getId());
    }


}
