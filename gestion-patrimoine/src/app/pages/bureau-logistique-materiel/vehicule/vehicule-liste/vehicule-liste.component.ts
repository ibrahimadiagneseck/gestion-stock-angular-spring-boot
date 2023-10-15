import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculeAjouterComponent } from '../vehicule-ajouter/vehicule-ajouter.component';
import { VehiculeDetailComponent } from '../vehicule-detail/vehicule-detail.component';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { IVehicule } from 'src/app/models/vehicule';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// import { Margins } from 'pdfmake/interfaces';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-interface1',
  templateUrl: './vehicule-liste.component.html',
  styleUrls: ['./vehicule-liste.component.css']
})
export class VehiculeListeComponent implements OnInit, OnDestroy, AfterViewInit {


  private subscriptions: Subscription[] = [];



  /* ----------------------------------------------------------------------------------------- */
  focusOnInput: boolean = false;

  @ViewChild('monDiv', { static: true }) monDiv: ElementRef | undefined;

  divClique(): void {
    // Code à exécuter lorsque l'élément <div> est cliqué
    // Par exemple, vous pouvez modifier une variable ou déclencher une action
    // console.log('L\'élément <div> a été cliqué !');
    this.focusOnInput = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Vérifie si le clic a eu lieu en dehors de l'élément monDiv
    if (!this.monDiv?.nativeElement.contains(event.target)) {
      // Code à exécuter lorsque le clic est en dehors de monDiv
      // console.log('Clic en dehors de monDiv détecté.');
      this.focusOnInput = false;
    }
  }
  /* ----------------------------------------------------------------------------------------- */



  /* ----------------------------------------------------------------------------------------- */
  @ViewChild('myInputSearch') myInputSearch!: ElementRef;
  // rechercher
  searchTerms = new Subject<string>();
  vehicules$: Observable<IVehicule[]> = of();
  // recherche custom
  searchTermsFilterDoubleMatriculeMarque = new Subject<string>();
  termeRechercheMatriculeMarque: string = "";
  vehiculeFilterDoubleMatriculeMarque$: Observable<IVehicule[]> = of();
  /* ----------------------------------------------------------------------------------------- */


  vehicules: IVehicule[] = [];

  /* ----------------------------------------------------------------------------------------- */
  // tableau
  rowNumber!: number; // numéro de ligne pour le tableau
  columnsDateFormat: string[] = [
    "dateFabrication",
    "dateCommande",
    "dateLivraison"
  ];
  columnsToHide: string[] = [
    "transmission",
    "dateFabrication",
    "dateCommande",
    "dateLivraison",
    "energie",
    "etat",
    "typeVehicule"
  ];
  dataSource = new MatTableDataSource<IVehicule>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "N°",
    "numeroChassis",
    "numeroMatricule",
    "modele",
    "marque",
    "couleur",
    "transmission",
    "dateFabrication",
    "dateCommande",
    "dateLivraison",
    "energie",
    "etat",
    "typeVehicule"
  ];
  displayedColumnsCustom: string[] = [
    "N°",
    "N° châssis",
    "N° matricule",
    "Modèle",
    "Marque",
    "Couleur",
    "Transmission",
    "Date Fabrication",
    "Date Commande",
    "Date Livraison",
    "Énergie",
    "État",
    "Type Véhicule"
  ];
  /* ----------------------------------------------------------------------------------------- */

  constructor(
    // private router: Router,
    // private route: ActivatedRoute,
    private vehiculeService: VehiculeService,
    private matDialog: MatDialog,
    private el: ElementRef, private renderer: Renderer2
  ) { }


  ngAfterViewInit(): void {
    /* ----------------------------------------------------------------------------------------- */
    // menu
    const coll = this.el.nativeElement.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
      this.renderer.listen(coll[i], "click", () => {
        coll[i].classList.toggle("active");
        const content = coll[i].nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
    /* ----------------------------------------------------------------------------------------- */

  }


  ngOnInit(): void {

    /* ----------------------------------------------------------------------------------------- */
    this.recupererVehicules();
    /* ----------------------------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------------------------- */
    // rechercher
    this.vehicules$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.vehiculeService.searchVehiculeList(term, this.vehicules))
      // {.....List(ab)............List(abc)......}
    );
    this.vehiculeFilterDoubleMatriculeMarque$ = this.searchTermsFilterDoubleMatriculeMarque.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.vehiculeService.searchVehiculeListFilterDouble(term, this.vehicules))
      // {.....List(ab)............List(abc)......}
    );

    /* ----------------------------------------------------------------------------------------- */
  }

  generatePDF(): void {

  }

