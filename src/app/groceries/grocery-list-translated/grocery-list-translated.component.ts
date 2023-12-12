import { Component } from "@angular/core";
import { GroceryItem } from "~/app/models/grocery-item.model";
import { ItemService } from "~/app/services/item.service";

interface DisplayGroceryItem extends GroceryItem {
  checked: boolean;
}

@Component({
  selector: "ns-grocery-list-translated",
  templateUrl: "./grocery-list-translated.component.html",
  styleUrls: ["./grocery-list-translated.component.css"],
})
export class GroceryListTranslatedComponent {
  items: Array<DisplayGroceryItem>;

  enableViewHiragana = true;
  enableViewKatakana = false;
  enableViewRomaji = false;
  enableViewEnglish = false;
  enableViewVisualHint = false;

  constructor(
    private itemService: ItemService,
  ) {}

  ngOnInit(): void {
    this.items = this.itemService
      .getGroceryItemsFromStorage()
      .map((it) => ({ ...it, checked: false }));
  }

  onItemChecked(item: DisplayGroceryItem): void {
    const index = this.items.indexOf(item);

    if (
      index === -1 ||
      !this.items[index] ||
      !("checked" in this.items[index])
    ) {
      return; // Exit if the item is not found or lacks 'checked' property
    }

    this.items[index].checked = !this.items[index].checked; // Toggle the 'checked' property

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
}
