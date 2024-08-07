import {Routes} from '@angular/router';
import { BurgerListComponent } from './burgers/burger-list/burger-list.component'
import { BurgerDetailsComponent } from './burgers/burger-details/burger-details.component'
import { BurgerFormComponent } from './burgers/burger-form/burger-form.component'

import { BurgerCatalogueComponent } from './burger-catalogue/burger-catalogue.component'
import { DetailsComponent } from './details/details.component'
import { BurgerOrderComponent } from './orders/burger-order/burger-order.component'
import { ListOrdersComponent } from './orders/list-orders/list-orders.component';
import { PaymentOrderComponent } from './orders/payment-order/payment-order.component';

import { AuthGuard } from './auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProtectedComponent } from './protected/protected.component'; // Composant protégé

export const routes: Routes = [
  { path: 'burgers', component: BurgerListComponent, canActivate: [AuthGuard] }, // Route pour la liste des burgers
  { path: 'burgers/:id', component: BurgerDetailsComponent, canActivate: [AuthGuard] }, // Route pour les détails d'un burger
  { path: 'add-burger', component: BurgerFormComponent, canActivate: [AuthGuard] }, // Route pour créer un burger
  { path: 'edit-burger/:id', component: BurgerFormComponent, canActivate: [AuthGuard] },

  { path: 'burger-catalogue', component: BurgerCatalogueComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'burger-order/:id', component: BurgerOrderComponent },
  { path: 'commander', component: BurgerOrderComponent },

  { path: 'commandes', component: ListOrdersComponent, canActivate: [AuthGuard] },
  { path: 'paiement', component: PaymentOrderComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'protected-route', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'burger-catalogue' } // Rediriger toutes les autres routes vers la page de connexion
];
//export class AppRoutingModule { }
