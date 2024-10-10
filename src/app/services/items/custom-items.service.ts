import { Injectable } from '@angular/core'
import { GroceryItem } from '../../models/grocery-item.model';
import { StorageKey, StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class CustomItemsService {

    private readonly storageKey = StorageKey.CustomItems;

    constructor(private storageService: StorageService) {
    }

    getAll(): GroceryItem[] {
        return this.storageService.getAll(this.storageKey);
    }

    getById(id: string): GroceryItem | null {
        return this.storageService.getById(this.storageKey, id);
    }

    add(item: GroceryItem): void {
        this.storageService.add(this.storageKey, item);
    }

    remove(id: string): void {
        this.storageService.remove(this.storageKey, id);
    }
    
    update(changes: GroceryItem): void {
        this.storageService.update(this.storageKey, changes);
    }

    clear(): void {
        this.storageService.clear(this.storageKey);
    }
}