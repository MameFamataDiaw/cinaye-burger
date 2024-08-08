import { Component, OnInit } from '@angular/core';
import { BurgerService } from '../services/burger.service';
import { Router, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import { Burger } from '../burgers/burger.model';

@Component({
  selector: 'app-burger-catalogue',
  standalone: true,
  imports: [ RouterModule, CommonModule ],
  templateUrl: './burger-catalogue.component.html',
  styleUrl: './burger-catalogue.component.css'
})
export class BurgerCatalogueComponent implements OnInit{
  burgers: Burger[] = [];

  constructor(private burgerService: BurgerService, private router: Router) {}

  ngOnInit(): void {
    this.burgerService.getBurgers().subscribe((response: any) => {
      if (response.status && Array.isArray(response.burgers)) {
        this.burgers = response.burgers.filter((burger: Burger) => !burger.archived);
      } else {
        console.error('Data received is not an array:', response);
      }
    });
  }
  
  // ngOnInit(): void {
  //   this.loadBurgers();
  // }

  // loadBurgers(): void {
  //   this.burgerService.getBurgers().subscribe((response: any) => {
  //     if (response.status && Array.isArray(response.burgers)) {
  //       this.burgers = response.burgers.filter((burger: Burger) => !burger.archived);
  //     } else {
  //       console.error('Data received is not an array:', response);
  //     }
  //   });
  // }

  // ngOnInit(): void {
  //   this.burgerService.getBurgers().subscribe(
  //     (burgers: Burger[]) => this.burgers = burgers,
  //     error => console.error('Error fetching burgers', error)
  //   );
  // }

  viewDetails(id: number): void {
    this.router.navigate(['/burger-details', id]);
  }

}
