import { Component } from "@angular/core";
import { ItemService } from "~/app/services/item.service";
import { DisplayGroceryItem } from "../grocery-item-translated/grocery-item-translated.component";
import { ObservableArray } from "@nativescript/core";

@Component({
  selector: "ns-grocery-list-translated",
  templateUrl: "./grocery-list-translated.component.html",
  styleUrls: ["./grocery-list-translated.component.css"],
})
export class GroceryListTranslatedComponent {
  items: ObservableArray<DisplayGroceryItem>;
  translateMode: "hiragana" | "katakana" = "hiragana";

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadGroceries();
  }

  changeTranslateMode = () =>
    (this.translateMode =
      this.translateMode == "hiragana" ? "katakana" : "hiragana");

  onItemChecked(item: DisplayGroceryItem): void {
    const inList = this.items.find((it) => it.id === item.id);

    inList.checked = !inList.checked;
    this.reshuffleGroceries(inList);

  }

  private loadGroceries() {
    this.items = new ObservableArray(
      this.itemService
        .getGroceryItemsFromStorage()
        .map((it) => ({ ...it, checked: false, hintLevel: 0 }))
    );
  }

  private reshuffleGroceries(item: DisplayGroceryItem) {
    const index = this.items.indexOf(item);


    if (item.checked) {
      this.items.splice(index, 1);
      this.items.push(item); // Move checked item to the bottom
    } else {
      this.items.splice(index, 1);
      this.items = new ObservableArray([item, ...this.items]);
    }

  }
}
