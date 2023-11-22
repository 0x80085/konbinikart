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
  items: Array<GroceryItem>;

  constructor(
    private itemService: ItemService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }
  onDelete(id: string) {
    alert("Not implemented");
  }
}
