import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurgerService } from "../../services/burger.service";
import { Router,RouterModule } from '@angular/router';
import { Burger } from '../burger.model';

@Component({
  selector: 'app-burger-list',// Nom du sélecteur pour utiliser ce composant dans les templates
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './burger-list.component.html', // Chemin du template HTML associé
  styleUrl: './burger-list.component.css' // Chemin des styles CSS associés
})
export class BurgerListComponent implements OnInit{
  burgers: Burger[] = []; // Tableau pour stocker la liste des burgers

  // Injection du service BurgerService
  constructor(private burgerService: BurgerService, private router: Router) { }

  //Methode executee au moment de l'initialisation du composant
  
  ngOnInit(): void {
    this.loadBurgers();
  }

  loadBurgers(): void {
    this.burgerService.getBurgers().subscribe((response: any) => {
      if (response.status && Array.isArray(response.burgers)) {
        this.burgers = response.burgers.filter((burger: Burger) => !burger.archived);
      } else {
        console.error('Data received is not an array:', response);
      }
    });
  }

  // loadBurgers(): void {
  //   this.burgerService.getBurgers().subscribe((data: Burger[]) => {
  //     if (Array.isArray(data)) {
  //       this.burgers = data.filter(burger => !burger.archived);
  //     } else {
  //       console.error('Data received is not an array:', data);
  //     }
  //   }, error => {
  //     console.error('Error fetching burgers', error);
  //   });
  // }
  
  // ngOnInit(): void {
  //   // Appel du service pour obtenir les burgers et mise à jour du tableau
  //   this.burgerService.getBurgers().subscribe(
  //     (response: any) => {
  //       this.burgers = response.burgers; // Extraire le tableau burgers de la réponse
  //       console.log(this.burgers);
  //     },
  //     (error) => {
  //       console.error('Error fetching burgers', error);
  //     }
  //   );
  
  // }

  viewDetails(id: number): void {
    if (id !== undefined) {
      this.router.navigate(['/burgers', id]);
    }
  }

  archiveBurger(id: number): void {
    this.burgerService.archiveBurger(id).subscribe(() => {
        this.burgers = this.burgers.filter(b => b.id !== id);
    });
  }

  // editBurger(id: number): void {
  //   this.router.navigate(['/edit-burger', id]);
  // }

}
