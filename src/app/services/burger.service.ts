import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Burger } from '../burgers/burger.model';
import { map } from 'rxjs/operators';

//Ce service sera injectable dans d'autres composants ou services
@Injectable({
  providedIn: 'root' // Ce service sera disponible dans toute l'application
})
export class BurgerService {

 private apiUrl = 'http://localhost:8000/api/burgers'; // URL de base de l'API

  //Injection du service HttpClient pour faire des requetes HTTP
  constructor(private http: HttpClient) {}

  /*
  Methode pour obtenir la liste des burgers
   */
  getBurgers(): Observable<Burger[]> {
    return this.http.get<Burger[]>(this.apiUrl);// Envoie une requête GET à l'API
  }

  /*
  Methode pour un burger par son id
   */
  getBurgerById(id: number): Observable<Burger> {
    return this.http.get<Burger>(`${this.apiUrl}/${id}`);// Envoie une requête GET pour un burger spécifique
  }

  /*
  Methode pour creer un nouveau burger
   */
  saveBurger(burger: Burger): Observable<Burger> {
    return this.http.post<Burger>(this.apiUrl, burger);// Envoie une requête POST pour créer un nouveau burger
  }

  /*
  Methode pour mettre a jour un burger existant
   */
  updateBurger(id: number, burger: Burger): Observable<Burger> {
    return this.http.put<Burger>(`${this.apiUrl}/${id}`, burger);// Envoie une requête PUT pour mettre à jour un burger
  }

  /*
  Methode pour supprimer un burger
*/
  deleteBurger(id: number):  Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);// Envoie une requête DELETE pour supprimer un burger
  }
  /*
  Methode pour archiver un burger
  */
  archiveBurger(id: number): Observable<any> {
    //return this.http.put<void>(`${this.apiUrl}/archive/${id}`,{})
    return this.http.patch(`${this.apiUrl}/${id}/archive`, {});
  }

  /**
   * Methode pour desarchiver un burger
   */
  unarchiveBurger(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/unarchive/${id}`, {});
  }
}
