import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GroceryItem } from "~/app/models/grocery-item.model";
import { CustomItemsService } from "~/app/services/items/custom-items.service";
import { RouterExtensions } from "@nativescript/angular";
import { alert, confirm } from "@nativescript/core";

@Component({
  selector: "ns-grocery-item-detail-editable",
  templateUrl: "./grocery-item-detail-editable.component.html",
})
export class GroceryItemDetailEditableComponent {
  item: GroceryItem;

  constructor(
    private service: CustomItemsService,
    private route: ActivatedRoute,
    private router: RouterExtensions
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.item = this.service.getById(id);
  }

  saveChanges(): void {
    this.service.update(this.item);
    alert("Saved!")
    this.router.back();
  }

  deleteItem(): void {
    confirm("Sure to delete item?").then((res: boolean) => {
      if (res) {
        this.service.remove(this.item.id);
        alert("Deleted!")
        this.router.back();
      }
    })
  }
}
