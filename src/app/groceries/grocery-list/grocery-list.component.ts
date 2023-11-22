import { Component } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { GroceryItem } from "~/app/models/grocery-item.model";
import { ItemService } from "~/app/services/item.service";

@Component({
  selector: "ns-grocery-list",
  templateUrl: "./grocery-list.component.html",
})
export class GroceryListComponent {
  items: Array<GroceryItem>;

  constructor(
    private itemService: ItemService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.items = this.itemService.getGroceryItemsFromStorage();
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }
}
