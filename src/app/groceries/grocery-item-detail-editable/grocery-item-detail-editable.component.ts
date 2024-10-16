import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GroceryItem } from "~/app/models/grocery-item.model";
import { DefaultItemsService } from "~/app/services/items/default-items.service";

@Component({
  selector: "ns-grocery-item-detail-editable",
  templateUrl: "./grocery-item-detail-editable.component.html",
})
export class GroceryItemDetailEditableComponent {
  item: GroceryItem;

  constructor(
    private service: DefaultItemsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.item = this.service.getById(id);
  }
}
