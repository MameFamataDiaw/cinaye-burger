import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { BurgerService } from "../../services/burger.service"; // Importation du service BurgerService
import { CommonModule } from '@angular/common';
import { Burger } from '../burger.model';

@Component({
  selector: 'app-burger-details', // Nom du sélecteur pour utiliser ce composant dans les templates
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './burger-details.component.html',  // Chemin du template HTML associé
  styleUrl: './burger-details.component.css' // Chemin des styles CSS associés
})
export class BurgerDetailsComponent implements OnInit{
  burger?: Burger; // Variable pour stocker les détails du burger

  // Injection du service BurgerService et de ActivatedRoute pour accéder aux paramètres de la route
  constructor(
    private route: ActivatedRoute,
    private burgerService: BurgerService,
    private router: Router
  ) { }

  // Méthode exécutée au moment de l'initialisation du composant
  // ngOnInit(): void {
  //   const id = +this.route.snapshot.paramMap.get('id')!; // Récupération de l'ID depuis l'URL
  //   this.burgerService.getBurgerById(id).subscribe(data => {
  //     this.burger = data; // Mise à jour des détails du burger
  //   })
  // }
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.burgerService.getBurgerById(id).subscribe(burger => this.burger = burger);
  }

  editBurger(): void {
    if (this.burger) {
      this.router.navigate(['/edit-burger', this.burger.id]);
    }
  }
}
