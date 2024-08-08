// src/app/burgers/burger.model.ts
export interface Burger {
    id: number; // Le point d'interrogation signifie que l'id est optionnel
    nom: string;
    description: string;
    prix: number;
    image: string;
    statut: boolean;
    archived: boolean;
  }
  