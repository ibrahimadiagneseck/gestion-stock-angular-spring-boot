import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculeAjouterComponent } from '../vehicule-ajouter/vehicule-ajouter.component';
import { VehiculeDetailComponent } from '../vehicule-detail/vehicule-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { ServicesService } from 'src/app/services/services.service';
import { IVehicule } from 'src/app/models/vehicule';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-interface1',
  templateUrl: './vehicule-liste.component.html',
  styleUrls: ['./vehicule-liste.component.css']
})
export class VehiculeListeComponent implements OnInit, AfterViewInit {

  focusOnInput: boolean = true;
  dataAvailable: boolean = true;



  // rechercher
  searchTerms = new Subject<string>();
  vehicules$: Observable<IVehicule[]> = of();


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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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

    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const suggestionList = document.getElementById('suggestionList');

    // Liste de suggestions (peut être dynamique en fonction de votre application)
    const suggestions = [
      'Proposition 1',
      'Proposition 2',
      'Proposition 3',
      'Proposition 4',
      'Proposition 5',
    ];

    // Fonction pour mettre à jour la liste de suggestions
    function updateSuggestions() {
      const inputValue = searchInput.value.toLowerCase();
      suggestionList!.innerHTML = '';

      // suggestions.forEach(suggestion => {
      //   if (suggestion.toLowerCase().includes(inputValue)) {
      //     const li = document.createElement('li');
      //     li.textContent = suggestion;
      //     suggestionList!.appendChild(li);
      //   }
      // });

      // if (suggestionList !== null) {
      //   if (suggestionList.childElementCount === 0) {
      //     suggestionList!.style.display = 'none';
      //   } else {
      //     suggestionList!.style.display = 'block';
      //   }
      // }


      // Si la zone de recherche est vide, masquer la liste de suggestions
      if (inputValue === '') {
        suggestionList!.style.display = 'none';
      } else {
        suggestionList!.style.display = 'block';
      }
    }

    // Écouteur d'événement pour la saisie dans la zone de recherche
    searchInput.addEventListener('input', updateSuggestions);

    // Écouteur d'événement pour le blur de la zone de recherche
    searchInput.addEventListener('blur', () => {
      // Masquer la liste de suggestions lorsque l'input perd le focus
      suggestionList!.style.display = 'none';
    });





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

  }

  popupAjouter() {
    this.matDialog.open(
      VehiculeAjouterComponent,
      {
        width: '75%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '2000ms',
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
        width: '75%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '2000ms',
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


}

