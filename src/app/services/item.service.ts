import { Injectable } from '@angular/core'

import { GroceryItem } from '../models/grocery-item.model'
import { DATA } from './data'

import { ApplicationSettings } from "@nativescript/core";

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  
  private readonly defaultItems = DATA;
  private readonly storageKey = "groceryItems";

  getAllDefaultItems(): Array<GroceryItem> {
    return this.defaultItems
  }

  getItemFromDefaultList(id: number): GroceryItem {
    return this.defaultItems.filter((item) => item.id === id)[0]
  }
  
  getGroceryItemsFromStorage(): GroceryItem[] {
    const storedItems = JSON.parse(ApplicationSettings.getString(this.storageKey, "[]"));
    return storedItems || [];
  }

  saveGroceryItemsToStorage(items: GroceryItem[]): void {
    ApplicationSettings.setString(this.storageKey, JSON.stringify(items));
  }

  clearGroceryItemsStorage(): void {
    ApplicationSettings.remove(this.storageKey);
  }

  addGroceryItem(item: GroceryItem): void {
    const items = this.getGroceryItemsFromStorage();
    items.push(item);
    this.saveGroceryItemsToStorage(items);
  }

  removeGroceryItem(itemId: number): void {
    const items = this.getGroceryItemsFromStorage().filter(item => item.id !== itemId);
    this.saveGroceryItemsToStorage(items);
  }

  updateGroceryItem(updatedItem: GroceryItem): void {
    const items = this.getGroceryItemsFromStorage().map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    this.saveGroceryItemsToStorage(items);
  }
}
