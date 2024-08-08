import { DetailsCommande } from './details-commande.model'; // Ajustez le chemin selon votre structure

export interface Commande {
    id: number;
    //burgerId: number;
    //quantite: number;
    nom_client: string;
    prenom_client: string;
    telephone_client: string;
    email_client: string;
    statut: string;  // Par exemple: 'En cours', 'Terminé', 'Annulé'
    date: Date;
    total:number;
    details: DetailsCommande[]; // Utiliser le modèle DetailsCommande ici
    datePaiement?: Date; // Optionnel, car une commande peut ne pas encore être payée
    montantPaiement?: number; // Optionnel, car une commande peut ne pas encore être payée
}