import { Component, EventEmitter, Input, Output } from "@angular/core";
import { GroceryItem } from "~/app/models/grocery-item.model";
import { DisplayGroceryItem } from "../grocery-list-translated/grocery-list-translated.component";

@Component({
  selector: "ns-grocery-item-translated",
  templateUrl: "./grocery-item-translated.component.html",
  styleUrls: ["./grocery-item-translated.component.css"],
})
export class GroceryItemTranslatedComponent {
  @Input() item: DisplayGroceryItem = null;
  @Input() translateMode: "hiragana" | "katakana";

  @Output() onCheckItem = new EventEmitter();

  private readonly maxHintLevel = 3;
  private hintLevel = 0;

  isChecked = this.item?.checked;

  enableViewRomaji = false;
  enableViewEnglish = false;
  enableViewVisualHint = false;

  isHiraganaMode() {
    return this.translateMode === "hiragana";
  }

  isKatakanaMode() {
    return this.translateMode === "katakana";
  }

  isMaxHintLevelReached() {
    return this.hintLevel === this.maxHintLevel;
  }

  onTapHint() {
    if (this.isMaxHintLevelReached()) {
      return;
    }
    switch (this.hintLevel) {
      case 0:
        this.enableViewRomaji = true;
        break;
      case 1:
        this.enableViewVisualHint = true;
        break;
      case 2:
        this.enableViewEnglish = true;
        break;
      default:
        break;
    }
    this.hintLevel++;
  }

  checkItemAsCompleted() {
    this.onCheckItem.emit({ item: this.item, hintLevel: this.hintLevel });
  }
}
