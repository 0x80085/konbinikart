import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { GroceryItem } from "../../models/grocery-item.model";
import { ItemService } from "../../services/item.service";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "ns-grocery-item-detail",
  templateUrl: "./grocery-item-detail.component.html",
})
export class GroceryItemDetailComponent implements OnInit {
  item: GroceryItem;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions
  ) {}

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }
  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.item = this.itemService.getItemFromDefaultList(id);
  }
}
