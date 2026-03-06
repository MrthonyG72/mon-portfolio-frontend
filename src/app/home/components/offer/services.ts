import { Component, inject } from '@angular/core';
import { OfferService } from '../../../shared/service/OfferService';

@Component({
  selector: 'app-services',
  standalone: true, // Crucial pour éviter l'erreur NG2012
  imports: [],
  templateUrl: './offer.html', // Corrigé : pointe vers le fichier qui existe
  styleUrl: './offer.scss'    // Corrigé : pointe vers le fichier qui existe
})
export class Services { 
  private offerService = inject(OfferService);
}