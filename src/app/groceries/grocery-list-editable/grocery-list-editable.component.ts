import { Component, ViewChild, OnInit, ElementRef } from "@angular/core";

import { GroceryItem } from "../../models/grocery-item.model";
import { ItemService } from "../../services/item.service";
import { Dialogs, TextField } from "@nativescript/core";

@Component({
  selector: "ns-grocery-list-editable",
  templateUrl: "./grocery-list-editable.component.html",
  styleUrls: ["./grocery-list-editable.component.css"],
})
export class GroceryListEditableComponent implements OnInit {
  defaultItems: Array<GroceryItem>;
  storedItems: Array<GroceryItem>;
  displayList: GroceryItem[];
  searchQuery: string = "";

  constructor(
    private itemService: ItemService,
  ) { }

  @ViewChild("searchField", { static: false }) searchFieldRef: ElementRef<TextField>;

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

      return { ...item, isInStorage: existsInStorage }
    });

    const searchValue = searchQuery?.value?.trim() || "";
    if (searchValue !== "") {
      return markedItems.filter((item) =>
        item.nameEnglish.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return markedItems;
  }

  onAddItem(item: GroceryItem) {
    this.itemService.addGroceryItem(item);
    this.refreshList();
  }

  onDelete(id: number) {
    this.itemService.removeGroceryItem(id);
    this.refreshList();
  }

  onClearSearch() {
    if (this.searchFieldRef && this.searchFieldRef.nativeElement) {
      this.searchFieldRef.nativeElement.text = ""; // Clear the text in the TextField
      this.refreshList();
    }
  }

  onClearList() {
    Dialogs.confirm("Are you sure you want to clear the grocery list?").then((result) => {
      if (result) {
        this.itemService.saveGroceryItemsToStorage([]);
        this.refreshList();
      }
    })
  }

  onSearchInputChange(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.displayList = this.markMatchingItems(this.searchQuery);
  }
}
