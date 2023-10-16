import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ErreurComponent } from './pages/erreur/erreur.component';
import { VehiculeListeComponent } from './pages/bureau-logistique-materiel/vehicule/vehicule-liste/vehicule-liste.component';
import { VehiculeAjouterComponent } from './pages/bureau-logistique-materiel/vehicule/vehicule-ajouter/vehicule-ajouter.component';
import { VehiculeDetailComponent } from './pages/bureau-logistique-materiel/vehicule/vehicule-detail/vehicule-detail.component';
import { VehiculeModifierComponent } from './pages/bureau-logistique-materiel/vehicule/vehicule-modifier/vehicule-modifier.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import localeFr from '@angular/common/locales/fr';
import { MatTableExporterModule } from 'mat-table-exporter';
import { UtilisateurAjouterComponent } from './pages/utilisateur/utilisateur-ajouter/utilisateur-ajouter.component';
import { UtilisateurListeComponent } from './pages/utilisateur/utilisateur-liste/utilisateur-liste.component';
import { UtilisateurModifierComponent } from './pages/utilisateur/utilisateur-modifier/utilisateur-modifier.component';
import { UtilisateurDetailComponent } from './pages/utilisateur/utilisateur-detail/utilisateur-detail.component';
import { BureauLogistiqueMaterielModule } from './pages/bureau-logistique-materiel/bureau-logistique-materiel.module';
import { LoaderComponent } from './pages/loader.component';


// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12,
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    ErreurComponent,
    UtilisateurAjouterComponent,
    UtilisateurListeComponent,
    UtilisateurModifierComponent,
    UtilisateurDetailComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, // ngif ngfor
    FormsModule,
    ReactiveFormsModule, // pour formGroup
    BrowserAnimationsModule,
    HttpClientModule, // pour le backend
    NotifierModule.withConfig(
      customNotifierOptions // Custom options in here
    ),


    NgbModule, // dropdown

    BureauLogistiqueMaterielModule,
    AppRoutingModule,


    MatTableModule, MatPaginatorModule,

    // MatPaginator,

    MatExpansionModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,

    MatTableExporterModule,



    // MDCDialog
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
