import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import { AuthService } from '../../services/auth.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-client-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './client-navbar.component.html',
  styleUrl: './client-navbar.component.css'
})
export class ClientNavbarComponent {
  isVisible: boolean = true;

  constructor() { }
}
