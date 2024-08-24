import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Page } from "@nativescript/core";
import { GroceryItem } from "~/app/models/grocery-item.model";
import { ItemService } from "~/app/services/item.service";

@Component({
  selector: "ns-grocery-list",
  templateUrl: "./grocery-list.component.html",
  styleUrls: ["./grocery-list.component.css"],
})
export class GroceryListComponent implements OnInit, AfterViewInit {
  items: Array<GroceryItem>;

  constructor(private itemService: ItemService, private page: Page) { }

  ngOnInit(): void {
    this.items = this.itemService.getGroceryItemsFromStorage();
  }

  ngAfterViewInit(): void {
    this.page.on(Page.navigatedToEvent, (data) => {
      this.items = this.itemService.getGroceryItemsFromStorage();
    });
  }
}
