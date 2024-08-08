import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { BurgerService } from "../../services/burger.service"; // Importation du service BurgerService
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { Burger } from '../../burgers/burger.model';
import { FormsModule,FormBuilder, FormGroup, FormArray, ReactiveFormsModule,Validators } from '@angular/forms';

@Component({
  selector: 'app-burger-order',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule, ReactiveFormsModule],
  templateUrl: './burger-order.component.html',
  styleUrl: './burger-order.component.css'
})
export class BurgerOrderComponent implements OnInit{
  burger: Burger | undefined;
  commandeForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private burgerService: BurgerService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.commandeForm = this.fb.group({
      nomClient: ['', [Validators.required, Validators.maxLength(30)]],
      prenomClient: ['', [Validators.required, Validators.maxLength(50)]],
      telephone: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      quantite: [1, [Validators.required, Validators.min(1)]]
      
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID du burger:', id);
    if (id) {
      this.burgerService.getBurgerById(+id).subscribe(data => {
        this.burger = data;
        console.log('Burger récupéré:', this.burger);
      });
    }else {
      console.error('Erreur: ID du burger non trouvé dans la route');
    }
   }

  onSubmit(): void {
    if (this.commandeForm.valid) {
      const formData = this.commandeForm.value;

      if (this.burger && this.burger.id) {
        const orderData = {
          nomClient: formData.nomClient,
          prenomClient: formData.prenomClient,
          telephone: formData.telephone,
          email: formData.email,
          statut: 'en cours', // Statut initial
          details: [
            {
              burger_id: this.burger.id,
              quantite: formData.quantite
            }
          ]
        };

        console.log('Données de commande préparées:', orderData);

        this.orderService.createOrder(orderData).subscribe(
          response => {
            console.log('Commande créée avec succès', response);
            this.successMessage = 'Votre commande a été passée avec succès !';
            this.errorMessage = null;
            // Réinitialiser le formulaire
            this.commandeForm.reset();
             // Rediriger après un délai pour permettre à l'utilisateur de voir le message de succès
             setTimeout(() => {
              this.router.navigate(['/burger-catalogue']);
            }, 3000); // Redirection après 3 secondes
          },
          error => {
            console.error('Erreur lors de la création de la commande', error);
            this.errorMessage = 'Une erreur est survenue lors de la création de votre commande. Veuillez réessayer.';
            this.successMessage = null;
          }
        );
      } else{
        console.error('Erreur: L\'ID du burger est introuvable');
      }
  }else {
      console.log('Formulaire invalide');
    }
  }

}
