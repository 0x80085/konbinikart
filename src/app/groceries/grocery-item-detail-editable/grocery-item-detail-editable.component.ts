import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GroceryItem } from "~/app/models/grocery-item.model";
import { ItemService } from "~/app/services/item.service";

@Component({
  selector: "ns-grocery-item-detail-editable",
  templateUrl: "./grocery-item-detail-editable.component.html",
})
export class GroceryItemDetailEditableComponent {
  item: GroceryItem;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.item = this.itemService.getItemFromDefaultList(id);
  }
}
