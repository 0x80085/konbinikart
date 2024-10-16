import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Page } from "@nativescript/core";
import { GroceryItem } from "~/app/models/grocery-item.model";
import { GroceryListService } from "~/app/services/items/grocery-list.service";

@Component({
  selector: "ns-grocery-list",
  templateUrl: "./grocery-list.component.html",
  styleUrls: ["./grocery-list.component.css"],
})
export class GroceryListComponent implements OnInit, AfterViewInit {
  items: Array<GroceryItem>;

  constructor(private groceryItemService: GroceryListService, private page: Page) { }

  ngOnInit(): void {
    this.items = this.groceryItemService.getAll();
  }

  ngAfterViewInit(): void {
    this.page.on(Page.navigatedToEvent, (data) => {
      this.items = this.groceryItemService.getAll();
    });
  }
}
