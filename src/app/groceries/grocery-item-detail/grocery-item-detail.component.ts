import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { GroceryItem } from "../../models/grocery-item.model";
import { ItemService } from "../../services/item.service";

@Component({
  selector: "ns-grocery-item-detail",
  templateUrl: "./grocery-item-detail.component.html",
  styleUrls: ["./grocery-item-detail.component.css"],
})
export class GroceryItemDetailComponent implements OnInit {
  item: GroceryItem;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.item = this.itemService.getItemFromDefaultList(id);
  }
}
