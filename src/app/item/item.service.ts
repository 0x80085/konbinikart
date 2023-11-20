import { Injectable } from '@angular/core'

import { Item } from './item'
import { DATA } from './data'

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items = DATA;

  getItems(): Array<Item> {
    return this.items
  }

  getItem(id: number): Item {
    return this.items.filter((item) => item.id === id)[0]
  }
}
