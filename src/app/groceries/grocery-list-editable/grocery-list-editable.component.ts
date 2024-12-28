import { Component, ViewChild, OnInit, ElementRef, ViewContainerRef } from "@angular/core";

import { EditableGroceryItem, GroceryItem } from "../../models/grocery-item.model";
import { CustomItemsService } from "../../services/items/custom-items.service";
import { GroceryListService } from "../../services/items/grocery-list.service";
import { DefaultItemsService } from "../../services/items/default-items.service";
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
  itemsOnGroceryList: Array<EditableGroceryItem>;
  customItems: Array<GroceryItem>;

  displayList: EditableGroceryItem[];

  searchQuery: string = "";

  constructor(
    private customItemsService: CustomItemsService,
    private groceryListService: GroceryListService,
    private defaultItemsService: DefaultItemsService,
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
    this.groceryListService.add(item);
    this.refreshList();
  }

  onDelete(item: GroceryItem) {
    this.groceryListService.remove(item.id);
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
        this.groceryListService.clear();
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
    this.refreshList();
  }

  private matchesSearchQuery(searchValue: any): (value: EditableGroceryItem, index: number, array: EditableGroceryItem[]) => unknown {
    return (item) => item.nameEnglish.toLowerCase().includes(searchValue.toLowerCase());
  }

  private refreshList() {
    this.itemsOnGroceryList = this.groceryListService.getAll();
    this.defaultItems = this.defaultItemsService.getAll();
    this.customItems = this.customItemsService.getAll();

    const idsOfItemsOnGroceryList = this.itemsOnGroceryList.map(it => it.id);

    const allAvailableItems = [...this.defaultItems, ...this.customItems]

    const allAvailableItemsAndMarkedForGroceryList =
      allAvailableItems.map(availableItem => {
        if (idsOfItemsOnGroceryList.some(id => availableItem.id === id)) {
          return ({ ...availableItem, isInStorage: true } as EditableGroceryItem)
        }
        return { ...availableItem, isInStorage: false } as EditableGroceryItem
      })

    const allGroceryItems: Array<EditableGroceryItem> =
      allAvailableItemsAndMarkedForGroceryList
        .sort((a, b) => a.nameEnglish.localeCompare(b.nameEnglish));

    const searchValue = this.searchQuery?.trim() || "";

    if (searchValue !== "") {
      this.displayList = allGroceryItems.filter(this.matchesSearchQuery(searchValue));
      return;
    }

    this.displayList = allGroceryItems;
  }

}
