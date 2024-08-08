import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { BurgerService } from '../../services/burger.service'; // Importation du service BurgerService
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Burger } from '../burger.model';
import {min} from "rxjs";

@Component({
  selector: 'app-burger-form', // Nom du sélecteur pour utiliser ce composant dans les templates
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './burger-form.component.html',// Chemin du template HTML associé
  styleUrl: './burger-form.component.css'// Chemin des styles CSS associés
})
export class BurgerFormComponent implements OnInit {
  burgerForm: FormGroup; //Formulaire reactf pour le burger
  //isEditMode = false;
  isEditMode: boolean = false; //Indicateur de mode d'edition ou de creation
  //burgerId: number | null = null; //Id du burger en mode edition

  //Injection des services necessaires
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private burgerService: BurgerService
  ) {
    //Initiallisation du formulaire avec des validateurs
    this.burgerForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      //image: ['', Validators.required],
      //statut: [true, Validators.required] // Ajoutez des valeurs par défaut appropriées
      image: [''], // Assurez-vous d'inclure tous les champs requis
      statut: [true] // Valeur par défaut pour un champ booléen
    });
  }

  //Methode executee au moment de l'initialisation du composant
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Récupération de l'ID depuis l'URL
    if (id) {
      const burgerId = Number(id);
      if (!isNaN(burgerId)) {
        this.isEditMode = true;
        //this.burgerId = +id;
        this.burgerService.getBurgerById(burgerId).subscribe({ 
          next: burger =>{
            console.log('Données reçues:', burger); // Vérifiez les données
            if (burger) {
              this.burgerForm.patchValue(burger);//remplissage du fotmulaire avec les donnees du burger
            }else{
              console.error('Aucun burger trouvé pour cet ID');
            }
          },
          error: err => console.error('Erreur lors de la récupération des données:', err)
            //console.log('Formulaire après patch:', this.burgerForm.value); // Vérifiez les données du formulaire
        });
      }else{
        console.error('ID invalide');
      }
    }
  }

  //Methode pour soumettre le formulaire
  onSubmit(): void {
    if (this.burgerForm.valid) {
      const formValue = this.burgerForm.value;
      console.log('Données du formulaire avant envoi:', formValue);
      if (this.isEditMode) {
        this.burgerService.updateBurger(Number(this.route.snapshot.paramMap.get('id')), formValue)
        .subscribe({
          next: () => this.router.navigate(['/burgers']),
          error: (err) => console.error('Erreur lors de la mise à jour du burger:', err)
        });
      } else {
        this.burgerService.saveBurger(this.burgerForm.value)
        .subscribe({
          next: () => this.router.navigate(['/burgers']),
          error: (err) => console.error('Erreur lors de l\'ajout du burger:', err)
        });
      }
  }
}
}
