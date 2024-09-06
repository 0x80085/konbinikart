import { Injectable } from '@angular/core'

import { EditableGroceryItem, GroceryItem } from '../models/grocery-item.model'
import { DATA } from './data'

import { ApplicationSettings } from "@nativescript/core";

@Injectable({
  providedIn: 'root',
})
export class ItemService {

  private readonly defaultItems = DATA;
  private readonly storageKey = "groceryItems";

  getAllDefaultItems(): Array<EditableGroceryItem> {
    return this.defaultItems.map(it => ({ ...it, dateLastInteraction: null, isInStorage: false }))
  }

  getItemFromDefaultList(id: number): GroceryItem {
    return this.defaultItems.filter((item) => item.id === id)[0]
  }

  getGroceryItemsFromStorage(): EditableGroceryItem[] {
    const storedItems = JSON.parse(ApplicationSettings.getString(this.storageKey, null))
      .map(it => ({...it, dateLastInteraction: new Date(it.dateLastInteraction)}));
    return storedItems || [];
  }

  addGroceryItemToStorage(item: GroceryItem): void {
    var addedItem: EditableGroceryItem = { ...item, dateLastInteraction: new Date(), isInStorage: true }
    const items = this.getGroceryItemsFromStorage();
    items.push(addedItem);
    this.saveGroceryItemsToStorage(items);
  }

  removeGroceryItem(itemId: number): void {
    const items = this.getGroceryItemsFromStorage().filter(item => item.id !== itemId);
    this.saveGroceryItemsToStorage(items);
  }

  clearGroceryItemsStorage(): void {
    ApplicationSettings.remove(this.storageKey);
  }

  private updateGroceryItem(updatedItem: EditableGroceryItem): void {
    const items = this.getGroceryItemsFromStorage().map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    this.saveGroceryItemsToStorage(items);
  }

  private saveGroceryItemsToStorage(items: EditableGroceryItem[]): void {
    ApplicationSettings.setString(this.storageKey, JSON.stringify(items));
  }
}
