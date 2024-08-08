import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-order.component.html',
  styleUrl: './payment-order.component.css'
})
export class PaymentOrderComponent implements OnInit{
  paiementForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
    this.paiementForm = this.fb.group({
      commandeId: [''],
      montant: [''],
      date: [new Date()]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.orderService.updateCommande(this.paiementForm.value).subscribe();
  }
}
