import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOiJmMjY0MDE5YS02ODYyLTQ0NDAtOGVjNC1mNjdiYWQ3ZGJkZjIiLCJkaXNjcmltaW5hdG9yIjoiU3RhZmYiLCJpc0FkbWluIjp0cnVlLCJyZXNvdXJjZVVzZUNvdW50IjowLCJpYXQiOjE3MzUzMTQ2ODgsImV4cCI6MTczNTMxODI4OH0.r00LGy3x5n18lpdgozBk5lufl_HG2j0_w2EycK0NXAw'

  constructor(private http: HttpClient) {
  }

  setToken(token: string) {
    this.token = token;
  }

  getTranslation(prompt: string): Observable<GroceryItemWithDetails> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = 'http://a-bar-in.swedencentral.cloudapp.azure.com:4003/ai/huggingface/translate';
    return this.http.post<GroceryItemWithDetails>(url, { prompt }, { headers });
  }

}
