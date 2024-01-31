import { Component } from "@angular/core";
import { GroceryItem } from "~/app/models/grocery-item.model";
import { ItemService } from "~/app/services/item.service";

export interface DisplayGroceryItem extends GroceryItem {
  checked: boolean;
}

@Component({
  selector: "ns-grocery-list-translated",
  templateUrl: "./grocery-list-translated.component.html",
  styleUrls: ["./grocery-list-translated.component.css"],
})
export class GroceryListTranslatedComponent {
  items: Array<DisplayGroceryItem>;
  translateMode: "hiragana" | "katakana" = "hiragana";

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadGroceries();
  }

  changeTranslateMode = () =>
    (this.translateMode =
      this.translateMode == "hiragana" ? "katakana" : "hiragana");

  onItemChecked(item: DisplayGroceryItem): void {
    const index = this.items.indexOf(item);

    if (
      index === -1 ||
      !this.items[index] ||
      !("checked" in this.items[index])
    ) {
      return; // Exit if the item is not found or lacks 'checked' property
    }

    this.checkItem(index);
    this.reshuffleGroceries(index);
  }
  private loadGroceries() {
    this.items = this.itemService
      .getGroceryItemsFromStorage()
      .map((it) => ({ ...it, checked: false }));
  }

  private reshuffleGroceries(index: number) {
    if (this.items[index].checked) {
      const checkedItem = this.items.splice(index, 1)[0];
      this.items.push(checkedItem); // Move checked item to the bottom
    } else {
      const uncheckedItem = this.items.splice(index, 1)[0];
      const firstUncheckedIndex = this.items.findIndex(
        (item) => !("checked" in item)
      );
      this.items.splice(
        firstUncheckedIndex !== -1 ? firstUncheckedIndex : 0,
        0,
        uncheckedItem
      );
    }
  }

  private checkItem(index: number) {
    this.items[index].checked = !this.items[index].checked;
  }
}
