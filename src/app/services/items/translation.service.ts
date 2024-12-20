import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

import { GroceryItem } from '../../models/grocery-item.model'
import { Observable } from 'rxjs';

export interface GroceryItemWithDetails extends GroceryItem {
  explanation: string;
  originalAiTranslation: string;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {

  constructor(private http: HttpClient) {
  }

  getTranslation(prompt: string): Observable<GroceryItemWithDetails> {
    const url = 'http://10.0.2.2:3000/ai/huggingface/translate';

    return this.http.post<GroceryItemWithDetails>(url, { prompt });
  }

}
