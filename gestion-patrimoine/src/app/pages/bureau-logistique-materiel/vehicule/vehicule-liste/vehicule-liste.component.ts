import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculeAjouterComponent } from '../vehicule-ajouter/vehicule-ajouter.component';
import { VehiculeDetailComponent } from '../vehicule-detail/vehicule-detail.component';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { IVehicule } from 'src/app/models/vehicule';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interface1',
  templateUrl: './vehicule-liste.component.html',
  styleUrls: ['./vehicule-liste.component.css']
})
export class VehiculeListeComponent implements OnInit, AfterViewInit {

  /* ----------------------------------------------------------------------------------------- */
  focusOnInput: boolean = false;

  @ViewChild('monDiv', { static: true }) monDiv: ElementRef | undefined;

  divClique() {
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
  // rechercher
  searchTerms = new Subject<string>();
  vehicules$: Observable<IVehicule[]> = of();
  /* ----------------------------------------------------------------------------------------- */


  vehicules: IVehicule[] = [];

  /* ----------------------------------------------------------------------------------------- */
  // tableau
  rowNumber: number = 1; // Initialize it with 1
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
    "Modele",
    "Marque",
    "Couleur",
    "Transmission",
    "Date Fabrication",
    "Date Commande",
    "Date Livraison",
    "Energie",
    "Etat",
    "Type Vehicule"

  ];

  /* ----------------------------------------------------------------------------------------- */

  constructor(
    private router: Router,
    // private route: ActivatedRoute,
    private vehiculeService: VehiculeService,
    private matDialog: MatDialog,
    private el: ElementRef, private renderer: Renderer2
  ) { }


  ngAfterViewInit() {
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
    /* ----------------------------------------------------------------------------------------- */
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  recupererVehicules() {
    this.vehiculeService.getVehicules().subscribe({
      next: (donnees: IVehicule[]) => {
        this.vehicules = donnees;

        // this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
        this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules.map((item) => ({
          ...item,
          rowNumber: this.rowNumber++
        })));

        this.dataSource.paginator = this.paginator;

      },
      error: (erreurs: HttpErrorResponse) => {
        console.log(erreurs);
      }
    });
  }

  search(term: string) {
    this.searchTerms.next(term);
  }


  popupAjouter() {
    this.matDialog.open(
      VehiculeAjouterComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms'
      }
    );
  }

  popupDetail(element: any) {
    this.matDialog.open(
      VehiculeDetailComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          element
        }
      }
    );
  }



  // actualiserPage() {
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   this.router.onSameUrlNavigation = 'reload';
  //   this.router.navigate(['gestion-vehicule']);
  // }

}

