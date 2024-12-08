import { Component } from "@angular/core";
import { DisplayGroceryItem } from "../grocery-item-translated/grocery-item-translated.component";
import { ObservableArray, Page } from "@nativescript/core";
import { GroceryListService } from "~/app/services/items/grocery-list.service";
import { CanDeactivateComponent } from "~/app/app.component";

@Component({
  selector: "ns-grocery-list-translated",
  templateUrl: "./grocery-list-translated.component.html",
  styleUrls: ["./grocery-list-translated.component.css"],
})
export class GroceryListTranslatedComponent implements CanDeactivateComponent {
  items: ObservableArray<DisplayGroceryItem>;
  translateMode: "hiragana" | "katakana" = "hiragana";

  constructor(
    private groceryListService: GroceryListService,
    private page: Page,
  ) { }

  ngOnInit(): void {
    this.loadGroceries();
  }
  ngAfterViewInit(): void {
    this.page.on(Page.navigatedToEvent, (data) => {
      this.loadGroceries();
    });
  }

  private _shouldConfirmBack: boolean;

  shouldConfirmBack(){
    return this._shouldConfirmBack
  }

  changeTranslateMode = () =>
    (this.translateMode =
      this.translateMode == "hiragana" ? "katakana" : "hiragana");

  onItemChecked(item: DisplayGroceryItem): void {
    this._shouldConfirmBack = true;

    const inList = this.items.find((it) => it.id === item.id);

    inList.checked = !inList.checked;
    this.reshuffleGroceries(inList);

  }

  private loadGroceries() {
    this.items = new ObservableArray(
      this.groceryListService
        .getAll()
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
