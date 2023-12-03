import { Component, OnInit } from "@angular/core";

import { GroceryItem } from "../../models/grocery-item.model";
import { ItemService } from "../../services/item.service";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "ns-grocery-list-editable",
  templateUrl: "./grocery-list-editable.component.html",
  styleUrls:["./grocery-list-editable.component.css"]
})
export class GroceryListEditableComponent implements OnInit {
  defaultItems: Array<GroceryItem>;
  storedItems: Array<GroceryItem>;
  displayList: GroceryItem[];
  searchQuery: string = "";

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

    this.displayList = this.markMatchingItems(this.searchQuery);
  }

  markMatchingItems(searchQuery: any): GroceryItem[] {
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

    const searchValue = searchQuery?.value?.trim() || "";
    if (searchValue !== "") {
      return markedItems.filter((item) =>
        item.nameEnglish.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

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

  onSearchInputChange(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.displayList = this.markMatchingItems(this.searchQuery);
  }
}
