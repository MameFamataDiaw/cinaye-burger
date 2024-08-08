import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Commande } from '../../orders/commande.model';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {
  commandes: Commande[] = [];

  constructor(private orderService: OrderService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getCommandes().subscribe((response: any) => {
      if (response.status && Array.isArray(response.commandes)) {
        this.commandes = response.commandes; // Extraire le tableau 'commandes'
        console.log('Commandes reçues:', response);
      }else{
          console.error('Data received is not an array:', response);
      }
   });
  }

  
  cancelOrder(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir annuler cette commande ?')) {
      this.orderService.cancelOrder(id).subscribe({
        next: response => {
          console.log('Commande annulée avec succès', response);
          this.loadOrders(); // Recharger la liste des commandes après l'annulation
        },
        error: err => {
          console.error('Erreur lors de l\'annulation de la commande', err);
        }
      });
    }
  }

  markAsCompleted(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir marquer cette commande comme terminée ?')) {
      this.orderService.markAsCompleted(id).subscribe({
        next: response => {
          console.log('Commande complétée avec succès', response);
          this.loadOrders(); // Recharger la liste des commandes après la complétion
        },
        error: err => {
          console.error('Erreur lors de la complétion de la commande', err);
        }
      });
    }
  }

  markAsPaid(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir marquer cette commande comme payée ?')) {
      this.orderService.markAsPaid(id).subscribe({
        next: response => {
          console.log('Commande marquée comme payée avec succès', response);
          this.loadOrders(); // Recharger la liste des commandes après le paiement
        },
        error: err => {
          console.error('Erreur lors du paiement de la commande', err);
        }
      });
    }
  }

  // Ajoutez une méthode pour afficher le bouton payer
  showPayButton(commande: Commande): boolean {
    return commande.statut === 'termine';
  }

}
