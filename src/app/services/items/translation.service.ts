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

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOiJmMjY0MDE5YS02ODYyLTQ0NDAtOGVjNC1mNjdiYWQ3ZGJkZjIiLCJkaXNjcmltaW5hdG9yIjoiU3RhZmYiLCJpc0FkbWluIjp0cnVlLCJyZXNvdXJjZVVzZUNvdW50Ijo5MywiaWF0IjoxNzM1NDMzMTQxLCJleHAiOjE3MzU0MzY3NDF9.pa92Tupu72lMOn9-jq4DSyThMjrsGtoASWcieUbq0Oc'

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
