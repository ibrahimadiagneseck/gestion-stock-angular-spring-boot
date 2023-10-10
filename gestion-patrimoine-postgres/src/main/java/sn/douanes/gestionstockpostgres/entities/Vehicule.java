package sn.douanes.gestionstockpostgres.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "vehicule")
public class Vehicule {

    @Id
    // @GeneratedValue(strategy = GenerationType.AUTO)
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "identifiant_vehicule", nullable = false, updatable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long id;

    //@Column(name = "vehiculeid")
    private String vehiculeid;

    //@Column(name = "numero_chassis")
    private Integer numerochassis;

    //@Column(name = "numero_matricule")
    private Integer numeromatricule;

    //@Column(name = "modele")
    private String modele;

    //@Column(name = "marque")
    private String marque;

    //@Column(name = "transmission")
    private String transmission;

    //@Column(name = "couleur")
    private String couleur;

    //@Column(name = "date_fabrication")
    private Date  datefabrication;

    //@Column(name = "date_commande")
    private Date  datecommande;

    //@Column(name = "date_livraison")
    private Date datelivraison;

    //@Column(name = "energie")
    private String energie;

    //@Column(name = "etat")
    private String  etat;

    //@Column(name = "type_vehicule")
    private String typevehicule;

    public Vehicule(Long id, String vehiculeid, Integer numerochassis, Integer numeromatricule, String modele, String marque, String transmission, String couleur, Date datefabrication, Date datecommande, Date datelivraison, String energie, String etat, String typevehicule) {
        this.id = id;
        this.vehiculeid = vehiculeid;
        this.numerochassis = numerochassis;
        this.numeromatricule = numeromatricule;
        this.modele = modele;
        this.marque = marque;
        this.transmission = transmission;
        this.couleur = couleur;
        this.datefabrication = datefabrication;
        this.datecommande = datecommande;
        this.datelivraison = datelivraison;
        this.energie = energie;
        this.etat = etat;
        this.typevehicule = typevehicule;
    }

    public Vehicule() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehiculeid() {
        return vehiculeid;
    }

    public void setVehiculeid(String vehiculeid) {
        this.vehiculeid = vehiculeid;
    }

    public Integer getNumerochassis() {
        return numerochassis;
    }

    public void setNumerochassis(Integer numerochassis) {
        this.numerochassis = numerochassis;
    }

    public Integer getNumeromatricule() {
        return numeromatricule;
    }

    public void setNumeromatricule(Integer numeromatricule) {
        this.numeromatricule = numeromatricule;
    }

    public String getModele() {
        return modele;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public String getCouleur() {
        return couleur;
    }

    public void setCouleur(String couleur) {
        this.couleur = couleur;
    }

    public Date getDatefabrication() {
        return datefabrication;
    }

    public void setDatefabrication(Date datefabrication) {
        this.datefabrication = datefabrication;
    }

    public Date getDatecommande() {
        return datecommande;
    }

    public void setDatecommande(Date datecommande) {
        this.datecommande = datecommande;
    }

    public Date getDatelivraison() {
        return datelivraison;
    }

    public void setDatelivraison(Date datelivraison) {
        this.datelivraison = datelivraison;
    }

    public String getEnergie() {
        return energie;
    }

    public void setEnergie(String energie) {
        this.energie = energie;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public String getTypevehicule() {
        return typevehicule;
    }

    public void setTypevehicule(String typevehicule) {
        this.typevehicule = typevehicule;
    }
}
