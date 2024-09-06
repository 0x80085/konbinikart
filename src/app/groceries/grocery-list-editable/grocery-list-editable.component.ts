import { Component, ViewChild, OnInit, ElementRef } from "@angular/core";

import { EditableGroceryItem, GroceryItem } from "../../models/grocery-item.model";
import { ItemService } from "../../services/item.service";
import { Dialogs, TextField } from "@nativescript/core";

@Component({
  selector: "ns-grocery-list-editable",
  templateUrl: "./grocery-list-editable.component.html",
  styleUrls: ["./grocery-list-editable.component.css"],
})
export class GroceryListEditableComponent implements OnInit {
  defaultItems: Array<GroceryItem>;
  storedItems: Array<EditableGroceryItem>;
  displayList: EditableGroceryItem[];
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

    this.displayList = this.markItemsInStorage(this.searchQuery);
  }

  markItemsInStorage(searchQuery: string): EditableGroceryItem[] {
    const allGroceryItems: Array<EditableGroceryItem> =
      this.itemService.getAllGroceryItems()
        .sort((a, b) => a.nameEnglish.localeCompare(b.nameEnglish));

    const searchValue = searchQuery?.trim() || "";

    if (searchValue !== "") {
      return allGroceryItems.filter(this.matchesSearchQuery(searchValue));
    }

    return allGroceryItems;
  }

  private matchesSearchQuery(searchValue: any): (value: EditableGroceryItem, index: number, array: EditableGroceryItem[]) => unknown {
    return (item) => item.nameEnglish.toLowerCase().includes(searchValue.toLowerCase());
  }

  onAddItem(item: GroceryItem) {
    this.itemService.addGroceryItemToStorage(item);
    this.refreshList();
  }

  onDelete(item: GroceryItem) {
    this.itemService.removeGroceryItem(item.id);
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
        this.itemService.clearGroceryItemsStorage();
        this.refreshList();
      }
    })
  }

  onSearchInputChange() {
    console.log(this.searchQuery);
    
    this.searchQuery = this.searchQuery;
    this.displayList = this.markItemsInStorage(this.searchQuery);
  }
}
