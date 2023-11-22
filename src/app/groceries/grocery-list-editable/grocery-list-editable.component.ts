import { Component, OnInit } from "@angular/core";

import { GroceryItem } from "../../models/grocery-item.model";
import { ItemService } from "../../services/item.service";
import { RouterExtensions } from "@nativescript/angular";
import { alert } from "@nativescript/core";

@Component({
  selector: "ns-grocery-list-editable",
  templateUrl: "./grocery-list-editable.component.html",
})
export class GroceryListEditableComponent implements OnInit {
  defaultItems: Array<GroceryItem>;
  storedItems: Array<GroceryItem>;
  displayList: GroceryItem[];

  constructor(
    private itemService: ItemService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.refreshList();
  }

  private refreshList() {
    this.defaultItems = this.itemService.getAllDefaultItems();
    this.storedItems = this.itemService.getGroceryItemsFromStorage();

    this.displayList = this.markMatchingItems();
  }

  markMatchingItems(): GroceryItem[] {
    const markedItems = this.defaultItems.map((item) => {
      const existsInStorage = this.storedItems.some(
        (storageItem) => storageItem.id === item.id
      );
      if (existsInStorage) {
        return { ...item, isInStorage: true };
      } else {
        return { ...item, isInStorage: false };
      }
    });

    return markedItems;
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  onAddItem(item: GroceryItem) {
    this.itemService.addGroceryItem(item);
    this.refreshList();
  }

  onDelete(id: number) {
    this.itemService.removeGroceryItem(id);
    this.refreshList();
  }
}
