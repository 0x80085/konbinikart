import { Injectable } from '@angular/core'
import { ApplicationSettings } from "@nativescript/core";

import { GroceryItem } from '../../models/grocery-item.model'

export enum StorageKey {
    GroceryList = "GroceryList",
    CustomItems = "CustomItems",
}

@Injectable({
    providedIn: 'root',
})
export class StorageService {

    constructor() {
        this.initStorage();
    }

    getAll(storageKey: StorageKey): GroceryItem[] {
        const itemsAsSring = ApplicationSettings.getString(storageKey);
        return JSON.parse(itemsAsSring);
    }

    getById(storageKey: StorageKey, id: string): GroceryItem | null {
        const items: GroceryItem[] = this.getAll(storageKey);
        return items.find(it => it.id.toString() === id) ?? null; // todo use GUIDs so can remove tostring
    }

    add(storageKey: StorageKey, item: GroceryItem): void {
        const items: GroceryItem[] = this.getAll(storageKey);
        items.push(item);
        this.save(storageKey, items);
    }

    remove(storageKey: StorageKey, itemId: string): void {
        const items = this.getAll(storageKey);
        const newItems = items.filter(it => it.id.toString() !== itemId);
        this.save(storageKey, newItems);
    }

    update(storageKey: StorageKey, item: GroceryItem) {

      // uncommi f u gon use it

      if (this.exists(storageKey, item.id.toString())) {
            const items = this.getAll(storageKey);
            const itemToUpdateIndex = items.findIndex(it => it.id === item.id);
            items[itemToUpdateIndex] = {
                id: item.id,
                emoji: item.emoji,
                nameEnglish: item.nameEnglish,
                nameHiragana: item.nameHiragana,
                nameKatakana: item.nameKatakana,
                nameRomaji: item.nameRomaji,
                isCustom: true
            }
            this.save(storageKey, items);
        }
    }

    exists(storageKey: StorageKey, itemId: string): boolean {
        return !!this.getById(storageKey, itemId);
    }

    clear(storageKey: StorageKey): void {
        this.save(storageKey, []);
    }

    private initStorage(): void {
        if (!ApplicationSettings.hasKey(StorageKey.GroceryList)) {
            this.save(StorageKey.GroceryList, [])
        }
        if (!ApplicationSettings.hasKey(StorageKey.CustomItems)) {
            this.save(StorageKey.CustomItems, [])
        }
    }

    private save(storageKey: StorageKey, items: GroceryItem[]): void {
        const itemsAsString = JSON.stringify(items);
        ApplicationSettings.setString(storageKey, itemsAsString);
    }
}
