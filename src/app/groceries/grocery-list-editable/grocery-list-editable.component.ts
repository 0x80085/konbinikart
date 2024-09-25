import { Component, ViewChild, OnInit, ElementRef, ViewContainerRef } from "@angular/core";

import { EditableGroceryItem, GroceryItem } from "../../models/grocery-item.model";
import { ItemService } from "../../services/item.service";
import { Dialogs, Page, TextField } from "@nativescript/core";
import { ModalDialogOptions, ModalDialogService } from "@nativescript/angular";
import { ViewAddedGroceriesModalComponent } from "./view-added-groceries-modal/view-added-groceries-modal.component";

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
    private page: Page,
    private vcRef: ViewContainerRef,
    private modalService: ModalDialogService,
  ) { }

  @ViewChild("searchField", { static: false }) searchFieldRef: ElementRef<TextField>;

  ngOnInit(): void {
    this.refreshList();
  }

  ngAfterViewInit(): void {
    this.page.on(Page.navigatedToEvent, (data) => {
      this.refreshList();
    });
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

  onOpenViewGroceries() {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: null,
      fullscreen: false
    };

    this.modalService.showModal(ViewAddedGroceriesModalComponent, options)
    .then(result => {
      setTimeout(() =>
        this.refreshList(), 10);
    });
  }

  onSearchInputChange() {
    this.searchQuery = this.searchQuery;
    this.displayList = this.markItemsInStorage(this.searchQuery);
  }

  private matchesSearchQuery(searchValue: any): (value: EditableGroceryItem, index: number, array: EditableGroceryItem[]) => unknown {
    return (item) => item.nameEnglish.toLowerCase().includes(searchValue.toLowerCase());
  }

  private refreshList() {
    this.defaultItems = this.itemService.getAllDefaultItems();
    this.storedItems = this.itemService.getGroceryItemsFromStorage();

    this.displayList = this.markItemsInStorage(this.searchQuery);
  }

  private markItemsInStorage(searchQuery: string): EditableGroceryItem[] {
    const allGroceryItems: Array<EditableGroceryItem> =
      this.itemService.getAllGroceryItems()
        .sort((a, b) => a.nameEnglish.localeCompare(b.nameEnglish));

    const searchValue = searchQuery?.trim() || "";

    if (searchValue !== "") {
      return allGroceryItems.filter(this.matchesSearchQuery(searchValue));
    }

    return allGroceryItems;
  }

}
