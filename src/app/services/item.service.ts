import { Injectable } from '@angular/core'

import { GroceryItem } from '../models/grocery-item.model'
import { DATA } from './data'

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items = DATA;

  getItems(): Array<GroceryItem> {
    return this.items
  }

  getItem(id: number): GroceryItem {
    return this.items.filter((item) => item.id === id)[0]
  }
}
