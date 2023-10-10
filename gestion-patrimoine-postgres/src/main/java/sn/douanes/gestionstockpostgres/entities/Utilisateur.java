package sn.douanes.gestionstockpostgres.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "utilisateur")
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    // @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "identifiant_utilisateur", nullable = false, updatable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long id;

    //@Column(name = "utilisateur_id")
    private String utilisateurid;

    //@Column(name = "username")
    private String username;

    //@Column(name = "email")
    private String email;

    //@Column(name = "date_naissance")
    private Date datenaissance;

    //@Column(name = "lieu_naissance")
        private String lieunaissance;

    @OneToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(	name = "utilisateurvehicule",
            joinColumns = {
                    @JoinColumn(name = "identifiant_utilisateur")
            }, inverseJoinColumns = {
            @JoinColumn(name = "identifiant_vehicule")
    }
    )
    private List<Vehicule> vehicules;

    public Utilisateur() {
    }

    public Utilisateur(Long id, String utilisateurid, String username, String email, Date datenaissance, String lieunaissance, List<Vehicule> vehicules) {
        this.id = id;
        this.utilisateurid = utilisateurid;
        this.username = username;
        this.email = email;
        this.datenaissance = datenaissance;
        this.lieunaissance = lieunaissance;
        this.vehicules = vehicules;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUtilisateurid() {
        return utilisateurid;
    }

    public void setUtilisateurid(String utilisateurid) {
        this.utilisateurid = utilisateurid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDatenaissance() {
        return datenaissance;
    }

    public void setDatenaissance(Date datenaissance) {
        this.datenaissance = datenaissance;
    }

    public String getLieunaissance() {
        return lieunaissance;
    }

    public void setLieunaissance(String lieunaissance) {
        this.lieunaissance = lieunaissance;
    }

    public List<Vehicule> getVehicules() {
        return vehicules;
    }

    public void setVehicules(List<Vehicule> vehicules) {
        this.vehicules = vehicules;
    }
}
