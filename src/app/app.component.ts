import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterOutlet, RouterModule, Router, NavigationEnd} from '@angular/router';
import { AuthService } from './services/auth.service';

import { BurgerDetailsComponent } from "./burgers/burger-details/burger-details.component";
import { BurgerFormComponent } from "./burgers/burger-form/burger-form.component";
import { BurgerListComponent } from "./burgers/burger-list/burger-list.component";
import { BurgerCatalogueComponent } from "./burger-catalogue/burger-catalogue.component";
import { DetailsComponent } from "./details/details.component";
import { BurgerOrderComponent } from "./orders/burger-order/burger-order.component";
import { ListOrdersComponent } from "./orders/list-orders/list-orders.component";
import { PaymentOrderComponent } from "./orders/payment-order/payment-order.component";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProtectedComponent } from './protected/protected.component';
import {ManagerNavbarComponent} from "./navbar/manager-navbar/manager-navbar.component";
import {ClientNavbarComponent} from "./navbar/client-navbar/client-navbar.component"; // Composant protégé


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterModule,
    BurgerDetailsComponent, BurgerFormComponent, BurgerListComponent,
    BurgerCatalogueComponent, DetailsComponent, BurgerOrderComponent,
    ListOrdersComponent, PaymentOrderComponent,
    LoginComponent, RegisterComponent, ProtectedComponent,
    FormsModule, ReactiveFormsModule, ManagerNavbarComponent, ClientNavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cinaye_burger_frontend';

  showClientNavbar: boolean = true;
  showManagerNavbar: boolean = false;

  constructor(public authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showClientNavbar = !(this.authService.isLoggedIn());
        this.showManagerNavbar = this.authService.isLoggedIn() && (event.url !== '/login' && event.url !== '/register');
      }
    });
  }

  get isClient(): boolean {
    return !this.authService.isLoggedIn();
  }

  get isGestionnaire(): boolean {
    return this.authService.isLoggedIn();
  }
}
