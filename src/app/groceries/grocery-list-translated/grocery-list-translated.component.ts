import { Component } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { GroceryItem } from "~/app/models/grocery-item.model";
import { ItemService } from "~/app/services/item.service";

@Component({
  selector: "ns-grocery-list-translated",
  templateUrl: "./grocery-list-translated.component.html",
})
export class GroceryListTranslatedComponent {
  items: Array<GroceryItem>;

  enableViewRomaji = false;
  enableViewEnglish = false;
  enableViewVisualHint = false;

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
}
