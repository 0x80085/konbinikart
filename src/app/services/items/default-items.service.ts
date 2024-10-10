import { Injectable } from '@angular/core'
import { DATA } from './data/data'
import { GroceryItem } from '../../models/grocery-item.model';

@Injectable({
    providedIn: 'root',
})
export class DefaultItemsService {


    constructor() {
    }

    getAll(): GroceryItem[] {
        return DATA;
    }

    getById(id: string): GroceryItem | null {
        return DATA.find(it => it.id.toString() === id) ?? null;
    }

}