/* ----------------------------------------------------------------------------------------- */
//  générer un pdf avec Pdfmake
//   generatePDF(): void {
//     const months = [
//       'JANV.',
//       'FÉVR.',
//       'MARS',
//       'AVR.',
//       'MAI',
//       'JUIN',
//       'JUIL.',
//       'AOÛT',
//       'SEPT.',
//       'OCT.',
//       'NOV.',
//       'DÉC.'
//     ];

//     const vehiculesData = this.vehicules.map((vehicule) => {
//       return [
//         vehicule.numeroChassis,
//         vehicule.numeroMatricule,
//         vehicule.modele,
//         vehicule.marque,
//         vehicule.couleur,
//         vehicule.transmission,
//         `${new Date(vehicule.dateFabrication).getDate()} ${months[new Date(vehicule.dateFabrication).getMonth()]} ${new Date(vehicule.dateFabrication).getFullYear() % 100}`,
//         `${new Date(vehicule.dateCommande).getDate()} ${months[new Date(vehicule.dateCommande).getMonth()]} ${new Date(vehicule.dateCommande).getFullYear() % 100}`,
//         `${new Date(vehicule.dateLivraison).getDate()} ${months[new Date(vehicule.dateLivraison).getMonth()]} ${new Date(vehicule.dateLivraison).getFullYear() % 100}`,
//         vehicule.energie,
//         vehicule.etat,
//         vehicule.typeVehicule
//       ];
//     });

//     const documentDefinition = {

//       pageSize: { width: 1200, height: 1200 },
//       content: [
//         { text: 'Liste des véhicules', style: 'header', absolutePosition: { x:20, y:10 }, },
//         {
//           table: {
//             style:'tableStyle',
//             headerRows: 1,
//             // widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
//             margin: [82],
//             body: [
//               [
//                 { text: 'N° Châssis', style: 'header' },
//                 { text: 'N° Matricule', style: 'header' },
//                 { text: 'Modèle', style: 'header' },
//                 { text: 'Marque', style: 'header' },
//                 { text: 'Couleur', style: 'header' },
//                 { text: 'Transmission', style: 'header' },
//                 { text: 'Date Fabrication', style: 'header' },
//                 { text: 'Date Commande', style: 'header' },
//                 { text: 'Date Livraison', style: 'header' },
//                 { text: 'Énergie', style: 'header' },
//                 { text: 'État', style: 'header' },
//                 { text: 'Type Véhicule', style: 'header' },
//               ],
//               ...vehiculesData,
//             ]
//           },
//           layout: 'lightHorizontalLines', // Option de mise en forme du tableau
//         }
//       ],
//       styles: {
//         header: {
//           fontSize: 10,
//           bold: true
//         },
//       },
//       tableStyle: {
//         tableWidth: 'auto', // Largeur du tableau (utilisez 'auto' pour l'ajuster automatiquement)
//         cellPadding: 3, // Rembourrage des cellules
//         margin: [null, 20, null, 20],
//       },
//     };

//     pdfMake.createPdf(documentDefinition).open();
//   }


  search(term: string): void {
    this.termeRechercheMatriculeMarque = term;
    this.searchTerms.next(term);
    this.searchTermsFilterDoubleMatriculeMarque.next(term);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  FilterDoubleMatriculeMarque(termeRechercheMatriculeMarque: string) {
    this.termeRechercheMatriculeMarque = termeRechercheMatriculeMarque;
    this.myInputSearch.nativeElement.value = termeRechercheMatriculeMarque;
    this.dataSource.filter = termeRechercheMatriculeMarque.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
    this.focusOnInput = false;
  }


  isNumber(termeRechercheMatriculeMarque: string): boolean {
    return !isNaN(Number(termeRechercheMatriculeMarque))
  }


  recupererVehicules(): void {
    const subscription = this.vehiculeService.getVehicules().subscribe({
      next: (donnees: IVehicule[]) => {
        // this.vehicules = donnees.sort((a, b) => a.numeroChassis - b.numeroChassis);
        this.vehicules = donnees.sort((a, b) => new Date(b.dateEnregistrement).getTime() - new Date(a.dateEnregistrement).getTime());

        this.rowNumber = 1;

        // this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
        this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules.map((item) => ({
          ...item,
          rowNumber: this.rowNumber++
        })));

        // console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
      },
      error: (erreurs: HttpErrorResponse) => {
        console.log(erreurs);
      }
    });

    this.subscriptions.push(subscription);
  }



  popupAjouter(): void {
    const dialogRef = this.matDialog.open(
      VehiculeAjouterComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms'
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  popupDetail(element: any): void {
    const dialogRef = this.matDialog.open(
      VehiculeDetailComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: element
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}

