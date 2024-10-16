import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { GroceryItem } from "../../models/grocery-item.model";
import { DefaultItemsService } from "~/app/services/items/default-items.service";

@Component({
  selector: "ns-grocery-item-detail",
  templateUrl: "./grocery-item-detail.component.html",
  styleUrls: ["./grocery-item-detail.component.css"],
})
export class GroceryItemDetailComponent implements OnInit {
  item: GroceryItem;

  constructor(
    private defaultItemsService: DefaultItemsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.item = this.defaultItemsService.getById(id);
  }
}
