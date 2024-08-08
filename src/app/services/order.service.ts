import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../orders/commande.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api/commandes';

  constructor(private http: HttpClient) { }

  getCommandes(): Observable<Commande> {
    return this.http.get<Commande>(this.apiUrl);
  }
  // getCommandes(filters: any): Observable<Commande[]> {
  //   let params = new HttpParams();
  //   if (filters) {
  //     params = new HttpParams({ fromObject: filters });
  //   }
  //   return this.http.get<Commande[]>(this.apiUrl);
  // }
  

  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateCommande(commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.apiUrl}/${commande.id}`, commande);
  }

  createOrder(order: any): Observable<any>{
    return this.http.post<any>(this.apiUrl, order);
  }

  // enregistrerPaiement(id: number, montant: number): Observable<Commande> {
  //   return this.http.put<Commande>(`${this.apiUrl}/${id}/paiement`, { montant });
  // }

  cancelOrder(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/cancel`, {});
  }

  markAsCompleted(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/complete`, {});
  }

  markAsPaid(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/payer`, {});
  }
  
}
