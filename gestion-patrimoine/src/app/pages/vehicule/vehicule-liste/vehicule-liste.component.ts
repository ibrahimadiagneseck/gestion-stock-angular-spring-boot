import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculeAjouterComponent } from '../vehicule-ajouter/vehicule-ajouter.component';
import { VehiculeDetailComponent } from '../vehicule-detail/vehicule-detail.component';
import {MatIconModule} from '@angular/material/icon';
import { ServicesService } from 'src/app/services/services.service';
import { IVehicule } from 'src/app/models/vehicule';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-interface1',
  templateUrl: './vehicule-liste.component.html',
  styleUrls: ['./vehicule-liste.component.css']
})
export class VehiculeListeComponent implements OnInit, AfterViewInit {

  // rechercher
  searchTerms = new Subject<string>();
  vehicules$!: Observable<IVehicule[]>;


  vehicules: IVehicule[] = [];

  // tableau
  dataSource = new MatTableDataSource<IVehicule>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    // private router: Router,
    // private route: ActivatedRoute,
    private servicesService: ServicesService,
    // private dialogService: DialogService,
    private matDialog: MatDialog,
    private el: ElementRef, private renderer: Renderer2
  ) { }


  recupererVehicules() {
    this.servicesService.getVehicules().subscribe({
      next: (donnees: IVehicule[]) => {
        this.vehicules = donnees;

        this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
        this.dataSource.paginator = this.paginator;
      },
      error: (erreurs: HttpErrorResponse) => {
        console.log(erreurs);
      }
    });
  }


  ngOnInit(): void {
    this.recupererVehicules();

    // rechercher
    this.vehicules$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.servicesService.searchVehiculeList(term, this.vehicules))
      // {.....List(ab)............List(abc)......}
    );

  }

  // rechercher
  search(term: string) {
    this.searchTerms.next(term);
  }



  ngAfterViewInit() {
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



    // this.dataSource.paginator = this.paginator;
    // setTimeout(() => {
    //   this.dataSource.paginator = this.paginator;
    // }, 2000);
  }

  popupAjouter() {
    this.matDialog.open(
      VehiculeAjouterComponent,
      {
        width:'75%',
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'2000ms',
        data: {
          concat: []
        }
      }
    );
  }

  popupDetail(element: any) {
    this.matDialog.open(
      VehiculeDetailComponent,
      {
        width:'75%',
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'2000ms',
        data: {
          element
        }
      }
    );
  }




  // tableau

  displayedColumns: string[] = [
    "id",
    "numeroChassis",
    "numeroMatricule",
    "modele",
    "couleur"
  ];

  // "id"
  // "numeroChassis"
  // "numeroMatricule"
  // "modele"
  // "marque"
  // "transmission"
  // "couleur"
  // "dateFabrication"
  // "dateCommande"
  // "dateLivraison"
  // "energie"
  // "etat"
  // "typeVehicule"


  // dataSource = new MatTableDataSource<IVehicule>(ELEMENT_DATA);
  // dataSource = new MatTableDataSource<IVehicule>(this.vehicules);


  // @ViewChild(MatPaginator) paginator!: MatPaginator;

}

