import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { BurgerService } from "../services/burger.service"; // Importation du service BurgerService
import { CommonModule } from '@angular/common';
import { Burger } from '../burgers/burger.model';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  burger!: Burger;

  constructor(
    private route: ActivatedRoute,
    private burgerService: BurgerService,
    //private router: Router
  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.burgerService.getBurgerById(id).subscribe(data => {
      this.burger = data;
    });
  }
}
